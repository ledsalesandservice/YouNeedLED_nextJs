/**
 * Debug endpoint — tests if integrations/ imports work in Vercel functions.
 * Remove after diagnosis.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Dynamic import to catch module-load errors
    const { manus } = await import("../_integrations/manus");
    const { freshbooks } = await import("../_integrations/freshbooks");
    return res.status(200).json({
      ok: true,
      hasManusKey: !!process.env.MANUS_API_KEY,
      hasFreshbooksClientId: !!process.env.FRESHBOOKS_CLIENT_ID,
      hasRefreshToken: !!process.env.FRESHBOOKS_REFRESH_TOKEN,
      refreshTokenValue: (process.env.FRESHBOOKS_REFRESH_TOKEN || "").substring(0, 8) + "...",
      importsLoaded: true,
    });
  } catch (err: unknown) {
    return res.status(500).json({
      ok: false,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack?.split("\n").slice(0, 5) : undefined,
    });
  }
}
