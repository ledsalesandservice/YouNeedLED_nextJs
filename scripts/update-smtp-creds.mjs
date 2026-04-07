/**
 * Updates SMTP credentials in Vercel and triggers a redeployment.
 *
 * Usage:
 *   1. Add your Gmail App Password to .env.local:
 *        SMTP_USER=youneedled@gmail.com
 *        SMTP_PASS=xxxx-xxxx-xxxx-xxxx   <-- 16-char App Password (NOT your Google login password)
 *   2. Run: node scripts/update-smtp-creds.mjs
 *
 * How to get a Gmail App Password:
 *   1. Enable 2-Step Verification: myaccount.google.com/security
 *   2. Create App Password: myaccount.google.com/apppasswords
 *      → Select app: "Mail", device: "Other" → name it "Vercel SMTP"
 *   3. Copy the 16-character password (spaces don't matter)
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
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@youneedled.com";
const PROJECT_NAME = "you-need-led-website";

if (!VERCEL_TOKEN) {
  console.error("VERCEL_TOKEN not set in .env.local");
  process.exit(1);
}
if (!SMTP_PASS || SMTP_PASS.includes("xxxx")) {
  console.error("SMTP_PASS not set. Add your Gmail App Password to .env.local:\n  SMTP_PASS=your-app-password-here");
  process.exit(1);
}
if (!SMTP_USER) {
  console.error("SMTP_USER not set in .env.local");
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
  console.log("Fetching project...");
  const projectRes = await vercelRequest("GET", `/v9/projects/${PROJECT_NAME}`);
  if (projectRes.status !== 200) { console.error("Project not found:", projectRes.body); process.exit(1); }
  const projectId = projectRes.body.id;
  console.log(`✓ Project: ${PROJECT_NAME} (${projectId})`);

  const envRes = await vercelRequest("GET", `/v9/projects/${projectId}/env`);
  const existing = envRes.body.envs || [];
  const byKey = Object.fromEntries(existing.map((e) => [e.key, e.id]));

  const updates = { SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL };
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
