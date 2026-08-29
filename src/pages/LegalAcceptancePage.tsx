import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { supabase } from "../lib/supabase";
import { PRIVACY_VERSION, TERMS_VERSION } from "../lib/legal";

const LockIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><path d="M12 14v2" /></svg>;

export default function LegalAcceptancePage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [checkingAcceptance, setCheckingAcceptance] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const destination = safeReturnTo(params.get("returnTo"));

  useEffect(() => {
    if (authLoading || !user) { if (!authLoading) setCheckingAcceptance(false); return; }
    let active = true;
    supabase.from("legal_acceptances").select("user_id").eq("user_id", user.id).maybeSingle().then(({ data }) => {
      if (!active) return;
      if (data) { window.localStorage.setItem(`larpings:legal-accepted:${user.id}`, "1"); navigate(destination, { replace: true }); }
      else setCheckingAcceptance(false);
    });
    return () => { active = false; };
  }, [authLoading, destination, navigate, user]);

  if (authLoading || checkingAcceptance) return <div className="min-h-[60vh] flex items-center justify-center"><div className="h-7 w-7 animate-spin rounded-full border-2 border-accent border-t-transparent" /></div>;
  if (!user) { navigate(`/signin?returnTo=${encodeURIComponent(`/legal-acceptance?returnTo=${destination}`)}`, { replace: true }); return null; }

  const accept = async () => {
    if (!termsChecked || !privacyChecked || saving) return;
    setSaving(true); setError(null);
    const { error: insertError } = await supabase.from("legal_acceptances").insert({ user_id: user.id, terms_version: TERMS_VERSION, privacy_version: PRIVACY_VERSION });
    if (insertError && insertError.code !== "23505") {
      setError("We couldn’t save your acceptance. Check your connection and try again."); setSaving(false); return;
    }
    window.localStorage.setItem(`larpings:legal-accepted:${user.id}`, "1");
    navigate(destination, { replace: true });
  };

  return <div className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-[960px] items-center px-4 py-12 md:px-8">
    <section className="hero-frame relative w-full overflow-hidden rounded-[20px] border border-border bg-section-background shadow-2xl shadow-black/30">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative grid gap-8 p-6 md:grid-cols-[.9fr_1.1fr] md:p-10">
        <div className="flex flex-col justify-between">
          <div>
            <span className="mono-label inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-2 text-accent"><LockIcon /> ONE-TIME SETUP</span>
            <p className="mono-label mt-10 text-muted-foreground">WELCOME TO LARPINGS</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-1.5px] text-foreground md:text-5xl">Keep the drop<br /><span className="text-accent">protected.</span></h1>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">Before you buy, sell, message, or manage orders, take a quick look at the rules that keep this marketplace fair and your account safer.</p>
          </div>
          <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent))]" /> Takes less than a minute · saved to your account</div>
        </div>
        <div className="rounded-[16px] border border-border bg-background/70 p-4 backdrop-blur-xl md:p-5">
          <p className="mono-label text-muted-foreground">TWO CHECKS REQUIRED</p>
          <h2 className="mt-2 text-xl font-medium text-foreground">Make it official.</h2>
          <div className="mt-5 space-y-3">
            <ConsentCard checked={termsChecked} onChange={setTermsChecked} number="01" title="Terms of Service" description="How listings, orders, payments, messaging, and moderation work." link="/terms" />
            <ConsentCard checked={privacyChecked} onChange={setPrivacyChecked} number="02" title="Privacy Policy" description="How we handle your account, order, message, and security information." link="/privacy" />
          </div>
          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground"><span>{Number(termsChecked) + Number(privacyChecked)} of 2 accepted</span><span>Version {TERMS_VERSION}</span></div>
          <button type="button" onClick={() => void accept()} disabled={!termsChecked || !privacyChecked || saving} className="btn-accent mt-5 w-full justify-center disabled:cursor-not-allowed disabled:opacity-40">{saving ? "Saving your acceptance…" : "Continue to Larpings →"}</button>
          {error && <p className="mt-3 text-center text-xs text-destructive">{error}</p>}
          <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">You can revisit both documents anytime from the footer.</p>
        </div>
      </div>
    </section>
  </div>;
}

function ConsentCard({ checked, onChange, number, title, description, link }: { checked: boolean; onChange: (value: boolean) => void; number: string; title: string; description: string; link: string }) {
  return <label className={`group flex cursor-pointer gap-3 rounded-[12px] border p-4 transition-all ${checked ? "border-accent/60 bg-accent/10" : "border-border bg-section-background hover:border-accent/40"}`}>
    <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="sr-only" />
    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-bold transition-colors ${checked ? "border-accent bg-accent text-background" : "border-muted-foreground/50 text-transparent group-hover:border-accent"}`} aria-hidden="true">✓</span>
    <span className="min-w-0"><span className="mono-label text-accent">{number}</span><span className="mt-1 block font-medium text-foreground">I agree to the <Link to={link} target="_blank" onClick={(event) => event.stopPropagation()} className="underline decoration-accent/50 underline-offset-4 hover:text-accent">{title}</Link></span><span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{description}</span></span>
  </label>;
}

function safeReturnTo(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/legal-acceptance")) return "/marketplace";
  return value;
}
