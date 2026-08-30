import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useUnreadNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !alive) return;

      const { count } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", session.user.id)
        .eq("is_read", false);

      if (count !== null && alive) setUnreadCount(count);
    })();

    const sub = supabase
      .channel("notifications-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        () => {
          setUnreadCount((c) => c + 1);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "notifications" },
        (payload) => {
          if (payload.new.is_read) {
            setUnreadCount((c) => Math.max(0, c - 1));
          }
        }
      )
      .subscribe();

    return () => {
      alive = false;
      supabase.removeChannel(sub);
    };
  }, []);

  return unreadCount;
}
