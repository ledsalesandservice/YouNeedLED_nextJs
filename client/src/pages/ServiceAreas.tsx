/*
 * Service Areas Page — YouNeedLED
 * Includes LEDConnect AI Voice Agent CTA per Derek's instructions
 */
import { Link } from "wouter";
import { SITE, SERVICE_AREAS } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Phone, ArrowRight, MapPin, Bot, Zap } from "lucide-react";

export default function ServiceAreas() {
  return (
    <>
      <SEOHead
        title="Service Areas | Security & VoIP in NJ, PA, DE, MD"
        description="You Need L.E.D. serves South Jersey, Central Jersey, the Jersey Shore, Philadelphia, Delaware, and Maryland with security cameras, VoIP, and access control."
        canonical="/service-areas"
      />
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-[#0e319a]">
        <div className="container text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-5">Service Areas</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Professional security and technology services throughout New Jersey, Pennsylvania, Delaware, and Maryland.
          </p>
        </div>
      </section>

      {/* NJ Areas */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-10 text-center">New Jersey</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "South Jersey", areas: SERVICE_AREAS.newJersey.southJersey },
              { title: "Central Jersey", areas: SERVICE_AREAS.newJersey.centralJersey },
              { title: "Jersey Shore", areas: SERVICE_AREAS.newJersey.jerseyShore },
            ].map((region) => (
              <div key={region.title} className="p-6 bg-white rounded-xl border border-slate-200">
                <h3 className="font-heading text-lg font-semibold text-[#0e319a] mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#f97015]" /> {region.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {region.areas.map((town) => (
                    <span key={town} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700">
                      {town}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Out of State */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4 text-center">Out of State Services</h2>
          <p className="text-center text-slate-600 mb-10">VoIP phone systems, CCTV cameras, and access control available throughout the Delaware Valley.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Pennsylvania", areas: SERVICE_AREAS.outOfState.pennsylvania },
              { title: "Delaware", areas: SERVICE_AREAS.outOfState.delaware },
              { title: "Maryland", areas: SERVICE_AREAS.outOfState.maryland },
            ].map((region) => (
              <div key={region.title} className="p-6 bg-white rounded-xl border border-slate-200">
                <h3 className="font-heading text-lg font-semibold text-[#0e319a] mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#f97015]" /> {region.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {region.areas.map((town) => (
                    <span key={town} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700">
                      {town}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEDConnect AI Voice Agent CTA — Featured on Service Area pages per Derek */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#0e319a] to-[#081d5e]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f97015]/20 text-[#f97015] rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <Zap className="w-3.5 h-3.5" /> Available in All Service Areas
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-5">
              LEDConnect AI Voice Agents for Local Businesses
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              No matter where you're located in our service area, our AI Voice Agent can handle your calls 24/7. Stop missing leads, block spam, and book appointments automatically.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/services/ai-voice-agent"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg shadow-orange-500/25"
              >
                <Bot className="w-4 h-4" /> Book a Free Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={SITE.phoneTel}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm"
              >
                <Phone className="w-4 h-4" /> {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">Don't See Your Area?</h2>
          <p className="text-slate-600 mb-6 max-w-lg mx-auto">
            We're constantly expanding our service area. Contact us to discuss your project — we may be able to help.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0e319a] text-white font-semibold rounded-lg hover:bg-[#0c2a82] transition-colors text-sm">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
