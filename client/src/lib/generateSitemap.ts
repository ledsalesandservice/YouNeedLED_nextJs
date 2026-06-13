/**
 * Sitemap generator — auto-run at build time via `pnpm run generate-sitemap`
 * Also used as a reference for getAllSitemapUrls() in other tooling.
 *
 * To regenerate sitemap.xml: pnpm run generate-sitemap
 */

import { ALL_LOCATIONS, COUNTY_DATA } from "./locationData";
import { ALL_BLOG_POSTS as blogPosts, BlogPost } from "./blogData";
import { caseStudies } from "./caseStudyData";

const BASE_URL = "https://www.youneedled.com";
const TODAY = new Date().toISOString().split("T")[0];

// County slugs - these live at /counties/:slug, NOT /locations/:slug
const COUNTY_SLUGS = new Set(COUNTY_DATA.map((c) => c.slug));

export function getAllSitemapUrls(): string[] {
  const staticUrls = [
    "/",
    "/about",
    "/contact",
    "/service-areas",
    "/blog",
    "/faq",
    "/client-portal",
    "/cameras",
    "/phone-systems",
    "/live-cameras",
    "/services/video-surveillance",
    "/services/access-control",
    "/services/fire-alarm-systems",
    "/services/intrusion-detection",
    "/services/jobsite-security",
    "/services/voip",
    "/services/ai-voice-agent",
    "/services/commercial-security",
    "/services/apartment-security",
    "/services/digital-signage",
    "/services/fiber-optic",
    "/case-studies",
    "/terms-of-service",
    "/privacy-policy",
  ];

  const locationUrls = ALL_LOCATIONS
    .filter((l) => !COUNTY_SLUGS.has(l.slug)) // county slugs live at /counties/:slug
    .map((l) => `/locations/${l.slug}`);

  const countyUrls = COUNTY_DATA.map((c) => `/counties/${c.slug}`);

  const blogUrls = blogPosts.map((b) => `/blog/${b.slug}`);

  const caseStudyUrls = caseStudies.map((c) => `/case-studies/${c.slug}`);

  return [...staticUrls, ...locationUrls, ...countyUrls, ...blogUrls, ...caseStudyUrls]
    .map((u) => `${BASE_URL}${u}`);
}

function buildSitemapXml(): string {
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/about", priority: "0.8", changefreq: "monthly" },
    { url: "/contact", priority: "0.9", changefreq: "monthly" },
    { url: "/service-areas", priority: "0.8", changefreq: "monthly" },
    { url: "/blog", priority: "0.8", changefreq: "weekly" },
    { url: "/faq", priority: "0.8", changefreq: "monthly" },
    { url: "/client-portal", priority: "0.5", changefreq: "yearly" },
    { url: "/cameras", priority: "0.9", changefreq: "monthly" },
    { url: "/phone-systems", priority: "0.9", changefreq: "monthly" },
    { url: "/live-cameras", priority: "0.7", changefreq: "weekly" },
    { url: "/services/video-surveillance", priority: "0.9", changefreq: "monthly" },
    { url: "/services/access-control", priority: "0.9", changefreq: "monthly" },
    { url: "/services/fire-alarm-systems", priority: "0.9", changefreq: "monthly" },
    { url: "/services/intrusion-detection", priority: "0.8", changefreq: "monthly" },
    { url: "/services/jobsite-security", priority: "0.8", changefreq: "monthly" },
    { url: "/services/voip", priority: "0.9", changefreq: "monthly" },
    { url: "/services/ai-voice-agent", priority: "0.8", changefreq: "monthly" },
    { url: "/services/commercial-security", priority: "0.9", changefreq: "monthly" },
    { url: "/services/apartment-security", priority: "0.8", changefreq: "monthly" },
    { url: "/services/digital-signage", priority: "0.8", changefreq: "monthly" },
    { url: "/case-studies", priority: "0.7", changefreq: "monthly" },
    { url: "/services/fiber-optic", priority: "0.8", changefreq: "monthly" },
    { url: "/terms-of-service", priority: "0.4", changefreq: "yearly" },
    { url: "/privacy-policy", priority: "0.4", changefreq: "yearly" },
  ];

  const entries: string[] = [];

  for (const p of staticPages) {
    entries.push(
      `  <url>\n    <loc>${BASE_URL}${p.url}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
    );
  }

  const locationOnlySlugs = ALL_LOCATIONS
    .filter((l) => !COUNTY_SLUGS.has(l.slug))
    .sort((a, b) => a.slug.localeCompare(b.slug));

  for (const loc of locationOnlySlugs) {
    entries.push(
      `  <url>\n    <loc>${BASE_URL}/locations/${loc.slug}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    );
  }

  for (const county of [...COUNTY_DATA].sort((a, b) => a.slug.localeCompare(b.slug))) {
    entries.push(
      `  <url>\n    <loc>${BASE_URL}/counties/${county.slug}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    );
  }

  // Use actual post.date for lastmod so Google knows when content was published
  for (const post of [...blogPosts].sort((a, b) => a.slug.localeCompare(b.slug))) {
    entries.push(
      `  <url>\n    <loc>${BASE_URL}/blog/${post.slug}</loc>\n    <lastmod>${post.date || TODAY}</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>0.6</priority>\n  </url>`
    );
  }

  for (const cs of [...caseStudies].sort((a, b) => a.slug.localeCompare(b.slug))) {
    entries.push(
      `  <url>\n    <loc>${BASE_URL}/case-studies/${cs.slug}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>0.6</priority>\n  </url>`
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}

// When run directly (Node.js script via tsx), write the sitemap
const isMain = typeof process !== "undefined" &&
  (process.argv[1]?.includes("generateSitemap") || process.env.GENERATE_SITEMAP === "1");

if (isMain) {
  import("fs").then(({ writeFileSync }) => {
    import("path").then(({ resolve, dirname }) => {
      import("url").then(({ fileURLToPath }) => {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const outPath = resolve(__dirname, "../../public/sitemap.xml");
        writeFileSync(outPath, buildSitemapXml());
        console.log(`✓ Sitemap written to ${outPath}`);
      });
    });
  });
}
