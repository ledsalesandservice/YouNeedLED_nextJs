/**
 * Manus CRM → FreshBooks Invoice Sync
 *
 * What this does:
 *   1. Load all Manus clients. For any client without a freshbooksId:
 *      search FreshBooks by organization name; create if not found.
 *      Write freshbooksId back to Manus.
 *   2. Load all completed Manus work orders with no freshbooksInvoiceId.
 *      For each: ensure client is linked, create a draft FreshBooks invoice,
 *      write freshbooksInvoiceId + timeSyncStatus="synced" back to Manus.
 *
 * Run manually:   npx tsx integrations/sync-manus-freshbooks.ts
 * Run via Vercel: POST /api/sync/manus-freshbooks  (see api/sync/manus-freshbooks.ts)
 *
 * Env vars required (add to Vercel + local .env):
 *   MANUS_API_URL             (optional, defaults to the Manus base URL)
 *   MANUS_API_KEY
 *   FRESHBOOKS_CLIENT_ID
 *   FRESHBOOKS_CLIENT_SECRET  ← still needed from Derek
 *   FRESHBOOKS_REFRESH_TOKEN
 *   FRESHBOOKS_ACCOUNT_ID
 *   FRESHBOOKS_BUSINESS_ID
 */

import { manus } from "./manus";
import { freshbooks } from "./freshbooks";

interface SyncResult {
  clientsLinked: number;
  clientsCreated: number;
  invoicesCreated: number;
  errors: { id: number | string; error: string }[];
}

export async function syncManusToFreshBooks(dryRun = false): Promise<SyncResult> {
  const result: SyncResult = { clientsLinked: 0, clientsCreated: 0, invoicesCreated: 0, errors: [] };

  console.log("[sync] Loading Manus clients and FreshBooks clients...");
  const [manusClients, fbClients] = await Promise.all([
    manus.getClients(),
    freshbooks.getClients(),
  ]);

  // Build FreshBooks lookup by organization name (normalized)
  const fbByOrg = new Map<string, number>();
  for (const c of fbClients) {
    if (c.organization) fbByOrg.set(c.organization.toLowerCase().trim(), c.id);
  }

  // Step 1: Link or create FreshBooks clients for Manus clients that lack freshbooksId
  const unlinkedClients = manusClients.filter((c) => !c.freshbooksId);
  console.log(`[sync] ${unlinkedClients.length} Manus clients need FreshBooks linking`);

  for (const mc of unlinkedClients) {
    try {
      const orgKey = mc.propertyName.toLowerCase().trim();
      let fbId = fbByOrg.get(orgKey);

      if (!fbId) {
        // Fuzzy: try first word of property name
        const firstWord = orgKey.split(" ")[0];
        fbId = [...fbByOrg.entries()].find(([k]) => k.includes(firstWord))?.[1];
      }

      if (fbId) {
        console.log(`[sync] Matched Manus client ${mc.id} "${mc.propertyName}" → FreshBooks ${fbId}`);
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

  // Reload Manus clients to get updated freshbooksIds
  const updatedManusClients = dryRun ? manusClients : await manus.getClients();
  const manusClientById = new Map(updatedManusClients.map((c) => [c.id, c]));

  // Step 2: Create FreshBooks invoices for completed work orders with no invoice
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
        result.errors.push({ id: wo.id, error: `Client ${wo.clientId} has no freshbooksId — run client sync first` });
        continue;
      }

      const fbClientId = parseInt(mc.freshbooksId, 10);

      // Build line items
      const lines = [];

      // Labor line
      const laborHours = parseFloat(wo.laborHours || "0");
      if (laborHours > 0) {
        const laborRate = parseFloat(wo.laborRate || "95"); // default $95/hr if not set
        lines.push({
          name: "Labor",
          description: wo.title || "Service call",
          qty: laborHours,
          unit_cost: { amount: String(laborRate), code: "USD" },
        });
      }

      // Parts line
      const partsTotal = parseFloat(wo.partsTotal || "0");
      if (partsTotal > 0) {
        lines.push({
          name: "Parts & Materials",
          description: wo.description || "",
          qty: 1,
          unit_cost: { amount: String(partsTotal), code: "USD" },
        });
      }

      // Fallback: if no labor hours or parts, create a $0 draft for review
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

      console.log(`[sync] Creating invoice for WO ${wo.workOrderNumber} (client: ${mc.propertyName})`);

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
        await manus.updateWorkOrder(wo.id, {
          timeSyncStatus: "failed",
          timeSyncError: message,
        }).catch(() => {}); // best-effort write-back
      }

      result.errors.push({ id: wo.id, error: message });
    }
  }

  return result;
}

// CLI entrypoint
const isMain = process.argv[1]?.includes("sync-manus-freshbooks");
if (isMain) {
  const dryRun = process.argv.includes("--dry-run");
  if (dryRun) console.log("[sync] DRY RUN — no changes will be made");

  syncManusToFreshBooks(dryRun)
    .then((r) => {
      console.log("\n[sync] Complete:", JSON.stringify(r, null, 2));
      process.exit(r.errors.length > 0 ? 1 : 0);
    })
    .catch((err) => {
      console.error("[sync] Fatal:", err);
      process.exit(1);
    });
}
