/**
 * Updates FreshBooks credentials in Vercel and triggers a redeployment.
 *
 * Usage:
 *   1. Add your Vercel token to .env.local in this folder:
 *        VERCEL_TOKEN=your_token_here
 *   2. Run: node scripts/update-vercel-creds.mjs
 *
 * This script reads VERCEL_TOKEN from environment (or .env.local),
 * updates the 3 FreshBooks env vars in Vercel, and triggers a redeploy.
 *
 * You can find your Vercel token at:
 *   vercel.com → Account Settings → Tokens → Create Token
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load .env.local if present
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envFile = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

// ─── Config ───────────────────────────────────────────────────────────────────

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const PROJECT_NAME = "youneedled-nextjs"; // Vercel project name

// New FreshBooks credentials from the local OAuth run
const NEW_CREDS = {
  FRESHBOOKS_CLIENT_ID: "034c42a31580ce6f420afd120f91b186bb19ac88af4bd0e6d4afcd7fe5f77b59",
  FRESHBOOKS_CLIENT_SECRET: "4fabe098f2cd7e524dd9cd8c317026faf3c5831c3edf4617475b4baa1dbf24cb",
  // Refresh token will be obtained fresh via local OAuth — run freshbooks-auth-local.mjs first
  // or provide it here:
  FRESHBOOKS_REFRESH_TOKEN: process.env.FRESHBOOKS_REFRESH_TOKEN || "",
};

if (!VERCEL_TOKEN) {
  console.error("VERCEL_TOKEN not set. Add it to .env.local:\n  VERCEL_TOKEN=your_token_here");
  process.exit(1);
}

if (!NEW_CREDS.FRESHBOOKS_REFRESH_TOKEN) {
  console.error(
    "FRESHBOOKS_REFRESH_TOKEN not set.\n" +
    "Run the OAuth script first:\n  node scripts/freshbooks-auth-local.mjs\n" +
    "Then set FRESHBOOKS_REFRESH_TOKEN=<token> in .env.local and re-run this script."
  );
  process.exit(1);
}

// ─── Vercel API helpers ───────────────────────────────────────────────────────

function vercelRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(
      {
        hostname: "api.vercel.com",
        path,
        method,
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          "Content-Type": "application/json",
          ...(payload ? { "Content-Length": Buffer.byteLength(payload) } : {}),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
          catch { resolve({ status: res.statusCode, body: data }); }
        });
      }
    );
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n=== Updating FreshBooks credentials in Vercel ===\n");

  // Find the project
  const projectRes = await vercelRequest("GET", `/v9/projects/${PROJECT_NAME}`);
  if (projectRes.status !== 200) {
    console.error("Could not find Vercel project:", projectRes.body);
    process.exit(1);
  }
  const projectId = projectRes.body.id;
  console.log(`✓ Found project: ${PROJECT_NAME} (${projectId})`);

  // List existing env vars
  const envRes = await vercelRequest("GET", `/v9/projects/${projectId}/env`);
  if (envRes.status !== 200) {
    console.error("Could not list env vars:", envRes.body);
    process.exit(1);
  }
  const existingEnvs = envRes.body.envs || [];
  const envByKey = new Map(existingEnvs.map((e) => [e.key, e.id]));

  // Update or create each credential
  for (const [key, value] of Object.entries(NEW_CREDS)) {
    if (!value) continue;
    const existingId = envByKey.get(key);
    if (existingId) {
      const r = await vercelRequest("PATCH", `/v9/projects/${projectId}/env/${existingId}`, { value });
      console.log(`${r.status === 200 ? "✓" : "✗"} Updated ${key}`);
    } else {
      const r = await vercelRequest("POST", `/v9/projects/${projectId}/env`, {
        key, value, type: "encrypted", target: ["production", "preview"],
      });
      console.log(`${r.status === 200 ? "✓" : "✗"} Created ${key}`);
    }
  }

  // Trigger redeployment by finding the latest production deployment
  console.log("\nTriggering redeployment...");
  const deploysRes = await vercelRequest("GET", `/v13/deployments?projectId=${projectId}&target=production&limit=1`);
  if (deploysRes.status === 200 && deploysRes.body.deployments?.[0]) {
    const latest = deploysRes.body.deployments[0];
    const redepRes = await vercelRequest("POST", `/v13/deployments`, {
      name: PROJECT_NAME,
      deploymentId: latest.uid,
      target: "production",
    });
    if (redepRes.status === 200 || redepRes.status === 201) {
      console.log("✓ Redeployment triggered — will be live in ~1 minute.");
    } else {
      console.log("⚠ Redeploy API returned", redepRes.status, "— trigger manually from vercel.com");
    }
  } else {
    console.log("⚠ Could not find latest deployment — trigger redeploy manually from vercel.com");
  }

  console.log("\n=== Done. Test the sync after ~1 minute: ===");
  console.log(`curl -X POST https://www.youneedled.com/api/sync/manus-freshbooks?dry_run=1 \\`);
  console.log(`  -H "Authorization: Bearer 9e2c103fb574b44e513abf82764cf453d44310d40fbb5def00b9c8e05802e4ae"`);
}

main().catch(console.error);
