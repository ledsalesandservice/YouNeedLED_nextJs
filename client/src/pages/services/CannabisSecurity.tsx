import ServicePageLayout from "@/components/ServicePageLayout";
import { SITE, IMAGES, IMAGE_SRCSETS } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import {
  Camera, Shield, Lock, Zap, FileCheck, AlertTriangle,
  CheckCircle2, ArrowRight, Phone, Clock
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export default function CannabisSecurity() {
  return (
    <>
      <SEOHead
        title="Cannabis Security Systems NJ | CRC Compliant | You Need LED"
        description="CRC-compliant cannabis security for NJ cultivators, manufacturers & dispensaries. Cameras, access control, 24/7 monitoring. NJ DCA licensed since 2004. (609) 335-0123."
        canonical="/services/cannabis-security"
      />

      {/* Service Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Cannabis Facility Security System Installation",
        "name": "NJ Cannabis Facility Security Systems",
        "description": "CRC-compliant security system design, installation, and 24/7 monitoring for New Jersey cannabis cultivators, manufacturers, and dispensaries per N.J.A.C. 17:30-9.10.",
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
          "hasCredential": [
            "NJ DCA Burglar Alarm License #34BF00056900",
            "NJ DCA Fire Alarm License #34FA00102800",
            "NJ DCA General License #34BA00129400"
          ]
        },
        "areaServed": [
          "South Jersey", "Atlantic County NJ", "Camden County NJ",
          "Cumberland County NJ", "Gloucester County NJ",
          "Burlington County NJ", "Cape May County NJ"
        ],
        "@id": `${SITE.url}/services/cannabis-security#service`,
      }) }} />

      {/* FAQPage Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Does the CRC have to approve my security cameras before I get licensed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Your video surveillance system must be approved by the New Jersey Cannabis Regulatory Commission prior to license issuance. Your application requires a Safety and Security Plan describing your alarm, surveillance, and access control systems. You Need LED designs to that standard from day one."
            }
          },
          {
            "@type": "Question",
            "name": "How long do I have to keep video footage under NJ cannabis regulations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A minimum 30-day archive, stored securely — retained longer if the footage relates to any pending criminal, civil, or administrative matter. We size your storage with headroom so you're never caught short."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if my alarm system goes down at a cannabis facility?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If a failure will last more than 8 hours, you must notify the CRC and either implement Commission-approved alternative security or close the affected location. Our monitored systems alert us immediately, and backup power keeps you recording through outages."
            }
          },
          {
            "@type": "Question",
            "name": "Can you handle both the security and fire alarm for a cannabis facility?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes — You Need LED holds separate NJ DCA fire alarm (#34FA00102800) and burglar alarm (#34BF00056900) licenses, so your fire alarm, intrusion, video, and access control can be designed, permitted, and inspected by one contractor."
            }
          },
          {
            "@type": "Question",
            "name": "Do you work with local municipality requirements for cannabis security?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Many NJ towns layer local requirements — fencing, lighting, police coordination — on top of state code. We've navigated local permitting across South Jersey and build to both state and municipal standards."
            }
          }
        ]
      }) }} />

      <ServicePageLayout
        title="NJ Cannabis Facility Security Systems"
        pageSlug="/services/cannabis-security"
        subtitle="CRC-compliant video surveillance, access control, monitored intrusion, and backup power — designed and installed by NJ DCA licensed contractors who know what the Commission actually inspects."
        heroImage={IMAGES.heroCameras}
        heroSrcSet={IMAGE_SRCSETS.heroCameras}
        primaryCta={{ label: "Get CRC Compliance Assessment", href: "/contact" }}
        secondaryCta={{ label: "Call (609) 335-0123", href: "tel:6093350123" }}
        features={[
          {
            icon: <Camera className="w-6 h-6" />,
            title: "4K Video Surveillance",
            description: "Commercial-grade IP cameras with date/time-stamped recording, 30+ day NVR storage, and secure remote viewing configured for CRC access."
          },
          {
            icon: <Lock className="w-6 h-6" />,
            title: "Access Control",
            description: "Card and credential systems on every restricted door with full audit trails, instant employee deactivation, and visitor management supporting your 7-year log requirement."
          },
          {
            icon: <Shield className="w-6 h-6" />,
            title: "24/7 Monitored Intrusion",
            description: "UL-listed central station monitoring with immediate police notification, panic buttons at critical points, and documented monthly test/inspection service."
          },
          {
            icon: <Zap className="w-6 h-6" />,
            title: "Battery Backup Power",
            description: "Backup power engineered to your facility's actual load so a storm outage doesn't become a reportable CRC incident."
          },
          {
            icon: <FileCheck className="w-6 h-6" />,
            title: "Compliance Documentation",
            description: "Camera placement diagrams, system specs, and monitoring certificates formatted for your Safety and Security Plan submission."
          },
          {
            icon: <AlertTriangle className="w-6 h-6" />,
            title: "Ongoing Compliance",
            description: "Monthly alarm inspections, maintenance, and monitoring under one roof so your system stays audit-ready for the life of your license."
          },
        ]}
        faqs={[
          {
            q: "Does the CRC really have to approve my cameras before I get licensed?",
            a: "Yes. Your video surveillance system must be approved by the Commission prior to license issuance, and your application requires a Safety and Security Plan describing your alarm, surveillance, and access control systems. We design to that standard from day one."
          },
          {
            q: "How long do I have to keep video footage in NJ?",
            a: "A minimum 30-day archive, stored securely — retained longer if the footage relates to any pending criminal, civil, or administrative matter. We size your storage with headroom so you're never caught short."
          },
          {
            q: "What happens if my alarm system goes down?",
            a: "If a failure will last more than 8 hours, you must notify the CRC and either implement Commission-approved alternative security or close the affected location. Our monitored systems alert us immediately, and backup power keeps you recording through outages."
          },
          {
            q: "Do you handle both the security and fire alarm sides?",
            a: "Yes — we hold separate NJ DCA fire (#34FA00102800) and burglar alarm (#34BF00056900) licenses, so your fire alarm, intrusion, video, and access control can be designed, permitted, and inspected by one contractor."
          },
          {
            q: "Can you work with my municipality's requirements too?",
            a: "Yes. Many NJ towns layer local requirements — fencing, lighting, police coordination — on top of state code. We've navigated local permitting across South Jersey and build to both."
          },
          {
            q: "What areas of South Jersey do you serve for cannabis security?",
            a: "We serve cannabis facilities throughout South Jersey and the Delaware Valley — Atlantic, Cape May, Camden, Burlington, Gloucester, Cumberland, and Ocean counties. Call (609) 335-0123 for a free compliance assessment."
          },
        ]}
        relatedServices={[
          { title: "Security Camera Systems", description: "4K AI-powered cameras with cloud storage and remote viewing.", href: "/services/video-surveillance" },
          { title: "Access Control", description: "RFID, biometric, and mobile credential systems.", href: "/services/access-control" },
          { title: "Fire Alarm Systems", description: "NFPA 72 compliant fire alarm installation and monitoring.", href: "/services/fire-alarm-systems" },
          { title: "Intrusion Detection", description: "24/7 monitored alarm systems with video verification.", href: "/services/intrusion-detection" },
        ]}
      >
        {/* CRC Requirements Section */}
        <section className="py-16 lg:py-20 bg-slate-50">
          <div className="container">
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  What N.J.A.C. 17:30-9.10 Actually Requires
                </h2>
                <p className="text-slate-600 text-lg">
                  Your cannabis license depends on your security system. Miss any one of these requirements and you're risking your license, not just a fine.
                </p>
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                "24/7 video surveillance covering all critical control activities — entrances, sales floors, grow rooms, processing areas, vaults, and loading docks",
                "Remote viewing access for the CRC, with the system approved before license issuance",
                "30-day minimum video archive, stored securely (longer if any investigation is pending)",
                "Monitored security alarm with immediate automatic notification to staff and State or local police on any breach or system failure",
                "Battery/backup power that activates immediately on loss of electricity and notifies police of the outage",
                "Panic buttons and electronic monitoring on interior and exterior premises",
                "Alarm testing and inspection at intervals not exceeding 30 days, with documented repairs",
                "CRC notification within set timeframes if your system will be down more than 8 hours",
                "Access control limiting entry to cannabis areas to authorized personnel only",
                "Compliant exterior lighting sufficient for surveillance without disturbing neighbors",
              ].map((req, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-[#0e319a] mt-0.5 shrink-0" />
                    <p className="text-slate-700 text-sm">{req}</p>
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
                Why NJ Cannabis Operators Choose You Need LED
              </h2>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <FileCheck className="w-8 h-8 text-[#0e319a]" />,
                  title: "Licensed Since 2004",
                  desc: "NJ DCA burglar alarm (#34BF00056900), fire (#34FA00102800), and general (#34BA00129400) licenses — held for over 20 years."
                },
                {
                  icon: <Camera className="w-8 h-8 text-[#0e319a]" />,
                  title: "Real Cannabis Experience",
                  desc: "Full-facility installs for South Jersey cultivation and processing sites: perimeter cameras, PTZ coverage, fiber runs, access control, and backup power."
                },
                {
                  icon: <Phone className="w-8 h-8 text-[#0e319a]" />,
                  title: "Local and Accountable",
                  desc: "Based in Linwood, serving all of South Jersey. We're the staff-contact number your neighbors and local PD can actually reach."
                },
                {
                  icon: <Clock className="w-8 h-8 text-[#0e319a]" />,
                  title: "Ongoing Compliance",
                  desc: "Monitoring, monthly alarm inspections, maintenance, and service under one roof — so your system stays audit-ready for the life of your license."
                },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <div className="text-center p-6">
                    <div className="flex justify-center mb-4">{item.icon}</div>
                    <h3 className="font-heading font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-14 bg-[#0e319a]">
          <div className="container text-center">
            <FadeIn>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
                One Contractor. One CRC-Ready Security Plan. Zero Compliance Surprises.
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Schedule your free CRC compliance assessment today. We'll review your facility layout, walk you through the regulatory requirements, and provide a complete system design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0e319a] font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Schedule Compliance Assessment <ArrowRight className="w-4 h-4" />
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
