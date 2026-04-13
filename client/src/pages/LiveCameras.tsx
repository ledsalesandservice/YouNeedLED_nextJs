/*
 * LiveCameras — YouNeedLED
 * Public-facing page listing all published cameras.
 * Route: /live-cameras
 *
 * Fetches all published cameras from the VPS public API (no auth required),
 * shows hourly-refreshed thumbnail previews, live/offline badges, and links
 * each camera to its full-screen viewer.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { SITE } from "@/lib/siteData";
import { Video, WifiOff, ExternalLink, Phone, RefreshCw } from "lucide-react";

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

// ── Camera Card ───────────────────────────────────────────────────────────────
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

          {/* Thumbnail image — shown when live and loaded */}
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

          {/* Fallback icon — shown while thumb loads or if offline/error */}
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

          {/* Dark gradient overlay — always present for badge readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-black/20" />

          {/* Play button overlay — visible on hover when live */}
          {isLive && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-16 h-16 rounded-full bg-[#F97316]/90 flex items-center justify-center shadow-2xl ring-4 ring-white/10">
                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Live / Offline badge — top left */}
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

          {/* External link icon — top right on hover */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          {/* YNLED watermark — bottom left */}
          {camera.show_watermark === 1 && (
            <div className="absolute bottom-2 left-2 pointer-events-none">
              <img
                src="/ynled-watermark.webp"
                alt="You Need LED"
                className="w-8 h-8 opacity-50 rounded-full"
              />
            </div>
          )}

          {/* "Preview refreshes hourly" label — bottom right, subtle */}
          {isLive && thumbLoaded && (
            <div className="absolute bottom-2 right-2 pointer-events-none">
              <span className="text-[9px] text-white/30 font-medium">Preview · updated hourly</span>
            </div>
          )}
        </div>

        {/* Card footer */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-white font-semibold text-sm group-hover:text-[#F97316] transition-colors">
              {camera.name}
            </p>
            <p className="text-gray-600 text-xs mt-0.5">ID: {camera.id}</p>
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
    // Refresh status every 30 seconds
    const interval = setInterval(fetchCameras, 30000);
    return () => clearInterval(interval);
  }, []);

  const liveCount = cameras.filter(c => c.status === "live").length;

  return (
    <>
      <SEOHead
        title="Live Security Camera Feeds | LED Live View | You Need LED"
        description="Watch live security camera feeds powered by LED Live View. Professional 4K security cameras with AI options installed by You Need LED — NJ DCA Licensed, serving South Jersey and the Delaware Valley."
        canonical={`${SITE.url}/live-cameras`}
      />

      {/* Dark full-page layout */}
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
                  Real-time security camera streams powered by LED Live View. Click any camera to open the full-screen viewer.
                </p>
              </div>

              {/* Stats */}
              {!loading && cameras.length > 0 && (
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{cameras.length}</div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider mt-0.5">Cameras</div>
                  </div>
                  <div className="w-px h-10 bg-gray-800" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{liveCount}</div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider mt-0.5">Live Now</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Camera grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-10 h-10 rounded-full border-4 border-[#F97316]/20 border-t-[#F97316] animate-spin" />
              <p className="text-gray-500 text-sm">Loading cameras…</p>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
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
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Video className="w-12 h-12 text-gray-700" />
              <p className="text-gray-400 font-medium">No cameras available at this time</p>
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
                <p className="text-center text-gray-700 text-xs mt-8">
                  Status refreshes automatically · Last updated {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </>
          )}
        </div>

        {/* CTA footer */}
        <div className="border-t border-gray-800/50 bg-[#0e1a2e]/50">
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
