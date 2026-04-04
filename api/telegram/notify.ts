/**
 * Vercel serverless function: POST /api/telegram/notify
 *
 * Sends a message to Derek's Telegram chat. Called by other automation
 * functions (crons, sync handlers) to push real-time alerts.
 *
 * Auth: Authorization: Bearer <SYNC_SECRET>
 *
 * Body: { "message": "Your notification text here" }
 *
 * Example:
 *   curl -X POST https://www.youneedled.com/api/telegram/notify \
 *     -H "Authorization: Bearer <SYNC_SECRET>" \
 *     -H "Content-Type: application/json" \
 *     -d '{"message": "Manus→FreshBooks sync ran: 3 invoices created, $4,200"}'
 *
 * Required env vars:
 *   TELEGRAM_BOT_TOKEN  — From BotFather
 *   TELEGRAM_CHAT_ID    — Derek's Telegram chat ID (set by /start command)
 *   SYNC_SECRET         — Shared secret for internal API auth
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN not set");
  if (!chatId) throw new Error("TELEGRAM_CHAT_ID not set — send /start to the bot first");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Telegram sendMessage failed: ${res.status} ${err}`);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const secret = process.env.SYNC_SECRET;
  const auth = req.headers.authorization;
  if (!secret || auth !== `Bearer ${secret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "message is required" });
  }

  try {
    await sendTelegramMessage(message.trim());
    return res.status(200).json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[telegram/notify] Error:", msg);
    return res.status(500).json({ ok: false, error: msg });
  }
}
