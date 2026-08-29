import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ReputationPanel from "../components/ReputationPanel";

type Profile = { id: string; username: string; display_name: string | null; bio: string | null; avatar_url: string | null; banner_url: string | null; rep_count: number | null; vouch_count: number | null; created_at: string };
type Badge = { id: string; badge_type: string };

export default function UserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { let active = true; (async () => {
    if (!id) { setLoading(false); return; }
    const [{ data: user }, { data: userBadges }] = await Promise.all([
      supabase.from("profiles").select("id,username,display_name,bio,avatar_url,banner_url,rep_count,vouch_count,created_at").eq("id", id).maybeSingle(),
      supabase.from("badges").select("id,badge_type").eq("user_id", id),
    ]);
    if (!active) return; setProfile(user); setBadges(userBadges ?? []); setLoading(false);
  })(); return () => { active = false; }; }, [id]);

  if (loading) return <div className="min-h-[70vh] flex items-center justify-center"><div className="h-7 w-7 animate-spin rounded-full border-2 border-[#ff0000] border-t-transparent" /></div>;
  if (!profile) return <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center"><p className="mono-label text-[#ff0000]">404</p><h1 className="mt-3 text-2xl font-medium">User not found</h1><p className="mt-3 text-sm text-[#93939f]">This profile may have been removed or is unavailable.</p><Link to="/messages" className="mt-6 rounded-[10px] bg-white px-5 py-3 font-medium text-[#0e0e11]">Back to messages</Link></div>;

  return <main className="mx-auto w-full max-w-[960px] px-4 pb-24 pt-4"><section className="relative overflow-hidden rounded-[18px] border border-[#222226] bg-[#111113]"><div className="h-44 bg-gradient-to-br from-[#241014] via-[#111113] to-[#09090b]" style={profile.banner_url ? { backgroundImage: `url(${profile.banner_url})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined} /><div className="relative -mt-10 flex flex-wrap items-end justify-between gap-4 px-6"><div className="flex min-w-0 items-end gap-4"><div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[#111113] bg-[#1c1c20] text-xl font-semibold text-white">{profile.avatar_url ? <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" /> : profile.username.slice(0, 2).toUpperCase()}</div><div className="min-w-0 pb-1"><h1 className="truncate text-2xl font-medium">{profile.display_name || profile.username}</h1><p className="truncate text-sm text-[#93939f]">@{profile.username}</p></div></div><Link to={`/messages?user=${encodeURIComponent(profile.id)}`} className="rounded-[10px] bg-[#ff0000] px-4 py-2.5 text-sm font-medium text-white">Message</Link></div><p className="px-6 pb-5 pt-5 text-sm leading-relaxed text-[#93939f]">{profile.bio || "Larpings member."}</p><div className="flex flex-wrap gap-2 border-t border-[#222226] px-6 py-4">{badges.map((badge) => <span key={badge.id} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${badge.badge_type === "dexter" ? "border-[#ff0000]/60 bg-[#ff0000]/10 text-[#ff5555]" : "border-[#333338] text-[#b7b7c2]"}`}>{badge.badge_type === "dexter" && <img src="/dexter-badge.png" alt="" className="h-5 w-5 rounded-full object-cover" />}{badge.badge_type === "dexter" ? "DEXTER" : badge.badge_type.replaceAll("_", " ")}</span>)}{badges.length === 0 && <span className="text-xs text-[#666]">No badges yet</span>}</div></section><section className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-[12px] border border-[#222226] bg-[#111113] p-4"><p className="mono-label text-[#93939f]">Rep</p><p className="mt-1.5 font-mono text-xl">{profile.rep_count ?? 0}</p></div><div className="rounded-[12px] border border-[#222226] bg-[#111113] p-4"><p className="mono-label text-[#93939f]">Vouch</p><p className="mt-1.5 font-mono text-xl">{profile.vouch_count ?? 0}</p></div></section><ReputationPanel profileId={profile.id} /></main>;
}
