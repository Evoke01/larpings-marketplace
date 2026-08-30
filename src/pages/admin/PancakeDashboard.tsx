import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

interface Stats {
  users: number;
  listings: number;
  orders: number;
  revenue: number;
  pendingVerifs: number;
}

export default function PancakeDashboard() {
  const [stats, setStats] = useState<Stats>({ users: 0, listings: 0, orders: 0, revenue: 0, pendingVerifs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [
        { count: users },
        { count: listings },
        { count: orders },
        { count: pendingVerifs },
        { data: orderData },
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("listings").select("*", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase.from("seller_verifications").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("orders").select("listings(price)").eq("status", "confirmed"),
      ]);

      const revenue = (orderData ?? []).reduce((sum: number, o: any) => sum + (o.listings?.price ?? 0), 0);

      setStats({
        users: users ?? 0,
        listings: listings ?? 0,
        orders: orders ?? 0,
        revenue,
        pendingVerifs: pendingVerifs ?? 0,
      });
      setLoading(false);
    };
    load();
  }, []);

  const cards = [
    { label: "Total Users", value: stats.users.toLocaleString(), sub: "registered accounts", to: "/pancake/users" },
    { label: "Active Listings", value: stats.listings.toLocaleString(), sub: "live on marketplace", to: "/pancake/listings" },
    { label: "Total Orders", value: stats.orders.toLocaleString(), sub: "all time", to: "/pancake/orders" },

    { label: "Pending Verifs", value: stats.pendingVerifs.toLocaleString(), sub: "$49 requests awaiting", to: "/pancake/verifications", urgent: stats.pendingVerifs > 0 },
    { label: "Gross Revenue", value: `$${stats.revenue.toLocaleString()}`, sub: "total confirmed GMV", to: "/pancake/orders" },
  ];

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[2px] uppercase text-[#ff0000] mb-1">Overview</p>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-[#93939f] mt-1">Real-time platform health at a glance.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-6 h-6 border-2 border-[#ff0000] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((c) => (
            <Link key={c.label} to={c.to}
              className={`rounded-[14px] border bg-[#0e0e11] p-5 transition-all hover:-translate-y-0.5 hover:border-[#ff0000]/30 hover:shadow-[0_0_30px_-10px_rgba(255,0,0,0.3)] ${
                c.urgent ? "border-[#ff0000]/40 bg-[#ff0000]/5" : "border-white/[0.07]"
              }`}
            >
              <p className="font-mono text-[10px] tracking-widest uppercase text-[#93939f] mb-2">{c.label}</p>
              <p className={`font-mono text-3xl font-semibold ${c.urgent ? "text-[#ff0000]" : "text-[#f9f9fb]"}`}>{c.value}</p>
              <p className="text-[11px] text-[#93939f] mt-1">{c.sub}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 rounded-[14px] border border-white/[0.07] bg-[#0e0e11] p-5">
        <p className="font-mono text-[10px] tracking-widest uppercase text-[#93939f] mb-4">Quick Actions</p>
        <div className="flex flex-wrap gap-2">
          <Link to="/pancake/verifications" className="btn-accent !text-xs !py-2 !px-4">Review Verifications</Link>
          <Link to="/pancake/users" className="btn-outline-dim !text-xs !py-2 !px-4">Manage Users</Link>
          <Link to="/pancake/listings" className="btn-outline-dim !text-xs !py-2 !px-4">Moderate Listings</Link>
          <Link to="/pancake/announcements" className="btn-outline-dim !text-xs !py-2 !px-4">Post Announcement</Link>
        </div>
      </div>
    </div>
  );
}
