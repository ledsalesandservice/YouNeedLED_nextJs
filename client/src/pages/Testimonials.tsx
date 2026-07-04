/*
 * Testimonials Page — YouNeedLED
 * Displays all verified Google reviews with full Review + AggregateRating schema
 * Targets: "[company] reviews", "you need led reviews", "security company reviews south jersey"
 */
import { Link } from "wouter";
import { SITE, TESTIMONIALS } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Star, Phone, ArrowRight, ExternalLink, Shield, Award } from "lucide-react";

const STAR_RATING = 5;

export default function Testimonials() {
  return (
    <>
      <SEOHead
        title="Client Reviews & Testimonials | 5.0 Stars | You Need L.E.D. South Jersey"
        description="Read verified Google reviews from 33+ satisfied clients across South Jersey. You Need L.E.D. is NJ DCA Licensed with 15+ years of experience. 5.0 stars. Call (609) 335-0123."
        canonical="/testimonials"
      />

      {/* AggregateRating + individual Review schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${SITE.url}/#organization`,
              name: SITE.name,
              url: SITE.url,
              telephone: SITE.phone,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "33",
                bestRating: "5",
                worstRating: "1",
              },
              review: TESTIMONIALS.map((t) => ({
                "@type": "Review",
                reviewBody: t.quote,
                reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                author: { "@type": "Person", name: t.name },
                publisher: { "@type": "Organization", name: "Google" },
              })),
            },
            // Individual Review entities for richer indexing
            ...TESTIMONIALS.map((t) => ({
              "@context": "https://schema.org",
              "@type": "Review",
              reviewBody: t.quote,
              reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
              author: { "@type": "Person", name: t.name },
              itemReviewed: {
                "@type": "LocalBusiness",
                "@id": `${SITE.url}/#organization`,
                name: SITE.name,
                url: SITE.url,
                telephone: SITE.phone,
              },
              publisher: { "@type": "Organization", name: "Google" },
            })),
          ]),
        }}
      />

      {/* Hero */}
      <section className="py-20 lg:py-28 bg-[#0e319a]">
        <div className="container text-center">
          <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Verified Google Reviews</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-5">
            What Our Clients Say
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Over 33 verified 5-star Google reviews from South Jersey homeowners and businesses. Real clients, real results.
          </p>
          {/* Aggregate rating badge */}
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
            <div className="text-center">
              <div className="font-heading text-4xl font-extrabold text-white">5.0</div>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f97015] text-[#f97015]" />
                ))}
              </div>
            </div>
            <div className="border-l border-white/20 pl-3 text-left">
              <div className="text-white font-semibold text-sm">33+ Reviews</div>
              <div className="text-white/60 text-xs">on Google</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: <Shield className="w-5 h-5 text-[#0e319a]" />, text: "NJ DCA Licensed #34BF00056900" },
              { icon: <Award className="w-5 h-5 text-[#0e319a]" />, text: "15+ Years in Business" },
              { icon: <Star className="w-5 h-5 fill-[#f97015] text-[#f97015]" />, text: "5.0 Stars — 33+ Reviews" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                {b.icon}
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Cards */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="flex flex-col p-6 bg-slate-50 rounded-2xl border border-slate-200"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(STAR_RATING)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-[#f97015] text-[#f97015]" />
                  ))}
                </div>
                {/* Quote */}
                <blockquote className="text-slate-700 text-sm leading-relaxed flex-1 mb-5">
                  "{t.quote}"
                </blockquote>
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-9 h-9 rounded-full bg-[#0e319a] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.type} &middot; Verified Google Review</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Google CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4 text-sm">
              These are just a few of our 33+ verified Google reviews. Read them all on our Google Business Profile.
            </p>
            <a
              href="https://g.page/youneedled"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-800 font-semibold rounded-lg hover:border-[#0e319a] hover:text-[#0e319a] transition-colors text-sm"
            >
              See All 33+ Reviews on Google <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Clients Choose Us */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">
            Why South Jersey Clients Trust You Need L.E.D.
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                heading: "NJ DCA Licensed & Insured",
                body: "We hold NJ DCA License #34BF00056900 (security) and #34FA00102800 (fire alarm). Every installation meets state code requirements — protecting your property and your liability.",
              },
              {
                heading: "15+ Years of Local Experience",
                body: "Founded in 2010, we've served 500+ clients across Atlantic, Cape May, Camden, Burlington, Gloucester, Ocean, and Cumberland counties. We know South Jersey's commercial and residential landscape.",
              },
              {
                heading: "Owner-Led Installations",
                body: "Derek Weikel personally oversees every project. You're not getting a subcontractor — you're getting the owner on-site, accountable for the quality of every camera, panel, and cable run.",
              },
              {
                heading: "Long-Term Relationships",
                body: "Many of our clients have been with us for 10+ years. We answer the phone, show up when called, and stand behind our work long after the invoice is paid.",
              },
            ].map((item) => (
              <div key={item.heading} className="p-6 bg-white rounded-xl border border-slate-200">
                <h3 className="font-heading font-semibold text-slate-900 mb-2">{item.heading}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0e319a] to-[#1a42b8]">
        <div className="container text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Join Our 500+ Satisfied Clients?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Get a free consultation from South Jersey's most trusted NJ DCA Licensed security and technology team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm"
            >
              Get Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={SITE.phoneTel}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm"
            >
              <Phone className="w-4 h-4" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>
      {/* BreadcrumbList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Testimonials", item: `${SITE.url}/testimonials` },
        ],
      }) }} />
    </>
  );
}
