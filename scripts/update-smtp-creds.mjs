/**
 * Sets the Resend API key in Vercel and triggers a redeployment.
 * This fixes the contact form — no Gmail App Password needed.
 *
 * Usage:
 *   1. Sign up free at resend.com (use youneedled@gmail.com or any email)
 *   2. In Resend dashboard → API Keys → Create API Key → copy it
 *   3. Add to .env.local:
 *        RESEND_API_KEY=re_xxxxxxxxxxxx
 *        CONTACT_TO_EMAIL=derek@youneedled.com   (optional, this is the default)
 *   4. Run: node scripts/update-smtp-creds.mjs
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envFile = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "derek@youneedled.com";
const PROJECT_NAME = "you-need-led-website";

if (!VERCEL_TOKEN) {
  console.error("VERCEL_TOKEN not set in .env.local");
  process.exit(1);
}
if (!RESEND_API_KEY || !RESEND_API_KEY.startsWith("re_")) {
  console.error(
    "RESEND_API_KEY not set or invalid.\n" +
    "1. Go to resend.com → sign up (free)\n" +
    "2. Dashboard → API Keys → Create → copy the key\n" +
    "3. Add to .env.local:  RESEND_API_KEY=re_xxxxxxxxx\n" +
    "4. Re-run this script"
  );
  process.exit(1);
}

function vercelRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request(
      { hostname: "api.vercel.com", path, method, headers: { Authorization: `Bearer ${VERCEL_TOKEN}`, "Content-Type": "application/json", ...(data ? { "Content-Length": Buffer.byteLength(data) } : {}) } },
      (res) => {
        let raw = "";
        res.on("data", (c) => (raw += c));
        res.on("end", () => { try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); } catch { resolve({ status: res.statusCode, body: raw }); } });
      }
    );
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  console.log("Fetching Vercel project...");
  const projectRes = await vercelRequest("GET", `/v9/projects/${PROJECT_NAME}`);
  if (projectRes.status !== 200) { console.error("Project not found:", projectRes.body); process.exit(1); }
  const projectId = projectRes.body.id;
  console.log(`✓ Project: ${PROJECT_NAME} (${projectId})`);

  const envRes = await vercelRequest("GET", `/v9/projects/${projectId}/env`);
  const existing = envRes.body.envs || [];
  const byKey = Object.fromEntries(existing.map((e) => [e.key, e.id]));

  const updates = { RESEND_API_KEY, CONTACT_TO_EMAIL };
  for (const [key, value] of Object.entries(updates)) {
    if (byKey[key]) {
      const r = await vercelRequest("PATCH", `/v9/projects/${projectId}/env/${byKey[key]}`, { value });
      console.log(`${r.status === 200 ? "✓" : "✗"} Updated ${key}`);
    } else {
      const r = await vercelRequest("POST", `/v9/projects/${projectId}/env`, { key, value, type: "encrypted", target: ["production", "preview"] });
      console.log(`${r.status === 200 ? "✓" : "✗"} Created ${key}`);
    }
  }

  console.log("\nTriggering redeployment...");
  const deploysRes = await vercelRequest("GET", `/v13/deployments?projectId=${projectId}&target=production&limit=1`);
  if (deploysRes.status === 200 && deploysRes.body.deployments?.[0]) {
    const latest = deploysRes.body.deployments[0];
    const redepRes = await vercelRequest("POST", `/v13/deployments/${latest.uid}/redeploy?forceNew=1`, {});
    if (redepRes.status === 200 || redepRes.status === 201) {
      console.log(`✓ Redeployment triggered: ${redepRes.body.url}`);
    } else {
      console.error("✗ Redeploy failed:", redepRes.body);
    }
  }
  console.log("\nDone. Contact form will work once deployment completes (~1 min).");
}

main().catch((e) => { console.error(e); process.exit(1); });
