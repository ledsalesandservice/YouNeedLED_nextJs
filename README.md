# You Need L.E.D. — Website

React + Vite + Tailwind website for [youneedled.com](https://youneedled.com). Hosted on Vercel.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS
- **Routing:** Wouter
- **Hosting:** Vercel
- **Build output:** `dist/public/`

## Development

```bash
pnpm install
pnpm run dev
```

## Build

```bash
pnpm run build
```

## Project Structure

```
client/
  index.html          # HTML entry point (viewport, preload, fonts)
  public/             # Static assets (images, favicons)
  src/
    App.tsx           # Route definitions (React.lazy code-split)
    pages/            # Page components
    components/       # Shared UI components
    lib/              # Data files (siteData.ts, locationData.ts, blogData.ts)
```

## Performance Notes

### Hero Images
All hero images are served locally from `client/public/` as WebP with responsive `srcset`:
- `hero-main-400w.webp` / `800w` / `1200w` / `1920w` — Home page hero
- `hero-ai-agent-400w.webp` / `800w` / `1200w` / `1920w` — AI Voice Agent page hero

### Code Splitting
`App.tsx` uses `React.lazy()` + `Suspense` for all pages except `Home`, which is eagerly loaded. This splits the JS bundle into per-route chunks, reducing the initial payload.

### Logo
`client/public/logo.png` — 87×112px, ~16KB (optimized from original 1483×1920px, 258KB).

---

## Telegram Bot (YNLED AI Assistant)

`scripts/telegram-bot.ts` — runs on Derek's laptop in polling mode (no public URL needed).

### Quick start

1. Copy `.env.example` to `.env` and fill in the Telegram vars:
   - `TELEGRAM_BOT_TOKEN` — from [@BotFather](https://t.me/BotFather) → `/newbot`
   - `TELEGRAM_ALLOWED_CHAT_ID` — run the bot once, send `/start`, copy the chat ID it prints
   - `PAPERCLIP_API_URL` / `PAPERCLIP_COMPANY_ID` / `PAPERCLIP_API_KEY` — Paperclip connection

2. Run:
   ```bash
   pnpm run telegram
   ```

### Commands

| Command | What it does |
|---------|-------------|
| `/start` | Prints your chat ID (copy to `TELEGRAM_ALLOWED_CHAT_ID`) |
| `/status` | In-progress + blocked task counts |
| `/blockers` | List all blocked tasks needing your action |
| `/wo` | Open work orders from Manus CRM |
| any text | Posts as a comment on the LED OS board (YOU-1) |

### Push notifications

Runs automatically every 5 minutes (override with `PUSH_INTERVAL_MS`):
- 🚫 **BLOCKED** — task just became blocked (needs your attention)
- ✅ **DONE** — task just completed
- 💬 **New comments** — on in-progress or blocked tasks

State is persisted in `~/.ynled-telegram-state.json` so restarts don't re-fire old events.

---

## Location Pages — Content Audit (Mar 2026)

**Status: All 76 location entries have unique content. No boilerplate detected.**

`client/src/lib/locationData.ts` contains 76 location/county entries. Each entry includes:
- A unique `description` field tailored to that city's business environment
- Unique `industries` array relevant to that location
- A unique `caseStudy` with a custom title, challenge, solution, and results
- Unique `nearbyAreas`, `responseTime`, and `serviceRadius`

All 76 descriptions are distinct (0 duplicates). All 76 case study titles are distinct (0 duplicates).

**Future recommendation:** Consider adding city-specific photos or Google Maps embeds to further differentiate location pages for SEO. The current text content is already unique per city.
