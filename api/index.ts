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
  const fullUrl = `https://youneedled.com${urlPath}`;
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

const app = express();

const staticPath = path.resolve(__dirname, "..", "dist", "public");
app.use(express.static(staticPath, { index: false }));

const indexPath = path.join(staticPath, "index.html");
let indexHtml = "";
try {
  indexHtml = readFileSync(indexPath, "utf-8");
} catch {}

app.get("*", (req: Request, res: Response) => {
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
