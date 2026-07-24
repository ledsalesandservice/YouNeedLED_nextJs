// ============================================================
// Service Area Town Data — Hyper-local /service-areas/:slug pages
// Atlantic County + Downbeach core market surrounding our Linwood HQ.
// Every field is hand-written and specific to the town — no shared
// boilerplate copy. Landmarks, neighborhoods, and spotlights are real.
// ============================================================

export interface ServiceAreaTown {
  slug: string;
  name: string;
  /** Full municipal name as locals/USPS use it (e.g. "Ventnor City"). */
  officialName: string;
  county: string;
  stateAbbr: string;
  zips: string[];
  geo: { lat: number; lng: number };
  /** ~55–60 char SEO title (suffix appended in seoMeta). */
  metaTitle: string;
  metaDescription: string;
  /** Short hero sub-headline. */
  heroTagline: string;
  /** Opening paragraph — sets the local scene. */
  intro: string;
  /** Real landmarks / corridors / districts in this town. */
  landmarks: string[];
  /** Named neighborhoods / sections locals recognize. */
  neighborhoods: string[];
  /** Paragraph on the local business mix and how our services fit it. */
  localContext: string;
  /** A believable, town-specific project scenario. */
  spotlight: { title: string; body: string };
  /** Town-specific FAQ Q&A (feeds FAQPage schema). */
  faqs: { q: string; a: string }[];
  /** Distance/relationship to the Linwood HQ. */
  proximity: string;
  /** Internal links to other towns in this set. */
  nearby: string[];
}

export const SERVICE_AREA_TOWNS: ServiceAreaTown[] = [
  {
    slug: "linwood",
    name: "Linwood",
    officialName: "Linwood",
    county: "Atlantic County",
    stateAbbr: "NJ",
    zips: ["08221"],
    geo: { lat: 39.3387, lng: -74.5713 },
    metaTitle: "Security Cameras & VoIP in Linwood, NJ",
    metaDescription:
      "You Need L.E.D. is headquartered on New Road in Linwood, NJ. Local security cameras, access control, alarms, and business VoIP for our own hometown. Free quote: (609) 335-0123.",
    heroTagline:
      "This is our hometown. Our office sits on New Road — so Linwood businesses and homeowners get the fastest response we offer anywhere.",
    intro:
      "You Need L.E.D. has called Linwood home for years — our shop is right on New Road (Route 9), a few minutes from Central Avenue and the Linwood Bike Path. When a Linwood customer calls, they're often talking to a neighbor. We know the quiet residential streets off Shore Road, the professional offices near Central Square, and the mix of families and small businesses that make this one of the safest, most tight-knit towns on the mainland.",
    landmarks: [
      "New Road / Route 9 corridor",
      "Central Avenue business district",
      "Linwood Bike Path (Shore Road)",
      "Linwood Country Club",
      "Mainland Regional High School",
      "Patcong Creek & the back bays",
    ],
    neighborhoods: ["Central Square", "Shore Road", "All Wars Memorial area", "Poplar Avenue"],
    localContext:
      "Linwood is mostly professional offices, medical and dental practices, and established single-family neighborhoods — the kind of clients who want discreet, well-installed systems rather than the cheapest box on the shelf. We handle a lot of doctor and law offices along New Road that need HIPAA-minded camera placement and reliable business phone service, plus homeowners near the country club and bike path who want clean 4K coverage that doesn't clutter the house.",
    spotlight: {
      title: "New Road Professional Office",
      body: "A multi-practice office building on New Road, five minutes from our shop, needed camera coverage of its shared lobby and parking lot plus a phone system that could route calls to three separate tenants. We installed 4K cameras with privacy-aware angles at the entrances, added CDVI access control on the suite doors, and set up a hosted VoIP system with per-tenant auto-attendant — all wrapped up in two days because the crew was working ten minutes from home.",
    },
    faqs: [
      {
        q: "How fast can You Need L.E.D. get to my Linwood property?",
        a: "Very fast — our office is on New Road in Linwood, so we consider the whole town our backyard. Most Linwood service calls are scheduled same-day or next-day, and emergencies get top priority.",
      },
      {
        q: "Do you work on homes as well as businesses in Linwood?",
        a: "Yes. In Linwood we install residential camera systems, video doorbells, and alarms for homeowners near the country club, Shore Road, and the bike path, alongside our commercial work for offices along New Road and Central Avenue.",
      },
      {
        q: "Are you licensed to install security and fire alarm systems in Linwood?",
        a: "Yes. We hold NJ DCA Security License #34BF00056900 and Fire Alarm License #34FA00102800, and we're your local, licensed installer right here in Linwood.",
      },
    ],
    proximity: "Our headquarters — you can't get more local than this.",
    nearby: ["northfield", "somers-point", "egg-harbor-township"],
  },
  {
    slug: "somers-point",
    name: "Somers Point",
    officialName: "Somers Point",
    county: "Atlantic County",
    stateAbbr: "NJ",
    zips: ["08244"],
    geo: { lat: 39.3187, lng: -74.5985 },
    metaTitle: "Security Cameras & VoIP in Somers Point, NJ",
    metaDescription:
      "Local security cameras, access control, and business phone systems for Somers Point, NJ — Shore Medical Center, Bay Avenue restaurants, and the Route 52 gateway. Free quote: (609) 335-0123.",
    heroTagline:
      "The gateway to Ocean City. From Shore Medical Center to the bayfront restaurants on Bay Avenue, we keep Somers Point businesses covered.",
    intro:
      "Somers Point sits right next door to our Linwood office, at the mainland end of the Route 52 causeway into Ocean City. It's a town of two personalities: the busy medical and retail corridor around Shore Medical Center and New Road, and the historic bayfront where restaurants and bars have looked out over the Great Egg Harbor Bay for generations. We serve both — the practices and offices that need dependable systems, and the waterfront hospitality spots that get slammed every summer weekend.",
    landmarks: [
      "Shore Medical Center",
      "Bay Avenue waterfront restaurants",
      "The Somers Point Circle (Routes 9 & 52)",
      "Historic Somers Mansion",
      "Kennedy Park & the bayfront",
      "MacArthur Boulevard",
    ],
    neighborhoods: ["Bayfront / Higbee Beach area", "New Road corridor", "Bethel Road", "Mays Landing Road"],
    localContext:
      "Because Somers Point is the last stop before the Ocean City bridge, its restaurants, bars, and medical offices see enormous seasonal swings. Bayfront hospitality clients need weatherproof cameras that hold up to salt air and phone systems that survive a Saturday-night reservation rush, while the Shore Medical corridor is full of practices that want HIPAA-conscious surveillance and clean call routing. We build for both extremes.",
    spotlight: {
      title: "Bay Avenue Waterfront Restaurant",
      body: "A well-known Bay Avenue restaurant with an outdoor deck over the bay was missing reservation calls every summer weekend and had aging cameras corroding in the salt air. We installed marine-grade IP66 cameras covering the deck, bar, and parking lot, then rolled out a hosted VoIP system with a seasonal auto-attendant and overflow routing — so no reservation call goes unanswered, even at peak Friday-night volume with the sun setting over the Route 52 bridge.",
    },
    faqs: [
      {
        q: "Do you install cameras that hold up to the salt air on the Somers Point bayfront?",
        a: "Yes. For bayfront restaurants and marinas along Bay Avenue we use marine-grade, corrosion-resistant camera housings rated for coastal environments, so your system keeps working through the salt, humidity, and storms.",
      },
      {
        q: "Can you set up a phone system that handles our summer reservation rush?",
        a: "Absolutely. We install hosted VoIP with auto-attendant, seasonal call routing, and overflow handling — plus optional LEDConnect AI Voice Agent — so Somers Point restaurants never miss a reservation during peak weekends.",
      },
      {
        q: "Do you work with the medical offices near Shore Medical Center?",
        a: "Yes. We handle HIPAA-conscious camera placement, access control, and VoIP for medical and professional offices throughout the New Road and Shore Medical Center corridor in Somers Point.",
      },
    ],
    proximity: "Right next to our Linwood HQ — usually a 5-minute drive.",
    nearby: ["linwood", "northfield", "ocean-city"],
  },
  {
    slug: "northfield",
    name: "Northfield",
    officialName: "Northfield",
    county: "Atlantic County",
    stateAbbr: "NJ",
    zips: ["08225"],
    geo: { lat: 39.3651, lng: -74.5527 },
    metaTitle: "Security Cameras & VoIP in Northfield, NJ",
    metaDescription:
      "Security cameras, alarms, access control, and VoIP for Northfield, NJ — the Tilton Road corridor, Birch Grove Park, and mainland professional offices. Free quote: (609) 335-0123.",
    heroTagline:
      "On the Tilton Road corridor between Linwood and Pleasantville — a quick drive from our shop and a town we know street by street.",
    intro:
      "Northfield is our next-door neighbor to the north, built around the busy Tilton Road and New Road corridors and the wooded calm of Birch Grove Park. It's a practical, mainland town — car dealerships, banks, offices, the county's shore branch, and solid residential neighborhoods. We're on Northfield jobs constantly, and being minutes away means we can swing by for a service call or a same-week install without it ever being a production.",
    landmarks: [
      "Tilton Road commercial corridor",
      "Birch Grove Park",
      "New Road / Route 9",
      "Northfield Community School",
      "Otto Bruyns Public Library",
      "The Shore (bike) Path",
    ],
    neighborhoods: ["Tilton Road corridor", "Zion Road", "Mill Road", "Burton Avenue area"],
    localContext:
      "Northfield's Tilton Road is one of the mainland's busiest retail and service strips — auto dealers, banks, insurance agencies, and professional offices that all depend on solid surveillance, alarms, and business phones. We install a lot of parking-lot and showroom coverage for the dealerships, secure entry for the financial offices, and reliable VoIP for the agencies and practices that line the corridor.",
    spotlight: {
      title: "Tilton Road Auto Dealership",
      body: "A Tilton Road dealership needed real coverage of its outdoor inventory lot after a string of late-night break-ins. We deployed 4K cameras with license-plate recognition across the lot and entrances, tied in motion-triggered alerts for after hours, and upgraded the showroom phones to hosted VoIP with proper call routing between sales and service. The overnight vandalism stopped, and the footage has already helped Northfield PD on one case.",
    },
    faqs: [
      {
        q: "Can you cover a large outdoor lot like a Northfield car dealership?",
        a: "Yes. We design 4K camera systems with license-plate recognition and after-hours motion alerts specifically for the large inventory lots and showrooms along Northfield's Tilton Road corridor.",
      },
      {
        q: "How quickly can you reach Northfield for service?",
        a: "Northfield is minutes from our Linwood office, so we typically schedule installs within the week and handle service calls same-day or next-day.",
      },
      {
        q: "Do you install alarm systems for Northfield businesses and homes?",
        a: "Yes. We install monitored intrusion alarms with mobile alerts and optional video verification for both the Tilton Road businesses and the residential neighborhoods around Birch Grove Park.",
      },
    ],
    proximity: "A few minutes north of our Linwood HQ.",
    nearby: ["linwood", "pleasantville", "egg-harbor-township"],
  },
  {
    slug: "egg-harbor-township",
    name: "Egg Harbor Township",
    officialName: "Egg Harbor Township",
    county: "Atlantic County",
    stateAbbr: "NJ",
    zips: ["08234", "08232"],
    geo: { lat: 39.3773, lng: -74.5957 },
    metaTitle: "Security Cameras & VoIP in Egg Harbor Township, NJ",
    metaDescription:
      "Security cameras, access control, and business phone systems for Egg Harbor Township (EHT), NJ — the English Creek & Tilton Road corridors, Black Horse Pike, and AC Airport area. Free quote: (609) 335-0123.",
    heroTagline:
      "EHT is one of the biggest towns in Atlantic County — from Storybook Land to the airport, we cover its retail corridors and business parks end to end.",
    intro:
      "Egg Harbor Township is a sprawling, fast-growing municipality that wraps around Atlantic City's mainland side, taking in everything from Storybook Land and the English Creek Avenue shopping corridor to the industrial and office parks near Atlantic City International Airport and the FAA Tech Center. With so many storefronts, medical plazas, warehouses, and neighborhoods spread across the township, EHT is one of our busiest service areas — and we know its corridors, from the Black Horse Pike to Fire Road, cold.",
    landmarks: [
      "English Creek Avenue shopping corridor",
      "Tilton Road & Fire Road",
      "Black Horse Pike (Route 322/40)",
      "Storybook Land",
      "Atlantic City International Airport & FAA Tech Center",
      "Shore Mall / Cardiff area",
    ],
    neighborhoods: ["Cardiff", "Bargaintown", "Scullville", "West Atlantic City", "English Creek"],
    localContext:
      "EHT's sheer size means we do a bit of everything here: multi-tenant retail strips on English Creek and the Black Horse Pike, medical plazas and urgent-care centers, warehouses and light-industrial buildings near the airport, and a huge base of homeowners across Cardiff, Bargaintown, and Scullville. That variety is exactly why so many EHT businesses call us — one local company that can handle cameras, access control, fire alarm, and VoIP under one roof.",
    spotlight: {
      title: "English Creek Avenue Retail Plaza",
      body: "A multi-tenant plaza on English Creek Avenue wanted one shared 4K camera system covering the parking lot and storefronts, with each business able to view only its own footage. We networked the cameras to cloud storage, gave each tenant a private login, and added access control on the shared rear entrance and loading area. Eight tenants now split the cost of a system none of them could justify alone — and shoplifting dropped noticeably in the first quarter.",
    },
    faqs: [
      {
        q: "Do you serve all of Egg Harbor Township, including Cardiff, Bargaintown, and English Creek?",
        a: "Yes. EHT is one of our core service areas and we cover the entire township — from the English Creek and Tilton Road corridors to Cardiff, Bargaintown, Scullville, and the airport business parks.",
      },
      {
        q: "Can multiple tenants in an EHT retail plaza share one camera system?",
        a: "Yes. We build shared 4K systems for EHT strip plazas where each tenant gets a private cloud login to their own cameras, splitting the cost while keeping footage separate and secure.",
      },
      {
        q: "Do you install security for warehouses near Atlantic City International Airport?",
        a: "Yes. We handle perimeter cameras, license-plate recognition, access control, and loading-dock coverage for the warehouses and light-industrial buildings in EHT's airport and Fire Road corridors.",
      },
    ],
    proximity: "About 10 minutes from our Linwood office.",
    nearby: ["northfield", "pleasantville", "somers-point"],
  },
  {
    slug: "pleasantville",
    name: "Pleasantville",
    officialName: "Pleasantville",
    county: "Atlantic County",
    stateAbbr: "NJ",
    zips: ["08232"],
    geo: { lat: 39.3898, lng: -74.5241 },
    metaTitle: "Security Cameras & VoIP in Pleasantville, NJ",
    metaDescription:
      "Commercial security cameras, access control, and business phone systems for Pleasantville, NJ — Main Street, the Black Horse Pike, and Lakes Bay. NJ DCA Licensed. Free quote: (609) 335-0123.",
    heroTagline:
      "Just off the Black Horse Pike at the doorstep of Atlantic City — practical, hard-wearing security for Pleasantville's businesses.",
    intro:
      "Pleasantville sits right between the mainland and Atlantic City, straddling the Black Horse Pike and Route 40/322 with Lakes Bay along its edge. It's a working city — a Main Street business district, auto shops and service businesses along the Pike, warehouses, and busy residential blocks. Pleasantville businesses want security that's tough, dependable, and doesn't break the bank, and that's exactly the kind of no-nonsense install we do here.",
    landmarks: [
      "Main Street business district",
      "Black Horse Pike (Route 40/322)",
      "New Road / Route 9",
      "Lakes Bay",
      "Pleasantville High School (Greenfield Avenue)",
      "Doughty Road corridor",
    ],
    neighborhoods: ["Main Street", "Washington Avenue", "South Main", "Decatur Avenue area"],
    localContext:
      "Along the Black Horse Pike and Main Street you'll find auto shops, convenience stores, service businesses, and warehouses — the kind of places that need reliable cameras, real deterrence, and simple, affordable systems that just work. We install a lot of storefront and lot coverage, monitored alarms, and straightforward VoIP here, and we're candid with owners about getting solid protection without overpaying for features they'll never use.",
    spotlight: {
      title: "Black Horse Pike Service Business",
      body: "A busy auto-service business on the Black Horse Pike was dealing with after-hours theft from its side lot and outdated phones that dropped customer calls. We put 4K cameras with night vision across the lot, bays, and entrances, added a monitored alarm with mobile alerts, and swapped the old phones for a clean hosted VoIP line with voicemail-to-email. Straightforward, affordable, and it put a stop to the overnight losses.",
    },
    faqs: [
      {
        q: "Do you install affordable camera systems for Pleasantville small businesses?",
        a: "Yes. We specialize in practical, cost-effective 4K camera and alarm systems for the auto shops, storefronts, and service businesses along Pleasantville's Main Street and the Black Horse Pike — solid protection without paying for features you don't need.",
      },
      {
        q: "Are you licensed to install security systems in Pleasantville?",
        a: "Yes. We're NJ DCA licensed (#34BF00056900) and fire-alarm licensed (#34FA00102800), and Pleasantville is minutes from our Linwood office.",
      },
      {
        q: "Can you add monitored alarms with mobile alerts for a Pleasantville business?",
        a: "Yes. We install professionally monitored intrusion alarms with instant mobile alerts and optional video verification for businesses and homes throughout Pleasantville.",
      },
    ],
    proximity: "Roughly 10 minutes from our Linwood HQ.",
    nearby: ["northfield", "egg-harbor-township", "atlantic-city"],
  },
  {
    slug: "atlantic-city",
    name: "Atlantic City",
    officialName: "Atlantic City",
    county: "Atlantic County",
    stateAbbr: "NJ",
    zips: ["08401"],
    geo: { lat: 39.3643, lng: -74.4229 },
    metaTitle: "Security Cameras & VoIP in Atlantic City, NJ",
    metaDescription:
      "Commercial security cameras, access control, and VoIP for Atlantic City, NJ — the Boardwalk, Tanger Outlets, the Marina District, and Atlantic & Pacific Avenue businesses. Free quote: (609) 335-0123.",
    heroTagline:
      "From the Boardwalk to the Marina District — high-traffic, high-stakes security for Atlantic City's businesses.",
    intro:
      "Atlantic City is the region's engine — the Boardwalk, Boardwalk Hall, the Steel Pier, Tanger Outlets The Walk, the Convention Center, and the Marina District all packed into a few square miles that host millions of visitors a year. Beyond the casinos, there's a whole world of restaurants, retail, hotels, parking operations, and professional offices along Atlantic and Pacific Avenues that need serious, well-documented security. We give AC's non-gaming businesses the same caliber of protection the big houses expect, sized for their budgets.",
    landmarks: [
      "The Boardwalk & Boardwalk Hall",
      "Steel Pier",
      "Tanger Outlets — The Walk",
      "Atlantic City Convention Center",
      "The Marina District",
      "Absecon Lighthouse",
    ],
    neighborhoods: ["Ducktown", "Chelsea", "The Inlet", "Bungalow Park", "Atlantic & Pacific Avenue corridor"],
    localContext:
      "In Atlantic City, foot traffic is enormous and liability is real, so businesses need cameras that actually hold up as evidence, license-plate recognition in parking structures, and remote access so owners can watch a property from off-site. Boardwalk shops, Atlantic Avenue restaurants, boutique hotels, and parking operations all rely on us for high-resolution coverage, access control, and phone systems that can take the volume of a summer weekend or a convention week.",
    spotlight: {
      title: "Boardwalk Hotel & Parking Structure",
      body: "A boutique boardwalk hotel needed round-the-clock coverage of its lobby, multi-level parking structure, and exterior, with remote access for an owner who travels. We installed 4K AI cameras with license-plate recognition throughout the garage, PTZ cameras on the boardwalk entrance, and 30-day cloud storage the owner can pull up from anywhere. License-plate footage has already been used in two theft prosecutions, and the documented upgrade lowered the property's insurance premium.",
    },
    faqs: [
      {
        q: "Do you install license-plate recognition for Atlantic City parking structures?",
        a: "Yes. We deploy 4K AI cameras with license-plate recognition throughout AC parking garages and lots, giving hotels and operators searchable records that hold up for law enforcement and insurance.",
      },
      {
        q: "Can an Atlantic City business owner monitor cameras remotely from off-site?",
        a: "Yes. Every system we install includes secure remote access with cloud storage, so AC owners and managers can watch the Boardwalk, the lobby, or the lot live from a phone anywhere in the world.",
      },
      {
        q: "Do you handle security for non-casino businesses in Atlantic City?",
        a: "That's our specialty. We serve the Boardwalk shops, Atlantic and Pacific Avenue restaurants, boutique hotels, parking operators, and offices with commercial-grade cameras, access control, and VoIP.",
      },
    ],
    proximity: "About 15 minutes from our Linwood office.",
    nearby: ["ventnor", "pleasantville", "absecon"],
  },
  {
    slug: "ventnor",
    name: "Ventnor",
    officialName: "Ventnor City",
    county: "Atlantic County",
    stateAbbr: "NJ",
    zips: ["08406"],
    geo: { lat: 39.3401, lng: -74.4774 },
    metaTitle: "Security Cameras & VoIP in Ventnor City, NJ",
    metaDescription:
      "Security cameras, alarms, and business phone systems for Ventnor City, NJ — the Ventnor Boardwalk, the fishing pier, Ventnor Avenue, and St. Leonard's Tract. Free quote: (609) 335-0123.",
    heroTagline:
      "Quiet, residential Downbeach — Ventnor's homes and Ventnor Avenue businesses get clean, discreet coverage that fits the neighborhood.",
    intro:
      "Ventnor City is the first of the Downbeach towns south of Atlantic City — a walkable, residential barrier-island community known for its uncrowded boardwalk, the Ventnor fishing pier, and the handsome homes of the St. Leonard's Tract. The business life runs along Ventnor and Atlantic Avenues: cafés, shops, professional offices, and the corner establishments that serve a year-round island population. Here the work is about tasteful, well-hidden systems that protect a property without shouting about it.",
    landmarks: [
      "Ventnor City Boardwalk",
      "Ventnor Fishing Pier",
      "Ventnor Avenue business district",
      "St. Leonard's Tract",
      "Ventnor Heights (bayside)",
      "Dorset Avenue",
    ],
    neighborhoods: ["St. Leonard's Tract", "Ventnor Heights", "Marven Gardens edge", "Ski Beach / bayfront"],
    localContext:
      "Ventnor's clientele skews residential and boutique — homeowners who want discreet camera and alarm systems that suit an architecturally proud street, and small Ventnor Avenue businesses that need reliable coverage without an industrial look. We do a lot of video doorbells, low-profile 4K cameras, and monitored alarms here, plus remote-viewing setups for the many second-home owners who want eyes on the property in the off-season.",
    spotlight: {
      title: "St. Leonard's Tract Second Home",
      body: "A second-home owner in the St. Leonard's Tract wanted to watch over a beautiful older home while spending winters away, without drilling up the historic trim. We installed discreet wireless 4K cameras and a video doorbell tied to a monitored alarm, all viewable from the owner's phone, plus water and entry sensors for peace of mind. Now they get an alert and a live look the moment anything happens — from a thousand miles away.",
    },
    faqs: [
      {
        q: "Do you install discreet camera systems for Ventnor homes?",
        a: "Yes. Ventnor's residential streets call for low-profile, well-placed 4K cameras and video doorbells that protect the home without cluttering the architecture — that's most of what we do on the island.",
      },
      {
        q: "Can you set up remote monitoring for a Ventnor second home in the off-season?",
        a: "Yes. We install cameras and monitored alarms with mobile alerts and live remote viewing so Downbeach second-home owners can check on a Ventnor property from anywhere, any time of year.",
      },
      {
        q: "Do you serve businesses along Ventnor Avenue?",
        a: "Yes. We install cameras, alarms, and hosted VoIP for the cafés, shops, and professional offices along the Ventnor and Atlantic Avenue business corridors.",
      },
    ],
    proximity: "About 15 minutes from our Linwood HQ.",
    nearby: ["margate", "atlantic-city", "somers-point"],
  },
  {
    slug: "margate",
    name: "Margate",
    officialName: "Margate City",
    county: "Atlantic County",
    stateAbbr: "NJ",
    zips: ["08402"],
    geo: { lat: 39.3279, lng: -74.5035 },
    metaTitle: "Security Cameras & VoIP in Margate City, NJ",
    metaDescription:
      "Security cameras, alarms, and business VoIP for Margate City, NJ — Lucy the Elephant, the Ventnor & Amherst Avenue shops, and Downbeach's restaurants. Free quote: (609) 335-0123.",
    heroTagline:
      "Home of Lucy the Elephant — upscale Downbeach protection for Margate's shops, restaurants, and beach-block homes.",
    intro:
      "Margate City is Downbeach's stylish heart — home to Lucy the Elephant, a lively restaurant and boutique scene along Ventnor and Amherst Avenues, and some of the most valuable beach-block real estate on the island. Between the Marven Gardens edge and the bay, Margate blends a busy warm-season business district with an affluent residential base that expects a polished, professional job. That's our sweet spot: high-end systems installed cleanly, backed by a local crew.",
    landmarks: [
      "Lucy the Elephant",
      "Ventnor Avenue restaurant & shopping district",
      "Amherst Avenue",
      "Washington Avenue business area",
      "Marven Gardens",
      "The bayfront & Downbeach docks",
    ],
    neighborhoods: ["Beach blocks", "Marven Gardens", "Parkway section", "Bayfront / Amherst"],
    localContext:
      "Margate's restaurants and boutiques get slammed in season and need cameras and phone systems that can take the pressure, while its beach-block homeowners want premium, unobtrusive security for high-value properties. We install a lot of restaurant coverage and reservation-ready VoIP along Ventnor Avenue, plus discreet whole-home camera and alarm systems — often with remote viewing for owners who split time between Margate and the city.",
    spotlight: {
      title: "Ventnor Avenue Restaurant",
      body: "A popular Ventnor Avenue restaurant near Lucy needed dining-area and entrance cameras for liability, plus a phone system that could keep up with summer reservation volume. We installed 4K cameras covering the dining room, bar, and sidewalk seating, then set up hosted VoIP with reservation routing and an AI overflow option so no call goes to voicemail during the Friday rush. The owner now has clean incident footage and a phone system that finally matches the crowd.",
    },
    faqs: [
      {
        q: "Do you install security for high-value beach-block homes in Margate?",
        a: "Yes. Margate's beach blocks are full of premium properties, and we install discreet, whole-home 4K camera and monitored alarm systems with remote viewing for owners who travel or split time with the city.",
      },
      {
        q: "Can you handle cameras and phones for a busy Margate restaurant?",
        a: "Yes. We install dining-area and entrance cameras for liability plus hosted VoIP with reservation routing and AI overflow handling for the restaurants along Margate's Ventnor and Amherst Avenue corridors.",
      },
      {
        q: "Is You Need L.E.D. local to Margate?",
        a: "Yes — our office is just across the bay in Linwood, about 12 minutes away, so Margate gets a genuinely local, licensed installer rather than an out-of-area contractor.",
      },
    ],
    proximity: "About 12 minutes from our Linwood office.",
    nearby: ["ventnor", "atlantic-city", "somers-point"],
  },
  {
    slug: "galloway",
    name: "Galloway",
    officialName: "Galloway Township",
    county: "Atlantic County",
    stateAbbr: "NJ",
    zips: ["08205"],
    geo: { lat: 39.4901, lng: -74.4846 },
    metaTitle: "Security Cameras & VoIP in Galloway Township, NJ",
    metaDescription:
      "Security cameras, access control, and business phone systems for Galloway Township, NJ — Stockton University, Historic Smithville, the White Horse Pike, and Seaview. Free quote: (609) 335-0123.",
    heroTagline:
      "Home to Stockton University and Historic Smithville — sprawling Galloway gets full-service, licensed coverage across its many corridors.",
    intro:
      "Galloway Township is one of Atlantic County's largest municipalities by area, stretching from the White Horse Pike and Jimmie Leeds Road out toward the Edwin B. Forsythe wildlife refuge. It's anchored by Stockton University, the shops and restaurants of Historic Smithville and the Village Greene, and the Seaview resort and golf club, with medical offices and residential developments filling the space between. That spread-out mix of institutional, hospitality, and residential clients keeps us busy across the township.",
    landmarks: [
      "Stockton University",
      "Historic Smithville & the Village Greene",
      "White Horse Pike (Route 30)",
      "Jimmie Leeds Road medical corridor",
      "Seaview Hotel & Golf Club",
      "Edwin B. Forsythe National Wildlife Refuge",
    ],
    neighborhoods: ["Smithville", "Pomona", "Absecon Highlands", "Oceanville", "Cologne"],
    localContext:
      "Galloway runs the gamut: the student-heavy district around Stockton, the boutiques and eateries of Historic Smithville, the medical practices along Jimmie Leeds Road, and hospitality at Seaview — plus large residential developments spread across Pomona and Absecon Highlands. We handle everything from multi-building access control and camera networks to student-housing entry systems and reliable VoIP for the offices and shops, all from a shop that's a short drive down Route 9.",
    spotlight: {
      title: "Jimmie Leeds Road Medical Practice",
      body: "A growing medical practice on the Jimmie Leeds Road corridor near Stockton needed HIPAA-minded camera coverage of its waiting rooms and parking, plus a phone system that could route calls cleanly and answer after hours. We installed 4K cameras with privacy-masking zones, added CDVI access control on the clinical doors, and set up hosted VoIP with a LEDConnect AI Voice Agent handling after-hours calls and appointment requests — cutting the practice's callback backlog dramatically.",
    },
    faqs: [
      {
        q: "Do you cover all of Galloway Township, including Smithville and Pomona?",
        a: "Yes. Galloway is large and we serve all of it — from the Stockton University area and Jimmie Leeds Road to Historic Smithville, Pomona, Absecon Highlands, and Oceanville.",
      },
      {
        q: "Can you install HIPAA-conscious camera systems for Galloway medical offices?",
        a: "Yes. For the medical practices along Jimmie Leeds Road we install 4K cameras with privacy-masking zones, access control on clinical doors, and VoIP with after-hours AI answering.",
      },
      {
        q: "Do you handle access control for multi-building or student-adjacent properties in Galloway?",
        a: "Yes. We design CDVI and mobile-credential access control for multi-building offices, student-adjacent housing, and hospitality properties throughout Galloway.",
      },
    ],
    proximity: "About 20 minutes from our Linwood office.",
    nearby: ["absecon", "egg-harbor-township", "atlantic-city"],
  },
  {
    slug: "absecon",
    name: "Absecon",
    officialName: "Absecon",
    county: "Atlantic County",
    stateAbbr: "NJ",
    zips: ["08201"],
    geo: { lat: 39.4276, lng: -74.4954 },
    metaTitle: "Security Cameras & VoIP in Absecon, NJ",
    metaDescription:
      "Security cameras, alarms, access control, and business VoIP for Absecon, NJ — the White Horse Pike, Shore Road, and the Atlantic City Expressway gateway. Free quote: (609) 335-0123.",
    heroTagline:
      "The mainland gateway to the shore, where the White Horse Pike meets Shore Road — dependable coverage for Absecon's businesses and homes.",
    intro:
      "Absecon sits at the crossroads of the mainland, where the White Horse Pike (Route 30) and Shore Road (Route 9) funnel traffic toward Atlantic City and the Atlantic City Expressway begins. It's a compact city of small businesses, professional offices, marinas along Absecon Bay, and steady residential neighborhoods. Being right on the main routes between our shop and AC, Absecon is a town we pass through and work in all the time.",
    landmarks: [
      "White Horse Pike (Route 30)",
      "Shore Road (Route 9)",
      "Absecon Bay & the back-bay marinas",
      "The Atlantic City Expressway gateway",
      "Historic Towne of Smithville (nearby)",
      "Absecon Highlands",
    ],
    neighborhoods: ["Downtown Absecon", "Absecon Highlands", "Faunce Landing", "Bayside / marina area"],
    localContext:
      "Absecon's businesses cluster along the White Horse Pike and Shore Road — retail, restaurants, service shops, and offices — with marinas and waterfront properties tucked along the bay. They want practical, reliable systems: storefront and lot cameras, monitored alarms, and clean business phones. The waterfront and marina clients need weather-rated gear, and we spec accordingly.",
    spotlight: {
      title: "White Horse Pike Retail & Marina",
      body: "A White Horse Pike business with a back-bay marina component needed cameras that could cover both a busy storefront and exposed dock area, plus a phone system that wouldn't drop calls. We installed weatherproof 4K cameras on the docks and lot with license-plate recognition at the entrance, tied in a monitored alarm, and set up hosted VoIP with voicemail-to-email. Dock incidents that used to go unrecorded are now fully documented.",
    },
    faqs: [
      {
        q: "Do you install weatherproof cameras for Absecon's bayfront and marina properties?",
        a: "Yes. For Absecon's back-bay docks and marinas we use weather-rated 4K cameras built to survive salt air and exposure, often paired with license-plate recognition at the entrances.",
      },
      {
        q: "Can you cover a storefront on the White Horse Pike or Shore Road?",
        a: "Yes. We install storefront and parking-lot camera systems, monitored alarms, and hosted VoIP for the retail, restaurants, and offices along Absecon's White Horse Pike and Shore Road corridors.",
      },
      {
        q: "Is Absecon within your fast-response service area?",
        a: "Yes. Absecon is right on the route between our Linwood office and Atlantic City, so we reach it quickly for both installs and service calls.",
      },
    ],
    proximity: "About 15 minutes from our Linwood office.",
    nearby: ["galloway", "atlantic-city", "pleasantville"],
  },
  {
    slug: "ocean-city",
    name: "Ocean City",
    officialName: "Ocean City",
    county: "Cape May County",
    stateAbbr: "NJ",
    zips: ["08226"],
    geo: { lat: 39.2776, lng: -74.5746 },
    metaTitle: "Security Cameras & VoIP in Ocean City, NJ",
    metaDescription:
      "Security cameras, alarms, and business phone systems for Ocean City, NJ — the Boardwalk, the Music Pier, Asbury Avenue, and the family-resort business district. Free quote: (609) 335-0123.",
    heroTagline:
      "America's Greatest Family Resort — seasonal-smart security for Ocean City's boardwalk businesses, shops, and rental properties.",
    intro:
      "Ocean City, just across the Route 52 causeway from Somers Point, is the classic South Jersey family resort — a dry town built around its boardwalk, the Music Pier, Gillian's Wonderland Pier, and the Asbury Avenue shopping district, with block after block of rental homes running down to Corson's Inlet. The population multiplies in summer and thins out in winter, so smart, scalable, seasonally-aware security is the name of the game here, and we build systems that flex with the calendar.",
    landmarks: [
      "The Ocean City Boardwalk",
      "The Music Pier",
      "Gillian's Wonderland Pier",
      "Asbury Avenue shopping district",
      "Corson's Inlet State Park",
      "The 9th Street gateway",
    ],
    neighborhoods: ["Downtown / Asbury Avenue", "The Gardens", "Merion Park", "North End", "South End"],
    localContext:
      "Ocean City's businesses live and die by the season — boardwalk shops, Asbury Avenue retail, and rental-property managers all need coverage that can scale up for the summer crush and dial back for the quiet months. We install cloud-based camera systems with seasonal monitoring modes, remote viewing for owners and rental managers, and phone systems that can handle a July Saturday, so an OC business pays for what it needs when it needs it.",
    spotlight: {
      title: "Boardwalk Business & Rental Manager",
      body: "An Ocean City owner running a boardwalk shop plus a handful of seasonal rentals wanted one system to watch it all, armed for summer and remotely monitored in the off-season. We set up cloud-managed 4K cameras with seasonal activation and motion-triggered off-season alerts, added smart-lock and camera coverage at the rentals, and gave the owner a single app for everything. Off-season vandalism now gets caught and documented without a single on-site trip.",
    },
    faqs: [
      {
        q: "Can you set up seasonal camera monitoring for an Ocean City business?",
        a: "Yes. We install cloud-based 4K systems with seasonal activation and off-season motion alerts, so Ocean City boardwalk shops and rentals get full coverage in summer and remote monitoring when they're closed.",
      },
      {
        q: "Do you serve Ocean City even though it's in Cape May County?",
        a: "Absolutely. Ocean City is right across the Route 52 bridge from our Linwood-area base, about 15 minutes away, and it's one of our regular shore service areas.",
      },
      {
        q: "Can rental-property owners in Ocean City monitor their units remotely?",
        a: "Yes. We install cameras and smart-lock systems with remote viewing and alerts so Ocean City rental managers and second-home owners can watch every property from one app, anywhere.",
      },
    ],
    proximity: "About 15 minutes from our Linwood office, across the Route 52 bridge.",
    nearby: ["somers-point", "linwood", "ventnor"],
  },
];

export function getServiceAreaBySlug(slug: string): ServiceAreaTown | undefined {
  return SERVICE_AREA_TOWNS.find((t) => t.slug === slug);
}
