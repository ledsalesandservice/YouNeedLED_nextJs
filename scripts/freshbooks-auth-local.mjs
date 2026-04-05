/**
 * FreshBooks Local OAuth — run this on your laptop to get a new refresh token.
 *
 * Usage:
 *   node scripts/freshbooks-auth-local.mjs
 *
 * What it does:
 *   1. Starts a local HTTPS server on port 8080
 *   2. Opens your browser to FreshBooks authorization
 *   3. After you click Authorize, captures the code automatically
 *   4. Exchanges the code for tokens
 *   5. Auto-pushes the token to Vercel — no manual steps needed
 *
 * Requires: Node.js 18+ + openssl (already on your machine)
 */

import https from "https";
import { execSync, exec } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

// ─── Credentials ─────────────────────────────────────────────────────────────

const CLIENT_ID =
  process.env.FRESHBOOKS_CLIENT_ID ||
  "034c42a31580ce6f420afd120f91b186bb19ac88af4bd0e6d4afcd7fe5f77b59";
const CLIENT_SECRET =
  process.env.FRESHBOOKS_CLIENT_SECRET ||
  "4fabe098f2cd7e524dd9cd8c317026faf3c5831c3edf4617475b4baa1dbf24cb";
const REDIRECT_URI = "https://localhost:8080";
const PORT = 8080;
const SYNC_SECRET =
  process.env.SYNC_SECRET ||
  "9e2c103fb574b44e513abf82764cf453d44310d40fbb5def00b9c8e05802e4ae";

// ─── Generate self-signed cert ────────────────────────────────────────────────

function generateCert() {
  const keyPath = path.join(os.tmpdir(), "fb-auth-key.pem");
  const certPath = path.join(os.tmpdir(), "fb-auth-cert.pem");
  if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    console.log("Generating temporary self-signed certificate...");
    execSync(
      `openssl req -x509 -newkey rsa:2048 -keyout ${keyPath} -out ${certPath} -days 1 -nodes -subj "/CN=localhost" 2>/dev/null`
    );
  }
  return { key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) };
}

// ─── Open browser ─────────────────────────────────────────────────────────────

function openBrowser(url) {
  const platform = os.platform();
  const cmd =
    platform === "darwin" ? `open "${url}"` :
    platform === "win32"  ? `start "" "${url}"` :
    `xdg-open "${url}"`;
  exec(cmd, (err) => {
    if (err) console.log("\nCould not auto-open browser. Open this URL manually:\n" + url + "\n");
  });
}

// ─── Exchange code for tokens ─────────────────────────────────────────────────

function exchangeCode(code) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
    });
    const req = https.request(
      {
        hostname: "api.freshbooks.com",
        path: "/auth/oauth/token",
        method: "POST",
        headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(new Error("Bad token response: " + data)); }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ─── Push token to Vercel via save endpoint ───────────────────────────────────

function saveToVercel(refreshToken, clientId, clientSecret) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ refreshToken, clientId, clientSecret });
    const req = https.request(
      {
        hostname: "www.youneedled.com",
        path: "/api/auth/save-freshbooks-token",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          Authorization: `Bearer ${SYNC_SECRET}`,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try { resolve(JSON.parse(data)); }
          catch { resolve({ raw: data }); }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const authUrl =
    `https://my.freshbooks.com/service/auth/oauth/authorize` +
    `?client_id=${CLIENT_ID}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

  let certs;
  try {
    certs = generateCert();
  } catch (e) {
    console.error("Failed to generate certificate:", e.message);
    console.log("\nOpen this URL manually, authorize, then paste the redirect URL back.");
    console.log("\nAuth URL:\n" + authUrl);
    return;
  }

  console.log("\n=== YNLED FreshBooks Authorization ===\n");
  console.log("Starting local server on https://localhost:" + PORT + "...");

  await new Promise((resolve) => {
    const server = https.createServer(certs, async (req, res) => {
      const urlObj = new URL("https://localhost:" + PORT + req.url);
      const code = urlObj.searchParams.get("code");
      const error = urlObj.searchParams.get("error");

      if (error) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(`<h1>Authorization failed</h1><p>${error}</p>`);
        console.error("\nAuthorization failed:", error);
        server.close();
        resolve();
        return;
      }

      if (!code) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Waiting for authorization...");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        "<h1 style='font-family:sans-serif;color:green'>✓ Authorized! Check your terminal.</h1>"
      );
      server.close();

      console.log("\n✓ Authorization code received. Exchanging for tokens...\n");

      try {
        const tokens = await exchangeCode(code);
        if (tokens.error) {
          console.error("Token exchange failed:", tokens.error, tokens.error_description || "");
          resolve();
          return;
        }

        console.log("✓ Tokens received.\n");

        // Always save to .env.local so update-vercel-creds.mjs can use it
        const envLocalPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", ".env.local");
        const envLine = `FRESHBOOKS_REFRESH_TOKEN=${tokens.refresh_token}\n`;
        // Update or append the token line
        if (fs.existsSync(envLocalPath)) {
          let contents = fs.readFileSync(envLocalPath, "utf8");
          if (contents.includes("FRESHBOOKS_REFRESH_TOKEN=")) {
            contents = contents.replace(/FRESHBOOKS_REFRESH_TOKEN=.*\n?/, envLine);
          } else {
            contents += envLine;
          }
          fs.writeFileSync(envLocalPath, contents);
        } else {
          fs.writeFileSync(envLocalPath, envLine);
        }
        console.log("✓ Refresh token saved to .env.local\n");

        // If VERCEL_TOKEN is available, update Vercel directly now
        const vercelToken = process.env.VERCEL_TOKEN;
        if (vercelToken) {
          console.log("VERCEL_TOKEN found — running update-vercel-creds.mjs automatically...\n");
          process.env.FRESHBOOKS_REFRESH_TOKEN = tokens.refresh_token;
          try {
            await import("./update-vercel-creds.mjs");
          } catch (e) {
            console.log("Auto-update failed:", e.message);
            console.log("Run manually: node scripts/update-vercel-creds.mjs");
          }
        } else {
          console.log("=".repeat(60));
          console.log("✓ Token saved. Now run:");
          console.log("  node scripts/update-vercel-creds.mjs");
          console.log("\n(Make sure VERCEL_TOKEN is in .env.local first)");
          console.log("=".repeat(60));
        }
      } catch (err) {
        console.error("Token exchange error:", err.message);
      }

      resolve();
    });

    server.listen(PORT, () => {
      console.log("✓ Server ready. Opening FreshBooks in your browser...\n");
      openBrowser(authUrl);
      console.log("If the browser did not open, go to:\n" + authUrl + "\n");
      console.log(
        "Note: Your browser will show a security warning for localhost — click Advanced → Proceed.\n"
      );
    });

    setTimeout(() => {
      console.log("\nTimeout — no authorization received after 3 minutes.");
      server.close();
      resolve();
    }, 180000);
  });
}

main().catch(console.error);
