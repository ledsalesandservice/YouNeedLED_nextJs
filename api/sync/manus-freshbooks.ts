/**
 * Vercel serverless function: POST /api/sync/manus-freshbooks
 *
 * Triggers the Manus CRM → FreshBooks invoice sync.
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
import { syncManusToFreshBooks } from "../_integrations/sync-manus-freshbooks";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Accept Vercel Cron header (set automatically by Vercel infrastructure)
  const isVercelCron = req.headers["x-vercel-cron"] === "1";

  // Accept manual Bearer token
  const secret = process.env.SYNC_SECRET;
  const auth = req.headers.authorization;
  const isManualAuth = secret && auth === `Bearer ${secret}`;

  if (!isVercelCron && !isManualAuth) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const dryRun = req.query.dry_run === "1" || req.body?.dry_run === true;

  console.log(`[sync] Triggered by: ${isVercelCron ? "Vercel Cron" : "manual"}, dry_run=${dryRun}`);

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
