/*
 * LiveView — YouNeedLED
 * Public-facing live camera viewer page.
 * Route: /live/:streamId
 *
 * Embeds an HLS stream from the YNLED LiveView VPS.
 * Stream ID comes from the URL — e.g. /live/leddemo
 * Camera name and status are fetched from the public VPS API.
 */
import { useEffect, useRef, useState } from "react";
import { useParams } from "wouter";
import SEOHead from "@/components/SEOHead";
import { SITE } from "@/lib/siteData";
import { Video, Wifi, WifiOff, RefreshCw, ExternalLink, Phone } from "lucide-react";

// ── Config ────────────────────────────────────────────────────────────────────
const VPS_BASE = "https://liveview.youneedled.com"; // production domain (proxied)
// Fallback to direct IP if domain not yet set up
const VPS_IP   = "http://147.93.191.167";

// ── Types ─────────────────────────────────────────────────────────────────────
interface CameraInfo {
  id: string;
  name: string;
  status: "live" | "offline" | "connecting";
  yt_url: string | null;
  destination: string;
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: CameraInfo["status"] }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        Live
      </span>
    );
  }
  if (status === "connecting") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-700 text-xs font-semibold px-2.5 py-1 rounded-full">
        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
        Connecting…
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-500 text-xs font-semibold px-2.5 py-1 rounded-full">
      <span className="w-2 h-2 rounded-full bg-slate-400" />
      Offline
    </span>
  );
}

// ── HLS Player ────────────────────────────────────────────────────────────────
function HlsPlayer({ streamId, vpsBase }: { streamId: string; vpsBase: string }) {
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

    const hlsSrc = `${vpsBase}/hls/${streamId}/index.m3u8`;

    // Dynamically import hls.js to keep bundle size down
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
        // Safari native HLS
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
  }, [streamId, vpsBase]);

  return (
    <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: "16/9" }}>
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        controls
        autoPlay
        muted
        playsInline
        style={{ display: playerStatus === "offline" ? "none" : "block" }}
      />

      {/* Loading spinner */}
      {playerStatus === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="w-12 h-12 rounded-full border-4 border-[#0e319a]/20 border-t-[#0e319a] animate-spin" />
        </div>
      )}

      {/* Offline overlay */}
      {playerStatus === "offline" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 gap-4">
          <WifiOff className="w-12 h-12 text-slate-500" />
          <p className="text-slate-400 text-sm font-medium">Stream is currently offline</p>
          <p className="text-slate-600 text-xs">Retrying automatically…</p>
          <button
            onClick={initPlayer}
            className="flex items-center gap-2 bg-[#0e319a] hover:bg-[#0c2a85] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
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
  // Decode and sanitize the stream ID from the URL
  const streamId = decodeURIComponent(params.streamId || "")
    .replace(/[^a-zA-Z0-9_\-]/g, "");

  const [camera, setCamera]     = useState<CameraInfo | null>(null);
  const [loading, setLoading]   = useState(true);
  const [vpsBase, setVpsBase]   = useState(VPS_IP);

  // Fetch camera info from the public VPS endpoint
  useEffect(() => {
    if (!streamId) return;

    async function fetchCamera() {
      // Try the production domain first, fall back to direct IP
      for (const base of [VPS_BASE, VPS_IP]) {
        try {
          const res = await fetch(`${base}/public/cameras/${streamId}`);
          if (res.ok) {
            const data: CameraInfo = await res.json();
            setCamera(data);
            setVpsBase(base);
            setLoading(false);
            return;
          }
        } catch {
          // try next base
        }
      }
      // Camera not found — show offline state
      setCamera({ id: streamId, name: streamId, status: "offline", yt_url: null, destination: "hls" });
      setLoading(false);
    }

    fetchCamera();
    // Poll every 30s to update live/offline status
    const interval = setInterval(fetchCamera, 30000);
    return () => clearInterval(interval);
  }, [streamId]);

  if (!streamId) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500">Invalid stream link.</p>
      </div>
    );
  }

  const cameraName = camera?.name || streamId;
  const ytVideoId  = camera?.yt_url
    ? (camera.yt_url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_\-]{11})/) || [])[1]
    : null;

  return (
    <>
      <SEOHead
        title={`${cameraName} — Live Camera | You Need LED`}
        description={`Watch the live security camera feed for ${cameraName}, powered by YNLED LiveView. Professional security camera systems by You Need LED, serving South Jersey.`}
        canonical={`${SITE.url}/live/${streamId}`}
      />

      {/* Page header */}
      <section className="bg-[#0e319a] text-white py-8">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Video className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold leading-tight">
                  {loading ? "Loading…" : cameraName}
                </h1>
                <p className="text-blue-200 text-sm">YNLED LiveView · Stream ID: {streamId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {camera && <StatusBadge status={camera.status} />}
            </div>
          </div>
        </div>
      </section>

      {/* Player */}
      <section className="bg-slate-950 py-6">
        <div className="container max-w-5xl">
          <HlsPlayer streamId={streamId} vpsBase={vpsBase} />

          {/* YouTube fallback */}
          {ytVideoId && (
            <div className="mt-6">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                <Wifi className="w-3.5 h-3.5" />
                Also streaming on YouTube Live
              </p>
              <div className="relative w-full rounded-xl overflow-hidden shadow-xl" style={{ aspectRatio: "16/9" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&mute=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${cameraName} on YouTube`}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-white border-t border-slate-200 py-10">
        <div className="container max-w-3xl text-center">
          <p className="text-slate-500 text-sm mb-1">Powered by</p>
          <h2 className="text-2xl font-bold text-[#0e319a] mb-2">YNLED LiveView</h2>
          <p className="text-slate-600 text-sm mb-6">
            Professional 4K AI-powered security camera systems for South Jersey businesses and homes.
            NJ DCA Licensed · 15+ Years Experience · 500+ Satisfied Clients
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={SITE.phoneTel}
              className="flex items-center gap-2 bg-[#0e319a] hover:bg-[#0c2a85] text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              {SITE.phone}
            </a>
            <a
              href={SITE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-slate-300 hover:border-[#0e319a] text-slate-700 hover:text-[#0e319a] font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              youneedled.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
