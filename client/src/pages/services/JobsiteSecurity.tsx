import ServicePageLayout from "@/components/ServicePageLayout";
import SEOHead from "@/components/SEOHead";
import { Wifi, Battery, Smartphone, Video, Eye, Wrench } from "lucide-react";

export default function JobsiteSecurity() {
  return (
    <>
    <SEOHead
      title="Jobsite & Construction Site Security Cameras"
      description="Solar-powered wireless security cameras for construction sites. No power or internet required. Remote monitoring and theft prevention. Call (609) 335-0123."
      canonical="/services/jobsite-security"
    />
    <ServicePageLayout
      title="Jobsite Security Solutions"
      subtitle="Advanced wireless cameras and alarm systems for construction sites, equipment storage, and temporary locations. No power or internet required at your property."
      heroImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"
      primaryCta={{ label: "Get Quote Today", href: "/contact" }}
      secondaryCta={{ label: "View Rental Options", href: "#rentals" }}
      features={[
        { icon: <Wifi className="w-6 h-6" />, title: "No Wi-Fi/Internet Needed", description: "Internet service included with cellular connectivity." },
        { icon: <Battery className="w-6 h-6" />, title: "No Power Required", description: "Solar powered systems with backup battery." },
        { icon: <Smartphone className="w-6 h-6" />, title: "24/7 Mobile Access", description: "Live streaming and playback via mobile app." },
        { icon: <Video className="w-6 h-6" />, title: "Motion Activated Recording", description: "Intelligent detection with instant alerts." },
        { icon: <Eye className="w-6 h-6" />, title: "HD Video Quality", description: "Crystal clear 1080p recording day and night." },
        { icon: <Wrench className="w-6 h-6" />, title: "Easy Installation", description: "Setup and removal included in service." },
      ]}
      faqs={[
        { q: "Do I need power or internet at my jobsite?", a: "No! Our jobsite security cameras are solar-powered with cellular connectivity. They work completely independently — no power outlets or internet connection needed at your location." },
        { q: "How long are rental terms?", a: "We offer flexible month-to-month rentals with no long-term contracts. Installation and removal are included in the rental price. Most clients rent for the duration of their construction project." },
        { q: "Can I purchase the equipment instead of renting?", a: "Yes, we offer purchase options starting at $2,499 for standalone camera systems and $4,999 for complete security packages with cameras and alarm systems." },
      ]}
      relatedServices={[
        { title: "Video Surveillance", description: "Permanent 4K camera installations.", href: "/services/video-surveillance" },
        { title: "Intrusion Detection", description: "Advanced alarm systems for any property.", href: "/services/intrusion-detection" },
        { title: "Access Control", description: "Keyless entry and credential management.", href: "/services/access-control" },
      ]}
    >
      <section id="rentals" className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Rental Packages</h2>
          <p className="text-center text-slate-600 mb-10">Flexible rental options for projects of any size. Installation and removal included.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Basic Camera", price: "$89/month", desc: "Perfect for small construction sites", features: ["1 Solar-powered camera", "HD recording", "Mobile app access", "Motion alerts", "30-day cloud storage"] },
              { name: "Pro Surveillance", price: "$149/month", popular: true, desc: "Complete jobsite protection", features: ["2 Solar-powered cameras", "Pan/tilt/zoom capability", "Two-way audio", "Smart analytics", "60-day cloud storage", "Live monitoring optional"] },
              { name: "Enterprise Security", price: "$249/month", desc: "Maximum security for large projects", features: ["4+ Solar-powered cameras", "Alarm system integration", "Access control", "Professional monitoring", "90-day cloud storage", "Custom configurations"] },
            ].map((pkg) => (
              <div key={pkg.name} className={`p-6 rounded-xl border ${pkg.popular ? "border-[#0e319a] ring-2 ring-[#0e319a]/20 bg-white" : "border-slate-200 bg-white"}`}>
                {pkg.popular && <span className="inline-block px-3 py-1 bg-[#0e319a] text-white text-xs font-semibold rounded-full mb-3">Most Popular</span>}
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-1">{pkg.name}</h3>
                <p className="text-[#0e319a] text-2xl font-bold mb-1">{pkg.price}</p>
                <p className="text-sm text-slate-500 mb-4">{pkg.desc}</p>
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
