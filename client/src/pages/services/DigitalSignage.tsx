/*
 * Digital Signage — YouNeedLED Service Page
 * Cloud-managed digital signage powered by NoviSign, installed by You Need L.E.D.
 * Rewritten July 2026 — added: hardware OS list, 50+ widget library, kiosk/touchscreen,
 * queue management, wayfinding, SOC-2 cert, multi-user admin, proof-of-play analytics,
 * AI signage, free trial CTA, free templates, additional verticals, specific integrations.
 */
import ServicePageLayout from "@/components/ServicePageLayout";
import { IMAGES, SITE } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import {
  Monitor,
  Utensils,
  Building2,
  GraduationCap,
  Hotel,
  Users,
  ShoppingBag,
  Dumbbell,
  Landmark,
  CalendarDays,
  Wifi,
  BarChart3,
  Layers,
  TouchpadIcon,
  MapPin,
  ShieldCheck,
  Sparkles,
  Clock,
  Church,
  LayoutGrid,
} from "lucide-react";

// ─── Use Cases ────────────────────────────────────────────────────────────────
const USE_CASES = [
  {
    icon: <Utensils className="w-5 h-5" />,
    title: "Digital Menu Boards",
    description:
      "Restaurants, cafes, and bars can ditch static paper menus and go fully dynamic. Update pricing, promote daily specials, and schedule dayparting transitions — all from the cloud, instantly.",
    image: "/digital-signage/menu-boards.webp",
    srcSet: "/digital-signage/menu-boards-224w.webp 224w, /digital-signage/menu-boards-448w.webp 448w, /digital-signage/menu-boards-672w.webp 672w",
    alt: "Digital menu board display in a restaurant",
  },
  {
    icon: <Building2 className="w-5 h-5" />,
    title: "Corporate & Internal Communications",
    description:
      "Keep your team informed whether they're on the floor, in the breakroom, or walking through the lobby. Broadcast real-time company updates, HR announcements, KPIs, and meeting schedules.",
    image: "/digital-signage/corporate.webp",
    srcSet: "/digital-signage/corporate-224w.webp 224w, /digital-signage/corporate-448w.webp 448w, /digital-signage/corporate-672w.webp 672w",
    alt: "Corporate lobby digital signage display",
  },
  {
    icon: <ShoppingBag className="w-5 h-5" />,
    title: "Retail Environments",
    description:
      "Drive sales and strengthen your brand on the sales floor. Promote new products, upcoming sales, and special offers. Manage messaging across one store or multiple Tri-State locations from a single dashboard.",
    image: "/digital-signage/retail.webp",
    srcSet: "/digital-signage/retail-224w.webp 224w, /digital-signage/retail-448w.webp 448w, /digital-signage/retail-672w.webp 672w",
    alt: "Retail store digital signage display wall",
  },
  {
    icon: <Hotel className="w-5 h-5" />,
    title: "Hospitality & Hotels",
    description:
      "Elevate the guest experience from the moment they walk in. Display daily activity schedules, promote on-site dining, welcome VIP guests, and feature local sponsored content — all on one managed platform.",
    image: "/digital-signage/hospitality.webp",
    srcSet: "/digital-signage/hospitality-224w.webp 224w, /digital-signage/hospitality-448w.webp 448w, /digital-signage/hospitality-672w.webp 672w",
    alt: "Hotel lobby digital signage kiosk",
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: "Education & Campuses",
    description:
      "From K-12 schools to universities, our displays transform hallways, lobbies, and cafeterias into communication hubs. Share event schedules, emergency notifications, and campus news with centralized control.",
    image: "/digital-signage/education.webp",
    srcSet: "/digital-signage/education-224w.webp 224w, /digital-signage/education-448w.webp 448w, /digital-signage/education-672w.webp 672w",
    alt: "School campus hallway digital signage display",
  },
  {
    icon: <CalendarDays className="w-5 h-5" />,
    title: "Conference & Training Centers",
    description:
      "Replace inefficient paper notices with cloud-managed displays showing hourly schedules, room assignments, and directional information. Keep events running smoothly and attendees well-informed.",
    image: "/digital-signage/conference.webp",
    srcSet: "/digital-signage/conference-224w.webp 224w, /digital-signage/conference-448w.webp 448w, /digital-signage/conference-672w.webp 672w",
    alt: "Conference center room schedule digital signage",
  },
  {
    icon: <Dumbbell className="w-5 h-5" />,
    title: "Sports Facilities & Gyms",
    description:
      "Keep the energy high with real-time class schedules, promotional offers, member announcements, and safety alerts. Engage members with dynamic, high-impact visuals on every screen.",
    image: "/digital-signage/sports-gym.webp",
    srcSet: "/digital-signage/sports-gym-224w.webp 224w, /digital-signage/sports-gym-448w.webp 448w, /digital-signage/sports-gym-672w.webp 672w",
    alt: "Gym fitness center digital signage display",
  },
  {
    icon: <Landmark className="w-5 h-5" />,
    title: "Banks & Financial Services",
    description:
      "Streamline lobby communication with real-time rate displays, product promotions, and live queue updates. Reduce perceived wait times and highlight key services exactly when customers are paying attention.",
    image: "/digital-signage/banking.webp",
    srcSet: "/digital-signage/banking-224w.webp 224w, /digital-signage/banking-448w.webp 448w, /digital-signage/banking-672w.webp 672w",
    alt: "Bank lobby digital signage showing mortgage rates",
  },
  {
    icon: <Church className="w-5 h-5" />,
    title: "Houses of Worship & Community Centers",
    description:
      "Replace paper bulletins and announcement boards with always-current digital displays. Share event schedules, service times, community news, and volunteer opportunities — updated in minutes from any device.",
    image: "/digital-signage/corporate.webp",
    srcSet: "/digital-signage/corporate-224w.webp 224w, /digital-signage/corporate-448w.webp 448w, /digital-signage/corporate-672w.webp 672w",
    alt: "Church or community center digital signage bulletin board",
  },
  {
    icon: <LayoutGrid className="w-5 h-5" />,
    title: "Healthcare & Medical Offices",
    description:
      "Reduce perceived wait times and keep patients informed. Display doctor bios, service promotions, health tips, and live queue status in waiting rooms. HIPAA-friendly content management with role-based access.",
    image: "/digital-signage/hospitality.webp",
    srcSet: "/digital-signage/hospitality-224w.webp 224w, /digital-signage/hospitality-448w.webp 448w, /digital-signage/hospitality-672w.webp 672w",
    alt: "Medical office waiting room digital signage",
  },
];

// ─── Widget Categories ─────────────────────────────────────────────────────────
const WIDGET_GROUPS = [
  {
    category: "Live & Real-Time",
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-800",
    widgets: ["RSS News Feeds", "Live Weather (1,200+ cities)", "YouTube Live & Playlists", "Instagram Feed", "Google Calendar", "Outlook Calendar", "Stock Ticker", "Sports Scores"],
  },
  {
    category: "Media & Content",
    color: "bg-slate-50 border-slate-200",
    badge: "bg-slate-100 text-slate-700",
    widgets: ["HD Video", "Image Slideshow", "GIF Animation", "Google Slides Embed", "Google Sheets Data", "Custom Text & Fonts", "Shapes & Graphics", "FTP Media Pull"],
  },
  {
    category: "Interactive & Kiosk",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-800",
    widgets: ["Touchscreen Kiosk Mode", "Virtual Queue Management", "Countdown Timer", "Interactive Polls", "Wayfinding / Directory", "Sub-Creative Embed"],
  },
  {
    category: "Data & Integrations",
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-700",
    widgets: ["PowerBI Dashboards", "CSV / XML Data Feeds", "Custom API Integration", "Embed Any Webpage / URL", "Embed HTML (3rd party)", "Dashboard KPI Display", "Data Table Widget"],
  },
];

// ─── Hardware OS Compatibility ─────────────────────────────────────────────────
const HARDWARE_OS = [
  { name: "Android", detail: "Media players & smart sticks" },
  { name: "Chrome OS", detail: "Chromebox & Chromebit" },
  { name: "Windows", detail: "Mini PCs & desktops" },
  { name: "Samsung Tizen", detail: "Smart commercial displays" },
  { name: "Amazon Fire", detail: "Fire TV Signage Stick" },
  { name: "LG webOS", detail: "LG commercial displays" },
];

export default function DigitalSignage() {
  return (
    <>
      <SEOHead
        title="Digital Signage South Jersey | Cloud-Managed Displays | You Need L.E.D."
        description="Cloud-managed digital signage for restaurants, retail, healthcare, schools & offices in South Jersey. 50+ widgets, touchscreen kiosk, queue management & wayfinding. NJ DCA Licensed. Call (609) 335-0123."
        canonical="/services/digital-signage"
      />
      {/* Service Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Digital Signage Installation",
        description: "Cloud-managed digital signage solutions for restaurants, retail, healthcare, education, hospitality, and offices in South Jersey. 50+ widgets, touchscreen kiosk, queue management, wayfinding, and AI-powered content. Professional installation and setup by NJ DCA Licensed technology experts.",
        provider: { "@type": "LocalBusiness", name: SITE.name, url: SITE.url, telephone: SITE.phone },
        areaServed: ["South Jersey", "Cherry Hill NJ", "Voorhees NJ", "Egg Harbor Township NJ", "Atlantic City NJ"],
        serviceType: "Digital Signage Installation",
        url: `${SITE.url}/services/digital-signage`,
      }) }} />

      <ServicePageLayout
        title="Digital Signage Solutions"
        pageSlug="/services/digital-signage"
        subtitle="Cloud-managed displays for restaurants, retail, healthcare, education, hospitality, and more. Professional installation and setup by South Jersey's trusted technology team."
        heroImage={IMAGES.heroMain}
        primaryCta={{ label: "Get a Digital Signage Quote", href: "/contact" }}
        secondaryCta={{ label: "See Use Cases Below", href: "#use-cases" }}
        features={[
          {
            icon: <Monitor className="w-6 h-6" />,
            title: "Cloud-Managed Content",
            description:
              "Update every screen in real time from any device, anywhere. No on-site visits required to change your messaging.",
          },
          {
            icon: <CalendarDays className="w-6 h-6" />,
            title: "Scheduled Playlists & Dayparting",
            description:
              "Automate content changes by time of day, day of week, or custom triggers — perfect for dayparting menus or event schedules.",
          },
          {
            icon: <Users className="w-6 h-6" />,
            title: "Multi-User Admin Controls",
            description:
              "Role-based access lets different staff manage different screens or locations. Ideal for franchises, multi-tenant buildings, and large organizations.",
          },
          {
            icon: <Layers className="w-6 h-6" />,
            title: "Free Template Library",
            description:
              "Hundreds of professionally designed, free templates ready to customize — or we build a branded layout that matches your business exactly.",
          },
          {
            icon: <Wifi className="w-6 h-6" />,
            title: "Hardware Agnostic",
            description:
              "Works on Android, Chrome OS, Windows, Samsung Tizen, Amazon Fire Stick, and LG webOS. We supply hardware or work with what you already own.",
          },
          {
            icon: <Sparkles className="w-6 h-6" />,
            title: "AI-Powered Digital Signage",
            description:
              "AI-assisted content creation and dynamic scheduling keeps your displays fresh and relevant without requiring a design team.",
          },
          {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Proof-of-Play Analytics",
            description:
              "Detailed reports show exactly what played, when, and on which screen. Essential for corporate compliance, franchise accountability, and content optimization.",
          },
          {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "SOC-2 Type II Certified Platform",
            description:
              "The platform is SOC-2 Type II certified and hosted on Amazon S3 — no servers to maintain, no expensive hardware to purchase, and enterprise-grade data security.",
          },
        ]}
        faqs={[
          {
            q: "What hardware do I need for digital signage?",
            a: "Most setups use a commercial-grade display (TV or monitor) paired with a small media player or smart stick. The platform supports Android, Chrome OS, Windows, Samsung Tizen, Amazon Fire Signage Stick, and LG webOS. We supply and install all hardware, or we can work with screens you already own.",
          },
          {
            q: "Can I update the content myself after installation?",
            a: "Absolutely. The cloud-based platform is designed for non-technical users. You can update text, images, videos, and schedules from any browser or mobile device in minutes — no IT department needed. There are also hundreds of free templates to get you started quickly.",
          },
          {
            q: "Do you support touchscreen and interactive kiosk setups?",
            a: "Yes. The platform includes full touchscreen kiosk mode at no extra cost. We install interactive kiosks for lobbies, reception areas, wayfinding directories, and self-service applications. If you can imagine it on a screen, we can build it.",
          },
          {
            q: "Can digital signage manage a virtual queue or waiting room?",
            a: "Yes. The virtual queue management widget lets you display live queue status, estimated wait times, and service call notifications on any screen. It's popular with medical offices, banks, government offices, and retail service counters throughout South Jersey.",
          },
          {
            q: "Do you support wayfinding and directory displays?",
            a: "Yes. We design and install wayfinding directory systems for multi-tenant office buildings, medical campuses, hotels, and conference centers. Tenants and visitors can navigate your facility with always-current digital directories managed from the cloud.",
          },
          {
            q: "What integrations does the platform support?",
            a: "The platform integrates with Microsoft PowerBI, Outlook Calendar, Google Calendar, Google Slides, Google Sheets, Instagram, YouTube, RSS feeds, CSV/XML data feeds, and custom APIs. You can embed virtually any webpage or third-party HTML widget.",
          },
          {
            q: "Is there a monthly software fee?",
            a: "Yes, the cloud management platform has a monthly subscription. We'll walk you through the pricing tiers based on the number of screens you need. There is no long-term contract required. A 30-day free trial is available — ask us about getting started.",
          },
          {
            q: "What industries do you serve with digital signage?",
            a: "We install digital signage for restaurants, retail stores, corporate offices, healthcare facilities, schools, hotels, gyms, banks, houses of worship, conference centers, community organizations, and more throughout South Jersey and the Delaware Valley.",
          },
          {
            q: "Can I control my digital signs from anywhere?",
            a: "Yes. Our cloud-based platform lets you update, schedule, and manage your screens from any device with an internet connection — whether you're in the office, at home, or traveling. Push new content to one screen or hundreds instantly.",
          },
          {
            q: "How long has You Need L.E.D. been installing digital signage?",
            a: "We have been designing and installing LED digital signage and video walls in South Jersey since 2010. Owner Derek brings 15+ years of industry experience to every project. We are NJ DCA Licensed (#34BF00056900), fully insured, and have completed signage projects for 500+ satisfied commercial clients.",
          },
        ]}
        relatedServices={[
          {
            title: "Video Surveillance",
            description: "4K AI-powered cameras with cloud storage.",
            href: "/services/video-surveillance",
          },
          {
            title: "Hosted PBX & VoIP",
            description: "Enterprise cloud phone systems with Teams integration.",
            href: "/services/voip",
          },
          {
            title: "LEDConnect AI Voice",
            description: "24/7 AI voice agent that answers calls and books appointments.",
            href: "/services/ai-voice-agent",
          },
        ]}
      >

        {/* ── Free Trial Banner ─────────────────────────────────────────────── */}
        <section className="bg-[#0e319a] py-10">
          <div className="container">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <p className="text-white/80 text-sm font-medium uppercase tracking-widest mb-1">Risk-Free</p>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  Try It Free for 30 Days
                </h2>
                <p className="text-white/70 text-sm mt-1 max-w-md">
                  No commitment. Full platform access. We set it up, you see the difference — then decide.
                </p>
              </div>
              <a
                href="/contact"
                className="shrink-0 inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold px-7 py-3 rounded-lg transition-colors text-sm"
              >
                Start Your Free Trial →
              </a>
            </div>
          </div>
        </section>

        {/* ── Use Cases Grid ────────────────────────────────────────────────── */}
        <section id="use-cases" className="py-16 lg:py-20 bg-slate-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Digital Signage for Every Industry
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
                From a single menu board in a Cherry Hill restaurant to a multi-screen network across your entire
                facility — we design, install, and support it all.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {USE_CASES.map((uc) => (
                <div
                  key={uc.title}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col sm:flex-row group hover:shadow-md hover:border-[#0e319a]/30 transition-all"
                >
                  <div className="sm:w-48 lg:w-56 shrink-0 overflow-hidden">
                    <img
                      src={uc.image}
                      srcSet={uc.srcSet}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 192px, 224px"
                      alt={uc.alt}
                      className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width="224"
                      height="149"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] shrink-0">
                        {uc.icon}
                      </div>
                      <h3 className="font-heading text-base font-semibold text-slate-900">{uc.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{uc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 50+ Widget Library ────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                50+ Drag-and-Drop Widgets
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
                No design skills required. Point, click, drag, and drop. If you've ever made a PowerPoint slide,
                you're already a pro at building content with this platform.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WIDGET_GROUPS.map((group) => (
                <div key={group.category} className={`rounded-xl border p-5 ${group.color}`}>
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${group.badge}`}>
                    {group.category}
                  </span>
                  <ul className="space-y-2">
                    {group.widgets.map((w) => (
                      <li key={w} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0e319a] shrink-0" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Hardware Compatibility ────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-slate-50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                  Hardware Agnostic — Works on Any OS
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Bring your own hardware and install our software for free, or let us supply and install
                  the right player for your environment. We support all major platforms.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {HARDWARE_OS.map((hw) => (
                  <div key={hw.name} className="bg-white rounded-xl border border-slate-200 p-5 text-center hover:border-[#0e319a]/40 hover:shadow-sm transition-all">
                    <Monitor className="w-7 h-7 text-[#0e319a] mx-auto mb-2" />
                    <p className="font-heading font-semibold text-slate-900 text-sm">{hw.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{hw.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Advanced Capabilities: Kiosk, Queue, Wayfinding ──────────────── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Beyond the Bulletin Board
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
                Most businesses start with a menu board or lobby display. These advanced capabilities take
                your investment further — without additional hardware costs.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: <TouchpadIcon className="w-6 h-6" />,
                  title: "Interactive Touchscreen Kiosk",
                  body: "Turn any screen into a full touchscreen kiosk at no extra cost. Perfect for self-service check-in, product catalogs, interactive directories, and lobby information stations. Used by Disney World and 20,000+ businesses worldwide.",
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  title: "Virtual Queue Management",
                  body: "Display live queue status, estimated wait times, and service call notifications on your waiting room screens. Reduces perceived wait times and improves the customer experience in medical offices, banks, and service counters.",
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: "Wayfinding & Directory Displays",
                  body: "Cloud-managed directory and wayfinding systems for multi-tenant office buildings, medical campuses, hotels, and conference centers. Always-current tenant listings and floor maps — updated in minutes, not days.",
                },
              ].map((item) => (
                <div key={item.title} className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-[#0e319a]/30 hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-lg bg-[#0e319a]/10 flex items-center justify-center text-[#0e319a] mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Analytics & Security ──────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-slate-900">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[#f97316] text-sm font-semibold uppercase tracking-widest mb-3">Enterprise-Grade</p>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-5">
                  Proof-of-Play Analytics &amp; SOC-2 Security
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Know exactly what played, when, and on which screen. Detailed proof-of-play reports give you
                  full accountability — essential for corporate compliance, franchise operations, and content
                  performance tracking.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  The platform is <strong className="text-white">SOC-2 Type II certified</strong> and hosted on
                  Amazon S3. No servers to maintain, no expensive hardware to purchase, and enterprise-grade
                  data security that satisfies healthcare, banking, and corporate IT requirements.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Proof-of-Play Reports", desc: "What played, when, on which screen" },
                  { label: "SOC-2 Type II Certified", desc: "Enterprise data security standard" },
                  { label: "Amazon S3 Hosted", desc: "No servers to maintain" },
                  { label: "Screen Uptime Monitoring", desc: "Know if a display goes offline" },
                  { label: "Multi-User Admin", desc: "Role-based access per location" },
                  { label: "AI-Powered Content", desc: "Smart scheduling & creation tools" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                    <p className="font-heading font-semibold text-white text-sm mb-1">{stat.label}</p>
                    <p className="text-xs text-slate-400">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Integrations ──────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Connects to the Tools You Already Use
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed">
                Pull live data from your existing business systems directly onto your screens — no manual updates required.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {[
                "Microsoft PowerBI", "Outlook Calendar", "Google Calendar",
                "Google Slides", "Google Sheets", "Instagram",
                "YouTube", "RSS / News Feeds", "CSV & XML Data Feeds",
                "Custom API Integration", "Embed Any Webpage", "Yammer",
              ].map((integration) => (
                <span
                  key={integration}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-700 font-medium hover:border-[#0e319a]/40 hover:bg-[#0e319a]/5 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0e319a]" />
                  {integration}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ─────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-slate-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Why South Jersey Businesses Choose You Need L.E.D.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                We are not just a software reseller. We are a local, licensed technology team that handles everything
                from hardware selection and mounting to network setup and ongoing support.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  title: "End-to-End Installation",
                  body: "We handle everything — hardware procurement, mounting, cabling, network configuration, and software setup. You get a fully working system from day one.",
                },
                {
                  title: "NJ DCA Licensed & Insured",
                  body: "With 15+ years of industry experience and NJ DCA License #34BF00056900, we bring the same professionalism to digital signage that we bring to every security and technology project.",
                },
                {
                  title: "Local Support You Can Call",
                  body: "When something needs attention, you call (609) 335-0123 and talk to a real person who knows your system. No overseas support tickets. No runaround.",
                },
              ].map((item) => (
                <div key={item.title} className="p-6 bg-white rounded-xl border border-slate-200">
                  <div className="w-2 h-8 bg-[#0e319a] rounded-full mb-4" />
                  <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </ServicePageLayout>
    </>
  );
}
