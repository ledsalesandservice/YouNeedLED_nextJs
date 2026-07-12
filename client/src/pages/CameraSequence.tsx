/**
 * CameraSequence — YouNeedLED
 * Auto-rotating live stream viewer: cycles through all @YouNeedLED-Security
 * YouTube live feeds every 60 seconds (configurable). Designed for lobby
 * displays, digital signage, and public viewing pages.
 *
 * Fullscreen strategy:
 *   - The outer wrapper uses position:fixed + z-[9999] to cover the entire
 *     viewport including the site Header/Footer when in "page fullscreen" mode.
 *   - A separate button calls requestFullscreen() on the wrapper div to trigger
 *     true OS-level fullscreen (F11-style), which hides the browser chrome.
 *   - The iframe always fills 100% of the available video area via absolute
 *     inset-0, so it works correctly in both modes.
 */
import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "wouter";
import { SITE } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import {
  Youtube, Play, Pause, SkipForward, SkipBack,
  Maximize2, Minimize2, Clock, Wifi, Phone, Expand
} from "lucide-react";

// ── All live streams from @YouNeedLED-Security ────────────────────────────────
const STREAMS = [
  { id: "JgSnNRp2cIo", title: "9600 Atlantic — Pano Cam Looking North",   location: "Margate / Atlantic City, NJ" },
  { id: "VuM5l3WV7rw", title: "9600 Atlantic — Looking East (Sunrise)",   location: "Margate / Atlantic City, NJ" },
  { id: "RWZGVNEEI5o", title: "9600 Atlantic — Looking West",              location: "Margate / Atlantic City, NJ" },
  { id: "41PY11C6D9Y", title: "9600 Atlantic — Looking South towards OC", location: "Margate / Atlantic City, NJ" },
  { id: "2MNsMmfdpx8", title: "9600 Atlantic — Looking North Towards AC", location: "Margate / Atlantic City, NJ" },
  { id: "8be_ykDhH3Q", title: "9600 Atlantic — Pano Cam South",           location: "Margate / Atlantic City, NJ" },
  { id: "DnMSi9LRulo", title: "9600 Atlantic — Looking Southwest",        location: "Margate / Atlantic City, NJ" },
  { id: "p5DvNl794TA", title: "9600 Atlantic — Pano Cam Looking West",    location: "Margate / Atlantic City, NJ" },
];

const DEFAULT_INTERVAL = 60; // seconds

export default function CameraSequence() {
  const [current, setCurrent]         = useState(0);
  const [playing, setPlaying]         = useState(true);
  const [timeLeft, setTimeLeft]       = useState(DEFAULT_INTERVAL);
  const [interval, setIntervalSec]    = useState(DEFAULT_INTERVAL);
  // pageFS = cover viewport with fixed overlay (hides header/footer)
  const [pageFS, setPageFS]           = useState(false);
  // osFS = true OS-level fullscreen via Fullscreen API
  const [osFS, setOsFS]               = useState(false);
  const [showControls, setShowControls] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hideTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isFullscreen = pageFS || osFS;

  // ── Auto-advance timer ────────────────────────────────────────────────────
  useEffect(() => {
    if (!playing) return;
    setTimeLeft(interval);
    const tick = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCurrent(c => (c + 1) % STREAMS.length);
          return interval;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [playing, current, interval]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setTimeLeft(interval);
  }, [interval]);

  const prev = () => goTo((current - 1 + STREAMS.length) % STREAMS.length);
  const next = () => goTo((current + 1) % STREAMS.length);

  // ── Page fullscreen (covers header/footer) ────────────────────────────────
  const togglePageFS = () => setPageFS(p => !p);

  // ── OS-level fullscreen (true browser fullscreen) ─────────────────────────
  const toggleOsFS = async () => {
    if (!document.fullscreenElement) {
      if (wrapperRef.current) {
        await wrapperRef.current.requestFullscreen().catch(() => {});
      }
    } else {
      await document.exitFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    const handler = () => {
      const inFs = !!document.fullscreenElement;
      setOsFS(inFs);
      if (!inFs) setShowControls(true);
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // ── Auto-hide controls when fullscreen ───────────────────────────────────
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (isFullscreen) {
      hideTimer.current = setTimeout(() => setShowControls(false), 3500);
    }
  }, [isFullscreen]);

  useEffect(() => {
    if (!isFullscreen) { setShowControls(true); return; }
    resetHideTimer();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [isFullscreen, resetHideTimer]);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " ") { e.preventDefault(); setPlaying(p => !p); }
      else if (e.key === "f" || e.key === "F") togglePageFS();
      else if (e.key === "Escape" && pageFS) setPageFS(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, interval, pageFS]);

  const stream = STREAMS[current];
  const progress = ((interval - timeLeft) / interval) * 100;

  // YouTube embed — autoplay + muted (required by browsers), no YT controls
  const embedUrl = `https://www.youtube.com/embed/${stream.id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1`;

  return (
    <>
      <SEOHead
        title="9600 Atlantic Live Cameras | You Need LED Security"
        description="Live 24/7 security camera feeds from 9600 Atlantic Ave, Margate NJ — 8 views cycling automatically. Installed and managed by You Need LED, NJ DCA Licensed."
        canonical="/live/9600"
      />

      {/*
        Wrapper: in pageFS/osFS mode this becomes a fixed full-viewport overlay
        that sits above the site Header and Footer (z-[9999]).
        In normal mode it's just a regular page section.
      */}
      <div
        ref={wrapperRef}
        className={
          isFullscreen
            ? "fixed inset-0 z-[9999] bg-black flex flex-col"
            : "min-h-screen bg-[#0a0f1a] flex flex-col"
        }
        onMouseMove={resetHideTimer}
        onTouchStart={resetHideTimer}
      >
        {/* ── Top bar ── */}
        <div
          className={`
            shrink-0 transition-opacity duration-300
            ${isFullscreen && !showControls ? "opacity-0 pointer-events-none" : "opacity-100"}
            ${isFullscreen
              ? "absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/90 via-black/50 to-transparent pb-6"
              : "bg-gradient-to-b from-[#0e1a2e] to-[#0a0f1a] border-b border-gray-800/50"
            }
          `}
        >
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            {/* Live badge + title */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center gap-1.5 bg-red-600/20 border border-red-600/30 rounded-full px-2.5 py-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider">Live</span>
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">{stream.title}</p>
                <p className="text-gray-400 text-xs truncate">{stream.location}</p>
              </div>
            </div>

            {/* Controls: channel link, page-FS, OS-FS */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={SITE.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" />
                @YouNeedLED-Security
              </a>
              {/* Page fullscreen (hides header/footer) */}
              <button
                onClick={togglePageFS}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                title={pageFS ? "Exit page fullscreen" : "Page fullscreen (hides nav)"}
              >
                {pageFS ? <Minimize2 className="w-4 h-4 text-white" /> : <Maximize2 className="w-4 h-4 text-white" />}
              </button>
              {/* OS fullscreen (true browser fullscreen) */}
              <button
                onClick={toggleOsFS}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                title="True fullscreen (hides browser chrome)"
              >
                <Expand className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          {!isFullscreen && (
            <div className="h-0.5 bg-gray-800 mx-0">
              <div
                className="h-full bg-red-500 transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* ── Body: video + sidebar ── */}
        <div className={`flex-1 flex ${isFullscreen ? "flex-col" : "flex-col lg:flex-row"} min-h-0`}>

          {/* ── Video area ── */}
          <div className="relative flex-1 bg-black min-h-0">
            {/* iframe fills the entire video area absolutely */}
            <iframe
              key={stream.id}
              src={embedUrl}
              title={stream.title}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ border: "none" }}
            />

            {/* Prev / Next overlays */}
            <div
              className={`absolute inset-0 flex items-center justify-between px-3 pointer-events-none transition-opacity duration-300 ${isFullscreen && !showControls ? "opacity-0" : "opacity-100"}`}
            >
              <button
                onClick={prev}
                className="pointer-events-auto w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors backdrop-blur-sm"
                title="Previous camera (←)"
              >
                <SkipBack className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={next}
                className="pointer-events-auto w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors backdrop-blur-sm"
                title="Next camera (→)"
              >
                <SkipForward className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* ── Sidebar (hidden in fullscreen) ── */}
          {!isFullscreen && (
            <div className="w-full lg:w-72 xl:w-80 bg-[#0d1526] border-t lg:border-t-0 lg:border-l border-gray-800/50 flex flex-col">

              {/* Controls */}
              <div className="p-4 border-b border-gray-800/50">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-semibold text-sm">Auto-Sequence</p>
                  <button
                    onClick={() => setPlaying(p => !p)}
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${playing ? "bg-red-600/20 text-red-400 hover:bg-red-600/30" : "bg-green-600/20 text-green-400 hover:bg-green-600/30"}`}
                  >
                    {playing ? <><Pause className="w-3.5 h-3.5" /> Pause</> : <><Play className="w-3.5 h-3.5" /> Resume</>}
                  </button>
                </div>

                {/* Timer */}
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <div className="flex-1 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-[#F97316] transition-all duration-1000 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-xs w-8 text-right">{timeLeft}s</span>
                </div>

                {/* Interval selector */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs">Switch every</span>
                  <div className="flex gap-1">
                    {[30, 60, 120].map(sec => (
                      <button
                        key={sec}
                        onClick={() => { setIntervalSec(sec); setTimeLeft(sec); }}
                        className={`text-xs px-2 py-1 rounded transition-colors ${interval === sec ? "bg-[#F97316] text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
                      >
                        {sec < 60 ? `${sec}s` : `${sec / 60}m`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Keyboard hint */}
                <p className="text-gray-700 text-[10px] mt-2">← → to navigate · Space to pause · F for fullscreen</p>
              </div>

              {/* Camera list */}
              <div className="flex-1 overflow-y-auto">
                <p className="text-gray-600 text-[10px] uppercase tracking-wider px-4 pt-3 pb-2">All Cameras ({STREAMS.length})</p>
                {STREAMS.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => goTo(i)}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${i === current ? "bg-[#F97316]/10 border-l-2 border-[#F97316]" : "hover:bg-white/5 border-l-2 border-transparent"}`}
                  >
                    {/* Thumbnail */}
                    <div className="relative shrink-0 w-16 h-10 rounded overflow-hidden bg-gray-800">
                      <img
                        src={`https://i.ytimg.com/vi/${s.id}/mqdefault.jpg`}
                        alt={s.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {i === current && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-medium leading-snug line-clamp-2 ${i === current ? "text-[#F97316]" : "text-gray-300"}`}>
                        {s.title}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Wifi className="w-2.5 h-2.5 text-green-500 shrink-0" />
                        <span className="text-[10px] text-gray-600">Live</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-700 shrink-0 mt-0.5">{i + 1}</span>
                  </button>
                ))}
              </div>

              {/* CTA footer */}
              <div className="p-4 border-t border-gray-800/50 bg-[#0a0f1a]">
                <p className="text-[#F97316] font-semibold text-xs mb-1">Want cameras like these?</p>
                <p className="text-gray-500 text-[11px] mb-3 leading-snug">
                  You Need LED installs 4K Security Cameras with AI options for commercial &amp; residential properties across South Jersey. NJ DCA Licensed.
                </p>
                <a
                  href={SITE.phoneTel}
                  className="flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA6A0A] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors w-full"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call {SITE.phone}
                </a>
                <Link
                  href="/live-cameras"
                  className="flex items-center justify-center gap-2 mt-2 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors w-full"
                >
                  View All Camera Feeds
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── Fullscreen bottom controls bar ── */}
        {isFullscreen && (
          <div
            className={`absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-8 pb-4 px-6 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            {/* Progress bar */}
            <div className="h-0.5 bg-white/20 mb-4 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              {/* Left: playback controls */}
              <div className="flex items-center gap-2">
                <button onClick={prev} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <SkipBack className="w-4 h-4 text-white" />
                </button>
                <button onClick={() => setPlaying(p => !p)} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  {playing ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                </button>
                <button onClick={next} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <SkipForward className="w-4 h-4 text-white" />
                </button>
                <span className="text-gray-400 text-xs ml-1 tabular-nums">{timeLeft}s</span>
              </div>

              {/* Center: camera dots */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {STREAMS.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => goTo(i)}
                    title={s.title}
                    className={`shrink-0 rounded-full transition-all duration-200 ${i === current ? "w-6 h-2 bg-[#F97316]" : "w-2 h-2 bg-gray-600 hover:bg-gray-400"}`}
                  />
                ))}
              </div>

              {/* Right: interval + exit fullscreen */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[30, 60, 120].map(sec => (
                    <button
                      key={sec}
                      onClick={() => { setIntervalSec(sec); setTimeLeft(sec); }}
                      className={`text-[10px] px-2 py-1 rounded transition-colors ${interval === sec ? "bg-[#F97316] text-white" : "bg-white/10 text-gray-400 hover:bg-white/20"}`}
                    >
                      {sec < 60 ? `${sec}s` : `${sec / 60}m`}
                    </button>
                  ))}
                </div>
                <button
                  onClick={osFS ? toggleOsFS : togglePageFS}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  title="Exit fullscreen (Esc)"
                >
                  <Minimize2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
