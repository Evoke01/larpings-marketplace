import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../../lib/supabase";

const BADGE_OPTIONS = ["trusted_seller", "og", "top_seller", "verified_seller", "early_adopter", "dexter"];

interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  role: string;
  rating: number;
  reviews: number;
  rep_count: number;
  vouch_count: number;
  banned_at: string | null;
  created_at: string;
}

interface Badge {
  id: string;
  user_id: string;
  badge_type: string;
}

export default function UsersManager() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalUser, setModalUser] = useState<Profile | null>(null);
  const [badgeInput, setBadgeInput] = useState("trusted_seller");
  const [actionMsg, setActionMsg] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: u }, { data: b }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("badges").select("*"),
    ]);
    setUsers(u ?? []);
    setBadges(b ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const flash = (msg: string) => { setActionMsg(msg); setTimeout(() => setActionMsg(""), 3000); };

  const toggleBan = async (user: Profile) => {
    const val = user.banned_at ? null : new Date().toISOString();
    await supabase.from("profiles").update({ banned_at: val }).eq("id", user.id);
    flash(val ? `@${user.username} banned` : `@${user.username} unbanned`);
    load();
  };

  const grantBadge = async () => {
    if (!modalUser) return;
    const { data: me } = await supabase.auth.getUser();
    await supabase.from("badges").insert({ user_id: modalUser.id, badge_type: badgeInput, granted_by: me.user?.id });
    flash(`Badge "${badgeInput}" granted to @${modalUser.username}`);
    setModalUser(null);
    load();
  };

  const revokeBadge = async (badge: Badge, username: string) => {
    await supabase.from("badges").delete().eq("id", badge.id);
    flash(`Badge "${badge.badge_type}" revoked from @${username}`);
    load();
  };

  const filtered = users.filter(u =>
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.display_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="font-mono text-[11px] tracking-[2px] uppercase text-[#ff0000] mb-1">Management</p>
          <h1 className="text-2xl font-semibold">Users</h1>
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search username..."
          className="px-3 py-2 rounded-[10px] border border-white/[0.1] bg-white/[0.04] text-sm text-[#f9f9fb] placeholder-[#93939f] outline-none focus:border-[#ff0000]/50 w-56"
        />
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
                  {["User", "Role", "Rep / Vouch", "Rating", "Badges", "Joined", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-mono text-[10px] tracking-widest uppercase text-[#93939f]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map(u => {
                  const userBadges = badges.filter(b => b.user_id === u.id);
                  const isBanned = !!u.banned_at;
                  return (
                    <tr key={u.id} className={`transition-colors hover:bg-white/[0.02] ${isBanned ? "opacity-50" : ""}`}>
                      <td className="px-4 py-3.5">
                        <p className="font-medium">@{u.username}</p>
                        {u.display_name && <p className="text-xs text-[#93939f]">{u.display_name}</p>}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                          u.role === "admin" ? "bg-[#ff0000]/20 text-[#ff0000]" :
                          u.role === "moderator" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-white/[0.05] text-[#93939f]"
                        }`}>{u.role}</span>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs">{u.rep_count} / {u.vouch_count}</td>
                      <td className="px-4 py-3.5 font-mono text-xs">{u.rating > 0 ? u.rating.toFixed(1) : "—"} <span className="text-[#93939f]">({u.reviews})</span></td>
                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {userBadges.map(b => (
                            <span key={b.id} className="group relative inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.07] text-[10px] text-[#f9f9fb] font-mono">
                              {b.badge_type}
                              <button onClick={() => revokeBadge(b, u.username)} className="hidden group-hover:inline text-[#ff0000] ml-0.5">×</button>
                            </span>
                          ))}
                          <button onClick={() => { setModalUser(u); setBadgeInput("trusted_seller"); }}
                            className="inline-flex items-center px-2 py-0.5 rounded-full border border-dashed border-white/[0.15] text-[10px] text-[#93939f] hover:border-[#ff0000]/50 hover:text-[#ff0000] transition-colors">
                            + badge
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-[#93939f]">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3.5">
                        <button onClick={() => toggleBan(u)}
                          className={`text-xs px-3 py-1.5 rounded-[8px] border transition-colors ${
                            isBanned
                              ? "border-green-500/30 text-green-400 hover:bg-green-500/10"
                              : "border-[#ff0000]/30 text-[#ff0000] hover:bg-[#ff0000]/10"
                          }`}
                        >
                          {isBanned ? "Unban" : "Ban"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-[#93939f]">No users found.</p>
          )}
        </div>
      )}

      {/* Badge Modal */}
      {modalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="rounded-[16px] border border-white/[0.1] bg-[#0e0e11] p-6 w-full max-w-sm shadow-2xl">
            <h2 className="text-lg font-semibold mb-1">Grant Badge</h2>
            <p className="text-sm text-[#93939f] mb-5">Granting to <span className="text-[#f9f9fb] font-medium">@{modalUser.username}</span></p>
            <label className="block text-xs text-[#93939f] mb-1.5 font-mono uppercase tracking-wider">Badge Type</label>
            <select value={badgeInput} onChange={e => setBadgeInput(e.target.value)}
              className="w-full px-3 py-2.5 rounded-[10px] border border-white/[0.1] bg-white/[0.04] text-sm text-[#f9f9fb] mb-5 outline-none">
              {BADGE_OPTIONS.map(b => <option key={b} value={b}>{b === "dexter" ? "DEXTER" : b}</option>)}
            </select>
            <div className="flex gap-2">
              <button onClick={grantBadge} className="btn-accent flex-1">Grant</button>
              <button onClick={() => setModalUser(null)} className="btn-outline-dim flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
