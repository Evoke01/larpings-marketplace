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

  useEffect(() => {
    async function loadData() {
      if (!user) return navigate("/login");
      
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (!p || !p.is_middleman) {
        return navigate("/"); // Unauthorized
      }
      setProfile(p);
      setFeePercent(p.mm_fee_percent || "0");
      setFeeFlat(p.mm_fee_flat || "0");
      setBio(p.mm_bio || "");

      const { data: deals } = await supabase
        .from('orders')
        .select('*, listings(handle, price)')
        .eq('mm_id', user.id)
        .order('created_at', { ascending: false });
      
      setActiveDeals(deals || []);
      setLoading(false);
    }
    loadData();
  }, [user]);

  const saveSettings = async () => {
    if (!user) return;
    setSaving(true);
    await supabase.from('profiles').update({
      mm_fee_percent: Number(feePercent),
      mm_fee_flat: Number(feeFlat),
      mm_bio: bio
    }).eq('id', user.id);
    
    setProfile({ ...profile, mm_fee_percent: Number(feePercent), mm_fee_flat: Number(feeFlat), mm_bio: bio });
    setEditingSettings(false);
    setSaving(false);
  };

  if (loading) return <div className="pt-24 text-center">Loading...</div>;

  const totalDeals = activeDeals.filter(d => d.status === 'closed').length;
  const ongoingDeals = activeDeals.filter(d => d.status !== 'closed' && d.status !== 'cancelled');

  return (
    <div className="pt-24 pb-12 px-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Middleman Dashboard</h1>
          <p className="text-[#93939f] mt-2">Manage your escrow deals and fees.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-6">
          {/* Stats & Settings */}
          <div className="bg-[#111113] border border-[#222226] rounded-xl p-5">
            <h2 className="text-sm font-semibold mb-4 uppercase tracking-widest text-[#93939f]">Your Rates</h2>
            {editingSettings ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[#93939f]">Fee Percentage (%)</label>
                  <input type="number" step="0.1" value={feePercent} onChange={e => setFeePercent(e.target.value)} className="w-full mt-1 bg-[#09090b] border border-[#222226] rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-[#93939f]">Flat Fee ($)</label>
                  <input type="number" value={feeFlat} onChange={e => setFeeFlat(e.target.value)} className="w-full mt-1 bg-[#09090b] border border-[#222226] rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-[#93939f]">Short Bio</label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} className="w-full mt-1 bg-[#09090b] border border-[#222226] rounded-lg px-3 py-2 text-sm h-20" />
                </div>
                <div className="flex gap-2">
                  <button onClick={saveSettings} disabled={saving} className="flex-1 bg-white text-black py-2 rounded-lg text-sm font-medium">{saving ? 'Saving...' : 'Save'}</button>
                  <button onClick={() => setEditingSettings(false)} className="flex-1 border border-[#222226] py-2 rounded-lg text-sm font-medium">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-[#93939f]">Percentage:</span>
                  <span className="text-sm font-medium">{profile.mm_fee_percent}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#93939f]">Flat Rate:</span>
                  <span className="text-sm font-medium">${profile.mm_fee_flat}</span>
                </div>
                <div>
                  <span className="text-xs text-[#93939f] block mb-1">Bio:</span>
                  <p className="text-xs text-white/80">{profile.mm_bio || 'No bio set.'}</p>
                </div>
                <button onClick={() => setEditingSettings(true)} className="w-full mt-2 border border-[#222226] py-2 rounded-lg text-xs font-medium hover:bg-white/5 transition-colors">Edit Settings</button>
              </div>
            )}
          </div>

          <div className="bg-[#111113] border border-[#222226] rounded-xl p-5">
            <h2 className="text-sm font-semibold mb-4 uppercase tracking-widest text-[#93939f]">Stats</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#93939f]">Closed Deals:</span>
                <span className="text-sm font-medium">{totalDeals}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#93939f]">Ongoing:</span>
                <span className="text-sm font-medium">{ongoingDeals.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Deal Ledger</h2>
          {activeDeals.length === 0 ? (
            <div className="text-center py-12 text-[#93939f] border border-[#222226] rounded-xl bg-[#111113]">
              You have no assigned deals yet.
            </div>
          ) : (
            <div className="bg-[#111113] border border-[#222226] rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#09090b] border-b border-[#222226] text-[#93939f] uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Handle</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222226]">
                  {activeDeals.map(d => (
                    <tr key={d.id} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-4 font-mono font-medium">@{d.listings?.handle}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2 py-1 rounded text-[10px] uppercase font-bold tracking-widest ${
                          d.status === 'closed' ? 'bg-emerald-500/10 text-emerald-400' :
                          d.status === 'disputed' ? 'bg-red-500/10 text-red-400' :
                          'bg-amber-500/10 text-amber-400'
                        }`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[#93939f]">{new Date(d.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-4 text-right">
                        <Link to={`/messages?order=${d.id}`} className="text-xs bg-white text-black px-3 py-1.5 rounded-md font-medium hover:bg-gray-200">
                          View Room
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
