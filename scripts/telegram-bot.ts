/**
 * YNLED Telegram Bot — standalone polling mode
 *
 * Runs directly on Derek's laptop — no Vercel needed.
 * Uses long polling so no webhook or public URL is required.
 *
 * Run:
 *   npx tsx --env-file=.env scripts/telegram-bot.ts
 *
 * Create a .env file in the repo root with the vars below.
 * (tsx 4.x loads it natively — no dotenv package needed)
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
 *   PUSH_INTERVAL_MS         — Push check interval in ms (default: 300000 = 5 min)
 *
 * Commands Derek can send:
 *   /start    — Prints this bot's chat_id (copy it to TELEGRAM_ALLOWED_CHAT_ID)
 *   /status   — In-progress + blocked task counts
 *   /blockers — List all blocked tasks with titles
 *   /wo       — List open/completed work orders from Manus
 *   <text>    — Posts free-text as a comment on YOU-1 in Paperclip
 *
 * Push notifications (automatic):
 *   - New blocked tasks   → "🚫 BLOCKED: [YOU-123] Title"
 *   - Newly done tasks    → "✅ DONE: [YOU-123] Title"
 *   - New comments        → "💬 New comment on [YOU-123] Title"
 */

import * as fs from "fs";
import * as path from "path";
import * as os from "os";

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

const PUSH_INTERVAL_MS = process.env.PUSH_INTERVAL_MS
  ? parseInt(process.env.PUSH_INTERVAL_MS, 10)
  : 5 * 60 * 1000; // 5 minutes

const STATE_FILE = path.join(os.homedir(), ".ynled-telegram-state.json");

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
  id: string;
  identifier: string;
  title: string;
  status: string;
  priority: string;
  updatedAt: string;
}

interface PaperclipComment {
  id: string;
  body: string;
  createdAt: string;
  authorAgentId?: string;
  authorUserId?: string;
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

// ─── Push notification state ──────────────────────────────────────────────────

interface IssueState {
  status: string;
  latestCommentId: string | null;
}

interface PushState {
  // issueId → last known state
  issues: Record<string, IssueState>;
}

function loadState(): PushState {
  try {
    const raw = fs.readFileSync(STATE_FILE, "utf8");
    return JSON.parse(raw) as PushState;
  } catch {
    return { issues: {} };
  }
}

function saveState(state: PushState): void {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf8");
}

// ─── Push notification logic ──────────────────────────────────────────────────

async function checkAndPush(pushChatId: number): Promise<void> {
  if (!PAPERCLIP_COMPANY_ID) return;

  const state = loadState();
  const notifications: string[] = [];

  let issues: PaperclipIssue[];
  try {
    // Fetch all active issues (in_progress, blocked, and done from last 24h to catch transitions)
    issues = await pcGet<PaperclipIssue[]>(
      `/api/companies/${PAPERCLIP_COMPANY_ID}/issues?status=in_progress,blocked,done`
    );
  } catch (err) {
    console.error("[push] Failed to fetch issues:", err);
    return;
  }

  const newState: PushState = { issues: {} };

  for (const issue of issues) {
    const prev = state.issues[issue.id];
    const statusChanged = prev && prev.status !== issue.status;

    // Detect blocked transition
    if (statusChanged && issue.status === "blocked") {
      notifications.push(`🚫 *BLOCKED* — [${issue.identifier}] ${issue.title}\nNeeds your attention!`);
    }

    // Detect done transition
    if (statusChanged && issue.status === "done") {
      notifications.push(`✅ *DONE* — [${issue.identifier}] ${issue.title}`);
    }

    // Check for new comments on in_progress and blocked issues
    if (issue.status === "in_progress" || issue.status === "blocked") {
      try {
        const afterParam = prev?.latestCommentId
          ? `?after=${prev.latestCommentId}&order=asc`
          : "";
        const comments = await pcGet<PaperclipComment[]>(
          `/api/issues/${issue.id}/comments${afterParam}`
        );

        if (prev?.latestCommentId) {
          // afterParam returns comments AFTER that ID — all are new
          if (comments.length > 0) {
            const lastComment = comments[comments.length - 1];
            notifications.push(
              `💬 *${comments.length} new comment${comments.length > 1 ? "s" : ""}* on [${issue.identifier}] ${issue.title}`
            );
            newState.issues[issue.id] = {
              status: issue.status,
              latestCommentId: lastComment.id,
            };
            continue;
          }
        } else if (!prev) {
          // First time seeing this issue — just record latest comment, don't notify
          const latestCommentId =
            comments.length > 0 ? comments[comments.length - 1].id : null;
          newState.issues[issue.id] = { status: issue.status, latestCommentId };
          continue;
        }
      } catch (err) {
        console.error(`[push] Failed to fetch comments for ${issue.identifier}:`, err);
      }
    }

    // Update state for this issue
    newState.issues[issue.id] = {
      status: issue.status,
      latestCommentId: prev?.latestCommentId ?? null,
    };
  }

  saveState(newState);

  if (notifications.length > 0) {
    const header = `📡 *YNLED Update* (${new Date().toLocaleTimeString()})\n\n`;
    await send(pushChatId, header + notifications.join("\n\n"));
    console.log(`[push] Sent ${notifications.length} notification(s)`);
  } else {
    console.log("[push] No new events");
  }
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
      `Or send any message to post it as a note on YOU-1.\n\n` +
      `🔔 Push notifications are *on* — I'll alert you when tasks are blocked, done, or get new comments.`
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

  // Start push notification loop (only if ALLOWED_CHAT_ID is set so we know where to push)
  if (ALLOWED_CHAT_ID) {
    console.log(
      `[push] Push notifications enabled — checking every ${PUSH_INTERVAL_MS / 1000}s`
    );
    // Run once immediately on startup, then on interval
    checkAndPush(ALLOWED_CHAT_ID).catch((err) =>
      console.error("[push] Initial check failed:", err)
    );
    setInterval(() => {
      checkAndPush(ALLOWED_CHAT_ID).catch((err) =>
        console.error("[push] Interval check failed:", err)
      );
    }, PUSH_INTERVAL_MS);
  } else {
    console.log(
      "[push] Push notifications disabled — set TELEGRAM_ALLOWED_CHAT_ID to enable."
    );
  }

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
