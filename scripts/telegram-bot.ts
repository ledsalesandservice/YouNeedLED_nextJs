/**
 * YNLED Telegram Bot — standalone polling mode
 *
 * Runs directly on Derek's laptop — no Vercel needed.
 * Uses long polling so no webhook or public URL is required.
 *
 * Run:
 *   npx tsx scripts/telegram-bot.ts
 *
 * Or compile once and run:
 *   npx tsc --outDir dist scripts/telegram-bot.ts --esModuleInterop --module commonjs
 *   node dist/scripts/telegram-bot.js
 *
 * Required env vars (.env or shell):
 *   TELEGRAM_BOT_TOKEN       — From BotFather
 *   PAPERCLIP_API_URL        — e.g. http://127.0.0.1:3100
 *   PAPERCLIP_COMPANY_ID     — YNLED company ID
 *   PAPERCLIP_API_KEY        — Persistent Paperclip API key
 *   MANUS_CRM_BASE_URL       — https://ledservice.manus.space/api/sync
 *   MANUS_CRM_API_KEY        — Manus API key
 *
 * Optional:
 *   TELEGRAM_ALLOWED_CHAT_ID — If set, only responds to this chat ID (security)
 *
 * Commands Derek can send:
 *   /start    — Prints this bot's chat_id (copy it to TELEGRAM_ALLOWED_CHAT_ID)
 *   /status   — In-progress + blocked task counts
 *   /blockers — List all blocked tasks with titles
 *   /wo       — List open/completed work orders from Manus
 *   <text>    — Posts free-text as a comment on YOU-1 in Paperclip
 */

import * as dotenv from "dotenv";
dotenv.config();

// ─── Config ───────────────────────────────────────────────────────────────────

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_CHAT_ID = process.env.TELEGRAM_ALLOWED_CHAT_ID
  ? parseInt(process.env.TELEGRAM_ALLOWED_CHAT_ID, 10)
  : null;

const PAPERCLIP_BASE = process.env.PAPERCLIP_API_URL || "http://127.0.0.1:3100";
const PAPERCLIP_COMPANY_ID = process.env.PAPERCLIP_COMPANY_ID;
const PAPERCLIP_API_KEY = process.env.PAPERCLIP_API_KEY;
// YOU-1 is the LED OS parent issue
const DEFAULT_ISSUE_ID =
  process.env.PAPERCLIP_DEFAULT_ISSUE_ID || "e2a93af9-ca3d-47e2-82f6-69600b9b325c";

const MANUS_BASE =
  process.env.MANUS_CRM_BASE_URL || "https://ledservice.manus.space/api/sync";
const MANUS_API_KEY = process.env.MANUS_CRM_API_KEY;

if (!BOT_TOKEN) {
  console.error("TELEGRAM_BOT_TOKEN is required. Set it in your .env file.");
  process.exit(1);
}

// ─── Telegram API helpers ─────────────────────────────────────────────────────

interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
}

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from?: TelegramUser;
    chat: { id: number; type: string };
    text?: string;
  };
}

async function tgCall<T>(method: string, params: Record<string, unknown> = {}): Promise<T> {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const json = (await res.json()) as { ok: boolean; result: T; description?: string };
  if (!json.ok) throw new Error(`Telegram ${method} failed: ${json.description}`);
  return json.result;
}

async function send(chatId: number, text: string): Promise<void> {
  await tgCall("sendMessage", { chat_id: chatId, text, parse_mode: "Markdown" });
}

async function getUpdates(offset: number): Promise<TelegramUpdate[]> {
  return tgCall<TelegramUpdate[]>("getUpdates", {
    offset,
    timeout: 30,
    allowed_updates: ["message"],
  });
}

// ─── Paperclip helpers ────────────────────────────────────────────────────────

interface PaperclipIssue {
  identifier: string;
  title: string;
  status: string;
  priority: string;
}

async function pcGet<T>(path: string): Promise<T> {
  if (!PAPERCLIP_API_KEY) throw new Error("PAPERCLIP_API_KEY not set");
  const res = await fetch(`${PAPERCLIP_BASE}${path}`, {
    headers: { Authorization: `Bearer ${PAPERCLIP_API_KEY}` },
  });
  if (!res.ok) throw new Error(`Paperclip GET ${path} → ${res.status}`);
  return res.json();
}

async function pcPost(path: string, body: unknown): Promise<void> {
  if (!PAPERCLIP_API_KEY) throw new Error("PAPERCLIP_API_KEY not set");
  const res = await fetch(`${PAPERCLIP_BASE}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${PAPERCLIP_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Paperclip POST ${path} → ${res.status}`);
}

// ─── Manus helpers ────────────────────────────────────────────────────────────

interface ManusWorkOrder {
  id: number;
  workOrderNumber: string;
  title: string;
  status: string;
  totalAmount: string | null;
  completedDate: string | null;
  freshbooksInvoiceId: string | null;
  timeSyncStatus: string;
}

async function manusGet<T>(path: string): Promise<{ data: T }> {
  if (!MANUS_API_KEY) throw new Error("MANUS_CRM_API_KEY not set");
  const res = await fetch(`${MANUS_BASE}${path}`, {
    headers: { "X-API-Key": MANUS_API_KEY },
  });
  if (!res.ok) throw new Error(`Manus GET ${path} → ${res.status}`);
  return res.json();
}

// ─── Command handlers ─────────────────────────────────────────────────────────

async function handleStart(chatId: number): Promise<void> {
  await send(
    chatId,
    `👋 Hi Derek! YNLED bot is running on your laptop.\n\n` +
      `Your chat ID is: \`${chatId}\`\n` +
      `Add this to your env: \`TELEGRAM_ALLOWED_CHAT_ID=${chatId}\`\n\n` +
      `Commands:\n` +
      `/status — Task summary\n` +
      `/blockers — What needs your action\n` +
      `/wo — Open work orders\n\n` +
      `Or send any message to post it as a note on YOU-1.`
  );
}

async function handleStatus(chatId: number): Promise<void> {
  if (!PAPERCLIP_COMPANY_ID) {
    await send(chatId, "❌ PAPERCLIP_COMPANY_ID not configured.");
    return;
  }
  const issues = await pcGet<PaperclipIssue[]>(
    `/api/companies/${PAPERCLIP_COMPANY_ID}/issues?status=in_progress,blocked`
  );
  const inProgress = issues.filter((i) => i.status === "in_progress").length;
  const blocked = issues.filter((i) => i.status === "blocked").length;
  await send(
    chatId,
    `📊 *YNLED Status*\n\n` +
      `🔄 In progress: ${inProgress}\n` +
      `🚫 Blocked (needs you): ${blocked}\n\n` +
      `Use /blockers to see what's waiting on you.`
  );
}

async function handleBlockers(chatId: number): Promise<void> {
  if (!PAPERCLIP_COMPANY_ID) {
    await send(chatId, "❌ PAPERCLIP_COMPANY_ID not configured.");
    return;
  }
  const issues = await pcGet<PaperclipIssue[]>(
    `/api/companies/${PAPERCLIP_COMPANY_ID}/issues?status=blocked`
  );
  if (issues.length === 0) {
    await send(chatId, "✅ No blocked tasks right now — all clear!");
    return;
  }
  const lines = issues.map((i) => `• *[${i.identifier}]* ${i.title}`);
  await send(
    chatId,
    `🚫 *Blocked (${issues.length})*\n\nNeeds your action:\n\n${lines.join("\n")}`
  );
}

async function handleWorkOrders(chatId: number): Promise<void> {
  const result = await manusGet<ManusWorkOrder[]>("/work-orders");
  const wos = result.data;
  if (!wos || wos.length === 0) {
    await send(chatId, "No work orders found in Manus.");
    return;
  }
  const lines = wos.map((wo) => {
    const synced = wo.freshbooksInvoiceId ? "✅ invoiced" : `⏳ ${wo.timeSyncStatus}`;
    return `• *${wo.workOrderNumber}* ${wo.title} — ${wo.status} — ${synced}`;
  });
  await send(chatId, `🔧 *Work Orders (${wos.length})*\n\n${lines.join("\n")}`);
}

async function handleFreeText(chatId: number, text: string, from?: TelegramUser): Promise<void> {
  const name = from?.first_name || from?.username || "Derek";
  await pcPost(`/api/issues/${DEFAULT_ISSUE_ID}/comments`, {
    body: `💬 **Message from ${name} via Telegram:**\n\n${text}`,
  });
  await send(chatId, "✅ Posted to team board.");
}

// ─── Main polling loop ────────────────────────────────────────────────────────

async function processUpdate(update: TelegramUpdate): Promise<void> {
  const msg = update.message;
  if (!msg?.text) return;

  const chatId = msg.chat.id;

  if (ALLOWED_CHAT_ID !== null && chatId !== ALLOWED_CHAT_ID) {
    console.log(`[bot] Ignored message from unknown chat ${chatId}`);
    return;
  }

  const text = msg.text.trim();
  console.log(`[bot] ${msg.from?.username || chatId}: ${text}`);

  if (text === "/start") {
    await handleStart(chatId);
  } else if (text === "/status") {
    await handleStatus(chatId);
  } else if (text === "/blockers") {
    await handleBlockers(chatId);
  } else if (text === "/wo") {
    await handleWorkOrders(chatId);
  } else if (!text.startsWith("/")) {
    await handleFreeText(chatId, text, msg.from);
  } else {
    await send(chatId, "Unknown command. Try /status, /blockers, or /wo.");
  }
}

async function main(): Promise<void> {
  console.log("[bot] YNLED Telegram bot starting (polling mode)...");
  let offset = 0;

  while (true) {
    try {
      const updates = await getUpdates(offset);
      for (const update of updates) {
        offset = update.update_id + 1;
        try {
          await processUpdate(update);
        } catch (err) {
          console.error(`[bot] Error processing update ${update.update_id}:`, err);
        }
      }
    } catch (err) {
      console.error("[bot] getUpdates error:", err);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
}

main();
