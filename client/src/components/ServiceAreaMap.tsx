/**
 * ServiceAreaMap — You Need L.E.D.
 * Displays all customer job locations across South Jersey & Delaware Valley
 * to visually demonstrate the breadth of the company's service coverage.
 *
 * Static coverage grid (no Google Maps API key needed).
 * Color-coded: Fire Alarm (red), CCTV (blue), Access Control (green), Low Voltage (amber).
 */
import { MapPin } from "lucide-react";

interface ServiceLocation {
  town: string;
  state: string;
  service: "Fire Alarm" | "CCTV" | "Access Control" | "Low Voltage";
}

const SERVICE_LOCATIONS: ServiceLocation[] = [
  {town:"Linwood",state:"NJ",service:"Fire Alarm"},
  {town:"Somers Point",state:"NJ",service:"Low Voltage"},
  {town:"Northfield",state:"NJ",service:"Fire Alarm"},
  {town:"Egg Harbor Township",state:"NJ",service:"CCTV"},
  {town:"Cherry Hill",state:"NJ",service:"Access Control"},
  {town:"Egg Harbor Township",state:"NJ",service:"Fire Alarm"},
  {town:"Pleasantville",state:"NJ",service:"Low Voltage"},
  {town:"Atlantic City",state:"NJ",service:"Fire Alarm"},
  {town:"Galloway",state:"NJ",service:"CCTV"},
  {town:"Ventnor",state:"NJ",service:"Fire Alarm"},
  {town:"Margate",state:"NJ",service:"Access Control"},
  {town:"Ocean City",state:"NJ",service:"Fire Alarm"},
  {town:"Absecon",state:"NJ",service:"Low Voltage"},
  {town:"Mays Landing",state:"NJ",service:"CCTV"},
  {town:"Millville",state:"NJ",service:"Fire Alarm"},
  {town:"Bridgeton",state:"NJ",service:"Fire Alarm"},
  {town:"Vineland",state:"NJ",service:"Access Control"},
  {town:"Glassboro",state:"NJ",service:"Fire Alarm"},
  {town:"Deptford",state:"NJ",service:"Low Voltage"},
  {town:"Voorhees",state:"NJ",service:"Fire Alarm"},
  {town:"Mount Laurel",state:"NJ",service:"CCTV"},
  {town:"Marlton",state:"NJ",service:"Fire Alarm"},
  {town:"Moorestown",state:"NJ",service:"Fire Alarm"},
  {town:"Medford",state:"NJ",service:"Low Voltage"},
  {town:"Toms River",state:"NJ",service:"Fire Alarm"},
  {town:"Camden",state:"NJ",service:"CCTV"},
  {town:"Pennsauken",state:"NJ",service:"Access Control"},
  {town:"Cape May",state:"NJ",service:"Fire Alarm"},
  {town:"Wildwood",state:"NJ",service:"Low Voltage"},
  {town:"Willingboro",state:"NJ",service:"Low Voltage"},
  {town:"Newark",state:"DE",service:"Fire Alarm"},
  {town:"Wilmington",state:"DE",service:"Access Control"},
  {town:"Bohemia",state:"MD",service:"Fire Alarm"},
  {town:"Philadelphia",state:"PA",service:"CCTV"},
];

const SERVICE_COLORS: Record<string, string> = {
  "Fire Alarm": "#dc2626",
  CCTV: "#2563eb",
  "Access Control": "#16a34a",
  "Low Voltage": "#d97706",
};

const LEGEND_ITEMS = [
  { label: "Fire Alarm", color: "#dc2626" },
  { label: "CCTV / Cameras", color: "#2563eb" },
  { label: "Access Control", color: "#16a34a" },
  { label: "Low Voltage", color: "#d97706" },
];

export default function ServiceAreaMap() {
  // Group by state
  const grouped = SERVICE_LOCATIONS.reduce<Record<string, ServiceLocation[]>>(
    (acc, loc) => {
      if (!acc[loc.state]) acc[loc.state] = [];
      acc[loc.state].push(loc);
      return acc;
    },
    {}
  );

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-white/80">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Coverage grid — replaces the Google Map */}
      <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6 text-white/90">
          <MapPin className="w-5 h-5 text-[#f97015]" />
          <span className="font-semibold text-sm">Service Coverage — 200+ Locations</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(grouped).map(([state, locations]) => (
            <div key={state}>
              <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">
                {state === "NJ"
                  ? "New Jersey"
                  : state === "DE"
                  ? "Delaware"
                  : state === "MD"
                  ? "Maryland"
                  : "Pennsylvania"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc, i) => (
                  <div
                    key={`${loc.town}-${i}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-lg text-xs text-white/80"
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: SERVICE_COLORS[loc.service] }}
                    />
                    {loc.town}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Regional coverage note */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-white/50">
            Full-service coverage across NJ, PA, DE, and MD &middot; On-site service available throughout the Delaware Valley
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { value: "200+", label: "Jobs Mapped" },
          { value: "4", label: "Service Types" },
          { value: "15+", label: "Years Serving NJ" },
          { value: "500+", label: "Satisfied Clients" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/10 rounded-lg px-4 py-3 text-center"
          >
            <p className="text-xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-white/60 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
