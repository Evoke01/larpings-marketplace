import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ShopMenu from "./ShopMenu";
import NotificationsMenu from "./NotificationsMenu";
import { useUnreadMessages } from "../hooks/useUnreadMessages";
import { useUnreadNotifications } from "../hooks/useUnreadNotifications";
import { prefetch } from "../App";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);
  const navigate = useNavigate();
  const unreadMessages = useUnreadMessages();
  const unreadNotifs = useUnreadNotifications();

  const platforms = [
    { label: "Instagram usernames", path: "/marketplace?platform=instagram" },
    { label: "TikTok usernames", path: "/marketplace?platform=tiktok" },
    { label: "X handles", path: "/marketplace?platform=twitter" },
    { label: "Snapchat usernames", path: "/marketplace?platform=snapchat" },
    { label: "Telegram usernames", path: "/marketplace?platform=telegram" },
  ];

  const navLinkClass = "text-[#93939f] text-sm font-medium px-3.5 py-2 rounded-[10px] hover:text-white transition-colors";

  return (
    <>
      {/* Fixed top navbar */}
      <div className="fixed z-50 inset-x-3 top-3 bottom-auto">
        <nav className="bg-[rgba(17,17,19,0.72)] max-w-[1152px] mx-auto backdrop-blur-[18px] backdrop-saturate-150 shadow-[rgba(0,0,0,0.9)_0px_12px_40px_-18px,rgba(255,255,255,0.04)_0px_1px_0px_0px_inset] border border-[rgba(34,34,38,0.9)] rounded-[14px]">
          <div className="h-12 flex items-center gap-2 px-4">
            {/* Logo */}
            <Link to="/" aria-label="larpings.com home" className="flex shrink-0 items-center mr-1">
              <span className="font-bold text-base tracking-tight text-white">larpings<span className="text-[#ff0000] text-[10px] align-middle relative -top-px">@</span>com</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex grow items-center gap-1 pl-4">
              {/* Shop dropdown */}
              <div className="relative">
                <button
                  className={`${navLinkClass} flex items-center gap-1`}
                  onClick={() => setShopOpen((v) => !v)}
                  onBlur={() => setTimeout(() => setShopOpen(false), 200)}
                >
                  Shop
                  <svg className={`w-3.5 h-3.5 transition-transform ${shopOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {shopOpen && (
                  <ShopMenu onClose={() => setShopOpen(false)} />
                )}
              </div>
              <NavLink to="/fansigns" className={navLinkClass} onMouseEnter={() => prefetch('/fansigns')}>Fansigns</NavLink>
              <NavLink to="/sold" className={navLinkClass} onMouseEnter={() => prefetch('/sold')}>Sold</NavLink>
              <NavLink to="/blog" className={navLinkClass} onMouseEnter={() => prefetch('/blog')}>Blog</NavLink>
              <NavLink to="/about" className={navLinkClass} onMouseEnter={() => prefetch('/about')}>About</NavLink>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto">
              <Link to="/sell" className="hidden md:inline-flex items-center rounded-[10px] bg-[#ff0000] px-3.5 py-2 text-sm font-medium text-white transition-all hover:-translate-y-px hover:bg-[#cc0000]" onMouseEnter={() => prefetch('/sell')}>Sell</Link>
              
              {/* Notifications */}
              <div className="relative">
                <button 
                  aria-label="Notifications" 
                  onClick={() => setNotifsOpen(v => !v)}
                  className="flex text-[#93939f] w-11 h-11 justify-center items-center rounded-[10px] border border-[#222226] hover:text-white hover:border-[#444] transition-colors relative"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  {unreadNotifs > 0 && <span aria-label={`${unreadNotifs} unread notifications`} className="absolute top-1 right-1 w-2 h-2 bg-[#ff0000] rounded-full border-[1.5px] border-[#111113]" />}
                </button>
                {notifsOpen && (
                  <NotificationsMenu onClose={() => setNotifsOpen(false)} />
                )}
              </div>

              <Link to="/messages" aria-label="Messages" className="flex text-[#93939f] w-11 h-11 justify-center items-center rounded-[10px] border border-[#222226] hover:text-white hover:border-[#444] transition-colors relative">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
                {/* Notification dot */}
                {unreadMessages > 0 && <span aria-label={`${unreadMessages} unread messages`} className="absolute top-1 right-1 w-2 h-2 bg-[#ff0000] rounded-full border-[1.5px] border-[#111113]" />}
              </Link>
              <Link to="/account" aria-label="Profile" className="flex text-[#93939f] w-11 h-11 justify-center items-center rounded-[10px] border border-[#222226] hover:text-white hover:border-[#444] transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
              <Link
                to="/marketplace"
                className="hidden sm:flex bg-white text-[#0e0e11] text-sm font-medium items-center gap-2 px-4 py-2 rounded-[10px] shadow-[rgba(255,255,255,0.4)_0px_1px_0px_0px_inset,rgba(0,0,0,0.8)_0px_8px_24px_-12px] hover:-translate-y-px active:translate-y-0 transition-all"
              >
                Shop
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#0e0e11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                </svg>
              </Link>
              {/* Mobile hamburger */}
              <button
                aria-label="Open menu"
                className="md:hidden w-11 h-11 flex justify-center items-center rounded-[10px] border border-[#222226] text-white"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-[#222226] px-4 py-3 flex flex-col gap-1">
              <p className="text-[#93939f] font-mono text-[10px] tracking-widest uppercase mb-2">Shop by platform</p>
              {platforms.map(({ label, path }) => (
                <Link key={label} to={path} className="text-sm text-[#b7b7c2] hover:text-white py-1.5 transition-colors" onClick={() => setMenuOpen(false)}>{label}</Link>
              ))}
              <div className="my-2 border-t border-[#222226]" />
              {[
                { l: "Sell", path: "/sell" },
                { l: "Fansigns", path: "/fansigns" },
                { l: "Sold", path: "/sold" },
                { l: "Blog", path: "/blog" },
                { l: "About", path: "/about" }
              ].map(({ l, path }) => (
                <Link key={l} to={path} className="text-sm text-[#93939f] hover:text-white py-1.5 transition-colors" onClick={() => setMenuOpen(false)}>{l}</Link>
              ))}
            </div>
          )}
        </nav>
      </div>
      {/* Spacer so content doesn't hide under navbar */}
      <div className="h-[64px]" />
    </>
  );
}
