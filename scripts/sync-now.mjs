/**
 * One-shot local Manus → FreshBooks invoice sync.
 *
 * Runs the exact same logic as the Vercel API function but directly
 * from your laptop — no deployment or Vercel env vars required.
 *
 * Usage:
 *   node scripts/sync-now.mjs            # live run — creates real invoices
 *   node scripts/sync-now.mjs --dry-run  # preview only, no changes
 *
 * Requires in .env.local (auto-created by freshbooks-auth-local.mjs):
 *   FRESHBOOKS_REFRESH_TOKEN=...
 *   MANUS_API_KEY=...                    (optional — uses hardcoded default)
 *
 * FreshBooks CLIENT_ID / CLIENT_SECRET are hardcoded (local OAuth app).
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ─── Load .env.local ─────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envFile = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^([^#=\s][^=]*)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

const DRY_RUN = process.argv.includes("--dry-run");

// ─── Credentials ─────────────────────────────────────────────────────────────

const MANUS_BASE = process.env.MANUS_CRM_BASE_URL || "https://ledservice.manus.space/api/sync";
const MANUS_API_KEY = process.env.MANUS_API_KEY;

const FB_CLIENT_ID = "034c42a31580ce6f420afd120f91b186bb19ac88af4bd0e6d4afcd7fe5f77b59";
const FB_CLIENT_SECRET = "4fabe098f2cd7e524dd9cd8c317026faf3c5831c3edf4617475b4baa1dbf24cb";
const FB_REFRESH_TOKEN = process.env.FRESHBOOKS_REFRESH_TOKEN;

if (!FB_REFRESH_TOKEN) {
  console.error(
    "❌  FRESHBOOKS_REFRESH_TOKEN not set in .env.local.\n" +
    "    Run the OAuth script first:\n" +
    "      node scripts/freshbooks-auth-local.mjs"
  );
  process.exit(1);
}

// ─── HTTP helper ─────────────────────────────────────────────────────────────

function httpRequest(method, url, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(
      {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method,
        headers: {
          "Content-Type": "application/json",
          ...(payload ? { "Content-Length": Buffer.byteLength(payload) } : {}),
          ...headers,
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

// ─── Manus CRM helpers ────────────────────────────────────────────────────────

async function manusGet(path, params = {}) {
  let url = `${MANUS_BASE}${path}`;
  const q = new URLSearchParams(params).toString();
  if (q) url += "?" + q;
  const r = await httpRequest("GET", url, { "X-API-Key": MANUS_API_KEY });
  if (r.status !== 200) throw new Error(`Manus GET ${path} → ${r.status}: ${JSON.stringify(r.body)}`);
  return r.body;
}

async function manusPut(path, body) {
  const r = await httpRequest("PUT", `${MANUS_BASE}${path}`, { "X-API-Key": MANUS_API_KEY }, body);
  if (r.status !== 200) throw new Error(`Manus PUT ${path} → ${r.status}: ${JSON.stringify(r.body)}`);
  return r.body.data;
}

async function manusGetAll(path) {
  const first = await manusGet(path, { page: 1, limit: 50 });
  const all = [...(first.data || [])];
  const totalPages = first.pagination?.totalPages ?? 1;
  for (let page = 2; page <= totalPages; page++) {
    const r = await manusGet(path, { page, limit: 50 });
    all.push(...(r.data || []));
  }
  return all;
}

// ─── FreshBooks helpers ───────────────────────────────────────────────────────

let accessToken = null;
let tokenExpiry = 0;
let currentRefreshToken = FB_REFRESH_TOKEN;
let accountId = process.env.FRESHBOOKS_ACCOUNT_ID || null;

async function refreshAccessToken() {
  const r = await httpRequest("POST", "https://api.freshbooks.com/auth/oauth/token", {}, {
    grant_type: "refresh_token",
    client_id: FB_CLIENT_ID,
    client_secret: FB_CLIENT_SECRET,
    refresh_token: currentRefreshToken,
  });
  if (r.status !== 200) {
    throw new Error(`FreshBooks token refresh failed: ${r.status} ${JSON.stringify(r.body)}`);
  }
  accessToken = r.body.access_token;
  tokenExpiry = Date.now() + r.body.expires_in * 1000;
  if (r.body.refresh_token && r.body.refresh_token !== currentRefreshToken) {
    currentRefreshToken = r.body.refresh_token;
    // Save rotated token back to .env.local
    if (fs.existsSync(envFile)) {
      let contents = fs.readFileSync(envFile, "utf8");
      const line = `FRESHBOOKS_REFRESH_TOKEN=${currentRefreshToken}\n`;
      if (contents.includes("FRESHBOOKS_REFRESH_TOKEN=")) {
        contents = contents.replace(/FRESHBOOKS_REFRESH_TOKEN=.*\n?/, line);
      } else {
        contents += line;
      }
      fs.writeFileSync(envFile, contents);
    }
    console.log("  ↻ Refresh token rotated — saved to .env.local");
  }
}

async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpiry - 60_000) return accessToken;
  await refreshAccessToken();
  return accessToken;
}

async function getAccountId() {
  if (accountId) return accountId;
  const token = await getAccessToken();
  const r = await httpRequest("GET", "https://api.freshbooks.com/auth/api/v1/users/me", {
    Authorization: `Bearer ${token}`,
  });
  if (r.status !== 200) throw new Error(`FreshBooks /me → ${r.status}: ${JSON.stringify(r.body)}`);
  const biz = r.body.response?.business_memberships?.[0]?.business?.account_id;
  if (!biz) throw new Error(`Could not determine FreshBooks account_id from /me response: ${JSON.stringify(r.body)}`);
  accountId = biz;
  console.log(`  ✓ FreshBooks account ID: ${accountId}`);
  return accountId;
}

async function fbGet(path, params = {}) {
  const token = await getAccessToken();
  let url = `https://api.freshbooks.com${path}`;
  const q = new URLSearchParams(params).toString();
  if (q) url += "?" + q;
  const r = await httpRequest("GET", url, { Authorization: `Bearer ${token}` });
  if (r.status !== 200) throw new Error(`FreshBooks GET ${path} → ${r.status}: ${JSON.stringify(r.body)}`);
  return r.body.response;
}

async function fbPost(path, body) {
  const token = await getAccessToken();
  const r = await httpRequest("POST", `https://api.freshbooks.com${path}`, {
    Authorization: `Bearer ${token}`,
  }, body);
  if (r.status !== 200 && r.status !== 201) {
    throw new Error(`FreshBooks POST ${path} → ${r.status}: ${JSON.stringify(r.body)}`);
  }
  return r.body.response;
}

async function getFreshBooksClients() {
  const acct = await getAccountId();
  const all = [];
  let page = 1;
  while (true) {
    const r = await fbGet(`/accounting/account/${acct}/users/clients`, { page, per_page: 100 });
    all.push(...(r.result.clients || []));
    if (page >= r.result.pages) break;
    page++;
  }
  return all;
}

async function createFreshBooksClient(data) {
  const acct = await getAccountId();
  const r = await fbPost(`/accounting/account/${acct}/users/clients`, {
    client: {
      organization: data.organization,
      email: data.email || "",
      p_street: data.street || "",
      p_city: data.city || "",
      p_province: data.state || "",
      p_code: data.zip || "",
    },
  });
  return r.result.client.id;
}

async function createFreshBooksInvoice(data) {
  const acct = await getAccountId();
  const r = await fbPost(`/accounting/account/${acct}/invoices/invoices`, {
    invoice: {
      customerid: data.clientId,
      create_date: new Date().toISOString().split("T")[0],
      notes: data.notes || "",
      lines: data.lines.map((l) => ({
        type: 0,
        name: l.name,
        description: l.description,
        qty: l.qty,
        unit_cost: l.unit_cost,
      })),
      status: 1, // draft
    },
  });
  return {
    invoiceId: r.result.invoice.id,
    invoiceNumber: r.result.invoice.invoice_number,
  };
}

// ─── Sync logic ───────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n=== Manus → FreshBooks Sync (${DRY_RUN ? "DRY RUN" : "LIVE"}) ===\n`);

  if (!MANUS_API_KEY) {
    console.warn("⚠  MANUS_API_KEY not in .env.local — using empty key (may fail)");
  }

  // 1. Load clients
  console.log("Loading Manus clients and FreshBooks clients...");
  const [manusClients, fbClients] = await Promise.all([
    manusGetAll("/clients"),
    getFreshBooksClients(),
  ]);

  const fbByOrg = new Map();
  for (const c of fbClients) {
    if (c.organization) fbByOrg.set(c.organization.toLowerCase().trim(), c.id);
  }

  // 2. Link unlinked Manus clients to FreshBooks
  const unlinked = manusClients.filter((c) => !c.freshbooksId);
  console.log(`\n${unlinked.length} Manus client(s) need FreshBooks linking`);

  let clientsLinked = 0, clientsCreated = 0;

  for (const mc of unlinked) {
    const orgKey = mc.propertyName.toLowerCase().trim();
    let fbId = fbByOrg.get(orgKey);
    if (!fbId) {
      const firstWord = orgKey.split(" ")[0];
      fbId = [...fbByOrg.entries()].find(([k]) => k.includes(firstWord))?.[1];
    }

    if (fbId) {
      console.log(`  ✓ Linked "${mc.propertyName}" → FreshBooks ${fbId}`);
      if (!DRY_RUN) await manusPut(`/clients/${mc.id}`, { freshbooksId: String(fbId) });
      clientsLinked++;
    } else {
      console.log(`  + Creating FreshBooks client for "${mc.propertyName}"`);
      if (!DRY_RUN) {
        const newId = await createFreshBooksClient({
          organization: mc.propertyName,
          email: mc.contactEmail,
          street: mc.address,
          city: mc.city,
          state: mc.state,
          zip: mc.zip,
        });
        await manusPut(`/clients/${mc.id}`, { freshbooksId: String(newId) });
        fbByOrg.set(orgKey, newId);
      }
      clientsCreated++;
    }
  }

  // 3. Reload clients after linking
  const updatedClients = DRY_RUN ? manusClients : await manusGetAll("/clients");
  const clientById = new Map(updatedClients.map((c) => [c.id, c]));

  // 4. Find completed, uninvoiced work orders
  const workOrders = await manusGetAll("/work-orders");
  const uninvoiced = workOrders.filter(
    (wo) => wo.status === "completed" && !wo.freshbooksInvoiceId
  );
  console.log(`\n${uninvoiced.length} completed work order(s) need invoicing:`);
  for (const wo of uninvoiced) {
    console.log(`  • ${wo.workOrderNumber} — ${wo.title} ($${wo.totalAmount || "0"})`);
  }

  let invoicesCreated = 0;
  const errors = [];

  for (const wo of uninvoiced) {
    try {
      const mc = clientById.get(wo.clientId);
      if (!mc) { errors.push({ id: wo.workOrderNumber, error: `Client ${wo.clientId} not found` }); continue; }
      if (!mc.freshbooksId) { errors.push({ id: wo.workOrderNumber, error: `Client has no freshbooksId` }); continue; }

      const fbClientId = parseInt(mc.freshbooksId, 10);
      const lines = [];

      const laborHours = parseFloat(wo.laborHours || "0");
      if (laborHours > 0) {
        const laborRate = parseFloat(wo.laborRate || "95");
        lines.push({
          name: "Labor",
          description: wo.title || "Service call",
          qty: laborHours,
          unit_cost: { amount: String(laborRate), code: "USD" },
        });
      }

      const partsTotal = parseFloat(wo.partsTotal || "0");
      if (partsTotal > 0) {
        lines.push({
          name: "Parts & Materials",
          description: wo.description || "",
          qty: 1,
          unit_cost: { amount: String(partsTotal), code: "USD" },
        });
      }

      if (lines.length === 0) {
        lines.push({
          name: wo.title || "Service",
          description: wo.description || "",
          qty: 1,
          unit_cost: { amount: "0.00", code: "USD" },
        });
      }

      const notes = [
        `Work Order: ${wo.workOrderNumber}`,
        wo.siteAddress ? `Site: ${wo.siteAddress}` : null,
        wo.completedDate ? `Completed: ${wo.completedDate.split("T")[0]}` : null,
        wo.workPerformed ? `Work performed: ${wo.workPerformed}` : null,
      ].filter(Boolean).join("\n");

      console.log(`\n  Creating invoice for ${wo.workOrderNumber} (${mc.propertyName})...`);

      if (!DRY_RUN) {
        const { invoiceId, invoiceNumber } = await createFreshBooksInvoice({ clientId: fbClientId, notes, lines });
        await manusPut(`/work-orders/${wo.id}`, {
          freshbooksInvoiceId: String(invoiceId),
          freshbooksClientId: String(fbClientId),
          timeSyncStatus: "synced",
          timeSyncError: null,
        });
        console.log(`  ✓ Invoice ${invoiceNumber} created (ID: ${invoiceId})`);
      } else {
        console.log(`  [DRY RUN] Would create invoice for FreshBooks client ${fbClientId}`);
      }

      invoicesCreated++;
    } catch (err) {
      const msg = err.message || String(err);
      console.error(`  ✗ ${wo.workOrderNumber}: ${msg}`);
      if (!DRY_RUN) {
        await manusPut(`/work-orders/${wo.id}`, { timeSyncStatus: "failed", timeSyncError: msg }).catch(() => {});
      }
      errors.push({ id: wo.workOrderNumber, error: msg });
    }
  }

  console.log("\n=== Summary ===");
  console.log(`  Clients linked:  ${clientsLinked}`);
  console.log(`  Clients created: ${clientsCreated}`);
  console.log(`  Invoices${DRY_RUN ? " (would create)" : " created"}: ${invoicesCreated}`);
  if (errors.length) {
    console.log(`  Errors: ${errors.length}`);
    for (const e of errors) console.log(`    • ${e.id}: ${e.error}`);
  }
  console.log();
  if (DRY_RUN) {
    console.log("Dry run complete. Run without --dry-run to create real invoices.");
  } else {
    console.log("Done. Check FreshBooks for draft invoices.");
  }
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
