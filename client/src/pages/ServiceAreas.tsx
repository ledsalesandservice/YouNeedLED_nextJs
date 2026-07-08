/*
 * Service Areas Page — YouNeedLED
 * Updated with links to individual town and county pages
 * Includes LEDConnect AI Voice Agent CTA per Derek's instructions
 */
import { Link } from "wouter";
import { SITE } from "@/lib/siteData";
import { ALL_LOCATIONS, COUNTY_DATA } from "@/lib/locationData";
import SEOHead from "@/components/SEOHead";
import { Phone, ArrowRight, MapPin, Bot, Zap, Shield } from "lucide-react";

// Group locations by region
const njSouth = ALL_LOCATIONS.filter((l) => l.region === "South Jersey" && !l.name.includes("County"));
const njCentral = ALL_LOCATIONS.filter((l) => l.region === "Central Jersey");
const njShore = ALL_LOCATIONS.filter((l) => l.region === "Jersey Shore");
const paLocs = ALL_LOCATIONS.filter((l) => l.region === "Pennsylvania");
const deLocs = ALL_LOCATIONS.filter((l) => l.region === "Delaware");
const mdLocs = ALL_LOCATIONS.filter((l) => l.region === "Maryland");
const njCountyLocs = ALL_LOCATIONS.filter((l) => l.region === "South Jersey" && l.name.includes("County") || l.region === "Jersey Shore" && l.name.includes("County"));

interface RegionSectionProps {
  title: string;
  locations: typeof ALL_LOCATIONS;
  bg?: string;
}

function RegionSection({ title, locations, bg = "bg-white" }: RegionSectionProps) {
  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200">
      <h3 className="font-heading text-lg font-semibold text-[#0e319a] mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-[#f97015]" /> {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {locations.map((loc) => (
          <Link
            key={loc.slug}
            href={`/locations/${loc.slug}`}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700 hover:border-[#0e319a]/30 hover:text-[#0e319a] hover:bg-blue-50/50 transition-all"
          >
            {loc.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ServiceAreas() {
  return (
    <>
      <SEOHead
        title="Service Areas | Security & VoIP in NJ, PA, DE, MD"
        description="You Need L.E.D. serves South Jersey, Central Jersey, the Jersey Shore, and Philadelphia with full security services. Hosted VoIP phone systems available in Delaware and Maryland."
        canonical="/service-areas"
      />
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-[#0e319a]">
        <div className="container text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-5">Service Areas</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Professional security and technology services throughout New Jersey, Pennsylvania, Delaware, and Maryland. Click any location to learn more.
          </p>
        </div>
      </section>

      {/* NJ Counties */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4 text-center">New Jersey Counties</h2>
          <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">Full-service coverage across all major NJ counties.</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {COUNTY_DATA.map((county) => (
              <Link
                key={county.slug}
                href={`/counties/${county.slug}`}
                className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-[#0e319a] hover:border-[#0e319a]/30 hover:shadow-md transition-all"
              >
                <Shield className="w-4 h-4 text-[#f97015]" />
                {county.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NJ Towns */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-10 text-center">New Jersey Towns</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <RegionSection title="South Jersey" locations={njSouth} />
            <RegionSection title="Central Jersey" locations={njCentral} />
            <RegionSection title="Jersey Shore" locations={njShore} />
          </div>
        </div>
      </section>

      {/* Out of State */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4 text-center">Out of State Services</h2>
          <p className="text-center text-slate-600 mb-10">Hosted VoIP phone systems and business communications available throughout the Delaware Valley. Pennsylvania locations also include full security services.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <RegionSection title="Pennsylvania" locations={paLocs} />
            <RegionSection title="Delaware" locations={deLocs} />
            <RegionSection title="Maryland" locations={mdLocs} />
          </div>
        </div>
      </section>

      {/* LEDConnect AI Voice Agent CTA */}
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
