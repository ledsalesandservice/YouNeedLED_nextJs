/**
 * ServiceAreaMap — You Need L.E.D.
 * Displays all customer job locations across South Jersey & Delaware Valley
 * to visually demonstrate the breadth of the company's service coverage.
 *
 * Uses the existing MapView component (Google Maps via Forge proxy).
 * Color-coded pins: Fire Alarm (red), CCTV (blue), Access Control (green), Low Voltage (amber).
 */
import { useRef } from "react";
import { MapView } from "@/components/Map";

interface ServiceLocation {
  lat: number;
  lng: number;
  service: "Fire Alarm" | "CCTV" | "Access Control" | "Low Voltage";
}

const SERVICE_LOCATIONS: ServiceLocation[] = [
  {lat:39.3726,lng:-74.6462,service:"Fire Alarm"},
  {lat:39.2698,lng:-74.5905,service:"Low Voltage"},
  {lat:39.3882,lng:-74.5586,service:"Fire Alarm"},
  {lat:39.4096,lng:-74.3649,service:"CCTV"},
  {lat:39.8471,lng:-75.0207,service:"Access Control"},
  {lat:39.3230,lng:-74.5960,service:"Fire Alarm"},
  {lat:39.3132,lng:-74.5385,service:"Low Voltage"},
  {lat:39.3133,lng:-74.5253,service:"Fire Alarm"},
  {lat:39.4730,lng:-75.0446,service:"CCTV"},
  {lat:39.3784,lng:-74.4898,service:"Fire Alarm"},
  {lat:40.7014,lng:-74.2702,service:"Access Control"},
  {lat:39.3978,lng:-74.5408,service:"Fire Alarm"},
  {lat:39.2187,lng:-74.7043,service:"Low Voltage"},
  {lat:39.2226,lng:-74.7054,service:"CCTV"},
  {lat:39.6511,lng:-74.1749,service:"Fire Alarm"},
  {lat:39.4678,lng:-75.3511,service:"Access Control"},
  {lat:39.3391,lng:-74.4811,service:"Fire Alarm"},
  {lat:39.6207,lng:-74.3368,service:"Low Voltage"},
  {lat:39.3117,lng:-74.5278,service:"Fire Alarm"},
  {lat:40.2722,lng:-74.5359,service:"CCTV"},
  {lat:39.3602,lng:-74.5679,service:"Fire Alarm"},
  {lat:38.9318,lng:-74.9116,service:"Fire Alarm"},
  {lat:39.3685,lng:-74.4408,service:"Access Control"},
  {lat:39.3133,lng:-74.5253,service:"Low Voltage"},
  {lat:39.1994,lng:-74.6549,service:"Fire Alarm"},
  {lat:39.2776,lng:-74.5739,service:"CCTV"},
  {lat:39.1544,lng:-74.6949,service:"Fire Alarm"},
  {lat:38.9307,lng:-74.9254,service:"Low Voltage"},
  {lat:39.2762,lng:-74.5720,service:"Fire Alarm"},
  {lat:39.2787,lng:-74.5710,service:"Access Control"},
  {lat:39.3228,lng:-74.6010,service:"Fire Alarm"},
  {lat:39.1778,lng:-74.8197,service:"CCTV"},
  {lat:39.3601,lng:-74.4251,service:"Fire Alarm"},
  {lat:39.2756,lng:-74.5806,service:"Low Voltage"},
  {lat:39.5429,lng:-74.5280,service:"Fire Alarm"},
  {lat:39.4678,lng:-75.3511,service:"Access Control"},
  {lat:39.2800,lng:-74.5616,service:"Fire Alarm"},
  {lat:39.2790,lng:-74.5756,service:"CCTV"},
  {lat:39.7584,lng:-74.9404,service:"Fire Alarm"},
  {lat:38.9676,lng:-74.8386,service:"Low Voltage"},
  {lat:39.9007,lng:-74.9615,service:"Fire Alarm"},
  {lat:39.3253,lng:-74.5110,service:"Access Control"},
  {lat:39.4144,lng:-74.5671,service:"Fire Alarm"},
  {lat:39.2754,lng:-74.5784,service:"CCTV"},
  {lat:39.3282,lng:-74.5154,service:"Fire Alarm"},
  {lat:39.4327,lng:-74.5965,service:"Low Voltage"},
  {lat:39.7730,lng:-74.9808,service:"Fire Alarm"},
  {lat:39.5254,lng:-74.6510,service:"Access Control"},
  {lat:39.3555,lng:-74.4438,service:"Fire Alarm"},
  {lat:39.2763,lng:-74.5763,service:"CCTV"},
  {lat:39.2786,lng:-74.5775,service:"Fire Alarm"},
  {lat:39.3103,lng:-74.6049,service:"Low Voltage"},
  {lat:39.2649,lng:-74.6108,service:"Fire Alarm"},
  {lat:39.3325,lng:-74.4935,service:"Access Control"},
  {lat:39.3612,lng:-74.4246,service:"Fire Alarm"},
  {lat:39.3504,lng:-74.5934,service:"CCTV"},
  {lat:39.3387,lng:-74.4819,service:"Fire Alarm"},
  {lat:39.6238,lng:-74.7786,service:"Low Voltage"},
  {lat:39.3439,lng:-74.5580,service:"Fire Alarm"},
  {lat:39.3496,lng:-74.4554,service:"Access Control"},
  {lat:39.4316,lng:-75.0000,service:"Fire Alarm"},
  {lat:40.5204,lng:-75.5685,service:"CCTV"},
  {lat:39.4774,lng:-75.0431,service:"Fire Alarm"},
  {lat:38.9839,lng:-74.9594,service:"Low Voltage"},
  {lat:39.3627,lng:-74.4239,service:"Fire Alarm"},
  {lat:39.2772,lng:-74.5744,service:"Access Control"},
  {lat:39.2876,lng:-74.6235,service:"Fire Alarm"},
  {lat:39.6510,lng:-74.8394,service:"CCTV"},
  {lat:39.9745,lng:-74.9480,service:"Fire Alarm"},
  {lat:39.3186,lng:-74.5150,service:"Low Voltage"},
  {lat:39.9505,lng:-75.0530,service:"Fire Alarm"},
  {lat:39.5465,lng:-74.6038,service:"Access Control"},
  {lat:39.8847,lng:-74.9668,service:"Fire Alarm"},
  {lat:39.3175,lng:-74.6069,service:"CCTV"},
  {lat:39.3685,lng:-74.4408,service:"Fire Alarm"},
  {lat:39.2645,lng:-74.6475,service:"Low Voltage"},
  {lat:39.3523,lng:-74.4801,service:"Fire Alarm"},
  {lat:39.9288,lng:-75.1298,service:"Access Control"},
  {lat:39.8080,lng:-74.9631,service:"Fire Alarm"},
  {lat:39.3133,lng:-74.5253,service:"CCTV"},
  {lat:39.3982,lng:-74.5607,service:"Fire Alarm"},
  {lat:39.2275,lng:-74.6871,service:"Low Voltage"},
  {lat:39.3857,lng:-74.6082,service:"Fire Alarm"},
  {lat:39.2187,lng:-74.7043,service:"Access Control"},
  {lat:39.4384,lng:-75.1757,service:"Fire Alarm"},
  {lat:39.4568,lng:-75.0177,service:"CCTV"},
  {lat:39.3338,lng:-74.5889,service:"Fire Alarm"},
  {lat:39.4080,lng:-74.5643,service:"Low Voltage"},
  {lat:39.3823,lng:-74.5549,service:"Fire Alarm"},
  {lat:39.4144,lng:-74.5367,service:"Access Control"},
  {lat:40.6842,lng:-74.2151,service:"Fire Alarm"},
  {lat:39.4231,lng:-75.0174,service:"CCTV"},
  {lat:39.1586,lng:-74.6874,service:"Fire Alarm"},
  {lat:39.4229,lng:-74.5889,service:"Low Voltage"},
  {lat:39.4738,lng:-74.4688,service:"Fire Alarm"},
  {lat:39.5323,lng:-75.0125,service:"Access Control"},
  {lat:39.3243,lng:-74.5929,service:"Fire Alarm"},
  {lat:38.9885,lng:-74.8171,service:"CCTV"},
  {lat:39.4264,lng:-74.5284,service:"Fire Alarm"},
  {lat:39.4118,lng:-74.5706,service:"Low Voltage"},
  {lat:39.3465,lng:-74.4599,service:"Fire Alarm"},
  {lat:39.3403,lng:-74.5068,service:"Access Control"},
  {lat:39.4184,lng:-74.6240,service:"Fire Alarm"},
  {lat:39.7296,lng:-75.0004,service:"CCTV"},
  {lat:39.3715,lng:-74.5425,service:"Fire Alarm"},
  {lat:39.4135,lng:-74.5754,service:"Low Voltage"},
  {lat:39.4993,lng:-74.6044,service:"Fire Alarm"},
  {lat:39.3619,lng:-74.5674,service:"Access Control"},
  {lat:39.3214,lng:-74.5164,service:"Fire Alarm"},
  {lat:39.3568,lng:-74.5708,service:"CCTV"},
  {lat:39.3814,lng:-74.5545,service:"Fire Alarm"},
  {lat:39.2538,lng:-74.6086,service:"Low Voltage"},
  {lat:39.3631,lng:-74.4251,service:"Fire Alarm"},
  {lat:39.1408,lng:-74.7031,service:"Access Control"},
  {lat:39.3540,lng:-74.5744,service:"Fire Alarm"},
  {lat:39.3843,lng:-74.4298,service:"CCTV"},
  {lat:39.1555,lng:-74.6913,service:"Fire Alarm"},
  {lat:39.2519,lng:-74.6127,service:"Low Voltage"},
  {lat:39.3936,lng:-74.5213,service:"Fire Alarm"},
  {lat:39.3115,lng:-74.5968,service:"Access Control"},
  {lat:38.9601,lng:-74.8514,service:"Fire Alarm"},
  {lat:40.0583,lng:-74.4057,service:"CCTV"},
  {lat:40.2690,lng:-75.2058,service:"Fire Alarm"},
  {lat:39.3718,lng:-74.5388,service:"Low Voltage"},
  {lat:39.0770,lng:-74.8269,service:"Fire Alarm"},
  {lat:39.2567,lng:-74.6051,service:"Access Control"},
  {lat:39.4303,lng:-75.1877,service:"Fire Alarm"},
  {lat:39.3608,lng:-74.4244,service:"CCTV"},
  {lat:40.1512,lng:-74.7011,service:"Fire Alarm"},
  {lat:39.2773,lng:-74.5716,service:"Low Voltage"},
  {lat:39.3143,lng:-74.5957,service:"Fire Alarm"},
  {lat:39.0642,lng:-74.7485,service:"Access Control"},
  {lat:39.3585,lng:-74.4463,service:"Fire Alarm"},
  {lat:39.4104,lng:-74.5704,service:"CCTV"},
  {lat:39.4073,lng:-74.5224,service:"Fire Alarm"},
  {lat:39.3600,lng:-74.6173,service:"Low Voltage"},
  {lat:39.3582,lng:-74.4609,service:"Fire Alarm"},
  {lat:38.9316,lng:-74.9108,service:"Access Control"},
  {lat:39.3915,lng:-74.5621,service:"Fire Alarm"},
  {lat:39.3779,lng:-74.4906,service:"CCTV"},
  {lat:39.4507,lng:-74.6477,service:"Fire Alarm"},
  {lat:39.2598,lng:-74.6496,service:"Low Voltage"},
  {lat:39.0638,lng:-74.7500,service:"Fire Alarm"},
  {lat:39.0777,lng:-74.8466,service:"Access Control"},
  {lat:39.2715,lng:-74.5901,service:"Fire Alarm"},
  {lat:39.3680,lng:-74.4113,service:"CCTV"},
  {lat:39.4019,lng:-74.3723,service:"Fire Alarm"},
  {lat:39.0003,lng:-74.8030,service:"Low Voltage"},
  {lat:39.3743,lng:-74.5803,service:"Fire Alarm"},
  {lat:39.3963,lng:-74.5587,service:"Access Control"},
  {lat:39.3190,lng:-74.6036,service:"Fire Alarm"},
  {lat:39.4135,lng:-74.5754,service:"CCTV"},
  {lat:39.3580,lng:-74.4236,service:"Fire Alarm"},
  {lat:39.4774,lng:-75.0431,service:"Low Voltage"},
  {lat:40.1539,lng:-74.0544,service:"Fire Alarm"},
  {lat:39.3539,lng:-74.4457,service:"Access Control"},
  {lat:39.3739,lng:-75.0228,service:"Fire Alarm"},
  {lat:39.3482,lng:-74.4573,service:"CCTV"},
  {lat:39.6450,lng:-74.9456,service:"Fire Alarm"},
  {lat:38.9584,lng:-74.8493,service:"Low Voltage"},
  {lat:39.3140,lng:-74.5990,service:"Fire Alarm"},
  {lat:39.3819,lng:-74.5553,service:"Access Control"},
  {lat:39.2649,lng:-74.6108,service:"Fire Alarm"},
  {lat:39.3882,lng:-74.5586,service:"CCTV"},
  {lat:39.7232,lng:-74.8491,service:"Fire Alarm"},
  {lat:39.3943,lng:-74.5205,service:"Low Voltage"},
  {lat:39.5288,lng:-74.6476,service:"Fire Alarm"},
  {lat:39.3279,lng:-74.5035,service:"Access Control"},
  {lat:39.3685,lng:-74.4408,service:"Fire Alarm"},
  {lat:39.7891,lng:-75.0553,service:"CCTV"},
  {lat:39.3140,lng:-74.5990,service:"Fire Alarm"},
  {lat:39.2649,lng:-74.6108,service:"Low Voltage"},
  {lat:39.1555,lng:-74.6913,service:"Fire Alarm"},
  {lat:39.3754,lng:-74.5534,service:"Access Control"},
  {lat:39.1027,lng:-74.7201,service:"Fire Alarm"},
  {lat:39.0546,lng:-74.7607,service:"CCTV"},
  {lat:39.4788,lng:-75.0378,service:"Fire Alarm"},
  {lat:39.2649,lng:-74.6108,service:"Low Voltage"},
  {lat:39.3685,lng:-74.4408,service:"Fire Alarm"},
  {lat:39.1980,lng:-74.6605,service:"Access Control"},
  {lat:39.4096,lng:-74.3649,service:"Fire Alarm"},
  {lat:39.9175,lng:-75.1137,service:"CCTV"},
  {lat:39.3279,lng:-74.5035,service:"Fire Alarm"},
  {lat:39.3685,lng:-74.4408,service:"Low Voltage"},
  {lat:39.3480,lng:-74.6635,service:"Fire Alarm"},
  {lat:39.5288,lng:-74.6476,service:"Access Control"},
  {lat:39.3113,lng:-74.5968,service:"Fire Alarm"},
  {lat:39.4953,lng:-74.4581,service:"CCTV"},
  {lat:39.3584,lng:-74.4417,service:"Fire Alarm"},
  {lat:39.0605,lng:-74.7731,service:"Low Voltage"},
  {lat:39.7248,lng:-74.9029,service:"Fire Alarm"},
  {lat:39.2812,lng:-75.1863,service:"Access Control"},
  {lat:39.5847,lng:-74.3748,service:"Fire Alarm"},
];

const SERVICE_COLORS: Record<string, string> = {
  "Fire Alarm": "#dc2626",
  "CCTV": "#2563eb",
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
  const mapRef = useRef<google.maps.Map | null>(null);

  function handleMapReady(map: google.maps.Map) {
    mapRef.current = map;
    const infoWindow = new window.google.maps.InfoWindow();

    SERVICE_LOCATIONS.forEach((loc) => {
      const color = SERVICE_COLORS[loc.service] || "#dc2626";

      const pinEl = document.createElement("div");
      pinEl.innerHTML = `
        <div style="
          background:${color};
          border:2px solid #fff;
          border-radius:50%;
          width:18px;
          height:18px;
          box-shadow:0 2px 5px rgba(0,0,0,0.35);
          cursor:pointer;
        "></div>
      `;

      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: loc.lat, lng: loc.lng },
        content: pinEl,
        title: loc.service,
      });

      marker.addListener("click", () => {
        infoWindow.setContent(`
          <div style="padding:6px 10px;text-align:center;">
            <p style="margin:0;font-size:13px;font-weight:700;color:${color};">${loc.service}</p>
            <p style="margin:3px 0 0;font-size:11px;color:#555;">You Need L.E.D. Service Location</p>
          </div>
        `);
        infoWindow.open(map, marker);
      });
    });
  }

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-5">
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

      {/* Map */}
      <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <MapView
          className="w-full h-[420px] md:h-[500px]"
          initialCenter={{ lat: 39.48, lng: -74.72 }}
          initialZoom={8}
          onMapReady={handleMapReady}
        />
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
