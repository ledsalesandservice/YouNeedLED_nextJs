/*
 * Terms of Service Page — YouNeedLED
 * Business Services Agreement
 */
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { Phone } from "lucide-react";

export default function TermsOfService() {
  return (
    <>
      <SEOHead
        title="Terms of Service | You Need L.E.D. Business Services Agreement"
        description="Read the You Need L.E.D. Business Services Agreement covering VoIP, security cameras, access control, fire alarms, and technology services for South Jersey businesses."
        canonical="/terms-of-service"
      />

      {/* Hero */}
      <section className="py-16 lg:py-20 bg-[#0e319a]">
        <div className="container text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-5">
            Business Services Agreement
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            You Need L.E.D. LLC — Terms of Service
          </p>
          <p className="text-sm text-white/60 mt-3">
            Effective Date: January 1, 2025 &nbsp;|&nbsp; Last Updated: January 1, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container max-w-4xl">

          {/* Intro */}
          <div className="prose prose-slate max-w-none mb-10">
            <p className="text-slate-700 leading-relaxed">
              This You Need LED LLC Business Services Agreement ("Agreement") is entered into between You Need LED LLC
              ("Provider," "we," "us," or "our") and the customer identified on the Service Order ("Customer," "you," or "your").
            </p>
            <p className="text-slate-700 leading-relaxed mt-4">
              We're excited to partner with you at You Need LED to provide communication and security services for your business.
              This Agreement covers the services listed in your You Need LED Business Service Order Agreement, which may include
              VOIP Phone service, SIP phone service, IP Fax, Hosted PBX, Burglar alarms, Camera Systems, Digital signage,
              Sound Systems, and YouNeedLED Connect (collectively, the "Services").
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-12">
            <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Table of Contents</h2>
            <ol className="space-y-1 text-sm text-[#0e319a]">
              {[
                "Definitions",
                "Service Delivery",
                "Billing and Payments",
                "Term and Renewal",
                "Termination",
                "Liability and Warranties",
                "Voice Services",
                "Security Services",
                "Digital Signage",
                "YouNeedLED Connect",
                "General Provisions",
                "Contact Information",
              ].map((item, i) => (
                <li key={i}>
                  <a href={`#section-${i + 1}`} className="hover:underline">
                    {String(i + 1).padStart(2, "0")}. {item}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Section helper */}
          {[
            {
              id: "section-1",
              title: "1. Definitions",
              content: (
                <div className="space-y-4 text-sm text-slate-700">
                  <div><strong className="text-slate-900">1.1 Affiliate</strong><p>Any company that controls, is controlled by, or shares common control with You Need LED.</p></div>
                  <div><strong className="text-slate-900">1.2 Agreement</strong><p>This document plus your Service Order Agreement and any applicable attachments or addenda.</p></div>
                  <div><strong className="text-slate-900">1.3 You Need LED Equipment</strong><p>Equipment we provide to deliver your Services (phones, cameras, alarm systems, cables). Internal wiring you own is not included.</p></div>
                  <div><strong className="text-slate-900">1.4 Confidential Information</strong><p>Sensitive business information marked "confidential" or reasonably understood as private, including this Agreement and pricing information.</p></div>
                  <div><strong className="text-slate-900">1.5 Customer-Provided Equipment</strong><p>Any equipment you supply to use with our Services.</p></div>
                  <div><strong className="text-slate-900">1.6 Licensed Software</strong><p>Software we provide for using the Services, including updates.</p></div>
                  <div><strong className="text-slate-900">1.7 Service(s)</strong><p>The VOIP Phone, SIP phone, IP Fax, Hosted PBX, Burglar alarms, Camera Systems, Digital signage, Sound Systems, and YouNeedLED Connect services you've ordered, for commercial use unless otherwise stated.</p></div>
                  <div><strong className="text-slate-900">1.8 Service Commencement Date</strong><p>The day we first make a Service available to you.</p></div>
                  <div><strong className="text-slate-900">1.9 Service Order</strong><p>Your request for Services at specific locations, submitted on our form or online system.</p></div>
                  <div><strong className="text-slate-900">1.10 Service Location(s)</strong><p>The physical location(s) where we provide your Services.</p></div>
                  <div><strong className="text-slate-900">1.11 Service Term</strong><p>The length of time you've agreed to use a Service, starting from the Service Commencement Date.</p></div>
                  <div><strong className="text-slate-900">1.12 Tariff</strong><p>Any applicable federal or state You Need LED tariff, or its replacement if tariffs are phased out.</p></div>
                  <div><strong className="text-slate-900">1.13 Termination Charges</strong><p>Fees owed if a Service is ended early, including 75% of remaining monthly fees plus any custom installation costs we covered.</p></div>
                  <div><strong className="text-slate-900">1.14 Out-of-Service Credit</strong><p>The credit issued for service outages as defined in Section 6.1.</p></div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="text-blue-800 text-sm"><strong>Licensed Services:</strong> We are licensed by the New Jersey Division of Consumer Affairs (License No. NJ DCA 34BF00056900) and maintain all required certifications.</p>
                  </div>
                </div>
              ),
            },
            {
              id: "section-2",
              title: "2. Service Delivery",
              content: (
                <div className="space-y-6 text-sm text-slate-700">
                  <div>
                    <strong className="text-slate-900">2.1 Ordering Services</strong>
                    <p className="mt-1">You submit a Service Order, which becomes effective when we accept it, start providing the Service, or begin custom setup work, whichever occurs first.</p>
                  </div>
                  <div>
                    <strong className="text-slate-900">2.2 Network Requirements</strong>
                    <p className="mt-1">You must provide and maintain a reliable internet connection. Service quality depends on your connection; we are not responsible for issues caused by your internet, power outages, or facility conditions.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Service Implementation</h4>
                      <ul className="space-y-1 text-slate-600">
                        {["Professional installation and setup","System configuration and testing","Staff training and documentation","Integration with existing systems","Performance optimization","Ongoing support activation"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span className="text-[#0e319a] mt-0.5">✓</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Customer Responsibilities</h4>
                      <ul className="space-y-1 text-slate-600">
                        {["Provide site access and readiness","Maintain reliable internet connection","Supply necessary facility information","Coordinate with building management","Ensure compliance with local codes","Participate in training sessions"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span className="text-[#0e319a] mt-0.5">✓</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "section-3",
              title: "3. Billing and Payments",
              content: (
                <div className="space-y-6 text-sm text-slate-700">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Payment Terms</h4>
                      <ul className="space-y-1 text-slate-600">
                        {["Payment terms specified in each Service Order","Monthly billing for ongoing services","Net 30 payment terms for qualified businesses","Deposits may be required for large projects","Late fees apply to overdue accounts","Right to suspend service for non-payment"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span className="text-[#0e319a] mt-0.5">✓</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Accepted Payment Methods</h4>
                      <ul className="space-y-1 text-slate-600">
                        {["Business checks","Credit cards (Visa, MasterCard, Amex)","ACH / electronic transfers","Wire transfers for large amounts","Financing options for qualified customers","Purchase orders for approved accounts"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span className="text-[#0e319a] mt-0.5">✓</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 text-sm"><strong>Transparent Pricing:</strong> All pricing is provided in writing before work begins, with no hidden fees or surprise charges. Scope changes will be approved in advance.</p>
                  </div>
                </div>
              ),
            },
            {
              id: "section-4",
              title: "4. Term and Renewal",
              content: (
                <div className="space-y-4 text-sm text-slate-700">
                  <div><strong className="text-slate-900">Service Terms</strong><p className="mt-1">Service terms vary by service type and are defined in your Service Order; most services are month-to-month unless otherwise specified.</p></div>
                  <div><strong className="text-slate-900">Automatic Renewal</strong><p className="mt-1">Services automatically renew for successive periods equal to the initial term unless either party provides written termination notice.</p></div>
                  <div><strong className="text-slate-900">Contract Terms</strong><p className="mt-1">Some services may require longer-term commitments for special pricing, with any early termination fees clearly specified in your Service Order.</p></div>
                </div>
              ),
            },
            {
              id: "section-5",
              title: "5. Termination",
              content: (
                <div className="space-y-4 text-sm text-slate-700">
                  <div><strong className="text-slate-900">Customer Termination</strong><p className="mt-1">You may terminate services with 30 days written notice; early termination of contract services may result in termination charges per your Service Order.</p></div>
                  <div><strong className="text-slate-900">Company Termination</strong><p className="mt-1">We may terminate services for non-payment, breach of terms, or other material violations, with notice as specified in your Service Agreement.</p></div>
                  <div>
                    <strong className="text-slate-900">Effect of Termination</strong>
                    <ul className="mt-2 space-y-1 text-slate-600">
                      {["Outstanding balances become immediately due","Monitoring and support services cease","Equipment ownership transfers per agreement terms","Termination charges may apply","Data return or destruction per privacy policy"].map((item, i) => (
                        <li key={i} className="flex items-start gap-2"><span className="text-[#0e319a] mt-0.5">•</span>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-amber-800 text-sm"><strong>Termination Charges:</strong> Early termination may result in charges including 75% of remaining monthly fees plus any custom installation costs we covered.</p>
                  </div>
                </div>
              ),
            },
            {
              id: "section-6",
              title: "6. Liability and Warranties",
              content: (
                <div className="space-y-4 text-sm text-slate-700">
                  <div><strong className="text-slate-900">Installation Warranty</strong><p className="mt-1">Comprehensive 2-year warranty on installation work, covering workmanship, system configuration, and integration between components.</p></div>
                  <div><strong className="text-slate-900">Equipment Warranty</strong><p className="mt-1">Equipment warranties are provided by manufacturers; we facilitate warranty claims and replacement coordination.</p></div>
                  <div><strong className="text-slate-900">Limitation of Liability</strong><p className="mt-1">Our total liability for any claim will not exceed the amount you paid for the specific service giving rise to the claim, and we are not liable for indirect, incidental, or consequential damages.</p></div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm"><strong>Insurance Coverage:</strong> We maintain comprehensive general liability and professional liability insurance.</p>
                  </div>
                </div>
              ),
            },
            {
              id: "section-7",
              title: "7. Voice Services",
              content: (
                <div className="space-y-4 text-sm text-slate-700">
                  <p>Voice services include VOIP Phone service, SIP phone service, IP Fax, and Hosted PBX solutions.</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Service Features</h4>
                      <ul className="space-y-1 text-slate-600">
                        {["Auto-attendant functionality","Voicemail-to-email","Call forwarding and routing","Conference calling","Mobile app integration","Call analytics and reporting"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span className="text-[#0e319a] mt-0.5">✓</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Service Requirements</h4>
                      <ul className="space-y-1 text-slate-600">
                        {["Reliable broadband internet connection","Compatible IP phones or softphones","Network QoS configuration","Adequate bandwidth for voice traffic","Power backup for critical phones","Network security compliance"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span className="text-[#0e319a] mt-0.5">✓</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "section-8",
              title: "8. Security Services",
              content: (
                <div className="space-y-4 text-sm text-slate-700">
                  <p>Security services include burglar alarms, camera systems, access control, and monitoring solutions.</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">System Capabilities</h4>
                      <ul className="space-y-1 text-slate-600">
                        {["24/7 professional monitoring","Mobile app remote access","AI-powered video analytics","Integration with access control","Emergency notification systems","Cloud storage and backup"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span className="text-[#0e319a] mt-0.5">✓</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Compliance &amp; Standards</h4>
                      <ul className="space-y-1 text-slate-600">
                        {["UL listed equipment and installation","Local fire department integration","ADA accessibility compliance","Insurance industry requirements","Regular testing and maintenance"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span className="text-[#0e319a] mt-0.5">✓</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "section-9",
              title: "9. Digital Signage",
              content: (
                <div className="space-y-4 text-sm text-slate-700">
                  <p>Digital signage solutions include LED displays, interactive kiosks, and content management systems.</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Content Management</h4>
                      <ul className="space-y-1 text-slate-600">
                        {["Cloud-based content management","Scheduled content updates","Multi-location synchronization","Template and design library","Real-time content modification","Performance analytics"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span className="text-[#0e319a] mt-0.5">✓</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Hardware Support</h4>
                      <ul className="space-y-1 text-slate-600">
                        {["Professional installation and mounting","Network connectivity setup","Power and cable management","Display calibration and optimization","Ongoing maintenance and support","Hardware warranty coverage"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span className="text-[#0e319a] mt-0.5">✓</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "section-10",
              title: "10. YouNeedLED Connect",
              content: (
                <div className="space-y-4 text-sm text-slate-700">
                  <p>YouNeedLED Connect is our integrated platform that unifies communication, security, and automation systems.</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Platform Features</h4>
                      <ul className="space-y-1 text-slate-600">
                        {["Unified dashboard interface","Cross-system integration","Centralized user management","Automated workflows and triggers","Comprehensive reporting","Mobile and web access"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span className="text-[#0e319a] mt-0.5">✓</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Service Benefits</h4>
                      <ul className="space-y-1 text-slate-600">
                        {["Simplified system management","Reduced training requirements","Enhanced operational efficiency","Improved incident response","Scalable architecture","Future-ready technology"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span className="text-[#0e319a] mt-0.5">✓</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "section-11",
              title: "11. General Provisions",
              content: (
                <div className="space-y-4 text-sm text-slate-700">
                  <div><strong className="text-slate-900">Governing Law</strong><p className="mt-1">This Agreement is governed by the laws of the State of New Jersey, without regard to conflict of law principles.</p></div>
                  <div><strong className="text-slate-900">Entire Agreement</strong><p className="mt-1">This Agreement and your Service Orders constitute the entire agreement and supersede all prior negotiations and representations.</p></div>
                  <div><strong className="text-slate-900">Modifications</strong><p className="mt-1">We may update this Agreement periodically, with material changes communicated by email or prominent notice on our website.</p></div>
                  <div><strong className="text-slate-900">Severability</strong><p className="mt-1">If any provision is found invalid or unenforceable, the remaining provisions remain in full force and effect.</p></div>
                </div>
              ),
            },
            {
              id: "section-12",
              title: "12. Contact Information",
              content: (
                <div className="space-y-4 text-sm text-slate-700">
                  <p>We're here to help with any questions about this Agreement or our services.</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Contact Us</h4>
                      <ul className="space-y-2 text-slate-600">
                        <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#0e319a]" /><a href="tel:6093350123" className="hover:text-[#0e319a]">(609) 335-0123</a></li>
                        <li><a href="https://youneedled.com/contact" className="text-[#0e319a] hover:underline">youneedled.com/contact</a></li>
                        <li><a href="https://youneedled.com" className="text-[#0e319a] hover:underline">www.youneedled.com</a></li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Business Address</h4>
                      <address className="not-italic text-slate-600 leading-relaxed">
                        You Need L.E.D.<br />
                        199 New Rd Suite 61 #270<br />
                        Linwood, NJ 08221
                      </address>
                    </div>
                  </div>
                  <div className="bg-[#0e319a] rounded-xl p-6 text-center text-white mt-6">
                    <p className="font-heading font-bold text-lg mb-1">Thank you for choosing You Need L.E.D.!</p>
                    <p className="text-white/80 text-sm">We look forward to providing technology solutions for your business.</p>
                  </div>
                </div>
              ),
            },
          ].map((section) => (
            <div key={section.id} id={section.id} className="mb-12 scroll-mt-24">
              <h2 className="font-heading text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">
                {section.title}
              </h2>
              {section.content}
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="container text-center">
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">Questions About This Agreement?</h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Our team is happy to walk you through any part of our terms before you sign.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:6093350123"
              className="inline-flex items-center gap-2 bg-[#0e319a] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0c2a85] transition-colors"
            >
              <Phone className="w-4 h-4" />
              (609) 335-0123
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[#0e319a] text-[#0e319a] font-semibold px-6 py-3 rounded-lg hover:bg-[#0e319a]/5 transition-colors"
            >
              Contact Us Online
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
