// ============================================================
// Case Study Data — Project stories for You Need L.E.D.
// Each entry powers a standalone /case-studies/:slug page
// ============================================================

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  location: string;
  industry: string;
  services: string[];
  heroImage: string;
  challenge: string;
  solution: string;
  solutionDetails: { heading: string; body: string }[];
  results: { metric: string; label: string }[];
  testimonial?: { quote: string; author: string; role: string };
  relatedServices: { title: string; href: string }[];
  publishDate: string;
  metaTitle: string;
  metaDescription: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "warehouse-camera-upgrade-atlantic-county",
    title: "Warehouse Security Camera Upgrade — Atlantic County, NJ",
    subtitle: "How a 200,000 sq ft distribution facility eliminated blind spots and cut theft by 75% with a 4K AI camera system.",
    client: "Atlantic County Distribution Facility",
    location: "Egg Harbor Township, NJ",
    industry: "Warehousing & Distribution",
    services: ["Commercial Security Cameras", "AI Video Analytics", "Cloud Storage"],
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    challenge: "A large distribution warehouse in Atlantic County was operating with an aging analog camera system that had significant blind spots along the loading docks, staging areas, and perimeter fence line. Inventory shrinkage had become a serious problem — management could not determine whether losses were due to external theft, internal pilferage, or shipping errors. The existing DVR footage was low-resolution and often unusable for insurance claims or police reports.",
    solution: "You Need L.E.D. conducted a full on-site security assessment and designed a 32-camera 4K IP system using AI-powered cameras with built-in license plate recognition (LPR) on all dock entrances and the main gate. The system was integrated with cloud storage for 90-day retention and a mobile app for remote monitoring.",
    solutionDetails: [
      {
        heading: "4K AI Camera Deployment",
        body: "We installed 32 Hikvision 4K AI cameras covering every loading dock, staging lane, interior aisle, and perimeter zone. Each camera uses on-board AI to detect people, vehicles, and objects — generating intelligent alerts rather than constant motion-triggered noise.",
      },
      {
        heading: "License Plate Recognition at Every Dock",
        body: "LPR cameras were installed at all 8 dock entrances and the main vehicle gate. Every truck, van, and personal vehicle entering or exiting the property is automatically logged with timestamp, plate number, and photo — creating an auditable record that cross-references with delivery manifests.",
      },
      {
        heading: "Cloud Storage & Remote Access",
        body: "All footage is stored in the cloud with 90-day retention, accessible from any device. The operations manager can pull up any camera in real time from a smartphone, and the system automatically flags and archives any AI-detected events for easy review.",
      },
      {
        heading: "Integration with Existing Access Control",
        body: "We integrated the new camera system with the facility's existing Alarm.com access control, so any door-open event automatically triggers a camera clip — creating a synchronized record of who entered, when, and what the camera captured at that exact moment.",
      },
    ],
    results: [
      { metric: "75%", label: "Reduction in theft incidents" },
      { metric: "32", label: "4K AI cameras installed" },
      { metric: "90 days", label: "Cloud video retention" },
      { metric: "8", label: "LPR-monitored dock entrances" },
    ],
    testimonial: {
      quote: "We went from grainy footage that was useless in court to crystal-clear 4K video that actually helped us recover stolen goods and file a successful insurance claim. Derek and his team knew exactly what we needed.",
      author: "Operations Manager",
      role: "Atlantic County Distribution Facility",
    },
    relatedServices: [
      { title: "Commercial Security Cameras", href: "/services/video-surveillance" },
      { title: "Access Control Systems", href: "/services/access-control" },
      { title: "Jobsite Security", href: "/services/jobsite-security" },
    ],
    publishDate: "2025-11-15",
    metaTitle: "Warehouse Camera Upgrade Atlantic County NJ | 4K AI Security System | You Need L.E.D.",
    metaDescription: "See how You Need L.E.D. upgraded a 200,000 sq ft Atlantic County warehouse with 32 4K AI cameras and LPR — cutting theft by 75%. NJ DCA Licensed installer.",
  },
  {
    slug: "voip-rollout-multi-site-retailer-south-jersey",
    title: "VoIP Phone System Rollout — Multi-Site South Jersey Retailer",
    subtitle: "How a 4-location South Jersey retail chain replaced aging phone lines with a unified cloud PBX and cut monthly telecom costs by 40%.",
    client: "South Jersey Retail Group (4 locations)",
    location: "Cherry Hill, Voorhees, Mount Laurel & Marlton, NJ",
    industry: "Retail",
    services: ["Hosted PBX & VoIP", "Microsoft Teams Integration", "Auto-Attendant"],
    heroImage: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=80",
    challenge: "A regional retail group with four South Jersey locations was running four separate legacy phone systems — each with its own carrier contract, different hardware, and no ability to transfer calls between stores. Staff had to use personal cell phones to reach colleagues at other locations. The monthly telecom bill across all four sites was over $1,200/month, and the systems had no voicemail-to-email, no auto-attendant, and no way to handle after-hours calls professionally.",
    solution: "You Need L.E.D. designed and deployed a unified Hosted PBX system across all four locations, with a single auto-attendant, shared extension dialing between stores, Microsoft Teams integration for mobile staff, and LEDConnect AI Voice Agent handling after-hours calls and lead capture.",
    solutionDetails: [
      {
        heading: "Unified Cloud PBX Across 4 Locations",
        body: "We replaced all four legacy systems with a single cloud-hosted PBX platform. Every employee at every location now has an extension that can be reached from any store. Managers can transfer calls between locations with one button press — no more giving out personal cell numbers.",
      },
      {
        heading: "Professional Auto-Attendant & IVR",
        body: "A custom auto-attendant greets every caller with a professional message and routes them to the right department or location. Store-specific greetings, holiday schedules, and after-hours messages are all managed from a single web dashboard — no IT department required.",
      },
      {
        heading: "Microsoft Teams Integration",
        body: "All four locations are integrated with Microsoft Teams, so managers and sales staff can make and receive business calls from their laptops or smartphones using their work number — not their personal cell. This was a major quality-of-life improvement for the management team.",
      },
      {
        heading: "LEDConnect AI Voice Agent for After-Hours",
        body: "We deployed LEDConnect AI Voice Agent on the main inbound number to handle calls outside business hours. The AI answers professionally, captures caller information, answers common questions, and routes urgent calls to an on-call manager — eliminating missed leads overnight and on weekends.",
      },
    ],
    results: [
      { metric: "40%", label: "Reduction in monthly telecom costs" },
      { metric: "4", label: "Locations unified on one system" },
      { metric: "100%", label: "After-hours calls answered by AI" },
      { metric: "1 dashboard", label: "To manage all 4 locations" },
    ],
    testimonial: {
      quote: "We were paying over $1,200 a month for four phone systems that couldn't even talk to each other. Now we pay less than half that, every store is connected, and our AI receptionist handles calls at 2am. It's been a game changer.",
      author: "Owner",
      role: "South Jersey Retail Group",
    },
    relatedServices: [
      { title: "Hosted PBX & VoIP", href: "/services/voip" },
      { title: "LEDConnect AI Voice Agent", href: "/services/ai-voice-agent" },
      { title: "Commercial Security", href: "/services/commercial-security" },
    ],
    publishDate: "2025-10-08",
    metaTitle: "VoIP Phone System Rollout South Jersey Retailer | Multi-Site PBX | You Need L.E.D.",
    metaDescription: "See how You Need L.E.D. unified 4 South Jersey retail locations on one cloud PBX, cut telecom costs 40%, and added AI after-hours answering. Free quote: (609) 335-0123.",
  },
  {
    slug: "access-control-condo-building-somers-point",
    title: "Access Control System — Condo Building in Somers Point, NJ",
    subtitle: "How a 48-unit condo association replaced physical keys with a cloud-managed mobile credential system — eliminating lockout calls and unauthorized access.",
    client: "48-Unit Condominium Association",
    location: "Somers Point, NJ",
    industry: "Multi-Family Residential",
    services: ["Access Control", "Mobile Credentials", "Video Surveillance", "Intercom"],
    heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
    challenge: "A 48-unit condominium association in Somers Point was dealing with ongoing security headaches: lost and copied physical keys, no way to revoke access for former residents, no record of who entered common areas, and a constant stream of lockout calls to the property manager. The building had no intercom system, so delivery drivers and guests had no way to reach residents — leading to propped-open doors and unauthorized access.",
    solution: "You Need L.E.D. designed and installed a complete CDVI and Alarm.com access control system with mobile credentials, a video intercom at the main entrance, and 4K cameras covering all common areas and parking. The property manager now controls all access from a smartphone — no more physical keys.",
    solutionDetails: [
      {
        heading: "Cloud-Managed Mobile Credential Access",
        body: "We replaced all physical key fobs with Alarm.com mobile credentials. Residents use their smartphones to unlock the main entrance, parking gate, and amenity areas. The property manager can grant or revoke access instantly from the management app — no locksmith required when a resident moves out.",
      },
      {
        heading: "Video Intercom at Main Entrance",
        body: "A CDVI video intercom was installed at the main entrance lobby. Guests and delivery drivers can call any unit directly from the panel. Residents see a live video feed on their smartphone and can unlock the door remotely — even when they are not home.",
      },
      {
        heading: "4K Camera Coverage of Common Areas",
        body: "We installed 8 4K cameras covering the lobby, mailroom, parking lot, pool area, and all stairwells. Footage is stored in the cloud with 30-day retention. The HOA board can review footage from any device, and the system provides automatic alerts for after-hours activity in restricted areas.",
      },
      {
        heading: "Full Access Audit Trail",
        body: "Every door open event is logged with timestamp, credential used, and camera snapshot. The property manager has a complete audit trail for every entry — invaluable for resolving disputes, investigating incidents, and demonstrating due diligence to the HOA board and insurance carrier.",
      },
    ],
    results: [
      { metric: "48 units", label: "Migrated to mobile credentials" },
      { metric: "0", label: "Physical keys in circulation" },
      { metric: "100%", label: "Entry events logged with video" },
      { metric: "30 days", label: "Cloud video retention" },
    ],
    testimonial: {
      quote: "We used to get calls every week about lost keys and lockouts. Now residents use their phones, I can add or remove access in 30 seconds, and we have a video record of every person who enters the building. It's exactly what a condo association needs.",
      author: "Property Manager",
      role: "Somers Point Condominium Association",
    },
    relatedServices: [
      { title: "Access Control Systems", href: "/services/access-control" },
      { title: "Security Cameras", href: "/services/video-surveillance" },
      { title: "Apartment & Multi-Family Security", href: "/services/apartment-security" },
    ],
    publishDate: "2025-09-22",
    metaTitle: "Access Control Condo Building Somers Point NJ | Mobile Credentials | You Need L.E.D.",
    metaDescription: "See how You Need L.E.D. replaced physical keys with cloud-managed mobile credentials for a 48-unit Somers Point condo — full audit trail, video intercom, 4K cameras.",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
