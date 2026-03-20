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

## Location Pages — Content Audit (Mar 2026)

**Status: All 76 location entries have unique content. No boilerplate detected.**

`client/src/lib/locationData.ts` contains 76 location/county entries. Each entry includes:
- A unique `description` field tailored to that city's business environment
- Unique `industries` array relevant to that location
- A unique `caseStudy` with a custom title, challenge, solution, and results
- Unique `nearbyAreas`, `responseTime`, and `serviceRadius`

All 76 descriptions are distinct (0 duplicates). All 76 case study titles are distinct (0 duplicates).

**Future recommendation:** Consider adding city-specific photos or Google Maps embeds to further differentiate location pages for SEO. The current text content is already unique per city.
