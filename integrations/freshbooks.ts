/**
 * FreshBooks API client with automatic token refresh
 *
 * Required env vars:
 *   FRESHBOOKS_CLIENT_ID      — OAuth app client ID
 *   FRESHBOOKS_CLIENT_SECRET  — OAuth app client secret  ← NEEDED FROM DEREK
 *   FRESHBOOKS_REFRESH_TOKEN  — Long-lived refresh token
 *   FRESHBOOKS_ACCOUNT_ID     — Account ID (e.g. "Plgr6")
 *   FRESHBOOKS_BUSINESS_ID    — Business ID (e.g. "4504335")
 *
 * The access token is short-lived (12h). This client refreshes automatically.
 */

const FB_BASE = "https://api.freshbooks.com";
const ACCOUNT_ID = process.env.FRESHBOOKS_ACCOUNT_ID!;

let cachedToken: string | null = null;
let tokenExpiry: number = 0;

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

export interface FreshBooksClient {
  id: number;
  userid: number;
  organization: string;
  fname: string;
  lname: string;
  email: string;
  p_street: string;
  p_city: string;
  p_province: string;
  p_code: string;
}

export interface FreshBooksInvoice {
  id: number;
  invoiceid: number;
  invoice_number: string;
  status: number; // 1=draft, 2=sent, 3=viewed, 4=paid
  amount: { amount: string; code: string };
  ownerid: number;
  customerid: number;
  create_date: string;
}

export interface FreshBooksLineItem {
  name: string;
  description: string;
  qty: number;
  unit_cost: { amount: string; code: string };
  taxName1?: string;
}

export const freshbooks = {
  /** Get all clients (paginated internally) */
  async getClients(): Promise<FreshBooksClient[]> {
    const all: FreshBooksClient[] = [];
    let page = 1;
    while (true) {
      const r = await fbGet<{ result: { clients: FreshBooksClient[]; total: number; per_page: number; page: number; pages: number } }>(
        `/accounting/account/${ACCOUNT_ID}/users/clients`,
        { page, per_page: 100 }
      );
      all.push(...r.result.clients);
      if (page >= r.result.pages) break;
      page++;
    }
    return all;
  },

  /** Create a new client and return their ID */
  async createClient(data: { organization: string; email?: string; street?: string; city?: string; state?: string; zip?: string }): Promise<number> {
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

  /** Create a draft invoice */
  async createInvoice(data: {
    clientId: number;
    invoiceNumber?: string;
    notes?: string;
    lines: FreshBooksLineItem[];
  }): Promise<{ invoiceId: number; invoiceNumber: string }> {
    const r = await fbPost<{ result: { invoice: { id: number; invoice_number: string } } }>(
      `/accounting/account/${ACCOUNT_ID}/invoices/invoices`,
      {
        invoice: {
          customerid: data.clientId,
          invoice_number: data.invoiceNumber,
          notes: data.notes || "",
          lines: data.lines.map((l) => ({
            type: 0,
            name: l.name,
            description: l.description,
            qty: l.qty,
            unit_cost: l.unit_cost,
            taxName1: l.taxName1,
          })),
          status: 1, // draft — Derek reviews before sending
        },
      }
    );
    return { invoiceId: r.result.invoice.id, invoiceNumber: r.result.invoice.invoice_number };
  },
};
