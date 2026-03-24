import ServicePageLayout from "@/components/ServicePageLayout";
import SEOHead from "@/components/SEOHead";
import { ShieldAlert, Smartphone, Clock, Eye, Radio, Lock, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/siteData";
import { Link } from "wouter";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export default function IntrusionDetection() {
  return (
    <>
    <SEOHead
      title="Intrusion Detection & Alarm Systems South Jersey | 24/7 Monitoring | You Need L.E.D."
      description="Commercial & residential alarm systems with 24/7 monitoring, video verification & mobile alerts. NJ DCA Licensed in South Jersey. Free quote: (609) 335-0123."
      canonical="/services/intrusion-detection"
    />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Service", name: "Intrusion Detection & Alarm System Installation", description: "Commercial and residential intrusion detection systems with 24/7 central station monitoring, video verification, and mobile alerts. NJ DCA Licensed installation in South Jersey.", provider: { "@type": "LocalBusiness", name: SITE.name, url: SITE.url, telephone: SITE.phone }, areaServed: ["South Jersey", "Cherry Hill NJ", "Voorhees NJ", "Egg Harbor Township NJ"], serviceType: "Intrusion Detection Installation", url: `${SITE.url}/services/intrusion-detection` },
        { "@type": "FAQPage", mainEntity: [
          { "@type": "Question", name: "What is video verification in an alarm system?", acceptedAnswer: { "@type": "Answer", text: "Video verification means that when an alarm triggers, our monitoring center can view live or recorded camera footage to confirm whether the threat is real before dispatching police. This dramatically reduces false alarm fees and gets faster police response." } },
          { "@type": "Question", name: "How fast does 24/7 monitoring respond to an alarm?", acceptedAnswer: { "@type": "Answer", text: "Our central station monitoring responds to alarm signals within seconds. With video verification, operators can confirm a real threat and dispatch emergency services immediately, typically within 60 seconds of alarm activation." } },
          { "@type": "Question", name: "Can I get alerts on my phone when my alarm goes off?", acceptedAnswer: { "@type": "Answer", text: "Yes. Our Alarm.com-powered systems send instant push notifications, text messages, and email alerts to your smartphone when sensors are triggered, so you are always informed in real time." } },
          { "@type": "Question", name: "Do you install alarm systems for businesses in South Jersey?", acceptedAnswer: { "@type": "Answer", text: "Yes. We specialize in commercial intrusion detection for offices, retail stores, warehouses, and multi-tenant buildings throughout South Jersey and the Delaware Valley. We are NJ DCA Licensed (#34BF00056900)." } },
        ] },
      ],
    }) }} />
    <ServicePageLayout
      title="Intrusion Detection Systems"
      subtitle="Protect your business with advanced intrusion detection systems. Mobile alerts, 24/7 monitoring, and professional installation by licensed security experts."
      heroImage="/blog-images/blog-warehouse-1200w.webp"
      primaryCta={{ label: "Free Security Assessment", href: "/contact" }}
      secondaryCta={{ label: "View Packages", href: "#packages" }}
      features={[
        { icon: <ShieldAlert className="w-6 h-6" />, title: "Advanced Security Systems", description: "Multi-layered protection with sensors, cameras, and access control integration." },
        { icon: <Smartphone className="w-6 h-6" />, title: "Mobile Alerts", description: "Instant notifications to your smartphone for any security breaches." },
        { icon: <Clock className="w-6 h-6" />, title: "24/7 Monitoring", description: "Professional monitoring center with immediate emergency response." },
        { icon: <Eye className="w-6 h-6" />, title: "Video Verification", description: "Security cameras verify alarms to reduce false dispatches." },
        { icon: <Radio className="w-6 h-6" />, title: "Smart Sensors", description: "Motion detectors, glass break sensors, and door/window contacts." },
        { icon: <Lock className="w-6 h-6" />, title: "Access Control", description: "Integrated access control with card readers and biometric options." },
      ]}
      faqs={[
        { q: "What's included in a basic intrusion detection system?", a: "Our basic system includes door/window contacts, motion detectors, a control panel with backup battery, mobile app access, and 24/7 professional monitoring. We customize every system to your specific property layout." },
        { q: "How do you reduce false alarms?", a: "We use video verification technology that allows the monitoring center to visually confirm an intrusion before dispatching police. This, combined with pet-immune motion sensors and smart detection algorithms, dramatically reduces false alarms." },
        { q: "Can I integrate intrusion detection with my existing cameras?", a: "Yes, our intrusion detection systems integrate seamlessly with our video surveillance, access control, and fire alarm systems for a unified security platform." },
        { q: "What happens when an alarm is triggered?", a: "When an alarm triggers, our monitoring center is immediately notified. They verify the alarm using video feeds when available, contact you and your emergency contacts, and dispatch police or fire services as needed." },
      ]}
      relatedServices={[
        { title: "Security Camera Systems", description: "4K AI-powered surveillance with cloud storage.", href: "/services/video-surveillance" },
        { title: "Access Control Systems", description: "Keyless entry and cloud-managed security.", href: "/services/access-control" },
        { title: "Fire Alarm Systems", description: "Code-compliant fire detection and monitoring.", href: "/services/fire-alarm-systems" },
      ]}
    >
      <section id="packages" className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">Security Protection Levels</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Basic Protection", price: "Starting at $45/month", features: ["Door/window contacts", "Motion detectors", "Control panel", "Mobile app", "24/7 monitoring"] },
              { name: "Advanced Protection", price: "Starting at $60/month", popular: true, features: ["Everything in Basic", "Glass break detectors", "Video verification", "Environmental sensors", "Access control integration"] },
              { name: "Enterprise Security", price: "Custom pricing", features: ["Everything in Advanced", "Multi-site management", "Custom integrations", "Priority response", "Dedicated support"] },
            ].map((pkg) => (
              <div key={pkg.name} className={`p-6 rounded-xl border ${pkg.popular ? "border-[#0e319a] ring-2 ring-[#0e319a]/20 bg-white" : "border-slate-200 bg-white"}`}>
                {pkg.popular && <span className="inline-block px-3 py-1 bg-[#0e319a] text-white text-xs font-semibold rounded-full mb-3">Most Popular</span>}
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-1">{pkg.name}</h3>
                <p className="text-[#0e319a] font-semibold mb-4">{pkg.price}</p>
                <ul className="space-y-2.5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0e319a]" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ===== INDUSTRIES ===== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Industries We Protect</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Commercial Intrusion Detection for South Jersey Businesses
            </h2>
            <p className="text-slate-600">From single-location retail shops to multi-site commercial properties, we design intrusion detection systems that match your risk profile and budget.</p>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Retail Stores", desc: "After-hours motion detection, glass break sensors, and video verification to confirm break-ins before police dispatch — reducing false alarm fees." },
              { name: "Office Buildings", desc: "Perimeter and interior zone protection with access control integration. Know exactly who entered, when, and where during any incident." },
              { name: "Warehouses & Distribution", desc: "Large-footprint coverage with long-range motion detectors, dock door contacts, and Alarm.com mobile alerts for after-hours intrusions." },
              { name: "Medical & Dental Offices", desc: "Protect controlled substances, patient records, and expensive equipment. HIPAA-aware monitoring with restricted access zones." },
              { name: "Restaurants & Bars", desc: "After-hours protection for cash, equipment, and inventory. Integrate with your POS system and video surveillance for a complete security picture." },
              { name: "Multi-Tenant Properties", desc: "Individual tenant zones with shared building monitoring. Landlords and property managers get a single dashboard for all units." },
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
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">Alarm System Installation Throughout South Jersey</h2>
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
                Alarm Systems in {loc.city}
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
              { label: "Security Cameras", href: "/services/video-surveillance" },
              { label: "Access Control Systems", href: "/services/access-control" },
              { label: "Fire Alarm Systems", href: "/services/fire-alarm-systems" },
              { label: "Jobsite Security", href: "/services/jobsite-security" },
              { label: "Commercial Security", href: "/services/commercial-security" },
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
