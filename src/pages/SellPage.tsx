import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { OFFER_CATEGORIES, SERVICE_TYPES, serviceGroups, serviceOptions } from "../lib/offerCatalog";

const PLATFORMS = ["Instagram", "TikTok", "Twitter / X", "Snapchat", "Telegram", "YouTube"];

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Username");
  const [platform, setPlatform] = useState("Instagram");
  const [recipient, setRecipient] = useState("");
  const [fansignMessage, setFansignMessage] = useState("");
  const [deliveryFormat, setDeliveryFormat] = useState("Digital image");
  const [serviceType, setServiceType] = useState<string>(SERVICE_TYPES[0]);
  const [serviceGroup, setServiceGroup] = useState<string>(serviceGroups(SERVICE_TYPES[0])[0]);
  const [serviceOption, setServiceOption] = useState<string>(serviceOptions(SERVICE_TYPES[0], serviceGroups(SERVICE_TYPES[0])[0])[0]);
  const [price, setPrice] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/signin?returnTo=/sell");
        return;
      }
    });
  }, [navigate]);

  const fee = price ? (parseFloat(price) * 0.03).toFixed(2) : null;
  const payout = price ? (parseFloat(price) * 0.97).toFixed(2) : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !price) return;
    setLoading(true);
    setError("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/signin?returnTo=/sell");
        return;
      }

      const normalizedCategory = category.toLowerCase();
      const details = normalizedCategory === "fansign"
        ? { recipient: recipient.trim(), message: fansignMessage.trim(), delivery_format: deliveryFormat }
        : normalizedCategory === "service"
          ? { service_type: serviceType, service_group: serviceGroup, service_option: serviceOption, service_name: serviceOption }
          : {};
      const { error: insertError } = await supabase.from('listings').insert({
        seller_id: session.user.id,
        handle: title.trim(),
        description: description.trim(),
        category: category.toLowerCase(),
        platform: platform.toLowerCase().replace(' / x', '').replace('youtube', 'youtube'), // normalize
        price: parseFloat(price),
        status: 'active',
        details,
      });

      if (insertError) throw insertError;

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to create listing.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-zinc-950 text-[#f9f9fb] min-h-screen font-[Poppins,ui-sans-serif,system-ui,sans-serif] flex items-center justify-center px-4">
        <div className="max-w-[480px] w-full text-center">
          <div className="bg-[rgba(255,0,0,0.1)] w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6 text-[#ff0000]">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium tracking-tight">Listing submitted!</h2>
          <p className="text-[#93939f] text-sm mt-2">
            @{title} is now live on the marketplace. You'll be notified when a buyer makes an offer.
          </p>
          <button
            onClick={() => { setTitle(""); setDescription(""); setPrice(""); setSubmitted(false); }}
            className="mt-6 bg-white text-[#0e0e11] text-sm font-medium px-6 py-3 rounded-[10px] shadow-[rgba(255,255,255,0.4)_0px_1px_0px_0px_inset,rgba(0,0,0,0.8)_0px_8px_24px_-12px] hover:-translate-y-px active:translate-y-0 transition-all"
          >
            Create another listing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 text-[#f9f9fb] min-h-screen font-[Poppins,ui-sans-serif,system-ui,sans-serif]">
      <main className="w-full max-w-[672px] mx-auto px-4 pt-8 pb-24">

        {/* Page header */}
        <header className="mb-8">
          <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">
            Sell on larpings@com
          </span>
          <h1 className="mt-3 text-[30px] md:text-[36px] font-medium tracking-tight leading-none">
            List your goods. <span className="text-[#ff0000]">Get paid.</span>
          </h1>
          <p className="mt-2 text-sm text-[#93939f]">
            List usernames, accounts, fansigns, or structured services — buyer-protected checkout, USD earnings.
          </p>
        </header>

        {/* Form card */}
        <form onSubmit={handleSubmit} className="bg-[#111113] rounded-[14px] border border-[#222226] p-5 md:p-6 space-y-4">
          {/* Card header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">New Listing</h2>
            <button
              type="button"
              onClick={() => { setTitle(""); setDescription(""); setPrice(""); }}
              className="text-sm font-medium text-[#93939f] hover:text-white h-9 px-3 rounded-[10px] hover:bg-[#1a1a1d] transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label htmlFor="title" className="text-sm font-medium">Title *</label>
            <input
              id="title"
              type="text"
              placeholder={category === "Fansign" ? "e.g. Custom birthday fansign" : category === "Service" ? "e.g. Instagram growth package" : "e.g. coolname"}
              maxLength={60}
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="flex h-10 w-full rounded-[8px] border border-[#222226] bg-[#0e0e11] px-3 py-2 text-sm text-[#f9f9fb] placeholder-[#555] focus:outline-none focus:border-[#ff0000] transition-colors"
            />
            <p className="text-[10px] text-[#93939f]">{category === "Username" || category === "Account" ? "Don't include @ — it will be added automatically" : "Use a clear title buyers can understand"}</p>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <textarea
              id="description"
              placeholder="Details about this listing..."
              maxLength={500}
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="flex min-h-[80px] w-full rounded-[8px] border border-[#222226] bg-[#0e0e11] px-3 py-2 text-sm text-[#f9f9fb] placeholder-[#555] focus:outline-none focus:border-[#ff0000] transition-colors resize-none"
            />
          </div>

          {/* Category + Platform */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <div className="relative">
                <select
                  id="category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="appearance-none h-10 w-full rounded-[8px] border border-[#222226] bg-[#0e0e11] px-3 pr-8 text-sm text-[#f9f9fb] focus:outline-none focus:border-[#ff0000] transition-colors cursor-pointer"
                >
                  {OFFER_CATEGORIES.map(c => <option key={c.id} value={c.label}>{c.label}</option>)}
                </select>
                <svg className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#93939f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="platform" className="text-sm font-medium">Platform</label>
              <div className="relative">
                <select
                  id="platform"
                  value={platform}
                  onChange={e => setPlatform(e.target.value)}
                  className="appearance-none h-10 w-full rounded-[8px] border border-[#222226] bg-[#0e0e11] px-3 pr-8 text-sm text-[#f9f9fb] focus:outline-none focus:border-[#ff0000] transition-colors cursor-pointer"
                >
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <svg className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#93939f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {category === "Fansign" && (
            <div className="space-y-4 rounded-[12px] border border-[#222226] bg-[#0e0e11] p-4">
              <p className="mono-label text-[#93939f]">Fansign details</p>
              <label className="block text-sm">Recipient username *<input value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="@buyer or recipient" required className="mt-2 w-full rounded-[8px] border border-[#222226] bg-[#111113] px-3 py-2.5 text-sm outline-none focus:border-[#ff0000]" /></label>
              <label className="block text-sm">Message / brief *<textarea value={fansignMessage} onChange={e => setFansignMessage(e.target.value)} placeholder="What should the fansign say or include?" required maxLength={500} rows={3} className="mt-2 w-full resize-none rounded-[8px] border border-[#222226] bg-[#111113] px-3 py-2.5 text-sm outline-none focus:border-[#ff0000]" /></label>
              <label className="block text-sm">Delivery format<select value={deliveryFormat} onChange={e => setDeliveryFormat(e.target.value)} className="mt-2 h-10 w-full rounded-[8px] border border-[#222226] bg-[#111113] px-3 text-sm outline-none focus:border-[#ff0000]"><option>Digital image</option><option>Video</option><option>Live stream</option><option>Custom format</option></select></label>
            </div>
          )}

          {category === "Service" && (
            <div className="space-y-4 rounded-[12px] border border-[#222226] bg-[#0e0e11] p-4">
              <p className="mono-label text-[#93939f]">Service details</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-sm">Service type<select value={serviceType} onChange={e => { const next = e.target.value; setServiceType(next); const group = serviceGroups(next as any)[0]; setServiceGroup(group); setServiceOption(serviceOptions(next as any, group)[0]); }} className="mt-2 h-10 w-full rounded-[8px] border border-[#222226] bg-[#111113] px-3 text-sm outline-none focus:border-[#ff0000]">{SERVICE_TYPES.map(t => <option key={t}>{t}</option>)}</select></label>
                <label className="block text-sm">Subcategory<select value={serviceGroup} onChange={e => { const next = e.target.value; setServiceGroup(next); setServiceOption(serviceOptions(serviceType as any, next)[0]); }} className="mt-2 h-10 w-full rounded-[8px] border border-[#222226] bg-[#111113] px-3 text-sm outline-none focus:border-[#ff0000]">{serviceGroups(serviceType as any).map(g => <option key={g}>{g}</option>)}</select></label>
              </div>
              <label className="block text-sm">Offer box<select value={serviceOption} onChange={e => setServiceOption(e.target.value)} className="mt-2 h-10 w-full rounded-[8px] border border-[#222226] bg-[#111113] px-3 text-sm outline-none focus:border-[#ff0000]">{serviceOptions(serviceType as any, serviceGroup).map(option => <option key={option}>{option}</option>)}</select></label>
            </div>
          )}

          {/* Price */}
          <div className="space-y-1.5">
            <label htmlFor="price" className="text-sm font-medium">Price (USD) *</label>
            <input
              id="price"
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
              className="flex h-10 w-full rounded-[8px] border border-[#222226] bg-[#0e0e11] px-3 py-2 text-sm text-[#f9f9fb] placeholder-[#555] focus:outline-none focus:border-[#ff0000] transition-colors"
            />
            <p className="text-[10px] text-[#93939f]">
              Buyers pay in USD at checkout. A 3% platform fee applies on sale.
            </p>
          </div>

          {/* Live payout preview */}
          {price && parseFloat(price) > 0 && (
            <div className="bg-[rgba(255,0,0,0.06)] border border-[rgba(255,0,0,0.15)] rounded-[10px] px-4 py-3 flex justify-between text-sm">
              <span className="text-[#93939f]">Your payout <span className="text-[10px] uppercase tracking-widest font-mono">(after 3% fee)</span></span>
              <span className="font-mono font-semibold">${payout}</span>
            </div>
          )}

          {error && (
            <div className="bg-[rgba(255,0,0,0.1)] text-[#ff0000] p-3 rounded-[8px] text-sm text-center">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-white text-[#0e0e11] font-semibold text-sm py-3.5 rounded-[10px] shadow-[rgba(255,255,255,0.4)_0px_1px_0px_0px_inset,rgba(0,0,0,0.8)_0px_8px_24px_-12px] hover:shadow-[rgba(255,255,255,0.4)_0px_1px_0px_0px_inset,rgba(255,0,0,0.45)_0px_14px_34px_-12px] hover:-translate-y-px active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!title.trim() || !price || loading}
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </form>

        {/* Info cards below form */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { icon: "🔒", title: "Protected checkout", desc: "Buyers pay into escrow. You get paid after delivery is confirmed." },
            { icon: "💸", title: "3% flat fee", desc: "No listing cost. 3% only deducted when your item sells." },
            { icon: "⚡", title: "Fast payouts", desc: "Crypto or bank transfer within 24h of confirmed delivery." },
          ].map(({ icon, title: t, desc }) => (
            <div key={t} className="bg-[#111113] border border-[#222226] rounded-[12px] p-4 flex flex-col gap-2">
              <span className="text-xl">{icon}</span>
              <p className="text-xs font-semibold">{t}</p>
              <p className="text-[11px] text-[#93939f] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
