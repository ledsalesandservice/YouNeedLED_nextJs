// Helper to generate sitemap data — used for reference
// The actual sitemap.xml is in client/public/

import { ALL_LOCATIONS, COUNTY_DATA } from "./locationData";

export function getAllSitemapUrls(): string[] {
  const base = "https://youneedled.com";
  const urls: string[] = [
    "/",
    "/about",
    "/contact",
    "/service-areas",
    "/blog",
    "/faq",
    "/client-portal",
    "/services/video-surveillance",
    "/services/access-control",
    "/services/fire-alarm-systems",
    "/services/intrusion-detection",
    "/services/jobsite-security",
    "/services/voip",
    "/services/ai-voice-agent",
    "/services/commercial-security",
    "/services/apartment-security",
    // Blog posts
    "/blog/environmental-monitoring-server-rooms",
    "/blog/voip-phone-systems-small-business",
    "/blog/security-cameras-reduce-theft",
    // Location pages
    ...ALL_LOCATIONS.map((l) => `/locations/${l.slug}`),
    // County pages
    ...COUNTY_DATA.map((c) => `/counties/${c.slug}`),
  ];
  return urls.map((u) => `${base}${u}`);
}
