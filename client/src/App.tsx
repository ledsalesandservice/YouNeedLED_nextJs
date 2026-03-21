import React, { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { PageTransition } from "./components/animations";

// ─── Eagerly-loaded pages (above the fold / always needed) ──────────────────
// Home is the most-visited page and should load immediately with no delay.
import Home from "./pages/Home";

// ─── Lazily-loaded pages (code-split into separate JS chunks) ───────────────
// Each lazy() call creates a separate bundle that is only fetched when the
// user navigates to that route, reducing the initial JS payload significantly.
const About             = lazy(() => import("./pages/About"));
const Contact           = lazy(() => import("./pages/Contact"));
const ServiceAreas      = lazy(() => import("./pages/ServiceAreas"));
const Blog              = lazy(() => import("./pages/Blog"));
const BlogPost          = lazy(() => import("./pages/BlogPost"));
const FAQ               = lazy(() => import("./pages/FAQ"));
const ClientPortal      = lazy(() => import("./pages/ClientPortal"));
const NotFound          = lazy(() => import("./pages/NotFound"));
const TermsOfService    = lazy(() => import("./pages/TermsOfService"));

// Service pages
const VideoSurveillance  = lazy(() => import("./pages/services/VideoSurveillance"));
const AccessControl      = lazy(() => import("./pages/services/AccessControl"));
const FireAlarm          = lazy(() => import("./pages/services/FireAlarm"));
const IntrusionDetection = lazy(() => import("./pages/services/IntrusionDetection"));
const JobsiteSecurity    = lazy(() => import("./pages/services/JobsiteSecurity"));
const VoIP               = lazy(() => import("./pages/services/VoIP"));
const AiVoiceAgent       = lazy(() => import("./pages/services/AiVoiceAgent"));
const CommercialSecurity = lazy(() => import("./pages/services/CommercialSecurity"));
const ApartmentSecurity  = lazy(() => import("./pages/services/ApartmentSecurity"));
const DigitalSignage     = lazy(() => import("./pages/services/DigitalSignage"));

// Dynamic location / county pages
const LocationPage = lazy(() => import("./pages/LocationPage"));
const CountyPage   = lazy(() => import("./pages/CountyPage"));

// ─── Loading fallback ────────────────────────────────────────────────────────
// Minimal spinner shown while a lazy chunk is being fetched.
// Matches the site's primary brand colour to avoid a jarring flash.
function PageLoader() {
  return (
    <div
      className="flex items-center justify-center min-h-[60vh]"
      aria-label="Loading page"
    >
      <div className="w-10 h-10 rounded-full border-4 border-[#0e319a]/20 border-t-[#0e319a] animate-spin" />
    </div>
  );
}

// ─── Scroll-to-top on route change ──────────────────────────────────────────
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

// ─── Router ─────────────────────────────────────────────────────────────────
function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/service-areas" component={ServiceAreas} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/faq" component={FAQ} />
        <Route path="/client-portal" component={ClientPortal} />
        <Route path="/services/video-surveillance" component={VideoSurveillance} />
        <Route path="/services/access-control" component={AccessControl} />
        <Route path="/services/fire-alarm-systems" component={FireAlarm} />
        <Route path="/services/intrusion-detection" component={IntrusionDetection} />
        <Route path="/services/jobsite-security" component={JobsiteSecurity} />
        <Route path="/services/voip" component={VoIP} />
        <Route path="/services/ai-voice-agent" component={AiVoiceAgent} />
        <Route path="/services/commercial-security" component={CommercialSecurity} />
        <Route path="/services/apartment-security" component={ApartmentSecurity} />
        <Route path="/services/digital-signage" component={DigitalSignage} />
        {/* Short URL aliases for landing pages */}
        <Route path="/cameras" component={VideoSurveillance} />
        <Route path="/phone-systems" component={VoIP} />
        {/* Dynamic location pages — 60+ towns */}
        <Route path="/locations/:slug" component={LocationPage} />
        {/* Dynamic county pages — 8 NJ counties */}
        <Route path="/counties/:slug" component={CountyPage} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// ─── App root ────────────────────────────────────────────────────────────────
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <PageTransition>
                <Router />
              </PageTransition>
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
