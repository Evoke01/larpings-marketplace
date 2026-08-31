import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../../lib/supabase";

interface Order {
  id: string;
  listing_id: string;
  buyer_id: string;
  status: string;
  created_at: string;
  crypto_amount: number | null;
  crypto_currency: string | null;
  listings?: { handle: string; price: number; platform: string; profiles?: { username: string } };
  buyer?: { username: string };
}

export default function OrdersLedger() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*, listings(handle, price, platform, profiles(username))")
      .order("created_at", { ascending: false });
    setOrders(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = orders.filter(o => statusFilter === "all" || o.status === statusFilter);
  const confirmed = orders.filter(o => o.status === "confirmed");
  const gmv = confirmed.reduce((sum, o) => sum + ((o.listings as any)?.price ?? 0), 0);

  const statusColor = (s: string) => {
    if (s === "confirmed") return "bg-green-500/15 text-green-400";
    if (s === "pending") return "bg-yellow-500/15 text-yellow-400";
    if (s === "cancelled") return "bg-[#ff0000]/15 text-[#ff0000]";
    return "bg-white/[0.05] text-[#93939f]";
  };

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <p className="font-mono text-[11px] tracking-[2px] uppercase text-[#ff0000] mb-1">Finance</p>
        <h1 className="text-2xl font-semibold">Orders Ledger</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Orders", value: orders.length.toLocaleString(), sub: "all time" },
          { label: "Gross GMV", value: `$${gmv.toLocaleString()}`, sub: "confirmed sales" },

        ].map((c: any) => (
          <div key={c.label} className={`rounded-[14px] border p-5 ${c.accent ? "border-[#ff0000]/30 bg-[#ff0000]/5" : "border-white/[0.07] bg-[#0e0e11]"}`}>
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#93939f] mb-2">{c.label}</p>
            <p className={`font-mono text-3xl font-semibold ${c.accent ? "text-[#ff0000]" : "text-[#f9f9fb]"}`}>{c.value}</p>
            <p className="text-[11px] text-[#93939f] mt-1">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-[#93939f]">{filtered.length} orders</p>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-[10px] border border-white/[0.1] bg-white/[0.04] text-sm text-[#f9f9fb] outline-none">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-6 h-6 border-2 border-[#ff0000] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="rounded-[14px] border border-white/[0.07] bg-[#0e0e11] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Handle", "Seller", "Price", "Crypto", "Status", "Date"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-mono text-[10px] tracking-widest uppercase text-[#93939f]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map(o => {
                  const listing = o.listings as any;
                  return (
                    <tr key={o.id} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3.5 font-medium">@{listing?.handle ?? "—"}</td>
                      <td className="px-4 py-3.5 text-xs text-[#93939f]">@{listing?.profiles?.username ?? "—"}</td>
                      <td className="px-4 py-3.5 font-mono font-semibold">${listing?.price?.toLocaleString() ?? "—"}</td>
                      <td className="px-4 py-3.5 text-xs text-[#93939f]">
                        {o.crypto_amount ? `${o.crypto_amount} ${o.crypto_currency}` : "—"}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${statusColor(o.status)}`}>{o.status}</span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-[#93939f]">{new Date(o.created_at).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <p className="py-10 text-center text-sm text-[#93939f]">No orders found.</p>}
        </div>
      )}
    </div>
  );
}
