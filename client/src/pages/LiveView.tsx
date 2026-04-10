/*
 * LiveView — YouNeedLED
 * Public-facing live camera viewer page.
 * Route: /live/:streamId
 *
 * Dark fullscreen style matching the VPS viewer.
 * Checks published_to_web flag — shows "not available" if false.
 * Includes "Manage →" button linking to live.youneedled.com/login
 */
import { useEffect, useRef, useState } from "react";
import { useParams } from "wouter";
import SEOHead from "@/components/SEOHead";
import { SITE } from "@/lib/siteData";
import { WifiOff, RefreshCw, Phone } from "lucide-react";

// ── Config ────────────────────────────────────────────────────────────────────
const VPS_BASE = "https://live.youneedled.com";

// ── Types ─────────────────────────────────────────────────────────────────────
interface CameraInfo {
  id: string;
  name: string;
  status: "live" | "offline" | "connecting";
  yt_url: string | null;
  published_to_web: number;
  show_watermark: number;
}

// ── HLS Player ────────────────────────────────────────────────────────────────
function HlsPlayer({ streamId, showWatermark }: { streamId: string; showWatermark: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef   = useRef<any>(null);
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [playerStatus, setPlayerStatus] = useState<"loading" | "live" | "offline">("loading");

  function cleanup() {
    if (retryRef.current) clearTimeout(retryRef.current);
    if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null; }
  }

  function initPlayer() {
    cleanup();
    setPlayerStatus("loading");
    const video = videoRef.current;
    if (!video) return;

    const hlsSrc = `${VPS_BASE}/hls/${streamId}/index.m3u8`;

    import("hls.js").then(({ default: Hls }) => {
      if (Hls.isSupported()) {
        const hls = new Hls({
          lowLatencyMode: true,
          liveSyncDurationCount: 3,
          maxBufferLength: 10,
          maxMaxBufferLength: 20,
        });
        hlsRef.current = hls;
        hls.loadSource(hlsSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setPlayerStatus("live");
          video.play().catch(() => {});
        });
        hls.on(Hls.Events.ERROR, (_: any, data: any) => {
          if (data.fatal) {
            setPlayerStatus("offline");
            retryRef.current = setTimeout(initPlayer, 12000);
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = hlsSrc;
        video.addEventListener("loadedmetadata", () => {
          setPlayerStatus("live");
          video.play().catch(() => {});
        }, { once: true });
        video.addEventListener("error", () => {
          setPlayerStatus("offline");
          retryRef.current = setTimeout(initPlayer, 12000);
        }, { once: true });
      } else {
        setPlayerStatus("offline");
      }
    }).catch(() => setPlayerStatus("offline"));
  }

  useEffect(() => {
    initPlayer();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamId]);

  return (
    <div className="relative w-full bg-black" style={{ aspectRatio: "16/9" }}>
      {/* YNLED logo watermark — lower left corner */}
      {showWatermark && (
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
          <img
            src="/ynled-watermark.webp"
            alt="You Need LED"
            className="w-12 h-12 opacity-40 rounded-full"
          />
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        controls
        autoPlay
        muted
        playsInline
        style={{ display: playerStatus === "offline" ? "none" : "block" }}
      />

      {playerStatus === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="w-12 h-12 rounded-full border-4 border-[#F97316]/20 border-t-[#F97316] animate-spin" />
        </div>
      )}

      {playerStatus === "offline" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] gap-4">
          <WifiOff className="w-12 h-12 text-gray-600" />
          <p className="text-gray-400 text-sm font-medium">Stream is currently offline</p>
          <p className="text-gray-600 text-xs">Retrying automatically…</p>
          <button
            onClick={initPlayer}
            className="flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6A0A] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Now
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function LiveView() {
  const params = useParams<{ streamId: string }>();
  const streamId = decodeURIComponent(params.streamId || "")
    .replace(/[^a-zA-Z0-9_\-]/g, "");

  const [camera, setCamera]   = useState<CameraInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!streamId) return;

    async function fetchCamera() {
      try {
        // Use the /check endpoint which includes published_to_web
        const res = await fetch(`${VPS_BASE}/public/cameras/${streamId}/check`);
        if (res.ok) {
          const data = await res.json();
          if (!data || !data.id) {
            setNotFound(true);
          } else {
            setCamera(data as CameraInfo);
          }
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCamera();
    const interval = setInterval(fetchCamera, 30000);
    return () => clearInterval(interval);
  }, [streamId]);

  if (!streamId) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-gray-500">Invalid stream link.</p>
      </div>
    );
  }

  const cameraName = camera?.name || streamId;

  // Not published to web — show unavailable message
  const isUnavailable = !loading && (notFound || (camera && !camera.published_to_web));

  return (
    <>
      <SEOHead
        title={`${cameraName} — Live Camera | You Need LED`}
        description={`Watch the live security camera feed for ${cameraName}, powered by YNLED LiveView. Professional security camera systems by You Need LED, serving South Jersey.`}
        canonical={`${SITE.url}/live/${streamId}`}
      />

      {/* Full-page dark layout */}
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
        {/* Header bar */}
        <header className="bg-[#111111] border-b border-gray-800 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#F97316] text-base sm:text-lg tracking-tight">YNLED</span>
              <span className="font-bold text-white text-base sm:text-lg tracking-tight">LiveView</span>
            </div>
            {!loading && camera && (
              <>
                <span className="text-gray-700 hidden sm:block">·</span>
                <span className="text-gray-300 text-sm font-medium hidden sm:block truncate max-w-[200px]">
                  {cameraName}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live indicator */}
            {camera?.status === "live" && (
              <div className="flex items-center gap-1.5 bg-black/50 rounded-full px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live</span>
              </div>
            )}
            {/* Manage button — links to VPS dashboard login */}
            <a
              href="https://live.youneedled.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors border border-gray-800 hover:border-gray-600 rounded-lg px-3 py-1.5"
            >
              Manage →
            </a>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {loading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-[#F97316]/20 border-t-[#F97316] animate-spin" />
            </div>
          )}

          {isUnavailable && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
              <WifiOff className="w-16 h-16 text-gray-700" />
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-300 mb-2">Camera Not Available</h2>
                <p className="text-gray-600 text-sm max-w-sm">
                  This camera feed is not currently available for public viewing.
                  Please contact You Need LED for access.
                </p>
              </div>
              <a
                href={SITE.phoneTel}
                className="flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6A0A] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm mt-2"
              >
                <Phone className="w-4 h-4" />
                {SITE.phone}
              </a>
            </div>
          )}

          {!loading && !isUnavailable && camera && (
            <>
              {/* Video player — fills available space */}
              <div className="w-full bg-black">
                <div className="max-w-7xl mx-auto">
                  <HlsPlayer streamId={streamId} showWatermark={camera.show_watermark === 1} />
                </div>
              </div>

              {/* Camera info bar */}
              <div className="bg-[#111111] border-t border-gray-800 px-4 sm:px-6 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                  <div>
                    <p className="text-gray-200 font-semibold text-sm">{cameraName}</p>
                    <p className="text-gray-600 text-xs mt-0.5">Stream ID: {streamId}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      camera.status === "live"
                        ? "bg-green-900/50 text-green-400"
                        : camera.status === "connecting"
                        ? "bg-yellow-900/50 text-yellow-400"
                        : "bg-gray-800 text-gray-500"
                    }`}>
                      {camera.status === "live" ? "● Live" : camera.status === "connecting" ? "● Connecting" : "Offline"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="bg-[#0a0a0a] border-t border-gray-900 px-4 sm:px-6 py-6">
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-gray-600 text-xs mb-1">Powered by</p>
                  <p className="text-[#F97316] font-bold text-base mb-1">YNLED LiveView</p>
                  <p className="text-gray-700 text-xs mb-4">
                    Professional 4K AI-powered security cameras · NJ DCA Licensed · 15+ Years · South Jersey
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                    <a
                      href={SITE.phoneTel}
                      className="flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6A0A] text-white font-semibold px-5 py-2 rounded-lg transition-colors text-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {SITE.phone}
                    </a>
                    <a
                      href={SITE.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
                    >
                      youneedled.com →
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
