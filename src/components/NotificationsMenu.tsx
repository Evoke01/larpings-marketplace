import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function NotificationsMenu({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (data) setNotifications(data);
      setLoading(false);
    }
    load();
  }, []);

  const markRead = async (id: string, link: string | null) => {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    if (!link) onClose();
  };

  const markAllRead = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    await supabase.from('notifications').update({ is_read: true }).eq('user_id', session.user.id).eq('is_read', false);
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-80 rounded-[14px] border border-[#222226] bg-[rgba(17,17,19,0.95)] backdrop-blur-xl shadow-2xl overflow-hidden text-left flex flex-col z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#222226]">
        <span className="text-sm font-semibold text-white">Notifications</span>
        <button onClick={markAllRead} className="text-xs text-[#93939f] hover:text-white transition-colors">Mark all read</button>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {loading ? (
          <div className="p-8 text-center text-[#93939f] text-sm">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-[#93939f] text-sm">No notifications yet</div>
        ) : (
          <div className="flex flex-col divide-y divide-[#222226]">
            {notifications.map((n) => (
              <div key={n.id} className={`p-4 transition-colors hover:bg-white/5 ${!n.is_read ? 'bg-[#ff0000]/5' : ''}`}>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white mb-1">{n.title}</p>
                    <p className="text-xs text-[#93939f] leading-relaxed mb-2">{n.content}</p>
                    {n.link ? (
                      <Link 
                        to={n.link} 
                        onClick={() => markRead(n.id, n.link)}
                        className="text-xs text-[#ff0000] hover:text-[#cc0000] font-medium"
                      >
                        View details &rarr;
                      </Link>
                    ) : (
                      <button onClick={() => markRead(n.id, null)} className="text-xs text-[#93939f] hover:text-white">Dismiss</button>
                    )}
                  </div>
                  {!n.is_read && <div className="w-2 h-2 rounded-full bg-[#ff0000] mt-1 shrink-0" />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
