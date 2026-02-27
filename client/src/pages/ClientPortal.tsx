/*
 * Client Portal — YouNeedLED
 * Customer access portal for Digital Signage, Phone System, Port-Out, and Alarm Contract
 */
import SEOHead from "@/components/SEOHead";
import { SITE } from "@/lib/siteData";
import {
  Monitor, Phone, ArrowUpRight, FileText, Shield,
  ExternalLink, HelpCircle, Mail
} from "lucide-react";

const portals = [
  {
    title: "Digital Signage Portal",
    description: "Access your LEDConnect digital signage management dashboard. Upload content, schedule displays, and manage your screens remotely.",
    icon: <Monitor className="w-7 h-7" />,
    url: "https://ledconnect.app",
    buttonText: "Open Signage Portal",
    color: "bg-blue-50 text-[#0e319a]",
  },
  {
    title: "Phone System Portal",
    description: "Manage your hosted PBX system. Configure extensions, voicemail, call routing, auto-attendants, and view call analytics.",
    icon: <Phone className="w-7 h-7" />,
    url: "https://portal.ledconnect.app",
    buttonText: "Open Phone Portal",
    color: "bg-orange-50 text-[#f97015]",
  },
  {
    title: "Port-Out Request",
    description: "Need to transfer your phone number to another provider? Submit a port-out request and our team will process it promptly.",
    icon: <ArrowUpRight className="w-7 h-7" />,
    url: "mailto:support@youneedled.com?subject=Port-Out%20Request",
    buttonText: "Submit Port-Out Request",
    color: "bg-purple-50 text-purple-700",
  },
  {
    title: "Alarm Contract Request",
    description: "Request a copy of your alarm monitoring contract, make changes to your monitoring service, or update your emergency contact list.",
    icon: <FileText className="w-7 h-7" />,
    url: "mailto:support@youneedled.com?subject=Alarm%20Contract%20Request",
    buttonText: "Request Contract",
    color: "bg-green-50 text-green-700",
  },
];

export default function ClientPortal() {
  return (
    <>
      <SEOHead
        title="Client Portal | Access Your Services"
        description="Access your You Need L.E.D. customer portals for digital signage, phone systems, port-out requests, and alarm contracts."
        canonical="/client-portal"
      />

      {/* Hero */}
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

      {/* Portal Cards */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-6">
            {portals.map((portal) => (
              <div key={portal.title} className="p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-lg transition-all group">
                <div className={`w-14 h-14 rounded-xl ${portal.color} flex items-center justify-center mb-5`}>
                  {portal.icon}
                </div>
                <h2 className="font-heading text-lg font-bold text-slate-900 mb-2">{portal.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">{portal.description}</p>
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0e319a] text-white text-sm font-semibold rounded-lg hover:bg-[#0c2a82] transition-colors"
                >
                  {portal.buttonText} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container max-w-3xl text-center">
          <HelpCircle className="w-12 h-12 text-[#0e319a] mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">Need Help?</h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            If you're having trouble accessing your portal or need technical assistance, our support team is here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={SITE.phoneTel}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0e319a] text-white font-semibold rounded-lg hover:bg-[#0c2a82] transition-colors text-sm"
            >
              <Phone className="w-4 h-4" /> {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0e319a] font-semibold rounded-lg hover:bg-slate-100 transition-colors border border-slate-200 text-sm"
            >
              <Mail className="w-4 h-4" /> {SITE.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
