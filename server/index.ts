import express from "express";
import { createServer } from "http";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { getPageMeta, META_COUNT } from "./seoMeta.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Inject per-page title + description into the index.html template. */
function injectMeta(html: string, urlPath: string): string {
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

  return html;
}

async function startServer() {
  const app = express();
  const server = createServer(app);

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

  // Handle client-side routing — serve index.html with injected meta for all routes
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

    const injected = injectMeta(html, req.path);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(injected);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
