/**
 * Vercel serverless function: POST /api/sync/manus-freshbooks
 *
 * All integration code (Manus + FreshBooks clients and sync logic) is inlined
 * into this single file so Vercel's @vercel/node transpiler can compile it
 * without needing to bundle relative TypeScript imports from other project files.
 *
 * Auth (either is accepted):
 *   - Authorization: Bearer <SYNC_SECRET>   for manual / external triggers
 *   - x-vercel-cron: 1                      for Vercel Cron Jobs (automatic)
 *
 * Vercel Cron schedule (see vercel.json):
 *   Runs daily at 8am ET (12:00 UTC) on weekdays.
 *
 * Manual trigger:
 *   curl -X POST https://youneedled.com/api/sync/manus-freshbooks \
 *     -H "Authorization: Bearer <SYNC_SECRET>"
 *
 * Dry run (no changes):
 *   curl -X POST "https://youneedled.com/api/sync/manus-freshbooks?dry_run=1" \
 *     -H "Authorization: Bearer <SYNC_SECRET>"
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

// ─── Manus CRM client ────────────────────────────────────────────────────────

const MANUS_BASE =
  process.env.MANUS_API_URL ||
  "https://3000-iujn5eifihv0yz7osu35w-876aec97.us2.manus.computer/api/sync";

interface ManusClient {
  id: number;
  propertyName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  contactName: string;
  contactPhone: string | null;
  contactEmail: string;
  notes: string | null;
  freshbooksId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ManusWorkOrder {
  id: number;
  clientId: number;
  workOrderNumber: string;
  workOrderType: string;
  serviceCategory: string;
  status: "pending" | "scheduled" | "inProgress" | "completed" | "invoiced";
  title: string;
  description: string;
  siteAddress: string;
  workPerformed: string | null;
  laborHours: string;
  laborRate: string | null;
  laborTotal: string;
  partsTotal: string | null;
  totalAmount: string | null;
  freshbooksInvoiceId: string | null;
  freshbooksClientId: string | null;
  timeSyncStatus: "not_synced" | "synced" | "failed";
  timeSyncError: string | null;
  completedDate: string | null;
  createdAt: string;
  updatedAt: string;
}

async function manusGet<T>(
  path: string,
  params: Record<string, string | number> = {}
): Promise<{ data: T; pagination?: { total: number; totalPages: number; page: number; limit: number } }> {
  const url = new URL(`${MANUS_BASE}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url.toString(), {
    headers: { "X-API-Key": process.env.MANUS_API_KEY! },
  });
  if (!res.ok) throw new Error(`Manus GET ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

async function manusPut<T>(path: string, body: Partial<T>): Promise<T> {
  const res = await fetch(`${MANUS_BASE}${path}`, {
    method: "PUT",
    headers: { "X-API-Key": process.env.MANUS_API_KEY!, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Manus PUT ${path} → ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.data;
}

async function manusGetAll<T>(path: string): Promise<T[]> {
  const first = await manusGet<T[]>(path, { page: 1, limit: 50 });
  const all: T[] = [...(first.data as T[])];
  const totalPages = first.pagination?.totalPages ?? 1;
  for (let page = 2; page <= totalPages; page++) {
    const r = await manusGet<T[]>(path, { page, limit: 50 });
    all.push(...(r.data as T[]));
  }
  return all;
}

const manus = {
  getClients: () => manusGetAll<ManusClient>("/clients"),
  getClient: (id: number) => manusGet<ManusClient>(`/clients/${id}`).then((r) => r.data),
  updateClient: (id: number, body: Partial<ManusClient>) =>
    manusPut<ManusClient>(`/clients/${id}`, body),
  getWorkOrders: () => manusGetAll<ManusWorkOrder>("/work-orders"),
  updateWorkOrder: (id: number, body: Partial<ManusWorkOrder>) =>
    manusPut<ManusWorkOrder>(`/work-orders/${id}`, body),
};

// ─── FreshBooks client ───────────────────────────────────────────────────────

const FB_BASE = "https://api.freshbooks.com";
const ACCOUNT_ID = process.env.FRESHBOOKS_ACCOUNT_ID!;

let cachedToken: string | null = null;
let tokenExpiry = 0;

async function persistRotatedToken(newRefreshToken: string): Promise<void> {
  const vercelApiToken = process.env.VERCEL_API_TOKEN;
  const vercelProjectId = process.env.VERCEL_PROJECT_ID;
  const vercelEnvId = process.env.VERCEL_REFRESH_ENV_ID;
  if (!vercelApiToken || !vercelProjectId || !vercelEnvId) {
    console.warn(
      "[freshbooks] Refresh token rotated but VERCEL vars not set — update FRESHBOOKS_REFRESH_TOKEN manually:",
      newRefreshToken.slice(0, 8) + "..."
    );
    return;
  }
  await fetch(`https://api.vercel.com/v9/projects/${vercelProjectId}/env/${vercelEnvId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${vercelApiToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ value: newRefreshToken }),
  });
  console.log("[freshbooks] Refresh token rotated and persisted to Vercel env var.");
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry - 60_000) return cachedToken;

  const res = await fetch(`${FB_BASE}/auth/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "refresh_token",
      client_id: process.env.FRESHBOOKS_CLIENT_ID,
      client_secret: process.env.FRESHBOOKS_CLIENT_SECRET,
      refresh_token: process.env.FRESHBOOKS_REFRESH_TOKEN,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`FreshBooks token refresh failed: ${res.status} ${err}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000;

  if (data.refresh_token && data.refresh_token !== process.env.FRESHBOOKS_REFRESH_TOKEN) {
    await persistRotatedToken(data.refresh_token);
  }

  return cachedToken!;
}

async function fbGet<T>(path: string, params: Record<string, string | number> = {}): Promise<T> {
  const token = await getAccessToken();
  const url = new URL(`${FB_BASE}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`FreshBooks GET ${path} → ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.response;
}

async function fbPost<T>(path: string, body: unknown): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(`${FB_BASE}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`FreshBooks POST ${path} → ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.response;
}

interface FreshBooksClient {
  id: number;
  organization: string;
  email: string;
}

interface FreshBooksLineItem {
  name: string;
  description: string;
  qty: number;
  unit_cost: { amount: string; code: string };
}

const freshbooks = {
  async getClients(): Promise<FreshBooksClient[]> {
    const all: FreshBooksClient[] = [];
    let page = 1;
    while (true) {
      const r = await fbGet<{
        result: {
          clients: FreshBooksClient[];
          pages: number;
        };
      }>(`/accounting/account/${ACCOUNT_ID}/users/clients`, { page, per_page: 100 });
      all.push(...r.result.clients);
      if (page >= r.result.pages) break;
      page++;
    }
    return all;
  },

  async createClient(data: {
    organization: string;
    email?: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  }): Promise<number> {
    const r = await fbPost<{ result: { client: { id: number } } }>(
      `/accounting/account/${ACCOUNT_ID}/users/clients`,
      {
        client: {
          organization: data.organization,
          email: data.email || "",
          p_street: data.street || "",
          p_city: data.city || "",
          p_province: data.state || "",
          p_code: data.zip || "",
        },
      }
    );
    return r.result.client.id;
  },

  async createInvoice(data: {
    clientId: number;
    notes?: string;
    lines: FreshBooksLineItem[];
  }): Promise<{ invoiceId: number; invoiceNumber: string }> {
    const r = await fbPost<{ result: { invoice: { id: number; invoice_number: string } } }>(
      `/accounting/account/${ACCOUNT_ID}/invoices/invoices`,
      {
        invoice: {
          customerid: data.clientId,
          notes: data.notes || "",
          lines: data.lines.map((l) => ({
            type: 0,
            name: l.name,
            description: l.description,
            qty: l.qty,
            unit_cost: l.unit_cost,
          })),
          status: 1, // draft — Derek reviews before sending
        },
      }
    );
    return { invoiceId: r.result.invoice.id, invoiceNumber: r.result.invoice.invoice_number };
  },
};

// ─── Sync logic ───────────────────────────────────────────────────────────────

interface SyncResult {
  clientsLinked: number;
  clientsCreated: number;
  invoicesCreated: number;
  errors: { id: number | string; error: string }[];
}

async function syncManusToFreshBooks(dryRun = false): Promise<SyncResult> {
  const result: SyncResult = {
    clientsLinked: 0,
    clientsCreated: 0,
    invoicesCreated: 0,
    errors: [],
  };

  console.log("[sync] Loading Manus clients and FreshBooks clients...");
  const [manusClients, fbClients] = await Promise.all([
    manus.getClients(),
    freshbooks.getClients(),
  ]);

  const fbByOrg = new Map<string, number>();
  for (const c of fbClients) {
    if (c.organization) fbByOrg.set(c.organization.toLowerCase().trim(), c.id);
  }

  const unlinkedClients = manusClients.filter((c) => !c.freshbooksId);
  console.log(`[sync] ${unlinkedClients.length} Manus clients need FreshBooks linking`);

  for (const mc of unlinkedClients) {
    try {
      const orgKey = mc.propertyName.toLowerCase().trim();
      let fbId = fbByOrg.get(orgKey);

      if (!fbId) {
        const firstWord = orgKey.split(" ")[0];
        fbId = [...fbByOrg.entries()].find(([k]) => k.includes(firstWord))?.[1];
      }

      if (fbId) {
        console.log(
          `[sync] Matched Manus client ${mc.id} "${mc.propertyName}" → FreshBooks ${fbId}`
        );
        if (!dryRun) {
          await manus.updateClient(mc.id, { freshbooksId: String(fbId) });
        }
        result.clientsLinked++;
      } else {
        console.log(`[sync] Creating FreshBooks client for "${mc.propertyName}"`);
        if (!dryRun) {
          const newId = await freshbooks.createClient({
            organization: mc.propertyName,
            email: mc.contactEmail || undefined,
            street: mc.address || undefined,
            city: mc.city || undefined,
            state: mc.state || undefined,
            zip: mc.zip || undefined,
          });
          await manus.updateClient(mc.id, { freshbooksId: String(newId) });
          fbByOrg.set(orgKey, newId);
        }
        result.clientsCreated++;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      result.errors.push({ id: mc.id, error: `Client link failed: ${message}` });
    }
  }

  const updatedManusClients = dryRun ? manusClients : await manus.getClients();
  const manusClientById = new Map(updatedManusClients.map((c) => [c.id, c]));

  const workOrders = await manus.getWorkOrders();
  const uninvoicedWOs = workOrders.filter(
    (wo) => wo.status === "completed" && !wo.freshbooksInvoiceId
  );
  console.log(`[sync] ${uninvoicedWOs.length} completed work orders need invoicing`);

  for (const wo of uninvoicedWOs) {
    try {
      const mc = manusClientById.get(wo.clientId);
      if (!mc) {
        result.errors.push({ id: wo.id, error: `Client ${wo.clientId} not found in Manus` });
        continue;
      }

      if (!mc.freshbooksId) {
        result.errors.push({
          id: wo.id,
          error: `Client ${wo.clientId} has no freshbooksId — run client sync first`,
        });
        continue;
      }

      const fbClientId = parseInt(mc.freshbooksId, 10);
      const lines: FreshBooksLineItem[] = [];

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
      ]
        .filter(Boolean)
        .join("\n");

      console.log(
        `[sync] Creating invoice for WO ${wo.workOrderNumber} (client: ${mc.propertyName})`
      );

      if (!dryRun) {
        const { invoiceId, invoiceNumber } = await freshbooks.createInvoice({
          clientId: fbClientId,
          notes,
          lines,
        });

        await manus.updateWorkOrder(wo.id, {
          freshbooksInvoiceId: String(invoiceId),
          freshbooksClientId: String(fbClientId),
          timeSyncStatus: "synced",
          timeSyncError: null,
        });

        console.log(`[sync] ✓ Invoice ${invoiceNumber} created → WO ${wo.workOrderNumber}`);
      }

      result.invoicesCreated++;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[sync] ✗ WO ${wo.id}: ${message}`);

      if (!dryRun) {
        await manus
          .updateWorkOrder(wo.id, { timeSyncStatus: "failed", timeSyncError: message })
          .catch(() => {});
      }

      result.errors.push({ id: wo.id, error: message });
    }
  }

  return result;
}

// ─── Vercel handler ───────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const isVercelCron = req.headers["x-vercel-cron"] === "1";
  const secret = process.env.SYNC_SECRET;
  const auth = req.headers.authorization;
  const isManualAuth = secret && auth === `Bearer ${secret}`;

  if (!isVercelCron && !isManualAuth) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const dryRun = req.query.dry_run === "1" || req.body?.dry_run === true;

  console.log(
    `[sync] Triggered by: ${isVercelCron ? "Vercel Cron" : "manual"}, dry_run=${dryRun}`
  );

  try {
    const result = await syncManusToFreshBooks(dryRun);
    return res.status(200).json({
      ok: true,
      triggeredBy: isVercelCron ? "cron" : "manual",
      dryRun,
      ...result,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[sync-handler] Fatal:", message);
    return res.status(500).json({ ok: false, error: message });
  }
}
