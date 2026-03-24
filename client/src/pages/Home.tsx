/*
 * Homepage — YouNeedLED
 * "Shield & Signal" design: Hero with dark overlay, service grid, AI Voice Agent featured section,
 * testimonials carousel, service areas tabs, blog preview, CTA
 */
import { Link } from "wouter";
import { SITE, IMAGES, IMAGE_SRCSETS, SERVICES, TESTIMONIALS, SERVICE_AREAS, CERTIFICATIONS } from "@/lib/siteData";
import { FEATURED_BLOG_POSTS } from "@/lib/blogPreviewData";
import SEOHead from "@/components/SEOHead";
import {
  Phone, ArrowRight, Star, Shield, Clock, Users, Award,
  Camera, KeyRound, Flame, ShieldAlert, HardHat, Headphones, Monitor,
  Bot, PhoneOff, CalendarCheck, UserCheck, Zap, CheckCircle2,
  MapPin, ChevronRight
} from "lucide-react";
import { useState } from "react";
import { FadeIn, StaggerContainer, StaggerItem, HeroAnimate, CountUp } from "@/components/animations";

const iconMap: Record<string, React.ReactNode> = {
  Camera: <Camera className="w-6 h-6" />,
  KeyRound: <KeyRound className="w-6 h-6" />,
  Flame: <Flame className="w-6 h-6" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6" />,
  Phone: <Headphones className="w-6 h-6" />,
  HardHat: <HardHat className="w-6 h-6" />,
  Monitor: <Monitor className="w-6 h-6" />,
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
          <img
            src="/hero-main-800w.webp"
            srcSet="/hero-main-400w.webp 400w, /hero-main-800w.webp 800w, /hero-main-1200w.webp 1200w, /hero-main-1920w.webp 1920w"
            sizes="100vw"
            alt="Modern commercial building with security systems"
            className="w-full h-full object-cover max-w-full"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1072"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e319a]/90 via-[#0e319a]/75 to-[#0e319a]/50" />
        </div>
        <div className="relative container py-20 lg:py-28">
          <div className="max-w-2xl">
            <HeroAnimate delay={0.1}>
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-xs font-medium border border-white/20">
                  <Shield className="w-3.5 h-3.5" /> NJ DCA Licensed
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-xs font-medium border border-white/20">
                  <MapPin className="w-3.5 h-3.5" /> South Jersey & Delaware Valley
                </span>
              </div>
            </HeroAnimate>
            <HeroAnimate delay={0.25}>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                State-of-the-Art Commercial & Residential Security
              </h1>
            </HeroAnimate>
            <HeroAnimate delay={0.4}>
              <p className="text-lg text-white/85 leading-relaxed mb-8 max-w-xl">
                Professional installation and 24/7 monitoring of security cameras, alarm systems, access control, VoIP phone systems, and fire detection — all from one trusted local team.
              </p>
            </HeroAnimate>
            <HeroAnimate delay={0.55}>
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
            </HeroAnimate>
          </div>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Our Services</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Complete Security & Technology Solutions
            </h2>
            <p className="text-slate-600 leading-relaxed">
              From surveillance cameras to VoIP phone systems, we provide end-to-end technology solutions for businesses and homes across the tri-state area.
            </p>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <StaggerItem key={svc.href}>
                <Link
                  href={svc.href}
                  className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-[#0e319a]/30 hover:shadow-lg transition-all duration-300 block h-full"
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== LEDCONNECT AI VOICE AGENT FEATURED SECTION ===== */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0e319a] to-[#081d5e]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
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
            </FadeIn>
            <FadeIn direction="left">
            <div className="relative">
              <img
                src={IMAGES.heroAiAgent}
                srcSet={IMAGE_SRCSETS.heroAiAgent}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="LEDConnect AI Voice Agent phone system with holographic waveform"
                className="rounded-2xl shadow-2xl shadow-black/30 w-full max-w-full h-auto"
                loading="lazy"
                width="800"
                height="600"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg max-w-[220px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-900">AI Agent Active</span>
                </div>
                <p className="text-xs text-slate-500">Handling calls for 200+ local businesses</p>
              </div>
            </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS / GOOGLE REVIEWS ===== */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Real Reviews from Real Clients</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-5">
              Trusted by 500+ South Jersey Businesses
            </h2>
            {/* Google Reviews Badge */}
            <a
              href="https://www.google.com/maps/search/You+Need+LED+Linwood+NJ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm font-bold text-slate-900 ml-1">5.0</span>
                </div>
                <p className="text-xs text-slate-500">32+ verified Google reviews</p>
              </div>
              <span className="text-xs font-semibold text-[#0e319a] border-l border-slate-200 pl-3">Read Reviews ↗</span>
            </a>
          </div>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <StaggerItem key={i}><div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <svg className="w-4 h-4 shrink-0 opacity-50" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed mb-5 flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#0e319a]/10 flex items-center justify-center text-[#0e319a] font-heading font-bold text-sm shrink-0">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.type} &middot; Verified Google Review</p>
                  </div>
                </div>
              </div></StaggerItem>
            ))}
          </StaggerContainer>
          <div className="text-center mt-10">
            <a
              href="https://www.google.com/maps/search/You+Need+LED+Linwood+NJ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-[#0e319a] hover:text-[#0e319a] transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              See All 32+ Reviews on Google
            </a>
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
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {[
              { icon: <Award className="w-7 h-7" />, stat: "30+", count: 30, suffix: "+", label: "Years Experience", desc: "Combined industry expertise across our team" },
              { icon: <Clock className="w-7 h-7" />, stat: "24/7", count: null, label: "Support Available", desc: "Round-the-clock emergency response" },
              { icon: <Users className="w-7 h-7" />, stat: "500+", count: 500, suffix: "+", label: "Satisfied Clients", desc: "Businesses across the tri-state area" },
              { icon: <Shield className="w-7 h-7" />, stat: "NJ DCA", count: null, label: "Licensed", desc: "Fully licensed and insured contractor" },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 rounded-xl bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] mx-auto mb-4">
                    {item.icon}
                  </div>
                  <div className="font-heading text-3xl font-extrabold text-[#0e319a] mb-1">
                    {item.count !== null
                      ? <CountUp value={item.count} suffix={item.suffix} />
                      : item.stat}
                  </div>
                  <div className="font-heading text-sm font-semibold text-slate-900 mb-1">{item.label}</div>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
            {(SERVICE_AREAS.newJersey as Record<string, string[]>)[activeCounty]?.map((town: string) => {
              const locationSlug: Record<string, string> = {
                "Cherry Hill": "/locations/cherry-hill-nj",
                "Voorhees": "/locations/voorhees-nj",
                "Mount Laurel": "/locations/mount-laurel-nj",
                "Egg Harbor Township": "/locations/egg-harbor-township-nj",
                "Somers Point": "/locations/somers-point-nj",
                "Atlantic City": "/locations/atlantic-city-nj",
              };
              return (
                <Link
                  key={town}
                  href={locationSlug[town] || "/service-areas"}
                  className="px-3 py-1.5 bg-white/5 border border-white/15 rounded-md text-sm text-white/80 hover:bg-white/15 hover:text-white transition-colors"
                >
                  {town}
                </Link>
              );
            })}
          </div>
          <div className="text-center">
            <Link href="/service-areas" className="inline-flex items-center gap-2 text-white font-medium text-sm hover:text-[#f97015] transition-colors">
              View All Service Areas <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FROM THE FIELD – SOCIAL PROOF ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">From the Field</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Real Installs. Real Results.
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Every week our crew is out across South Jersey installing cameras, pulling cable, and setting up systems that protect real businesses and homes. Follow along on Instagram and Facebook.
            </p>
          </FadeIn>

          {/* Social feed placeholder grid — replace tiles with real photos as available */}
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {[
              { label: "4K Camera Install", sub: "Egg Harbor Township Warehouse", bg: "bg-slate-800" },
              { label: "Access Control", sub: "Cherry Hill Office Complex", bg: "bg-[#0e319a]" },
              { label: "Digital Signage", sub: "Atlantic City Restaurant", bg: "bg-slate-700" },
              { label: "Fire Alarm", sub: "Mount Laurel Medical Office", bg: "bg-red-700" },
              { label: "Jobsite Cameras", sub: "Somers Point Construction", bg: "bg-slate-900" },
              { label: "VoIP Rollout", sub: "Voorhees Law Firm", bg: "bg-[#0e319a]/80" },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative aspect-square rounded-xl overflow-hidden flex flex-col items-center justify-center text-center p-3 ${item.bg} hover:opacity-90 transition-opacity`}
                >
                  <Camera className="w-6 h-6 text-white/40 mb-2 group-hover:text-white/70 transition-colors" />
                  <p className="text-xs font-semibold text-white leading-tight">{item.label}</p>
                  <p className="text-[10px] text-white/60 mt-0.5 leading-tight">{item.sub}</p>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#f97015]/60 rounded-xl transition-colors" />
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:border-[#E1306C] hover:text-[#E1306C] transition-colors bg-white shadow-sm"
            >
              {/* Instagram icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
              Follow @youneedled on Instagram
            </a>
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:border-[#1877F2] hover:text-[#1877F2] transition-colors bg-white shadow-sm"
            >
              {/* Facebook icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
              Like Us on Facebook
            </a>
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
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {FEATURED_BLOG_POSTS.map((post) => (
              <StaggerItem key={post.slug}><Link href={`/blog/${post.slug}`} className="group block">
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <img
                    src={post.image}
                    srcSet={post.image.startsWith('/blog-images/') ? `${post.image.replace(/-800w\.webp$/, '-400w.webp')} 400w, ${post.image} 800w, ${post.image.replace(/-800w\.webp$/, '-1200w.webp')} 1200w` : undefined}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    alt={post.title}
                    className="w-full h-full object-cover max-w-full group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width="800"
                    height="500"
                  />
                </div>
                <p className="text-xs text-slate-500 mb-2">{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} &middot; {post.readTime}</p>
                <h3 className="font-heading text-base font-semibold text-slate-900 group-hover:text-[#0e319a] transition-colors leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
              </Link></StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <FadeIn>
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
          </FadeIn>
        </div>
      </section>

      {/* ===== FULL AEO SCHEMA: Organization + LocalBusiness + WebSite ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "SecurityAlarmAgency"],
              "@id": `${SITE.url}/#organization`,
              name: SITE.name,
              alternateName: "You Need LED",
              url: SITE.url,
              logo: `${SITE.url}/logo.png`,
              image: `${SITE.url}/hero-main-1200w.webp`,
              description: "NJ DCA Licensed commercial and residential security camera, access control, fire alarm, VoIP, and digital signage installation company serving South Jersey and the Delaware Valley for 15+ years.",
              telephone: SITE.phone,
              email: SITE.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: SITE.address.street,
                addressLocality: SITE.address.city,
                addressRegion: SITE.address.state,
                postalCode: SITE.address.zip,
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 39.5871,
                longitude: -74.5654,
              },
              areaServed: [
                { "@type": "State", name: "New Jersey" },
                { "@type": "State", name: "Pennsylvania" },
                { "@type": "State", name: "Delaware" },
                { "@type": "City", name: "Cherry Hill, NJ" },
                { "@type": "City", name: "Voorhees, NJ" },
                { "@type": "City", name: "Mount Laurel, NJ" },
                { "@type": "City", name: "Egg Harbor Township, NJ" },
                { "@type": "City", name: "Somers Point, NJ" },
                { "@type": "City", name: "Atlantic City, NJ" },
                { "@type": "City", name: "Philadelphia, PA" },
              ],
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "32",
                bestRating: "5",
              },
              hasCredential: [
                { "@type": "EducationalOccupationalCredential", credentialCategory: "license", name: "NJ DCA Security License", identifier: "34BF00056900" },
                { "@type": "EducationalOccupationalCredential", credentialCategory: "license", name: "NJ DCA Fire Alarm License", identifier: "34FA00102800" },
              ],
              sameAs: [
                SITE.social.facebook,
                SITE.social.instagram,
                "https://www.yelp.com/biz/you-need-led",
              ],
              priceRange: "$$",
              currenciesAccepted: "USD",
              paymentAccepted: "Cash, Credit Card, Check, Financing",
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE.url}/#website`,
              name: SITE.name,
              url: SITE.url,
              publisher: { "@id": `${SITE.url}/#organization` },
              potentialAction: {
                "@type": "SearchAction",
                target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/blog?q={search_term_string}` },
                "query-input": "required name=search_term_string",
              },
            },
          ]),
        }}
      />
    </>
  );
}
