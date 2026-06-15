/*
 * CountyPage — Dynamic NJ county landing page
 * SEO-optimized with unique content per county
 * Includes LEDConnect AI Voice Agent CTA per Derek's instructions
 */
import { useParams, Link } from "wouter";
import { getCountyBySlug, ALL_LOCATIONS } from "@/lib/locationData";
import { SITE } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import {
  Phone, ArrowRight, MapPin, Bot, Zap, Shield, CheckCircle2, Star,
  Building2, Clock, BadgeCheck, Camera, KeyRound, Flame
} from "lucide-react";
import NotFound from "./NotFound";

export default function CountyPage() {
  const params = useParams<{ slug: string }>();
  const county = getCountyBySlug(params.slug || "");

  if (!county) return <NotFound />;

  const pageTitle = `Security & VoIP Services in ${county.name}, ${county.stateAbbr}`;
  const metaDesc = `Professional security cameras, VoIP phone systems, access control, and fire alarm installation serving all of ${county.name}, ${county.state}. Licensed & insured. Call ${SITE.phone}.`;

  // Find location pages that match towns in this county
  const townLinks = county.towns
    .map((town) => {
      const loc = ALL_LOCATIONS.find((l) => l.name === town);
      return loc ? { name: town, slug: loc.slug } : { name: town, slug: null };
    });

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={metaDesc}
        canonical={`/counties/${county.slug}`}
      />

      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-[#0e319a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e319a] via-[#0e319a]/95 to-[#081d5e]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white/90 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-white/10">
              <MapPin className="w-3.5 h-3.5" /> {county.state}
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
              Security & Technology Services in {county.name}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              {county.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg shadow-orange-500/25"
              >
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={SITE.phoneTel}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm"
              >
                <Phone className="w-4 h-4" /> {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-6 bg-slate-50 border-b border-slate-200">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-slate-600">
            <span className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-[#0e319a]" /> NJ Licensed & Insured</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#0e319a]" /> Same-Day Emergency Service</span>
            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#f97015]" /> 15+ Years Experience</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#0e319a]" /> 24/7 Monitoring Available</span>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">
            Our Services in {county.name}
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            Comprehensive security and technology solutions for businesses throughout {county.name}.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Camera className="w-6 h-6" />, title: "Security Cameras & CCTV", desc: "4K AI-powered video surveillance with remote viewing, analytics, and cloud storage options.", href: "/services/video-surveillance" },
              { icon: <Phone className="w-6 h-6" />, title: "VoIP Phone Systems", desc: "Enterprise hosted PBX with Microsoft Teams integration, auto-attendant, and mobile apps.", href: "/services/voip" },
              { icon: <KeyRound className="w-6 h-6" />, title: "Access Control", desc: "Keyless entry, card access, biometric readers, and visitor management systems.", href: "/services/access-control" },
              { icon: <Flame className="w-6 h-6" />, title: "Fire Alarm Systems", desc: "NFPA 72 compliant fire alarm installation, monitoring, and inspection services.", href: "/services/fire-alarm-systems" },
              { icon: <Shield className="w-6 h-6" />, title: "Intrusion Detection", desc: "24/7 monitored alarm systems with instant alerts and emergency dispatch.", href: "/services/intrusion-detection" },
              { icon: <Bot className="w-6 h-6" />, title: "AI Voice Agents", desc: "LEDConnect AI handles calls 24/7 — blocks spam, captures leads, books appointments.", href: "/services/ai-voice-agent" },
            ].map((svc) => (
              <Link key={svc.title} href={svc.href} className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-[#0e319a]/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] mb-4 group-hover:bg-[#0e319a]/10 transition-colors">
                  {svc.icon}
                </div>
                <h3 className="font-heading text-base font-semibold text-slate-900 mb-2 group-hover:text-[#0e319a] transition-colors">{svc.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{svc.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#0e319a]">Learn More <ArrowRight className="w-3.5 h-3.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Towns We Serve */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">
            Towns & Communities in {county.name}
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">
            We provide on-site service to all municipalities throughout {county.name}.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {townLinks.map((town) =>
              town.slug ? (
                <Link
                  key={town.name}
                  href={`/locations/${town.slug}`}
                  className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-[#0e319a] font-medium hover:border-[#0e319a]/30 hover:shadow-md transition-all"
                >
                  {town.name}
                </Link>
              ) : (
                <span key={town.name} className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700">
                  {town.name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-[#f97015] text-xs font-semibold uppercase tracking-wider mb-3">
              <Building2 className="w-4 h-4" /> {county.name} Case Study
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              {county.caseStudy.title}
            </h2>
          </div>
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 space-y-6">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">The Challenge</p>
              <p className="text-slate-700 leading-relaxed">{county.caseStudy.challenge}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Our Solution</p>
              <p className="text-slate-700 leading-relaxed">{county.caseStudy.solution}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">The Results</p>
              <ul className="space-y-2">
                {county.caseStudy.results.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container text-center">
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-8">
            Industries We Serve in {county.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {county.industries.map((ind) => (
              <span key={ind} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0e319a]" /> {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* LEDConnect AI Voice Agent CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#0e319a] to-[#081d5e]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f97015]/20 text-[#f97015] rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <Zap className="w-3.5 h-3.5" /> Available Throughout {county.name}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-5">
              LEDConnect AI Voice Agents for {county.name} Businesses
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Never miss a call again. Our AI Voice Agent handles overflow, after-hours calls, and spam blocking for businesses throughout {county.name}.
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
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Get Started in {county.name}
          </h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            Contact us for a free on-site assessment at your {county.name} business.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0e319a] text-white font-semibold rounded-lg hover:bg-[#0c2a82] transition-colors text-sm">
            Request Free Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* LocalBusiness Schema with AggregateRating and Credentials */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "You Need L.E.D.",
            description: `Professional security and technology services serving all of ${county.name}, ${county.state}. NJ DCA Licensed. 15+ years experience. 5.0 stars on Google.`,
            url: `${SITE.url}/counties/${county.slug}`,
            telephone: SITE.phone,
            email: SITE.email,
            foundingDate: "2010",
            address: {
              "@type": "PostalAddress",
              streetAddress: SITE.address.street,
              addressLocality: SITE.address.city,
              addressRegion: SITE.address.state,
              postalCode: SITE.address.zip,
              addressCountry: "US",
            },
            geo: { "@type": "GeoCoordinates", latitude: 39.3398, longitude: -74.5774 },
            areaServed: {
              "@type": "AdministrativeArea",
              name: `${county.name}, ${county.state}`,
            },
            priceRange: "$$",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: "33",
              bestRating: "5",
            },
            hasCredential: [
              { "@type": "EducationalOccupationalCredential", credentialCategory: "license", name: "NJ DCA Security License", identifier: "34BF00056900" },
              { "@type": "EducationalOccupationalCredential", credentialCategory: "license", name: "NJ DCA Fire Alarm License", identifier: "34FA00102800" },
            ],
            sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.google, SITE.social.youtube],
          }),
        }}
      />

      {/* FAQPage Schema — county-level Q&A for AI Overviews and local search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `Do you install security cameras in ${county.name}, ${county.state}?`,
                acceptedAnswer: { "@type": "Answer", text: `Yes. You Need L.E.D. serves all of ${county.name}, ${county.state} with professional security camera installation. We install 4K AI-powered cameras for homes and businesses throughout the county. Call (609) 335-0123 for a free quote.` },
              },
              {
                "@type": "Question",
                name: `Is You Need L.E.D. licensed to install security systems in ${county.name}?`,
                acceptedAnswer: { "@type": "Answer", text: `Yes. You Need L.E.D. holds NJ DCA Security License #34BF00056900 and NJ DCA Fire Alarm License #34FA00102800, authorizing licensed security and fire alarm installations throughout ${county.name} and all of New Jersey, Pennsylvania, Delaware, and Maryland.` },
              },
              {
                "@type": "Question",
                name: `What towns in ${county.name} do you serve?`,
                acceptedAnswer: { "@type": "Answer", text: `You Need L.E.D. serves all municipalities in ${county.name}, ${county.state}, including ${county.towns.slice(0, 5).join(", ")}${county.towns.length > 5 ? ", and more" : ""}. We are based in Linwood, NJ and provide on-site assessments throughout the county. Call (609) 335-0123 to schedule.` },
              },
              {
                "@type": "Question",
                name: `What security services do you offer in ${county.name}?`,
                acceptedAnswer: { "@type": "Answer", text: `In ${county.name}, You Need L.E.D. offers: 4K security camera installation, access control systems (RFID, biometric, mobile credentials), NFPA 72 fire alarm systems, intrusion detection with 24/7 monitoring, hosted VoIP phone systems, jobsite security cameras, digital signage, and LEDConnect AI Voice Agents. All services backed by our NJ DCA license and 15+ years of experience.` },
              },
            ],
          }),
        }}
      />
    </>
  );
}
