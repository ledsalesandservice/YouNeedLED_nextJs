/**
 * Vercel serverless function: POST /api/sync/manus-freshbooks
 *
 * Triggers the Manus CRM → FreshBooks invoice sync.
 * Secured by SYNC_SECRET env var (set a random string in Vercel).
 *
 * Usage:
 *   curl -X POST https://youneedled.com/api/sync/manus-freshbooks \
 *     -H "Authorization: Bearer <SYNC_SECRET>"
 *
 * Can also be triggered by a Vercel Cron job (see vercel.json crons section).
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { syncManusToFreshBooks } from "../../integrations/sync-manus-freshbooks";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Auth check
  const secret = process.env.SYNC_SECRET;
  if (secret) {
    const auth = req.headers.authorization;
    if (!auth || auth !== `Bearer ${secret}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  const dryRun = req.query.dry_run === "1" || req.body?.dry_run === true;

  try {
    const result = await syncManusToFreshBooks(dryRun);
    return res.status(200).json({ ok: true, dryRun, ...result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[sync-handler] Fatal:", message);
    return res.status(500).json({ ok: false, error: message });
  }
}
