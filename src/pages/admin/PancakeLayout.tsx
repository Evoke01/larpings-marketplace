import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink, useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import PancakeDashboard from "./PancakeDashboard";
import UsersManager from "./UsersManager";
import ListingsManager from "./ListingsManager";
import VerificationsManager from "./VerificationsManager";
import OrdersLedger from "./OrdersLedger";
import AnnouncementsManager from "./AnnouncementsManager";

const NAV = [
  { to: "/pancake", end: true, label: "Dashboard", badge: false },
  { to: "/pancake/users", label: "Users", badge: false },
  { to: "/pancake/listings", label: "Listings", badge: false },
  { to: "/pancake/verifications", label: "Verifications", badge: true },
  { to: "/pancake/orders", label: "Orders", badge: false },
  { to: "/pancake/announcements", label: "Announcements", badge: false },
];

const ICONS: Record<string, React.ReactNode> = {
  "/pancake": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  "/pancake/users": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  "/pancake/listings": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
  "/pancake/verifications": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  "/pancake/orders": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>,
  "/pancake/announcements": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
};

export default function PancakeLayout() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [pendingVerifs, setPendingVerifs] = useState(0);
  const [adminUsername, setAdminUsername] = useState("");

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/"); return; }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, username")
        .eq("id", user.id)
        .single();
      if (!profile || profile.role !== "admin") { navigate("/"); return; }
      setAdminUsername(profile.username ?? "admin");
      const { count } = await supabase
        .from("seller_verifications")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");
      setPendingVerifs(count ?? 0);
      setChecking(false);
    };
    init();
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="w-6 h-6 border-2 border-[#ff0000] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-[#f9f9fb] font-[Outfit,ui-sans-serif,system-ui,sans-serif] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-white/[0.06] bg-black/40 backdrop-blur-xl">
        <div className="px-5 py-5 border-b border-white/[0.06]">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-[#ff0000] font-mono font-bold text-lg leading-none">LP</span>
            <div>
              <p className="text-xs font-semibold leading-none">larpings.com</p>
              <p className="text-[10px] text-[#ff0000]/70 font-mono tracking-widest uppercase leading-none mt-0.5">admin</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-all ${
                  isActive ? "bg-[#ff0000]/10 text-[#ff0000] border border-[#ff0000]/20" : "text-[#93939f] hover:text-[#f9f9fb] hover:bg-white/[0.04]"
                }`
              }
            >
              {ICONS[item.to]}
              <span className="flex-1">{item.label}</span>
              {item.badge && pendingVerifs > 0 && (
                <span className="min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[#ff0000] text-white text-[10px] font-bold">
                  {pendingVerifs}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#ff0000]/15 flex items-center justify-center shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">@{adminUsername}</p>
              <p className="text-[10px] text-[#ff0000]/70 font-mono uppercase tracking-wider">Admin</p>
            </div>
          </div>
        </div>
      </aside>
      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-black/40 backdrop-blur-xl">
          <span className="text-[#ff0000] font-mono font-bold">LP Admin</span>
          <div className="flex gap-1">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}
                className={({ isActive }) => `relative p-2 rounded-[8px] ${isActive ? "text-[#ff0000] bg-[#ff0000]/10" : "text-[#93939f]"}`}
              >
                {ICONS[item.to]}
                {item.badge && pendingVerifs > 0 && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#ff0000]" />}
              </NavLink>
            ))}
          </div>
        </div>
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route index element={<PancakeDashboard />} />
            <Route path="users" element={<UsersManager />} />
            <Route path="listings" element={<ListingsManager />} />
            <Route path="verifications" element={<VerificationsManager />} />
            <Route path="orders" element={<OrdersLedger />} />
            <Route path="announcements" element={<AnnouncementsManager />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
