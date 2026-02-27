import ServicePageLayout from "@/components/ServicePageLayout";
import SEOHead from "@/components/SEOHead";
import { ShieldAlert, Smartphone, Clock, Eye, Radio, Lock } from "lucide-react";

export default function IntrusionDetection() {
  return (
    <>
    <SEOHead
      title="Intrusion Detection & Alarm Systems"
      description="Advanced intrusion detection systems with mobile alerts, 24/7 monitoring, and video verification. Professional installation in South Jersey. Call (609) 335-0123."
      canonical="/services/intrusion-detection"
    />
    <ServicePageLayout
      title="Intrusion Detection Systems"
      subtitle="Protect your business with advanced intrusion detection systems. Mobile alerts, 24/7 monitoring, and professional installation by licensed security experts."
      heroImage="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&q=80"
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
    </ServicePageLayout>
    </>
  );
}
