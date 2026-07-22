import { useState } from "react";
import { Shield, CheckCircle, Download, Phone, Star, Award, Users } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { SITE } from "../lib/siteData";

interface FormData {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
}

const CHECKLIST_ITEMS = [
  { category: "Video Surveillance", items: ["4K / low-light camera coverage", "AI license plate & person detection", "Cloud-backed video storage"] },
  { category: "Access Control", items: ["Keycard / mobile credential management", "Instant remote access revocation", "Video-verified entry logs"] },
  { category: "Fire Alarm & Life Safety", items: ["NFPA 72 compliance status", "Annual licensed inspection record", "Central station monitoring"] },
  { category: "Communication & Jobsite", items: ["VoIP failover for power outages", "Solar-powered jobsite camera coverage", "24/7 AI call answering"] },
];

const TRUST_ITEMS = [
  { icon: Star, label: "5.0 Google Rating", sub: "32+ verified reviews" },
  { icon: Award, label: "NJ DCA Licensed", sub: "#34BF00056900" },
  { icon: Users, label: "500+ Clients", sub: "South Jersey & Delaware Valley" },
];

export default function SecurityAudit() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json() as { error?: string };
        throw new Error(data.error || "Submission failed");
      }

      setSubmitted(true);
      // Trigger PDF download automatically
      const link = document.createElement("a");
      link.href = "/downloads/commercial-security-audit-checklist.pdf";
      link.download = "YouNeedLED-Commercial-Security-Audit-Checklist.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call us at " + SITE.phone
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Free Commercial Security Audit Checklist | You Need L.E.D. South Jersey"
        description="Download the free 10-point commercial security audit checklist for South Jersey business owners. Identify hidden vulnerabilities in your cameras, access control, and fire alarms."
        canonical="/free-security-audit"
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e319a] py-16 lg:py-24">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            Free Download — No Credit Card Required
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Is Your South Jersey Business<br className="hidden sm:block" /> a Security Target?
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Download the <strong className="text-white">Free 10-Point Commercial Security Audit Checklist</strong> and find out in under 2 minutes. Used by 500+ local business owners.
          </p>
          {/* Trust bar */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-2 text-white/90">
                <Icon className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-sm font-bold">{label}</div>
                  <div className="text-xs text-white/60">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left — What's Inside */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">
                What's Inside the Checklist
              </h2>
              <p className="text-slate-600 mb-8">
                Our licensed technicians condensed 15+ years of on-site evaluations into this 10-point self-assessment. If you answer "No" or "Unsure" to more than two questions, your property may be at risk.
              </p>

              <div className="space-y-6">
                {CHECKLIST_ITEMS.map(({ category, items }) => (
                  <div key={category} className="bg-white rounded-xl border border-slate-200 p-5">
                    <h3 className="font-semibold text-[#0e319a] text-sm uppercase tracking-wide mb-3">
                      {category}
                    </h3>
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-[#0e319a]/5 border border-[#0e319a]/20 rounded-xl">
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Prefer to talk to a person?</strong> Call Derek and the team directly at{" "}
                  <a href={SITE.phoneTel} className="text-[#0e319a] font-bold hover:underline">
                    {SITE.phone}
                  </a>
                  . We offer free on-site security evaluations for commercial properties throughout South Jersey and the Delaware Valley.
                </p>
              </div>
            </div>

            {/* Right — Form or Thank You */}
            <div className="lg:sticky lg:top-8">
              {!submitted ? (
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#0e319a] rounded-lg flex items-center justify-center">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-bold text-slate-900">Get Your Free Checklist</h2>
                      <p className="text-sm text-slate-500">Instant PDF download</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0e319a]/20 focus:border-[#0e319a] outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Smith"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0e319a]/20 focus:border-[#0e319a] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Business Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        required
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Acme Properties LLC"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0e319a]/20 focus:border-[#0e319a] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@yourbusiness.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0e319a]/20 focus:border-[#0e319a] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Phone <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(609) 555-0000"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0e319a]/20 focus:border-[#0e319a] outline-none transition-colors"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#0e319a] hover:bg-[#0c2a87] text-white font-bold py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download My Free Checklist
                        </>
                      )}
                    </button>

                    <p className="text-xs text-slate-400 text-center">
                      No spam. We'll only reach out if you want a free on-site evaluation.
                    </p>
                  </form>
                </div>
              ) : (
                /* ── Thank You State ── */
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">
                    Your Checklist Is Downloading!
                  </h2>
                  <p className="text-slate-600 mb-6">
                    If the download didn't start automatically,{" "}
                    <a
                      href="/downloads/commercial-security-audit-checklist.pdf"
                      download="YouNeedLED-Commercial-Security-Audit-Checklist.pdf"
                      className="text-[#0e319a] font-semibold hover:underline"
                    >
                      click here to download it
                    </a>
                    .
                  </p>
                  <div className="bg-slate-50 rounded-xl p-5 text-left mb-6">
                    <p className="text-sm font-semibold text-slate-800 mb-2">What happens next?</p>
                    <p className="text-sm text-slate-600">
                      Run through the checklist on your property. If you answer "No" or "Unsure" to more than two questions, reach out and we'll schedule a <strong>free on-site security evaluation</strong> — no obligation.
                    </p>
                  </div>
                  <a
                    href={SITE.phoneTel}
                    className="inline-flex items-center gap-2 bg-[#0e319a] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#0c2a87] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call {SITE.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#0e319a]">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Skip the Checklist and Get a Pro Evaluation?
          </h2>
          <p className="text-white/80 mb-8">
            Our NJ DCA Licensed technicians will walk your property and give you an honest, no-pressure assessment of your current security posture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SITE.phoneTel}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0e319a] font-bold px-8 py-3.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {SITE.phone}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-bold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              Request a Free Quote
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
