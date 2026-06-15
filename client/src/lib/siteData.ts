// ============================================================
// YouNeedLED Site Data — Single source of truth for all content
// Design: "Shield & Signal" — Clean Corporate Authority
// ============================================================

export const SITE = {
  name: "You Need L.E.D.",
  tagline: "Professional Technology Services",
  phone: "(609) 335-0123",
  phoneTel: "tel:+16093350123",
  email: "info@youneedled.com",
  address: {
    street: "199 New Rd Ste 61",
    city: "Linwood",
    state: "NJ",
    zip: "08221",
    full: "199 New Rd Ste 61, Linwood, NJ 08221",
  },
  license: "NJ DCA Licensed: 34BF00056900",
  fireLicense: "NJ DCA License: 34FA00102800",
  url: "https://www.youneedled.com",
  social: {
    facebook: "https://www.facebook.com/youneedled",
    instagram: "https://www.instagram.com/youneedled",
    google: "https://g.page/youneedled",
    youtube: "https://www.youtube.com/@youneedled",
  },
  hours: {
    weekday: "Monday – Friday: 8:00 AM – 6:00 PM",
    saturday: "Saturday: 9:00 AM – 2:00 PM",
    sunday: "Sunday: Emergency Only",
    emergency: "24/7 Emergency Response",
  },
};

export const IMAGES = {
  heroMain: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030082570/Tfe6MLMokmY8tMP4sdwDCa/hero-main-FzzWNkqcRL6wNVgyaZbhwS.webp",
  heroVoip: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030082570/Tfe6MLMokmY8tMP4sdwDCa/hero-voip-C3K9kFAyBKoUKXyoFDRn2A.webp",
  heroCameras: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030082570/Tfe6MLMokmY8tMP4sdwDCa/hero-cameras-Epwbn9AsuWE6eQcF4RnUJr.webp",
  heroAiAgent: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030082570/Tfe6MLMokmY8tMP4sdwDCa/hero-ai-agent-NEVWnYfLcWxHS9dfuYkND8.webp",
  heroAccess: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030082570/Tfe6MLMokmY8tMP4sdwDCa/hero-access-control-9nuBCFGBp72MkRE4DdoFf3.webp",
  heroDigitalSignage: "/digital-signage/corporate.webp",
};

export const IMAGE_SRCSETS = {
  heroMain: "/hero-main-400w.webp 400w, /hero-main-800w.webp 800w, /hero-main-1200w.webp 1200w, /hero-main-1920w.webp 1920w",
  heroVoip: "/hero-voip-400w.webp 400w, /hero-voip-800w.webp 800w, /hero-voip-1200w.webp 1200w, /hero-voip-1920w.webp 1920w",
  heroCameras: "/hero-cameras-400w.webp 400w, /hero-cameras-800w.webp 800w, /hero-cameras-1200w.webp 1200w, /hero-cameras-1920w.webp 1920w",
  heroAiAgent: "/hero-ai-agent-400w.webp 400w, /hero-ai-agent-800w.webp 800w, /hero-ai-agent-1200w.webp 1200w, /hero-ai-agent-1920w.webp 1920w",
  heroAccess: "/hero-access-400w.webp 400w, /hero-access-800w.webp 800w, /hero-access-1200w.webp 1200w, /hero-access-1920w.webp 1920w",
};

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Commercial Security",
    href: "/services/video-surveillance",
    children: [
      { label: "Video Surveillance", href: "/services/video-surveillance" },
      { label: "Access Control", href: "/services/access-control" },
      { label: "Fire Alarm Systems", href: "/services/fire-alarm-systems" },
      { label: "Intrusion Detection", href: "/services/intrusion-detection" },
      { label: "Jobsite Security", href: "/services/jobsite-security" },
      { label: "Apartment Complexes", href: "/services/apartment-security" },
      { label: "Fiber Optic Installation", href: "/services/fiber-optic" },
    ],
  },
  { label: "Hosted PBX & VoIP", href: "/services/voip" },
  { label: "Digital Signage", href: "/services/digital-signage" },
  { label: "LEDConnect AI Voice", href: "/services/ai-voice-agent" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Client Portal", href: "/client-portal" },
  { label: "Live Cameras", href: "/live-cameras" },
];

export const TESTIMONIALS = [
  {
    quote: "This truly is a 5 star company. Derek and his team exhibited a high degree of knowledge and professionalism while replacing my home security cameras. They returned my initial call promptly and were flexible when scheduling both the consult and installation. I will absolutely be referring this company to others!",
    name: "Alexa Previti",
    role: "Homeowner",
    type: "Residential Customer",
  },
  {
    quote: "Derek and his team just installed 7 cameras at my home, fast, reasonably priced and great equipment. I couldn't be happier and would definitely recommend.",
    name: "Steven Berman",
    role: "Homeowner",
    type: "Residential Customer",
  },
  {
    quote: "Derek and his team are the best in the business. I only call him when I want the job done right. His team came in they designed a slatted wood wall with integrated lighting that everyone is raving over. He handled my lights, my security cameras, and a few other odds and ends. FRANCHISE LEVEL service!",
    name: "Mitchell Sands",
    role: "Business Owner",
    type: "Commercial Client",
  },
  {
    quote: "You Need L.E.D. (Derek) installed security cameras in our 20,000 square foot building. His service is efficient, thorough and customer service is first rate!",
    name: "Margarete Roberts",
    role: "Property Owner",
    type: "Commercial Building",
  },
  {
    quote: "I would highly recommend You Need L.E.D. The entire process from start to finish was flawless! Derek is always there for a question, even years after completion. This is a top shelf company!",
    name: "Michael Montemuro",
    role: "Client",
    type: "Satisfied Customer",
  },
];

export const SERVICES = [
  {
    title: "Video Surveillance",
    description: "4K AI-powered security cameras with license plate recognition, analytics, and cloud storage for commercial and residential properties.",
    href: "/services/video-surveillance",
    icon: "Camera",
  },
  {
    title: "Access Control",
    description: "CDVI & Alarm.com powered keyless entry systems with RFID, biometric, and mobile credentials for secure facility management.",
    href: "/services/access-control",
    icon: "KeyRound",
  },
  {
    title: "Fire Alarm Systems",
    description: "NFPA 72 compliant fire alarm installation, monitoring, and inspection. NJ DCA licensed fire alarm contractor.",
    href: "/services/fire-alarm-systems",
    icon: "Flame",
  },
  {
    title: "Intrusion Detection",
    description: "Advanced alarm systems with mobile alerts, 24/7 monitoring, video verification, and smart sensor technology.",
    href: "/services/intrusion-detection",
    icon: "ShieldAlert",
  },
  {
    title: "Hosted PBX & VoIP",
    description: "Enterprise-grade cloud phone systems with Microsoft Teams integration, auto-attendant, and unified communications.",
    href: "/services/voip",
    icon: "Phone",
  },
  {
    title: "Jobsite Security",
    description: "Solar-powered wireless cameras and alarm systems for construction sites. No power or internet required.",
    href: "/services/jobsite-security",
    icon: "HardHat",
  },
  {
    title: "Fiber Optic Installation",
    description: "Single-mode and multimode fiber optic installation, fusion splicing, and emergency repair for commercial buildings, campuses, warehouses, and multi-building complexes.",
    href: "/services/fiber-optic",
    icon: "Cable",
  },
  {
    title: "Digital Signage",
    description: "Cloud-managed digital displays for restaurants, retail, offices, healthcare, schools, and more. Professional installation throughout South Jersey.",
    href: "/services/digital-signage",
    icon: "Monitor",
  },
];

export const SERVICE_AREAS = {
  newJersey: {
    southJersey: ["Cherry Hill", "Camden", "Pennsauken", "Voorhees", "Mount Laurel", "Marlton", "Moorestown", "Deptford", "Glassboro", "Linwood", "Somers Point", "Northfield", "Egg Harbor Township", "Galloway", "Pleasantville", "Absecon"],
    centralJersey: ["Edison", "Woodbridge", "New Brunswick", "Piscataway", "East Brunswick", "Sayreville", "Old Bridge", "Freehold", "Marlboro", "Princeton"],
    jerseyShore: ["Atlantic City", "Brigantine", "Ocean City", "Wildwood", "Cape May", "Long Branch", "Asbury Park", "Point Pleasant", "Toms River", "Seaside Heights", "Margate", "Ventnor", "Longport"],
  },
  outOfState: {
    pennsylvania: ["Philadelphia", "King of Prussia", "Norristown", "Conshohocken", "West Chester", "Bensalem"],
    delaware: ["Wilmington", "Newark", "Middletown", "Dover", "Rehoboth Beach", "Lewes"],
    maryland: ["Baltimore", "Towson", "Columbia", "Ellicott City", "Annapolis"],
  },
};

export const CERTIFICATIONS = [
  "New Jersey Department of Consumer Affairs Licensed",
  "Professional Fire Alarm Licensed Contractor",
  "Security System Installation Licensed",
  "Telecommunications Infrastructure Certified",
  "Fiber Optic Installation & Fusion Splicing",
  "Emergency Response Protocol Trained",
];

export const FAQ_GENERAL = [
  {
    q: "What areas do you serve?",
    a: "We provide full-service security solutions throughout New Jersey, including alarm systems, surveillance cameras, access control, VoIP phone systems, and structured cabling. For customers outside New Jersey, we offer VoIP phone systems, CCTV camera systems, and card access control solutions across Pennsylvania, Delaware, and Maryland.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. We are fully licensed by the New Jersey Division of Consumer Affairs (License #34BF00056900) for security system installation and hold a separate fire alarm contractor license (#34FA00102800). We carry comprehensive liability insurance and workers' compensation coverage.",
  },
  {
    q: "Do you offer 24/7 emergency service?",
    a: "Yes, we provide 24/7 emergency support for all our clients. Our average emergency response time is under 2 hours for critical system failures.",
  },
  {
    q: "Do you offer financing?",
    a: "Yes, we offer flexible financing options for qualified businesses and homeowners. Contact us for details on available plans.",
  },
  {
    q: "How long have you been in business?",
    a: "You Need L.E.D. was founded in 2010 by Derek Weikel and has over 15 years of experience in the security and technology industry, with team members bringing 30+ years of combined expertise.",
  },
];
