import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUnreadMessages } from "../hooks/useUnreadMessages";

// Inline SVG icons — no separate files needed
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const AtIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
  </svg>
);

const ShopIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const AccountIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const tabs = [
  { to: "/", label: "Home", Icon: HomeIcon },
  { to: "/marketplace", label: "Marketplace", Icon: SearchIcon },
  { to: "/messages", label: "Messages", Icon: AtIcon },
  { to: "/orders", label: "Orders", Icon: ShopIcon },
  { to: "/account", label: "Profile", Icon: AccountIcon },
];

export default function MobileNav() {
  const location = useLocation();
  const unreadMessages = useUnreadMessages();

  // Find the active tab index (exact match first, then prefix)
  const activeIndex = (() => {
    const exact = tabs.findIndex((t) => t.to === location.pathname);
    if (exact !== -1) return exact;
    const prefix = tabs.findIndex((t) => t.to !== "/" && location.pathname.startsWith(t.to));
    return prefix !== -1 ? prefix : 0;
  })();

  // Sliding pill offset: each tab is 1/5 of total width
  const pillLeft = `${activeIndex * 20}%`;

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed z-40 bottom-3 left-1/2 w-[calc(100%-24px)] max-w-[448px] -translate-x-1/2"
    >
      <div className="bg-[rgba(255,255,255,0.05)] h-16 w-full relative grid items-center grid-cols-5 shadow-[rgba(255,255,255,0.14)_0px_1px_0px_0px_inset,rgba(0,0,0,0.35)_0px_-1px_0px_0px_inset,rgba(0,0,0,0.55)_0px_18px_50px_0px] backdrop-blur-2xl backdrop-saturate-150 rounded-full border border-[rgba(255,255,255,0.1)]">

        {/* Sliding active pill */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 -translate-y-1/2 w-[20%] h-12 pointer-events-none transition-[left] duration-[550ms] ease-[cubic-bezier(0.3,1.4,0.45,1)]"
          style={{ left: pillLeft }}
        >
          <div className="bg-[rgba(255,255,255,0.12)] h-full shadow-[rgba(255,255,255,0.25)_0px_1px_0px_0px_inset,rgba(0,0,0,0.18)_0px_-6px_14px_0px_inset,rgba(0,0,0,0.35)_0px_6px_18px_0px] backdrop-blur-xl mx-1.5 rounded-full border border-[rgba(255,255,255,0.2)]" />
        </div>

        {/* Tab items */}
        {tabs.map(({ to, label, Icon }, i) => {
          const isActive = i === activeIndex;
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              className={`h-full relative z-10 flex justify-center items-center transition-colors ${
                isActive ? "text-white" : "text-[#93939f]"
              }`}
            >
              <span className="relative"><Icon
                width="24"
                height="24"
                className={`w-6 h-6 block transition-colors ${
                  isActive ? "stroke-white" : "stroke-[#93939f]"
                } ${i === 2 ? "w-7 h-7" : ""}`}
                stroke={isActive ? "#ffffff" : "#93939f"}
              />{i === 2 && unreadMessages > 0 && <span aria-label={`${unreadMessages} unread messages`} className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-[#171719] bg-[#ff0000]" />}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
