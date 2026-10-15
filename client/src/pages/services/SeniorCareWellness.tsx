import { useState } from "react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { IMAGES, SITE } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { HeartPulse, Activity, Bell, Eye, Camera, ShieldCheck, Moon, Refrigerator, Armchair, ArrowRight, Play } from "lucide-react";
import { Link } from "wouter";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

/* Official Alarm.com Wellness videos (Alarm.com YouTube channel, @AlarmDotCom).
   Click-to-play facades: no YouTube JS loads until the visitor asks for it. */
const WELLNESS_VIDEOS = [
  {
    id: "NE26ZCsrc2A",
    title: "Smart Technology for Independent Living",
    desc: "How Alarm.com Wellness keeps your loved ones safer without compromising their independence.",
  },
  {
    id: "SYZe5W3PwXo",
    title: "Wellness: Technology for Independent Living",
    desc: "Intelligent insights and activity alerts that keep you one step ahead of emerging issues.",
  },
];

function WellnessVideo({ id, title, desc }: { id: string; title: string; desc: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 bg-white h-full flex flex-col">
      <div className="relative aspect-video bg-slate-900">
        {play ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlay(true)}
            className="group absolute inset-0 w-full h-full"
            aria-label={`Play video: ${title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Play className="w-7 h-7 text-[#0e319a] ml-1" fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-heading text-base font-semibold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function SeniorCareWellness() {
  return (
    <>
    <SEOHead
      title="Senior Care & Wellness Monitoring | Aging in Place | You Need L.E.D."
      description="Proactive home wellness monitoring from You Need L.E.D. for seniors and their families in South Jersey. Non-intrusive activity sensors, fall detection, one-touch video check-ins, and smart home automation. Free consultation: (609) 335-0123."
      canonical="/services/senior-care-wellness"
    />
    {/* Service Schema */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Senior Care & Wellness Monitoring",
      description: "Proactive home wellness monitoring for seniors — non-intrusive activity sensors, fall detection, one-touch video check-ins, and smart home automation so loved ones can age in place safely in South Jersey.",
      provider: { "@type": "LocalBusiness", name: SITE.name, url: SITE.url, telephone: SITE.phone },
      areaServed: ["South Jersey", "Atlantic County NJ", "Cape May County NJ", "Camden County NJ", "Burlington County NJ"],
      serviceType: "Senior Care Monitoring",
      url: `${SITE.url}/services/senior-care-wellness`,
    }) }} />
    <ServicePageLayout
      title="Senior Care & Wellness Monitoring"
      pageSlug="/services/senior-care-wellness"
      subtitle="Give your loved ones independence. Get yourself peace of mind. Proactive, non-intrusive home wellness technology — powered by Alarm.com — that lets you know, in real time, that Mom is up and about and everything is as it should be."
      heroImage="/blog-images/blog-fire-alarm2-1200w.webp"
      heroImageAlt="Senior independent living at home supported by proactive wellness monitoring technology"
      primaryCta={{ label: "Free Wellness Consultation", href: "/contact" }}
      secondaryCta={{ label: "Call (609) 335-0123", href: "/contact" }}
      features={[
        { icon: <Activity className="w-6 h-6" />, title: "Know They're Safe", description: "Non-intrusive sensors tell you when important activity is — or isn't — happening, without a panic pendant." },
        { icon: <Eye className="w-6 h-6" />, title: "Stay Aware", description: "Door and cabinet sensors, plus fall-detection wearables that alert you even if the button is never pressed." },
        { icon: <Bell className="w-6 h-6" />, title: "Intervene Early", description: "Always-on technology learns daily routines and alerts you to subtle changes before small issues become emergencies." },
        { icon: <ShieldCheck className="w-6 h-6" />, title: "Make Home Safer", description: "State-of-the-art security, automatic lighting, and smart locks — all from your You Need L.E.D. app." },
        { icon: <Camera className="w-6 h-6" />, title: "One-Touch Video Check-Ins", description: "Push one button and Dad reaches you instantly — and you can see him, not just hear him." },
        { icon: <HeartPulse className="w-6 h-6" />, title: "Aging in Place", description: "Help your loved one live independently at home longer, with technology that quietly watches over them." },
      ]}
      faqs={[
        { q: "How is wellness monitoring different from a medical alert pendant?", a: "A panic pendant only helps if the person can press the button. Wellness monitoring uses non-intrusive sensors installed throughout the home — door contacts, motion sensors, bed, chair, and refrigerator sensors — that detect when routine activity changes. It catches subtle signs like reduced appetite, disrupted sleep, or unusual inactivity that a pendant would never see." },
        { q: "Who makes the technology behind this?", a: "Alarm.com. The sensors, the mobile app, the activity analytics, and the 24/7 monitoring and alerts are all built, hosted, and maintained by Alarm.com — they're the platform this entire service runs on, and the credit for it is theirs. You Need L.E.D. designs the sensor layout for your home or facility, installs the system, and services it locally here in South Jersey." },
        { q: "What can the system actually detect?", a: "It learns each person's daily patterns and alerts you to changes. Examples: if Dad's bed sensor shows he's been out of bed since 2:00 AM (wandering), if Mom's refrigerator door has opened less than usual this week (appetite change), or if Dad's chair sensor shows he's sitting longer and getting up less (possible illness). You get the alert early — when you can still do something." },
        { q: "Do I need to worry about my parents' privacy?", a: "This is the key advantage over cameras everywhere. The system is built on non-intrusive activity sensors, not constant video monitoring. You see a dashboard of activity patterns, not a 24/7 live feed into their home. Video is optional — the one-touch video check-in gives a call only when someone wants to talk or check in." },
        { q: "Can I control it from my phone?", a: "Yes. Everything runs through the same You Need L.E.D. app you already use for security. From your own phone you can see activity, receive alerts, view the live video feed, adjust the thermostat remotely, and control smart lights and locks in their home." },
        { q: "Can wellness monitoring integrate with existing security?", a: "Absolutely. Wellness lives on the same smart home platform as your security system, cameras, and smart locks. One app, one unified system. A smart home is a safe home — smart lights make bathrooms and hallways safer at night, and smart locks alert you if an exterior door is left unsecured." },
        { q: "What areas do you serve for senior care monitoring?", a: "We install and service senior wellness monitoring throughout South Jersey and the Delaware Valley from our Linwood, NJ office — including Atlantic City, Somers Point, Egg Harbor Township, Galloway, Cherry Hill, Voorhees, Mount Laurel, Vineland, and all of Atlantic, Cape May, Camden, and Burlington counties." },
        { q: "Who is this for?", a: "Adult children caring for aging parents, families with a loved one in independent or assisted living, and anyone who wants peace of mind that a senior is safe, active, and healthy at home — without hovering. It also supports independent-living and senior-care facilities that want to offer wellness monitoring to residents." },
        { q: "Is it difficult for seniors to use?", a: "No — that's the point. Unlike a pendant they must remember to wear and press, wellness sensors work in the background automatically. And key functions like the video check-in are one-touch: Dad presses one button and it calls you. Nothing to learn, nothing to charge, nothing to remember." },
      ]}
      relatedServices={[
        { title: "Security Camera Systems", description: "4K AI-powered surveillance with cloud storage.", href: "/services/video-surveillance" },
        { title: "Intrusion Detection", description: "Advanced alarm systems with 24/7 monitoring.", href: "/services/intrusion-detection" },
        { title: "Access Control Systems", description: "Keyless entry and cloud-managed security.", href: "/services/access-control" },
      ]}
    >
      {/* ===== HOW IT WORKS — the three scenarios from the flyer ===== */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-[#c2410c] uppercase tracking-wider mb-3">How Wellness Helps</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Spot problems early — before they become emergencies
            </h2>
            <p className="text-slate-600">
              Most wellbeing issues are hard to detect at first. Alarm.com's Wellness platform watches for unusual activity
              or subtle changes in routine and alerts you, giving you more time to intervene.
            </p>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              { icon: <Moon className="w-6 h-6" />, name: "Restless Nights", desc: "Dad's bed sensor shows he's been out of bed since 2:00 AM. Why isn't he sleeping? An early sign of pain, anxiety, or a medication issue." },
              { icon: <Refrigerator className="w-6 h-6" />, name: "Appetite Changes", desc: "Mom's refrigerator door has opened less than usual this week. Has she lost her appetite? A common early indicator that something's off." },
              { icon: <Armchair className="w-6 h-6" />, name: "Decreased Activity", desc: "Dad's chair sensor shows he's sitting longer and getting up less. Could he be getting sick — or losing mobility? You'll know to check in." },
            ].map((s) => (
              <StaggerItem key={s.name}>
                <div className="p-6 rounded-xl border border-slate-200 bg-white h-full">
                  <div className="w-12 h-12 rounded-lg bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] mb-4">{s.icon}</div>
                  <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{s.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeIn className="text-center mt-8">
            <p className="font-heading text-lg font-semibold text-[#0e319a]">With Wellness, you'll know when you need to ask.</p>
          </FadeIn>
        </div>
      </section>

      {/* ===== VIDEO — straight from Alarm.com ===== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sm font-semibold text-[#c2410c] uppercase tracking-wider mb-3">See It In Action</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Wellness, explained by Alarm.com
            </h2>
            <p className="text-slate-600">
              These are Alarm.com's own videos — the platform behind the system we design, install, and support for you.
            </p>
          </FadeIn>
          <StaggerContainer className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {WELLNESS_VIDEOS.map((v) => (
              <StaggerItem key={v.id}>
                <WellnessVideo id={v.id} title={v.title} desc={v.desc} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== THE APP & THE ALERTS ===== */}
      <section className="py-16 lg:py-20 bg-slate-50 border-y border-slate-200">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-[#c2410c] uppercase tracking-wider mb-3">The App &amp; The Alerts</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              See exactly what you'd see
            </h2>
            <p className="text-slate-600">
              A live view of your loved one's home, their activity patterns, and an alert on your phone the moment something
              looks off — all in the Alarm.com app.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto mb-14">
            <FadeIn>
              <img
                src="/alarm-com/wellness-app-dashboard.png"
                alt="Alarm.com Wellness app showing a loved one's home, live video and activity history"
                className="w-full rounded-xl border border-slate-200 shadow-sm"
                loading="lazy"
              />
              <p className="text-xs text-slate-500 text-center mt-3">
                The Alarm.com app — activity, video and history in one place.
              </p>
            </FadeIn>
            <FadeIn>
              <img
                src="/alarm-com/wellness-senior-with-phone.jpg"
                alt="A senior at home using the Alarm.com app on their phone"
                className="w-full rounded-xl border border-slate-200 shadow-sm"
                loading="lazy"
              />
              <p className="text-xs text-slate-500 text-center mt-3">
                Simple enough that they'll actually use it.
              </p>
            </FadeIn>
          </div>

          <FadeIn className="text-center max-w-2xl mx-auto mb-9">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              What an alert actually looks like
            </h3>
            <p className="text-slate-600">
              These are the real notifications that reach a family member's phone. You don't have to remember to check a
              dashboard — it comes to you.
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { img: "/alarm-com/wellness-alert-medication.jpg", alt: "Alarm.com alert: medicine cabinet was not opened by 6:32 pm", cap: "A missed medication routine." },
              { img: "/alarm-com/wellness-alert-unexpected-activity.jpg", alt: "Alarm.com alert: front door opened at 2:41 am", cap: "A door opened in the middle of the night." },
              { img: "/alarm-com/wellness-alert-normal-activity.jpg", alt: "Alarm.com alert: activity levels normal at 4:05 pm", cap: "Or the good news — everything's normal." },
            ].map((a) => (
              <StaggerItem key={a.img}>
                <figure>
                  <img src={a.img} alt={a.alt} className="w-full rounded-lg border border-slate-200 shadow-sm" loading="lazy" />
                  <figcaption className="text-xs text-slate-500 text-center mt-3">{a.cap}</figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="text-center mt-9">
            <p className="text-sm text-slate-500">
              Screenshots and alerts courtesy of Alarm.com — the platform everything on this page runs on.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ===== DESIGNED FOR ===== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-[#c2410c] uppercase tracking-wider mb-3">Who Benefits</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Wellness monitoring for families and facilities
            </h2>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Aging Parents at Home", desc: "Give Mom and Dad the independence they want, while you get real-time visibility that they're safe, active, and healthy — from anywhere." },
              { name: "Independent Living", desc: "Residents maintain privacy and dignity while staff and families stay aware of changes in routine that could signal a problem." },
              { name: "Assisted Living Facilities", desc: "Extend care teams with continuous activity monitoring, so staff can prioritize residents who show early warning signs." },
              { name: "Families & Caregivers", desc: "For anyone caring for a loved one from a distance — check in instantly with one-touch video, no phone call required." },
              { name: "Dementia & Memory Care", desc: "Wandering and disrupted sleep are common challenges. Get alerted the moment they arise, day or night." },
              { name: "Post-Surgery Recovery", desc: "Monitor activity levels and getting-up frequency during recovery at home, so you catch setbacks early." },
            ].map((ind) => (
              <StaggerItem key={ind.name}>
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 h-full">
                  <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{ind.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{ind.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== INTERNAL LINKS ===== */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="container">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Explore Related Services</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Security Cameras", href: "/services/video-surveillance" },
              { label: "Intrusion Detection", href: "/services/intrusion-detection" },
              { label: "Access Control Systems", href: "/services/access-control" },
              { label: "Apartment Security", href: "/services/apartment-security" },
              { label: "Commercial Security", href: "/services/commercial-security" },
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