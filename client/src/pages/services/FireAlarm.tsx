import ServicePageLayout from "@/components/ServicePageLayout";
import { IMAGES, SITE } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Flame, Clock, AlertTriangle, Radio, Wrench, Settings, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export default function FireAlarm() {
  return (
    <>
    <SEOHead
      title="Fire Alarm Systems South Jersey | NFPA 72 Compliant | You Need L.E.D."
      description="NJ DCA Licensed fire alarm installation, monitoring & inspection in South Jersey. NFPA 72 compliant. License #34FA00102800. Free quote: (609) 335-0123."
      canonical="/services/fire-alarm-systems"
    />
    {/* Service Schema (FAQPage is handled by ServicePageLayout) */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Fire Alarm System Installation",
      description: "NJ DCA Licensed NFPA 72 compliant fire alarm installation, monitoring, and inspection for commercial and residential properties in South Jersey.",
      provider: { "@type": "LocalBusiness", name: SITE.name, url: SITE.url, telephone: SITE.phone },
      areaServed: ["South Jersey", "Atlantic County NJ", "Cape May County NJ", "Camden County NJ"],
      serviceType: "Fire Alarm Installation",
      url: `${SITE.url}/services/fire-alarm-systems`,
    }) }} />
    <ServicePageLayout
      title="Fire Alarm Systems"
      subtitle="Protect lives and property with professionally installed fire alarm systems. Our NFPA 72 compliant solutions include 24/7 monitoring and emergency response coordination."
      heroImage="/blog-images/blog-fire-alarm2-1200w.webp"
      primaryCta={{ label: "Get Fire Safety Quote", href: "/contact" }}
      secondaryCta={{ label: "Schedule Inspection", href: "/contact" }}
      features={[
        { icon: <AlertTriangle className="w-6 h-6" />, title: "Code Compliant Systems", description: "NFPA 72 compliant installations meeting all local fire codes and regulations." },
        { icon: <Clock className="w-6 h-6" />, title: "24/7 Monitoring", description: "Central station monitoring with immediate emergency response coordination." },
        { icon: <Flame className="w-6 h-6" />, title: "Advanced Detection", description: "Smoke, heat, carbon monoxide, and multi-criteria detectors for comprehensive protection." },
        { icon: <Radio className="w-6 h-6" />, title: "Emergency Communication", description: "Voice evacuation systems and emergency communication capabilities." },
        { icon: <Wrench className="w-6 h-6" />, title: "Regular Inspections", description: "Scheduled maintenance and testing to ensure system reliability." },
        { icon: <Settings className="w-6 h-6" />, title: "Custom Programming", description: "Tailored system configuration for your specific building and occupancy requirements." },
      ]}
      faqs={[
        { q: "Are you certified for fire alarm system installation?", a: "Yes, we hold NJ DCA Fire Alarm License #34FA00102800 and our technicians are NFPA 72 certified. We are factory trained on major fire alarm brands and maintain continuing education compliance." },
        { q: "Do you provide fire alarm monitoring services?", a: "Yes, we offer 24/7 central station monitoring with immediate emergency response coordination. Our monitoring center dispatches fire and emergency services when an alarm is triggered." },
        { q: "How often do fire alarm systems need inspection?", a: "Per NFPA 72 and local codes, fire alarm systems require annual inspections at minimum. Some components like smoke detectors may need semi-annual testing. We offer maintenance contracts that ensure your system stays compliant." },
        { q: "Can you integrate fire alarms with other building systems?", a: "Absolutely. We integrate fire alarm systems with access control (for automatic door release), HVAC systems (for smoke control), elevator recall systems, and mass notification systems." },
        { q: "What areas of South Jersey do you serve for fire alarm installation?", a: "We serve all of South Jersey and the Delaware Valley from our Linwood, NJ office — including Atlantic City, Egg Harbor Township, Somers Point, Galloway, Cherry Hill, Voorhees, Mount Laurel, Vineland, Cape May County, Camden County, and Burlington County. We pull all required NJ permits and handle state compliance documentation." },
        { q: "Do you install fire alarms for commercial properties?", a: "Yes — commercial fire alarm installation is a core service. We have completed projects for office buildings, warehouses, retail stores, restaurants, hotels, schools, and multi-tenant properties throughout South Jersey. All systems are NFPA 72 compliant and installed under NJ DCA Fire Alarm License #34FA00102800." },
        { q: "How long has You Need L.E.D. been installing fire alarm systems?", a: "We have been installing and servicing fire alarm systems in South Jersey since 2010 — over 15 years of experience. We are NJ DCA Licensed (#34FA00102800), fully insured, and have completed fire alarm projects for 500+ satisfied clients across Atlantic, Cape May, Camden, and Burlington counties." },
        { q: "Do you offer fire alarm service and maintenance contracts?", a: "Yes. We offer annual inspection contracts, semi-annual testing plans, and priority service agreements. Maintenance contracts ensure your system stays NFPA 72 compliant and your certificate of occupancy remains valid. Call (609) 335-0123 to discuss a service plan." },
      ]}
      relatedServices={[
        { title: "Security Camera Systems", description: "4K AI-powered surveillance with cloud storage.", href: "/services/video-surveillance" },
        { title: "Access Control Systems", description: "Keyless entry and cloud-managed security.", href: "/services/access-control" },
        { title: "Intrusion Detection", description: "Perimeter security and alarm systems.", href: "/services/intrusion-detection" },
      ]}
    >
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-4">Our Certifications</h3>
              <ul className="space-y-3">
                {["NJ DCA License: 34FA00102800", "NFPA 72 certified technicians", "Factory trained on major brands", "Continuing education compliance"].map((c) => (
                  <li key={c} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600" /> {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-4">Code Standards</h3>
              <ul className="space-y-3">
                {["NFPA 72: Fire Alarm Code", "NFPA 101: Life Safety Code", "Local AHJ requirements", "ADA accessibility standards"].map((c) => (
                  <li key={c} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0e319a]" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* ===== INDUSTRIES ===== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Industries We Serve</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Fire Alarm Systems for South Jersey Commercial Properties
            </h2>
            <p className="text-slate-600">We design, install, and service NFPA 72-compliant fire alarm systems for a wide range of commercial occupancies throughout South Jersey and the Delaware Valley.</p>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Office Buildings", desc: "Multi-zone addressable systems with smoke, heat, and CO detection. Integrate with your building's HVAC and access control for automatic lockdown and ventilation control." },
              { name: "Retail & Restaurants", desc: "Kitchen hood suppression system integration, customer-area smoke detection, and emergency notification systems that meet NJ DCA and local fire marshal requirements." },
              { name: "Warehouses & Industrial", desc: "High-bay heat detectors, beam detectors for large open spaces, and early warning systems designed for the unique challenges of industrial occupancies." },
              { name: "Multi-Family & Apartments", desc: "Unit-level and common-area detection with central monitoring. Fully compliant with NJ residential fire code and ADA notification requirements." },
              { name: "Healthcare Facilities", desc: "NFPA 101 Life Safety Code compliant systems for hospitals, clinics, and assisted living facilities. Integration with nurse call and emergency communication systems." },
              { name: "Schools & Daycares", desc: "Code-compliant systems with voice evacuation, strobe notification, and integration with door access control for lockdown capability." },
            ].map((ind) => (
              <StaggerItem key={ind.name}>
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 h-full">
                  <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{ind.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{ind.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== LOCATION LINKS ===== */}
      <section className="py-14 bg-slate-50">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Local Coverage</p>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">Fire Alarm Installation Throughout South Jersey</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { city: "Cherry Hill, NJ", href: "/locations/cherry-hill-nj" },
              { city: "Voorhees, NJ", href: "/locations/voorhees-nj" },
              { city: "Mount Laurel, NJ", href: "/locations/mount-laurel-nj" },
              { city: "Egg Harbor Township, NJ", href: "/locations/egg-harbor-township-nj" },
              { city: "Somers Point, NJ", href: "/locations/somers-point-nj" },
              { city: "Atlantic City, NJ", href: "/locations/atlantic-city-nj" },
            ].map((loc) => (
              <Link key={loc.city} href={loc.href} className="flex items-center gap-2 p-4 bg-white rounded-lg border border-slate-200 hover:border-[#0e319a]/30 hover:shadow-sm transition-all text-sm font-medium text-slate-700 hover:text-[#0e319a]">
                <ArrowRight className="w-4 h-4 text-[#f97015] shrink-0" />
                Fire Alarm Systems in {loc.city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INTERNAL LINKS ===== */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="container">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Explore Related Services</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Intrusion Detection", href: "/services/intrusion-detection" },
              { label: "Security Cameras", href: "/services/video-surveillance" },
              { label: "Access Control Systems", href: "/services/access-control" },
              { label: "Commercial Security", href: "/services/commercial-security" },
              { label: "Apartment Security", href: "/services/apartment-security" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-[#0e319a]/30 hover:text-[#0e319a] transition-colors">
                {link.label} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
    </>
  );
}
