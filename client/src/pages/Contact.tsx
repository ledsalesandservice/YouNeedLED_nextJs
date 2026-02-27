/*
 * Contact Page — YouNeedLED
 */
import { SITE } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll be in touch within 24 hours.", {
      description: "For immediate assistance, call " + SITE.phone,
    });
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <>
      <SEOHead
        title="Contact You Need L.E.D. | Free Security Quote"
        description="Contact You Need L.E.D. for a free security assessment. Call (609) 335-0123 or visit us at 199 New Rd Ste 61, Linwood, NJ 08221. 24/7 emergency support."
        canonical="/contact"
      />
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-[#0e319a]">
        <div className="container text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-5">Contact Us</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Ready to secure your property? Get a free quote or schedule a consultation with our licensed team.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                    <input
                      type="text" required value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0e319a]/20 focus:border-[#0e319a] outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                    <input
                      type="email" required value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0e319a]/20 focus:border-[#0e319a] outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                    <input
                      type="tel" value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0e319a]/20 focus:border-[#0e319a] outline-none transition-colors"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Needed</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0e319a]/20 focus:border-[#0e319a] outline-none transition-colors bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="cameras">Security Cameras</option>
                      <option value="access">Access Control</option>
                      <option value="fire">Fire Alarm Systems</option>
                      <option value="intrusion">Intrusion Detection</option>
                      <option value="voip">VoIP Phone System</option>
                      <option value="ai-voice">LEDConnect AI Voice Agent</option>
                      <option value="jobsite">Jobsite Security</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Message *</label>
                  <textarea
                    required rows={5} value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0e319a]/20 focus:border-[#0e319a] outline-none transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm shadow-sm"
                >
                  Send Message <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">Phone</h3>
                    <a href={SITE.phoneTel} className="text-sm text-[#0e319a] font-medium hover:underline">{SITE.phone}</a>
                    <p className="text-xs text-slate-500 mt-0.5">24/7 Emergency Support Available</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">Email</h3>
                    <a href={`mailto:${SITE.email}`} className="text-sm text-[#0e319a] font-medium hover:underline">{SITE.email}</a>
                    <p className="text-xs text-slate-500 mt-0.5">We respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">Office</h3>
                    <p className="text-sm text-slate-700">{SITE.address.full}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Serving the Tri-State Area</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">Business Hours</h3>
                    <p className="text-sm text-slate-700">{SITE.hours.weekday}</p>
                    <p className="text-sm text-slate-700">{SITE.hours.saturday}</p>
                    <p className="text-sm text-slate-700">{SITE.hours.sunday}</p>
                  </div>
                </div>
              </div>

              {/* License info */}
              <div className="mt-8 p-5 bg-slate-50 rounded-xl">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Licenses</h3>
                <p className="text-xs text-slate-600 mb-1">{SITE.license}</p>
                <p className="text-xs text-slate-600">{SITE.fireLicense}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
