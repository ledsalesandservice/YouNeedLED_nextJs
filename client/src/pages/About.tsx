/*
 * About Page — YouNeedLED
 */
import { Link } from "wouter";
import { SITE, IMAGES, IMAGE_SRCSETS, CERTIFICATIONS } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Phone, ArrowRight, Award, Users, Clock, Shield, CheckCircle2, MapPin } from "lucide-react";

export default function About() {
  return (
    <>
      <SEOHead
        title="About You Need L.E.D. | 34 Years Experience | NJ DCA Licensed Security Company South Jersey"
        description="34 years of industry experience. NJ DCA Licensed (#34BF00056900). 5.0 stars, 500+ satisfied clients. Security cameras, fire alarms, VoIP & more. Call (609) 335-0123."
        canonical="/about"
      />
      {/* LocalBusiness schema — full entity with credentials, rating, and social */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: SITE.name,
        url: SITE.url,
        telephone: SITE.phone,
        email: SITE.email,
        description: "NJ DCA Licensed commercial and residential technology services company serving South Jersey and the Delaware Valley since 2010. Founded by Derek Weikel, who brings 34 years of industry experience. 5.0 stars on Google with 33+ reviews and 500+ satisfied clients.",
        foundingDate: "2010",
        address: { "@type": "PostalAddress", streetAddress: "199 New Rd Ste 61", addressLocality: "Linwood", addressRegion: "NJ", postalCode: "08221", addressCountry: "US" },
        geo: { "@type": "GeoCoordinates", latitude: 39.3398, longitude: -74.5774 },
        areaServed: ["South Jersey", "Delaware Valley", "Cherry Hill NJ", "Voorhees NJ", "Mount Laurel NJ", "Egg Harbor Township NJ", "Somers Point NJ", "Atlantic City NJ", "Philadelphia PA"],
        hasCredential: [
          { "@type": "EducationalOccupationalCredential", credentialCategory: "license", name: "NJ DCA Security License", identifier: "34BF00056900" },
          { "@type": "EducationalOccupationalCredential", credentialCategory: "license", name: "NJ DCA Fire Alarm License", identifier: "34FA00102800" },
        ],
        aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "33", bestRating: "5" },
        employee: {
          "@type": "Person",
          name: "Derek Weikel",
          jobTitle: "Owner & Lead Technician",
          worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
          knowsAbout: ["Security Camera Installation", "Access Control Systems", "Fire Alarm Systems", "VoIP Phone Systems", "Intrusion Detection", "Jobsite Security", "Digital Signage", "Fiber Optic Installation"],
          address: { "@type": "PostalAddress", addressLocality: "Linwood", addressRegion: "NJ", addressCountry: "US" },
        },
        sameAs: [
          "https://www.facebook.com/youneedled",
          "https://www.instagram.com/youneedled",
          "https://www.youtube.com/@youneedled",
          "https://g.page/youneedled",
        ],
      }) }} />

      {/* Person schema — Derek Weikel, Owner */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Derek Weikel",
        jobTitle: "Owner & Lead Technician",
        description: "Derek Weikel is the founder and owner of You Need L.E.D., a NJ DCA Licensed security and technology services company based in Linwood, NJ. With 34 years of industry experience — including 18 years in the field before founding the company in 2010 — Derek leads all commercial security camera, access control, fire alarm, VoIP, and jobsite security installations across South Jersey and the Delaware Valley.",
        worksFor: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          telephone: SITE.phone,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Linwood",
          addressRegion: "NJ",
          postalCode: "08221",
          addressCountry: "US",
        },
        knowsAbout: [
          "Commercial Security Camera Systems",
          "Access Control Systems",
          "Fire Alarm Installation",
          "Intrusion Detection",
          "Hosted VoIP Phone Systems",
          "Jobsite Security",
          "Digital Signage",
          "Fiber Optic Installation",
          "AI Voice Agents",
          "NJ DCA Licensed Contractor",
        ],
        hasCredential: [
          { "@type": "EducationalOccupationalCredential", credentialCategory: "license", name: "NJ DCA Security License", identifier: "34BF00056900" },
          { "@type": "EducationalOccupationalCredential", credentialCategory: "license", name: "NJ DCA Fire Alarm License", identifier: "34FA00102800" },
        ],
        sameAs: [
          "https://www.facebook.com/youneedled",
          "https://www.linkedin.com/company/youneedled",
        ],
      }) }} />
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-[#0e319a]">
        <div className="absolute inset-0 opacity-15">
          <img src={IMAGES.heroMain} srcSet={IMAGE_SRCSETS.heroMain} sizes="100vw" alt="" className="w-full h-full object-cover max-w-full" loading="eager" fetchPriority="high" width="1920" height="1072" />
        </div>
        <div className="relative container text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-5">About You Need L.E.D.</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Founded in 2010, we've grown from a small LED lighting company to a full-service security and technology provider serving the entire tri-state area.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Our Story</p>
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6">From LED Lighting to Complete Security Solutions</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  You Need L.E.D. was founded in 2010 by Derek Weikel — but Derek's story in the industry started long before that. With 18 years of hands-on field experience before launching the company, Derek brings a total of 34 years of industry expertise to every project.
                </p>
                <p>
                  What started as an LED lighting installation company quickly evolved as clients began asking for security cameras, alarm systems, and phone systems. Derek recognized the opportunity to become a one-stop technology partner for local businesses — and never looked back.
                </p>
                <p>
                  Today, we're a fully NJ DCA Licensed contractor specializing in commercial security systems, access control, fire alarms, VoIP phone systems, and our newest offering — LEDConnect AI Voice Agents. Every installation is led by Derek personally, bringing that 34-year depth of knowledge to every South Jersey client.
                </p>
                <p>
                  We're proud to serve over 500 clients across New Jersey, Pennsylvania, Delaware, and Maryland, maintaining a perfect 5-star Google rating built on honest work and exceptional service.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Award className="w-6 h-6" />, stat: "16", label: "Years in Business" },
                  { icon: <Users className="w-6 h-6" />, stat: "500+", label: "Clients Served" },
                  { icon: <Clock className="w-6 h-6" />, stat: "34", label: "Years Experience" },
                  { icon: <Shield className="w-6 h-6" />, stat: "5.0★", label: "Google Rating" },
                ].map((s) => (
                  <div key={s.label} className="p-5 bg-slate-50 rounded-xl text-center">
                    <div className="w-10 h-10 rounded-lg bg-[#0e319a]/10 flex items-center justify-center text-[#0e319a] mx-auto mb-3">
                      {s.icon}
                    </div>
                    <div className="font-heading text-2xl font-extrabold text-[#0e319a]">{s.stat}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">
            Licenses & Certifications
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-sm text-slate-700">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container text-center">
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Our Location</h2>
          <div className="flex items-center justify-center gap-2 text-slate-600 mb-3">
            <MapPin className="w-5 h-5 text-[#f97015]" />
            <span>{SITE.address.full}</span>
          </div>
          <p className="text-sm text-slate-500 mb-8">Serving the entire tri-state area from our Linwood, NJ headquarters.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0e319a] to-[#1a42b8]">
        <div className="container text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Get a free consultation from our licensed team. We'll design a custom solution for your property.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm">
              Get Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={SITE.phoneTel} className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm">
              <Phone className="w-4 h-4" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
