import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ServiceAreas from "./pages/ServiceAreas";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import VideoSurveillance from "./pages/services/VideoSurveillance";
import AccessControl from "./pages/services/AccessControl";
import FireAlarm from "./pages/services/FireAlarm";
import IntrusionDetection from "./pages/services/IntrusionDetection";
import JobsiteSecurity from "./pages/services/JobsiteSecurity";
import VoIP from "./pages/services/VoIP";
import AiVoiceAgent from "./pages/services/AiVoiceAgent";
import CommercialSecurity from "./pages/services/CommercialSecurity";
import ApartmentSecurity from "./pages/services/ApartmentSecurity";
import LocationPage from "./pages/LocationPage";
import CountyPage from "./pages/CountyPage";
import ClientPortal from "./pages/ClientPortal";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { PageTransition } from "./components/animations";
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}
function Router() {
  return (
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
      {/* Short URL aliases for landing pages */}
      <Route path="/cameras" component={VideoSurveillance} />
      <Route path="/phone-systems" component={VoIP} />
      {/* Dynamic location pages — 60+ towns */}
      <Route path="/locations/:slug" component={LocationPage} />
      {/* Dynamic county pages — 8 NJ counties */}
      <Route path="/counties/:slug" component={CountyPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}
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
