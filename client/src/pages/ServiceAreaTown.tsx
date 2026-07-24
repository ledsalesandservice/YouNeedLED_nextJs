/*
 * ServiceAreaTown — Dynamic hyper-local town page at /service-areas/:slug
 * Backed by serviceAreaData.ts (11 Atlantic County + Downbeach towns).
 * Distinct from /locations/:slug: richer local landmarks, neighborhoods,
 * and town-specific spotlights/FAQs. Self-canonical for SEO.
 */
import { useParams, Link, useLocation } from "wouter";
import { useEffect } from "react";
import { getServiceAreaBySlug, SERVICE_AREA_TOWNS } from "@/lib/serviceAreaData";
import { LOCATION_SERVICES } from "@/lib/locationData";
import { SITE } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import {
  Phone, ArrowRight, MapPin, Bot, Zap, Shield, Camera, KeyRound,
  Flame, Monitor, Cable, MessageSquare, Bell, CheckCircle2, Star,
  Building2, Clock, BadgeCheck, Landmark, Home as HomeIcon
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Bell: <Bell className="w-5 h-5" />,
  Camera: <Camera className="w-5 h-5" />,
  KeyRound: <KeyRound className="w-5 h-5" />,
  Phone: <Phone className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Monitor: <Monitor className="w-5 h-5" />,
  Cable: <Cable className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
};

export default function ServiceAreaTown() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const town = getServiceAreaBySlug(params.slug || "");

  useEffect(() => {
    if (!town) setLocation("/service-areas");
  }, [town, setLocation]);

  if (!town) return null;

  const nearbyTowns = town.nearby
    .map((s) => SERVICE_AREA_TOWNS.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const pageUrl = `${SITE.url}/service-areas/${town.slug}`;

  return (
    <>
      <SEOHead
        title={town.metaTitle}
        description={town.metaDescription}
        canonical={`/service-areas/${town.slug}`}
      />

      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-[#0e319a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e319a] via-[#0e319a]/95 to-[#081d5e]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white/90 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-white/10">
              <MapPin className="w-3.5 h-3.5" /> {town.county} • {town.stateAbbr}
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
              Security Cameras &amp; VoIP in {town.name}, {town.stateAbbr}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              {town.heroTagline}
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
            <span className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-[#0e319a]" /> NJ Licensed &amp; Insured</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#f97015]" /> {town.proximity}</span>
            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#f97015]" /> 5.0 Stars • 34 Years Experience</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#0e319a]" /> 24/7 Monitoring Available</span>
          </div>
        </div>
      </section>

      {/* Intro + Landmarks */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-5">
                Your Local Security &amp; Technology Team in {town.name}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">{town.intro}</p>
              <p className="text-slate-600 leading-relaxed">{town.localContext}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-7 h-fit">
              <div className="flex items-center gap-2 text-[#0e319a] text-sm font-semibold uppercase tracking-wider mb-4">
                <Landmark className="w-4 h-4 text-[#f97015]" /> Around {town.name}
              </div>
              <ul className="space-y-2.5">
                {town.landmarks.map((lm) => (
                  <li key={lm} className="flex items-start gap-2 text-sm text-slate-700">
                    <MapPin className="w-4 h-4 text-[#0e319a] mt-0.5 shrink-0" />
                    {lm}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Services We Install in {town.name}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              One local, licensed team for cameras, access control, alarms, fire, and business phones — installed and serviced across {town.name}.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LOCATION_SERVICES.map((svc) => (
              <Link
                key={svc.title}
                href={svc.href}
                className="group p-5 bg-white rounded-xl border border-slate-200 hover:border-[#0e319a]/30 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] mb-3 group-hover:bg-[#0e319a]/10 transition-colors">
                  {iconMap[svc.icon]}
                </div>
                <h3 className="font-heading text-sm font-semibold text-slate-900 mb-1 group-hover:text-[#0e319a] transition-colors">{svc.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{svc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local Spotlight + Neighborhoods */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center gap-2 text-[#f97015] text-xs font-semibold uppercase tracking-wider mb-4">
                <Building2 className="w-4 h-4" /> Local Project Spotlight
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-3">{town.spotlight.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{town.spotlight.body}</p>
            </div>
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <HomeIcon className="w-6 h-6 text-[#f97015]" /> Neighborhoods We Serve
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                We cover every corner of {town.name} — homes and businesses alike. A few of the sections we work in regularly:
              </p>
              <div className="flex flex-wrap gap-3">
                {town.neighborhoods.map((n) => (
                  <span key={n} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEDConnect AI Voice Agent CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#0e319a] to-[#081d5e]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f97015]/20 text-[#f97015] rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <Zap className="w-3.5 h-3.5" /> Now Available in {town.name}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-5">
              LEDConnect AI Voice Agents for {town.name} Businesses
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-4">
              Stop missing calls and losing leads. Our AI Voice Agent answers every call 24/7, blocks spam, captures leads, and books appointments — so your {town.name} business never misses an opportunity.
            </p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70 mb-8">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#f97015]" /> Blocks spam calls</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#f97015]" /> Handles overflow</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#f97015]" /> After-hours answering</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#f97015]" /> Captures leads 24/7</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#f97015]" /> Schedules appointments</li>
            </ul>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/ai-voice-agent"
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

      {/* Local FAQ */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">
            {town.name} Security Questions, Answered
          </h2>
          <div className="space-y-4">
            {town.faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-heading text-sm font-semibold text-slate-900 pr-4">{faq.q}</span>
                  <span className="text-slate-400 shrink-0 group-open:rotate-180 transition-transform">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Towns */}
      {nearbyTowns.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="container">
            <h2 className="font-heading text-2xl font-bold text-slate-900 text-center mb-4">
              We Also Serve Nearby Towns
            </h2>
            <p className="text-center text-slate-600 mb-8 max-w-xl mx-auto">
              Based in Linwood, we cover {town.name} and the surrounding shore and mainland communities.
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {nearbyTowns.map((t) => (
                <Link
                  key={t.slug}
                  href={`/service-areas/${t.slug}`}
                  className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-[#0e319a]/30 hover:text-[#0e319a] transition-colors"
                >
                  {t.name}, {t.stateAbbr}
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/service-areas" className="inline-flex items-center gap-2 text-sm font-medium text-[#0e319a] hover:text-[#0c2a82] transition-colors">
                View All Service Areas <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Ready to Protect Your {town.name} Property?
          </h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            Contact our licensed local team for a free on-site assessment and custom quote in {town.name}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg">
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={SITE.phoneTel} className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0e319a] text-white font-semibold rounded-lg hover:bg-[#0c2a82] transition-colors text-sm">
              <Phone className="w-4 h-4" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* LocalBusiness Schema with Service Area */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "You Need L.E.D.",
            description: `Professional security cameras, access control, alarms, fire alarm systems, and business VoIP in ${town.name}, ${town.stateAbbr}. NJ DCA Licensed. 34 years of industry experience.`,
            url: pageUrl,
            telephone: SITE.phone,
            email: SITE.email,
            image: `${SITE.url}/logo-192.png`,
            logo: `${SITE.url}/logo-192.png`,
            foundingDate: "2010",
            address: {
              "@type": "PostalAddress",
              streetAddress: SITE.address.street,
              addressLocality: SITE.address.city,
              addressRegion: SITE.address.state,
              postalCode: SITE.address.zip,
              addressCountry: "US",
            },
            geo: { "@type": "GeoCoordinates", latitude: town.geo.lat, longitude: town.geo.lng },
            areaServed: {
              "@type": "City",
              name: `${town.officialName}, ${town.stateAbbr}`,
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

      {/* BreadcrumbList Schema — Home > Service Areas > [Town, State] */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE.url}/service-areas` },
              { "@type": "ListItem", position: 3, name: `${town.name}, ${town.stateAbbr}`, item: pageUrl },
            ],
          }),
        }}
      />

      {/* FAQPage Schema — town-specific Q&A */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: town.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </>
  );
}
