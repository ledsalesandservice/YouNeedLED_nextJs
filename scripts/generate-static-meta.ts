#!/usr/bin/env tsx
/**
 * generate-static-meta.ts
 *
 * Post-build script: creates pre-rendered index.html files for every URL defined
 * in server/seoMeta.ts, with unique <title>, canonical, og:url, meta description,
 * and social tags baked in at build time.
 *
 * Why this exists: the site runs on Vercel static hosting (outputDirectory:
 * dist/public). The Express server's injectMeta() never executes on Vercel —
 * all paths fall through to the /(.*) → /index.html rewrite, giving crawlers
 * the same generic homepage meta on every page. This script fixes that by
 * generating per-path HTML files that Vercel serves directly (static files
 * take precedence over rewrites).
 *
 * Run after vite build: `tsx scripts/generate-static-meta.ts`
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { ALL_META } from "../server/seoMeta.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distPublic = join(__dirname, "..", "dist", "public");
const BASE_URL = "https://youneedled.com";

const templateHtml = readFileSync(join(distPublic, "index.html"), "utf-8");

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectPageMeta(
  html: string,
  urlPath: string,
  title: string,
  description: string
): string {
  const fullUrl = `${BASE_URL}${urlPath}`;

  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  );
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(description)}"`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeHtml(title)}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeHtml(description)}"`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${fullUrl}"`
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${fullUrl}"`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escapeHtml(title)}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeHtml(description)}"`
  );

  return html;
}

let generated = 0;
let skipped = 0;

for (const [urlPath, meta] of Object.entries(ALL_META)) {
  if (urlPath === "/") {
    // Update root index.html in-place with canonical + og:url for homepage
    const injected = injectPageMeta(templateHtml, "/", meta.title, meta.description);
    writeFileSync(join(distPublic, "index.html"), injected, "utf-8");
    generated++;
    continue;
  }

  const segments = urlPath.split("/").filter(Boolean);
  const outDir = join(distPublic, ...segments);
  const outFile = join(outDir, "index.html");

  // Skip paths that already have a hand-crafted static HTML (e.g. /cameras, /phone-systems)
  if (existsSync(outFile)) {
    skipped++;
    continue;
  }

  const injected = injectPageMeta(templateHtml, urlPath, meta.title, meta.description);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, injected, "utf-8");
  generated++;
}

console.log(
  `generate-static-meta: wrote ${generated} pages, skipped ${skipped} existing`
);
