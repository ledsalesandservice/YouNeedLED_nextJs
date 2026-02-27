import ServicePageLayout from "@/components/ServicePageLayout";
import { IMAGES } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Flame, Clock, AlertTriangle, Radio, Wrench, Settings } from "lucide-react";

export default function FireAlarm() {
  return (
    <>
    <SEOHead
      title="Fire Alarm Systems | NFPA 72 Compliant Installation"
      description="NJ DCA licensed fire alarm installation, monitoring, and inspection. NFPA 72 compliant systems with 24/7 monitoring. License #34FA00102800. Call (609) 335-0123."
      canonical="/services/fire-alarm-systems"
    />
    <ServicePageLayout
      title="Fire Alarm Systems"
      subtitle="Protect lives and property with professionally installed fire alarm systems. Our NFPA 72 compliant solutions include 24/7 monitoring and emergency response coordination."
      heroImage="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80"
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
    </ServicePageLayout>
    </>
  );
}
