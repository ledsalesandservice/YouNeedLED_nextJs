/**
 * blogPreviewData.ts
 *
 * Lightweight blog preview data for the Home page.
 * Contains only the first 3 posts with metadata — NO full markdown content.
 * This keeps the initial JS bundle small since Home.tsx only shows a 3-card
 * preview section. The full blogData.ts (299 KB) is only loaded when the user
 * navigates to /blog or /blog/:slug.
 */

export interface BlogPreview {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
  image: string;
}

export const FEATURED_BLOG_POSTS: BlogPreview[] = [
  {
    slug: "securing-your-business-in-atlantic-city-a-2026-guide",
    title: "Securing Your Business in Atlantic City: A 2026 Guide",
    date: "2026-04-05",
    category: "Commercial Security",
    excerpt: "A guide for Atlantic City, NJ business owners on upgrading their security. Learn about 4K AI cameras, access control, and alarm systems from a local, licensed expert.",
    readTime: "4 min",
    image: "/blog-images/blog-commercial-building-800w.webp",
  },
  {
    slug: "nj-crc-security-compliance-guide-cannabis-businesses",
    title: "NJ CRC Security Compliance: A Plain-English Guide for Cannabis Businesses",
    date: "2026-03-29",
    category: "Commercial Security",
    excerpt: "A guide to NJ CRC security requirements for cannabis dispensaries and cultivators. Covers cameras, access control, and alarm systems for compliance.",
    readTime: "5 min",
    image: "/blog-images/blog-kitchen-800w.webp",
  },
  {
    slug: "5-must-have-security-upgrades-for-jersey-shore-restaurants-retail-shops",
    title: "5 Must-Have Security Upgrades for Jersey Shore Restaurants & Retail Shops",
    date: "2026-03-22",
    category: "Commercial Security",
    excerpt: "Protecting your Jersey Shore business starts with the right security upgrades. Discover the top 5 systems every restaurant and retailer should have.",
    readTime: "5 min",
    image: "/blog-images/blog-pizza-800w.webp",
  },
];
