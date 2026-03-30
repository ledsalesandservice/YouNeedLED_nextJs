/**
 * Manus CRM → FreshBooks Invoice Sync
 *
 * POST /api/sync-invoices
 *
 * Required env vars:
 *   MANUS_API_KEY            — Manus CRM API key (X-API-Key header)
 *   MANUS_BASE_URL           — e.g. https://3000-xxx.manus.computer/api/sync
 *   FRESHBOOKS_CLIENT_ID     — OAuth app client ID
 *   FRESHBOOKS_CLIENT_SECRET — OAuth app client secret
 *   FRESHBOOKS_REFRESH_TOKEN — long-lived refresh token
 *   FRESHBOOKS_ACCOUNT_ID    — numeric account ID from FreshBooks
 *   SYNC_SECRET              — shared secret to authorize POST calls
 *
 * This function:
 *   1. Exchanges the FreshBooks refresh token for a fresh access token
 *   2. Fetches completed Manus work orders that have no freshbooksInvoiceId
 *   3. For each work order, finds or creates the FreshBooks client
 *   4. Creates a draft FreshBooks invoice
 *   5. Writes freshbooksInvoiceId + timeSyncStatus back to Manus
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ManusClient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  freshbooksId?: string;
}

interface ManusWorkOrder {
  id: string;
  clientId: string;
  description?: string;
  status: string;
  amount?: number;
  serviceType?: string;
  freshbooksInvoiceId?: string;
  freshbooksClientId?: string;
  timeSyncStatus?: string;
  timeSyncError?: string;
}

interface FreshBooksTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface FreshBooksClient {
  id: number;
  userid: number;
  fname: string;
  lname: string;
  organization: string;
  email: string;
}

interface FreshBooksInvoice {
  id: number;
  invoiceid: number;
  invoice_number: string;
  customerid: number;
}

interface SyncResult {
  workOrderId: string;
  status: "synced" | "failed" | "skipped";
  invoiceId?: string;
  invoiceNumber?: string;
  error?: string;
}

// ─── FreshBooks helpers ───────────────────────────────────────────────────────

async function getFreshBooksAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string,
): Promise<string> {
  const res = await fetch("https://api.freshbooks.com/auth/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "refresh_token",
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`FreshBooks token refresh failed: ${res.status} ${body}`);
  }
  const data = (await res.json()) as FreshBooksTokenResponse;
  return data.access_token;
}

async function findFreshBooksClientByEmail(
  accessToken: string,
  accountId: string,
  email: string,
): Promise<FreshBooksClient | null> {
  const url = `https://api.freshbooks.com/accounting/account/${accountId}/users/clients?search[email]=${encodeURIComponent(email)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}`, "Api-Version": "alpha" },
  });
  if (!res.ok) return null;
  const data = await res.json() as { response?: { result?: { clients?: FreshBooksClient[] } } };
  const clients = data?.response?.result?.clients ?? [];
  return clients[0] ?? null;
}

async function createFreshBooksClient(
  accessToken: string,
  accountId: string,
  manusClient: ManusClient,
): Promise<FreshBooksClient> {
  const nameParts = (manusClient.name ?? "").trim().split(" ");
  const fname = nameParts[0] ?? "";
  const lname = nameParts.slice(1).join(" ") || fname;

  const res = await fetch(
    `https://api.freshbooks.com/accounting/account/${accountId}/users/clients`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Api-Version": "alpha",
      },
      body: JSON.stringify({
        client: {
          fname,
          lname,
          organization: manusClient.company ?? manusClient.name,
          email: manusClient.email ?? "",
          p_phone: manusClient.phone ?? "",
        },
      }),
    },
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`FreshBooks createClient failed: ${res.status} ${body}`);
  }
  const data = await res.json() as { response?: { result?: { client?: FreshBooksClient } } };
  const client = data?.response?.result?.client;
  if (!client) throw new Error("FreshBooks createClient: empty response");
  return client;
}

async function createFreshBooksInvoice(
  accessToken: string,
  accountId: string,
  customerId: number,
  workOrder: ManusWorkOrder,
): Promise<FreshBooksInvoice> {
  const description =
    workOrder.description ??
    workOrder.serviceType ??
    "Security system service";
  const amount = workOrder.amount ?? 0;

  const res = await fetch(
    `https://api.freshbooks.com/accounting/account/${accountId}/invoices/invoices`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Api-Version": "alpha",
      },
      body: JSON.stringify({
        invoice: {
          customerid: customerId,
          status: 2, // draft
          lines: [
            {
              name: description,
              qty: "1",
              unit_cost: { amount: amount.toFixed(2), code: "USD" },
              type: 0,
            },
          ],
        },
      }),
    },
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`FreshBooks createInvoice failed: ${res.status} ${body}`);
  }
  const data = await res.json() as { response?: { result?: { invoice?: FreshBooksInvoice } } };
  const invoice = data?.response?.result?.invoice;
  if (!invoice) throw new Error("FreshBooks createInvoice: empty response");
  return invoice;
}

// ─── Manus helpers ────────────────────────────────────────────────────────────

async function manusGet<T>(baseUrl: string, apiKey: string, path: string): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: { "X-API-Key": apiKey },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Manus GET ${path} failed: ${res.status} ${body}`);
  }
  return res.json() as Promise<T>;
}

async function manusPut(
  baseUrl: string,
  apiKey: string,
  path: string,
  body: Record<string, unknown>,
): Promise<void> {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "PUT",
    headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Manus PUT ${path} failed: ${res.status} ${text}`);
  }
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Verify shared secret
  const syncSecret = process.env.SYNC_SECRET;
  const providedSecret =
    req.headers["x-sync-secret"] ?? req.body?.secret;
  if (!syncSecret || providedSecret !== syncSecret) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Validate required env vars
  const manusKey = process.env.MANUS_API_KEY;
  const manusBase = process.env.MANUS_BASE_URL;
  const fbClientId = process.env.FRESHBOOKS_CLIENT_ID;
  const fbClientSecret = process.env.FRESHBOOKS_CLIENT_SECRET;
  const fbRefreshToken = process.env.FRESHBOOKS_REFRESH_TOKEN;
  const fbAccountId = process.env.FRESHBOOKS_ACCOUNT_ID;

  const missing: string[] = [];
  if (!manusKey) missing.push("MANUS_API_KEY");
  if (!manusBase) missing.push("MANUS_BASE_URL");
  if (!fbClientId) missing.push("FRESHBOOKS_CLIENT_ID");
  if (!fbClientSecret) missing.push("FRESHBOOKS_CLIENT_SECRET");
  if (!fbRefreshToken) missing.push("FRESHBOOKS_REFRESH_TOKEN");
  if (!fbAccountId) missing.push("FRESHBOOKS_ACCOUNT_ID");

  if (missing.length > 0) {
    return res.status(503).json({
      error: "Integration not configured — missing env vars",
      missing,
    });
  }

  const results: SyncResult[] = [];

  try {
    // 1. Get FreshBooks access token
    const fbToken = await getFreshBooksAccessToken(
      fbClientId!,
      fbClientSecret!,
      fbRefreshToken!,
    );

    // 2. Get all completed work orders from Manus
    const workOrdersData = await manusGet<{ work_orders?: ManusWorkOrder[]; workOrders?: ManusWorkOrder[] }>(
      manusBase!,
      manusKey!,
      "/work-orders",
    );
    const allWorkOrders: ManusWorkOrder[] =
      workOrdersData.work_orders ?? workOrdersData.workOrders ?? [];

    // Filter to completed orders with no FreshBooks invoice yet
    const pending = allWorkOrders.filter(
      (wo) => wo.status === "completed" && !wo.freshbooksInvoiceId,
    );

    if (pending.length === 0) {
      return res.status(200).json({
        ok: true,
        message: "No pending work orders to sync",
        synced: 0,
        results: [],
      });
    }

    // 3. Process each pending work order
    for (const wo of pending) {
      const result: SyncResult = { workOrderId: wo.id, status: "failed" };

      try {
        // Get the Manus client record
        const clientData = await manusGet<{ client?: ManusClient }>(
          manusBase!,
          manusKey!,
          `/clients/${wo.clientId}`,
        );
        const manusClient = clientData.client;
        if (!manusClient) {
          result.error = `Client ${wo.clientId} not found in Manus`;
          results.push(result);
          await manusPut(manusBase!, manusKey!, `/work-orders/${wo.id}`, {
            timeSyncStatus: "failed",
            timeSyncError: result.error,
          });
          continue;
        }

        // Find or create FreshBooks client
        let fbClientId_num: number;

        if (manusClient.freshbooksId) {
          fbClientId_num = Number(manusClient.freshbooksId);
        } else {
          // Try to find by email first
          let fbClient: FreshBooksClient | null = null;
          if (manusClient.email) {
            fbClient = await findFreshBooksClientByEmail(
              fbToken,
              fbAccountId!,
              manusClient.email,
            );
          }

          // Create if not found
          if (!fbClient) {
            fbClient = await createFreshBooksClient(fbToken, fbAccountId!, manusClient);
          }

          fbClientId_num = fbClient.userid ?? fbClient.id;
          const fbClientIdStr = String(fbClientId_num);

          // Write FreshBooks client ID back to Manus client record
          await manusPut(manusBase!, manusKey!, `/clients/${manusClient.id}`, {
            freshbooksId: fbClientIdStr,
          });

          // Also write to work order for reference
          await manusPut(manusBase!, manusKey!, `/work-orders/${wo.id}`, {
            freshbooksClientId: fbClientIdStr,
          });
        }

        // Create draft invoice in FreshBooks
        const invoice = await createFreshBooksInvoice(
          fbToken,
          fbAccountId!,
          fbClientId_num,
          wo,
        );

        const invoiceId = String(invoice.invoiceid ?? invoice.id);
        const invoiceNumber = invoice.invoice_number ?? invoiceId;

        // Write invoice ID back to Manus work order
        await manusPut(manusBase!, manusKey!, `/work-orders/${wo.id}`, {
          freshbooksInvoiceId: invoiceId,
          freshbooksClientId: String(fbClientId_num),
          timeSyncStatus: "synced",
          timeSyncError: "",
        });

        result.status = "synced";
        result.invoiceId = invoiceId;
        result.invoiceNumber = invoiceNumber;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        result.error = errorMsg;
        console.error(`Sync failed for work order ${wo.id}:`, errorMsg);

        // Write failure status back to Manus
        try {
          await manusPut(manusBase!, manusKey!, `/work-orders/${wo.id}`, {
            timeSyncStatus: "failed",
            timeSyncError: errorMsg.slice(0, 500),
          });
        } catch {
          // Don't mask the original error
        }
      }

      results.push(result);
    }

    const synced = results.filter((r) => r.status === "synced").length;
    const failed = results.filter((r) => r.status === "failed").length;

    return res.status(200).json({
      ok: true,
      total: pending.length,
      synced,
      failed,
      results,
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Sync handler error:", errorMsg);
    return res.status(500).json({ error: errorMsg });
  }
}
