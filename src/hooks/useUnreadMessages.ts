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
      channel = supabase.channel(`unread-messages-${user.id}`).on("postgres_changes", { event: "*", schema: "public", table: "messages", filter: `receiver_id=eq.${user.id}` }, () => void load()).subscribe();
    })();
    return () => { active = false; if (channel) void supabase.removeChannel(channel); };
  }, []);

  return unreadCount;
}
