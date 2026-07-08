/*
 * LocationPage — Dynamic town/county landing page
 * SEO-optimized with unique content per location
 * Includes LEDConnect AI Voice Agent CTA per Derek's instructions
 */
import { useParams, Link, useLocation } from "wouter";
import { useEffect } from "react";
import { getLocationBySlug, LOCATION_SERVICES } from "@/lib/locationData";
import { SITE } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import {
  Phone, ArrowRight, MapPin, Bot, Zap, Shield, Camera, KeyRound,
  Flame, Monitor, Cable, MessageSquare, Bell, CheckCircle2, Star,
  Building2, Clock, BadgeCheck
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

export default function LocationPage() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const location = getLocationBySlug(params.slug || "");

  useEffect(() => {
    if (!location) setLocation("/service-areas");
  }, [location, setLocation]);

  if (!location) return null;

  const isCounty = location.name.includes("County");
  const isRegion = location.stateAbbr === "US";
  const isLimited = !location.fullService;
  const pageTitle = isRegion
    ? `VoIP & Technology Services in the ${location.name}`
    : isLimited
      ? `Hosted VoIP & Business Phone Systems in ${location.name}, ${location.stateAbbr}`
      : `Security Camera Installation & VoIP in ${location.name}, ${location.stateAbbr}`;
  const metaDesc = isLimited
    ? `Hosted VoIP phone systems and business communications in ${location.name}, ${location.stateAbbr}. Cloud PBX, Microsoft Teams integration, and more. Call ${SITE.phone} for a free quote.`
    : `Professional security cameras, VoIP phone systems, access control, and fire alarm installation in ${location.name}, ${location.stateAbbr}. Licensed & insured. Call ${SITE.phone} for a free quote.`;

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={metaDesc}
        canonical={`/locations/${location.slug}`}
      />

      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-[#0e319a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e319a] via-[#0e319a]/95 to-[#081d5e]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white/90 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-white/10">
              <MapPin className="w-3.5 h-3.5" /> {location.region} {!isRegion && `• ${location.state}`}
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
              {isCounty
                ? `Security & Technology Services in ${location.name}`
                : isRegion
                  ? `VoIP & Technology Services in the ${location.name}`
                  : isLimited
                    ? `Hosted VoIP & Business Phone Systems in ${location.name}, ${location.stateAbbr}`
                    : `Security Camera Installation in ${location.name}, ${location.stateAbbr}`}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              {location.description}
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
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#0e319a]" /> {location.responseTime}</span>
            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#f97015]" /> 34 Years Experience</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#0e319a]" /> 24/7 Monitoring Available</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Services Available in {location.name}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {location.fullService
                ? `Full-service security and technology solutions with local technicians serving ${location.name} and surrounding areas.`
                : `Hosted VoIP phone systems and business communications available in ${location.name} through our regional service team.`}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(isLimited
              ? LOCATION_SERVICES.filter(svc => !["Alarm Systems", "CCTV / Video Surveillance", "Access Control & Card Access", "Fire Alarm Systems"].includes(svc.title))
              : LOCATION_SERVICES
            ).map((svc) => (
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

      {/* Industries Served */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Industries We Serve in {location.name}
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our team has extensive experience working with {location.name}'s diverse business community. From {location.industries[0].toLowerCase()} to {location.industries[location.industries.length - 1].toLowerCase()}, we understand the unique security and communication challenges each industry faces.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {location.industries.map((ind) => (
                  <div key={ind} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#0e319a] shrink-0" />
                    {ind}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center gap-2 text-[#f97015] text-xs font-semibold uppercase tracking-wider mb-4">
                <Building2 className="w-4 h-4" /> Case Study
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-3">{location.caseStudy.title}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Challenge</p>
                  <p className="text-sm text-slate-600">{location.caseStudy.challenge}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Solution</p>
                  <p className="text-sm text-slate-600">{location.caseStudy.solution}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Results</p>
                  <ul className="space-y-1.5">
                    {location.caseStudy.results.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEDConnect AI Voice Agent CTA — Featured on location pages per Derek */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#0e319a] to-[#081d5e]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f97015]/20 text-[#f97015] rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <Zap className="w-3.5 h-3.5" /> Now Available in {location.name}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-5">
              LEDConnect AI Voice Agents for {location.name} Businesses
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-4">
              Stop missing calls and losing leads. Our AI Voice Agent answers every call 24/7, blocks spam, captures leads, and books appointments — so your {location.name} business never misses an opportunity.
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

      {/* Nearby Areas */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <h2 className="font-heading text-2xl font-bold text-slate-900 text-center mb-4">
            Also Serving Nearby Areas
          </h2>
          <p className="text-center text-slate-600 mb-8 max-w-xl mx-auto">
            Our {location.serviceRadius} coverage from {location.name} means we also serve these nearby communities.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {location.nearbyAreas.map((area) => (
              <span key={area} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-[#0e319a]/30 transition-colors">
                {area}
              </span>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/service-areas" className="inline-flex items-center gap-2 text-sm font-medium text-[#0e319a] hover:text-[#0c2a82] transition-colors">
              View All Service Areas <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Ready to Secure Your {location.name} Business?
          </h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            Contact our licensed professionals for a free on-site assessment and custom quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg">
              Schedule Free Assessment <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={SITE.phoneTel} className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0e319a] text-white font-semibold rounded-lg hover:bg-[#0c2a82] transition-colors text-sm">
              <Phone className="w-4 h-4" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* LocalBusiness Schema with Service Area, AggregateRating, and Credentials */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "You Need L.E.D.",
            description: `Professional security and technology services in ${location.name}${!isRegion ? `, ${location.state}` : ""}. NJ DCA Licensed. 34 years of industry experience. 5.0 stars on Google.`,
            url: `${SITE.url}/locations/${location.slug}`,
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
            geo: { "@type": "GeoCoordinates", latitude: 39.3398, longitude: -74.5774 },
            areaServed: {
              "@type": isCounty ? "AdministrativeArea" : "City",
              name: `${location.name}${!isRegion ? `, ${location.state}` : ""}`,
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

      {/* BreadcrumbList Schema — Home > Service Areas > [Location, State] */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE.url}/service-areas` },
              { "@type": "ListItem", position: 3, name: isRegion ? location.name : `${location.name}, ${location.stateAbbr}`, item: `${SITE.url}/locations/${location.slug}` },
            ],
          }),
        }}
      />

      {/* FAQPage Schema — location-specific Q&A for AI Overviews and local search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `Do you install security cameras in ${location.name}${!isRegion ? `, ${location.state}` : ""}?`,
                acceptedAnswer: { "@type": "Answer", text: `Yes. You Need L.E.D. provides professional security camera installation in ${location.name}${!isRegion ? `, ${location.state}` : ""}. We install 4K AI-powered cameras for homes and businesses throughout the area. Call (609) 335-0123 for a free quote.` },
              },
              {
                "@type": "Question",
                name: `Is You Need L.E.D. licensed to work in ${location.name}?`,
                acceptedAnswer: { "@type": "Answer", text: `Yes. You Need L.E.D. holds NJ DCA Security License #34BF00056900 and NJ DCA Fire Alarm License #34FA00102800, authorizing us to perform licensed security and fire alarm installations throughout New Jersey, Pennsylvania, Delaware, and Maryland — including ${location.name}.` },
              },
              {
                "@type": "Question",
                name: `How quickly can you respond to ${location.name}${!isRegion ? `, ${location.state}` : ""}?`,
                acceptedAnswer: { "@type": "Answer", text: `You Need L.E.D. is based in Linwood, NJ and serves ${location.name} as part of our regular service area. We typically schedule on-site assessments within 1–3 business days. For emergency service calls, we aim to respond same-day or next-day. Call (609) 335-0123 to schedule.` },
              },
              {
                "@type": "Question",
                name: `What security services do you offer in ${location.name}?`,
                acceptedAnswer: { "@type": "Answer", text: `In ${location.name}, You Need L.E.D. offers: 4K security camera installation, access control systems (RFID, biometric, mobile credentials), NFPA 72 fire alarm systems, intrusion detection with 24/7 monitoring, hosted VoIP phone systems, jobsite security cameras, digital signage, and LEDConnect AI Voice Agents. All services are backed by our NJ DCA license and 34 years of industry experience.` },
              },
            ],
          }),
        }}
      />
    </>
  );
}
