/*
 * Footer — YouNeedLED
 * "Shield & Signal" design: Dark navy footer with organized columns
 */
import { Link } from "wouter";
import { SITE } from "@/lib/siteData";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a1040] text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <div className="font-heading font-bold text-lg leading-tight">You Need L.E.D.</div>
                <div className="text-xs text-white/60">Professional Technology Services</div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Professional security camera installation, VoIP phone systems, access control, and fire alarm systems serving South Jersey and the Delaware Valley.
            </p>
            <div className="flex gap-3">
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">Services</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Hosted PBX Systems", href: "/services/voip" },
                { label: "Security Camera Installation", href: "/services/video-surveillance" },
                { label: "Fire Alarm Systems", href: "/services/fire-alarm-systems" },
                { label: "Access Control", href: "/services/access-control" },
                { label: "Intrusion Detection", href: "/services/intrusion-detection" },
                { label: "LEDConnect AI Voice", href: "/services/ai-voice-agent" },
                { label: "Digital Signage", href: "/services/digital-signage" },
                { label: "Case Studies", href: "/case-studies" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">Service Areas</h3>
            <ul className="space-y-2.5">
              {[
                "Atlantic City, NJ",
                "Camden County",
                "Philadelphia Metro",
                "South Jersey",
                "Delaware Valley",
                "Tri-State Area",
              ].map((area) => (
                <li key={area}>
                  <Link href="/service-areas" className="text-sm text-white/60 hover:text-white transition-colors">
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href={SITE.phoneTel} className="flex items-start gap-2.5 text-sm text-white/70 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#f97015]" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-start gap-2.5 text-sm text-white/70 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#f97015]" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#f97015]" />
                <span>{SITE.address.full}</span>
              </li>
            </ul>
            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">{SITE.hours.weekday}</p>
              <p className="text-xs text-white/50">{SITE.hours.saturday}</p>
              <p className="text-xs text-white/50">{SITE.hours.sunday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} You Need L.E.D. All rights reserved. {SITE.license}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-xs text-white/40 hover:text-white/70 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "You Need L.E.D.",
            description: "Professional security camera installation, VoIP phone systems, access control, and fire alarm systems in South Jersey.",
            url: SITE.url,
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
              latitude: 39.3412,
              longitude: -74.5751,
            },
            openingHoursSpecification: [
              { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
              { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
            ],
            priceRange: "$$",
            image: SITE.url + "/og-image.jpg",
            sameAs: [SITE.social.facebook, SITE.social.instagram],
            areaServed: [
              { "@type": "State", name: "New Jersey" },
              { "@type": "State", name: "Pennsylvania" },
              { "@type": "State", name: "Delaware" },
              { "@type": "State", name: "Maryland" },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: "32",
              bestRating: "5",
              worstRating: "1",
            },
            hasCredential: {
              "@type": "EducationalOccupationalCredential",
              credentialCategory: "license",
              name: "NJ DCA License",
              identifier: "34BF00056900",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Security & Technology Services",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Security Camera Installation" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "VoIP Phone Systems" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Access Control Systems" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fire Alarm Systems" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Intrusion Detection" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Jobsite Security" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "LEDConnect AI Voice Agent" } },
              ],
            },
          }),
        }}
      />
    </footer>
  );
}
