/*
 * FAQ Page — YouNeedLED
 * Proper FAQ schema markup for SEO
 */
import { Link } from "wouter";
import { SITE, FAQ_GENERAL } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Phone, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="FAQ | Security & VoIP Questions Answered"
        description="Find answers to common questions about security cameras, VoIP phone systems, access control, fire alarms, and our services. You Need L.E.D. — NJ DCA Licensed."
        canonical="/faq"
      />
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-[#0e319a]">
        <div className="container text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-5">Frequently Asked Questions</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Find answers to common questions about our security, VoIP, and technology services.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container max-w-3xl">
          <div className="space-y-3">
            {FAQ_GENERAL.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-heading text-sm font-semibold text-slate-900 pr-4">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container text-center">
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">Still Have Questions?</h2>
          <p className="text-slate-600 mb-6">Our team is here to help. Contact us for a free consultation.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={SITE.phoneTel} className="inline-flex items-center gap-2 px-6 py-3 bg-[#0e319a] text-white font-semibold rounded-lg hover:bg-[#0c2a82] transition-colors text-sm">
              <Phone className="w-4 h-4" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_GENERAL.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
      {/* LocalBusiness Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LocalBusiness", "@id": `${SITE.url}/#organization`,
        name: SITE.name, url: SITE.url, telephone: SITE.phone,
        image: `${SITE.url}/logo-192.png`,
        logo: { "@type": "ImageObject", url: `${SITE.url}/logo-192.png` },
        address: { "@type": "PostalAddress", streetAddress: "199 New Rd Ste 61", addressLocality: "Linwood", addressRegion: "NJ", postalCode: "08221", addressCountry: "US" },
        geo: { "@type": "GeoCoordinates", latitude: 39.3398, longitude: -74.5774 },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "33", bestRating: "5" },
        hasCredential: "NJ DCA License #34BF00056900",
      }) }} />
      {/* BreadcrumbList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE.url}/faq` },
        ],
      }) }} />
    </>
  );
}
