#!/usr/bin/env tsx
/**
 * check-unique-images.ts
 *
 * Build-time guard: ensures every blog post in blogData.ts has a unique image.
 * Run via: tsx scripts/check-unique-images.ts
 * Integrated into the build via package.json "prebuild" script.
 *
 * Exits with code 1 (fails the build) if any image is shared between posts.
 */

import { ALL_BLOG_POSTS } from "../client/src/lib/blogData.js";

const imageMap = new Map<string, string[]>();

for (const post of ALL_BLOG_POSTS) {
  const img = post.image;
  if (!img) continue;
  if (!imageMap.has(img)) {
    imageMap.set(img, []);
  }
  imageMap.get(img)!.push(post.slug);
}

const duplicates = [...imageMap.entries()].filter(([, slugs]) => slugs.length > 1);

if (duplicates.length > 0) {
  console.error("\n❌ Duplicate blog post images detected — build aborted!\n");
  for (const [img, slugs] of duplicates) {
    console.error(`  ${img}`);
    for (const slug of slugs) {
      console.error(`    → /blog/${slug}`);
    }
  }
  console.error(
    "\nFix: assign a unique image to each post in client/src/lib/blogData.ts\n"
  );
  process.exit(1);
} else {
  console.log(`✓ All ${ALL_BLOG_POSTS.length} blog posts have unique images.`);
}
