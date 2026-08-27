import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-load pages for code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const MarketplacePage = lazy(() => import("./pages/MarketplacePage"));
const SellerProfilePage = lazy(() => import("./pages/SellerProfilePage"));
const ListingPage = lazy(() => import("./pages/ListingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SellPage = lazy(() => import("./pages/SellPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const MessagesPage = lazy(() => import("./pages/MessagesPage"));
const BadgesPage = lazy(() => import("./pages/BadgesPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const SoldPage = lazy(() => import("./pages/SoldPage"));
const LegitPage = lazy(() => import("./pages/LegitPage"));
const FansignsPage = lazy(() => import("./pages/FansignsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
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

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#ff0000] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-950 text-[#f9f9fb] min-h-screen flex flex-col font-[Poppins,ui-sans-serif,system-ui,sans-serif]">
      <Navbar />
      <main className="flex-1 pb-24 md:pb-0">
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </main>
      <Footer />
      <MobileNav />
      
      {/* Floating Chat Button */}
      <button
        aria-label="Open chat"
        onClick={() => navigate("/messages")}
        className="fixed bottom-24 right-3 sm:right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#ff0000] text-white shadow-[0_20px_25px_-5px_rgba(255,0,0,0.2),0_8px_10px_-6px_rgba(255,0,0,0.1)] transition-transform hover:scale-105 active:scale-95"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
        <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-zinc-950 bg-white" />
      </button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Full-screen pages without Layout */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
        
        {/* Pages with standard Layout */}
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/fansigns" element={<FansignsPage />} />
              <Route path="/listing/:handle" element={<ListingPage />} />
              <Route path="/seller/:handle" element={<SellerProfilePage />} />
              <Route path="/sell" element={<ProtectedRoute><SellPage /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
              <Route path="/sold" element={<SoldPage />} />
              <Route path="/legit" element={<LegitPage />} />
              <Route path="/guides" element={<BadgesPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<NotFound />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/legit" element={<NotFound />} />
              <Route path="/contact" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}
