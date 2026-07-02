import ServicePageLayout from "@/components/ServicePageLayout";
import { SITE, IMAGES, IMAGE_SRCSETS } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import {
  Phone, Cloud, Headphones, Monitor, Users, Settings,
  Bot, Wifi, Building2, Utensils, Stethoscope, HardHat,
  CheckCircle2, ArrowRight, DollarSign, Zap
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export default function BusinessPhoneSystems() {
  return (
    <>
      <SEOHead
        title="Business Phone Systems South Jersey | VoIP | You Need LED"
        description="Hosted VoIP phone systems for South Jersey businesses. Local installation, 24/7 support, AI receptionist included. Flat monthly pricing. Call (609) 335-0123."
        canonical="/services/business-phone-systems-south-jersey"
      />

      {/* Service Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Business VoIP Phone System Installation",
        "name": "Business Phone Systems South Jersey",
        "description": "Hosted VoIP business phone systems with local installation, AI receptionist, and 24/7 support for South Jersey businesses.",
        "provider": {
          "@type": "LocalBusiness",
          "name": SITE.name,
          "telephone": SITE.phone,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "199 New Rd Ste 61",
            "addressLocality": "Linwood",
            "addressRegion": "NJ",
            "postalCode": "08221"
          },
          "url": SITE.url,
        },
        "areaServed": [
          "South Jersey", "Atlantic County NJ", "Cape May County NJ",
          "Camden County NJ", "Gloucester County NJ",
          "Burlington County NJ", "Cumberland County NJ"
        ],
        "@id": `${SITE.url}/services/business-phone-systems-south-jersey#service`,
      }) }} />

      {/* FAQPage Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Will VoIP work with my internet connection in South Jersey?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Almost certainly — we assess your bandwidth and network before quoting, and we configure quality-of-service so calls stay crystal clear even when the office is streaming and browsing. If your network needs work, we're the same company that fixes it."
            }
          },
          {
            "@type": "Question",
            "name": "Can I keep my current phone number when switching to VoIP?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We handle the entire port from your current carrier and time the cutover so you never miss a call. The process typically takes 5-10 business days."
            }
          },
          {
            "@type": "Question",
            "name": "What happens to my phone system if my internet goes down?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Calls automatically fail over to mobile apps or any number you choose. Your customers never hear a dead line."
            }
          },
          {
            "@type": "Question",
            "name": "How fast can you install a business phone system in South Jersey?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Typical single-location systems are live within 1–2 weeks of signed quote, including number porting. We handle all configuration, hardware setup, and staff training."
            }
          },
          {
            "@type": "Question",
            "name": "What is LEDConnect AI and how does it work with VoIP?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "LEDConnect AI is a voice AI agent that answers calls 24/7, blocks spam, captures leads, books appointments, and takes orders. It works alongside your hosted VoIP system and can handle overflow calls when your staff is busy. Local South Jersey restaurants are already using it to stop losing calls during the dinner rush."
            }
          },
          {
            "@type": "Question",
            "name": "What areas of South Jersey do you serve for VoIP phone system installation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We serve businesses throughout South Jersey and the Delaware Valley — Atlantic, Cape May, Camden, Burlington, Gloucester, and Cumberland counties. Cities include Atlantic City, Egg Harbor Township, Somers Point, Cherry Hill, Voorhees, Mount Laurel, Vineland, and more. Call (609) 335-0123 for a free on-site assessment."
            }
          }
        ]
      }) }} />

      <ServicePageLayout
        title="Business Phone Systems in South Jersey"
        pageSlug="/services/business-phone-systems-south-jersey"
        subtitle="Most VoIP providers sell you a login and wish you luck. We design your phone system, run the cabling, install the phones, train your team, and answer when you need help — because we're in Linwood, not a call center three time zones away."
        heroImage={IMAGES.heroVoip}
        heroSrcSet={IMAGE_SRCSETS.heroVoip}
        primaryCta={{ label: "Get Free Phone System Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (609) 335-0123", href: "tel:6093350123" }}
        features={[
          {
            icon: <Cloud className="w-6 h-6" />,
            title: "Hosted PBX in the Cloud",
            description: "No phone closet hardware to maintain, automatic updates, works through power outages via mobile failover."
          },
          {
            icon: <Headphones className="w-6 h-6" />,
            title: "Auto-Attendant & Smart Routing",
            description: "Press-by-department menus, ring groups, time-of-day rules, and multi-location routing."
          },
          {
            icon: <Monitor className="w-6 h-6" />,
            title: "Microsoft Teams Integration",
            description: "Make and receive business calls directly inside Teams. Ideal for Microsoft 365 businesses."
          },
          {
            icon: <Phone className="w-6 h-6" />,
            title: "Mobile & Desktop Apps",
            description: "Your business line on your cell. Your team looks professional from anywhere."
          },
          {
            icon: <Bot className="w-6 h-6" />,
            title: "LEDConnect AI Receptionist",
            description: "Answers 24/7, blocks spam, captures leads, books appointments, and takes orders — even during the dinner rush."
          },
          {
            icon: <Settings className="w-6 h-6" />,
            title: "Voicemail, Recording & Analytics",
            description: "See call volume, missed calls, and response times. Voicemail delivered to email."
          },
        ]}
        faqs={[
          {
            q: "Will VoIP work with my internet?",
            a: "Almost certainly — we assess your bandwidth and network before quoting, and we configure quality-of-service so calls stay crystal clear even when the office is streaming and browsing. If your network needs work, we're the same company that fixes it."
          },
          {
            q: "Can I keep my current phone number?",
            a: "Yes. We handle the entire port from your current carrier and time the cutover so you never miss a call. The process typically takes 5-10 business days."
          },
          {
            q: "What happens if my internet goes down?",
            a: "Calls automatically fail over to mobile apps or any number you choose. Your customers never hear a dead line."
          },
          {
            q: "Do I have to buy new phones?",
            a: "Usually we recommend it — modern IP phones are inexpensive and far more capable — but compatible existing IP phones can often be reprovisioned. Analog devices like fax, door phones, and hotel room phones can be integrated with gateways."
          },
          {
            q: "How fast can you install?",
            a: "Typical single-location systems are live within 1–2 weeks of signed quote, including number porting."
          },
          {
            q: "What areas of South Jersey do you serve for VoIP installation?",
            a: "We serve businesses throughout South Jersey and the Delaware Valley — Atlantic, Cape May, Camden, Burlington, Gloucester, and Cumberland counties. Call (609) 335-0123 for a free on-site assessment."
          },
        ]}
        relatedServices={[
          { title: "LEDConnect AI Voice Agent", description: "AI-powered call handling, lead capture, and appointment scheduling.", href: "/services/ai-voice-agent" },
          { title: "Security Camera Systems", description: "4K surveillance with cloud storage and remote viewing.", href: "/services/video-surveillance" },
          { title: "Access Control", description: "Keyless entry and credential management.", href: "/services/access-control" },
          { title: "Digital Signage", description: "Cloud-managed displays for restaurants, retail, and offices.", href: "/services/digital-signage" },
        ]}
      >
        {/* Who We Serve Section */}
        <section className="py-16 lg:py-20 bg-slate-50">
          <div className="container">
            <FadeIn>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
                Who We Serve Across South Jersey
              </h2>
            </FadeIn>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Utensils className="w-7 h-7 text-[#0e319a]" />,
                  title: "Restaurants & Retail",
                  desc: "Order lines that never miss a call, spam blocking, and AI ordering during the dinner rush."
                },
                {
                  icon: <Stethoscope className="w-7 h-7 text-[#0e319a]" />,
                  title: "Medical & Professional Offices",
                  desc: "Auto-attendants, HIPAA-conscious voicemail handling, and call recording."
                },
                {
                  icon: <Building2 className="w-7 h-7 text-[#0e319a]" />,
                  title: "Hotels & Hospitality",
                  desc: "Hybrid systems: modern VoIP for staff, reliable analog room phones, one bill."
                },
                {
                  icon: <Users className="w-7 h-7 text-[#0e319a]" />,
                  title: "Multi-Site Businesses",
                  desc: "One system across every location with press-0-by-site routing."
                },
                {
                  icon: <HardHat className="w-7 h-7 text-[#0e319a]" />,
                  title: "Contractors & Field Teams",
                  desc: "Office line on every crew member's cell. Never miss a lead while you're on a job."
                },
                {
                  icon: <Wifi className="w-7 h-7 text-[#0e319a]" />,
                  title: "Any Business Cutting the Cord",
                  desc: "Most businesses cut their phone bill 30–50% versus legacy carriers while gaining features their old system never had."
                },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <div className="p-6 bg-white rounded-xl border border-slate-200">
                    <div className="mb-3">{item.icon}</div>
                    <h3 className="font-heading font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container">
            <FadeIn>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
                Why South Jersey Businesses Switch to Us
              </h2>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  num: "1",
                  title: "We install, not just provision.",
                  desc: "Cabling, network readiness, phones on desks, staff trained — done by our own licensed technicians."
                },
                {
                  num: "2",
                  title: "One vendor for phones + security.",
                  desc: "We already handle cameras, alarms, access control, and fire for businesses across South Jersey. One call, one accountable local company."
                },
                {
                  num: "3",
                  title: "Support from people who've seen your building.",
                  desc: "When something's off, you reach the team that installed it — same day, not a ticket queue."
                },
                {
                  num: "4",
                  title: "34 years of low-voltage experience.",
                  desc: "Derek Weikel has been installing communications systems since 1992. You Need LED has been in business since 2010, licensed since 2004."
                },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <div className="flex gap-4 p-6 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-[#0e319a] text-white font-bold flex items-center justify-center shrink-0 text-lg">
                      {item.num}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* AI Receptionist Callout */}
        <section className="py-16 lg:py-20 bg-slate-900">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0e319a]/30 rounded-full text-blue-300 text-sm font-medium mb-6">
                  <Bot className="w-4 h-4" /> Exclusive to YouNeedLED Connect
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
                  The Difference Nobody Else in South Jersey Offers: An AI Receptionist
                </h2>
                <p className="text-slate-300 text-lg mb-8">
                  Every YouNeedLED Connect system can include <strong className="text-white">LEDConnect AI</strong> — a voice AI agent that answers 24/7, blocks spam calls, captures leads, books appointments, and takes orders. Local restaurants are already using it to stop losing calls during the dinner rush.
                </p>
                <p className="text-blue-300 text-xl font-semibold mb-8">
                  Your competitors' phone systems ring. Ours answer.
                </p>
                <Link
                  href="/services/ai-voice-agent"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0e319a] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Learn About LEDConnect AI <ArrowRight className="w-4 h-4" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-14 bg-[#0e319a]">
          <div className="container text-center">
            <FadeIn>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
                Free On-Site Phone System Assessment
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                We'll assess your network, review your current phone bill, and show you exactly what you'd save and gain by switching to YouNeedLED Connect. No obligation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0e319a] font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Request Free Assessment <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:6093350123"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4" /> (609) 335-0123
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
}
