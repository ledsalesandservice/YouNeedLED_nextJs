/*
 * LEDConnect AI Voice Agent — Dedicated service page
 * Featured on: Homepage, VoIP page, Service Area pages
 * Target audience: local businesses (home services, medical, dental, law firms, restaurants)
 */
import { Link } from "wouter";
import { SITE, IMAGES } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import {
  Bot, Phone, PhoneOff, CalendarCheck, UserCheck, Clock, Zap,
  ArrowRight, CheckCircle2, Building2, Stethoscope, Scale,
  Utensils, Wrench, Star, MessageSquare, BarChart3, Shield
} from "lucide-react";

export default function AiVoiceAgent() {
  return (
    <>
      <SEOHead
        title="LEDConnect AI Voice Agents | 24/7 AI Call Handling"
        description="Stop missing calls. LEDConnect AI Voice Agents block spam, handle overflow and after-hours calls, capture leads, and book appointments 24/7. Call (609) 335-0123."
        canonical="/services/ai-voice-agent"
        ogImage={IMAGES.heroAiAgent}
      />
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[#0e319a] to-[#081d5e] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/hero-ai-agent-1920w.webp"
            srcSet="/hero-ai-agent-400w.webp 400w, /hero-ai-agent-800w.webp 800w, /hero-ai-agent-1200w.webp 1200w, /hero-ai-agent-1920w.webp 1920w"
            sizes="100vw"
            alt=""
            className="w-full h-full object-cover max-w-full"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1072"
          />
        </div>
        <div className="relative container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f97015]/20 text-[#f97015] rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                <Zap className="w-3.5 h-3.5" /> New Service
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] mb-6">
                LEDConnect AI Voice Agents
              </h1>
              <p className="text-lg text-white/85 leading-relaxed mb-8 max-w-xl">
                Stop missing calls and losing leads. Our AI Voice Agent answers every call 24/7, blocks spam, captures leads, and schedules appointments — working alongside your existing staff.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg shadow-orange-500/25"
                >
                  <Bot className="w-4 h-4" /> Book a Free Demo <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={SITE.phoneTel}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm"
                >
                  <Phone className="w-4 h-4" /> {SITE.phone}
                </a>
              </div>
              <p className="text-xs text-white/50">Bundled with LEDConnect VoIP Phone System</p>
            </div>
            <div className="relative">
              <img
                src="/hero-ai-agent-800w.webp"
                srcSet="/hero-ai-agent-400w.webp 400w, /hero-ai-agent-800w.webp 800w, /hero-ai-agent-1200w.webp 1200w"
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="LEDConnect AI Voice Agent phone system"
                className="rounded-2xl shadow-2xl shadow-black/30 w-full max-w-full h-auto"
                loading="eager"
                fetchPriority="high"
                width="800"
                height="447"
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

      {/* Key Features */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Your AI Receptionist That Never Sleeps
            </h2>
            <p className="text-slate-600 leading-relaxed">
              LEDConnect AI Voice Agents handle your calls intelligently, so your team can focus on what matters most — serving customers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <PhoneOff className="w-7 h-7" />, title: "Blocks Spam Calls", desc: "AI identifies and blocks robocalls, telemarketers, and spam before they reach your team. Save hours every week." },
              { icon: <Clock className="w-7 h-7" />, title: "After-Hours Coverage", desc: "Never miss a lead again. AI answers calls when your office is closed, on weekends, and during holidays." },
              { icon: <UserCheck className="w-7 h-7" />, title: "Captures Every Lead", desc: "Collects caller name, number, reason for calling, and sends it to your CRM or email automatically." },
              { icon: <CalendarCheck className="w-7 h-7" />, title: "Books Appointments", desc: "Schedules consultations and appointments directly on your calendar. No back-and-forth needed." },
            ].map((feat) => (
              <div key={feat.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-xl bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] mx-auto mb-4">
                  {feat.icon}
                </div>
                <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-14">
            Simple Setup, Powerful Results
          </h2>
          <div className="space-y-8">
            {[
              { step: "01", title: "We Set Up Your AI Agent", desc: "We configure your AI Voice Agent with your business information, hours, services, and custom greetings. It learns how you want calls handled." },
              { step: "02", title: "Calls Route Through AI", desc: "When calls come in, the AI answers professionally, identifies the caller's needs, and either handles the request or transfers to your team." },
              { step: "03", title: "Leads & Appointments Flow In", desc: "Every lead is captured and sent to your CRM. Appointments are booked on your calendar. You get a summary of every call." },
              { step: "04", title: "Your Team Focuses on Revenue", desc: "With spam blocked and routine calls handled, your staff focuses on closing deals and serving customers." },
            ].map((s) => (
              <div key={s.step} className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-xl bg-[#0e319a] flex items-center justify-center text-white font-heading font-bold text-lg shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Who It's For</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Built for Local Businesses
            </h2>
            <p className="text-slate-600">
              LEDConnect AI Voice Agents are designed for businesses that rely on phone calls to generate revenue.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Wrench className="w-6 h-6" />, title: "Home Services", desc: "HVAC, plumbing, electrical, roofing, landscaping — capture every service call, even during busy seasons." },
              { icon: <Stethoscope className="w-6 h-6" />, title: "Medical & Dental", desc: "Handle appointment scheduling, prescription refill requests, and after-hours patient inquiries." },
              { icon: <Scale className="w-6 h-6" />, title: "Law Firms", desc: "Capture potential client information, schedule consultations, and screen intake calls professionally." },
              { icon: <Utensils className="w-6 h-6" />, title: "Restaurants", desc: "Handle reservation requests, answer menu questions, and manage takeout orders during rush hours." },
              { icon: <Building2 className="w-6 h-6" />, title: "Property Management", desc: "Field tenant inquiries, schedule maintenance, and handle emergency calls after hours." },
              { icon: <Shield className="w-6 h-6" />, title: "Insurance Agencies", desc: "Capture quote requests, schedule policy reviews, and handle claims intake calls." },
            ].map((ind) => (
              <div key={ind.title} className="p-6 bg-white rounded-xl border border-slate-200 hover:border-[#0e319a]/30 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-lg bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] mb-4">
                  {ind.icon}
                </div>
                <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{ind.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Stats */}
      <section className="py-16 lg:py-20 bg-[#0e319a]">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { stat: "100%", label: "Calls Answered", desc: "Never miss another call" },
              { stat: "85%", label: "Spam Blocked", desc: "Average spam reduction" },
              { stat: "24/7", label: "Availability", desc: "Always-on coverage" },
              { stat: "3x", label: "More Leads", desc: "Average lead increase" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-heading text-4xl font-extrabold text-white mb-1">{s.stat}</div>
                <div className="text-sm font-semibold text-white/90 mb-1">{s.label}</div>
                <p className="text-xs text-white/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Pricing</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-600">Bundled with LEDConnect VoIP. No hidden fees.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-xl border border-slate-200 bg-white">
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">AI Voice Add-On</h3>
              <p className="text-sm text-slate-500 mb-4">For existing LEDConnect VoIP customers</p>
              <div className="mb-6">
                <span className="font-heading text-4xl font-extrabold text-[#0e319a]">$49</span>
                <span className="text-slate-500">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                {["Spam call blocking", "After-hours answering", "Lead capture & CRM sync", "Basic appointment scheduling", "Call summaries via email", "Up to 200 calls/month"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="block w-full text-center px-6 py-3 bg-[#0e319a] text-white font-semibold rounded-lg hover:bg-[#0c2a82] transition-colors text-sm">
                Get Started
              </Link>
            </div>
            <div className="p-8 rounded-xl border-2 border-[#0e319a] bg-white ring-2 ring-[#0e319a]/20">
              <span className="inline-block px-3 py-1 bg-[#0e319a] text-white text-xs font-semibold rounded-full mb-3">Best Value</span>
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">AI Voice Pro</h3>
              <p className="text-sm text-slate-500 mb-4">Full AI receptionist experience</p>
              <div className="mb-6">
                <span className="font-heading text-4xl font-extrabold text-[#0e319a]">$99</span>
                <span className="text-slate-500">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                {["Everything in Add-On", "Unlimited calls", "Advanced appointment scheduling", "Custom call scripts", "Multi-language support", "Priority support", "Monthly analytics report"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="block w-full text-center px-6 py-3 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg">
                Book a Free Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: "Do I need a LEDConnect VoIP system to use the AI Voice Agent?", a: "The AI Voice Agent is designed to work with the LEDConnect VoIP phone system for the best experience. However, we can configure call forwarding from most existing phone systems to route calls through the AI agent." },
              { q: "Will the AI replace my receptionist?", a: "No — the AI Voice Agent is designed to work alongside your existing staff. It handles overflow calls when your team is busy, after-hours calls, and spam filtering. Your team stays in control of all important calls." },
              { q: "How does the AI handle complex questions?", a: "The AI is trained on your business information and can answer common questions about your services, hours, and location. For complex inquiries, it captures the caller's information and schedules a callback from your team." },
              { q: "Can I customize the AI's responses?", a: "Absolutely. We work with you to create custom call scripts, greetings, and response flows that match your brand voice and business processes." },
              { q: "What happens if the AI can't handle a call?", a: "If the AI determines a call needs human attention, it seamlessly transfers to your team during business hours, or captures detailed information for a callback during off-hours." },
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-heading text-sm font-semibold text-slate-900 pr-4">{faq.q}</span>
                  <span className="text-slate-400 shrink-0 group-open:rotate-180 transition-transform">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                { "@type": "Question", name: "Do I need a LEDConnect VoIP system to use the AI Voice Agent?", acceptedAnswer: { "@type": "Answer", text: "The AI Voice Agent is designed to work with the LEDConnect VoIP phone system for the best experience. However, we can configure call forwarding from most existing phone systems to route calls through the AI agent." } },
                { "@type": "Question", name: "Will the AI replace my receptionist?", acceptedAnswer: { "@type": "Answer", text: "No — the AI Voice Agent is designed to work alongside your existing staff. It handles overflow calls when your team is busy, after-hours calls, and spam filtering. Your team stays in control of all important calls." } },
                { "@type": "Question", name: "How does the AI handle complex questions?", acceptedAnswer: { "@type": "Answer", text: "The AI is trained on your business information and can answer common questions about your services, hours, and location. For complex inquiries, it captures the caller's information and schedules a callback from your team." } },
              ],
            }),
          }}
        />
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0e319a] to-[#1a42b8]">
        <div className="container text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Stop Missing Calls?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Book a free demo and see how LEDConnect AI Voice Agents can transform your business communications.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg">
              <Bot className="w-4 h-4" /> Book Your Free Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={SITE.phoneTel} className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm">
              <Phone className="w-4 h-4" /> Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
