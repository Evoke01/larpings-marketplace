import { HelmetProvider } from 'react-helmet-async';
import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

// ── Prefetch registry ──────────────────────────────────────────────────────
// Call prefetch(path) on hover to start downloading the chunk before click.
const PREFETCH_MAP: Record<string, () => Promise<unknown>> = {
  '/': () => import('./pages/HomePage'),
  '/marketplace': () => import('./pages/MarketplacePage'),
  '/fansigns': () => import('./pages/FansignsPage'),
  '/sell': () => import('./pages/SellPage'),
  '/sold': () => import('./pages/SoldPage'),
  '/blog': () => import('./pages/BlogPage'),
  '/about': () => import('./pages/AboutPage'),
  '/dashboard': () => import('./pages/DashboardPage'),
  '/messages': () => import('./pages/MessagesPage'),
  '/orders': () => import('./pages/OrdersPage'),
};

export function prefetch(path: string) {
  const key = path.split('?')[0];
  PREFETCH_MAP[key]?.();
}
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import SectionTour from "./components/SectionTour";
import { useUnreadMessages } from "./hooks/useUnreadMessages";

// Lazy-load pages for code splitting
const PancakeLayout = lazy(() => import("./pages/admin/PancakeLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const MarketplacePage = lazy(() => import("./pages/MarketplacePage"));
const SellerProfilePage = lazy(() => import("./pages/SellerProfilePage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const ListingPage = lazy(() => import("./pages/ListingPage"));
const MMDashboardPage = lazy(() => import("./pages/mm/MMDashboardPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SellPage = lazy(() => import("./pages/SellPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const AccountRedirector = lazy(() => import("./pages/AccountRedirector"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const MessagesPage = lazy(() => import("./pages/MessagesPage"));
const BadgesPage = lazy(() => import("./pages/BadgesPage"));
const RanksPage = lazy(() => import("./pages/RanksPage"));
const GetVerifiedPage = lazy(() => import("./pages/GetVerifiedPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const SoldPage = lazy(() => import("./pages/SoldPage"));
const LegitPage = lazy(() => import("./pages/LegitPage"));
const FansignsPage = lazy(() => import("./pages/FansignsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const LegalAcceptancePage = lazy(() => import("./pages/LegalAcceptancePage"));
const UpdatePasswordPage = lazy(() => import("./pages/UpdatePasswordPage"));
function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-[#ff0000] font-mono text-[11px] tracking-[2px] uppercase mb-4">404</p>
      <h1 className="text-4xl font-semibold mb-4">Page not found</h1>
      <p className="text-[#93939f] mb-8">This page doesn't exist or was moved.</p>
      <a href="/" className="bg-[#ff0000] text-white font-medium px-6 py-3 rounded-[10px] hover:bg-[#cc0000] transition-colors">
        Go home
      </a>
    </div>
  );
}

function Bone({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-[8px] bg-[#1a1a1e] ${className}`}
      style={{ backgroundImage: 'linear-gradient(90deg,#1a1a1e 25%,#222226 50%,#1a1a1e 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s ease-in-out infinite' }}
    />
  );
}

function PageLoader() {
  return (
    <div className="px-4 pt-24 pb-20 max-w-5xl mx-auto animate-pulse">
      {/* Hero */}
      <div className="flex flex-col items-center text-center py-16 gap-5">
        <Bone className="h-5 w-40" />
        <Bone className="h-14 w-[min(480px,90%)]" />
        <Bone className="h-10 w-[min(320px,75%)]" />
        <div className="flex gap-3 mt-2">
          <Bone className="h-11 w-36 rounded-[10px]" />
          <Bone className="h-11 w-28 rounded-[10px]" />
        </div>
      </div>
      {/* Card grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-[#111113] border border-[#1e1e22] rounded-[14px] p-5 flex flex-col gap-3">
            <Bone className="h-3 w-20" />
            <Bone className="h-6 w-full" />
            <Bone className="h-3 w-16 mt-auto" />
            <Bone className="h-px w-full !rounded-none" />
            <div className="flex justify-between">
              <Bone className="h-4 w-16" />
              <Bone className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const unreadMessages = useUnreadMessages();
  const location = useLocation();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("main section, main article, main [data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("scroll-reveal", "is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -32px 0px" });
    elements.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index * 45, 240)}ms`);
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="bg-zinc-950 text-[#f9f9fb] min-h-screen flex flex-col font-[Poppins,ui-sans-serif,system-ui,sans-serif]">
      <Navbar />
      <main className={`page-motion flex-1 ${location.pathname.startsWith('/messages') ? '' : 'pb-24 md:pb-0'}`}>
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </main>
      <Footer />
      {!location.pathname.startsWith('/messages') && !location.pathname.startsWith('/checkout') && (
        <>
          <MobileNav />
          <button
            aria-label="Open chat"
            onClick={() => navigate("/messages")}
            className="chat-breathe fixed bottom-24 right-3 sm:right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#ff0000] text-white shadow-[0_20px_25px_-5px_rgba(255,0,0,0.2),0_8px_10px_-6px_rgba(255,0,0,0.1)] transition-transform hover:scale-105 active:scale-95"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            {unreadMessages > 0 && <span aria-label={`${unreadMessages} unread messages`} className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-zinc-950 bg-[#ff0000]" />}
          </button>
        </>
      )}
      <SectionTour pathname={location.pathname} />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="bg-noise" />
      <Routes>
        {/* Admin panel — secret route, own layout shell */}
        <Route path="/pancake/*" element={<Suspense fallback={<PageLoader />}><PancakeLayout /></Suspense>} />

        {/* Full-screen pages without Layout */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
        <Route path="/account" element={<ProtectedRoute><AccountRedirector /></ProtectedRoute>} />
        <Route path="/:username/account" element={<ProtectedRoute><><AccountPage /><SectionTour pathname="/account" /></></ProtectedRoute>} />
        
        {/* Pages with standard Layout */}
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/fansigns" element={<FansignsPage />} />
              <Route path="/listing/:id" element={<ListingPage />} />
              <Route path="/mm/dashboard" element={<ProtectedRoute><MMDashboardPage /></ProtectedRoute>} />
              <Route path="/:handle" element={<SellerProfilePage />} />
              <Route path="/profile/:id" element={<UserProfilePage />} />
              <Route path="/sell" element={<ProtectedRoute><SellPage /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
              <Route path="/sold" element={<SoldPage />} />
              <Route path="/legit" element={<LegitPage />} />
              <Route path="/guides" element={<BadgesPage />} />
              <Route path="/badges" element={<BadgesPage />} />
              <Route path="/ranks" element={<RanksPage />} />
              <Route path="/get-verified" element={<GetVerifiedPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<NotFound />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/terms" element={<LegalPage kind="terms" />} />
              <Route path="/privacy" element={<LegalPage kind="privacy" />} />
              <Route path="/legal-acceptance" element={<LegalAcceptancePage />} />
              <Route path="/legit" element={<NotFound />} />
              <Route path="/contact" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
  );
}
