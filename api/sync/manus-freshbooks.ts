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
 * Modes (query params or body fields):
 *   dry_run=1        — Collect pending items, return JSON only, no Telegram, no FreshBooks writes.
 *   (default/cron)   — Preview mode: collect pending items, send Telegram summary, no FreshBooks writes.
 *   execute=1        — Execute mode: create FreshBooks invoices for all pending items.
 *                      Must be triggered by authorized caller (SYNC_SECRET or Vercel Cron).
 *
 * Manual trigger (preview):
 *   curl -X POST https://youneedled.com/api/sync/manus-freshbooks \
 *     -H "Authorization: Bearer <SYNC_SECRET>"
 *
 * Manual execute:
 *   curl -X POST "https://youneedled.com/api/sync/manus-freshbooks?execute=1" \
 *     -H "Authorization: Bearer <SYNC_SECRET>"
 *
 * Dry run (no changes, no Telegram):
 *   curl -X POST "https://youneedled.com/api/sync/manus-freshbooks?dry_run=1" \
 *     -H "Authorization: Bearer <SYNC_SECRET>"
 *
 * New env var (optional):
 *   SERVICE_LOG_LABOR_RATE — Default $/hr for service logs (default: 95, same as work orders)
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

// ─── Manus CRM client ────────────────────────────────────────────────────────

// Use the stable custom domain — MANUS_API_URL was the old sandbox URL and caused 502s
const MANUS_BASE =
  process.env.MANUS_CRM_BASE_URL ||
  "https://ledservice.manus.space/api/sync";

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

interface ManusServiceLog {
  id: number;
  clientId: number;
  workOrderId: number | null;
  serviceType: "installation" | "inspection" | "maintenance" | "repair" | "other";
  serviceDate: string;
  laborHours: string;
  status: string;
  description: string | null;
  notes: string | null;
  technicianName: string | null;
  invoiceNumber: string | null;
  freshbooksInvoiceId: string | null;
  freshbooksClientId: string | null;
  timeSyncStatus: "not_synced" | "synced" | "failed" | null;
  timeSyncError: string | null;
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
  getServiceLogs: () => manusGetAll<ManusServiceLog>("/service-logs"),
  updateServiceLog: (id: number, body: Partial<ManusServiceLog>) =>
    manusPut<ManusServiceLog>(`/service-logs/${id}`, body),
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
          create_date: new Date().toISOString().split("T")[0], // YYYY-MM-DD required by FreshBooks
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

// ─── Preview types ────────────────────────────────────────────────────────────

interface PendingWorkOrder {
  kind: "work_order";
  id: number;
  clientName: string;
  workOrderNumber: string;
  title: string;
  laborHours: number;
  laborRate: number;
  partsTotal: number;
  totalEstimate: number;
  completedDate: string | null;
}

interface PendingServiceLog {
  kind: "service_log";
  id: number;
  clientName: string;
  serviceType: string;
  serviceDate: string;
  laborHours: number;
  laborRate: number;
  totalEstimate: number;
}

type PendingItem = PendingWorkOrder | PendingServiceLog;

interface SyncResult {
  clientsLinked: number;
  clientsCreated: number;
  invoicesCreated: number;
  errors: { id: number | string; error: string }[];
}

// ─── Telegram notification ────────────────────────────────────────────────────

async function sendTelegramPreview(pending: PendingItem[]): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[sync] Telegram env vars not set — skipping preview notification");
    return;
  }

  if (pending.length === 0) {
    const text =
      "✅ *Daily Invoice Review*\n\nNo pending items to invoice today. Nothing to approve.";
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: Number(chatId), text, parse_mode: "Markdown" }),
    });
    return;
  }

  const totalRevenue = pending.reduce((sum, item) => sum + item.totalEstimate, 0);
  const woCount = pending.filter((i) => i.kind === "work_order").length;
  const slCount = pending.filter((i) => i.kind === "service_log").length;

  const lines: string[] = [];
  lines.push(`💰 *Daily Invoice Review*`);
  lines.push(`\n${pending.length} item(s) ready — est. $${totalRevenue.toFixed(2)} total\n`);

  if (woCount > 0) {
    lines.push(`*Work Orders (${woCount}):*`);
    for (const item of pending) {
      if (item.kind !== "work_order") continue;
      const parts: string[] = [];
      if (item.laborHours > 0) parts.push(`${item.laborHours}h labor @ $${item.laborRate}/hr`);
      if (item.partsTotal > 0) parts.push(`$${item.partsTotal.toFixed(2)} parts`);
      lines.push(`• ${item.clientName} — ${item.title} (${parts.join(", ")}) = *$${item.totalEstimate.toFixed(2)}*`);
    }
    lines.push("");
  }

  if (slCount > 0) {
    lines.push(`*Service Logs (${slCount}):*`);
    for (const item of pending) {
      if (item.kind !== "service_log") continue;
      lines.push(
        `• ${item.clientName} — ${item.serviceType} on ${item.serviceDate} (${item.laborHours}h @ $${item.laborRate}/hr) = *$${item.totalEstimate.toFixed(2)}*`
      );
    }
    lines.push("");
  }

  lines.push(`Reply /approve to create these drafts in FreshBooks.`);
  lines.push(`Reply /pending to see this list again.`);

  const text = lines.join("\n");
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: Number(chatId), text, parse_mode: "Markdown" }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("[sync] Telegram preview failed:", err);
  }
}

// ─── Pending items query (shared by preview and execute) ──────────────────────

async function getPendingItems(
  manusClientById: Map<number, ManusClient>
): Promise<PendingItem[]> {
  const serviceLogRate = parseFloat(process.env.SERVICE_LOG_LABOR_RATE || "95");
  const pending: PendingItem[] = [];

  // Work orders
  const workOrders = await manus.getWorkOrders();
  const uninvoicedWOs = workOrders.filter(
    (wo) => wo.status === "completed" && !wo.freshbooksInvoiceId
  );
  for (const wo of uninvoicedWOs) {
    const mc = manusClientById.get(wo.clientId);
    const clientName = mc?.propertyName ?? `Client #${wo.clientId}`;
    const laborHours = parseFloat(wo.laborHours || "0");
    const laborRate = parseFloat(wo.laborRate || "95");
    const partsTotal = parseFloat(wo.partsTotal || "0");
    const totalEstimate = laborHours * laborRate + partsTotal;
    pending.push({
      kind: "work_order",
      id: wo.id,
      clientName,
      workOrderNumber: wo.workOrderNumber,
      title: wo.title || "Service call",
      laborHours,
      laborRate,
      partsTotal,
      totalEstimate,
      completedDate: wo.completedDate,
    });
  }

  // Service logs
  const serviceLogs = await manus.getServiceLogs();
  const uninvoicedSLs = serviceLogs.filter(
    (sl) =>
      sl.status === "completed" &&
      !sl.invoiceNumber &&
      !sl.freshbooksInvoiceId
  );
  for (const sl of uninvoicedSLs) {
    const mc = manusClientById.get(sl.clientId);
    const clientName = mc?.propertyName ?? `Client #${sl.clientId}`;
    const laborHours = parseFloat(sl.laborHours || "0");
    const totalEstimate = laborHours * serviceLogRate;
    pending.push({
      kind: "service_log",
      id: sl.id,
      clientName,
      serviceType: sl.serviceType,
      serviceDate: sl.serviceDate?.split("T")[0] ?? "unknown",
      laborHours,
      laborRate: serviceLogRate,
      totalEstimate,
    });
  }

  return pending;
}

// ─── Sync (execute) logic ─────────────────────────────────────────────────────

async function syncManusToFreshBooks(): Promise<SyncResult> {
  const result: SyncResult = {
    clientsLinked: 0,
    clientsCreated: 0,
    invoicesCreated: 0,
    errors: [],
  };

  const serviceLogRate = parseFloat(process.env.SERVICE_LOG_LABOR_RATE || "95");

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
        await manus.updateClient(mc.id, { freshbooksId: String(fbId) });
        result.clientsLinked++;
      } else {
        console.log(`[sync] Creating FreshBooks client for "${mc.propertyName}"`);
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
        result.clientsCreated++;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      result.errors.push({ id: mc.id, error: `Client link failed: ${message}` });
    }
  }

  // Re-fetch clients to get freshbooksIds for newly linked ones
  const updatedManusClients = await manus.getClients();
  const manusClientById = new Map(updatedManusClients.map((c) => [c.id, c]));

  // ── Work orders ──

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

      console.log(`[sync] ✓ WO invoice ${invoiceNumber} created → WO ${wo.workOrderNumber}`);
      result.invoicesCreated++;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[sync] ✗ WO ${wo.id}: ${message}`);

      await manus
        .updateWorkOrder(wo.id, { timeSyncStatus: "failed", timeSyncError: message })
        .catch(() => {});

      result.errors.push({ id: wo.id, error: message });
    }
  }

  // ── Service logs ──

  const serviceLogs = await manus.getServiceLogs();
  const uninvoicedSLs = serviceLogs.filter(
    (sl) =>
      sl.status === "completed" &&
      !sl.invoiceNumber &&
      !sl.freshbooksInvoiceId
  );
  console.log(`[sync] ${uninvoicedSLs.length} completed service logs need invoicing`);

  // Group service logs by client to batch into one invoice per client
  const slsByClient = new Map<number, ManusServiceLog[]>();
  for (const sl of uninvoicedSLs) {
    const arr = slsByClient.get(sl.clientId) ?? [];
    arr.push(sl);
    slsByClient.set(sl.clientId, arr);
  }

  for (const [clientId, logs] of slsByClient) {
    try {
      const mc = manusClientById.get(clientId);
      if (!mc) {
        for (const sl of logs) {
          result.errors.push({ id: sl.id, error: `Client ${clientId} not found in Manus` });
        }
        continue;
      }

      if (!mc.freshbooksId) {
        for (const sl of logs) {
          result.errors.push({
            id: sl.id,
            error: `Client ${clientId} has no freshbooksId — run client sync first`,
          });
        }
        continue;
      }

      const fbClientId = parseInt(mc.freshbooksId, 10);
      const lines: FreshBooksLineItem[] = [];

      for (const sl of logs) {
        const laborHours = parseFloat(sl.laborHours || "0");
        if (laborHours > 0) {
          lines.push({
            name: `${sl.serviceType.charAt(0).toUpperCase() + sl.serviceType.slice(1)} — ${sl.serviceDate?.split("T")[0] ?? ""}`,
            description: sl.description || sl.notes || "",
            qty: laborHours,
            unit_cost: { amount: String(serviceLogRate), code: "USD" },
          });
        }
      }

      if (lines.length === 0) {
        // All logs have 0 labor hours — create a $0 placeholder so Derek can fill in
        lines.push({
          name: "Service — labor hours TBD",
          description: logs.map((sl) => `${sl.serviceType} on ${sl.serviceDate?.split("T")[0]}`).join("; "),
          qty: 1,
          unit_cost: { amount: "0.00", code: "USD" },
        });
      }

      const logDates = [...new Set(logs.map((sl) => sl.serviceDate?.split("T")[0]).filter(Boolean))];
      const notes = [
        `Service log IDs: ${logs.map((sl) => sl.id).join(", ")}`,
        logDates.length > 0 ? `Service dates: ${logDates.join(", ")}` : null,
        `Rate: $${serviceLogRate}/hr`,
      ]
        .filter(Boolean)
        .join("\n");

      console.log(
        `[sync] Creating service log invoice for client ${mc.propertyName} (${logs.length} logs)`
      );

      const { invoiceId, invoiceNumber } = await freshbooks.createInvoice({
        clientId: fbClientId,
        notes,
        lines,
      });

      // Write invoice number back to each service log
      for (const sl of logs) {
        await manus
          .updateServiceLog(sl.id, {
            freshbooksInvoiceId: String(invoiceId),
            freshbooksClientId: String(fbClientId),
            invoiceNumber,
            timeSyncStatus: "synced",
            timeSyncError: null,
          })
          .catch((err: unknown) => {
            const message = err instanceof Error ? err.message : String(err);
            console.error(`[sync] Could not write invoiceNumber back to SL ${sl.id}: ${message}`);
          });
      }

      console.log(
        `[sync] ✓ Service log invoice ${invoiceNumber} created → ${logs.length} log(s) for ${mc.propertyName}`
      );
      result.invoicesCreated++;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[sync] ✗ Service logs for client ${clientId}: ${message}`);

      for (const sl of logs) {
        await manus
          .updateServiceLog(sl.id, { timeSyncStatus: "failed", timeSyncError: message })
          .catch(() => {});
        result.errors.push({ id: sl.id, error: message });
      }
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
  const execute = req.query.execute === "1" || req.body?.execute === true;

  console.log(
    `[sync] Triggered by: ${isVercelCron ? "Vercel Cron" : "manual"}, ` +
    `mode=${dryRun ? "dry_run" : execute ? "execute" : "preview"}`
  );

  try {
    if (execute) {
      // Execute mode — actually create FreshBooks invoices
      const result = await syncManusToFreshBooks();

      // Send Telegram confirmation
      const token = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (token && chatId) {
        const statusLine = result.errors.length > 0
          ? `⚠️ ${result.invoicesCreated} invoice(s) created, ${result.errors.length} error(s). Check logs.`
          : `✅ ${result.invoicesCreated} invoice(s) created in FreshBooks as drafts. Review and send when ready.`;
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: Number(chatId),
            text: statusLine,
            parse_mode: "Markdown",
          }),
        });
      }

      return res.status(200).json({
        ok: true,
        mode: "execute",
        triggeredBy: isVercelCron ? "cron" : "manual",
        ...result,
      });
    }

    // Preview mode (default cron behavior, or explicit dry_run)
    const manusClients = await manus.getClients();
    const manusClientById = new Map(manusClients.map((c) => [c.id, c]));
    const pending = await getPendingItems(manusClientById);

    if (!dryRun) {
      // Send Telegram preview so Derek can approve
      await sendTelegramPreview(pending);
    }

    return res.status(200).json({
      ok: true,
      mode: dryRun ? "dry_run" : "preview",
      triggeredBy: isVercelCron ? "cron" : "manual",
      pendingCount: pending.length,
      pendingWorkOrders: pending.filter((i) => i.kind === "work_order").length,
      pendingServiceLogs: pending.filter((i) => i.kind === "service_log").length,
      estimatedRevenue: pending.reduce((sum, i) => sum + i.totalEstimate, 0).toFixed(2),
      items: pending,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[sync-handler] Fatal:", message);
    return res.status(500).json({ ok: false, error: message });
  }
}
