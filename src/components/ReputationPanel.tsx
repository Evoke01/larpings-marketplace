import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { supabase } from "../lib/supabase";

type ReputationItem = { id: string; giver_id: string; note: string; created_at: string; author?: { username: string; display_name: string | null } };

const formatDate = (value: string) => new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));

export default function ReputationPanel({ profileId, profileHandle, compact = false }: { profileId: string; profileHandle?: string; compact?: boolean }) {
  const { user } = useAuth();
  const [repCount, setRepCount] = useState(0);
  const [vouchCount, setVouchCount] = useState(0);
  const [reps, setReps] = useState<ReputationItem[]>([]);
  const [repAvailable, setRepAvailable] = useState(false);
  const [repNextAt, setRepNextAt] = useState<string | null>(null);
  const [vouchAvailable, setVouchAvailable] = useState(false);
  const [note, setNote] = useState("");
  const [showRepForm, setShowRepForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [reportingId, setReportingId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState("");

  async function load() {
    const [{ data: profile }, { data: repRows }, { count: vouches }, stateResult] = await Promise.all([
      supabase.from("profiles").select("rep_count, vouch_count").eq("id", profileId).maybeSingle(),
      supabase.from("profile_reps").select("id, giver_id, note, created_at").eq("target_id", profileId).order("created_at", { ascending: false }).limit(compact ? 3 : 20),
      supabase.from("profile_vouches").select("id", { count: "exact", head: true }).eq("target_id", profileId),
      user && user.id !== profileId ? supabase.rpc("get_profile_reputation_state", { p_target_id: profileId }).maybeSingle() : Promise.resolve({ data: null }),
    ]);

    setRepCount(profile?.rep_count ?? repRows?.length ?? 0);
    setVouchCount(profile?.vouch_count ?? vouches ?? 0);
    const giverIds = [...new Set((repRows ?? []).map((row) => row.giver_id))];
    const { data: authors } = giverIds.length ? await supabase.from("profiles").select("id, username, display_name").in("id", giverIds) : { data: [] };
    const authorMap = new Map((authors ?? []).map((author) => [author.id, author]));
    setReps((repRows ?? []).map((row) => ({ ...row, author: authorMap.get(row.giver_id) })));
    const state = stateResult.data as { rep_available?: boolean; rep_next_eligible_at?: string | null; vouch_available?: boolean } | null;
    setRepAvailable(Boolean(state?.rep_available));
    setRepNextAt(state?.rep_next_eligible_at ?? null);
    setVouchAvailable(Boolean(state?.vouch_available));
  }

  useEffect(() => { load(); }, [profileId, compact, user?.id]);

  const submitRep = async () => {
    setError(null); setMessage(null);
    if (note.trim().length < 5 || note.trim().length > 20) { setError("Rep note must be between 5 and 20 characters."); return; }
    setBusy(true);
    const { error: rpcError } = await supabase.rpc("submit_profile_rep", { p_target_id: profileId, p_note: note.trim() });
    if (rpcError) setError(rpcError.message); else { setNote(""); setShowRepForm(false); setMessage("Rep added."); await load(); }
    setBusy(false);
  };

  const submitVouch = async () => {
    setError(null); setMessage(null); setBusy(true);
    const { error: rpcError } = await supabase.rpc("submit_profile_vouch", { p_target_id: profileId });
    if (rpcError) setError(rpcError.message); else { setMessage("Vouch added."); await load(); }
    setBusy(false);
  };

  const submitReport = async (repId: string) => {
    if (reportReason.trim().length < 10) { setError("Report details must be at least 10 characters."); return; }
    setBusy(true); setError(null);
    const { error: reportError } = await supabase.from("profile_rep_reports").insert({ rep_id: repId, reporter_id: user?.id, reason: reportReason.trim() });
    if (reportError) setError(reportError.code === "23505" ? "You already reported this Rep." : reportError.message);
    else { setMessage("Report sent to moderators."); setReportingId(null); setReportReason(""); }
    setBusy(false);
  };

  const ownProfile = user?.id === profileId;
  const signInLink = `/signin?returnTo=${encodeURIComponent(window.location.pathname)}`;

  return <section aria-labelledby="reputation-title" className={`rounded-[14px] border border-[#222226] bg-[#111113] ${compact ? "mt-4 p-4" : "mt-12 p-6 md:p-8"}`}>
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div><p className="text-[#ff0000] font-mono text-[11px] tracking-[1.76px] uppercase">REPUTATION</p><h2 id="reputation-title" className="mt-2 text-2xl font-medium">Rep &amp; Vouch</h2><p className="mt-2 text-sm leading-relaxed text-[#93939f]">Community trust signals from real people and completed orders.</p></div>
      <div className="flex gap-2 text-center"><div className="min-w-[76px] rounded-[10px] border border-[#222226] bg-[#0b0b0d] px-3 py-2"><p className="font-mono text-xl text-white">{repCount}</p><p className="text-[10px] uppercase tracking-wider text-[#93939f]">Rep</p></div><div className="min-w-[76px] rounded-[10px] border border-[#222226] bg-[#0b0b0d] px-3 py-2"><p className="font-mono text-xl text-white">{vouchCount}</p><p className="text-[10px] uppercase tracking-wider text-[#93939f]">Vouch</p></div></div>
    </div>

    {!ownProfile && <div className={`${compact ? "mt-3" : "mt-6"} flex flex-wrap gap-2`}>
      {!user ? <Link to={signInLink} className="rounded-[9px] border border-[#333338] px-4 py-2 text-xs font-medium text-[#b7b7c2] hover:border-[#ff0000] hover:text-white">Sign in to Rep or Vouch</Link> : <>
        <button type="button" disabled={!repAvailable || busy} onClick={() => { setShowRepForm((open) => !open); setError(null); }} className="rounded-[9px] bg-[#ff0000] px-4 py-2 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-40">{repAvailable ? (compact ? "Rep" : "Rep this profile") : "Rep unavailable"}</button>
        {vouchAvailable && <button type="button" disabled={busy} onClick={submitVouch} className="rounded-[9px] border border-[#333338] px-4 py-2 text-xs font-medium text-[#b7b7c2] hover:border-[#ff0000] hover:text-white disabled:cursor-not-allowed disabled:opacity-40">{compact ? "Vouch" : "Vouch after order"}</button>}
      </>}
    </div>}
    {!compact && user && !ownProfile && !repAvailable && repNextAt && <p className="mt-2 text-xs text-[#93939f]">You can Rep this profile again {formatDate(repNextAt)}.</p>}
    {!compact && user && !ownProfile && !vouchAvailable && <p className="mt-2 text-xs text-[#93939f]">Vouch unlocks after a confirmed order with this profile, and can only be used once.</p>}

    {showRepForm && <div className="mt-4 rounded-[10px] border border-[#333338] bg-[#0b0b0d] p-4"><label htmlFor="rep-note" className="text-xs font-medium text-white">Why do you Rep this profile?</label><textarea id="rep-note" value={note} onChange={(event) => setNote(event.target.value)} maxLength={20} rows={3} placeholder="Share a specific, honest experience (5–20 characters)" className="mt-2 w-full resize-y rounded-[8px] border border-[#333338] bg-[#111113] px-3 py-2 text-sm text-white outline-none placeholder:text-[#666670] focus:border-[#ff0000]" /><div className="mt-2 flex items-center justify-between"><span className="text-[10px] text-[#93939f]">{note.trim().length}/20</span><button type="button" disabled={busy} onClick={submitRep} className="rounded-[8px] bg-[#ff0000] px-4 py-2 text-xs font-medium text-white disabled:opacity-50">{busy ? "Saving…" : "Submit Rep"}</button></div></div>}
    {message && <p className="mt-3 text-xs text-emerald-400">{message}</p>}
    {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

    {!compact && <div className="mt-6 border-t border-[#222226] pt-5"><div className="flex items-center justify-between"><p className="text-xs font-medium text-[#b7b7c2]">Recent Rep notes</p><span className="text-[10px] text-[#666670]">{repCount} total</span></div>{reps.length === 0 ? <p className="mt-4 text-sm text-[#666670]">No Rep notes yet.</p> : <div className="mt-3 space-y-3">{reps.map((rep) => <article key={rep.id} className="rounded-[10px] border border-[#222226] bg-[#0b0b0d] p-3"><div className="flex items-start justify-between gap-3"><p className="text-xs font-medium text-white">@{rep.author?.username ?? "member"}</p><time className="text-[10px] text-[#666670]">{formatDate(rep.created_at)}</time></div><p className="mt-2 text-sm leading-relaxed text-[#b7b7c2]">{rep.note}</p>{user && <div className="mt-2 text-right"><button type="button" onClick={() => setReportingId(reportingId === rep.id ? null : rep.id)} className="text-[10px] text-[#666670] hover:text-red-400">Report</button></div>}{reportingId === rep.id && <div className="mt-2 flex gap-2"><input value={reportReason} onChange={(event) => setReportReason(event.target.value)} maxLength={500} placeholder="What is wrong with this note?" className="min-w-0 grow rounded-[7px] border border-[#333338] bg-[#111113] px-2 py-1.5 text-xs text-white outline-none focus:border-[#ff0000]" /><button type="button" disabled={busy} onClick={() => submitReport(rep.id)} className="rounded-[7px] border border-red-500/40 px-2 py-1.5 text-[10px] text-red-300 disabled:opacity-50">Send</button></div>}</article>)}</div>}</div>}
    {compact && <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-[#93939f]"><span>{repCount} Rep</span><span>·</span><span>{vouchCount} Vouch</span>{profileHandle && <Link to={`/${encodeURIComponent(profileHandle)}`} className="ml-auto text-[#b7b7c2] hover:text-white">View reputation →</Link>}</div>}
  </section>;
}
