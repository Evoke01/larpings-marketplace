import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../../lib/supabase";

interface Listing {
  id: string;
  handle: string;
  platform: string;
  category: string;
  price: number;
  status: string;
  hot: boolean;
  created_at: string;
  seller_id: string;
  profiles?: { username: string };
}

export default function ListingsManager() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionMsg, setActionMsg] = useState("");
  const [noteModal, setNoteModal] = useState<{ listing: Listing; action: "remove" | "restore" } | null>(null);
  const [adminNote, setAdminNote] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("listings")
      .select("*, profiles(username)")
      .order("created_at", { ascending: false });
    setListings(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const flash = (msg: string) => { setActionMsg(msg); setTimeout(() => setActionMsg(""), 3000); };

  const takedown = async () => {
    if (!noteModal) return;
    await supabase.from("listings").update({ status: "removed" }).eq("id", noteModal.listing.id);
    flash(`@${noteModal.listing.handle} taken down`);
    setNoteModal(null);
    setAdminNote("");
    load();
  };

  const restore = async (listing: Listing) => {
    await supabase.from("listings").update({ status: "active" }).eq("id", listing.id);
    flash(`@${listing.handle} restored`);
    load();
  };

  const toggleHot = async (listing: Listing) => {
    await supabase.from("listings").update({ hot: !listing.hot }).eq("id", listing.id);
    flash(!listing.hot ? `@${listing.handle} featured` : `@${listing.handle} unfeatured`);
    load();
  };

  const filtered = listings.filter(l => {
    const matchSearch = l.handle?.toLowerCase().includes(search.toLowerCase()) ||
      (l.profiles as any)?.username?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusColor = (s: string) => {
    if (s === "active") return "bg-green-500/15 text-green-400";
    if (s === "removed") return "bg-[#ff0000]/15 text-[#ff0000]";
    if (s === "sold") return "bg-blue-500/15 text-blue-400";
    return "bg-white/[0.05] text-[#93939f]";
  };

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="font-mono text-[11px] tracking-[2px] uppercase text-[#ff0000] mb-1">Moderation</p>
          <h1 className="text-2xl font-semibold">Listings</h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search handle..."
            className="px-3 py-2 rounded-[10px] border border-white/[0.1] bg-white/[0.04] text-sm text-[#f9f9fb] placeholder-[#93939f] outline-none focus:border-[#ff0000]/50 w-48"
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-[10px] border border-white/[0.1] bg-white/[0.04] text-sm text-[#f9f9fb] outline-none">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="sold">Sold</option>
            <option value="removed">Removed</option>
          </select>
        </div>
      </div>

      {actionMsg && (
        <div className="mb-4 rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10 px-4 py-2.5 text-sm text-[#ff0000]">
          {actionMsg}
        </div>
      )}

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
                  {["Handle", "Seller", "Platform", "Price", "Status", "Featured", "Date", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-mono text-[10px] tracking-widest uppercase text-[#93939f]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map(l => (
                  <tr key={l.id} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-4 py-3.5 font-medium">@{l.handle}</td>
                    <td className="px-4 py-3.5 text-xs text-[#93939f]">@{(l.profiles as any)?.username ?? "—"}</td>
                    <td className="px-4 py-3.5 text-xs text-[#93939f] capitalize">{l.platform}</td>
                    <td className="px-4 py-3.5 font-mono font-semibold">${l.price?.toLocaleString()}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${statusColor(l.status)}`}>{l.status}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button onClick={() => toggleHot(l)}
                        className={`text-xs px-2.5 py-1 rounded-[7px] border transition-colors ${l.hot ? "border-yellow-400/40 text-yellow-400 bg-yellow-400/10" : "border-white/[0.1] text-[#93939f] hover:border-yellow-400/30 hover:text-yellow-400"}`}>
                        {l.hot ? "★ Featured" : "☆ Feature"}
                      </button>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#93939f]">{new Date(l.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3.5">
                      {l.status !== "removed" ? (
                        <button onClick={() => { setNoteModal({ listing: l, action: "remove" }); setAdminNote(""); }}
                          className="text-xs px-3 py-1.5 rounded-[8px] border border-[#ff0000]/30 text-[#ff0000] hover:bg-[#ff0000]/10 transition-colors">
                          Takedown
                        </button>
                      ) : (
                        <button onClick={() => restore(l)}
                          className="text-xs px-3 py-1.5 rounded-[8px] border border-green-500/30 text-green-400 hover:bg-green-500/10 transition-colors">
                          Restore
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <p className="py-10 text-center text-sm text-[#93939f]">No listings found.</p>}
        </div>
      )}

      {noteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="rounded-[16px] border border-white/[0.1] bg-[#0e0e11] p-6 w-full max-w-sm shadow-2xl">
            <h2 className="text-lg font-semibold mb-1">Takedown Listing</h2>
            <p className="text-sm text-[#93939f] mb-5">Taking down <span className="text-[#f9f9fb] font-medium">@{noteModal.listing.handle}</span></p>
            <label className="block text-xs text-[#93939f] mb-1.5 font-mono uppercase tracking-wider">Admin Note (optional)</label>
            <textarea value={adminNote} onChange={e => setAdminNote(e.target.value)}
              placeholder="Reason for takedown..."
              className="w-full px-3 py-2.5 rounded-[10px] border border-white/[0.1] bg-white/[0.04] text-sm text-[#f9f9fb] mb-5 outline-none resize-none h-20" />
            <div className="flex gap-2">
              <button onClick={takedown} className="btn-accent flex-1 !bg-[#ff0000]">Takedown</button>
              <button onClick={() => setNoteModal(null)} className="btn-outline-dim flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
