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
 *  2. /blog/:slug        — generated from ALL_BLOG_POSTS data
 *  3. /case-studies/:slug — generated from caseStudies data
 *  4. /locations/:slug   — generated from ALL_LOCATIONS data
 *  5. /counties/:slug    — generated from COUNTY_DATA data
 *  6. Default fallback   (homepage title/description)
 */

import { ALL_LOCATIONS, COUNTY_DATA } from "../client/src/lib/locationData.js";
import { ALL_BLOG_POSTS } from "../client/src/lib/blogData.js";
import { caseStudies } from "../client/src/lib/caseStudyData.js";

export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
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
    title: `About ${SUFFIX} | NJ DCA Licensed Security`,
    description: `NJ DCA Licensed security company. 15+ years experience, 5.0 stars, 500+ clients in South Jersey & Delaware Valley. Call ${PHONE}.`,
  },
  "/contact": {
    title: `Contact ${SUFFIX} | Free Security Quote`,
    description: `Free security assessment from NJ DCA Licensed experts. Call ${PHONE} or request a quote. Serving South Jersey & Delaware Valley.`,
  },
  "/faq": {
    title: `FAQ | Security & VoIP Questions Answered`,
    description: `Find answers to common questions about security cameras, VoIP phone systems, access control, fire alarms, and our services. You Need L.E.D. — NJ DCA Licensed.`,
  },
  "/blog": {
    title: `Security Blog | Cameras, VoIP & Access Control`,
    description: `Expert articles on commercial security, VoIP technology, fire alarm systems, and business protection strategies from You Need L.E.D.`,
  },
  "/service-areas": {
    title: `Service Areas | Security & VoIP in NJ, PA, DE, MD`,
    description: `You Need L.E.D. serves South Jersey, Central Jersey, the Jersey Shore, and Philadelphia with full security services. VoIP phone systems available in Delaware and Maryland.`,
  },
  "/free-security-audit": {
    title: `Free Commercial Security Audit Checklist | ${SUFFIX}`,
    description: `Download the free 10-point commercial security audit checklist for South Jersey business owners. Identify hidden vulnerabilities in your cameras, access control, and fire alarms. NJ DCA Licensed. Call ${PHONE}.`,
  },
  "/case-studies": {
    title: `Case Studies | Security Projects South Jersey`,
    description: `Real project stories from South Jersey businesses. See how You Need L.E.D. improved security, VoIP, and access control for commercial clients.`,
  },
  "/testimonials": {
    title: `Client Reviews | 5.0 Stars | ${SUFFIX}`,
    description: `Verified Google reviews from 33+ satisfied clients in South Jersey. NJ DCA Licensed security camera and technology services. 5.0 stars.`,
  },
  "/terms-of-service": {
    title: `Terms of Service | ${SUFFIX}`,
    description: `You Need L.E.D. Business Services Agreement for VoIP, security cameras, access control, fire alarms, and technology installation in South Jersey.`,
  },
  "/live-cameras": {
    title: `Live Security Camera Feeds South Jersey | ${SUFFIX}`,
    description: `Live security camera feeds from South Jersey locations. Commercial-grade 4K AI cameras with cloud storage by You Need L.E.D. Call ${PHONE}.`,
  },
  "/services/video-surveillance": {
    title: `Security Camera Installation South Jersey | ${SUFFIX}`,
    description: `4K AI security camera installation in South Jersey. NJ DCA Licensed. Commercial & residential. Free quote — call ${PHONE}.`,
  },
  "/cameras": {
    title: `Security Camera Installation South Jersey | ${SUFFIX}`,
    description: `4K AI security camera installation in South Jersey. NJ DCA Licensed. Commercial & residential. Free quote — call ${PHONE}.`,
  },
  "/services/access-control": {
    title: `Access Control Systems South Jersey | ${SUFFIX}`,
    description: `CDVI & Alarm.com access control with RFID, biometric & mobile credentials. NJ DCA Licensed installation in South Jersey. Free quote: ${PHONE}.`,
  },
  "/services/fire-alarm-systems": {
    title: `Fire Alarm Systems South Jersey | NFPA 72 | ${SUFFIX}`,
    description: `NJ DCA Licensed fire alarm installation, monitoring & inspection in South Jersey. NFPA 72 compliant. License #34FA00102800. Free quote: ${PHONE}.`,
  },
  "/services/intrusion-detection": {
    title: `Intrusion Detection South Jersey | ${SUFFIX}`,
    description: `Commercial & residential alarm systems with 24/7 monitoring, video verification & mobile alerts. NJ DCA Licensed in South Jersey. Free quote: ${PHONE}.`,
  },
  "/services/jobsite-security": {
    title: `Construction Site Security Cameras NJ | ${SUFFIX}`,
    description: `Solar-powered wireless jobsite cameras for South Jersey construction sites. No power or internet needed. NJ DCA Licensed. Call ${PHONE}.`,
  },
  "/services/voip": {
    title: `VoIP Phone Systems South Jersey | ${SUFFIX}`,
    description: `Cloud PBX & VoIP with auto-attendant, Microsoft Teams integration & LEDConnect AI Voice Agents. NJ DCA Licensed. Free quote: ${PHONE}.`,
  },
  "/phone-systems": {
    title: `VoIP Phone Systems South Jersey | ${SUFFIX}`,
    description: `Cloud PBX & VoIP with auto-attendant, Microsoft Teams integration & LEDConnect AI Voice Agents. NJ DCA Licensed. Free quote: ${PHONE}.`,
  },
  "/services/ai-voice-agent": {
    title: `LEDConnect AI Voice Agent South Jersey | ${SUFFIX}`,
    description: `Never miss a call again. LEDConnect AI answers 24/7, blocks spam, captures leads & books appointments for South Jersey businesses. Free demo: ${PHONE}.`,
  },
  "/services/commercial-security": {
    title: `Commercial Security Systems South Jersey | ${SUFFIX}`,
    description: `Complete South Jersey security: 4K cameras, access control, fire alarms & intrusion detection. NJ DCA Licensed. Call ${PHONE}.`,
  },
  "/services/apartment-security": {
    title: `Apartment Security Systems South Jersey | ${SUFFIX}`,
    description: `Security cameras, access control, intercoms & fire alarms for South Jersey apartment complexes. NJ DCA Licensed. Free quote — ${PHONE}.`,
  },
  "/services/digital-signage": {
    title: `Digital Signage South Jersey | ${SUFFIX}`,
    description: `Cloud-managed digital signage for South Jersey businesses. 50+ widgets, kiosk mode, queue management. Free 30-day trial. Call ${PHONE}.`,
  },
  "/services/fiber-optic": {
    title: `Fiber Optic Installation South Jersey | ${SUFFIX}`,
    description: `Fiber optic installation, fusion splicing & emergency repair in South Jersey. Single-mode & multimode for commercial buildings. Call ${PHONE}.`,
  },
  "/services/cannabis-security": {
    title: `Cannabis Security Systems NJ | CRC Compliant | ${SUFFIX}`,
    description: `CRC-compliant cannabis security in NJ. 4K cameras, access control, fire alarms & 24/7 monitoring for cultivators and dispensaries. Call ${PHONE}.`,
  },
  "/services/business-phone-systems-south-jersey": {
    title: `Business Phone Systems South Jersey | ${SUFFIX}`,
    description: `Hosted VoIP phone systems for South Jersey businesses. Local install, AI receptionist, 24/7 support. Free quote — call ${PHONE}.`,
  },
  "/privacy-policy": {
    title: `Privacy Policy | ${SUFFIX}`,
    description: `Read the You Need L.E.D. Privacy Policy. We are committed to protecting your personal information. NJ DCA Licensed technology services company in South Jersey.`,
  },
  "/client-portal": {
    title: `Client Portal | ${SUFFIX}`,
    description: `Access the You Need L.E.D. client portal to view your system status, service history, and account information. Call ${PHONE} for support.`,
  },
};

// ─── Dynamic blog post pages ─────────────────────────────────────────────────
const BLOG_META: Record<string, PageMeta> = {};
for (const post of ALL_BLOG_POSTS) {
  BLOG_META[`/blog/${post.slug}`] = {
    title: `${post.title} | ${SUFFIX}`,
    description: post.excerpt,
    ogImage: post.image ? `https://www.youneedled.com${post.image}` : undefined,
  };
}

// ─── Dynamic case study pages ─────────────────────────────────────────────────
const CASE_STUDY_META: Record<string, PageMeta> = {};
for (const cs of caseStudies) {
  CASE_STUDY_META[`/case-studies/${cs.slug}`] = {
    title: cs.metaTitle,
    description: cs.metaDescription,
  };
}

// ─── Dynamic location pages ──────────────────────────────────────────────────
const LOCATION_META: Record<string, PageMeta> = {};
for (const loc of ALL_LOCATIONS) {
  const isCounty = loc.name.includes("County");
  const isRegion = loc.stateAbbr === "US";
  // Keep location titles concise — Google rewrites anything over ~60 chars
  const title = isRegion
    ? `Security & VoIP in the ${loc.name} | ${SUFFIX}`
    : `Security Cameras in ${loc.name}, ${loc.stateAbbr} | ${SUFFIX}`;
  const description = `Professional security cameras, VoIP phone systems, access control, and fire alarm installation in ${loc.name}${isRegion ? "" : `, ${loc.stateAbbr}`}. Licensed & insured. Call ${PHONE} for a free quote.`;
  LOCATION_META[`/locations/${loc.slug}`] = { title, description };
}

// ─── Dynamic county pages ────────────────────────────────────────────────────
const COUNTY_META: Record<string, PageMeta> = {};
for (const county of COUNTY_DATA) {
  COUNTY_META[`/counties/${county.slug}`] = {
    title: `Security & VoIP in ${county.name}, ${county.stateAbbr} | ${SUFFIX}`,
    description: `Professional security cameras, VoIP, access control & fire alarms in South Jersey and Delaware Valley. NJ DCA Licensed. Free quote — ${PHONE}.`,
  };
}

// ─── Public lookup ───────────────────────────────────────────────────────────
export const ALL_META: Record<string, PageMeta> = {
  ...STATIC_META,
  ...BLOG_META,
  ...CASE_STUDY_META,
  ...LOCATION_META,
  ...COUNTY_META,
};

const DEFAULT_META: PageMeta = STATIC_META["/"];

const NOT_FOUND_META: PageMeta = {
  title: `Page Not Found | ${SUFFIX}`,
  description: "The page you are looking for doesn't exist. It may have been moved or deleted.",
};

export function getPageMeta(path: string): PageMeta {
  // Normalize trailing slash (except root)
  const normalized = path.length > 1 ? path.replace(/\/$/, "") : path;
  return ALL_META[normalized] ?? NOT_FOUND_META;
}

/** Total number of URL paths with unique metadata (useful for verification) */
export const META_COUNT = Object.keys(ALL_META).length;
