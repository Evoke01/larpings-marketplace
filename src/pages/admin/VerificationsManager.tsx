import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../../lib/supabase";

interface VerifRecord {
  seller_id: string;
  status: string;
  evidence: string | null;
  requested_at: string;
  reviewed_at: string | null;
  admin_notes: string | null;
  profiles?: { username: string };
  seller_verification_payments?: {
    amount: number;
    currency: string;
    track_id: string;
    status: string;
    payment_url: string;
  };
}

export default function VerificationsManager() {
  const [records, setRecords] = useState<VerifRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<VerifRecord | null>(null);
  const [noteInput, setNoteInput] = useState("");
  const [actionType, setActionType] = useState<"approve" | "refund" | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("seller_verifications")
      .select("*, profiles(username), seller_verification_payments(*)")
      .order("requested_at", { ascending: false });
    setRecords(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const flash = (msg: string) => { setActionMsg(msg); setTimeout(() => setActionMsg(""), 4000); };

  const openAction = (record: VerifRecord, type: "approve" | "refund") => {
    setSelectedRecord(record);
    setActionType(type);
    setNoteInput("");
  };

  const executeAction = async () => {
    if (!selectedRecord || !actionType) return;
    const now = new Date().toISOString();

    if (actionType === "approve") {
      const { data: me } = await supabase.auth.getUser();
      await Promise.all([
        supabase.from("seller_verifications").update({ status: "approved", reviewed_at: now, admin_notes: noteInput || null }).eq("seller_id", selectedRecord.seller_id),
        supabase.from("seller_verification_payments").update({ status: "Paid" }).eq("seller_id", selectedRecord.seller_id),
        supabase.from("badges").insert({ user_id: selectedRecord.seller_id, badge_type: "verified_seller", granted_by: me.user?.id }),
      ]);
      flash(`@${(selectedRecord.profiles as any)?.username} approved and badge granted!`);
    } else {
      await Promise.all([
        supabase.from("seller_verifications").update({ status: "refunded", reviewed_at: now, admin_notes: noteInput || "Refund processed by admin." }).eq("seller_id", selectedRecord.seller_id),
        supabase.from("seller_verification_payments").update({ status: "Refunded" }).eq("seller_id", selectedRecord.seller_id),
      ]);
      flash(`@${(selectedRecord.profiles as any)?.username} refunded.`);
    }
    setSelectedRecord(null);
    setActionType(null);
    load();
  };

  const statusColor = (s: string) => {
    if (s === "approved") return "bg-green-500/15 text-green-400";
    if (s === "refunded") return "bg-blue-500/15 text-blue-400";
    if (s === "pending") return "bg-yellow-500/15 text-yellow-400";
    return "bg-white/[0.05] text-[#93939f]";
  };

  const pending = records.filter(r => r.status === "pending");
  const other = records.filter(r => r.status !== "pending");

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <p className="font-mono text-[11px] tracking-[2px] uppercase text-[#ff0000] mb-1">$49 Verification Queue</p>
        <h1 className="text-2xl font-semibold">Seller Verifications</h1>
        <p className="text-sm text-[#93939f] mt-1">Approve or refund seller verification payment requests.</p>
      </div>

      {actionMsg && (
        <div className="mb-4 rounded-[10px] border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm text-green-400">
          {actionMsg}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-6 h-6 border-2 border-[#ff0000] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {pending.length > 0 && (
            <div className="mb-4">
              <p className="font-mono text-[10px] tracking-widest uppercase text-yellow-400 mb-3 px-1">⚡ Pending ({pending.length})</p>
              <div className="space-y-3">
                {pending.map(r => {
                  const payment = (r as any).seller_verification_payments;
                  const username = (r.profiles as any)?.username ?? "unknown";
                  return (
                    <div key={r.seller_id} className="rounded-[14px] border border-yellow-500/20 bg-yellow-500/5 p-5">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <p className="font-semibold">@{username}</p>
                          <p className="text-xs text-[#93939f] mt-0.5">Requested {new Date(r.requested_at).toLocaleString()}</p>
                          {r.evidence && (
                            <a href={r.evidence} target="_blank" rel="noopener noreferrer" className="inline-block mt-1.5 text-xs text-[#ff0000] hover:underline">
                              View evidence →
                            </a>
                          )}
                        </div>
                        <div className="text-right">
                          {payment && (
                            <>
                              <p className="font-mono font-bold text-lg">${payment.amount} {payment.currency}</p>
                              <p className="text-[10px] text-[#93939f] font-mono">Track: {payment.track_id}</p>
                              <a href={payment.payment_url} target="_blank" rel="noopener noreferrer"
                                className="inline-block mt-1 text-[10px] text-[#ff0000] hover:underline">Payment link →</a>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => openAction(r, "approve")} className="btn-accent !text-xs !py-2 !px-4">✓ Approve & Badge</button>
                        <button onClick={() => openAction(r, "refund")} className="btn-outline-dim !text-xs !py-2 !px-4">↩ Refund</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {pending.length === 0 && (
            <div className="rounded-[14px] border border-white/[0.07] bg-[#0e0e11] p-8 text-center mb-6">
              <p className="text-sm text-[#93939f]">No pending verifications. All clear! ✓</p>
            </div>
          )}

          {other.length > 0 && (
            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase text-[#93939f] mb-3 px-1">History</p>
              <div className="rounded-[14px] border border-white/[0.07] bg-[#0e0e11] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {["Seller", "Amount", "Status", "Admin Notes", "Reviewed"].map(h => (
                        <th key={h} className="px-4 py-3 text-left font-mono text-[10px] tracking-widest uppercase text-[#93939f]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {other.map(r => {
                      const payment = (r as any).seller_verification_payments;
                      return (
                        <tr key={r.seller_id} className="hover:bg-white/[0.02]">
                          <td className="px-4 py-3 font-medium">@{(r.profiles as any)?.username ?? "—"}</td>
                          <td className="px-4 py-3 font-mono text-xs">{payment ? `$${payment.amount}` : "—"}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${statusColor(r.status)}`}>{r.status}</span>
                          </td>
                          <td className="px-4 py-3 text-xs text-[#93939f] max-w-xs truncate">{r.admin_notes ?? "—"}</td>
                          <td className="px-4 py-3 text-xs text-[#93939f]">{r.reviewed_at ? new Date(r.reviewed_at).toLocaleDateString() : "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {selectedRecord && actionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="rounded-[16px] border border-white/[0.1] bg-[#0e0e11] p-6 w-full max-w-sm shadow-2xl">
            <h2 className="text-lg font-semibold mb-1 capitalize">{actionType} Verification</h2>
            <p className="text-sm text-[#93939f] mb-5">
              {actionType === "approve"
                ? `Approve @${(selectedRecord.profiles as any)?.username} and grant verified_seller badge?`
                : `Refund @${(selectedRecord.profiles as any)?.username}'s $49 payment?`
              }
            </p>
            <label className="block text-xs text-[#93939f] mb-1.5 font-mono uppercase tracking-wider">Admin Notes (optional)</label>
            <textarea value={noteInput} onChange={e => setNoteInput(e.target.value)}
              placeholder="Reason or notes..."
              className="w-full px-3 py-2.5 rounded-[10px] border border-white/[0.1] bg-white/[0.04] text-sm text-[#f9f9fb] mb-5 outline-none resize-none h-20" />
            <div className="flex gap-2">
              <button onClick={executeAction}
                className={`flex-1 btn-accent ${actionType === "refund" ? "!bg-blue-600" : ""}`}>
                {actionType === "approve" ? "Approve" : "Refund"}
              </button>
              <button onClick={() => { setSelectedRecord(null); setActionType(null); }} className="btn-outline-dim flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
