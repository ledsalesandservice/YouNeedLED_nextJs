import { useParams, Link } from "wouter";
import { ArrowRight, CheckCircle2, MapPin, Building2, Wrench, Calendar, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { SITE } from "@/lib/siteData";
import { getCaseStudyBySlug, caseStudies } from "@/lib/caseStudyData";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import NotFound from "./NotFound";

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const cs = getCaseStudyBySlug(slug ?? "");

  if (!cs) return <NotFound />;

  return (
    <>
      <SEOHead
        title={cs.metaTitle}
        description={cs.metaDescription}
        canonical={`/case-studies/${cs.slug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: cs.title,
            description: cs.metaDescription,
            datePublished: cs.publishDate,
            author: { "@type": "Organization", name: SITE.name, url: SITE.url },
            publisher: {
              "@type": "Organization",
              name: SITE.name,
              url: SITE.url,
              logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/case-studies/${cs.slug}` },
            image: cs.heroImage,
          }),
        }}
      />

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-[#0a1f6e] via-[#0e319a] to-[#1a4bc4] text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={cs.heroImage} alt="" className="w-full h-full object-cover" loading="eager" />
        </div>
        <div className="container relative z-10">
          <FadeIn>
            <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-6 transition-colors">
              ← Back to Case Studies
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              {cs.services.map((s) => (
                <span key={s} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-white/90">{s}</span>
              ))}
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 max-w-3xl leading-tight">{cs.title}</h1>
            <p className="text-lg text-white/80 max-w-2xl mb-8">{cs.subtitle}</p>
            <div className="flex flex-wrap gap-6 text-sm text-white/70">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#f97015]" /> {cs.location}</span>
              <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-[#f97015]" /> {cs.industry}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#f97015]" /> {new Date(cs.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== RESULTS METRICS ===== */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {cs.results.map((r) => (
              <StaggerItem key={r.label}>
                <div className="text-center p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-heading text-3xl font-bold text-[#0e319a] mb-1">{r.metric}</div>
                  <div className="text-sm text-slate-600">{r.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CHALLENGE / SOLUTION ===== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <div>
                <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">The Challenge</p>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-5">What the Client Was Dealing With</h2>
                <p className="text-slate-600 leading-relaxed text-base">{cs.challenge}</p>
              </div>
            </FadeIn>
            <FadeIn>
              <div>
                <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Our Approach</p>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-5">How You Need L.E.D. Solved It</h2>
                <p className="text-slate-600 leading-relaxed text-base">{cs.solution}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== SOLUTION DETAILS ===== */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">What We Installed</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">Solution Breakdown</h2>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {cs.solutionDetails.map((detail, i) => (
              <StaggerItem key={i}>
                <div className="bg-white rounded-xl border border-slate-200 p-6 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0e319a]/10 flex items-center justify-center shrink-0">
                      <Wrench className="w-4 h-4 text-[#0e319a]" />
                    </div>
                    <h3 className="font-heading text-base font-semibold text-slate-900">{detail.heading}</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{detail.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      {cs.testimonial && (
        <section className="py-16 bg-[#0e319a]">
          <div className="container">
            <FadeIn className="max-w-3xl mx-auto text-center">
              <div className="text-5xl text-white/30 font-serif mb-4">"</div>
              <blockquote className="text-xl text-white font-medium leading-relaxed mb-6">
                {cs.testimonial.quote}
              </blockquote>
              <div className="text-white/70 text-sm">
                <span className="font-semibold text-white">{cs.testimonial.author}</span>
                {cs.testimonial.role && <span> — {cs.testimonial.role}</span>}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ===== RELATED SERVICES ===== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <FadeIn className="text-center max-w-xl mx-auto mb-10">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Explore Services Used</p>
            <h2 className="font-heading text-2xl font-bold text-slate-900">Services Featured in This Project</h2>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {cs.relatedServices.map((svc) => (
              <StaggerItem key={svc.href}>
                <Link href={svc.href} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-[#0e319a]/30 hover:shadow-sm transition-all group">
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-[#0e319a] transition-colors">{svc.title}</span>
                  <ArrowRight className="w-4 h-4 text-[#f97015] shrink-0" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== MORE CASE STUDIES ===== */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <FadeIn className="text-center mb-10">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">More Projects</p>
            <h2 className="font-heading text-2xl font-bold text-slate-900">Other Case Studies</h2>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {caseStudies.filter((c) => c.slug !== cs.slug).map((other) => (
              <StaggerItem key={other.slug}>
                <Link href={`/case-studies/${other.slug}`} className="block bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="h-36 overflow-hidden">
                    <img src={other.heroImage} alt={other.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="144" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold text-[#f97015] uppercase tracking-wider">{other.industry}</span>
                    <h3 className="font-heading text-sm font-bold text-slate-900 mt-1 mb-2 leading-snug">{other.title}</h3>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#0e319a]">Read Case Study <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Ready to Get Results Like These?</h2>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto">
              You Need L.E.D. is NJ DCA Licensed with 15+ years of experience serving South Jersey businesses. Get a free on-site assessment and custom quote.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg">
                Schedule Free Assessment <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={SITE.phoneTel} className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0e319a] text-white font-semibold rounded-lg hover:bg-[#0c2a82] transition-colors text-sm">
                <Phone className="w-4 h-4" /> {SITE.phone}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
