import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import { supabase } from "../lib/supabase";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [acceptanceLoading, setAcceptanceLoading] = useState(true);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!user) { setAcceptanceLoading(false); return () => { mounted = false; }; }
    setAcceptanceLoading(true);
    supabase.from("legal_acceptances").select("user_id").eq("user_id", user.id).maybeSingle().then(({ data, error }) => {
      if (!mounted) return;
      setAccepted(!error && Boolean(data));
      setAcceptanceLoading(false);
    });
    return () => { mounted = false; };
  }, [user]);

  if (loading || (user && acceptanceLoading)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#ff0000] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    const returnTo = `${location.pathname}${location.search}`;
    return <Navigate to={`/signin?returnTo=${encodeURIComponent(returnTo)}`} replace />;
  }

  if (!accepted) {
    const returnTo = `${location.pathname}${location.search}`;
    return <Navigate to={`/legal-acceptance?returnTo=${encodeURIComponent(returnTo)}`} replace />;
  }

  return <>{children}</>;
}
