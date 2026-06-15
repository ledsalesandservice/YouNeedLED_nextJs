/*
 * Apartment Complexes Security — YouNeedLED
 */
import ServicePageLayout from "@/components/ServicePageLayout";
import SEOHead from "@/components/SEOHead";
import { Building2, Camera, KeyRound, Bell, Wifi, Shield } from "lucide-react";
import { SITE } from "@/lib/siteData";

export default function ApartmentSecurity() {
  return (
    <>
      <SEOHead
        title="Apartment Complex Security Systems South Jersey | NJ DCA Licensed | You Need L.E.D."
        description="Complete security for apartment complexes & multi-family properties in South Jersey. Video surveillance, access control & intercom. NJ DCA Licensed. Call (609) 335-0123."
        canonical="/services/apartment-security"
      />
      {/* Service Schema (FAQPage is handled by ServicePageLayout) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Apartment Complex Security System Installation",
        description: "Complete security solutions for apartment complexes and multi-family properties in South Jersey, including video surveillance, access control, intercom systems, and 24/7 monitoring.",
        provider: { "@type": "LocalBusiness", name: SITE.name, url: SITE.url, telephone: SITE.phone },
        areaServed: ["South Jersey", "Atlantic County NJ", "Camden County NJ", "Burlington County NJ"],
        serviceType: "Apartment Security System Installation",
        url: `${SITE.url}/services/apartment-security`,
      }) }} />
      <ServicePageLayout
        title="Apartment Complex Security"
        pageSlug="/services/apartment-security"
        subtitle="Complete security solutions for multi-family properties including video surveillance, access control, intercom systems, and 24/7 monitoring."
        heroImage="/blog-images/blog-apartment-1200w.webp"
        primaryCta={{ label: "Get Property Assessment", href: "/contact" }}
        secondaryCta={{ label: "View Solutions", href: "#solutions" }}
        features={[
          { icon: <Camera className="w-6 h-6" />, title: "Property-Wide Surveillance", description: "HD cameras covering parking lots, lobbies, hallways, and common areas with cloud recording." },
          { icon: <KeyRound className="w-6 h-6" />, title: "Tenant Access Control", description: "Key fob and mobile credential entry systems for gates, doors, and amenity areas." },
          { icon: <Bell className="w-6 h-6" />, title: "Video Intercom", description: "Visitors can buzz tenants who see and speak to them via smartphone before granting access." },
          { icon: <Wifi className="w-6 h-6" />, title: "Common Area Wi-Fi", description: "Managed Wi-Fi networks for common areas, pools, and fitness centers." },
          { icon: <Building2 className="w-6 h-6" />, title: "Multi-Building Support", description: "Centralized management across multiple buildings from a single dashboard." },
          { icon: <Shield className="w-6 h-6" />, title: "24/7 Monitoring", description: "Professional monitoring with emergency response coordination for the entire property." },
        ]}
        faqs={[
          { q: "Can tenants use their smartphones for building access?", a: "Yes, our access control systems support mobile credentials via Bluetooth and NFC. Tenants can use their smartphones to enter gates, doors, and amenity areas without carrying a separate key fob." },
          { q: "How do you handle tenant turnover?", a: "Our cloud-based access control makes tenant turnover simple. When a tenant moves out, their credentials are deactivated instantly from the management portal. New tenant credentials can be issued remotely in minutes." },
          { q: "Can property managers view cameras remotely?", a: "Absolutely. Our cloud-based video management system allows property managers to view live and recorded footage from any device, anywhere. You can also share specific clips with law enforcement when needed." },
          { q: "Do you install in occupied buildings?", a: "Yes, we regularly install in occupied properties with minimal disruption to tenants. We coordinate with property management to schedule work during appropriate hours and provide advance notice to affected tenants." },
          { q: "Are you licensed to install security systems in New Jersey apartment complexes?", a: "Yes. You Need L.E.D. holds NJ DCA Security License #34BF00056900 and NJ DCA Fire Alarm License #34FA00102800. We are fully licensed, bonded, and insured for commercial and multi-family residential security installations throughout New Jersey." },
          { q: "What areas of South Jersey do you serve for apartment security?", a: "We serve multi-family property owners and managers throughout South Jersey and the Delaware Valley from our Linwood, NJ office — including Atlantic City, Egg Harbor Township, Somers Point, Cherry Hill, Voorhees, Mount Laurel, Vineland, Cape May County, Camden County, and Burlington County." },
          { q: "Do you install fire alarm systems in apartment complexes?", a: "Yes. We install NFPA 72 compliant fire alarm systems in multi-family residential properties. Our fire alarm installations meet all NJ code requirements for apartment buildings, including addressable panels, smoke detectors, pull stations, and 24/7 central station monitoring." },
        ]}
        relatedServices={[
          { title: "Video Surveillance", description: "4K AI-powered camera systems.", href: "/services/video-surveillance" },
          { title: "Access Control", description: "Keyless entry and credential management.", href: "/services/access-control" },
          { title: "Intrusion Detection", description: "Advanced alarm and monitoring systems.", href: "/services/intrusion-detection" },
        ]}
      >
        <section id="solutions" className="py-16 lg:py-20 bg-slate-50">
          <div className="container">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Property Security Packages</h2>
            <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">Scalable solutions for properties of any size, from small apartment buildings to large multi-family communities.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Small Property", desc: "Up to 20 units", features: ["4-8 HD cameras", "Entry access control", "Video intercom", "Cloud management", "Mobile app for tenants"] },
                { name: "Mid-Size Property", desc: "20-100 units", popular: true, features: ["8-24 HD cameras", "Multi-entry access control", "Video intercom system", "Elevator integration", "Parking gate control", "Property manager dashboard"] },
                { name: "Large Community", desc: "100+ units", features: ["24+ HD cameras", "Enterprise access control", "Multi-building management", "License plate recognition", "Amenity area monitoring", "Custom integrations", "Dedicated support"] },
              ].map((pkg) => (
                <div key={pkg.name} className={`p-6 rounded-xl border ${pkg.popular ? "border-[#0e319a] ring-2 ring-[#0e319a]/20 bg-white" : "border-slate-200 bg-white"}`}>
                  {pkg.popular && <span className="inline-block px-3 py-1 bg-[#0e319a] text-white text-xs font-semibold rounded-full mb-3">Most Popular</span>}
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-1">{pkg.name}</h3>
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
