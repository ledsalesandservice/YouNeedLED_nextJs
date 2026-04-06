/**
 * Vercel serverless function: POST /api/telegram/webhook
 *
 * Receives Telegram updates and lets Derek interact with YNLED systems
 * from his phone. Webhook is registered with Telegram pointing here.
 *
 * Commands:
 *   /start    — Register Derek's chat_id (run this once after creating the bot)
 *   /status   — Open/blocked task counts
 *   /blockers — List all blocked tasks needing Derek's attention
 *   /pending  — Show pending uninvoiced items (preview without creating)
 *   /approve  — Create FreshBooks draft invoices for all pending items
 *   <text>    — AI-powered conversation (Claude) or smart intent handler
 *
 * Required env vars in Vercel:
 *   TELEGRAM_BOT_TOKEN            — From BotFather
 *   TELEGRAM_WEBHOOK_SECRET       — Random string; set when registering webhook
 *   TELEGRAM_CHAT_ID              — Derek's chat ID (auto-saved on /start)
 *   PAPERCLIP_API_URL             — Paperclip API base URL
 *   PAPERCLIP_COMPANY_ID          — YNLED company ID
 *   PAPERCLIP_API_KEY             — Persistent Paperclip API key (not the run JWT)
 *   PAPERCLIP_DEFAULT_ISSUE_ID    — Issue ID to post free-text comments to (defaults to YOU-1)
 *
 * Optional (for AI-powered free text):
 *   ANTHROPIC_API_KEY             — Enables Claude-powered conversational responses
 *
 * Optional (for auto-saving chat_id on /start):
 *   VERCEL_API_TOKEN              — Vercel personal access token
 *   VERCEL_PROJECT_ID             — Vercel project ID
 *   VERCEL_TELEGRAM_CHAT_ID_ENV_ID — Vercel env var ID for TELEGRAM_CHAT_ID
 *
 * Webhook registration (run once after deploying):
 *   curl "https://api.telegram.org/bot<TOKEN>/setWebhook" \
 *     -d "url=https://www.youneedled.com/api/telegram/webhook" \
 *     -d "secret_token=<TELEGRAM_WEBHOOK_SECRET>"
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

// ─── Telegram types ───────────────────────────────────────────────────────────

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

// ─── Telegram send ────────────────────────────────────────────────────────────

async function sendMessage(chatId: number, text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN not set");
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("[telegram] sendMessage failed:", err);
  }
}

// ─── Save chat_id via Vercel API ──────────────────────────────────────────────

async function saveChatId(chatId: number): Promise<void> {
  const { VERCEL_API_TOKEN, VERCEL_PROJECT_ID, VERCEL_TELEGRAM_CHAT_ID_ENV_ID } = process.env;
  if (!VERCEL_API_TOKEN || !VERCEL_PROJECT_ID || !VERCEL_TELEGRAM_CHAT_ID_ENV_ID) {
    console.warn(
      `[telegram] Chat ID captured: ${chatId} — manually set TELEGRAM_CHAT_ID=${chatId} in Vercel`
    );
    return;
  }
  const res = await fetch(
    `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/env/${VERCEL_TELEGRAM_CHAT_ID_ENV_ID}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${VERCEL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: String(chatId) }),
    }
  );
  if (res.ok) {
    console.log(`[telegram] Saved TELEGRAM_CHAT_ID=${chatId} to Vercel`);
  } else {
    console.warn(`[telegram] Could not save chat_id to Vercel — set TELEGRAM_CHAT_ID=${chatId} manually`);
  }
}

// ─── Paperclip integration ────────────────────────────────────────────────────

const PAPERCLIP_BASE = process.env.PAPERCLIP_API_URL || "https://app.paperclip.ing";
const PAPERCLIP_COMPANY_ID = process.env.PAPERCLIP_COMPANY_ID;
// YOU-1 is the parent LED OS issue
const DEFAULT_ISSUE_ID =
  process.env.PAPERCLIP_DEFAULT_ISSUE_ID || "e2a93af9-ca3d-47e2-82f6-69600b9b325c";

interface PaperclipIssue {
  identifier: string;
  title: string;
  status: string;
  priority: string;
}

async function paperclipGet<T>(path: string): Promise<T | null> {
  const key = process.env.PAPERCLIP_API_KEY;
  if (!key) {
    console.warn("[telegram] PAPERCLIP_API_KEY not set — skipping Paperclip fetch");
    return null;
  }
  const res = await fetch(`${PAPERCLIP_BASE}${path}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!res.ok) throw new Error(`Paperclip GET ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

async function paperclipPost(path: string, body: unknown): Promise<boolean> {
  const key = process.env.PAPERCLIP_API_KEY;
  if (!key) {
    console.warn("[telegram] PAPERCLIP_API_KEY not set — skipping Paperclip post");
    return false;
  }
  const res = await fetch(`${PAPERCLIP_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Paperclip POST ${path} → ${res.status}: ${await res.text()}`);
  return true;
}

// ─── Command handlers ─────────────────────────────────────────────────────────

async function handleStatus(chatId: number): Promise<void> {
  if (!PAPERCLIP_COMPANY_ID || !process.env.PAPERCLIP_API_KEY) {
    await sendMessage(chatId, "⚠️ Paperclip not connected — /status unavailable.\nThe billing commands (/approve, /pending) work without it.");
    return;
  }
  const issues = await paperclipGet<PaperclipIssue[]>(
    `/api/companies/${PAPERCLIP_COMPANY_ID}/issues?status=in_progress,blocked`
  );
  if (!issues) return;
  const inProgress = issues.filter((i) => i.status === "in_progress").length;
  const blocked = issues.filter((i) => i.status === "blocked").length;
  await sendMessage(
    chatId,
    `📊 *YNLED Status*\n\n` +
      `🔄 In progress: ${inProgress}\n` +
      `🚫 Blocked (needs you): ${blocked}\n\n` +
      `Use /blockers to see what's waiting on you.`
  );
}

async function handleBlockers(chatId: number): Promise<void> {
  if (!PAPERCLIP_COMPANY_ID || !process.env.PAPERCLIP_API_KEY) {
    await sendMessage(chatId, "⚠️ Paperclip not connected — /blockers unavailable.\nThe billing commands (/approve, /pending) work without it.");
    return;
  }
  const issues = await paperclipGet<PaperclipIssue[]>(
    `/api/companies/${PAPERCLIP_COMPANY_ID}/issues?status=blocked`
  );
  if (!issues) return;
  if (issues.length === 0) {
    await sendMessage(chatId, "✅ No blocked tasks right now — all clear!");
    return;
  }
  const lines = issues.map(
    (i) => `• *[${i.identifier}]* ${i.title}`
  );
  await sendMessage(
    chatId,
    `🚫 *Blocked Tasks (${issues.length})*\n\nThese need your action:\n\n${lines.join("\n")}`
  );
}

async function callSyncEndpoint(mode: "preview" | "execute"): Promise<Response> {
  const secret = process.env.SYNC_SECRET;
  if (!secret) throw new Error("SYNC_SECRET not configured");
  const url =
    mode === "execute"
      ? "https://www.youneedled.com/api/sync/manus-freshbooks?execute=1"
      : "https://www.youneedled.com/api/sync/manus-freshbooks";
  return fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
  });
}

async function handlePending(chatId: number): Promise<void> {
  await sendMessage(chatId, "🔍 Checking pending items...");
  const res = await callSyncEndpoint("preview");
  if (!res.ok) {
    const err = await res.text();
    await sendMessage(chatId, `❌ Preview failed: ${err.slice(0, 200)}`);
    return;
  }
  const data = await res.json() as {
    pendingCount: number;
    pendingWorkOrders: number;
    pendingServiceLogs: number;
    estimatedRevenue: string;
  };
  if (data.pendingCount === 0) {
    await sendMessage(chatId, "✅ No pending items to invoice right now.");
    return;
  }
  await sendMessage(
    chatId,
    `📋 *Pending Invoice Items*\n\n` +
      `• Work orders: ${data.pendingWorkOrders}\n` +
      `• Service logs: ${data.pendingServiceLogs}\n` +
      `• Est. revenue: *$${data.estimatedRevenue}*\n\n` +
      `Reply /approve to create these as drafts in FreshBooks.`
  );
}

async function handleApprove(chatId: number): Promise<void> {
  await sendMessage(chatId, "⏳ Creating FreshBooks draft invoices...");
  const res = await callSyncEndpoint("execute");
  if (!res.ok) {
    const err = await res.text();
    await sendMessage(chatId, `❌ Sync failed: ${err.slice(0, 200)}`);
    return;
  }
  const data = await res.json() as {
    invoicesCreated: number;
    clientsLinked: number;
    clientsCreated: number;
    errors: { id: number | string; error: string }[];
  };
  if (data.errors?.length > 0) {
    const errLines = data.errors.slice(0, 5).map((e) => `• ${e.id}: ${e.error}`).join("\n");
    await sendMessage(
      chatId,
      `⚠️ *Done with errors*\n\n` +
        `✅ ${data.invoicesCreated} invoice(s) created\n` +
        `❌ ${data.errors.length} error(s):\n${errLines}\n\n` +
        `Check FreshBooks and Manus for details.`
    );
  } else {
    await sendMessage(
      chatId,
      `✅ *Invoices Created*\n\n` +
        `${data.invoicesCreated} draft invoice(s) are now in FreshBooks.\n` +
        `Review and send when ready.`
    );
  }
}

// ─── Business context builder ─────────────────────────────────────────────────

interface BusinessContext {
  tasks: { inProgress: number; blocked: number; blockerTitles: string[] };
  billing: { pendingCount: number; estimatedRevenue: string } | null;
}

async function buildBusinessContext(): Promise<BusinessContext> {
  const ctx: BusinessContext = {
    tasks: { inProgress: 0, blocked: 0, blockerTitles: [] },
    billing: null,
  };

  // Fetch Paperclip tasks and sync preview in parallel
  const [issuesResult, billingResult] = await Promise.allSettled([
    PAPERCLIP_COMPANY_ID && process.env.PAPERCLIP_API_KEY
      ? paperclipGet<PaperclipIssue[]>(
          `/api/companies/${PAPERCLIP_COMPANY_ID}/issues?status=in_progress,blocked`
        )
      : Promise.resolve(null),
    process.env.SYNC_SECRET
      ? fetch("https://www.youneedled.com/api/sync/manus-freshbooks", {
          method: "POST",
          headers: { Authorization: `Bearer ${process.env.SYNC_SECRET}` },
        }).then((r) => (r.ok ? r.json() : null))
      : Promise.resolve(null),
  ]);

  if (issuesResult.status === "fulfilled" && issuesResult.value) {
    const issues = issuesResult.value;
    ctx.tasks.inProgress = issues.filter((i) => i.status === "in_progress").length;
    ctx.tasks.blocked = issues.filter((i) => i.status === "blocked").length;
    ctx.tasks.blockerTitles = issues
      .filter((i) => i.status === "blocked")
      .slice(0, 5)
      .map((i) => `${i.identifier}: ${i.title}`);
  }

  if (billingResult.status === "fulfilled" && billingResult.value) {
    const b = billingResult.value as { pendingCount: number; estimatedRevenue: string };
    ctx.billing = { pendingCount: b.pendingCount, estimatedRevenue: b.estimatedRevenue };
  }

  return ctx;
}

// ─── Claude-powered free text ─────────────────────────────────────────────────

async function askClaude(userMessage: string, ctx: BusinessContext): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

  const contextLines: string[] = [
    "You are the YNLED business assistant bot. YNLED (You Need LED) is a security systems and LED signage company in South Jersey run by Derek.",
    "Services: security cameras, alarms, access control, VoIP (YouNeedLED Connect), LED signage, alarm monitoring.",
    "Staff: Derek (owner) + 3 technicians.",
    "",
    "Current business context:",
    `- Tasks in progress: ${ctx.tasks.inProgress}`,
    `- Tasks blocked/need Derek: ${ctx.tasks.blocked}`,
  ];

  if (ctx.tasks.blockerTitles.length > 0) {
    contextLines.push(`- Blocked tasks: ${ctx.tasks.blockerTitles.join(" | ")}`);
  }

  if (ctx.billing) {
    contextLines.push(
      `- Uninvoiced items ready to bill: ${ctx.billing.pendingCount} (est. $${ctx.billing.estimatedRevenue})`
    );
  }

  contextLines.push(
    "",
    "Available bot commands Derek can use: /status, /blockers, /pending, /approve",
    "",
    "Respond conversationally and concisely — this is a Telegram chat. Keep replies under 200 words.",
    "Use plain text only, no markdown formatting (no *, **, _, etc).",
    "If asked to take an action like approve invoices, tell Derek to use the relevant command instead."
  );

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: contextLines.join("\n"),
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error: ${res.status} ${err.slice(0, 200)}`);
  }

  const data = await res.json() as { content: { type: string; text: string }[] };
  return data.content.find((b) => b.type === "text")?.text ?? "I couldn't generate a response.";
}

// ─── Smart intent fallback (no API key needed) ────────────────────────────────

async function handleIntentFallback(chatId: number, text: string, ctx: BusinessContext): Promise<void> {
  const lower = text.toLowerCase();

  // Billing / invoice intent
  if (/pending|invoice|bill|unbilled|billing|how much.*owe|revenue/.test(lower)) {
    if (ctx.billing) {
      if (ctx.billing.pendingCount === 0) {
        await sendMessage(chatId, "✅ Nothing pending to invoice right now.");
      } else {
        await sendMessage(
          chatId,
          `📋 ${ctx.billing.pendingCount} item(s) ready to invoice — est. $${ctx.billing.estimatedRevenue}\n\nUse /pending for details or /approve to create drafts in FreshBooks.`
        );
      }
    } else {
      await sendMessage(chatId, "Use /pending to see what's ready to invoice.");
    }
    return;
  }

  // Status / tasks intent
  if (/status|tasks?|what.*(going on|happening)|progress|update/.test(lower)) {
    const parts: string[] = [];
    if (ctx.tasks.inProgress > 0) parts.push(`🔄 ${ctx.tasks.inProgress} task(s) in progress`);
    if (ctx.tasks.blocked > 0) parts.push(`🚫 ${ctx.tasks.blocked} blocked — need your input`);
    if (parts.length === 0) {
      await sendMessage(chatId, "✅ All clear — nothing active or blocked.");
    } else {
      await sendMessage(chatId, parts.join("\n") + "\n\nUse /blockers to see what needs you.");
    }
    return;
  }

  // Blockers intent
  if (/block|stuck|waiting|need me|action|urgent/.test(lower)) {
    if (ctx.tasks.blocked === 0) {
      await sendMessage(chatId, "✅ Nothing blocked right now.");
    } else {
      const lines = ctx.tasks.blockerTitles.map((t) => `• ${t}`).join("\n");
      await sendMessage(chatId, `🚫 ${ctx.tasks.blocked} blocked task(s):\n\n${lines}\n\nUse /blockers for full list.`);
    }
    return;
  }

  // Help intent
  if (/help|what can you|commands|what do you do/.test(lower)) {
    await sendMessage(
      chatId,
      `Here's what I can do:\n\n/pending — Show uninvoiced items\n/approve — Create FreshBooks draft invoices\n/status — Task summary\n/blockers — What needs your action\n\nOr just ask me anything about your business.`
    );
    return;
  }

  // Default: post to Paperclip board as a note
  const posted = await paperclipPost(`/api/issues/${DEFAULT_ISSUE_ID}/comments`, {
    body: `💬 **Message via Telegram:**\n\n${text}`,
  });
  if (posted) {
    await sendMessage(chatId, "✅ Noted — posted to the team board.");
  } else {
    await sendMessage(chatId, "I'm not sure how to help with that yet. Try /status, /blockers, /pending, or /approve.");
  }
}

// ─── Free text handler (AI + fallback) ───────────────────────────────────────

async function handleFreeText(
  chatId: number,
  text: string,
): Promise<void> {
  // Build context once — used by both paths
  const ctx = await buildBusinessContext();

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const reply = await askClaude(text, ctx);
      await sendMessage(chatId, reply);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[telegram] Claude error:", msg);
      // Fall through to intent handler on AI failure
      await handleIntentFallback(chatId, text, ctx);
    }
  } else {
    await handleIntentFallback(chatId, text, ctx);
  }
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Validate Telegram webhook secret
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (webhookSecret && req.headers["x-telegram-bot-api-secret-token"] !== webhookSecret) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const update: TelegramUpdate = req.body;
  const message = update?.message;

  // Always return 200 to Telegram — retries on non-200
  if (!message?.text) return res.status(200).json({ ok: true });

  const chatId = message.chat.id;
  const text = message.text.trim();

  try {
    if (text === "/start") {
      await saveChatId(chatId);
      await sendMessage(
        chatId,
        `👋 Hi! I'm the YNLED bot.\n\n` +
          `I'll ping you when something needs your attention.\n\n` +
          `Commands:\n` +
          `/status — Open tasks summary\n` +
          `/blockers — What's blocked and waiting on you\n` +
          `/pending — Show uninvoiced items ready to bill\n` +
          `/approve — Create FreshBooks draft invoices now\n\n` +
          `Or send any message to post it as a note to the team.`
      );
    } else if (text === "/status") {
      await handleStatus(chatId);
    } else if (text === "/blockers") {
      await handleBlockers(chatId);
    } else if (text === "/pending") {
      await handlePending(chatId);
    } else if (text === "/approve") {
      await handleApprove(chatId);
    } else if (!text.startsWith("/")) {
      await handleFreeText(chatId, text);
    } else {
      await sendMessage(chatId, "Unknown command. Try /status, /blockers, /pending, or /approve.");
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[telegram/webhook] Error:", msg);
    try {
      await sendMessage(chatId, `❌ Error: ${msg}`);
    } catch {
      // ignore send failure
    }
  }

  return res.status(200).json({ ok: true });
}
