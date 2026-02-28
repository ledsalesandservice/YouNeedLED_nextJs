/*
 * Homepage — YouNeedLED
 * "Shield & Signal" design: Hero with dark overlay, service grid, AI Voice Agent featured section,
 * testimonials carousel, service areas tabs, blog preview, CTA
 */
import { Link } from "wouter";
import { SITE, IMAGES, SERVICES, TESTIMONIALS, SERVICE_AREAS, CERTIFICATIONS } from "@/lib/siteData";
import { ALL_BLOG_POSTS } from "@/lib/blogData";
import SEOHead from "@/components/SEOHead";
import {
  Phone, ArrowRight, Star, Shield, Clock, Users, Award,
  Camera, KeyRound, Flame, ShieldAlert, HardHat, Headphones,
  Bot, PhoneOff, CalendarCheck, UserCheck, Zap, CheckCircle2,
  MapPin, ChevronRight
} from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, React.ReactNode> = {
  Camera: <Camera className="w-6 h-6" />,
  KeyRound: <KeyRound className="w-6 h-6" />,
  Flame: <Flame className="w-6 h-6" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6" />,
  Phone: <Headphones className="w-6 h-6" />,
  HardHat: <HardHat className="w-6 h-6" />,
};

export default function Home() {
  const [activeCounty, setActiveCounty] = useState("southJersey");
  const counties = [
    { key: "southJersey", label: "South Jersey" },
    { key: "centralJersey", label: "Central Jersey" },
    { key: "jerseyShore", label: "Jersey Shore" },
  ];

  return (
    <>
      <SEOHead
        title="Security Cameras & VoIP South Jersey | You Need L.E.D."
        description="Professional security camera installation, VoIP phone systems, access control, and fire alarm systems in South Jersey. NJ DCA Licensed. Call (609) 335-0123."
        canonical="/"
        ogImage={IMAGES.heroMain}
      />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="absolute inset-0">
          <img src={IMAGES.heroMain} alt="Modern commercial building with security systems" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e319a]/90 via-[#0e319a]/75 to-[#0e319a]/50" />
        </div>
        <div className="relative container py-20 lg:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-xs font-medium border border-white/20">
                <Shield className="w-3.5 h-3.5" /> NJ DCA Licensed
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-xs font-medium border border-white/20">
                <MapPin className="w-3.5 h-3.5" /> South Jersey & Delaware Valley
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              State-of-the-Art Commercial & Residential Security
            </h1>
            <p className="text-lg text-white/85 leading-relaxed mb-8 max-w-xl">
              Professional installation and 24/7 monitoring of security cameras, alarm systems, access control, VoIP phone systems, and fire detection — all from one trusted local team.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-all shadow-lg shadow-orange-500/25 text-sm"
              >
                Get a Free Security Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={SITE.phoneTel}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20 text-sm"
              >
                <Phone className="w-4 h-4" /> {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Our Services</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Complete Security & Technology Solutions
            </h2>
            <p className="text-slate-600 leading-relaxed">
              From surveillance cameras to VoIP phone systems, we provide end-to-end technology solutions for businesses and homes across the tri-state area.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-[#0e319a]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#0e319a]/5 group-hover:bg-[#0e319a]/10 flex items-center justify-center text-[#0e319a] mb-4 transition-colors">
                  {iconMap[svc.icon]}
                </div>
                <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2 group-hover:text-[#0e319a] transition-colors">
                  {svc.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{svc.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#0e319a] group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LEDCONNECT AI VOICE AGENT FEATURED SECTION ===== */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0e319a] to-[#081d5e]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f97015]/20 text-[#f97015] rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                <Zap className="w-3.5 h-3.5" /> New Service
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
                LEDConnect AI Voice Agents
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                Stop missing calls and losing leads. Our AI Voice Agent answers every call 24/7, blocks spam, captures leads, and schedules appointments — working alongside your existing staff.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <PhoneOff className="w-5 h-5" />, title: "Blocks Spam Calls", desc: "AI filters out robocalls and spam so your team only handles real customers" },
                  { icon: <Clock className="w-5 h-5" />, title: "After-Hours Coverage", desc: "Never miss a lead — AI answers when your office is closed" },
                  { icon: <UserCheck className="w-5 h-5" />, title: "Captures Every Lead", desc: "Collects caller info and sends it to your CRM automatically" },
                  { icon: <CalendarCheck className="w-5 h-5" />, title: "Books Appointments", desc: "Schedules consultations directly on your calendar" },
                ].map((feat) => (
                  <div key={feat.title} className="flex gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-[#f97015] shrink-0 mt-0.5">{feat.icon}</div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">{feat.title}</h4>
                      <p className="text-xs text-white/60 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/services/ai-voice-agent"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg shadow-orange-500/25"
                >
                  <Bot className="w-4 h-4" /> Book a Free Demo
                </Link>
                <a
                  href={SITE.phoneTel}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm"
                >
                  <Phone className="w-4 h-4" /> {SITE.phone}
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src={IMAGES.heroAiAgent}
                alt="LEDConnect AI Voice Agent phone system with holographic waveform"
                className="rounded-2xl shadow-2xl shadow-black/30 w-full"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg max-w-[220px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-900">AI Agent Active</span>
                </div>
                <p className="text-xs text-slate-500">Handling calls for 200+ local businesses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Client Testimonials</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Trusted by 500+ South Jersey Businesses
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-slate-500">5.0 Stars on Google &middot; Based on 32+ reviews</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed mb-5 line-clamp-5">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#0e319a]/10 flex items-center justify-center text-[#0e319a] font-heading font-bold text-sm">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Why Choose Us</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Licensed, Certified & Trusted
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {[
              { icon: <Award className="w-7 h-7" />, stat: "30+", label: "Years Experience", desc: "Combined industry expertise across our team" },
              { icon: <Clock className="w-7 h-7" />, stat: "24/7", label: "Support Available", desc: "Round-the-clock emergency response" },
              { icon: <Users className="w-7 h-7" />, stat: "500+", label: "Satisfied Clients", desc: "Businesses across the tri-state area" },
              { icon: <Shield className="w-7 h-7" />, stat: "NJ DCA", label: "Licensed", desc: "Fully licensed and insured contractor" },
            ].map((item) => (
              <div key={item.label} className="text-center p-6">
                <div className="w-14 h-14 rounded-xl bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="font-heading text-3xl font-extrabold text-[#0e319a] mb-1">{item.stat}</div>
                <div className="font-heading text-sm font-semibold text-slate-900 mb-1">{item.label}</div>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-2xl p-8 lg:p-10">
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-5">Professional Certifications</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="text-sm text-slate-700">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE AREAS ===== */}
      <section className="py-20 lg:py-28 bg-[#0e319a]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Coverage Area</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Serving the Tri-State Area
            </h2>
            <p className="text-white/70">
              Full-service security solutions throughout New Jersey. VoIP, cameras, and access control available in PA, DE, and MD.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {counties.map((c) => (
              <button
                key={c.key}
                onClick={() => setActiveCounty(c.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCounty === c.key
                    ? "bg-white text-[#0e319a]"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mb-10">
            {(SERVICE_AREAS.newJersey as Record<string, string[]>)[activeCounty]?.map((town: string) => (
              <Link
                key={town}
                href="/service-areas"
                className="px-3 py-1.5 bg-white/5 border border-white/15 rounded-md text-sm text-white/80 hover:bg-white/15 hover:text-white transition-colors"
              >
                {town}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/service-areas" className="inline-flex items-center gap-2 text-white font-medium text-sm hover:text-[#f97015] transition-colors">
              View All Service Areas <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Security Insights</p>
              <h2 className="font-heading text-3xl font-bold text-slate-900">Latest from Our Blog</h2>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-[#0e319a] hover:text-[#0e319a]/80 transition-colors">
              View All Insights <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ALL_BLOG_POSTS.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <p className="text-xs text-slate-500 mb-2">{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} &middot; {post.readTime}</p>
                <h3 className="font-heading text-base font-semibold text-slate-900 group-hover:text-[#0e319a] transition-colors leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <div className="bg-gradient-to-r from-[#0e319a] to-[#1a42b8] rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Secure Your Property?
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Get a free security assessment from our licensed professionals. We'll design a custom solution for your property.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg"
              >
                Get Your Free Assessment <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={SITE.phoneTel}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm"
              >
                <Phone className="w-4 h-4" /> Call {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LocalBusiness + WebSite Schema on Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "You Need L.E.D.",
            url: SITE.url,
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE.url}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </>
  );
}
