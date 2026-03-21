import ServicePageLayout from "@/components/ServicePageLayout";
import { SITE, IMAGES, IMAGE_SRCSETS } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { Phone, Headphones, Cloud, Users, Settings, Monitor, Bot, PhoneOff, CalendarCheck, UserCheck, Zap, ArrowRight } from "lucide-react";

export default function VoIP() {
  return (
    <>
    <SEOHead
      title="Hosted PBX & VoIP Phone Systems South Jersey"
      description="Enterprise-grade cloud phone systems with auto-attendant, Microsoft Teams integration, and LEDConnect AI Voice Agents. Professional installation. Call (609) 335-0123."
      canonical="/services/voip"
    />
    <ServicePageLayout
      title="Hosted PBX & VoIP Phone Systems"
      subtitle="Enterprise-grade cloud phone systems with auto-attendant, call routing, Microsoft Teams integration, and now LEDConnect AI Voice Agents for 24/7 call handling."
      heroImage={IMAGES.heroVoip}
      heroSrcSet={IMAGE_SRCSETS.heroVoip}
      primaryCta={{ label: "Get VoIP Quote", href: "/contact" }}
      secondaryCta={{ label: "Book AI Voice Demo", href: "/services/ai-voice-agent" }}
      features={[
        { icon: <Cloud className="w-6 h-6" />, title: "Cloud-Based PBX", description: "No on-premise hardware needed. Fully managed cloud phone system with 99.99% uptime." },
        { icon: <Headphones className="w-6 h-6" />, title: "Auto-Attendant", description: "Professional greeting and call routing. Direct callers to the right department automatically." },
        { icon: <Monitor className="w-6 h-6" />, title: "MS Teams Integration", description: "Seamless integration with Microsoft Teams for unified communications." },
        { icon: <Users className="w-6 h-6" />, title: "Conference Calling", description: "HD audio and video conferencing with screen sharing for remote collaboration." },
        { icon: <Phone className="w-6 h-6" />, title: "Mobile App", description: "Take your business phone anywhere. Make and receive calls from your smartphone." },
        { icon: <Settings className="w-6 h-6" />, title: "Advanced Features", description: "Call recording, voicemail-to-email, call analytics, and CRM integration." },
      ]}
      faqs={[
        { q: "What is a Hosted PBX system?", a: "A Hosted PBX (Private Branch Exchange) is a cloud-based phone system that handles all your business calling needs without on-premise hardware. All call routing, voicemail, and features are managed in the cloud, reducing costs and complexity." },
        { q: "Can I keep my existing phone numbers?", a: "Yes! We handle the number porting process to transfer your existing business phone numbers to the new VoIP system. The process typically takes 5-10 business days and there's no downtime." },
        { q: "What internet speed do I need for VoIP?", a: "Each concurrent call requires approximately 100 Kbps of bandwidth. For a typical office with 10 simultaneous calls, you'd need about 1 Mbps dedicated to voice. We assess your network during installation to ensure quality." },
        { q: "What is the LEDConnect AI Voice Agent?", a: "The LEDConnect AI Voice Agent is an AI-powered virtual receptionist that answers calls 24/7, blocks spam, captures leads, schedules appointments, and handles overflow calls. It works alongside your existing staff and VoIP system." },
      ]}
      relatedServices={[
        { title: "LEDConnect AI Voice Agent", description: "AI-powered call handling, lead capture, and appointment scheduling.", href: "/services/ai-voice-agent" },
        { title: "Security Camera Systems", description: "4K surveillance with cloud storage.", href: "/services/video-surveillance" },
        { title: "Access Control", description: "Keyless entry and credential management.", href: "/services/access-control" },
      ]}
    >
      {/* VoIP Packages */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">VoIP Phone System Packages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Starter", price: "$19.99/user/mo", features: ["Unlimited calling", "Auto-attendant", "Voicemail to email", "Mobile app", "Call forwarding", "Basic analytics"] },
              { name: "Professional", price: "$29.99/user/mo", popular: true, features: ["Everything in Starter", "Call recording", "MS Teams integration", "Video conferencing", "CRM integration", "Advanced analytics", "Priority support"] },
              { name: "Enterprise", price: "Custom pricing", features: ["Everything in Professional", "Dedicated account manager", "Custom integrations", "SLA guarantee", "Multi-site management", "AI Voice Agent included", "White-glove onboarding"] },
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

      {/* LEDConnect AI Voice Agent Featured Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0e319a] to-[#081d5e]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f97015]/20 text-[#f97015] rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                <Zap className="w-3.5 h-3.5" /> Bundled with VoIP
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
                Add LEDConnect AI Voice Agents to Your Phone System
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                Supercharge your VoIP system with an AI receptionist that never sleeps. Handle overflow calls, block spam, capture leads, and book appointments — all automatically.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: <PhoneOff className="w-5 h-5" />, text: "Blocks spam and robocalls before they reach your team" },
                  { icon: <UserCheck className="w-5 h-5" />, text: "Captures lead information and sends to your CRM" },
                  { icon: <CalendarCheck className="w-5 h-5" />, text: "Schedules appointments directly on your calendar" },
                  { icon: <Bot className="w-5 h-5" />, text: "Handles after-hours and overflow calls 24/7" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="text-[#f97015] shrink-0">{item.icon}</div>
                    <span className="text-white/90 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/services/ai-voice-agent"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg shadow-orange-500/25"
              >
                <Bot className="w-4 h-4" /> Book a Free AI Voice Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div>
              <img src={IMAGES.heroAiAgent} srcSet={IMAGE_SRCSETS.heroAiAgent} sizes="(max-width: 768px) 100vw, 50vw" alt="LEDConnect AI Voice Agent" className="rounded-2xl shadow-2xl shadow-black/30 w-full max-w-full h-auto" loading="lazy" width="800" height="600" />
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
    </>
  );
}
