/**
 * Vercel serverless function: POST /api/telegram/daily-summary
 *
 * Sends Derek a morning briefing on Telegram: blocked tasks, what's in
 * flight, and work orders completed yesterday.
 *
 * Vercel Cron schedule (see vercel.json):
 *   Runs weekdays at 7am ET (11:00 UTC).
 *
 * Auth:
 *   - x-vercel-cron: 1       for Vercel Cron
 *   - Authorization: Bearer <SYNC_SECRET>  for manual trigger
 *
 * Required env vars:
 *   TELEGRAM_BOT_TOKEN     — From BotFather
 *   TELEGRAM_CHAT_ID       — Derek's Telegram chat ID
 *   PAPERCLIP_API_URL      — Paperclip API base URL
 *   PAPERCLIP_COMPANY_ID   — YNLED company ID
 *   PAPERCLIP_API_KEY      — Persistent Paperclip API key
 *   MANUS_API_URL          — Manus CRM API base URL
 *   MANUS_API_KEY          — Manus API key
 *   SYNC_SECRET            — Shared secret for manual trigger
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

// ─── Telegram send ────────────────────────────────────────────────────────────

async function sendMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN not set");
  if (!chatId) throw new Error("TELEGRAM_CHAT_ID not set — send /start to the bot first");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });
  if (!res.ok) throw new Error(`Telegram sendMessage: ${res.status} ${await res.text()}`);
}

// ─── Paperclip ────────────────────────────────────────────────────────────────

const PAPERCLIP_BASE = process.env.PAPERCLIP_API_URL || "https://app.paperclip.ing";
const PAPERCLIP_COMPANY_ID = process.env.PAPERCLIP_COMPANY_ID;

interface PaperclipIssue {
  identifier: string;
  title: string;
  status: string;
  priority: string;
}

async function getIssues(status: string): Promise<PaperclipIssue[]> {
  const key = process.env.PAPERCLIP_API_KEY;
  if (!key || !PAPERCLIP_COMPANY_ID) return [];
  const res = await fetch(
    `${PAPERCLIP_BASE}/api/companies/${PAPERCLIP_COMPANY_ID}/issues?status=${status}`,
    { headers: { Authorization: `Bearer ${key}` } }
  );
  if (!res.ok) return [];
  return res.json();
}

// ─── Manus ────────────────────────────────────────────────────────────────────

const MANUS_BASE =
  process.env.MANUS_API_URL ||
  process.env.MANUS_CRM_BASE_URL ||
  "https://ledservice.manus.space/api/sync";

interface ManusWorkOrder {
  id: number;
  workOrderNumber: string;
  title: string;
  status: string;
  totalAmount: string | null;
  completedDate: string | null;
}

async function getRecentWorkOrders(): Promise<ManusWorkOrder[]> {
  const key = process.env.MANUS_API_KEY;
  if (!key) return [];
  const res = await fetch(`${MANUS_BASE}/work-orders?limit=50`, {
    headers: { "X-API-Key": key },
  });
  if (!res.ok) return [];
  const json = await res.json();
  const all: ManusWorkOrder[] = Array.isArray(json) ? json : (json.data ?? []);

  // Completed in last 24h
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return all.filter((wo) => {
    if (wo.status !== "completed" || !wo.completedDate) return false;
    return new Date(wo.completedDate) >= cutoff;
  });
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const isVercelCron = req.headers["x-vercel-cron"] === "1";
  const secret = process.env.SYNC_SECRET;
  const auth = req.headers.authorization;
  const isManualAuth = secret && auth === `Bearer ${secret}`;

  if (!isVercelCron && !isManualAuth) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const [blocked, inProgress, completedWOs] = await Promise.all([
      getIssues("blocked"),
      getIssues("in_progress"),
      getRecentWorkOrders(),
    ]);

    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      timeZone: "America/New_York",
    });

    const lines: string[] = [`☀️ *Good morning, Derek — ${today}*\n`];

    if (blocked.length > 0) {
      lines.push(`🚫 *Blocked (${blocked.length}) — needs you:*`);
      for (const i of blocked) {
        lines.push(`  • [${i.identifier}] ${i.title}`);
      }
      lines.push("");
    } else {
      lines.push("✅ No blockers — all systems go.\n");
    }

    lines.push(`🔄 *In progress: ${inProgress.length} tasks*`);

    if (completedWOs.length > 0) {
      lines.push("");
      lines.push(`🔧 *Completed yesterday (${completedWOs.length} work orders):*`);
      let total = 0;
      for (const wo of completedWOs) {
        const amt = parseFloat(wo.totalAmount || "0");
        total += amt;
        const amtStr = amt > 0 ? ` — $${amt.toFixed(0)}` : "";
        lines.push(`  • ${wo.workOrderNumber}: ${wo.title}${amtStr}`);
      }
      if (total > 0) lines.push(`  💰 Total: $${total.toFixed(0)}`);
    }

    lines.push("\nUse /blockers for details.");

    await sendMessage(lines.join("\n"));

    return res.status(200).json({ ok: true, blocked: blocked.length, inProgress: inProgress.length });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[telegram/daily-summary] Error:", msg);
    return res.status(500).json({ ok: false, error: msg });
  }
}
