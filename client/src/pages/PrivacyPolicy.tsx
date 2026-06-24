/*
 * Privacy Policy Page — YouNeedLED
 * GDPR / CCPA compliant privacy policy for You Need L.E.D. LLC
 */
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { Phone } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy | You Need L.E.D. — South Jersey Security & Technology"
        description="Privacy Policy for You Need L.E.D. LLC. Learn how we collect, use, and protect your personal information when you use our website and services."
        canonical="/privacy-policy"
      />

      {/* Hero */}
      <section className="py-16 lg:py-20 bg-[#0e319a]">
        <div className="container text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-5">
            Privacy Policy
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            You Need L.E.D. LLC — How We Handle Your Information
          </p>
          <p className="text-sm text-white/60 mt-3">
            Effective Date: January 1, 2025 &nbsp;|&nbsp; Last Updated: June 1, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container max-w-4xl">

          {/* Intro */}
          <div className="prose prose-slate max-w-none mb-10">
            <p className="text-slate-700 leading-relaxed">
              You Need L.E.D. LLC ("Company," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit our website{" "}
              <a href="https://www.youneedled.com" className="text-[#0e319a]">www.youneedled.com</a> or contact us
              about our security camera, fire alarm, access control, VoIP, and related technology services.
            </p>
            <p className="text-slate-700 leading-relaxed mt-4">
              Please read this policy carefully. If you disagree with its terms, please discontinue use of our website.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-12">
            <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Table of Contents</h2>
            <ol className="space-y-1 text-sm text-[#0e319a] list-decimal list-inside">
              {[
                "Information We Collect",
                "How We Use Your Information",
                "Sharing Your Information",
                "Cookies and Tracking Technologies",
                "Data Retention",
                "Your Rights and Choices",
                "Security of Your Information",
                "Third-Party Websites",
                "Children's Privacy",
                "Changes to This Policy",
                "Contact Us",
              ].map((item, i) => (
                <li key={i} className="hover:underline cursor-pointer">{item}</li>
              ))}
            </ol>
          </div>

          {/* Sections */}
          <div className="space-y-10">

            <PolicySection number="1" title="Information We Collect">
              <p>We may collect the following types of information:</p>
              <ul>
                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, business name, and mailing address — collected when you fill out a contact form, request a quote, or call us.</li>
                <li><strong>SMS & Text Messaging Data:</strong> If you opt-in to receive text messages from us, we collect your mobile phone number and a record of your consent.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, operating system, referring URLs, and pages visited — collected automatically via Google Analytics and standard web server logs.</li>
                <li><strong>Communications:</strong> Records of emails, phone calls, or messages you send us, including any information you voluntarily provide.</li>
                <li><strong>Service Data:</strong> Information related to the security systems, VoIP services, or technology installations we provide to you as a customer.</li>
              </ul>
            </PolicySection>

            <PolicySection number="2" title="How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your inquiries and provide quotes for our services</li>
                <li>Schedule and perform security camera, fire alarm, access control, VoIP, and related installations</li>
                <li>Send service-related communications, invoices, and appointment reminders</li>
                <li>Improve our website and services based on usage data</li>
                <li>Comply with legal obligations and protect against fraud</li>
                <li>Send occasional marketing communications (you may opt out at any time)</li>
                <li>Send SMS/text messages regarding service updates, appointment reminders, and customer support (only if you have opted in)</li>
              </ul>
              <p>We do <strong>not</strong> sell your personal information to third parties.</p>
            </PolicySection>

            <PolicySection number="3" title="Sharing Your Information">
              <p>We may share your information with:</p>
              <ul>
                <li><strong>Service Providers:</strong> Trusted third-party vendors who assist us in operating our website, processing payments, or delivering services (e.g., CRM software, email platforms, monitoring centers). These parties are contractually obligated to keep your information confidential.</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority.</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of company assets, your information may be transferred as a business asset.</li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-blue-800 text-sm"><strong>SMS Privacy Commitment:</strong> We respect your privacy regarding text messaging. We explicitly do not sell, rent, or share your mobile phone number, SMS consent data, or text messaging history with any third parties or affiliates for marketing or promotional purposes. Your phone number is used strictly for the service-related communications you opted into.</p>
              </div>
            </PolicySection>

            <PolicySection number="4" title="Cookies and Tracking Technologies">
              <p>
                Our website uses Google Analytics to understand how visitors interact with our site. Google Analytics uses cookies —
                small text files stored on your device — to collect anonymous usage data such as pages visited, time on site, and
                traffic sources.
              </p>
              <p className="mt-3">
                You can opt out of Google Analytics tracking by installing the{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#0e319a] underline">
                  Google Analytics Opt-out Browser Add-on
                </a>.
                You can also control cookies through your browser settings.
              </p>
            </PolicySection>

            <PolicySection number="5" title="Data Retention">
              <p>
                We retain personal information for as long as necessary to fulfill the purposes outlined in this policy,
                provide ongoing services, comply with legal obligations, and resolve disputes. Customer service records are
                typically retained for a minimum of 7 years in accordance with standard business practices.
              </p>
            </PolicySection>

            <PolicySection number="6" title="Your Rights and Choices">
              <p>Depending on your location, you may have the following rights:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> Request that we correct inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> Request that we delete your personal information, subject to certain legal exceptions.</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time by clicking "unsubscribe" in any email or contacting us directly.</li>
                <li><strong>Do Not Sell:</strong> We do not sell personal information. No opt-out is required.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:info@youneedled.com" className="text-[#0e319a]">info@youneedled.com</a> or call{" "}
                <a href="tel:+16093350123" className="text-[#0e319a]">(609) 335-0123</a>.
              </p>
            </PolicySection>

            <PolicySection number="7" title="Security of Your Information">
              <p>
                We implement industry-standard technical and organizational security measures to protect your personal information
                from unauthorized access, disclosure, alteration, or destruction. These include encrypted communications (HTTPS),
                access controls, and secure data storage practices.
              </p>
              <p className="mt-3">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to
                protect your information, we cannot guarantee absolute security.
              </p>
            </PolicySection>

            <PolicySection number="8" title="Third-Party Websites">
              <p>
                Our website may contain links to third-party websites (such as Google, Facebook, or partner platforms).
                We are not responsible for the privacy practices of those sites and encourage you to review their privacy
                policies before providing any personal information.
              </p>
            </PolicySection>

            <PolicySection number="9" title="Children's Privacy">
              <p>
                Our website and services are not directed to children under the age of 13. We do not knowingly collect
                personal information from children. If you believe we have inadvertently collected information from a child,
                please contact us immediately and we will take steps to delete it.
              </p>
            </PolicySection>

            <PolicySection number="10" title="Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal
                requirements. We will post the updated policy on this page with a revised "Last Updated" date. Your continued
                use of our website after any changes constitutes your acceptance of the updated policy.
              </p>
            </PolicySection>

            <PolicySection number="11" title="Contact Us">
              <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
              <div className="mt-4 bg-slate-50 rounded-xl border border-slate-200 p-6">
                <p className="font-bold text-slate-900">You Need L.E.D. LLC</p>
                <p className="text-slate-700">199 New Rd Ste 61, Linwood, NJ 08221</p>
                <p className="text-slate-700 mt-1">
                  Phone: <a href="tel:+16093350123" className="text-[#0e319a]">(609) 335-0123</a>
                </p>
                <p className="text-slate-700">
                  Email: <a href="mailto:info@youneedled.com" className="text-[#0e319a]">info@youneedled.com</a>
                </p>
                <p className="text-slate-700">
                  Website: <a href="https://www.youneedled.com" className="text-[#0e319a]">www.youneedled.com</a>
                </p>
              </div>
            </PolicySection>

          </div>

          {/* CTA */}
          <div className="mt-16 bg-[#0e319a] rounded-2xl p-8 text-center text-white">
            <h2 className="font-heading text-2xl font-bold mb-3">Questions? We're Here to Help.</h2>
            <p className="text-white/80 mb-6">
              Our team is available Monday–Friday 8AM–6PM and Saturday 9AM–2PM.
            </p>
            <a
              href="tel:+16093350123"
              className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold px-8 py-3 rounded-full transition-colors"
            >
              <Phone className="w-4 h-4" />
              (609) 335-0123
            </a>
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-[#0e319a] hover:underline text-sm">
              ← Back to Home
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}

// ─── Helper component ────────────────────────────────────────────────────────
function PolicySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-heading text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0e319a] text-white text-sm font-bold flex items-center justify-center">
          {number}
        </span>
        {title}
      </h2>
      <div className="text-slate-700 leading-relaxed space-y-3 pl-11 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:text-[#0e319a] [&_a]:underline">
        {children}
      </div>
    </div>
  );
}
