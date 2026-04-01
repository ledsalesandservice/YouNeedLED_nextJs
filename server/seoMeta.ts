/**
 * seoMeta.ts — Server-side SEO metadata lookup
 *
 * Maps URL paths → { title, description } so the Express server can inject
 * correct <title> and <meta name="description"> into static HTML before
 * sending it to crawlers.  This is the only way to make a Vite SPA
 * indexable without full SSR.
 *
 * Pattern precedence (highest → lowest):
 *  1. Exact static path  (/about, /services/voip, …)
 *  2. /locations/:slug   — generated from ALL_LOCATIONS data
 *  3. /counties/:slug    — generated from COUNTY_DATA data
 *  4. Default fallback   (homepage title/description)
 */

import { ALL_LOCATIONS, COUNTY_DATA } from "../client/src/lib/locationData.js";

export interface PageMeta {
  title: string;
  description: string;
}

const PHONE = "(609) 335-0123";
const SUFFIX = "You Need L.E.D.";

// ─── Static pages ────────────────────────────────────────────────────────────
const STATIC_META: Record<string, PageMeta> = {
  "/": {
    title: `Security Cameras & VoIP South Jersey | ${SUFFIX}`,
    description: `Professional security camera installation, VoIP phone systems, access control, and fire alarm systems in South Jersey. NJ DCA Licensed. Call ${PHONE}.`,
  },
  "/about": {
    title: `About You Need L.E.D. | 15+ Years | NJ DCA Licensed Security Company South Jersey`,
    description: `15+ years serving South Jersey. NJ DCA Licensed (#34BF00056900). 5.0 stars, 500+ satisfied clients. Security cameras, fire alarms, VoIP & more. Call ${PHONE}.`,
  },
  "/contact": {
    title: `Contact You Need L.E.D. | Free Security Quote South Jersey | ${PHONE}`,
    description: `Get a free security assessment from South Jersey's NJ DCA Licensed technology experts. Call ${PHONE} or request a quote online. Serving South Jersey & Delaware Valley.`,
  },
  "/faq": {
    title: `FAQ | Security & VoIP Questions Answered`,
    description: `Find answers to common questions about security cameras, VoIP phone systems, access control, fire alarms, and our services. You Need L.E.D. — NJ DCA Licensed.`,
  },
  "/blog": {
    title: `Security Blog | Expert Articles on Cameras, VoIP & Access Control`,
    description: `Expert articles on commercial security, VoIP technology, fire alarm systems, and business protection strategies from You Need L.E.D.`,
  },
  "/service-areas": {
    title: `Service Areas | Security & VoIP in NJ, PA, DE, MD`,
    description: `You Need L.E.D. serves South Jersey, Central Jersey, the Jersey Shore, Philadelphia, Delaware, and Maryland with security cameras, VoIP, and access control.`,
  },
  "/case-studies": {
    title: `Case Studies | Security & Technology Projects South Jersey | ${SUFFIX}`,
    description: `Real project stories from South Jersey businesses. See how You Need L.E.D. has installed security cameras, VoIP systems, and access control for warehouses, retailers, and condo associations.`,
  },
  "/terms-of-service": {
    title: `Terms of Service | ${SUFFIX} Business Services Agreement`,
    description: `Read the You Need L.E.D. Business Services Agreement covering VoIP, security cameras, access control, fire alarms, and technology services for South Jersey businesses.`,
  },
  "/services/video-surveillance": {
    title: `Commercial Security Cameras South Jersey | 4K AI Cameras | ${SUFFIX}`,
    description: `NJ DCA Licensed security camera installation in South Jersey. 4K AI cameras with license plate recognition, cloud storage & 24/7 monitoring. Free quote: ${PHONE}.`,
  },
  "/cameras": {
    title: `Commercial Security Cameras South Jersey | 4K AI Cameras | ${SUFFIX}`,
    description: `NJ DCA Licensed security camera installation in South Jersey. 4K AI cameras with license plate recognition, cloud storage & 24/7 monitoring. Free quote: ${PHONE}.`,
  },
  "/services/access-control": {
    title: `Access Control Systems South Jersey | Keyless Entry & RFID | ${SUFFIX}`,
    description: `CDVI & Alarm.com access control with RFID, biometric & mobile credentials. NJ DCA Licensed installation in South Jersey. Free quote: ${PHONE}.`,
  },
  "/services/fire-alarm-systems": {
    title: `Fire Alarm Systems South Jersey | NFPA 72 Compliant | ${SUFFIX}`,
    description: `NJ DCA Licensed fire alarm installation, monitoring & inspection in South Jersey. NFPA 72 compliant. License #34FA00102800. Free quote: ${PHONE}.`,
  },
  "/services/intrusion-detection": {
    title: `Intrusion Detection & Alarm Systems South Jersey | 24/7 Monitoring | ${SUFFIX}`,
    description: `Commercial & residential alarm systems with 24/7 monitoring, video verification & mobile alerts. NJ DCA Licensed in South Jersey. Free quote: ${PHONE}.`,
  },
  "/services/jobsite-security": {
    title: `Construction Site Security Cameras South Jersey | Solar Wireless | ${SUFFIX}`,
    description: `Solar-powered wireless jobsite security cameras for South Jersey construction sites. No power or internet needed. Remote monitoring & theft prevention. Call ${PHONE}.`,
  },
  "/services/voip": {
    title: `VoIP Phone Systems South Jersey | Hosted PBX & Microsoft Teams | ${SUFFIX}`,
    description: `Cloud PBX & VoIP with auto-attendant, Microsoft Teams integration & LEDConnect AI Voice Agents. NJ DCA Licensed. Free quote: ${PHONE}.`,
  },
  "/phone-systems": {
    title: `VoIP Phone Systems South Jersey | Hosted PBX & Microsoft Teams | ${SUFFIX}`,
    description: `Cloud PBX & VoIP with auto-attendant, Microsoft Teams integration & LEDConnect AI Voice Agents. NJ DCA Licensed. Free quote: ${PHONE}.`,
  },
  "/services/ai-voice-agent": {
    title: `LEDConnect AI Voice Agent South Jersey | 24/7 AI Receptionist | ${SUFFIX}`,
    description: `Never miss a call again. LEDConnect AI answers 24/7, blocks spam, captures leads & books appointments for South Jersey businesses. Free demo: ${PHONE}.`,
  },
  "/services/commercial-security": {
    title: `Commercial Security Systems South Jersey | NJ DCA Licensed | ${SUFFIX}`,
    description: `Complete commercial security in South Jersey: 4K cameras, access control, fire alarms, intrusion detection & jobsite security. NJ DCA Licensed. Call ${PHONE}.`,
  },
  "/services/apartment-security": {
    title: `Apartment Complex Security Systems South Jersey | NJ DCA Licensed | ${SUFFIX}`,
    description: `Complete security for apartment complexes & multi-family properties in South Jersey. Video surveillance, access control & intercom. NJ DCA Licensed. Call ${PHONE}.`,
  },
  "/services/digital-signage": {
    title: `Digital Signage South Jersey | Cloud-Managed Displays | ${SUFFIX}`,
    description: `Cloud-managed digital signage for restaurants, retail, healthcare, schools & offices in South Jersey. Professional installation by NJ DCA Licensed experts. Call ${PHONE}.`,
  },
};

// ─── Dynamic location pages ──────────────────────────────────────────────────
const LOCATION_META: Record<string, PageMeta> = {};
for (const loc of ALL_LOCATIONS) {
  const isCounty = loc.name.includes("County");
  const isRegion = loc.stateAbbr === "US";
  const title = isRegion
    ? `Security & VoIP Services in the ${loc.name} | ${SUFFIX}`
    : `Security Camera Installation & VoIP in ${loc.name}, ${loc.stateAbbr} | ${SUFFIX}`;
  const description = `Professional security cameras, VoIP phone systems, access control, and fire alarm installation in ${loc.name}${isRegion ? "" : `, ${loc.stateAbbr}`}. Licensed & insured. Call ${PHONE} for a free quote.`;
  LOCATION_META[`/locations/${loc.slug}`] = { title, description };
}

// ─── Dynamic county pages ────────────────────────────────────────────────────
const COUNTY_META: Record<string, PageMeta> = {};
for (const county of COUNTY_DATA) {
  COUNTY_META[`/counties/${county.slug}`] = {
    title: `Security & VoIP Services in ${county.name}, ${county.stateAbbr} | ${SUFFIX}`,
    description: `Professional security cameras, VoIP phone systems, access control, and fire alarm installation serving all of ${county.name}, ${county.state}. Licensed & insured. Call ${PHONE}.`,
  };
}

// ─── Public lookup ───────────────────────────────────────────────────────────
export const ALL_META: Record<string, PageMeta> = {
  ...STATIC_META,
  ...LOCATION_META,
  ...COUNTY_META,
};

const DEFAULT_META: PageMeta = STATIC_META["/"];

export function getPageMeta(path: string): PageMeta {
  // Normalize trailing slash (except root)
  const normalized = path.length > 1 ? path.replace(/\/$/, "") : path;
  return ALL_META[normalized] ?? DEFAULT_META;
}

/** Total number of URL paths with unique metadata (useful for verification) */
export const META_COUNT = Object.keys(ALL_META).length;
