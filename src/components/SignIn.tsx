import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useLocation, useNavigate } from "react-router-dom";

const Icon1 = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(147, 147, 159)" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="text-center align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]" {...props}>
    <path d="m6 9 6 6 6-6" className="inline fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"></path>
  </svg>
);

const Icon2 = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(147, 147, 159)" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" className="inline fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"></path>
    <circle cx="12" cy="7" r="4" className="inline fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"></circle>
  </svg>
);

const Icon3 = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(14, 14, 17)" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#0e0e11] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#0e0e11]" {...props}>
    <circle cx="11" cy="11" r="8" className="inline fill-none stroke-[#0e0e11] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#0e0e11]"></circle>
    <path d="m21 21-4.3-4.3" className="inline fill-none stroke-[#0e0e11] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#0e0e11]"></path>
  </svg>
);

const Icon4 = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(249, 249, 251)" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="text-center align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#f9f9fb] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]" {...props}>
    <line x1="4" x2="20" y1="12" y2="12" className="inline fill-none stroke-[#f9f9fb] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"></line>
    <line x1="4" x2="20" y1="6" y2="6" className="inline fill-none stroke-[#f9f9fb] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"></line>
    <line x1="4" x2="20" y1="18" y2="18" className="inline fill-none stroke-[#f9f9fb] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"></line>
  </svg>
);

const Icon5 = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="text-center align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden fill-none stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white" {...props}>
    <path d="M5 12h14" className="inline fill-none stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"></path>
    <path d="m12 5 7 7-7 7" className="inline fill-none stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"></path>
  </svg>
);

const Icon6 = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 0, 0)" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff0000] align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]" {...props}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></path>
    <path d="m9 12 2 2 4-4" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></path>
  </svg>
);

const Icon7 = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 0, 0)" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff0000] align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]" {...props}>
    <circle cx="12" cy="12" r="10" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></circle>
    <polyline points="12 6 12 12 16 14" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></polyline>
  </svg>
);

const Icon8 = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 0, 0)" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff0000] align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]" {...props}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></path>
    <path d="m9 12 2 2 4-4" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></path>
  </svg>
);

const Icon9 = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 0, 0)" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff0000] align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]" {...props}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></path>
  </svg>
);

const Icon10 = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 0, 0)" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff0000] align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]" {...props}>
    <path d="m16 16 2 2 4-4" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></path>
    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></path>
    <path d="m7.5 4.27 9 5.15" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></path>
    <polyline points="3.29 7 12 12 20.71 7" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></polyline>
    <line x1="12" x2="12" y1="22" y2="12" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></line>
  </svg>
);

const Icon11 = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 0, 0)" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff0000] align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]" {...props}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></path>
    <path d="M3 3v5h5" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></path>
    <path d="M12 7v5l4 2" className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"></path>
  </svg>
);

const Icon12 = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="text-center align-middle w-6 h-6 block overflow-x-hidden overflow-y-hidden fill-none stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white" {...props}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" className="inline fill-none stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"></path>
  </svg>
);

export default function SignIn() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  const redirectAfterAuth = () => {
    const returnTo = new URLSearchParams(location.search).get("returnTo");
    navigate(returnTo?.startsWith("/") ? returnTo : "/dashboard", { replace: true });
  };

  const isSignup = tab === "signup";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isSignup) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
      if (!username) {
        setError("Username is required");
        setLoading(false);
        return;
      }

      const normalizedUsername = username.trim().toLowerCase().replace(/^@+/, "");
      if (!/^[a-z0-9._-]{3,30}$/.test(normalizedUsername)) {
        setError("Username must be 3–30 characters using letters, numbers, dots, underscores, or hyphens");
        setLoading(false);
        return;
      }

      const { data: existingProfile, error: usernameCheckError } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", normalizedUsername)
        .maybeSingle();

      if (usernameCheckError) {
        setError("Could not verify username availability. Please try again.");
        setLoading(false);
        return;
      }
      if (existingProfile) {
        setError("That username is already taken. Please choose another one.");
        setLoading(false);
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: normalizedUsername,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        if (data.session) {
           redirectAfterAuth();
        } else {
           // Email confirmation required — show a friendly message
           setError("✅ Account created! Check your email and click the confirmation link to log in.");
        }
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message === "Email not confirmed"
          ? "Please confirm your email first. Check your inbox for the confirmation link."
          : signInError.message
        );
      } else {
        redirectAfterAuth();
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-zinc-950 text-[#f9f9fb] leading-normal [font-family:Poppins,ui-sans-serif,system-ui,sans-serif,system-ui,sans-serif] caret-[#f9f9fb]">
      <div className="fixed z-50 caret-[#f9f9fb] top-3 bottom-auto inset-x-3">
        <div className="bg-[rgba(17,17,19,0.72)] max-w-[1152px] shadow-[rgba(0,0,0,0.9)_0px_12px_40px_-18px,rgba(255,255,255,0.04)_0px_1px_0px_0px_inset] backdrop-blur-[18px] backdrop-saturate-150 caret-[#f9f9fb] mx-auto rounded-br-[14px] rounded-t-[14px] rounded-bl-[14px] border-[rgba(34,34,38,0.9)] border">
          <div className="h-12 flex items-center gap-y-2 gap-x-2 caret-[#f9f9fb] px-4">
            <a href="/" aria-label="larpings.com home" className="flex shrink-0 items-center caret-[#f9f9fb] mr-1">
              <span className="font-bold text-base tracking-tight text-white caret-white">larpings<span className="text-[#ff0000] text-[10px] align-middle relative -top-px caret-[#ff0000]">@</span>com</span>
            </a>
            <div className="hidden md:flex grow items-center gap-y-2 gap-x-1 caret-[#f9f9fb] pl-4">
              <button className="text-[#93939f] text-[14px] font-medium flex items-center gap-y-2 gap-x-1 caret-[#93939f] px-3.5 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px]">
                Shop <Icon1 />
              </button>
              <a href="/sold" className="text-[#93939f] text-[14px] font-medium caret-[#93939f] px-3.5 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px]">Sold</a>
              <a href="/blog" className="text-[#93939f] text-[14px] font-medium caret-[#93939f] px-3.5 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px]">Blog</a>
              <a href="/about" className="text-[#93939f] text-[14px] font-medium caret-[#93939f] px-3.5 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px]">About</a>
            </div>
            <div className="flex items-center gap-y-2 gap-x-2 caret-[#f9f9fb] ml-auto">
              <a href="/messages" aria-label="Messages" className="hidden md:flex text-[#93939f] w-9 h-9 justify-center items-center caret-[#93939f] relative rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border">
                <Icon12 className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff0000] rounded-br-full rounded-t-full rounded-bl-full border-[1.5px] border-[#111113]" />
              </a>
              <a href="/account" aria-label="Account" className="hidden md:flex text-[#93939f] w-9 h-9 justify-center items-center caret-[#93939f] rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border">
                <Icon2 />
              </a>
              <a href="/marketplace" className="bg-white text-[#0e0e11] text-[14px] font-medium flex items-center gap-y-2 gap-x-2 caret-[#0e0e11] px-4 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] shadow-[rgba(255,255,255,0.4)_0px_1px_0px_0px_inset,rgba(0,0,0,0.8)_0px_8px_24px_-12px]">
                Shop <Icon3 />
              </a>
              <button aria-label="Open menu" className="md:hidden w-9 h-9 flex justify-center items-center caret-[#f9f9fb] rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border">
                <Icon4 />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-950 min-h-[765px] grid grid-cols-1 lg:grid-cols-[1fr_1fr] caret-[#f9f9fb]">
        {/* Left: Form */}
        <div className="min-h-[765px] relative z-10 flex flex-col caret-[#f9f9fb] pt-24 pb-6 px-10">
          <div className="w-full max-w-96 flex flex-col grow basis-[0%] justify-center caret-[#f9f9fb] mx-auto py-8">
            <span className="bg-[#111113] text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase w-fit flex items-center gap-y-2 gap-x-2 caret-[#93939f] px-3 py-1.5 rounded-br-[8px] rounded-t-[8px] rounded-bl-[8px] border-[#222226] border">
              <span className="bg-[#ff0000] w-1.5 h-1.5 block caret-[#93939f] rounded-br-full rounded-t-full rounded-bl-full"></span>
              {isSignup ? "Join larpings" : "Welcome back"}
            </span>
            <h1 className="leading-[1.05] font-medium text-[36px] tracking-[-1.08px] caret-[#f9f9fb] mt-5 mb-0">
              {isSignup ? (
                <>Create your <span className="text-[#ff0000] caret-[#ff0000]">account</span></>
              ) : (
                <>Sign in to{" "}<span className="text-[#ff0000] caret-[#ff0000]">larpings.com</span></>
              )}
            </h1>
            <p className="text-[#93939f] leading-relaxed text-[14px] caret-[#93939f] mt-3 mb-0">
              {isSignup
                ? "Free to join. Start buying or selling in minutes."
                : "Your email and password. Buying, selling and payouts — one account."}
            </p>
            <div className="caret-[#f9f9fb] mt-8">
              {/* Tab toggle */}
              <div className="bg-[#111113] grid gap-y-1 gap-x-1 grid-cols-[repeat(2,minmax(0px,1fr))] caret-[#f9f9fb] p-1 rounded-br-[12px] rounded-t-[12px] rounded-bl-[12px] border-[#222226] border">
                <button
                  type="button"
                  onClick={() => setTab("signin")}
                  className={`font-medium text-[13px] h-10 flex justify-center items-center [appearance:button] p-0 rounded-br-[9px] rounded-t-[9px] rounded-bl-[9px] transition-all ${!isSignup ? "bg-[#ff0000] text-white caret-white" : "bg-transparent text-[#93939f] caret-[#93939f] hover:text-white"}`}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => setTab("signup")}
                  className={`font-medium text-[13px] h-10 flex justify-center items-center [appearance:button] p-0 rounded-br-[9px] rounded-t-[9px] rounded-bl-[9px] transition-all ${isSignup ? "bg-[#ff0000] text-white caret-white" : "bg-transparent text-[#93939f] caret-[#93939f] hover:text-white"}`}
                >
                  Create account
                </button>
              </div>

              {/* Form fields */}
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className={`text-sm p-3 rounded-md mb-4 border ${error.startsWith('✅') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    {error}
                  </div>
                )}
                {isSignup && (
                  <div className="caret-[#f9f9fb] mt-4">
                    <label className="leading-none font-medium text-[14px] caret-[#f9f9fb]">Username</label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#93939f] font-medium text-[14px] select-none pointer-events-none">@</span>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        autoComplete="username"
                        placeholder="yourhandle"
                        className="bg-[#111113] leading-[20px] text-[14px] w-full h-12 flex caret-[#f9f9fb] pl-7 pr-3 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border outline-none focus:border-[#ff0000] transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div className="caret-[#f9f9fb] mt-4">
                  <label className="leading-none font-medium text-[14px] caret-[#f9f9fb]">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="bg-[#111113] leading-[20px] text-[14px] w-full h-12 flex caret-[#f9f9fb] mt-2 px-3 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border outline-none focus:border-[#ff0000] transition-colors"
                  />
                </div>

                <div className="caret-[#f9f9fb] mt-4">
                  <div className="flex items-center justify-between caret-[#f9f9fb]">
                    <label className="leading-none font-medium text-[14px] caret-[#f9f9fb]">Password</label>
                    {!isSignup && (
                      <a href="#" className="text-[#ff0000] text-[13px] font-medium caret-[#ff0000]">Forgot password?</a>
                    )}
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete={isSignup ? "new-password" : "current-password"}
                    placeholder="••••••••••••"
                    className="bg-[#111113] leading-[20px] text-[14px] w-full h-12 flex caret-[#f9f9fb] mt-2 px-3 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border outline-none focus:border-[#ff0000] transition-colors"
                  />
                </div>

                {isSignup && (
                  <div className="caret-[#f9f9fb] mt-4">
                    <label className="leading-none font-medium text-[14px] caret-[#f9f9fb]">Confirm password</label>
                    <input
                      type="password"
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                      placeholder="••••••••••••"
                      className="bg-[#111113] leading-[20px] text-[14px] w-full h-12 flex caret-[#f9f9fb] mt-2 px-3 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border outline-none focus:border-[#ff0000] transition-colors"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#ff0000] text-white font-medium text-[14px] w-full h-12 flex justify-center items-center gap-y-2 gap-x-2 caret-white [appearance:button] mt-5 px-4 py-0 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] shadow-[rgba(255,0,0,0.25)_0px_8px_24px_-8px] hover:-translate-y-px active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : (isSignup ? "Create account" : "Sign in")} <Icon5 />
                </button>

                <p className="text-[#93939f] text-[13px] text-center caret-[#93939f] mt-5 mb-0">
                  {isSignup ? (
                    <>Already have an account?{" "}
                      <button type="button" onClick={() => setTab("signin")} className="text-[#ff0000] font-medium caret-[#ff0000] [appearance:button] p-0">Sign in</button>
                    </>
                  ) : (
                    <>No account?{" "}
                      <button type="button" onClick={() => setTab("signup")} className="text-[#ff0000] font-medium caret-[#ff0000] [appearance:button] p-0">Sign up free</button>
                    </>
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Right: Trust panel */}
        <div className="hidden lg:flex min-h-[765px] flex-col justify-center bg-[#0a0a0d] caret-[#f9f9fb] pt-24 pb-6 px-12 border-l border-[#222226]">
          <div className="relative max-w-md caret-[#f9f9fb]">
            <span className="bg-[#111113] text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase w-fit flex items-center gap-y-2 gap-x-2 caret-[#93939f] px-3 py-1.5 rounded-br-[8px] rounded-t-[8px] rounded-bl-[8px] border-[#222226] border">
              <Icon6 />
              Why it's safe
            </span>
            <h2 className="leading-none font-medium text-[28px] tracking-[-0.84px] caret-[#f9f9fb] mt-5 mb-0">
              The safest place to{" "}
              <span className="text-[#ff0000] caret-[#ff0000]">buy & sell handles.</span>
            </h2>
            <p className="text-[#93939f] leading-relaxed text-[14px] caret-[#93939f] mt-3 mb-0">
              Transfers are fully escrow-protected. Sellers can't touch your payment until you confirm the handle is yours.
            </p>
            <div className="flex items-center gap-y-2 gap-x-2 caret-[#f9f9fb] mt-7">
              <Icon7 width="24" height="24" />
              <span className="text-[#93939f] text-[13px] caret-[#93939f]">Avg. transfer: under 2 hours</span>
              <Icon8 width="24" height="24" className="text-[#ff0000] align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden shrink-0 fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000] ml-4" />
              <span className="text-[#93939f] text-[13px] caret-[#93939f]">All sales verified</span>
            </div>
            <ul className="flex flex-col gap-y-3 gap-x-3 caret-[#b7b7c2] mt-7">
              <li className="flex items-start gap-y-2.5 gap-x-2.5 list-outside caret-[#b7b7c2]">
                <Icon9 width="24" height="24" className="text-[#ff0000] align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden shrink-0 fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000] mt-0.5" />
                Payments run on a hosted crypto checkout — your money is never wired to a stranger.
              </li>
              <li className="flex items-start gap-y-2.5 gap-x-2.5 list-outside caret-[#b7b7c2] mt-3">
                <Icon10 width="24" height="24" className="text-[#ff0000] align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden shrink-0 fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000] mt-0.5" />
                Sellers get paid only after you confirm the goods are yours.
              </li>
              <li className="flex items-start gap-y-2.5 gap-x-2.5 list-outside caret-[#b7b7c2] mt-3">
                <Icon11 width="24" height="24" className="text-[#ff0000] align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden shrink-0 fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000] mt-0.5" />
                Most transfers complete within minutes, tracked step by step in your orders.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button aria-label="Open chat" className="bg-[#ff0000] text-white text-[16px] w-14 h-14 fixed z-[60] flex justify-center items-center shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_20px_25px_-5px,rgba(0,0,0,0.1)_0px_8px_10px_-6px] caret-white [appearance:button] p-0 rounded-br-full rounded-t-full rounded-bl-full left-auto right-5 top-auto bottom-24">
        <Icon12 width="24" height="24" />
      </button>
    </div>
  );
}
