import ServicePageLayout from "@/components/ServicePageLayout";
import { SITE } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Cable, Zap, Wrench, Shield, Clock, Building2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export default function FiberOptic() {
  return (
    <>
      <SEOHead
        title="Fiber Optic Installation South Jersey | Single-Mode & Multimode | You Need L.E.D."
        description="Professional fiber optic installation, termination & emergency repair in South Jersey. Single-mode & multimode, aerial & underground runs. NJ DCA Licensed. Call (609) 335-0123."
        canonical="/services/fiber-optic"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Fiber Optic Installation & Termination",
            description:
              "Professional fiber optic cable installation, fusion splicing, termination, and emergency repair for commercial buildings, campgrounds, warehouses, and multi-building complexes throughout South Jersey.",
            provider: {
              "@type": "LocalBusiness",
              name: SITE.name,
              url: SITE.url,
              telephone: SITE.phone,
            },
            areaServed: [
              "South Jersey",
              "Atlantic County NJ",
              "Cape May County NJ",
              "Camden County NJ",
              "Delaware Valley",
            ],
            serviceType: "Fiber Optic Installation",
            url: `${SITE.url}/services/fiber-optic`,
          }),
        }}
      />
      <ServicePageLayout
        title="Fiber Optic Installation & Termination"
        pageSlug="/services/fiber-optic"
        subtitle="High-speed fiber optic infrastructure for commercial buildings, campgrounds, warehouses, and multi-building complexes. Single-mode and multimode installation, fusion splicing, and 24/7 emergency repair throughout South Jersey."
        heroImage="/blog-images/blog-commercial-building-800w.webp"
        primaryCta={{ label: "Get a Fiber Quote", href: "/contact" }}
        secondaryCta={{ label: "Emergency Repair", href: "/contact" }}
        features={[
          {
            icon: <Zap className="w-6 h-6" />,
            title: "Fusion Splicing",
            description:
              "Professional fusion splicing for low-loss, high-strength fiber connections on both single-mode and multimode cable.",
          },
          {
            icon: <Cable className="w-6 h-6" />,
            title: "Single-Mode & Multimode",
            description:
              "We stock and install both single-mode and multimode fiber with LC connectors for short and long-distance runs.",
          },
          {
            icon: <Building2 className="w-6 h-6" />,
            title: "Aerial & Underground",
            description:
              "Aerial strand lashing and direct-buried underground conduit installations for building-to-building and campus runs.",
          },
          {
            icon: <Clock className="w-6 h-6" />,
            title: "Emergency Response",
            description:
              "We stock fiber and connectors on the truck for fast emergency repair when your network goes down.",
          },
          {
            icon: <Wrench className="w-6 h-6" />,
            title: "End-to-End Termination",
            description:
              "Field termination and polishing of LC connectors with OTDR testing to verify every run before handoff.",
          },
          {
            icon: <Shield className="w-6 h-6" />,
            title: "NJ DCA Licensed",
            description:
              "All work performed by licensed technicians under NJ DCA License #34BF00056900.",
          },
        ]}
        faqs={[
          {
            q: "Do you handle both single-mode and multimode fiber?",
            a: "Yes — we install, terminate, and splice both single-mode and multimode fiber. We stock LC connectors and carry fiber on the truck so we can respond quickly to emergency calls without waiting on materials.",
          },
          {
            q: "Can you run fiber between multiple buildings?",
            a: "Absolutely. Building-to-building fiber runs are one of our specialties — we handle aerial strand lashing and underground conduit runs for commercial campuses, apartment complexes, campgrounds, warehouses, and industrial sites throughout South Jersey.",
          },
          {
            q: "What is fusion splicing and why does it matter?",
            a: "Fusion splicing permanently joins two fiber ends using an electric arc, creating an extremely low-loss connection that outperforms mechanical splices. We use professional fusion splicing equipment on every project to ensure maximum signal strength and long-term reliability.",
          },
          {
            q: "Do you offer emergency fiber repair?",
            a: "Yes. We stock fiber cable and connectors on our service vehicles so we can respond fast when a cut or damaged fiber takes your network down. Call (609) 335-0123 for emergency service.",
          },
          {
            q: "Do you test fiber after installation?",
            a: "Every run is OTDR tested to verify insertion loss and confirm there are no breaks or bad splices before we hand off the job. You receive documentation of test results.",
          },
          {
            q: "What areas of South Jersey do you serve for fiber optic installation?",
            a: "We serve all of South Jersey and the Delaware Valley from our Linwood, NJ office — including Atlantic City, Egg Harbor Township, Somers Point, Galloway, Cherry Hill, Voorhees, Mount Laurel, Vineland, Cape May County, Camden County, and Burlington County. We also serve commercial clients in Philadelphia and Delaware.",
          },
          {
            q: "Are you licensed to install fiber optic cabling in New Jersey?",
            a: "Yes. You Need L.E.D. is NJ DCA Licensed (#34BF00056900), fully bonded and insured for commercial low-voltage and fiber optic installation throughout New Jersey. We have been serving South Jersey since 2010. Owner Derek Weikel brings 34 years of industry experience.",
          },
          {
            q: "How long does a commercial fiber optic installation take?",
            a: "Most commercial fiber runs are completed in one to two days depending on the scope. Building-to-building runs and conduit work may take two to three days. We provide a detailed timeline during the free on-site assessment. Call (609) 335-0123 to schedule.",
          },
        ]}
        relatedServices={[
          {
            title: "VoIP Phone Systems",
            description: "Cloud PBX and hosted phone systems over your fiber infrastructure.",
            href: "/services/voip",
          },
          {
            title: "Security Camera Systems",
            description: "4K IP cameras that run beautifully over fiber backbone.",
            href: "/services/video-surveillance",
          },
          {
            title: "Access Control",
            description: "Keyless entry and credential management for your facilities.",
            href: "/services/access-control",
          },
        ]}
      >
        {/* ===== APPLICATIONS ===== */}
        <section className="py-16 lg:py-20 bg-slate-50">
          <div className="container">
            <FadeIn className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">
                Where We Work
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Fiber Optic Solutions for Every Application
              </h2>
              <p className="text-slate-600">
                From linking buildings across a campus to pulling fiber through conduit in a warehouse, we've done it all across South Jersey and the Delaware Valley.
              </p>
            </FadeIn>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  name: "Commercial Buildings",
                  desc: "Backbone fiber runs between floors and equipment rooms. Ideal for businesses outgrowing copper infrastructure or upgrading to 10G+ network speeds.",
                },
                {
                  name: "Multi-Building Campuses",
                  desc: "Aerial and underground fiber connecting multiple structures on a single campus — office parks, schools, municipal facilities, and corporate headquarters.",
                },
                {
                  name: "Campgrounds & Resorts",
                  desc: "Long outdoor runs bringing high-speed connectivity to registration buildings, amenity centers, and utility areas across large outdoor properties.",
                },
                {
                  name: "Warehouses & Industrial",
                  desc: "Rugged fiber installations designed for harsh environments — extreme temperatures, forklift traffic, and high-vibration industrial settings.",
                },
                {
                  name: "Apartment & Condo Complexes",
                  desc: "Riser fiber connecting mechanical rooms to each floor and building-to-building runs for gated communities and multi-building residential complexes.",
                },
                {
                  name: "Emergency Repair",
                  desc: "Cut fiber, damaged connectors, or failed splices? We stock cable and LC connectors on the truck and respond fast to get your network back online.",
                },
              ].map((app) => (
                <StaggerItem key={app.name}>
                  <div className="p-5 rounded-xl border border-slate-200 bg-white h-full">
                    <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">
                      {app.name}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{app.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ===== SPECS ===== */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-4">
                  Cable Types We Install
                </h3>
                <ul className="space-y-3">
                  {[
                    "Single-mode OS2 (long-distance runs)",
                    "Multimode OM3 / OM4 (short-distance, high-speed)",
                    "Armored outdoor-rated cable",
                    "Direct-burial gel-filled cable",
                    "Indoor riser & plenum-rated cable",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0e319a] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-4">
                  Our Capabilities
                </h3>
                <ul className="space-y-3">
                  {[
                    "Fusion splicing (low-loss permanent joins)",
                    "LC field termination & polishing",
                    "OTDR testing & documentation",
                    "Aerial strand lashing",
                    "Underground conduit installation",
                    "Emergency repair — materials on truck",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== LOCATION LINKS ===== */}
        <section className="py-14 bg-slate-50">
          <div className="container">
            <FadeIn className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">
                Local Coverage
              </p>
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">
                Fiber Optic Installation Throughout South Jersey
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { city: "Cherry Hill, NJ", href: "/locations/cherry-hill-nj" },
                { city: "Mount Laurel, NJ", href: "/locations/mount-laurel-nj" },
                { city: "Atlantic City, NJ", href: "/locations/atlantic-city-nj" },
                { city: "Vineland, NJ", href: "/locations/vineland-nj" },
                { city: "Toms River, NJ", href: "/locations/toms-river-nj" },
                { city: "Philadelphia, PA", href: "/locations/philadelphia-pa" },
              ].map((loc) => (
                <Link
                  key={loc.city}
                  href={loc.href}
                  className="flex items-center gap-2 p-4 bg-white rounded-lg border border-slate-200 hover:border-[#0e319a]/30 hover:shadow-sm transition-all text-sm font-medium text-slate-700 hover:text-[#0e319a]"
                >
                  <ArrowRight className="w-4 h-4 text-[#f97015] shrink-0" />
                  Fiber Optic Installation in {loc.city}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== INTERNAL LINKS ===== */}
        <section className="py-10 bg-white border-t border-slate-100">
          <div className="container">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Explore Related Services
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "VoIP Phone Systems", href: "/services/voip" },
                { label: "Security Cameras", href: "/services/video-surveillance" },
                { label: "Access Control", href: "/services/access-control" },
                { label: "Digital Signage", href: "/services/digital-signage" },
                { label: "Commercial Security", href: "/services/commercial-security" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-[#0e319a]/30 hover:text-[#0e319a] transition-colors"
                >
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
