# YNLED Integrations

Server-side integration scripts connecting Manus CRM, FreshBooks, and future systems.

## Manus CRM → FreshBooks Invoice Sync

**File:** `sync-manus-freshbooks.ts`

**What it does:**
1. For every Manus client without a `freshbooksId`: finds or creates the client in FreshBooks, writes the ID back to Manus
2. For every completed Manus work order without a `freshbooksInvoiceId`: creates a draft invoice in FreshBooks, writes the invoice ID back to Manus

**Run manually:**
```bash
# Dry run (no changes)
npx tsx integrations/sync-manus-freshbooks.ts --dry-run

# Live run
npx tsx integrations/sync-manus-freshbooks.ts
```

**Run via API:**
```bash
curl -X POST https://youneedled.com/api/sync/manus-freshbooks \
  -H "Authorization: Bearer $SYNC_SECRET"
```

## Required Environment Variables

See `.env.example` in this directory. **FRESHBOOKS_CLIENT_SECRET is still needed** — get it from:  
https://my.freshbooks.com/#/developer → your app → Client Secret

## Adding to Vercel

In Vercel dashboard → youneedled project → Settings → Environment Variables, add all vars from `.env.example`.

Once set, the sync runs at `POST /api/sync/manus-freshbooks`.
