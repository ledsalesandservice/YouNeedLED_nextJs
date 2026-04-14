/*
 * LiveCameras — YouNeedLED
 * Public-facing page listing all published cameras.
 * Route: /live-cameras
 *
 * Section 1: LED Live View — RTMP cameras published from the VPS (HLS streams)
 * Section 2: South Jersey & Delaware Valley — YouTube live cameras installed/managed
 *            by You Need LED (Jim Ginn cameras from seetheview.com)
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { SITE } from "@/lib/siteData";
import { Video, WifiOff, ExternalLink, Phone, RefreshCw, Youtube } from "lucide-react";

// ── Config ────────────────────────────────────────────────────────────────────
const VPS_BASE = "https://live.youneedled.com";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Camera {
  id: string;
  name: string;
  status: "live" | "offline" | "connecting";
  published_to_web: number;
  show_watermark: number;
}

interface YouTubeCamera {
  title: string;
  location: string;
  youtube_id: string;
  youtube_url: string;
  tags: string[];
  installedBy: string;
}

// ── Jim Ginn / You Need LED installed YouTube cameras (scraped from seetheview.com) ──
const YT_CAMERAS: YouTubeCamera[] = [
  {
    title: "30th Street Zoomed Beach Cam Live – Ocean City NJ Boardwalk & Surf 24/7",
    location: "Ocean City, NJ",
    youtube_id: "yIVjA9Rliic",
    youtube_url: "https://www.youtube.com/watch?v=yIVjA9Rliic",
    tags: ["#beach", "#surf"],
    installedBy: "Installed by You Need LED",
  },
  {
    title: "2904-06 Wesley Avenue, Ocean City, NJ Live View Cam",
    location: "Ocean City, NJ",
    youtube_id: "fn4OQ-RzSBo",
    youtube_url: "https://www.youtube.com/watch?v=fn4OQ-RzSBo",
    tags: ["#beach", "#forsale", "#sunrise", "#surf"],
    installedBy: "Installed by You Need LED",
  },
  {
    title: "Berger Realty Live Cam 32nd and Asbury, Ocean City, NJ",
    location: "Ocean City, NJ",
    youtube_id: "QxAwUCJIUEE",
    youtube_url: "https://www.youtube.com/watch?v=QxAwUCJIUEE",
    tags: ["#forrent", "#storefront"],
    installedBy: "Installed by You Need LED",
  },
  {
    title: "Surfers Supplies Live Cam",
    location: "Ocean City, NJ",
    youtube_id: "4-JSzATuVBE",
    youtube_url: "https://www.youtube.com/watch?v=4-JSzATuVBE",
    tags: ["#storefront"],
    installedBy: "Installed by You Need LED",
  },
  {
    title: "323 E Oak Avenue, Wildwood NJ – Rooftop Deck View (pano looking east)",
    location: "Wildwood, NJ",
    youtube_id: "HDPJ7JaAWK0",
    youtube_url: "https://www.youtube.com/watch?v=HDPJ7JaAWK0",
    tags: ["#beach", "#boardwalk", "#forsale", "#sunrise", "#surf"],
    installedBy: "Installed by You Need LED",
  },
  {
    title: "Somers Point Birdfeeder Cam looking South",
    location: "Somers Point, NJ",
    youtube_id: "N2N_sLQBrOQ",
    youtube_url: "https://www.youtube.com/watch?v=N2N_sLQBrOQ",
    tags: ["#birds", "#sunrise", "#wetlands", "#wildlife"],
    installedBy: "Installed by You Need LED",
  },
  {
    title: "America's Greatest Boardwalk – Atlantic City, NJ (Resorts & Hard Rock Casino)",
    location: "Atlantic City, NJ",
    youtube_id: "FEgL6kDNNo8",
    youtube_url: "https://www.youtube.com/watch?v=FEgL6kDNNo8",
    tags: ["#beach", "#boardwalk"],
    installedBy: "Installed by You Need LED",
  },
  {
    title: "Atlantic City Steel Pier Observation Wheel",
    location: "Atlantic City, NJ",
    youtube_id: "2YoZNasYYpA",
    youtube_url: "https://www.youtube.com/watch?v=2YoZNasYYpA",
    tags: ["#beach", "#ocean", "#sunrise", "#surf"],
    installedBy: "Installed by You Need LED",
  },
  {
    title: "Osprey Nest Live Cam at the Forsythe Wildlife Refuge in OceanVille, NJ",
    location: "Galloway, NJ",
    youtube_id: "GFrEoG84OvE",
    youtube_url: "https://www.youtube.com/watch?v=GFrEoG84OvE",
    tags: ["#osprey", "#wetlands", "#wildlife"],
    installedBy: "Installed by You Need LED",
  },
  {
    title: "Osprey Nest Live Cam at The Wetlands Institute, Stone Harbor, NJ",
    location: "Stone Harbor, NJ",
    youtube_id: "0DB1vqa02N8",
    youtube_url: "https://www.youtube.com/watch?v=0DB1vqa02N8",
    tags: ["#birds", "#wetlands", "#wildlife"],
    installedBy: "Installed by You Need LED",
  },
  {
    title: "Rittenhouse Square Park, Philadelphia PANO Cam looking South",
    location: "Philadelphia, PA",
    youtube_id: "3bQ5f3snO9U",
    youtube_url: "https://www.youtube.com/watch?v=3bQ5f3snO9U",
    tags: ["#city", "#park"],
    installedBy: "Installed by You Need LED",
  },
  {
    title: "Smith Island Live Cam – Bayside Restaurant from Jack and Pickles",
    location: "Ewell, MD",
    youtube_id: "JMv9EC-zl0Y",
    youtube_url: "https://www.youtube.com/watch?v=JMv9EC-zl0Y",
    tags: ["#bay", "#birds", "#boats", "#dining", "#harbor"],
    installedBy: "Installed by You Need LED",
  },
  {
    title: "Smith Island Live Cam Pano – Looking North towards Goat Island",
    location: "Ewell, MD",
    youtube_id: "uVGFmwIqacY",
    youtube_url: "https://www.youtube.com/watch?v=uVGFmwIqacY",
    tags: ["#bay", "#birds", "#boats", "#dock", "#wildlife"],
    installedBy: "Installed by You Need LED",
  },
];

// ── HLS Camera Card (VPS published cameras) ───────────────────────────────────
function CameraCard({ camera }: { camera: Camera }) {
  const isLive = camera.status === "live";
  const thumbUrl = `${VPS_BASE}/thumbs/${camera.id}.jpg`;
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const [thumbError, setThumbError]   = useState(false);

  return (
    <Link href={`/live/${camera.id}`}>
      <div className="group relative bg-[#111827] rounded-xl overflow-hidden border border-gray-800 hover:border-[#F97316]/60 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[#F97316]/10 hover:shadow-xl">

        {/* Thumbnail / Preview area */}
        <div className="relative aspect-video bg-[#0a0f1a] overflow-hidden">

          {isLive && !thumbError && (
            <img
              src={thumbUrl}
              alt={`${camera.name} preview`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                thumbLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setThumbLoaded(true)}
              onError={() => setThumbError(true)}
            />
          )}

          {(!isLive || thumbError || !thumbLoaded) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              {isLive ? (
                <Video className="w-12 h-12 text-gray-700" />
              ) : (
                <>
                  <WifiOff className="w-10 h-10 text-gray-700" />
                  <span className="text-gray-600 text-xs font-medium">Offline</span>
                </>
              )}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-black/20" />

          {isLive && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-16 h-16 rounded-full bg-[#F97316]/90 flex items-center justify-center shadow-2xl ring-4 ring-white/10">
                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          <div className="absolute top-3 left-3">
            {isLive ? (
              <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-sm rounded-full px-2.5 py-1 border border-red-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-sm rounded-full px-2.5 py-1 border border-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Offline</span>
              </div>
            )}
          </div>

          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          {camera.show_watermark === 1 && (
            <div className="absolute bottom-2 left-2 pointer-events-none">
              <img
                src="/ynled-watermark.webp"
                alt="You Need LED"
                className="w-8 h-8 opacity-50 rounded-full"
              />
            </div>
          )}

          {isLive && thumbLoaded && (
            <div className="absolute bottom-2 right-2 pointer-events-none">
              <span className="text-[9px] text-white/30 font-medium">Preview · updated hourly</span>
            </div>
          )}
        </div>

        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-white font-semibold text-sm group-hover:text-[#F97316] transition-colors">
              {camera.name}
            </p>
            <p className="text-gray-600 text-xs mt-0.5">LED Live View · HLS Stream</p>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            isLive
              ? "bg-green-900/40 text-green-400 border border-green-800/50"
              : "bg-gray-800 text-gray-500 border border-gray-700"
          }`}>
            {isLive ? "● Live" : "Offline"}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── YouTube Camera Card ───────────────────────────────────────────────────────
function YouTubeCameraCard({ cam }: { cam: YouTubeCamera }) {
  const thumbUrl = `https://img.youtube.com/vi/${cam.youtube_id}/maxresdefault.jpg`;
  const [thumbError, setThumbError] = useState(false);
  const fallbackThumb = `https://img.youtube.com/vi/${cam.youtube_id}/hqdefault.jpg`;

  return (
    <a
      href={cam.youtube_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-[#111827] rounded-xl overflow-hidden border border-gray-800 hover:border-[#F97316]/60 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[#F97316]/10 hover:shadow-xl block"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-[#0a0f1a] overflow-hidden">
        <img
          src={thumbError ? fallbackThumb : thumbUrl}
          alt={`${cam.title} preview`}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setThumbError(true)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-black/20" />

        {/* YouTube play button overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center shadow-2xl ring-4 ring-white/10">
            <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Live badge */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-sm rounded-full px-2.5 py-1 border border-red-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live</span>
          </div>
        </div>

        {/* YouTube icon top right */}
        <div className="absolute top-3 right-3">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-1.5">
            <Youtube className="w-3.5 h-3.5 text-red-500" />
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-4 py-3">
        <p className="text-white font-semibold text-sm group-hover:text-[#F97316] transition-colors line-clamp-2 leading-snug">
          {cam.title}
        </p>
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-gray-500 text-xs">{cam.location}</p>
          <span className="text-[10px] text-[#F97316]/80 font-medium bg-[#F97316]/10 border border-[#F97316]/20 rounded-full px-2 py-0.5">
            {cam.installedBy}
          </span>
        </div>
      </div>
    </a>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function LiveCameras() {
  const [cameras, setCameras]         = useState<Camera[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  async function fetchCameras() {
    try {
      const res = await fetch(`${VPS_BASE}/public/cameras`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setCameras(data.cameras || []);
      setLastUpdated(new Date());
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCameras();
    const interval = setInterval(fetchCameras, 30000);
    return () => clearInterval(interval);
  }, []);

  const liveCount = cameras.filter(c => c.status === "live").length;
  const totalCount = cameras.length + YT_CAMERAS.length;

  return (
    <>
      <SEOHead
        title="Live Security Camera Feeds | LED Live View | You Need LED"
        description="Watch live security camera feeds powered by LED Live View. Professional 4K security cameras with AI options installed by You Need LED — NJ DCA Licensed, serving South Jersey and the Delaware Valley."
        canonical={`${SITE.url}/live-cameras`}
      />

      <div className="min-h-screen bg-[#0a0f1a]">
        {/* Hero header */}
        <div className="bg-gradient-to-b from-[#0e1a2e] to-[#0a0f1a] border-b border-gray-800/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#F97316]/10 border border-[#F97316]/20 rounded-full px-3 py-1 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                  <span className="text-[#F97316] text-xs font-bold uppercase tracking-wider">LED Live View</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  Live Camera Feeds
                </h1>
                <p className="text-gray-400 text-base max-w-xl">
                  Real-time security camera streams installed and managed by You Need LED — serving South Jersey, the Delaware Valley, and beyond.
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 shrink-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{loading ? "…" : totalCount}</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider mt-0.5">Cameras</div>
                </div>
                <div className="w-px h-10 bg-gray-800" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{loading ? "…" : liveCount + YT_CAMERAS.length}</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider mt-0.5">Live Now</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-14">

          {/* ── Section 1: LED Live View (HLS) ── */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F97316]" />
                <h2 className="text-lg font-bold text-white">LED Live View</h2>
              </div>
              <span className="text-xs text-gray-600 bg-gray-800 rounded-full px-2.5 py-0.5">HLS · Direct Stream</span>
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-10 h-10 rounded-full border-4 border-[#F97316]/20 border-t-[#F97316] animate-spin" />
                <p className="text-gray-500 text-sm">Loading cameras…</p>
              </div>
            )}

            {!loading && error && (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <WifiOff className="w-12 h-12 text-gray-700" />
                <p className="text-gray-400 font-medium">Could not connect to camera system</p>
                <button
                  onClick={fetchCameras}
                  className="flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6A0A] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && cameras.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <Video className="w-12 h-12 text-gray-700" />
                <p className="text-gray-400 font-medium">No LED Live View cameras published at this time</p>
              </div>
            )}

            {!loading && !error && cameras.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cameras.map(camera => (
                    <CameraCard key={camera.id} camera={camera} />
                  ))}
                </div>
                {lastUpdated && (
                  <p className="text-gray-700 text-xs mt-6">
                    Status refreshes automatically · Last updated {lastUpdated.toLocaleTimeString()}
                  </p>
                )}
              </>
            )}
          </section>

          {/* ── Section 2: South Jersey & Delaware Valley YouTube Cameras ── */}
          <section>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500" />
                <h2 className="text-lg font-bold text-white">South Jersey & Delaware Valley Cameras</h2>
              </div>
              <span className="text-xs text-gray-600 bg-gray-800 rounded-full px-2.5 py-0.5">YouTube Live</span>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Live outdoor cameras installed and managed by You Need LED across South Jersey, the Jersey Shore, and the Delaware Valley. Click any camera to watch on YouTube.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {YT_CAMERAS.map(cam => (
                <YouTubeCameraCard key={cam.youtube_id} cam={cam} />
              ))}
            </div>
          </section>

        </div>

        {/* CTA footer */}
        <div className="border-t border-gray-800/50 bg-[#0e1a2e]/50 mt-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
            <p className="text-[#F97316] font-bold text-lg mb-2">Want cameras like these at your property?</p>
            <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
              You Need LED installs professional 4K security cameras with AI options for commercial and residential properties throughout South Jersey and the Delaware Valley. NJ DCA Licensed · 15+ Years · 500+ Satisfied Clients.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={SITE.phoneTel}
                className="flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6A0A] text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                Call {SITE.phone}
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
              >
                Request a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
