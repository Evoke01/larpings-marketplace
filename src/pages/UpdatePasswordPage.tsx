import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Make sure we have a session. Supabase should automatically log them in from the recovery link.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // If not logged in, they shouldn't be here or the link is invalid
        navigate("/signin", { replace: true });
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password: password
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
    } else {
      setMessage("Password updated successfully! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111113] border border-[#222226] p-8 rounded-[14px] shadow-2xl">
        <h1 className="text-2xl font-semibold mb-2">Update Password</h1>
        <p className="text-[#93939f] text-sm mb-6">Enter your new password below.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="text-[13px] font-medium p-3.5 rounded-[10px] border bg-[rgba(255,0,0,0.08)] border-[rgba(255,0,0,0.2)] text-[#ff0000]">
              {error}
            </div>
          )}
          {message && (
            <div className="text-[13px] font-medium p-3.5 rounded-[10px] border bg-[rgba(52,211,153,0.08)] border-[rgba(52,211,153,0.2)] text-emerald-400 flex items-center gap-2">
              <svg className="w-4 h-4 flex-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              {message}
            </div>
          )}

          <div>
            <label className="text-sm font-medium">New password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-2 w-full bg-zinc-900 border border-[#222226] px-4 py-3 rounded-[10px] text-sm outline-none focus:border-[#ff0000] transition-colors"
              placeholder="••••••••••••"
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Confirm new password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="mt-2 w-full bg-zinc-900 border border-[#222226] px-4 py-3 rounded-[10px] text-sm outline-none focus:border-[#ff0000] transition-colors"
              placeholder="••••••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-[#ff0000] text-white font-medium text-[14px] h-12 flex justify-center items-center rounded-[10px] hover:bg-[#cc0000] transition-colors disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
