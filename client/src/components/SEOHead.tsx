/*
 * SEOHead — Per-page <head> meta tags for SEO
 * Updates document title and meta tags on mount/update
 */
import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  noindex = false,
}: SEOHeadProps) {
  const fullTitle = title.includes("You Need L.E.D.")
    ? title
    : `${title} | You Need L.E.D.`;
  const baseUrl = "https://youneedled.com";
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined;
  const image = ogImage || `${baseUrl}/og-image.jpg`;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Helper to set/create meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("name", "description", description);
    if (noindex) setMeta("name", "robots", "noindex,nofollow");

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", image);
    setMeta("property", "og:site_name", "You Need L.E.D.");
    if (canonicalUrl) setMeta("property", "og:url", canonicalUrl);

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    // Canonical link
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalUrl) {
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalUrl);
    } else if (link) {
      link.remove();
    }

    return () => {
      // Cleanup noindex on unmount
      if (noindex) {
        const robotsMeta = document.querySelector('meta[name="robots"]');
        if (robotsMeta) robotsMeta.remove();
      }
    };
  }, [fullTitle, description, canonicalUrl, image, ogType, noindex]);

  return null;
}
