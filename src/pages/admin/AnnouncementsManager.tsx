import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../../lib/supabase";

interface Announcement {
  id: string;
  title: string;
  body: string;
  published: boolean;
  created_at: string;
  author_id: string;
}

export default function AnnouncementsManager() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [actionMsg, setActionMsg] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("admin_announcements")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const flash = (msg: string) => { setActionMsg(msg); setTimeout(() => setActionMsg(""), 3000); };

  const resetForm = () => { setTitle(""); setBody(""); setPublished(false); setShowForm(false); };

  const save = async () => {
    if (!title.trim() || !body.trim()) return;
    setSaving(true);
    const { data: me } = await supabase.auth.getUser();
    await supabase.from("admin_announcements").insert({
      title: title.trim(),
      body: body.trim(),
      published,
      author_id: me.user?.id,
    });
    flash("Announcement created!");
    resetForm();
    setSaving(false);
    load();
  };

  const togglePublish = async (item: Announcement) => {
    await supabase.from("admin_announcements").update({ published: !item.published }).eq("id", item.id);
    flash(item.published ? "Unpublished" : "Published!");
    load();
  };

  const deleteItem = async (item: Announcement) => {
    await supabase.from("admin_announcements").delete().eq("id", item.id);
    flash("Deleted.");
    load();
  };

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="font-mono text-[11px] tracking-[2px] uppercase text-[#ff0000] mb-1">Content</p>
          <h1 className="text-2xl font-semibold">Announcements</h1>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-accent !text-sm">+ New Announcement</button>
        )}
      </div>

      {actionMsg && (
        <div className="mb-4 rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10 px-4 py-2.5 text-sm text-[#ff0000]">
          {actionMsg}
        </div>
      )}

      {showForm && (
        <div className="rounded-[16px] border border-[#ff0000]/20 bg-[#ff0000]/5 p-6 mb-6">
          <h2 className="text-base font-semibold mb-4">New Announcement</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-[#93939f] mb-1.5 font-mono uppercase tracking-wider">Title</label>
              <input value={title} onChange={e => setTitle(e.target.value)}
                placeholder="Announcement title..."
                className="w-full px-3 py-2.5 rounded-[10px] border border-white/[0.1] bg-white/[0.04] text-sm text-[#f9f9fb] outline-none focus:border-[#ff0000]/50" />
            </div>
            <div>
              <label className="block text-xs text-[#93939f] mb-1.5 font-mono uppercase tracking-wider">Body</label>
              <textarea value={body} onChange={e => setBody(e.target.value)}
                placeholder="Announcement content..."
                className="w-full px-3 py-2.5 rounded-[10px] border border-white/[0.1] bg-white/[0.04] text-sm text-[#f9f9fb] outline-none resize-none h-28 focus:border-[#ff0000]/50" />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPublished(p => !p)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${published ? "bg-[#ff0000]" : "bg-white/[0.1]"}`}
              >
                <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${published ? "translate-x-4" : "translate-x-0.5"}`} />
              </button>
              <span className="text-sm text-[#93939f]">{published ? "Publish immediately" : "Save as draft"}</span>
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={save} disabled={saving || !title.trim() || !body.trim()} className="btn-accent !text-sm disabled:opacity-50">
                {saving ? "Saving..." : "Create"}
              </button>
              <button onClick={resetForm} className="btn-outline-dim !text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-6 h-6 border-2 border-[#ff0000] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-[14px] border border-white/[0.07] bg-[#0e0e11] p-10 text-center">
          <p className="text-sm text-[#93939f]">No announcements yet. Create one above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className={`rounded-[14px] border p-5 transition-all ${item.published ? "border-white/[0.1] bg-[#0e0e11]" : "border-white/[0.04] bg-white/[0.02] opacity-60"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{item.title}</h3>
                    <span className={`shrink-0 inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${item.published ? "bg-green-500/15 text-green-400" : "bg-white/[0.05] text-[#93939f]"}`}>
                      {item.published ? "live" : "draft"}
                    </span>
                  </div>
                  <p className="text-sm text-[#93939f] line-clamp-2">{item.body}</p>
                  <p className="text-[11px] text-[#93939f]/60 mt-2">{new Date(item.created_at).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => togglePublish(item)}
                    className={`text-xs px-3 py-1.5 rounded-[8px] border transition-colors ${item.published ? "border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10" : "border-green-500/30 text-green-400 hover:bg-green-500/10"}`}>
                    {item.published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => deleteItem(item)}
                    className="text-xs px-3 py-1.5 rounded-[8px] border border-[#ff0000]/30 text-[#ff0000] hover:bg-[#ff0000]/10 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
