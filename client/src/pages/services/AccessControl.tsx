import ServicePageLayout from "@/components/ServicePageLayout";
import { IMAGES } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { KeyRound, Smartphone, Users, Lock, Fingerprint, Cloud } from "lucide-react";

export default function AccessControl() {
  return (
    <>
    <SEOHead
      title="Access Control Systems | Keyless Entry & RFID"
      description="CDVI & Alarm.com powered access control systems with RFID, biometric, and mobile credentials. Professional installation in South Jersey. Call (609) 335-0123."
      canonical="/services/access-control"
    />
    <ServicePageLayout
      title="Access Control Systems"
      subtitle="CDVI & Alarm.com powered keyless entry systems with RFID, biometric, and mobile credentials. Cloud-managed security for any facility."
      heroImage={IMAGES.heroAccess}
      primaryCta={{ label: "Get Access Control Quote", href: "/contact" }}
      secondaryCta={{ label: "Schedule Demo", href: "/contact" }}
      features={[
        { icon: <KeyRound className="w-6 h-6" />, title: "Keyless Entry", description: "RFID cards, key fobs, and PIN codes for secure, convenient access without traditional keys." },
        { icon: <Smartphone className="w-6 h-6" />, title: "Mobile Credentials", description: "Use smartphones as access credentials with Bluetooth and NFC technology." },
        { icon: <Fingerprint className="w-6 h-6" />, title: "Biometric Options", description: "Fingerprint and facial recognition for the highest level of access security." },
        { icon: <Cloud className="w-6 h-6" />, title: "Cloud Management", description: "Manage access permissions, schedules, and audit trails from anywhere via web portal." },
        { icon: <Users className="w-6 h-6" />, title: "Multi-Site Support", description: "Centralized management across multiple locations with role-based access control." },
        { icon: <Lock className="w-6 h-6" />, title: "Integration Ready", description: "Seamless integration with video surveillance, alarm systems, and building automation." },
      ]}
      faqs={[
        { q: "What access control brands do you install?", a: "We are authorized dealers for CDVI and Alarm.com access control systems. Both platforms offer cloud-based management, mobile credentials, and seamless integration with video surveillance." },
        { q: "Can access control integrate with my existing security system?", a: "Yes, our access control systems integrate with video surveillance, intrusion detection, and fire alarm systems for a unified security platform. We can also integrate with existing door hardware in many cases." },
        { q: "How do mobile credentials work?", a: "Mobile credentials turn smartphones into access cards using Bluetooth or NFC. Users simply hold their phone near the reader to unlock doors. Credentials can be issued and revoked remotely through the cloud portal." },
        { q: "Do you support multi-location management?", a: "Absolutely. Our cloud-based platforms allow you to manage access control across unlimited locations from a single dashboard, with role-based permissions and centralized audit trails." },
      ]}
      relatedServices={[
        { title: "Video Surveillance", description: "4K AI-powered cameras with cloud storage.", href: "/services/video-surveillance" },
        { title: "Intrusion Detection", description: "Advanced alarm systems with 24/7 monitoring.", href: "/services/intrusion-detection" },
        { title: "Hosted PBX & VoIP", description: "Enterprise cloud phone systems.", href: "/services/voip" },
      ]}
    >
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">Access Control Solutions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Small Business", price: "Starting at $1,999", features: ["1-4 doors", "RFID card readers", "Cloud management portal", "Mobile app access", "Audit trail reporting", "Professional installation"] },
              { name: "Professional", price: "Starting at $4,499", popular: true, features: ["5-12 doors", "Mobile + RFID credentials", "Video integration", "Scheduled access rules", "Multi-user management", "Elevator control option"] },
              { name: "Enterprise", price: "Custom pricing", features: ["Unlimited doors", "Biometric options", "Multi-site management", "API integrations", "Custom reporting", "Dedicated support", "SLA guarantee"] },
            ].map((pkg) => (
              <div key={pkg.name} className={`p-6 rounded-xl border ${pkg.popular ? "border-[#0e319a] ring-2 ring-[#0e319a]/20 bg-white" : "border-slate-200 bg-white"}`}>
                {pkg.popular && <span className="inline-block px-3 py-1 bg-[#0e319a] text-white text-xs font-semibold rounded-full mb-3">Most Popular</span>}
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-1">{pkg.name}</h3>
                <p className="text-[#0e319a] font-semibold mb-4">{pkg.price}</p>
                <ul className="space-y-2.5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0e319a]" />
                      {f}
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
