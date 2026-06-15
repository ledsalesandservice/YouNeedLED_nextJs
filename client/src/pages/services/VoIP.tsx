import ServicePageLayout from "@/components/ServicePageLayout";
import { SITE, IMAGES, IMAGE_SRCSETS } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { Phone, Headphones, Cloud, Users, Settings, Monitor, Bot, PhoneOff, CalendarCheck, UserCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export default function VoIP() {
  return (
    <>
    <SEOHead
      title="VoIP Phone Systems South Jersey | Hosted PBX & Microsoft Teams | You Need L.E.D."
      description="Cloud PBX & VoIP with auto-attendant, Microsoft Teams integration & LEDConnect AI Voice Agents. NJ DCA Licensed. Free quote: (609) 335-0123."
      canonical="/services/voip"
    />
    {/* Service Schema (FAQPage is handled by ServicePageLayout) */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hosted PBX & VoIP Phone System Installation",
      description: "Enterprise-grade cloud phone systems with auto-attendant, Microsoft Teams integration, and LEDConnect AI Voice Agents for South Jersey businesses. Professional installation and support.",
      provider: { "@type": "LocalBusiness", name: SITE.name, url: SITE.url, telephone: SITE.phone },
      areaServed: [
        { "@type": "State", name: "New Jersey" },
        { "@type": "City", name: "Cherry Hill, NJ" },
        { "@type": "City", name: "Voorhees, NJ" },
        { "@type": "City", name: "Mount Laurel, NJ" },
        { "@type": "City", name: "Egg Harbor Township, NJ" },
        { "@type": "City", name: "Atlantic City, NJ" },
        { "@type": "City", name: "Somers Point, NJ" },
      ],
      serviceType: "VoIP Phone System Installation",
      url: `${SITE.url}/services/voip`,
      "@id": `${SITE.url}/services/voip#service`,
    }) }} />
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
        { q: "Do you offer Microsoft Teams phone integration?", a: "Yes. Our Hosted PBX systems integrate natively with Microsoft Teams, allowing your team to make and receive business calls directly inside Teams. This is ideal for businesses already using Microsoft 365 who want to eliminate a separate desk phone system." },
        { q: "What areas of South Jersey do you serve for VoIP installation?", a: "We serve businesses throughout South Jersey and the Delaware Valley from our Linwood, NJ office — including Atlantic City, Egg Harbor Township, Somers Point, Cherry Hill, Voorhees, Mount Laurel, Vineland, and all of Atlantic, Cape May, Camden, and Burlington counties." },
        { q: "How long does it take to set up a VoIP phone system?", a: "Most small business VoIP systems are fully operational within 1–2 business days. Number porting from your existing provider takes 5–10 business days. We handle all configuration, hardware setup, and staff training. Call (609) 335-0123 to get started." },
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
      {/* ===== INDUSTRIES ===== */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Industries We Serve</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              VoIP Phone Systems for Every South Jersey Business
            </h2>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Medical & Dental Offices", desc: "HIPAA-compliant call recording, appointment reminder integrations, and after-hours routing to our LEDConnect AI Voice Agent so no patient call goes unanswered." },
              { name: "Law Firms", desc: "Call recording for compliance, client call routing by practice area, and a professional auto-attendant that reflects your firm's brand 24/7." },
              { name: "Real Estate Offices", desc: "Route calls to agents by availability, record client calls, and integrate with CRM systems. Works on mobile so agents never miss a lead." },
              { name: "Retail & Restaurants", desc: "Auto-attendant handles hours, directions, and reservations. Integrate with your POS or reservation system for seamless customer communication." },
              { name: "Property Management", desc: "Manage tenant calls across multiple properties from a single system. Route maintenance requests, leasing inquiries, and emergency calls automatically." },
              { name: "Construction & Trades", desc: "Keep your office and field crews connected on one system. Mobile app means your team has their business line on their personal phone." },
            ].map((ind) => (
              <StaggerItem key={ind.name}>
                <div className="p-5 rounded-xl border border-slate-200 bg-white h-full">
                  <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{ind.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{ind.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== LOCATION LINKS ===== */}
      <section className="py-14 bg-white">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Local Coverage</p>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">VoIP Installation Throughout South Jersey</h2>
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
              <Link key={loc.city} href={loc.href} className="flex items-center gap-2 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-[#0e319a]/30 hover:shadow-sm transition-all text-sm font-medium text-slate-700 hover:text-[#0e319a]">
                <ArrowRight className="w-4 h-4 text-[#f97015] shrink-0" />
                VoIP Systems in {loc.city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INTERNAL LINKS ===== */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="container">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Explore Related Services</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "LEDConnect AI Voice Agent", href: "/services/ai-voice-agent" },
              { label: "Security Cameras", href: "/services/video-surveillance" },
              { label: "Access Control Systems", href: "/services/access-control" },
              { label: "Intrusion Detection", href: "/services/intrusion-detection" },
              { label: "Digital Signage", href: "/services/digital-signage" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-[#0e319a]/30 hover:text-[#0e319a] transition-colors">
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
