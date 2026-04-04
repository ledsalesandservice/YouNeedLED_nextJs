/**
 * Manus CRM API client
 * Base URL: https://ledservice.manus.space/api/sync
 * Auth: X-API-Key header
 */

const MANUS_BASE = process.env.MANUS_API_URL || "https://ledservice.manus.space/api/sync";
const MANUS_KEY = process.env.MANUS_API_KEY!;

export interface ManusClient {
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

export interface ManusWorkOrder {
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

export interface ManusServiceLog {
  id: number;
  clientId: number;
  workOrderId: number | null;
  serviceType: "installation" | "inspection" | "maintenance" | "repair" | "other";
  serviceDate: string;
  technicianName: string;
  description: string;
  workPerformed: string;
  partsUsed: string;
  laborHours: string;
  status: "completed" | "requires_followup";
  invoiceNumber: string;
  createdAt: string;
  updatedAt: string;
}

async function manusGet<T>(path: string, params: Record<string, string | number> = {}): Promise<{ data: T; pagination?: { total: number; totalPages: number; page: number; limit: number } }> {
  const url = new URL(`${MANUS_BASE}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url.toString(), { headers: { "X-API-Key": MANUS_KEY } });
  if (!res.ok) throw new Error(`Manus GET ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

async function manusPut<T>(path: string, body: Partial<T>): Promise<T> {
  const res = await fetch(`${MANUS_BASE}${path}`, {
    method: "PUT",
    headers: { "X-API-Key": MANUS_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Manus PUT ${path} → ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.data;
}

/** Fetch all pages of a paginated endpoint */
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

export const manus = {
  getClients: () => manusGetAll<ManusClient>("/clients"),
  getClient: (id: number) => manusGet<ManusClient>(`/clients/${id}`).then(r => r.data),
  updateClient: (id: number, body: Partial<ManusClient>) => manusPut<ManusClient>(`/clients/${id}`, body),

  getWorkOrders: () => manusGetAll<ManusWorkOrder>("/work-orders"),
  updateWorkOrder: (id: number, body: Partial<ManusWorkOrder>) => manusPut<ManusWorkOrder>(`/work-orders/${id}`, body),

  getServiceLogs: () => manusGetAll<ManusServiceLog>("/service-logs"),
  updateServiceLog: (id: number, body: Partial<ManusServiceLog>) => manusPut<ManusServiceLog>(`/service-logs/${id}`, body),
};
