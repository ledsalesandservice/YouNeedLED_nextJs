/*
 * ServicePageLayout — Reusable layout for all service pages
 * "Shield & Signal" design: Hero banner, features grid, content sections, FAQ, related services
 */
import { Link } from "wouter";
import { SITE } from "@/lib/siteData";
import { Phone, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface RelatedService {
  title: string;
  description: string;
  href: string;
}

interface Props {
  title: string;
  subtitle: string;
  heroImage: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  features: Feature[];
  children: React.ReactNode;
  faqs?: FAQ[];
  relatedServices?: RelatedService[];
  schemaType?: string;
}

export default function ServicePageLayout({
  title,
  subtitle,
  heroImage,
  primaryCta,
  secondaryCta,
  features,
  children,
  faqs,
  relatedServices,
  schemaType,
}: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-[#0e319a]">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImage} alt="" className="w-full h-full object-cover max-w-full" loading="eager" fetchPriority="high" width="1920" height="1072" />
        </div>
        <div className="relative container text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-5">{title}</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">{subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg"
            >
              {primaryCta.label} <ArrowRight className="w-4 h-4" />
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 bg-white rounded-xl border border-slate-200">
                <div className="w-12 h-12 rounded-lg bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] mb-4">
                  {f.icon}
                </div>
                <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page-specific content */}
      {children}

      {/* FAQ Section */}
      {faqs && faqs.length > 0 && (
        <section className="py-16 lg:py-20 bg-slate-50">
          <div className="container max-w-3xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-heading text-sm font-semibold text-slate-900 pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
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
          {/* FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: { "@type": "Answer", text: faq.a },
                })),
              }),
            }}
          />
        </section>
      )}

      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="container">
            <h2 className="font-heading text-2xl font-bold text-slate-900 text-center mb-10">Related Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((rs) => (
                <Link key={rs.href} href={rs.href} className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-[#0e319a]/30 hover:shadow-md transition-all">
                  <h3 className="font-heading text-base font-semibold text-slate-900 group-hover:text-[#0e319a] transition-colors mb-2">{rs.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{rs.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#0e319a]">Learn More <ArrowRight className="w-3.5 h-3.5" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0e319a] to-[#1a42b8]">
        <div className="container text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Contact our licensed professionals for a comprehensive assessment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm">
              Request Assessment <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={SITE.phoneTel} className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm">
              <Phone className="w-4 h-4" /> Emergency: {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
