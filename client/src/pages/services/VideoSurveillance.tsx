import ServicePageLayout from "@/components/ServicePageLayout";
import { IMAGES, IMAGE_SRCSETS, SITE } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Camera, Eye, Cloud, Cpu, Wifi, Shield } from "lucide-react";

export default function VideoSurveillance() {
  return (
    <>
    <SEOHead
      title="Security Camera Installation South Jersey | 4K AI Cameras | You Need L.E.D."
      description="NJ DCA Licensed security camera installation in South Jersey. 4K AI cameras with license plate recognition, cloud storage & 24/7 monitoring. Free quote: (609) 335-0123."
      canonical="/services/video-surveillance"
    />
    {/* Service + FAQPage Schema */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "Security Camera Installation",
          description: "Professional 4K AI-powered security camera installation for commercial and residential properties in South Jersey. Includes license plate recognition, cloud storage, and 24/7 monitoring.",
          provider: { "@type": "LocalBusiness", name: SITE.name, url: SITE.url, telephone: SITE.phone },
          areaServed: ["South Jersey", "Cherry Hill NJ", "Voorhees NJ", "Mount Laurel NJ", "Egg Harbor Township NJ", "Atlantic City NJ"],
          serviceType: "Security Camera Installation",
          url: `${SITE.url}/services/video-surveillance`,
        },
        {
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "What type of security cameras do you install in South Jersey?", acceptedAnswer: { "@type": "Answer", text: "We install commercial and residential cameras including dome, bullet, PTZ, and specialty cameras from Hanwha, Axis, and Alarm.com. All cameras support 4K resolution with AI analytics for people, vehicle, and license plate detection." } },
            { "@type": "Question", name: "How much does security camera installation cost?", acceptedAnswer: { "@type": "Answer", text: "Our Essential package starts at $2,499 for a 4-camera 4K system with professional installation. Professional 8-camera systems start at $4,999. Contact us at (609) 335-0123 for a free on-site assessment." } },
            { "@type": "Question", name: "Do your security cameras work without internet?", acceptedAnswer: { "@type": "Answer", text: "Yes. We offer local NVR recording that stores footage on-site without requiring internet. We also offer cellular-connected and solar-powered cameras for remote locations." } },
            { "@type": "Question", name: "How long is security camera footage stored?", acceptedAnswer: { "@type": "Answer", text: "Local NVR storage provides 30–90 day retention. Cloud storage options offer flexible retention. Enterprise clients can customize retention to meet compliance requirements." } },
            { "@type": "Question", name: "Are you licensed to install security cameras in New Jersey?", acceptedAnswer: { "@type": "Answer", text: "Yes. You Need L.E.D. is NJ DCA Licensed (#34BF00056900) with over 15 years of experience installing commercial and residential security camera systems throughout South Jersey and the Delaware Valley." } },
          ],
        },
      ],
    }) }} />
    <ServicePageLayout
      title="Video Surveillance Systems"
      subtitle="Enterprise-grade 4K security cameras with AI-powered analytics, license plate recognition, and cloud storage. Professional installation by licensed experts."
      heroImage={IMAGES.heroCameras}
      heroSrcSet={IMAGE_SRCSETS.heroCameras}
      primaryCta={{ label: "Get a Free Camera Quote", href: "/contact" }}
      secondaryCta={{ label: "View Camera Options", href: "#systems" }}
      features={[
        { icon: <Camera className="w-6 h-6" />, title: "4K Ultra HD", description: "Crystal clear 4K resolution cameras with night vision and wide dynamic range for any lighting condition." },
        { icon: <Cpu className="w-6 h-6" />, title: "AI Analytics", description: "Smart detection for people, vehicles, and license plates. Reduce false alarms with intelligent filtering." },
        { icon: <Cloud className="w-6 h-6" />, title: "Cloud Storage", description: "Secure cloud recording with 30-90 day retention. Access footage from anywhere via mobile app." },
        { icon: <Eye className="w-6 h-6" />, title: "Remote Monitoring", description: "Live view from any device. Get instant alerts for motion, intrusion, or unusual activity." },
        { icon: <Wifi className="w-6 h-6" />, title: "Wireless Options", description: "Solar-powered and cellular cameras for locations without power or internet infrastructure." },
        { icon: <Shield className="w-6 h-6" />, title: "Professional Monitoring", description: "Optional 24/7 professional monitoring with video verification and emergency dispatch." },
      ]}
      faqs={[
        { q: "What type of cameras do you install?", a: "We install a wide range of commercial and residential cameras including dome, bullet, PTZ, and specialty cameras from top manufacturers like Hanwha, Axis, and Alarm.com. All our cameras support 4K resolution with AI analytics." },
        { q: "Can I view my cameras remotely?", a: "Yes. All our camera systems include mobile app access so you can view live and recorded footage from your smartphone, tablet, or computer from anywhere in the world." },
        { q: "How much does installation cost?", a: "Pricing depends on the number of cameras, system complexity, and any infrastructure work required. Our Essential package starts at $2,499 for a 4-camera system. Contact us for a free on-site assessment and quote." },
        { q: "How long is footage stored?", a: "Storage duration depends on your plan. We offer local NVR storage with 30-90 day retention, and cloud storage options with flexible retention periods. Enterprise clients can customize retention to meet compliance requirements." },
        { q: "Do you offer camera system maintenance?", a: "Yes, we provide ongoing maintenance plans that include regular cleaning, firmware updates, system health checks, and priority support. This ensures your system operates at peak performance." },
      ]}
      relatedServices={[
        { title: "Access Control Systems", description: "Keyless entry with RFID, biometric, and mobile credentials.", href: "/services/access-control" },
        { title: "Intrusion Detection", description: "Advanced alarm systems with 24/7 monitoring.", href: "/services/intrusion-detection" },
        { title: "Fire Alarm Systems", description: "NFPA 72 compliant fire detection and monitoring.", href: "/services/fire-alarm-systems" },
      ]}
    >
      {/* Camera Systems Section */}
      <section id="systems" className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">Camera System Packages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Essential", price: "Starting at $2,499", features: ["4 x 4K cameras", "8-channel NVR", "30-day local storage", "Mobile app access", "Motion alerts", "Professional installation"] },
              { name: "Professional", price: "Starting at $4,999", popular: true, features: ["8 x 4K cameras", "16-channel NVR", "60-day storage", "AI analytics", "License plate recognition", "Cloud backup", "Professional installation"] },
              { name: "Enterprise", price: "Custom pricing", features: ["16+ cameras", "Multi-site management", "90-day cloud storage", "Advanced AI analytics", "Video verification", "24/7 monitoring", "Dedicated support"] },
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
