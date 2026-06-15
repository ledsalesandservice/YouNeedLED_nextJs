import { Link } from "wouter";
import ServicePageLayout from "@/components/ServicePageLayout";
import { IMAGES, IMAGE_SRCSETS, SITE } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { KeyRound, Smartphone, Users, Lock, Fingerprint, Cloud, ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export default function AccessControl() {
  return (
    <>
      <SEOHead
        title="Access Control Systems South Jersey | Keyless Entry & RFID | You Need L.E.D."
        description="CDVI & Alarm.com access control with RFID, biometric & mobile credentials. NJ DCA Licensed installation in South Jersey. Free quote: (609) 335-0123."
        canonical="/services/access-control"
      />
      {/* Service Schema (FAQPage is handled by ServicePageLayout) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Access Control System Installation",
        description: "Professional access control installation including RFID card readers, biometric scanners, mobile credentials, and cloud-managed door access for commercial properties in South Jersey.",
        provider: { "@type": "LocalBusiness", "@id": `${SITE.url}/#organization`, name: SITE.name, url: SITE.url, telephone: SITE.phone },
        areaServed: [
          { "@type": "State", name: "New Jersey" },
          { "@type": "City", name: "Cherry Hill, NJ" },
          { "@type": "City", name: "Voorhees, NJ" },
          { "@type": "City", name: "Mount Laurel, NJ" },
          { "@type": "City", name: "Egg Harbor Township, NJ" },
          { "@type": "City", name: "Atlantic City, NJ" },
        ],
        serviceType: "Access Control Installation",
        url: `${SITE.url}/services/access-control`,
      }) }} />
      <ServicePageLayout
        title="Access Control Systems"
        subtitle="CDVI & Alarm.com powered keyless entry with RFID, biometric, and mobile credentials. Cloud-managed door access for any commercial facility — installed by NJ DCA Licensed professionals."
        heroImage={IMAGES.heroAccess}
        heroSrcSet={IMAGE_SRCSETS.heroAccess}
        primaryCta={{ label: "Get Access Control Quote", href: "/contact" }}
        secondaryCta={{ label: "Schedule a Demo", href: "/contact" }}
        features={[
          { icon: <KeyRound className="w-6 h-6" />, title: "Keyless Entry", description: "RFID cards, key fobs, and PIN codes for secure, convenient access without traditional keys that can be lost, copied, or stolen." },
          { icon: <Smartphone className="w-6 h-6" />, title: "Mobile Credentials", description: "Use smartphones as access credentials with Bluetooth and NFC. Issue and revoke credentials instantly from the cloud portal." },
          { icon: <Fingerprint className="w-6 h-6" />, title: "Biometric Options", description: "Fingerprint and facial recognition for the highest level of access security — no card to forget, no PIN to share." },
          { icon: <Cloud className="w-6 h-6" />, title: "Cloud Management", description: "Manage access permissions, time-based schedules, and full audit trails from anywhere via web or mobile app." },
          { icon: <Users className="w-6 h-6" />, title: "Multi-Site Support", description: "Centralized management across multiple locations with role-based access control and unified reporting." },
          { icon: <Lock className="w-6 h-6" />, title: "Camera Integration", description: "Pair access events with camera footage automatically — see exactly who badged in and when, from a single platform." },
        ]}
        faqs={[
          { q: "What access control brands do you install?", a: "We are authorized dealers for CDVI and Alarm.com access control systems. Both platforms offer cloud-based management, mobile credentials, and seamless integration with video surveillance." },
          { q: "Can access control integrate with my existing security system?", a: "Yes, our access control systems integrate with video surveillance, intrusion detection, and fire alarm systems for a unified security platform. We can also integrate with existing door hardware in many cases." },
          { q: "How do mobile credentials work?", a: "Mobile credentials turn smartphones into access cards using Bluetooth or NFC. Users simply hold their phone near the reader to unlock doors. Credentials can be issued and revoked remotely through the cloud portal." },
          { q: "Do you support multi-location management?", a: "Absolutely. Our cloud-based platforms allow you to manage access control across unlimited locations from a single dashboard, with role-based permissions and centralized audit trails." },
          { q: "How much does access control installation cost?", a: "Small business systems for 1–4 doors start at $1,999 installed. Professional multi-door systems start at $4,499. Enterprise and multi-site systems are custom quoted. Call us for a free on-site assessment." },
          { q: "Can I see who entered my building and when?", a: "Yes. Every access event is logged with a timestamp, user name, and door location. You can run reports, set up alerts for specific events (like after-hours access), and view the corresponding camera footage — all from one platform." },
          { q: "Are you licensed to install access control systems in New Jersey?", a: "Yes. You Need L.E.D. holds NJ DCA Security License #34BF00056900. We are fully licensed, bonded, and insured for commercial and residential access control installation throughout New Jersey. We pull all required permits and handle NJ compliance documentation." },
          { q: "What areas of South Jersey do you serve?", a: "We serve all of South Jersey and the Delaware Valley from our Linwood, NJ office — including Atlantic City, Egg Harbor Township, Somers Point, Galloway, Cherry Hill, Voorhees, Mount Laurel, Vineland, Cape May County, Camden County, and Burlington County. Commercial projects throughout NJ, PA, and DE are also available." },
          { q: "Do you work on commercial and industrial properties?", a: "Yes — commercial work is the core of our business. We have completed access control projects for cannabis facilities, warehouses, hotels, office buildings, retail stores, and multi-tenant properties throughout South Jersey. We handle design, permitting, installation, and NJ state compliance documentation." },
          { q: "Do you offer monthly service plans?", a: "Yes. In addition to one-time installation (which includes a 1-year parts and labor warranty), we offer monthly managed access control plans that include remote monitoring, cloud platform fees, and priority support. Many clients prefer the subscription model for predictable costs." },
        ]}
        relatedServices={[
          { title: "Video Surveillance", description: "4K AI-powered cameras with cloud storage.", href: "/services/video-surveillance" },
          { title: "Intrusion Detection", description: "Advanced alarm systems with 24/7 monitoring.", href: "/services/intrusion-detection" },
          { title: "Hosted PBX & VoIP", description: "Enterprise cloud phone systems.", href: "/services/voip" },
        ]}
      >
        {/* ===== WHY UPGRADE ===== */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn direction="right">
                <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Why Upgrade from Keys</p>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-5">
                  Traditional Keys Are Your Biggest Security Vulnerability
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Every time an employee leaves your company, a key gets lost, or a contractor finishes a job — you face a security gap. Re-keying a commercial building costs hundreds of dollars and still doesn't tell you who has copies. Traditional keys offer zero audit trail, zero remote control, and zero way to know who entered your building after hours.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Modern access control eliminates all of that. With RFID cards, mobile credentials, or biometric readers, you can revoke access in seconds from your phone. Every entry and exit is logged with a timestamp. You can set time-based schedules so a cleaning crew can only enter Tuesday nights between 6 and 10 PM — and nowhere else.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Our CDVI and Alarm.com systems also integrate directly with your security cameras, so every access event is paired with video footage. If something goes wrong, you know exactly who was there and when.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 bg-[#0e319a] text-white font-semibold rounded-lg hover:bg-[#0c2a85] transition-colors text-sm">
                  Get a Free Access Control Assessment <ArrowRight className="w-4 h-4" />
                </Link>
              </FadeIn>
              <FadeIn direction="left">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { stat: "0 sec", label: "To Revoke Access", sub: "Instantly from any device" },
                    { stat: "100%", label: "Audit Trail", sub: "Every entry logged with timestamp" },
                    { stat: "CDVI", label: "& Alarm.com", sub: "Authorized dealer" },
                    { stat: "15+", label: "Years Experience", sub: "NJ DCA Licensed" },
                  ].map((s) => (
                    <div key={s.label} className="bg-slate-50 rounded-xl p-5 text-center">
                      <div className="font-heading text-2xl font-extrabold text-[#0e319a] mb-1">{s.stat}</div>
                      <div className="text-sm font-semibold text-slate-900 mb-1">{s.label}</div>
                      <div className="text-xs text-slate-500">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ===== PACKAGES ===== */}
        <section className="py-16 lg:py-20 bg-slate-50">
          <div className="container">
            <FadeIn className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Access Control Packages</p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Scalable Solutions for Any Facility Size
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Small Business", price: "Starting at $1,999", features: ["1–4 doors", "RFID card readers", "Cloud management portal", "Mobile app access", "Audit trail reporting", "Professional installation", "1-year labor warranty"] },
                { name: "Professional", price: "Starting at $4,499", popular: true, features: ["5–12 doors", "Mobile + RFID credentials", "Camera integration", "Scheduled access rules", "Multi-user management", "Elevator control option", "2-year labor warranty"] },
                { name: "Enterprise", price: "Custom pricing", features: ["Unlimited doors", "Biometric options", "Multi-site management", "API integrations", "Custom reporting", "Dedicated support", "SLA guarantee"] },
              ].map((pkg) => (
                <div key={pkg.name} className={`p-6 rounded-xl border ${pkg.popular ? "border-[#0e319a] ring-2 ring-[#0e319a]/20 bg-white" : "border-slate-200 bg-white"}`}>
                  {pkg.popular && <span className="inline-block px-3 py-1 bg-[#0e319a] text-white text-xs font-semibold rounded-full mb-3">Most Popular</span>}
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-1">{pkg.name}</h3>
                  <p className="text-[#0e319a] font-semibold mb-4">{pkg.price}</p>
                  <ul className="space-y-2.5 mb-6">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="block text-center px-4 py-2.5 bg-[#0e319a] text-white text-sm font-semibold rounded-lg hover:bg-[#0c2a85] transition-colors">
                    Get a Quote
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== USE CASES ===== */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container">
            <FadeIn className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Common Use Cases</p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Access Control for Every Type of Commercial Property
              </h2>
            </FadeIn>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { name: "Office Buildings", desc: "Control who enters the lobby, server room, executive suites, and parking garage. Set different access levels for staff, visitors, and contractors." },
                { name: "Multi-Tenant Properties", desc: "Manage access for multiple tenants from a single platform. Each tenant controls their own suite while you manage the building perimeter." },
                { name: "Warehouses & Distribution", desc: "Restrict access to high-value inventory areas, loading docks, and equipment rooms. Log every entry for compliance and liability protection." },
                { name: "Medical & Healthcare", desc: "HIPAA-compliant access control for patient areas, medication storage, and staff-only zones. Full audit trails for regulatory compliance." },
                { name: "Schools & Universities", desc: "Secure classroom buildings, labs, and administrative offices. Lockdown capabilities for emergency situations with a single command." },
                { name: "Condo & HOA", desc: "Manage building entry, amenity access, and parking for residents. Issue and revoke credentials without replacing physical keys." },
              ].map((uc) => (
                <StaggerItem key={uc.name}>
                  <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 h-full">
                    <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{uc.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{uc.desc}</p>
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
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">
                Access Control Installation Throughout South Jersey
              </h2>
              <p className="text-slate-600 text-sm">We serve commercial properties across Atlantic, Camden, Burlington, Cape May, and Gloucester counties.</p>
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
                  Access Control in {loc.city}
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
                { label: "Intrusion Detection & Alarms", href: "/services/intrusion-detection" },
                { label: "Fire Alarm Systems", href: "/services/fire-alarm-systems" },
                { label: "Hosted PBX & VoIP", href: "/services/voip" },
                { label: "Jobsite Security", href: "/services/jobsite-security" },
                { label: "Digital Signage", href: "/services/digital-signage" },
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
