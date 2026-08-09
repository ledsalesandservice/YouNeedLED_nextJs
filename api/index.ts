import express, { Request, Response } from "express";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { getPageMeta, ALL_META } from "../server/seoMeta.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function isKnownPath(urlPath: string): boolean {
  const normalized = urlPath.length > 1 ? urlPath.replace(/\/$/, "") : urlPath;
  return normalized in ALL_META;
}

function injectMeta(html: string, urlPath: string, is404 = false): string {
  const meta = getPageMeta(urlPath);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeHtml(meta.description)}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeHtml(meta.title)}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeHtml(meta.description)}"`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${escapeHtml(meta.title)}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${escapeHtml(meta.description)}"`);
  const fullUrl = `https://www.youneedled.com${urlPath}`;
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${fullUrl}"`);
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${fullUrl}"`);
  if (meta.ogImage) {
    html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${escapeHtml(meta.ogImage)}"`);
  }
  if (is404) {
    html = html.replace("</head>", `<meta name="robots" content="noindex, nofollow" />\n</head>`);
  }
  return html;
}

// ─── Canonical host + path consolidation ────────────────────────────────────
// All 301 permanent. Runs BEFORE legacy redirects and SSR logic.
// Consolidates: youneedled.net -> www.youneedled.com
//               youneedled.com (no-www) -> www.youneedled.com
//               /insights/<slug> -> /blog/<slug>
const CANONICAL_HOST = "www.youneedled.com";

function enforceCanonical(req: Request, res: Response): boolean {
  const rawHost = ((req.headers["x-forwarded-host"] || req.headers.host || "") as string)
    .toLowerCase()
    .split(":")[0];

  const url = req.url || "/";
  const questionIdx = url.indexOf("?");
  const rawPath = questionIdx >= 0 ? url.slice(0, questionIdx) : url;
  const queryString = questionIdx >= 0 ? url.slice(questionIdx + 1) : "";
  let urlPath = rawPath;

  // /insights/<slug> -> /blog/<slug>
  if (urlPath === "/insights" || urlPath === "/insights/") {
    urlPath = "/blog";
  } else if (urlPath.startsWith("/insights/")) {
    urlPath = "/blog/" + urlPath.slice("/insights/".length);
  }

  // Normalize trailing slash (keep root as "/")
  if (urlPath.length > 1 && urlPath.endsWith("/")) {
    urlPath = urlPath.slice(0, -1);
  }

  const isNetHost = rawHost.includes("youneedled.net");
  const isNonWww = rawHost === "youneedled.com";
  const needsHostRedirect = isNetHost || isNonWww;
  const normalizedRaw = rawPath.length > 1 ? rawPath.replace(/\/$/, "") : rawPath;
  const needsPathRedirect = urlPath !== normalizedRaw;

  if (needsHostRedirect || needsPathRedirect) {
    const target =
      `https://${CANONICAL_HOST}${urlPath}` + (queryString ? `?${queryString}` : "");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.redirect(301, target);
    return true;
  }
  return false;
}

// Legacy URL redirects — handled here because vercel.json rewrites take priority over redirects
const REDIRECTS: Record<string, string> = {
  "/services/fire-alarms": "/services/fire-alarm-systems",
  "/services/fire-alarm": "/services/fire-alarm-systems",
  "/services/security-cameras": "/services/video-surveillance",
  "/services/sound-systems": "/services/voip",
  // VoIP pillar page consolidation
  "/services/hosted-pbx": "/services/business-phone-systems-south-jersey",
  "/services/pbx-voip": "/services/business-phone-systems-south-jersey",
  "/locations/burlington-county": "/locations/burlington-county-nj",
  "/locations/atlantic-county": "/locations/atlantic-county-nj",
  "/locations/toms-river": "/locations/toms-river-nj",
  "/locations/moorestown": "/locations/moorestown-nj",
  "/locations/marlton": "/locations/marlton-nj",
  "/locations/ocean-city": "/locations/ocean-city-nj",
  "/locations/camden": "/locations/camden-nj",
  "/locations/lakewood": "/locations/lakewood-nj",
  "/locations/wilmington": "/locations/wilmington-de",
  "/locations/gloucester-county": "/locations/gloucester-county-nj",
  "/locations/cherry-hill": "/locations/cherry-hill-nj",
  "/locations/cumberland-county": "/locations/cumberland-county-nj",
};

const app = express();

const staticPath = path.resolve(process.cwd(), "dist", "public");
app.use(express.static(staticPath, { index: false }));

const indexPath = path.join(staticPath, "index.html");
let indexHtml = "";
try {
  indexHtml = readFileSync(indexPath, "utf-8");
} catch {}

app.get("*", (req: Request, res: Response) => {
  // Enforce canonical host and path consolidation (must run first)
  if (enforceCanonical(req, res)) return;

  // Handle legacy redirects
  const redirect = REDIRECTS[req.path];
  if (redirect) {
    return res.redirect(301, redirect);
  }

  let html = indexHtml;
  if (!html) {
    try {
      html = readFileSync(indexPath, "utf-8");
      indexHtml = html;
    } catch {
      res.status(503).send("Server starting…");
      return;
    }
  }
  const known = isKnownPath(req.path);
  const injected = injectMeta(html, req.path, !known);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(known ? 200 : 404).send(injected);
});

export default app;
export const config = { api: { bodyParser: false } };
