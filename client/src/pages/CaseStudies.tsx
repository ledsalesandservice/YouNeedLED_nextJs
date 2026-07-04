import { Link } from "wouter";
import { ArrowRight, MapPin, Building2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { SITE } from "@/lib/siteData";
import { caseStudies } from "@/lib/caseStudyData";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export default function CaseStudies() {
  return (
    <>
      <SEOHead
        title="Case Studies | Security & Technology Projects South Jersey | You Need L.E.D."
        description="Real project stories from South Jersey businesses. See how You Need L.E.D. has installed security cameras, VoIP systems, and access control for warehouses, retailers, and condo associations."
        canonical="/case-studies"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a1f6e] via-[#0e319a] to-[#1a4bc4] text-white py-20 lg:py-28">
        <div className="container">
          <FadeIn className="max-w-3xl">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-4">Real Projects. Real Results.</p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-5 leading-tight">Case Studies</h1>
            <p className="text-lg text-white/80 max-w-xl">
              See how South Jersey businesses have used You Need L.E.D. to solve real security and technology challenges — with measurable results.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Case Study Cards */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <StaggerItem key={cs.slug}>
                <Link href={`/case-studies/${cs.slug}`} className="block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={cs.heroImage}
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width="600"
                      height="192"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {cs.services.slice(0, 2).map((s) => (
                        <span key={s} className="px-2.5 py-1 bg-[#0e319a]/8 text-[#0e319a] text-xs font-semibold rounded-full">{s}</span>
                      ))}
                    </div>
                    <h2 className="font-heading text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0e319a] transition-colors">{cs.title}</h2>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">{cs.subtitle}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin className="w-3 h-3" /> {cs.location}</span>
                        <span className="flex items-center gap-1 text-xs text-slate-500"><Building2 className="w-3 h-3" /> {cs.industry}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#f97015]">Read More <ArrowRight className="w-3.5 h-3.5" /></span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Your Business Could Be Next</h2>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto">
              NJ DCA Licensed. 34 years of industry experience. 500+ satisfied clients across South Jersey and the Delaware Valley.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg">
              Get a Free Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
      {/* BreadcrumbList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE.url}/case-studies` },
        ],
      }) }} />
    </>
  );
}
