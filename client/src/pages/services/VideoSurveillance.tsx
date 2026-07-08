import { Link } from "wouter";
import ServicePageLayout from "@/components/ServicePageLayout";
import { IMAGES, IMAGE_SRCSETS, SITE } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Camera, Eye, Cloud, Cpu, Wifi, Shield, ArrowRight, CheckCircle2, BrainCircuit, Car, Users, AlertTriangle, Package, Flame, Lock, Bell, Zap, MapPin, Clock } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export default function VideoSurveillance() {
  return (
    <>
      <SEOHead
        title="Camera Installation Near Me | Security Cameras South Jersey | You Need L.E.D."
        description="Looking for camera installation near you in South Jersey? You Need L.E.D. installs 4K AI security cameras for homes & businesses. NJ DCA Licensed. Call (609) 335-0123 for a free quote."
        canonical="/services/video-surveillance"
      />
      {/* Service Schema (FAQPage is handled by ServicePageLayout) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Security Camera Installation",
        description: "Professional 4K AI-powered security camera installation for commercial and residential properties in South Jersey. Includes license plate recognition, cloud storage, and 24/7 monitoring.",
        provider: { "@type": "LocalBusiness", "@id": `${SITE.url}/#organization`, name: SITE.name, url: SITE.url, telephone: SITE.phone },
        areaServed: [
          { "@type": "State", name: "New Jersey" },
          { "@type": "City", name: "Cherry Hill, NJ" },
          { "@type": "City", name: "Voorhees, NJ" },
          { "@type": "City", name: "Mount Laurel, NJ" },
          { "@type": "City", name: "Egg Harbor Township, NJ" },
          { "@type": "City", name: "Atlantic City, NJ" },
          { "@type": "City", name: "Somers Point, NJ" },
        ],
        serviceType: "Security Camera Installation",
        url: `${SITE.url}/services/video-surveillance`,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Security Camera Packages",
          itemListElement: [
            { "@type": "Offer", name: "Essential Camera Package", price: "2499", priceCurrency: "USD" },
            { "@type": "Offer", name: "Professional Camera Package", price: "4999", priceCurrency: "USD" },
          ],
        },
      }) }} />
      <ServicePageLayout
        title="Commercial Security Camera Systems"
        pageSlug="/services/video-surveillance"
        subtitle="Enterprise-grade 4K AI cameras with license plate recognition, cloud storage, and 24/7 remote monitoring. Installed by NJ DCA Licensed professionals serving South Jersey since 2010."
        heroImage={IMAGES.heroCameras}
        heroSrcSet={IMAGE_SRCSETS.heroCameras}
        primaryCta={{ label: "Get a Free Camera Quote", href: "/contact" }}
        secondaryCta={{ label: "View Camera Packages", href: "#systems" }}
        features={[
          { icon: <Camera className="w-6 h-6" />, title: "4K Ultra HD Resolution", description: "Crystal-clear footage day and night. Identify faces, license plates, and fine details from across a parking lot or loading dock." },
          { icon: <Cpu className="w-6 h-6" />, title: "AI-Powered Analytics", description: "Smart person/vehicle detection, loitering alerts, and line-crossing notifications eliminate false alarms and focus your attention on real threats." },
          { icon: <Eye className="w-6 h-6" />, title: "License Plate Recognition", description: "Automatically capture and log every vehicle entering or exiting your property — ideal for parking lots, gated facilities, and fleet management." },
          { icon: <Cloud className="w-6 h-6" />, title: "Cloud & Local Storage", description: "Redundant storage: on-site NVR plus encrypted cloud backup so footage is always accessible and protected even if equipment is tampered with." },
          { icon: <Wifi className="w-6 h-6" />, title: "Remote Access Anywhere", description: "View live and recorded footage from any smartphone, tablet, or computer. Instant motion alerts pushed to your phone 24/7." },
          { icon: <Shield className="w-6 h-6" />, title: "NJ DCA Licensed Install", description: "Every installation is performed by our licensed and insured technicians. We pull permits and follow all NJ code requirements." },
        ]}
        faqs={[
          { q: "What type of cameras do you install?", a: "We install a wide range of commercial and residential cameras including dome, bullet, PTZ, and specialty cameras from top manufacturers like Hanwha, Axis, Vivotek, and Alarm.com. All our cameras support 4K resolution with AI analytics options." },
          { q: "Can I view my cameras remotely?", a: "Yes. All our camera systems include mobile app access so you can view live and recorded footage from your smartphone, tablet, or computer from anywhere in the world." },
          { q: "How much does installation cost?", a: "Pricing depends on the number of cameras, system complexity, and any infrastructure work required. Our Essential package starts at $2,499 for a 4-camera system. Contact us for a free on-site assessment and quote." },
          { q: "How long is footage stored?", a: "Storage duration depends on your plan. We offer local NVR storage with 30–90 day retention, and cloud storage options with flexible retention periods. Enterprise clients can customize retention to meet compliance requirements." },
          { q: "What AI features are available as add-ons?", a: "Our optional AI Intelligence Layer adds advanced capabilities including real-time person and vehicle detection, loitering and zone-crossing alerts, license plate recognition with searchable logs, package detection, crowd density monitoring, and natural language video search. These features are available on our Professional and Enterprise packages or as an add-on to any existing system." },
          { q: "Do you install cameras at construction sites?", a: "Yes — we specialize in solar-powered wireless jobsite security cameras that need no power or internet. See our Jobsite Security page for details." },
          { q: "Do you offer camera system maintenance?", a: "Yes, we provide ongoing maintenance plans that include regular cleaning, firmware updates, system health checks, and priority support to ensure your system operates at peak performance." },
          { q: "Are you licensed to install security cameras in New Jersey?", a: "Yes. You Need L.E.D. is NJ DCA Licensed (#34BF00056900), fully bonded and insured for commercial and residential security camera installation throughout New Jersey. We pull all required permits and have been serving South Jersey since 2010." },
          { q: "What areas of South Jersey do you serve for security camera installation?", a: "We serve all of South Jersey and the Delaware Valley from our Linwood, NJ office — including Atlantic City, Egg Harbor Township, Somers Point, Galloway, Cherry Hill, Voorhees, Mount Laurel, Vineland, Cape May County, Camden County, and Burlington County." },
          { q: "Do your cameras support license plate recognition?", a: "Yes. Our 4K AI-powered camera systems include license plate recognition (LPR) capability. This is especially valuable for parking lots, gated communities, car dealerships, and commercial properties that need to track and log vehicle access." },
        ]}
        relatedServices={[
          { title: "Access Control Systems", description: "Keyless entry with RFID, biometric, and mobile credentials.", href: "/services/access-control" },
          { title: "Intrusion Detection", description: "Advanced alarm systems with 24/7 monitoring.", href: "/services/intrusion-detection" },
          { title: "Jobsite Security", description: "Solar-powered wireless cameras for construction sites.", href: "/services/jobsite-security" },
        ]}
      >
        {/* ===== WHY 4K MATTERS ===== */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn direction="right">
                <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Why Resolution Matters</p>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-5">
                  4K Cameras Catch What Lower-Resolution Systems Miss
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  When an incident happens at your business, the footage your cameras captured is often the difference between a successful insurance claim or police investigation — and a dead end. Blurry, pixelated video from outdated 1080p cameras frequently fails to provide actionable evidence.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our 4K (8-megapixel) cameras deliver four times the detail of standard HD systems. You can digitally zoom in on a face, read a license plate from 60 feet away, or identify a specific item of clothing — all from a single wide-angle camera covering your entire parking lot.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Combined with optional AI-powered analytics, our systems don't just record — they actively alert you to what matters. Person detection, vehicle detection, loitering alerts, and line-crossing notifications mean your team responds to real threats, not wind-blown trash.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#0e319a] text-white font-semibold rounded-lg hover:bg-[#0c2a85] transition-colors text-sm"
                >
                  Schedule a Free Site Walk <ArrowRight className="w-4 h-4" />
                </Link>
              </FadeIn>
              <FadeIn direction="left">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { stat: "4K", label: "Ultra HD Resolution", sub: "8 megapixels per camera" },
                    { stat: "60ft", label: "License Plate Read Range", sub: "In standard daylight" },
                    { stat: "24/7", label: "Remote Monitoring", sub: "From any device, anywhere" },
                    { stat: "90 days", label: "Max Cloud Retention", sub: "Enterprise cloud plans" },
                  ].map((s) => (
                    <div key={s.label} className="bg-slate-50 rounded-xl p-5 text-center">
                      <div className="font-heading text-2xl font-extrabold text-[#0e319a] mb-1">{s.stat}</div>
                      <div className="text-sm font-semibold text-slate-900 mb-1">{s.label}</div>
                      <div className="text-xs text-slate-500">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ===== CAMERA PACKAGES ===== */}
        <section id="systems" className="py-16 lg:py-20 bg-slate-50">
          <div className="container">
            <FadeIn className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Camera System Packages</p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Right-Sized Systems for Every Property
              </h2>
              <p className="text-slate-600">
                From a 4-camera retail shop to a 32-camera warehouse campus — we design systems around your property, not a one-size-fits-all package.
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Essential",
                  price: "Starting at $2,499",
                  features: [
                    "4 × 4K IP cameras",
                    "8-channel NVR",
                    "30-day local storage",
                    "Mobile app access",
                    "Motion alerts",
                    "Professional installation",
                    "1-year labor warranty",
                  ],
                  aiAddons: false,
                },
                {
                  name: "Professional",
                  price: "Starting at $4,999",
                  popular: true,
                  features: [
                    "8 × 4K IP cameras",
                    "16-channel NVR",
                    "60-day storage",
                    "AI person/vehicle detection",
                    "License plate recognition",
                    "Loitering & zone alerts",
                    "Cloud backup included",
                    "Professional installation",
                    "2-year labor warranty",
                  ],
                  aiAddons: true,
                },
                {
                  name: "Enterprise",
                  price: "Custom pricing",
                  features: [
                    "16+ cameras",
                    "Multi-site management",
                    "90-day cloud storage",
                    "Full AI Intelligence Layer",
                    "Natural language video search",
                    "Video verification monitoring",
                    "24/7 central station monitoring",
                    "Dedicated account manager",
                    "Priority support SLA",
                  ],
                  aiAddons: true,
                },
              ].map((pkg) => (
                <div key={pkg.name} className={`p-6 rounded-xl border ${pkg.popular ? "border-[#0e319a] ring-2 ring-[#0e319a]/20 bg-white" : "border-slate-200 bg-white"}`}>
                  {pkg.popular && <span className="inline-block px-3 py-1 bg-[#0e319a] text-white text-xs font-semibold rounded-full mb-3">Most Popular</span>}
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-1">{pkg.name}</h3>
                  <p className="text-[#0e319a] font-semibold mb-4">{pkg.price}</p>
                  <ul className="space-y-2.5 mb-6">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {pkg.aiAddons && (
                    <p className="text-xs text-[#f97015] font-semibold mb-4">✦ AI Intelligence Layer available as add-on</p>
                  )}
                  <Link href="/contact" className="block text-center px-4 py-2.5 bg-[#0e319a] text-white text-sm font-semibold rounded-lg hover:bg-[#0c2a85] transition-colors">
                    Get a Quote
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== AI INTELLIGENCE LAYER ===== */}
        <section id="ai-features" className="py-16 lg:py-24 bg-white">
          <div className="container">
            <FadeIn className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Optional Add-On</p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                AI Intelligence Layer — Turn Your Cameras Into Smart Sensors
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Our AI Intelligence Layer is an optional upgrade available on any new or existing IP camera system. It adds on-site edge processing and cloud-assisted analysis so your cameras actively detect, classify, and alert — not just record. No proprietary hardware lock-in. Works with cameras you already own.
              </p>
            </FadeIn>

            {/* Standard AI Detection Features */}
            <FadeIn className="mb-14">
              <h3 className="font-heading text-lg font-bold text-slate-900 text-center mb-8">
                Standard AI Detection Features
              </h3>
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    icon: <Users className="w-5 h-5" />,
                    title: "Person Detection",
                    desc: "Accurately distinguishes people from animals, vehicles, and environmental motion. Dramatically reduces false alarm rates compared to standard motion detection.",
                  },
                  {
                    icon: <Car className="w-5 h-5" />,
                    title: "Vehicle Detection & Classification",
                    desc: "Detects cars, trucks, motorcycles, and bicycles. Classify vehicle type and trigger alerts based on vehicle presence in specific zones.",
                  },
                  {
                    icon: <Eye className="w-5 h-5" />,
                    title: "License Plate Recognition (LPR)",
                    desc: "Automatically reads and logs license plates of every vehicle entering or exiting. Searchable plate logs with timestamp and camera source.",
                  },
                  {
                    icon: <AlertTriangle className="w-5 h-5" />,
                    title: "Loitering Detection",
                    desc: "Alerts when a person or vehicle remains in a defined zone longer than a set time threshold — ideal for parking lots, ATM areas, and building entrances.",
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    title: "Zone Crossing & Line Crossing",
                    desc: "Define virtual zones or tripwires on any camera view. Receive instant alerts when a person or vehicle crosses into a restricted area.",
                  },
                  {
                    icon: <Package className="w-5 h-5" />,
                    title: "Package & Object Detection",
                    desc: "Detect unattended packages, left-behind objects, or missing items in a scene. Useful for loading docks, mailrooms, and retail stockrooms.",
                  },
                  {
                    icon: <Flame className="w-5 h-5" />,
                    title: "Smoke & Fire Detection",
                    desc: "AI-assisted visual detection of smoke or fire in camera views, providing an additional early-warning layer alongside your fire alarm system.",
                  },
                  {
                    icon: <Users className="w-5 h-5" />,
                    title: "Crowd Density Monitoring",
                    desc: "Monitor occupancy levels in real time. Receive alerts when a space exceeds a defined crowd threshold — useful for retail, events, and compliance.",
                  },
                  {
                    icon: <Lock className="w-5 h-5" />,
                    title: "Tailgating Detection",
                    desc: "Detect unauthorized entry attempts where a second person follows an authorized individual through a secured door or gate without credentials.",
                  },
                ].map((feat) => (
                  <StaggerItem key={feat.title}>
                    <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-[#0e319a]/10 flex items-center justify-center text-[#0e319a] shrink-0">
                          {feat.icon}
                        </div>
                        <h4 className="font-heading text-sm font-semibold text-slate-900">{feat.title}</h4>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>

            {/* Advanced AI Features */}
            <FadeIn className="mb-14">
              <h3 className="font-heading text-lg font-bold text-slate-900 text-center mb-8">
                Advanced AI Features <span className="text-sm font-normal text-[#f97015] ml-2">(Professional & Enterprise)</span>
              </h3>
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    icon: <BrainCircuit className="w-5 h-5" />,
                    title: "Natural Language Video Search",
                    desc: 'Search your recorded footage using plain English. Ask "show me everyone in a red jacket near the back door after 10pm" and get results in seconds — no manual scrubbing.',
                  },
                  {
                    icon: <Bell className="w-5 h-5" />,
                    title: "Intelligent Alert Filtering",
                    desc: "AI pre-screens every motion event before sending you an alert. Only confirmed person or vehicle detections trigger notifications — eliminating 90%+ of nuisance alerts.",
                  },
                  {
                    icon: <Zap className="w-5 h-5" />,
                    title: "Real-Time Scene Analysis",
                    desc: "Advanced vision AI analyzes the full context of a scene — not just motion — to understand what is actually happening and generate a plain-language description of events.",
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: "Event Timeline & Clip Export",
                    desc: "Every detected event is automatically clipped, timestamped, and organized into a searchable timeline. Share evidence clips directly from your phone in seconds.",
                  },
                  {
                    icon: <Car className="w-5 h-5" />,
                    title: "Vehicle Watchlist Alerts",
                    desc: "Add specific license plates to a watchlist. Receive an instant alert the moment a flagged vehicle is detected on any camera at your property.",
                  },
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: "After-Hours Behavior Detection",
                    desc: "Automatically apply stricter detection rules during off-hours. Any person detected on-site after closing triggers an immediate priority alert — no manual scheduling required.",
                  },
                ].map((feat) => (
                  <StaggerItem key={feat.title}>
                    <div className="p-5 rounded-xl border border-[#0e319a]/20 bg-[#0e319a]/5 h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-[#0e319a]/15 flex items-center justify-center text-[#0e319a] shrink-0">
                          {feat.icon}
                        </div>
                        <h4 className="font-heading text-sm font-semibold text-slate-900">{feat.title}</h4>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>

            {/* AI CTA Banner */}
            <FadeIn>
              <div className="rounded-2xl bg-gradient-to-r from-[#0e319a] to-[#1a42b8] p-8 md:p-10 text-center">
                <BrainCircuit className="w-10 h-10 text-white/70 mx-auto mb-4" />
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3">
                  Already Have Cameras? Add AI to Your Existing System.
                </h3>
                <p className="text-white/80 max-w-xl mx-auto mb-6 text-sm leading-relaxed">
                  Our AI Intelligence Layer works with most existing IP cameras — no rip-and-replace required. We assess your current system and add the intelligence layer on top of what you already own.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e86510] transition-colors text-sm"
                >
                  Get an AI Upgrade Assessment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== INDUSTRIES SERVED ===== */}
        <section className="py-16 lg:py-20 bg-slate-50">
          <div className="container">
            <FadeIn className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Industries We Serve</p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Security Camera Solutions for Every Business Type
              </h2>
              <p className="text-slate-600">
                We have installed security camera systems for hundreds of South Jersey businesses across every industry. Here are some of the most common use cases we handle.
              </p>
            </FadeIn>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { name: "Retail & Restaurants", desc: "Protect merchandise, monitor staff, and deter shoplifting with cameras covering every angle of your store or dining room. Integrate with your POS system for transaction-linked video." },
                { name: "Warehouses & Distribution", desc: "High-ceiling wide-angle cameras, loading dock coverage, and license plate recognition for fleet and inventory management across large facilities." },
                { name: "Office Buildings", desc: "Lobby cameras, parking lot coverage, and access-controlled entry points integrated with your camera system for a complete commercial security solution." },
                { name: "Multi-Family & HOA", desc: "Protect common areas, parking lots, mailrooms, and building entrances for apartment complexes and condo associations throughout South Jersey." },
                { name: "Construction Sites", desc: "Solar-powered wireless cameras that need no power or internet. Deter theft, document site progress, and protect equipment remotely from your phone." },
                { name: "Healthcare & Medical", desc: "HIPAA-conscious camera placement for waiting rooms, parking areas, and exterior perimeters of medical offices and urgent care facilities." },
                { name: "Auto Dealerships", desc: "Lot-wide coverage with license plate recognition and after-hours vehicle monitoring. Protect your inventory and document every vehicle movement on the lot." },
                { name: "Cannabis Dispensaries", desc: "NJ-CRC compliant camera coverage meeting all state regulatory requirements for cannabis retail and cultivation facilities in New Jersey." },
                { name: "Schools & Houses of Worship", desc: "Exterior perimeter cameras, parking lot coverage, and entry-point monitoring designed with community safety and privacy best practices in mind." },
              ].map((ind) => (
                <StaggerItem key={ind.name}>
                  <div className="p-5 rounded-xl border border-slate-200 bg-white h-full">
                    <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{ind.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{ind.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ===== SOUTH JERSEY SERVICE AREAS ===== */}
        <section className="py-14 bg-white">
          <div className="container">
            <FadeIn className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-sm font-semibold text-[#f97015] uppercase tracking-wider mb-3">Local Coverage</p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Security Camera Installation Throughout South Jersey
              </h2>
              <p className="text-slate-600">
                We install and service commercial security camera systems across Atlantic, Cape May, Camden, Burlington, and Gloucester counties. Same-day assessments available for most South Jersey locations.
              </p>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { city: "Cherry Hill, NJ", href: "/locations/cherry-hill-nj" },
                { city: "Voorhees, NJ", href: "/locations/voorhees-nj" },
                { city: "Mount Laurel, NJ", href: "/locations/mount-laurel-nj" },
                { city: "Egg Harbor Township, NJ", href: "/locations/egg-harbor-township-nj" },
                { city: "Somers Point, NJ", href: "/locations/somers-point-nj" },
                { city: "Atlantic City, NJ", href: "/locations/atlantic-city-nj" },
              ].map((loc) => (
                <Link key={loc.city} href={loc.href} className="flex items-center gap-2 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-[#0e319a]/30 hover:shadow-sm transition-all text-sm font-medium text-slate-700 hover:text-[#0e319a]">
                  <ArrowRight className="w-4 h-4 text-[#f97015] shrink-0" />
                  Security Cameras in {loc.city}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== INTERNAL LINKS ===== */}
        <section className="py-10 bg-white border-t border-slate-100">
          <div className="container">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Explore Related Services</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Access Control Systems", href: "/services/access-control" },
                { label: "Intrusion Detection & Alarms", href: "/services/intrusion-detection" },
                { label: "Fire Alarm Systems", href: "/services/fire-alarm-systems" },
                { label: "Jobsite Security Cameras", href: "/services/jobsite-security" },
                { label: "Hosted PBX & VoIP", href: "/services/voip" },
                { label: "Digital Signage", href: "/services/digital-signage" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-[#0e319a]/30 hover:text-[#0e319a] transition-colors">
                  {link.label} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
}
