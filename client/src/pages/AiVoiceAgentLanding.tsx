/*
 * AiVoiceAgentLanding — /ai-voice-agent
 * Webinar-derived thought-leadership landing page for the LEDConnect AI Voice Agent.
 * Distinct from /services/ai-voice-agent (the product/pricing page): this page walks
 * through the business case, service-desk fit, and evaluation guidance before the CTA.
 */
import { Link } from "wouter";
import { SITE, IMAGES } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import {
  Bot, Phone, ArrowRight, CheckCircle2, Zap, PhoneMissed, Timer,
  Headset, Ticket, LayoutGrid, Scale, ClipboardCheck, Rocket,
  TrendingDown, Clock, Users, MessageSquare, ShieldCheck
} from "lucide-react";

export default function AiVoiceAgentLanding() {
  return (
    <>
      <SEOHead
        title="LEDConnect AI Voice Agent — Never Miss Another Business Opportunity | You Need L.E.D."
        description="See how an AI voice agent answers every call, resolves routine Tier-1 requests, and turns live calls into structured PSA tickets — freeing your service desk. Book a free demo: (609) 335-0123."
        canonical="/ai-voice-agent"
        ogImage={IMAGES.heroAiAgent}
      />

      {/* Service Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "LEDConnect AI Voice Agent",
        description: "AI voice agent that answers every business call 24/7, resolves routine Tier-1 requests, captures leads, and converts live calls into structured PSA tickets for service desks and local businesses.",
        provider: { "@type": "LocalBusiness", name: SITE.name, url: SITE.url, telephone: SITE.phone },
        areaServed: ["South Jersey", "Delaware Valley", "Atlantic County NJ"],
        serviceType: "AI Voice Agent",
        url: `${SITE.url}/ai-voice-agent`,
      }) }} />

      {/* ===== HERO ===== */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[#0e319a] to-[#081d5e] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/hero-ai-agent-800w.webp"
            srcSet="/hero-ai-agent-400w.webp 400w, /hero-ai-agent-800w.webp 800w, /hero-ai-agent-1200w.webp 1200w, /hero-ai-agent-1920w.webp 1920w"
            sizes="100vw"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover max-w-full"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1072"
          />
        </div>
        <div className="relative container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f97015]/20 text-[#f97015] rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <Zap className="w-3.5 h-3.5" /> LEDConnect AI Voice Agent
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Never Miss Another Business Opportunity
            </h1>
            <p className="text-lg text-white/85 leading-relaxed mb-8 max-w-2xl mx-auto">
              Every unanswered call is a lead, a ticket, or a customer walking to a competitor. The LEDConnect AI Voice Agent answers every call, resolves routine requests, and turns live conversations into structured, actionable work — 24 hours a day.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg shadow-orange-500/25"
              >
                <Bot className="w-4 h-4" /> Book a Free Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={SITE.phoneTel}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm"
              >
                <Phone className="w-4 h-4" /> {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 1. The real cost of missed calls ===== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">The Real Cost</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What Missed Calls and Slow Follow-Up Actually Cost You
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Most businesses underestimate the price of a call that goes to voicemail. It isn't just one lost sale — it's the compounding cost of leads that never call back, customers who feel ignored, and revenue that quietly leaks out every single day.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <PhoneMissed className="w-7 h-7" />, title: "The Lead Never Calls Back", desc: "Most callers who reach voicemail simply hang up and dial the next name on the list. A missed call is often a permanently lost opportunity." },
              { icon: <Timer className="w-7 h-7" />, title: "Delay Kills Conversion", desc: "Response speed is the single biggest driver of whether a lead converts. Every hour of delay sharply reduces the odds of winning the business." },
              { icon: <TrendingDown className="w-7 h-7" />, title: "It Compounds Daily", desc: "A few missed calls a day becomes dozens of lost opportunities a month — an invisible line item that never shows up on a P&L but shapes your growth." },
            ].map((c) => (
              <div key={c.title} className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-12 h-12 rounded-lg bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] mb-4">
                  {c.icon}
                </div>
                <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. Tier-1 requests and technician time ===== */}
      <section className="py-20 lg:py-24 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">The Hidden Drain</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-5">
                Routine Tier-1 Requests Are Eating Your Team's Time
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Password resets. "Is my order ready?" "What are your hours?" "I need to reschedule." These are the low-complexity, high-volume calls that flood a service desk — and every one of them pulls a skilled technician or staff member away from work that actually requires their expertise.
              </p>
              <p className="text-slate-600 leading-relaxed">
                When your most capable people spend their day on repetitive Tier-1 requests, capacity shrinks, response times stretch, and the higher-value tickets — the ones only a human should handle — sit in the queue longer than they should.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center gap-2 text-[#0e319a] text-sm font-semibold uppercase tracking-wider mb-5">
                <Headset className="w-5 h-5 text-[#f97015]" /> Where the Hours Go
              </div>
              <ul className="space-y-4">
                {[
                  { label: "Repetitive status & scheduling questions", note: "Answered instantly by AI, freeing staff entirely" },
                  { label: "Password resets & basic how-to requests", note: "Resolved or routed without a technician touching them" },
                  { label: "After-hours and overflow calls", note: "Captured 24/7 instead of hitting voicemail" },
                  { label: "Complex, judgment-based tickets", note: "Escalated to your team with full context attached" },
                ].map((row) => (
                  <li key={row.label} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{row.label}</p>
                      <p className="text-xs text-slate-500">{row.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. What an AI voice agent actually does ===== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Beyond Voicemail</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What an AI Voice Agent Actually Does
            </h2>
            <p className="text-slate-600 leading-relaxed">
              A modern AI voice agent is not an answering machine and not a rigid phone tree. It holds a natural conversation, understands intent, and takes real action — resolving what it can and intelligently handing off what it can't.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <MessageSquare className="w-6 h-6" />, title: "Understands Natural Speech", desc: "Callers talk normally — no 'press 1' menus. The agent grasps intent, asks clarifying questions, and responds conversationally." },
              { icon: <CheckCircle2 className="w-6 h-6" />, title: "Resolves Routine Requests", desc: "Hours, directions, order status, appointment scheduling, and common FAQs are answered on the spot, start to finish." },
              { icon: <Users className="w-6 h-6" />, title: "Qualifies & Captures Leads", desc: "It collects name, number, and reason for calling, qualifies the opportunity, and delivers it to your CRM instantly." },
              { icon: <ShieldCheck className="w-6 h-6" />, title: "Blocks Spam & Robocalls", desc: "Telemarketers and robocalls are screened out before they ever reach a person, protecting your team's focus." },
              { icon: <Clock className="w-6 h-6" />, title: "Works 24/7/365", desc: "Nights, weekends, holidays, and overflow during the rush — every call is answered, every time." },
              { icon: <ArrowRight className="w-6 h-6" />, title: "Escalates Intelligently", desc: "When a call needs a human, it transfers live or captures a detailed callback request with full context." },
            ].map((f) => (
              <div key={f.title} className="p-6 bg-white rounded-xl border border-slate-200 hover:border-[#0e319a]/30 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-lg bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] mb-4">
                  {f.icon}
                </div>
                <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. Live call to structured PSA ticket ===== */}
      <section className="py-20 lg:py-24 bg-slate-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">From Conversation to Action</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How a Live Call Becomes a Structured PSA Ticket
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The real power isn't just answering — it's turning an unstructured phone conversation into clean, structured data your systems can act on automatically.
            </p>
          </div>
          <div className="space-y-6">
            {[
              { step: "01", title: "The Call Comes In", desc: "The AI answers immediately and greets the caller in your business's voice, day or night." },
              { step: "02", title: "It Captures the Details", desc: "Through natural conversation, it identifies the caller, the issue, the affected system or service, and the urgency — asking follow-up questions the way a trained agent would." },
              { step: "03", title: "It Structures the Data", desc: "The conversation is converted into clean fields: contact info, category, priority, and a clear summary of the request — no manual note-taking required." },
              { step: "04", title: "A Ticket Is Created", desc: "A structured ticket is opened directly in your PSA or ticketing system, correctly categorized and prioritized, ready for your team or automation to pick up." },
              { step: "05", title: "Everyone Stays in the Loop", desc: "The caller gets confirmation, your team gets a fully-documented ticket, and nothing falls through the cracks between the phone and the queue." },
            ].map((s) => (
              <div key={s.step} className="flex gap-6 items-start bg-white rounded-xl border border-slate-200 p-6">
                <div className="w-12 h-12 rounded-xl bg-[#0e319a] flex items-center justify-center text-white font-heading font-bold text-lg shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-slate-900 mb-1.5">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. Where AI voice agents fit on the service desk ===== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Practical Fit</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Where AI Voice Agents Fit Into Your Service Desk Today
            </h2>
            <p className="text-slate-600 leading-relaxed">
              You don't have to reinvent your operation. An AI voice agent slots into the gaps where calls are most likely to be missed or where routine volume is heaviest.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <PhoneMissed className="w-6 h-6" />, title: "After-Hours Coverage", desc: "The front line when your desk is closed — capturing and triaging every overnight and weekend call." },
              { icon: <LayoutGrid className="w-6 h-6" />, title: "Overflow Handling", desc: "Catches calls when every agent is busy, so peak-time callers never hit a busy signal or voicemail." },
              { icon: <Ticket className="w-6 h-6" />, title: "Tier-1 Deflection", desc: "Resolves password resets, status checks, and FAQs so humans handle only what truly needs them." },
              { icon: <Headset className="w-6 h-6" />, title: "Intelligent Triage", desc: "Routes and prioritizes incoming requests, delivering them to the right person or queue with context." },
            ].map((f) => (
              <div key={f.title} className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-12 h-12 rounded-lg bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] mb-4">
                  {f.icon}
                </div>
                <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. AI vs. hiring / overtime / answering services ===== */}
      <section className="py-20 lg:py-24 bg-slate-50">
        <div className="container max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">The Comparison</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              AI vs. More Staff, Overtime &amp; Answering Services
            </h2>
            <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto">
              An AI voice agent isn't about replacing your people — it's about covering the volume that hiring, overtime, and traditional answering services handle poorly or expensively.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-heading text-slate-500 font-semibold">Factor</th>
                  <th className="text-left py-4 px-4 font-heading text-slate-700 font-semibold">Hiring More Staff</th>
                  <th className="text-left py-4 px-4 font-heading text-slate-700 font-semibold">Overtime</th>
                  <th className="text-left py-4 px-4 font-heading text-slate-700 font-semibold">Answering Service</th>
                  <th className="text-left py-4 px-4 font-heading text-[#0e319a] font-bold">AI Voice Agent</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {[
                  ["Availability", "Business hours + shifts", "Limited, burns out staff", "24/7 but generic", "24/7, always consistent"],
                  ["Cost to scale", "High — salary + benefits", "Expensive premium pay", "Per-minute / per-call fees", "Flat, predictable monthly"],
                  ["Handles volume spikes", "No — fixed headcount", "Only if people say yes", "Callers wait on hold", "Unlimited concurrent calls"],
                  ["Creates structured tickets", "Manual entry", "Manual entry", "Takes a message only", "Auto-structured PSA tickets"],
                  ["Consistency", "Varies by person/day", "Worse when tired", "Reads from a script", "Identical every call"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{row[0]}</td>
                    <td className="py-3.5 px-4">{row[1]}</td>
                    <td className="py-3.5 px-4">{row[2]}</td>
                    <td className="py-3.5 px-4">{row[3]}</td>
                    <td className="py-3.5 px-4 bg-[#0e319a]/5 text-slate-900 font-medium">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-3 justify-center mt-8 text-sm text-slate-500">
            <Scale className="w-5 h-5 text-[#f97015]" />
            The goal is the right mix — AI for volume and consistency, your team for judgment and relationships.
          </div>
        </div>
      </section>

      {/* ===== 7. What to look for when evaluating ===== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Buyer's Guide</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What to Look For When Evaluating an AI Voice Solution
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Not all AI voice agents are created equal. As you compare options, weigh these factors carefully.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              { title: "Natural conversation quality", desc: "Can it handle interruptions, accents, and follow-up questions — or does it break the moment a caller goes off-script?" },
              { title: "Real integrations", desc: "Does it push structured data into your CRM, PSA, or ticketing system, or does it just email you a transcript?" },
              { title: "Smart escalation", desc: "When it hits its limits, does it transfer or capture context cleanly, or leave the caller stuck?" },
              { title: "Customization & control", desc: "Can you shape the scripts, greetings, and workflows to match how your business actually operates?" },
              { title: "Security & compliance", desc: "How is caller data handled and stored? This matters especially for medical, legal, and financial businesses." },
              { title: "Local support & setup", desc: "Is there a real partner who configures it for your business and stands behind it — or are you on your own?" },
            ].map((c) => (
              <div key={c.title} className="flex items-start gap-3 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <ClipboardCheck className="w-5 h-5 text-[#0e319a] mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-heading text-base font-semibold text-slate-900 mb-1">{c.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. Start with one use case, expand ===== */}
      <section className="py-20 lg:py-24 bg-slate-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Getting Started</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Start With One Focused Use Case, Then Expand
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The smartest deployments don't try to automate everything on day one. They pick one high-impact, well-defined use case, prove the value, and grow from there.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <Rocket className="w-7 h-7" />, phase: "Phase 1", title: "Pick One Win", desc: "Start where the pain is clearest — usually after-hours answering or Tier-1 deflection. Narrow scope, fast results." },
              { icon: <TrendingDown className="w-7 h-7" />, phase: "Phase 2", title: "Measure & Tune", desc: "Watch resolution rates, captured leads, and deflected calls. Refine the scripts and workflows based on real conversations." },
              { icon: <LayoutGrid className="w-7 h-7" />, phase: "Phase 3", title: "Expand Coverage", desc: "Once it's proven, extend the agent to more call types, more hours, and deeper integrations with confidence." },
            ].map((c) => (
              <div key={c.phase} className="p-6 bg-white rounded-xl border border-slate-200 text-center">
                <div className="w-14 h-14 rounded-xl bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] mx-auto mb-4">
                  {c.icon}
                </div>
                <p className="text-xs font-semibold text-[#f97015] uppercase tracking-wider mb-1">{c.phase}</p>
                <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-20 bg-gradient-to-r from-[#0e319a] to-[#1a42b8]">
        <div className="container text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            See the LEDConnect AI Voice Agent in Action
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
            Book a free, no-pressure demo and we'll show you exactly how it would answer, resolve, and ticket your calls — tailored to your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-lg">
              <Bot className="w-4 h-4" /> Book Your Free Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={SITE.phoneTel} className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm">
              <Phone className="w-4 h-4" /> Call {SITE.phone}
            </a>
          </div>
          <p className="text-xs text-white/50 mt-6">
            Prefer the full product details, pricing, and FAQ?{" "}
            <Link href="/services/ai-voice-agent" className="underline hover:text-white/80">See the LEDConnect AI Voice Agent service page</Link>.
          </p>
        </div>
      </section>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "LEDConnect AI Voice Agent", item: `${SITE.url}/ai-voice-agent` },
            ],
          }),
        }}
      />
    </>
  );
}
