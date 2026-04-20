import express from "express";
import { createServer } from "http";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { getPageMeta, META_COUNT, ALL_META } from "./seoMeta.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Check if a URL path has explicit metadata (i.e., is a known page) */
function isKnownPath(urlPath: string): boolean {
  const normalized = urlPath.length > 1 ? urlPath.replace(/\/$/, "") : urlPath;
  return normalized in ALL_META;
}

/** Inject per-page title + description into the index.html template. */
function injectMeta(html: string, urlPath: string, is404 = false): string {
  const meta = getPageMeta(urlPath);

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`
  );

  // Replace <meta name="description" content="…">
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(meta.description)}"`
  );

  // Replace OG title
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeHtml(meta.title)}"`
  );

  // Replace OG description
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeHtml(meta.description)}"`
  );

  // Replace Twitter title
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}"`
  );

  // Replace Twitter description
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}"`
  );

  // Replace og:url with the actual page URL (always non-www canonical)
  const fullUrl = `https://youneedled.com${urlPath}`;
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${fullUrl}"`
  );

  // Replace canonical link (always non-www canonical)
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${fullUrl}"`
  );

  // Replace og:image if the meta has a specific image
  if (meta.ogImage) {
    html = html.replace(
      /<meta property="og:image" content="[^"]*"/,
      `<meta property="og:image" content="${escapeHtml(meta.ogImage)}"`
    );
  }

  // Add noindex for unknown/404 pages so Google doesn't index them
  if (is404) {
    html = html.replace(
      "</head>",
      `<meta name="robots" content="noindex, nofollow" />\n</head>`
    );
  }

  return html;
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // ─── 1. FORCE WWW → NON-WWW (fixes duplicate content in Google Search Console) ───
  app.use((req, res, next) => {
    if (req.headers.host && req.headers.host.startsWith("www.")) {
      const newHost = req.headers.host.slice(4);
      return res.redirect(301, `${req.protocol}://${newHost}${req.originalUrl}`);
    }
    next();
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Cache index.html in memory (it's static after build)
  const indexPath = path.join(staticPath, "index.html");
  let indexHtml: string;
  try {
    indexHtml = readFileSync(indexPath, "utf-8");
  } catch {
    // During dev the file may not exist yet — fall back to empty string and
    // re-read on each request until it appears.
    indexHtml = "";
  }

  console.log(`SSR meta injection active — ${META_COUNT} unique URL patterns loaded`);

  // ─── 2. LEGACY LOCATION SLUG REDIRECTS (fixes "Soft 404" errors in GSC) ────────
  // Old slugs like /locations/cherry-hill 301 redirect to /locations/cherry-hill-nj
  app.get("/locations/:slug", (req, res, next) => {
    const slug = req.params.slug;

    // Only redirect if the slug does NOT already end in a state abbreviation
    if (
      !slug.endsWith("-nj") &&
      !slug.endsWith("-pa") &&
      !slug.endsWith("-de") &&
      !slug.endsWith("-md")
    ) {
      // Try each state suffix in priority order
      for (const suffix of ["-nj", "-pa", "-md", "-de"]) {
        const newSlug = `${slug}${suffix}`;
        if (ALL_META[`/locations/${newSlug}`]) {
          return res.redirect(301, `/locations/${newSlug}`);
        }
      }
    }

    next();
  });

  // Also handle nested service+city URLs like /locations/camden/fire-alarms
  app.get("/locations/:slug/:service", (req, res, next) => {
    const slug = req.params.slug;
    const service = req.params.service;

    if (
      !slug.endsWith("-nj") &&
      !slug.endsWith("-pa") &&
      !slug.endsWith("-de") &&
      !slug.endsWith("-md")
    ) {
      for (const suffix of ["-nj", "-pa", "-md", "-de"]) {
        const newSlug = `${slug}${suffix}`;
        if (ALL_META[`/locations/${newSlug}`]) {
          return res.redirect(301, `/locations/${newSlug}/${service}`);
        }
      }
    }

    next();
  });

  // ─── 3. CATCH-ALL: serve index.html with injected meta for all SPA routes ───────
  app.get("*", (req, res) => {
    // Re-read on each request in development so changes are reflected without restart
    let html = indexHtml;
    if (!html || process.env.NODE_ENV !== "production") {
      try {
        html = readFileSync(indexPath, "utf-8");
        if (process.env.NODE_ENV === "production") indexHtml = html;
      } catch {
        res.status(503).send("Server starting…");
        return;
      }
    }

    const known = isKnownPath(req.path);
    const injected = injectMeta(html, req.path, !known);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // Return 404 status for unknown paths so crawlers know it's not a real page
    res.status(known ? 200 : 404).send(injected);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
