import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth";

export default function MMDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [activeDeals, setActiveDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [editingSettings, setEditingSettings] = useState(false);
  const [feePercent, setFeePercent] = useState("");
  const [feeFlat, setFeeFlat] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!user) return navigate("/signin?returnTo=/mm/dashboard");
      
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (!p || !p.is_middleman) {
        return navigate("/"); // Unauthorized
      }
      setProfile(p);
      setFeePercent(p.mm_fee_percent || "0");
      setFeeFlat(p.mm_fee_flat || "0");
      setBio(p.mm_bio || "");
      setIsOnline(p.mm_is_online || false);

      const { data: deals } = await supabase
        .from('orders')
        .select('*, listings(handle, price)')
        .eq('mm_id', user.id)
        .order('created_at', { ascending: false });
      
      setActiveDeals(deals || []);
      setLoading(false);
    }
    loadData();
  }, [user, navigate]);

  const saveSettings = async () => {
    if (!user) return;
    setSaving(true);
    
    const finalPercent = Math.max(0, Number(feePercent));
    const finalFlat = Math.max(0, Number(feeFlat));

    await supabase.from('profiles').update({
      mm_fee_percent: finalPercent,
      mm_fee_flat: finalFlat,
      mm_bio: bio
    }).eq('id', user.id);
    
    setProfile({ ...profile, mm_fee_percent: finalPercent, mm_fee_flat: finalFlat, mm_bio: bio });
    setEditingSettings(false);
    setSaving(false);
  };

  const toggleOnlineStatus = async () => {
    if (!user) return;
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    await supabase.from('profiles').update({ mm_is_online: newStatus }).eq('id', user.id);
  };

  if (loading) return <div className="pt-24 min-h-[60vh] flex items-center justify-center"><div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" /></div>;

  const totalDeals = activeDeals.filter(d => d.status === 'closed').length;
  const ongoingDeals = activeDeals.filter(d => d.status !== 'closed' && d.status !== 'cancelled');

  return (
    <div className="pt-24 pb-12 px-4 max-w-6xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 mkt-enter">
        <div>
          <span className="mono-label text-muted-foreground">Admin tools</span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">Middleman Dashboard</h1>
          <p className="text-muted-foreground mt-2 max-w-lg">Manage your escrow deals, update your rates, and toggle your availability.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleOnlineStatus}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${isOnline ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-background border-border text-muted-foreground'}`}
          >
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-muted-foreground'}`} />
            {isOnline ? 'Accepting deals' : 'Currently offline'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr] mkt-enter" style={{ animationDelay: '100ms' }}>
        <div className="space-y-6">
          {/* Stats & Settings */}
          <div className="card-lined rounded-xl p-6 bg-section-background">
            <h2 className="mono-label mb-5 text-muted-foreground">Your Rates</h2>
            {editingSettings ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Fee Percentage (%)</label>
                  <input type="number" min="0" step="0.1" value={feePercent} onChange={e => setFeePercent(e.target.value)} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Flat Fee ($)</label>
                  <input type="number" min="0" value={feeFlat} onChange={e => setFeeFlat(e.target.value)} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Short Bio</label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm h-24 focus:border-accent outline-none resize-none" placeholder="Experience, timezone, typical hours..." />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={saveSettings} disabled={saving} className="flex-1 btn-white py-2 rounded-lg text-sm">{saving ? 'Saving...' : 'Save'}</button>
                  <button onClick={() => setEditingSettings(false)} className="flex-1 btn-outline-dim py-2 rounded-lg text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Percentage:</span>
                  <span className="text-base font-semibold">{profile.mm_fee_percent}%</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Flat Rate:</span>
                  <span className="text-base font-semibold">${profile.mm_fee_flat}</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground block mb-2">Bio</span>
                  <p className="text-sm text-foreground/80 leading-relaxed bg-background/50 p-3 rounded-lg border border-border/50 min-h-[60px]">
                    {profile.mm_bio || 'No bio set.'}
                  </p>
                </div>
                <button onClick={() => setEditingSettings(true)} className="w-full btn-outline-dim py-2.5 rounded-lg text-sm mt-2">Edit Settings</button>
              </div>
            )}
          </div>

          <div className="card-lined rounded-xl p-6 bg-section-background">
            <h2 className="mono-label mb-5 text-muted-foreground">Performance</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background rounded-lg border border-border p-4 text-center">
                <p className="text-3xl font-bold text-foreground">{totalDeals}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Closed Deals</p>
              </div>
              <div className="bg-background rounded-lg border border-border p-4 text-center">
                <p className="text-3xl font-bold text-accent">{ongoingDeals.length}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Active</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Deal Ledger</h2>
          {activeDeals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-border border-dashed rounded-xl bg-section-background/50">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22V12"></path><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path><path d="m7.5 4.27 9 5.15"></path></svg>
              </div>
              <p className="text-foreground font-medium">No assigned deals yet</p>
              <p className="text-sm text-muted-foreground mt-1">When buyers select you, deals will appear here.</p>
            </div>
          ) : (
            <div className="bg-section-background border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-background/80 border-b border-border text-muted-foreground uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Listing</th>
                      <th className="px-5 py-4 font-semibold">Status</th>
                      <th className="px-5 py-4 font-semibold">Date</th>
                      <th className="px-5 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {activeDeals.map(d => (
                      <tr key={d.id} className="hover:bg-background/50 transition-colors">
                        <td className="px-5 py-4 font-mono font-medium">@{d.listings?.handle || 'unknown'}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-widest ${
                            d.status === 'closed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            d.status === 'disputed' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            'bg-accent/10 text-accent border border-accent/20'
                          }`}>
                            {d.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-muted-foreground">{new Date(d.created_at).toLocaleDateString()}</td>
                        <td className="px-5 py-4 text-right">
                          <Link to={`/messages?order=${d.id}`} className="btn-white px-4 py-1.5 rounded-lg text-xs">
                            View Room
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
