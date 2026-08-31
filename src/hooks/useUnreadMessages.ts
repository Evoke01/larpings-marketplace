import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useUnreadMessages() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let active = true;
    let channel: ReturnType<typeof supabase.channel> | null = null;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!active || !user) return;
      const load = async () => {
        const { count } = await supabase.from("messages").select("id", { count: "exact", head: true }).eq("receiver_id", user.id).eq("read", false);
        if (active) setUnreadCount(count ?? 0);
      };
      await load();
      channel = supabase.channel(`unread-messages-${user.id}`).on("postgres_changes", { event: "*", schema: "public", table: "messages", filter: `receiver_id=eq.${user.id}` }, (payload) => {
        void load();
        if (payload.eventType === "INSERT") {
          const notifsEnabled = localStorage.getItem("larpings_notifications") === "true";
          const soundEnabled = localStorage.getItem("larpings_sound") === "true";
          
          if (notifsEnabled && Notification.permission === "granted") {
            new Notification("New message on Larpings", {
              body: "You just received a new message.",
              silent: !soundEnabled
            });
          }
        }
      }).subscribe();
    })();
    return () => { active = false; if (channel) void supabase.removeChannel(channel); };
  }, []);

  return unreadCount;
}
