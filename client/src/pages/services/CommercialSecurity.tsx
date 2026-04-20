/*
 * Commercial Security Overview — YouNeedLED
 * Landing page for the Commercial Security dropdown
 */
import { useState } from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { SITE, IMAGES, IMAGE_SRCSETS } from "@/lib/siteData";
import { Camera, KeyRound, Flame, ShieldAlert, HardHat, Building2, ArrowRight, Phone, CheckCircle2, ChevronDown } from "lucide-react";

const faqs = [
  { q: "How much does a commercial security system cost in South Jersey?", a: "Commercial security system costs vary based on property size, number of cameras, access control points, and monitoring requirements. A basic business camera system starts around $2,500–$5,000 installed. A full solution with cameras, access control, and alarm monitoring typically runs $5,000–$20,000+ for mid-size commercial properties. You Need L.E.D. provides free on-site assessments and detailed quotes — call (609) 335-0123." },
  { q: "Is You Need L.E.D. licensed to install commercial security systems in New Jersey?", a: "Yes. You Need L.E.D. holds NJ DCA Security License #34BF00056900 and NJ DCA Fire Alarm License #34FA00102800. All installations are performed by licensed technicians in compliance with New Jersey state requirements for commercial security and fire alarm systems." },
  { q: "What types of businesses do you serve?", a: "We serve businesses of all sizes across South Jersey and the Delaware Valley, including retail stores, restaurants, medical offices, law firms, warehouses, apartment complexes, construction sites, schools, and government facilities. Any commercial property that needs security cameras, access control, fire alarms, VoIP, or digital signage is a fit." },
  { q: "Do your security cameras work with my existing system?", a: "In most cases, yes. Our technicians assess your existing infrastructure during the free security assessment. We work with major platforms including Avigilon, Axis, Hikvision, Alarm.com, and others. We can often integrate new 4K cameras or access control readers into your existing NVR or platform, reducing replacement costs." },
  { q: "Do you offer 24/7 monitoring for commercial alarm systems?", a: "Yes. Our intrusion detection systems are connected to a UL-listed central monitoring station that monitors alarms 24 hours a day, 7 days a week, 365 days a year. When an alarm triggers, the monitoring center attempts to verify the event and dispatches the appropriate response — police, fire, or EMS — based on the alarm type." },
  { q: "How long does a commercial security installation take?", a: "Installation timelines depend on project scope. A basic camera system for a small business typically takes one day. A full commercial installation with cameras, access control, and fire alarm integration may take 2–5 days. Our project manager will provide a detailed schedule before work begins so your business operations are minimally disrupted." },
];

const services = [
  { icon: <Camera className="w-7 h-7" />, title: "Video Surveillance", desc: "4K AI-powered security cameras with license plate recognition, analytics, and cloud storage.", href: "/services/video-surveillance" },
  { icon: <KeyRound className="w-7 h-7" />, title: "Access Control", desc: "CDVI & Alarm.com powered keyless entry with RFID, biometric, and mobile credentials.", href: "/services/access-control" },
  { icon: <Flame className="w-7 h-7" />, title: "Fire Alarm Systems", desc: "NFPA 72 compliant fire alarm installation, monitoring, and inspection.", href: "/services/fire-alarm-systems" },
  { icon: <ShieldAlert className="w-7 h-7" />, title: "Intrusion Detection", desc: "Advanced alarm systems with mobile alerts, 24/7 monitoring, and video verification.", href: "/services/intrusion-detection" },
  { icon: <HardHat className="w-7 h-7" />, title: "Jobsite Security", desc: "Solar-powered wireless cameras for construction sites. No power or internet required.", href: "/services/jobsite-security" },
  { icon: <Building2 className="w-7 h-7" />, title: "Apartment Complexes", desc: "Complete security solutions for multi-family properties with tenant access control.", href: "/services/apartment-security" },
];

export default function CommercialSecurity() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEOHead
        title="Commercial Security Systems South Jersey | NJ DCA Licensed | You Need L.E.D."
        description="Complete commercial security in South Jersey: 4K cameras, access control, fire alarms, intrusion detection & jobsite security. NJ DCA Licensed. Call (609) 335-0123."
        canonical="/services/commercial-security"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "LocalBusiness",
            name: SITE.name,
            url: SITE.url,
            telephone: SITE.phone,
            description: "NJ DCA Licensed commercial security company serving South Jersey and the Delaware Valley for 15+ years. Services include 4K security cameras, access control, fire alarm systems, intrusion detection, jobsite security, VoIP, and digital signage.",
            address: { "@type": "PostalAddress", streetAddress: "199 New Rd Ste 61", addressLocality: "Linwood", addressRegion: "NJ", postalCode: "08221", addressCountry: "US" },
            geo: { "@type": "GeoCoordinates", latitude: 39.3398, longitude: -74.5774 },
            areaServed: ["South Jersey", "Delaware Valley", "Cherry Hill NJ", "Voorhees NJ", "Mount Laurel NJ", "Egg Harbor Township NJ", "Atlantic City NJ", "Philadelphia PA"],
            hasCredential: "NJ DCA License #34BF00056900",
            aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "32", bestRating: "5" },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Commercial Security Services",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Video Surveillance", url: `${SITE.url}/services/video-surveillance` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Access Control", url: `${SITE.url}/services/access-control` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fire Alarm Systems", url: `${SITE.url}/services/fire-alarm-systems` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Intrusion Detection", url: `${SITE.url}/services/intrusion-detection` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Jobsite Security", url: `${SITE.url}/services/jobsite-security` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Signage", url: `${SITE.url}/services/digital-signage` } },
              ],
            },
          },
        ],
      }) }} />
      {/* Single FAQPage schema (this page has its own FAQ section, not using ServicePageLayout) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }) }} />

      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-[#0e319a]">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.heroMain} srcSet={IMAGE_SRCSETS.heroMain} sizes="100vw" alt="" className="w-full h-full object-cover max-w-full" loading="eager" fetchPriority="high" width="1920" height="1072" />
        </div>
        <div className="relative container text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-5">
            Commercial Security Solutions
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Comprehensive security systems designed for businesses of all sizes. Licensed, insured, and trusted by 500+ clients across the tri-state area.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg">
              Free Security Assessment <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={SITE.phoneTel} className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm">
              <Phone className="w-4 h-4" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Our Solutions</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              End-to-End Security Services
            </h2>
            <p className="text-slate-600">
              Every solution is custom-designed for your property, professionally installed, and backed by our ongoing support.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <Link key={svc.href} href={svc.href} className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-[#0e319a]/30 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-[#0e319a]/5 group-hover:bg-[#0e319a]/10 flex items-center justify-center text-[#0e319a] mb-4 transition-colors">
                  {svc.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-slate-900 group-hover:text-[#0e319a] transition-colors mb-2">{svc.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{svc.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#0e319a] group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">
            Why Choose You Need L.E.D.?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "NJ DCA Licensed & Insured (34BF00056900)",
              "Fire Alarm Licensed (34FA00102800)",
              "15+ Years in Business",
              "500+ Satisfied Clients",
              "5.0 Star Google Rating",
              "24/7 Emergency Support",
              "Free Security Assessments",
              "Custom System Design",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-sm text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
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
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0e319a] to-[#1a42b8]">
        <div className="container text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
            Protect Your Business Today
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Schedule a free on-site security assessment with our licensed professionals.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg">
            Schedule Free Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
