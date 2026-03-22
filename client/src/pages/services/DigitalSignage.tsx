/*
 * Digital Signage — YouNeedLED Service Page
 * Cloud-managed digital signage powered by NoviSign, installed by You Need L.E.D.
 */
import ServicePageLayout from "@/components/ServicePageLayout";
import { IMAGES } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import {
  Monitor,
  Utensils,
  Building2,
  GraduationCap,
  Hotel,
  Users,
  ShoppingBag,
  Dumbbell,
  Landmark,
  CalendarDays,
} from "lucide-react";

// Use cases with photos — images live in /public/digital-signage/
const USE_CASES = [
  {
    icon: <Utensils className="w-5 h-5" />,
    title: "Digital Menu Boards",
    description:
      "Restaurants, cafes, and bars can ditch static paper menus and go fully dynamic. Update pricing, promote daily specials, and schedule dayparting transitions — all from the cloud, instantly.",
    image: "/digital-signage/menu-boards.webp",
    alt: "Digital menu board display in a restaurant",
  },
  {
    icon: <Building2 className="w-5 h-5" />,
    title: "Corporate & Internal Communications",
    description:
      "Keep your team informed whether they're on the floor, in the breakroom, or walking through the lobby. Broadcast real-time company updates, HR announcements, KPIs, and meeting schedules.",
    image: "/digital-signage/corporate.webp",
    alt: "Corporate lobby digital signage display",
  },
  {
    icon: <ShoppingBag className="w-5 h-5" />,
    title: "Retail Environments",
    description:
      "Drive sales and strengthen your brand on the sales floor. Promote new products, upcoming sales, and special offers. Manage messaging across one store or multiple Tri-State locations from a single dashboard.",
    image: "/digital-signage/retail.webp",
    alt: "Retail store digital signage display wall",
  },
  {
    icon: <Hotel className="w-5 h-5" />,
    title: "Hospitality & Hotels",
    description:
      "Elevate the guest experience from the moment they walk in. Display daily activity schedules, promote on-site dining, welcome VIP guests, and feature local sponsored content — all on one managed platform.",
    image: "/digital-signage/hospitality.webp",
    alt: "Hotel lobby digital signage kiosk",
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: "Education & Campuses",
    description:
      "From K-12 schools to universities, our displays transform hallways, lobbies, and cafeterias into communication hubs. Share event schedules, emergency notifications, and campus news with centralized control.",
    image: "/digital-signage/education.webp",
    alt: "School campus hallway digital signage display",
  },
  {
    icon: <CalendarDays className="w-5 h-5" />,
    title: "Conference & Training Centers",
    description:
      "Replace inefficient paper notices with cloud-managed displays showing hourly schedules, room assignments, and directional information. Keep events running smoothly and attendees well-informed.",
    image: "/digital-signage/conference.webp",
    alt: "Conference center room schedule digital signage",
  },
  {
    icon: <Dumbbell className="w-5 h-5" />,
    title: "Sports Facilities & Gyms",
    description:
      "Keep the energy high with real-time class schedules, promotional offers, member announcements, and safety alerts. Engage members with dynamic, high-impact visuals on every screen.",
    image: "/digital-signage/sports-gym.webp",
    alt: "Gym fitness center digital signage display",
  },
  {
    icon: <Landmark className="w-5 h-5" />,
    title: "Banks & Financial Services",
    description:
      "Streamline lobby communication with real-time rate displays, product promotions, and live queue updates. Reduce perceived wait times and highlight key services exactly when customers are paying attention.",
    image: "/digital-signage/banking.webp",
    alt: "Bank lobby digital signage showing mortgage rates",
  },
];

export default function DigitalSignage() {
  return (
    <>
      <SEOHead
        title="Digital Signage Solutions South Jersey | You Need L.E.D."
        description="Cloud-managed digital signage for restaurants, retail, healthcare, schools, hotels, and offices in South Jersey. Professional installation by NJ DCA Licensed experts. Call (609) 335-0123."
        canonical="/services/digital-signage"
      />
      <ServicePageLayout
        title="Digital Signage Solutions"
        subtitle="Cloud-managed displays for restaurants, retail, healthcare, education, hospitality, and more. Professional installation and setup by South Jersey's trusted technology team."
        heroImage={IMAGES.heroMain}
        primaryCta={{ label: "Get a Digital Signage Quote", href: "/contact" }}
        secondaryCta={{ label: "See Use Cases Below", href: "#use-cases" }}
        features={[
          {
            icon: <Monitor className="w-6 h-6" />,
            title: "Cloud-Managed Content",
            description:
              "Update every screen in real time from any device, anywhere. No on-site visits required to change your messaging.",
          },
          {
            icon: <CalendarDays className="w-6 h-6" />,
            title: "Scheduled Playlists",
            description:
              "Automate content changes by time of day, day of week, or custom triggers — perfect for dayparting menus or event schedules.",
          },
          {
            icon: <Users className="w-6 h-6" />,
            title: "Multi-Location Management",
            description:
              "Manage displays across all your South Jersey locations from a single dashboard with role-based access control.",
          },
          {
            icon: <ShoppingBag className="w-6 h-6" />,
            title: "Customizable Templates",
            description:
              "Choose from hundreds of professionally designed templates or let us build a branded layout that matches your business.",
          },
          {
            icon: <Building2 className="w-6 h-6" />,
            title: "Works on Any Screen",
            description:
              "Compatible with commercial displays, consumer TVs, and video walls. We supply and install the hardware or work with what you have.",
          },
          {
            icon: <Landmark className="w-6 h-6" />,
            title: "Live Data Integration",
            description:
              "Pull in live weather, social feeds, news, sports scores, queue data, and more to keep your content dynamic and relevant.",
          },
        ]}
        faqs={[
          {
            q: "What hardware do I need for digital signage?",
            a: "Most setups use a commercial-grade display (TV or monitor) paired with a small media player or smart stick. We supply and install all hardware, or we can work with screens you already own. We'll recommend the right setup for your environment and budget.",
          },
          {
            q: "Can I update the content myself after installation?",
            a: "Absolutely. The cloud-based platform we use is designed for non-technical users. You can update text, images, videos, and schedules from any browser or mobile device in minutes — no IT department needed.",
          },
          {
            q: "Do you support multiple screens across different locations?",
            a: "Yes. Whether you have two screens in one office or twenty screens across five South Jersey locations, our platform gives you centralized control with the ability to push different content to different screens or groups.",
          },
          {
            q: "Is there a monthly software fee?",
            a: "Yes, the cloud management platform has a monthly subscription. We'll walk you through the pricing tiers based on the number of screens you need. There is no long-term contract required.",
          },
          {
            q: "What industries do you serve with digital signage?",
            a: "We install digital signage for restaurants, retail stores, corporate offices, healthcare facilities, schools, hotels, gyms, banks, houses of worship, conference centers, and more throughout South Jersey and the Delaware Valley.",
          },
        ]}
        relatedServices={[
          {
            title: "Video Surveillance",
            description: "4K AI-powered cameras with cloud storage.",
            href: "/services/video-surveillance",
          },
          {
            title: "Hosted PBX & VoIP",
            description: "Enterprise cloud phone systems with Teams integration.",
            href: "/services/voip",
          },
          {
            title: "LEDConnect AI Voice",
            description: "24/7 AI voice agent that answers calls and books appointments.",
            href: "/services/ai-voice-agent",
          },
        ]}
      >
        {/* Use Cases Grid with Photos */}
        <section id="use-cases" className="py-16 lg:py-20 bg-slate-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Digital Signage for Every Industry
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
                From a single menu board in a Cherry Hill restaurant to a multi-screen network across your entire
                facility — we design, install, and support it all.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {USE_CASES.map((uc) => (
                <div
                  key={uc.title}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col sm:flex-row group hover:shadow-md hover:border-[#0e319a]/30 transition-all"
                >
                  <div className="sm:w-48 lg:w-56 shrink-0 overflow-hidden">
                    <img
                      src={uc.image}
                      alt={uc.alt}
                      className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#0e319a]/5 flex items-center justify-center text-[#0e319a] shrink-0">
                        {uc.icon}
                      </div>
                      <h3 className="font-heading text-base font-semibold text-slate-900">{uc.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{uc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Why South Jersey Businesses Choose You Need L.E.D.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                We are not just a software reseller. We are a local, licensed technology team that handles everything
                from hardware selection and mounting to network setup and ongoing support.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  title: "End-to-End Installation",
                  body: "We handle everything — hardware procurement, mounting, cabling, network configuration, and software setup. You get a fully working system from day one.",
                },
                {
                  title: "NJ DCA Licensed & Insured",
                  body: "With 15+ years of experience and NJ DCA License #34BF00056900, we bring the same professionalism to digital signage that we bring to every security and technology project.",
                },
                {
                  title: "Local Support You Can Call",
                  body: "When something needs attention, you call (609) 335-0123 and talk to a real person who knows your system. No overseas support tickets. No runaround.",
                },
              ].map((item) => (
                <div key={item.title} className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-2 h-8 bg-[#0e319a] rounded-full mb-4" />
                  <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
}
