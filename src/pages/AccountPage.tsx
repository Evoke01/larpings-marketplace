import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";

type Profile = { id: string; username: string; display_name: string | null; bio: string | null; avatar_url: string | null; banner_url: string | null; website_url: string | null; twitter_url: string | null; instagram_url: string | null; discord_url: string | null; rep_count: number | null; vouch_count: number | null; created_at: string };
type FormState = { username: string; display_name: string; bio: string; avatar_url: string; banner_url: string; website_url: string; twitter_url: string; instagram_url: string; discord_url: string };
type WalletsState = { evm_address: string; btc_address: string; sol_address: string; ltc_address: string; ton_address: string; trx_address: string };

const emptyForm: FormState = { username: "", display_name: "", bio: "", avatar_url: "", banner_url: "", website_url: "", twitter_url: "", instagram_url: "", discord_url: "" };
const emptyWallets: WalletsState = { evm_address: "", btc_address: "", sol_address: "", ltc_address: "", ton_address: "", trx_address: "" };

const formatDate = (value: string) => new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value));

export default function AccountPage() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [wallets, setWallets] = useState<WalletsState>(emptyWallets);
  const [listingCount, setListingCount] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "rejected" | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { if (!user) return; (async () => {
    const [p, l, v, w] = await Promise.all([
      supabase.from("profiles").select("id, username, display_name, bio, avatar_url, banner_url, website_url, twitter_url, instagram_url, discord_url, rep_count, vouch_count, created_at").eq("id", user.id).maybeSingle(),
      supabase.from("listings").select("id", { count: "exact", head: true }).eq("seller_id", user.id).eq("status", "active"),
      supabase.from("seller_verifications").select("status").eq("seller_id", user.id).maybeSingle(),
      supabase.from("seller_wallets").select("*").eq("seller_id", user.id).maybeSingle(),
    ]);
    if (p.error) setError("We couldn’t load your profile details.");
    if (p.data) { setProfile(p.data); setForm({ username: p.data.username ?? "", display_name: p.data.display_name ?? "", bio: p.data.bio ?? "", avatar_url: p.data.avatar_url ?? "", banner_url: p.data.banner_url ?? "", website_url: p.data.website_url ?? "", twitter_url: p.data.twitter_url ?? "", instagram_url: p.data.instagram_url ?? "", discord_url: p.data.discord_url ?? "" }); }
    if (w.data) { setWallets({ evm_address: w.data.evm_address ?? "", btc_address: w.data.btc_address ?? "", sol_address: w.data.sol_address ?? "", ltc_address: w.data.ltc_address ?? "", ton_address: w.data.ton_address ?? "", trx_address: w.data.trx_address ?? "" }); }
    setListingCount(l.count ?? 0); setVerificationStatus(v.data?.status ?? null); setLoading(false);
  })(); }, [user]);

  const requestVerification = async () => {
    if (!user || verificationStatus === "pending" || verificationStatus === "verified") return;
    setError(null); setMessage(null);
    const { data, error: requestError } = await supabase.functions.invoke("create-verification-invoice", { body: {} });
    if (requestError || data?.error || !data?.payment_url) setError(data?.error || "Couldn’t start verification checkout. Please try again.");
    else window.location.href = data.payment_url;
  };

  const update = (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const updateWallet = (key: keyof WalletsState) => (e: ChangeEvent<HTMLInputElement>) => setWallets((w) => ({ ...w, [key]: e.target.value }));
  
  const upload = async (kind: "avatar" | "banner", e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file || !user) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) { setError("Please choose an image smaller than 5 MB."); return; }
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"; const path = `${user.id}/${kind}-${Date.now()}.${ext}`;
    const result = await supabase.storage.from("profile-media").upload(path, file, { upsert: true, contentType: file.type });
    if (result.error) { setError("Image upload failed. Please try again."); return; }
    const { data } = supabase.storage.from("profile-media").getPublicUrl(path); setForm((f) => ({ ...f, [`${kind}_url`]: data.publicUrl })); setMessage(`${kind === "avatar" ? "Avatar" : "Banner"} uploaded. Save changes to publish it.`);
  };
  
  const save = async (e: FormEvent) => { 
    e.preventDefault(); if (!user) return; setSaving(true); setError(null); setMessage(null);
    const username = form.username.trim().toLowerCase().replace(/^@+/, "");
    if (!/^[a-z0-9._-]{3,30}$/.test(username)) { setError("Username must be 3–30 characters using letters, numbers, dots, underscores, or hyphens."); setSaving(false); return; }
    
    const { data, error: saveError } = await supabase.from("profiles").update({ ...form, username, display_name: form.display_name.trim() || null, bio: form.bio.trim() || null }).eq("id", user.id).select("id, username, display_name, bio, avatar_url, banner_url, website_url, twitter_url, instagram_url, discord_url, rep_count, vouch_count, created_at").single();
    if (saveError) {
      setError(saveError.code === "23505" ? "That username is already taken." : "Couldn’t save your profile.");
      setSaving(false); return;
    } 
    
    const { error: walletError } = await supabase.from("seller_wallets").upsert({
      seller_id: user.id,
      evm_address: wallets.evm_address.trim() || null,
      btc_address: wallets.btc_address.trim() || null,
      sol_address: wallets.sol_address.trim() || null,
      ltc_address: wallets.ltc_address.trim() || null,
      ton_address: wallets.ton_address.trim() || null,
      trx_address: wallets.trx_address.trim() || null,
      updated_at: new Date().toISOString()
    });
    if (walletError) {
      setError("Couldn't save your wallet addresses.");
      setSaving(false); return;
    }

    setProfile(data); setForm((f) => ({ ...f, username: data.username })); setMessage("Profile and wallets saved successfully.");
    setSaving(false);
  };

  if (loading) return <div className="min-h-[70vh] flex items-center justify-center"><div className="w-7 h-7 border-2 border-[#ff0000] border-t-transparent rounded-full animate-spin" /></div>;
  if (error && !profile) return <div className="min-h-[70vh] flex items-center justify-center text-[#93939f]">{error}</div>;
  
  const username = profile?.username || user?.email?.split("@")[0] || "member";
  const fields = [["website_url", "Website URL"], ["twitter_url", "X / Twitter URL"], ["instagram_url", "Instagram URL"], ["discord_url", "Discord handle"]] as const;
  
  return (
    <main className="mx-auto max-w-6xl px-4 pb-32 pt-8">
      <header className="mb-8"><span className="mono-label text-[#93939f]">Your account</span><h1 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">Profile & account</h1><p className="mt-2 max-w-xl text-sm text-[#93939f]">Customize how buyers see you on larpings.com.</p></header>
      <div className="grid gap-6 lg:grid-cols-12">
        <section id="customize" className="lg:col-span-8 space-y-6">
          <form onSubmit={save} className="rounded-[14px] border border-[#222226] bg-[#111113] p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-4 border-b border-[#222226] pb-6">
              <div className="flex h-16 w-16 overflow-hidden items-center justify-center rounded-full bg-[#ff0000]/10 text-xl font-semibold text-[#ff0000]">
                {form.avatar_url ? <img src={form.avatar_url} alt="" className="h-full w-full object-cover" /> : username.slice(0, 2).toUpperCase()}
              </div>
              <div><p className="text-xl font-medium">@{username}</p><p className="mt-1 text-sm text-[#93939f]">{user?.email}</p></div>
            </div>
            
            {error && <p className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
            {message && <p className="mt-5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">{message}</p>}
            
            <div className="grid gap-4 pt-6 sm:grid-cols-2">
              <label className="text-sm">Username<input value={form.username} onChange={update("username")} className="mt-2 w-full rounded-lg border border-[#222226] bg-[#09090b] px-3 py-3 text-sm outline-none focus:border-[#ff0000]" /></label>
              <label className="text-sm">Display name<input value={form.display_name} onChange={update("display_name")} placeholder="Your public name" className="mt-2 w-full rounded-lg border border-[#222226] bg-[#09090b] px-3 py-3 text-sm outline-none focus:border-[#ff0000]" /></label>
            </div>
            <label className="mt-4 block text-sm">Bio<textarea value={form.bio} onChange={update("bio")} maxLength={280} rows={4} placeholder="Tell buyers a little about yourself" className="mt-2 w-full resize-none rounded-lg border border-[#222226] bg-[#09090b] px-3 py-3 text-sm outline-none focus:border-[#ff0000]" /></label>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm">Avatar<input type="file" accept="image/*" onChange={(e) => void upload("avatar", e)} className="mt-2 block w-full text-xs text-[#93939f]" /></label>
              <label className="text-sm">Banner<input type="file" accept="image/*" onChange={(e) => void upload("banner", e)} className="mt-2 block w-full text-xs text-[#93939f]" /></label>
            </div>
            <div className="grid gap-4 pt-5 sm:grid-cols-2">
              {fields.map(([key, label]) => <label key={key} className="text-sm">{label}<input value={form[key as keyof FormState]} onChange={update(key as keyof FormState)} placeholder={label.includes("URL") ? "https://" : "@username"} className="mt-2 w-full rounded-lg border border-[#222226] bg-[#09090b] px-3 py-3 text-sm outline-none focus:border-[#ff0000]" /></label>)}
            </div>
            
            <div className="mt-8 mb-4 border-t border-[#222226] pt-6">
              <h3 className="text-lg font-medium">Payout Wallets</h3>
              <p className="text-sm text-[#93939f] mb-4 mt-1">Add your wallet addresses here to receive funds when escrow deals close.</p>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm">EVM Address (ETH, BNB, USDC)<input value={wallets.evm_address} onChange={updateWallet("evm_address")} placeholder="0x..." className="mt-2 w-full rounded-lg border border-[#222226] bg-[#09090b] px-3 py-3 text-sm outline-none focus:border-[#ff0000] font-mono" /></label>
                <label className="text-sm">Bitcoin Address (BTC)<input value={wallets.btc_address} onChange={updateWallet("btc_address")} placeholder="bc1q..." className="mt-2 w-full rounded-lg border border-[#222226] bg-[#09090b] px-3 py-3 text-sm outline-none focus:border-[#ff0000] font-mono" /></label>
                <label className="text-sm">Solana Address (SOL)<input value={wallets.sol_address} onChange={updateWallet("sol_address")} placeholder="HN7c..." className="mt-2 w-full rounded-lg border border-[#222226] bg-[#09090b] px-3 py-3 text-sm outline-none focus:border-[#ff0000] font-mono" /></label>
                <label className="text-sm">Litecoin Address (LTC)<input value={wallets.ltc_address} onChange={updateWallet("ltc_address")} placeholder="ltc1q..." className="mt-2 w-full rounded-lg border border-[#222226] bg-[#09090b] px-3 py-3 text-sm outline-none focus:border-[#ff0000] font-mono" /></label>
                <label className="text-sm">Toncoin Address (TON)<input value={wallets.ton_address} onChange={updateWallet("ton_address")} placeholder="EQBv..." className="mt-2 w-full rounded-lg border border-[#222226] bg-[#09090b] px-3 py-3 text-sm outline-none focus:border-[#ff0000] font-mono" /></label>
                <label className="text-sm">Tron Address (TRX)<input value={wallets.trx_address} onChange={updateWallet("trx_address")} placeholder="T9yD..." className="mt-2 w-full rounded-lg border border-[#222226] bg-[#09090b] px-3 py-3 text-sm outline-none focus:border-[#ff0000] font-mono" /></label>
              </div>
            </div>

            <button disabled={saving} className="mt-6 rounded-[10px] bg-[#ff0000] px-5 py-3 text-sm font-medium text-white disabled:opacity-60">{saving ? "Saving…" : "Save profile & wallets"}</button>
          </form>
          <div className="grid gap-3 sm:grid-cols-3">
            {[["Rep", profile?.rep_count ?? 0], ["Vouches", profile?.vouch_count ?? 0], ["Active listings", listingCount]].map(([label, value]) => <div key={label} className="rounded-[12px] border border-[#222226] bg-[#111113] p-4"><p className="mono-label text-[#93939f]">{label}</p><p className="mt-2 font-mono text-2xl">{value}</p></div>)}
          </div>
        </section>
        
        <aside className="space-y-6 lg:col-span-4">
          <div className="rounded-[14px] border border-[#222226] bg-[#111113] p-5">
            <p className="mono-label text-[#93939f]">Account actions</p>
            <Link to={`/${encodeURIComponent(username)}`} className="mt-4 block rounded-lg border border-[#222226] p-3 text-sm hover:border-[#ff0000]/50">View storefront →</Link>
            <Link to="/messages" className="mt-2 block rounded-lg border border-[#222226] p-3 text-sm hover:border-[#ff0000]/50">Messages →</Link>
            <Link to="/dashboard" className="mt-2 block rounded-lg border border-[#222226] p-3 text-sm hover:border-[#ff0000]/50">Seller dashboard →</Link>
          </div>
          
          <div className="rounded-[14px] border border-[#222226] bg-[#111113] p-5">
            <p className="mono-label text-[#93939f]">Seller verification</p>
            {verificationStatus === "verified" ? <p className="mt-3 flex items-center gap-2 text-sm text-[#5f9bff]">✓ Larpings Verified</p> : verificationStatus === "pending" ? <p className="mt-3 text-sm text-[#b7b7c2]">Request pending review.</p> : <><p className="mt-3 text-sm leading-relaxed text-[#93939f]">Request a blue Larpings Verified tick for your seller account. Approval requires manual ownership review.</p><button onClick={() => void requestVerification()} className="mt-4 rounded-[10px] bg-[#ff0000] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#cc0000]">Request verification</button></>}
          </div>
          
          <div className="rounded-[14px] border border-[#222226] bg-[#111113] p-5">
            <p className="mono-label text-[#93939f]">Member since</p>
            <p className="mt-3 text-sm">{profile?.created_at ? formatDate(profile.created_at) : "—"}</p>
          </div>
          
          <button onClick={() => void signOut()} className="w-full rounded-[10px] border border-[#222226] px-4 py-3 text-sm text-[#93939f] hover:border-red-500/50 hover:text-red-300">Sign out</button>
        </aside>
      </div>
    </main>
  );
}
