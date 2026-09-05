import React from "react";
import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { supabase } from "../lib/supabase";

const ShieldIcon = () => <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3 20 6v6c0 5-3.5 7.8-8 9-4.5-1.2-8-4-8-9V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></svg>;
const CheckIcon = () => <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff0000]/15 text-[#ff0000]"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>;

export default function GetVerifiedPage() {
  const { user } = useAuth();
  const [startingPayment, setStartingPayment] = React.useState(false);
  const [paymentError, setPaymentError] = React.useState<string | null>(null);

  const buyVerification = async () => {
    setPaymentError(null);
    if (!user) {
      window.location.href = "/signin?returnTo=/get-verified";
      return;
    }
    setStartingPayment(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-verification-invoice");
      if (error) throw new Error("Payment provider is unavailable");
      if (data?.error) throw new Error(data.error);
      if (!data?.payment_url) throw new Error("No payment link was returned");
      window.location.href = data.payment_url;
    } catch (error: any) {
      setPaymentError(error.message || "Unable to start verification payment");
      setStartingPayment(false);
    }
  };

  return <><Seo title="Get Verified | larpings.com" description="Prove ownership of your listings to build trust with buyers." /><div className="mx-auto w-full max-w-[1152px] px-4 pb-16 pt-12">
    <section className="relative overflow-hidden rounded-[18px] border border-[#222226] bg-[#111113] px-5 py-12 md:px-12"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_70%_at_18%_0%,rgba(255,0,0,.15),transparent_68%)]" /><div className="relative max-w-2xl"><span className="mono-label inline-flex items-center gap-2 rounded-[8px] border border-[#222226] bg-[#0b0b0d] px-3 py-2 text-[#b7b7c2]"><ShieldIcon /> OWNERSHIP CHECK</span><h1 className="mt-6 text-4xl font-semibold tracking-[-1.8px] md:text-[52px]">Sell with the trust<br /><span className="text-[#ff0000]">buyers look for.</span></h1><p className="mt-5 max-w-xl leading-relaxed text-[#93939f]">Prove that you control the username you are listing. Our private bio-code challenge gives buyers a clear ownership signal without asking for your password.</p><Link to="/dashboard" className="mt-8 inline-flex rounded-[10px] bg-[#ff0000] px-5 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]">Verify a listing <span className="ml-2">→</span></Link></div></section>
    <section className="mt-12 grid gap-4 md:grid-cols-3">
      <Feature title="A clear trust signal" text="Verified ownership appears directly on the listing after the challenge is complete." icon={<ShieldIcon />} />
      <Feature title="Your account stays private" text="We never ask for platform credentials. Only a temporary code in your larpings bio is checked." icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>} />
      <Feature title="Works per listing" text="Verify the specific username you control. Keep other listings unverified until you are ready." icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>} />
    </section>
    <section className="mt-12 rounded-[14px] border border-[#ff0000]/30 bg-[#111113] p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8"><div><p className="mono-label text-[#ff0000]">LARPINGS VERIFIED</p><h2 className="mt-2 text-2xl font-medium">Get the blue tick on your seller account.</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#93939f]">Pay a one-time $49 review fee. After payment confirms, our team checks your seller account and adds the blue tick when approved.</p><p className="mt-2 text-xs text-[#b7b7c2]">Secure hosted crypto checkout · One-time payment · Manual approval required</p></div><div className="mt-6 shrink-0 md:mt-0 md:text-right"><div className="text-3xl font-semibold">$49</div><button type="button" onClick={buyVerification} disabled={startingPayment} className="mt-4 inline-flex rounded-[10px] bg-[#ff0000] px-5 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50">{startingPayment ? "Opening checkout…" : "Buy blue tick →"}</button>{paymentError && <p className="mt-3 max-w-[220px] text-xs text-red-400 md:ml-auto">{paymentError}</p>}</div></section>
    <section className="mt-14"><p className="mono-label text-[#ff0000]">HOW IT WORKS</p><h2 className="mt-2 text-2xl font-medium">Three quick steps.</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{[["01", "Generate a code", "Open your dashboard and start verification for the listing."], ["02", "Place it in your bio", "Add the temporary code to the bio of the account you are selling."], ["03", "Confirm ownership", "Paste the code back into larpings. Once checked, the listing gets its verified mark."]].map(([number, title, text]) => <div key={number} className="rounded-[14px] border border-[#222226] bg-[#111113] p-5"><span className="font-mono text-sm text-[#ff0000]">{number}</span><h3 className="mt-5 text-lg font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#93939f]">{text}</p></div>)}</div></section>
    <section className="mt-14 rounded-[14px] border border-[#222226] bg-[#111113] p-6 md:p-8"><div className="flex items-start gap-4"><div className="rounded-[10px] bg-[#ff0000]/10 p-3 text-[#ff0000]"><ShieldIcon /></div><div><p className="mono-label text-[#ff0000]">WHO THIS IS FOR</p><h2 className="mt-2 text-2xl font-medium">Sellers who own what they list.</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#93939f]">Verification is designed for real account owners. Never share your password or recovery details with anyone claiming to verify a listing. Remove the temporary bio code after confirmation.</p><div className="mt-5 grid gap-3 text-sm text-[#b7b7c2] sm:grid-cols-2"><span className="flex items-center gap-2"><CheckIcon /> No password required</span><span className="flex items-center gap-2"><CheckIcon /> Code expires quickly</span><span className="flex items-center gap-2"><CheckIcon /> Public listing signal</span><span className="flex items-center gap-2"><CheckIcon /> Re-checkable ownership</span></div></div></div></section>
    <div className="mt-14 flex flex-col items-center text-center"><p className="mono-label text-[#ff0000]">READY WHEN YOU ARE</p><h2 className="mt-3 text-2xl font-medium">Make your storefront easier to trust.</h2><Link to="/dashboard" className="mt-6 inline-flex rounded-[10px] border border-[#333338] px-5 py-3 text-sm font-medium transition-colors hover:border-[#ff0000] hover:text-[#ff0000]">Open seller dashboard →</Link></div>
  </div></>;
}

function Feature({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) { return <div className="rounded-[14px] border border-[#222226] bg-[#111113] p-5"><div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#ff0000]/10 text-[#ff0000]">{icon}</div><h3 className="mt-5 text-lg font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#93939f]">{text}</p></div>; }
