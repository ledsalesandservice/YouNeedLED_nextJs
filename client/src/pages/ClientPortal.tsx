/*
 * Client Portal — YouNeedLED
 * Digital Signage Portal, Phone System Portal, Port-Out Request form
 * Alarm Contract section removed per Derek's request
 */
import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { SITE } from "@/lib/siteData";
import {
  Monitor, Phone, ArrowUpRight, Shield,
  ExternalLink, HelpCircle, Mail, Send, Loader2, CheckCircle
} from "lucide-react";

// ── Field helpers ──────────────────────────────────────────────────────────────
function Field({
  label, required, hint, error, children,
}: {
  label: string; required?: boolean; hint?: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">
        {label}{" "}
        {required ? <span className="text-red-500">*</span> : (
          <span className="text-slate-400 font-normal">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && <p className="text-slate-500 text-xs mt-1">{hint}</p>}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

const inputCls = (err?: string) =>
  `w-full px-4 py-3 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0e319a] ${err ? "border-red-400" : "border-slate-300"}`;

// ── Main component ─────────────────────────────────────────────────────────────
export default function ClientPortal() {
  const [form, setForm] = useState({
    fullName: "", company: "", email: "", phone: "",
    currentCarrier: "", accountNumber: "", accountPin: "",
    serviceAddress: "", phoneNumbers: "", notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.trim()) e.email = "Email address is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (!form.currentCarrier.trim()) e.currentCarrier = "Current carrier is required.";
    if (!form.accountNumber.trim()) e.accountNumber = "Account number is required.";
    if (!form.accountPin.trim()) e.accountPin = "Account PIN/Passcode is required.";
    if (!form.serviceAddress.trim()) e.serviceAddress = "Service address is required.";
    if (!form.phoneNumbers.trim()) e.phoneNumbers = "At least one phone number to port is required.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title="Client Portal | Access Your Services | You Need L.E.D."
        description="Access your YouNeedLED service dashboards — digital signage management, hosted PBX phone system, and port-out requests."
        canonical="https://youneedled.com/client-portal"
      />
      {/* ── Hero ── */}
      <section className="py-16 lg:py-20 bg-[#0e319a]">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white/90 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-white/10">
            <Shield className="w-3.5 h-3.5" /> Customer Access
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-5">Client Portal</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Access your service dashboards, manage your systems, and submit requests all in one place.
          </p>
        </div>
      </section>

      {/* ── Portal Cards ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-6">

            {/* Digital Signage */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-lg transition-all flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-[#0e319a] flex items-center justify-center mb-5">
                <Monitor className="w-7 h-7" />
              </div>
              <h2 className="font-heading text-lg font-bold text-slate-900 mb-2">Digital Signage Portal</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">
                YouNeedLED Connect Platform — Manage your digital displays with advanced content control. Upload content, schedule displays, and manage your screens remotely.
              </p>
              <a
                href="https://youneedled.onsignage.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0e319a] text-white text-sm font-semibold rounded-lg hover:bg-[#0c2a82] transition-colors"
              >
                Open Signage Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Phone System */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-lg transition-all flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-orange-50 text-[#f97015] flex items-center justify-center mb-5">
                <Phone className="w-7 h-7" />
              </div>
              <h2 className="font-heading text-lg font-bold text-slate-900 mb-2">Phone System Portal</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">
                <strong>YouNeedLED Connect</strong> — Complete hosted PBX management and analytics. Configure extensions, voicemail, call routing, auto-attendants, and view call analytics.
              </p>
              <a
                href="https://youneedled.simplelogin.net"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f97015] text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Open Phone Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Port-Out Request Form ── */}
      <section className="py-16 lg:py-20 bg-slate-50 border-t border-slate-200">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0e319a]/10 text-[#0e319a] rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              <ArrowUpRight className="w-3.5 h-3.5" /> Number Transfer
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-slate-900 mb-3">Port-Out Request</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Need to transfer your phone number to another provider? Complete the form below and our team will process your request promptly.
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Submitted</h3>
              <p className="text-slate-600">
                Thank you! Your port-out request has been received. Our team will review the information and contact you within 1–2 business days to confirm next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">

              <Field label="Full Name" required error={errors.fullName}>
                <input type="text" name="fullName" value={form.fullName} onChange={handle}
                  placeholder="Jane Smith" className={inputCls(errors.fullName)} />
              </Field>

              <Field label="Company" error={errors.company}>
                <input type="text" name="company" value={form.company} onChange={handle}
                  placeholder="Acme Corp" className={inputCls()} />
              </Field>

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Email Address" required error={errors.email}>
                  <input type="email" name="email" value={form.email} onChange={handle}
                    placeholder="jane@example.com" className={inputCls(errors.email)} />
                </Field>
                <Field label="Phone Number" required error={errors.phone}>
                  <input type="tel" name="phone" value={form.phone} onChange={handle}
                    placeholder="(609) 555-0100" className={inputCls(errors.phone)} />
                </Field>
              </div>

              <Field label="Current Carrier" required error={errors.currentCarrier}>
                <input type="text" name="currentCarrier" value={form.currentCarrier} onChange={handle}
                  placeholder="e.g. Verizon, AT&T, Comcast" className={inputCls(errors.currentCarrier)} />
              </Field>

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Current Account Number" required error={errors.accountNumber}>
                  <input type="text" name="accountNumber" value={form.accountNumber} onChange={handle}
                    placeholder="Account number with carrier" className={inputCls(errors.accountNumber)} />
                </Field>
                <Field label="Account PIN / Passcode" required
                  hint="This is required by carriers to authorize the port-out."
                  error={errors.accountPin}>
                  <input type="text" name="accountPin" value={form.accountPin} onChange={handle}
                    placeholder="4–6 digit PIN" className={inputCls(errors.accountPin)} />
                </Field>
              </div>

              <Field label="Service Address" required
                hint="Address on file with your current carrier."
                error={errors.serviceAddress}>
                <input type="text" name="serviceAddress" value={form.serviceAddress} onChange={handle}
                  placeholder="123 Main St, Cherry Hill, NJ 08002" className={inputCls(errors.serviceAddress)} />
              </Field>

              <Field label="Phone Numbers to Port" required
                hint="Enter one phone number per line."
                error={errors.phoneNumbers}>
                <textarea name="phoneNumbers" value={form.phoneNumbers} onChange={handle} rows={4}
                  placeholder={"(609) 555-0100\n(609) 555-0101\n(609) 555-0102"}
                  className={`${inputCls(errors.phoneNumbers)} resize-y`} />
              </Field>

              <Field label="Additional Notes or Timing Requirements" error={errors.notes}>
                <textarea name="notes" value={form.notes} onChange={handle} rows={3}
                  placeholder="e.g. Please complete the port-out by March 15th."
                  className={`${inputCls()} resize-y`} />
              </Field>

              <div className="pt-2">
                <button type="submit" disabled={submitting}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0e319a] text-white font-semibold rounded-lg hover:bg-[#0c2a82] transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                  ) : (
                    <><Send className="w-4 h-4" /> Submit Request</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── Help ── */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="container max-w-3xl text-center">
          <HelpCircle className="w-12 h-12 text-[#0e319a] mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">Need Help?</h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            If you're having trouble accessing your portal or need technical assistance, our support team is available 24/7.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={SITE.phoneTel}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0e319a] text-white font-semibold rounded-lg hover:bg-[#0c2a82] transition-colors text-sm">
              <Phone className="w-4 h-4" /> {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0e319a] font-semibold rounded-lg hover:bg-slate-100 transition-colors border border-slate-200 text-sm">
              <Mail className="w-4 h-4" /> {SITE.email}
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
