import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {  useLocation, useNavigate , Link } from "react-router-dom";

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
  const [tab, setTab] = useState<"signin" | "signup" | "forgot">("signin");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (newTab: "signin" | "signup" | "forgot") => {
    setTab(newTab);
    setError(null);
    setMessage(null);
    setUsernameStatus("idle");
  };

  useEffect(() => {
    if (tab !== "signup" || !username) {
      setUsernameStatus("idle");
      return;
    }

    const normalized = username.trim().toLowerCase().replace(/^@+/, "");
    if (!/^[a-z0-9._-]{3,30}$/.test(normalized)) {
      setUsernameStatus("invalid");
      return;
    }

    setUsernameStatus("checking");

    const timer = setTimeout(async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", normalized)
        .maybeSingle();

      if (error) {
        setUsernameStatus("idle"); // Failsafe
      } else if (data) {
        setUsernameStatus("taken");
      } else {
        setUsernameStatus("available");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username, tab]);

  const redirectAfterAuth = () => {
    const returnTo = new URLSearchParams(location.search).get("returnTo");
    navigate(returnTo?.startsWith("/") ? returnTo : "/dashboard", { replace: true });
  };

  const isSignup = tab === "signup";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (tab === "forgot") {
      if (!identifier.includes("@")) {
        setError("Please enter your email address.");
        setLoading(false);
        return;
      }
      
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(identifier, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (resetError) {
        setError(resetError.message);
      } else {
        setMessage("Password reset link sent! Check your inbox.");
      }
      setLoading(false);
      return;
    }

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

      if (usernameStatus === "invalid") {
        setError("Username must be 3–30 characters using letters, numbers, dots, underscores, or hyphens");
        setLoading(false);
        return;
      }
      if (usernameStatus === "taken") {
        setError("That username is already taken. Please choose another one.");
        setLoading(false);
        return;
      }
      if (usernameStatus === "checking") {
        // Prevent submit until check finishes, or just wait a moment
        setError("Checking username availability...");
        setLoading(false);
        return;
      }

      const normalizedUsername = username.trim().toLowerCase().replace(/^@+/, "");

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: identifier,
        password,
        options: {
          data: {
            username: normalizedUsername,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")) {
          setError("Password must contain at least one letter and one number.");
        } else {
          setError(signUpError.message);
        }
      } else {
        if (data.session) {
           redirectAfterAuth();
        } else {
           // Email confirmation required — show a friendly message
           setMessage("Account created! Check your email and click the confirmation link to log in.");
        }
      }
    } else {
      if (!identifier.includes("@")) {
        // Attempt username login via edge function
        const { data, error: functionError } = await supabase.functions.invoke("login-with-username", {
          body: { username: identifier, password },
        });

        if (functionError || data?.error) {
          setError(data?.error || "Invalid login credentials");
        } else if (data?.session) {
          await supabase.auth.setSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
          });
          redirectAfterAuth();
        } else {
          setError("An unexpected error occurred.");
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: identifier,
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
    }
    setLoading(false);
  };

  return (
    <div className="bg-zinc-950 text-[#f9f9fb] leading-normal [font-family:Poppins,ui-sans-serif,system-ui,sans-serif,system-ui,sans-serif] caret-[#f9f9fb]">
      <div className="fixed z-50 caret-[#f9f9fb] top-3 bottom-auto inset-x-3">
        <div className="bg-[rgba(17,17,19,0.72)] max-w-[1152px] shadow-[rgba(0,0,0,0.9)_0px_12px_40px_-18px,rgba(255,255,255,0.04)_0px_1px_0px_0px_inset] backdrop-blur-[18px] backdrop-saturate-150 caret-[#f9f9fb] mx-auto rounded-br-[14px] rounded-t-[14px] rounded-bl-[14px] border-[rgba(34,34,38,0.9)] border">
          <div className="h-12 flex items-center gap-y-2 gap-x-2 caret-[#f9f9fb] px-4">
            <Link to="/" aria-label="larpings.com home" className="flex shrink-0 items-center caret-[#f9f9fb] mr-1">
              <span className="font-bold text-base tracking-tight text-white caret-white">larpings<span className="text-[#ff0000] text-[10px] align-middle relative -top-px caret-[#ff0000]">@</span>com</span>
            </Link>
            <div className="hidden md:flex grow items-center gap-y-2 gap-x-1 caret-[#f9f9fb] pl-4">
              <button className="text-[#93939f] text-[14px] font-medium flex items-center gap-y-2 gap-x-1 caret-[#93939f] px-3.5 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px]">
                Shop <Icon1 />
              </button>
              <Link to="/sold" className="text-[#93939f] text-[14px] font-medium caret-[#93939f] px-3.5 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px]">Sold</Link>
              <Link to="/blog" className="text-[#93939f] text-[14px] font-medium caret-[#93939f] px-3.5 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px]">Blog</Link>
              <Link to="/about" className="text-[#93939f] text-[14px] font-medium caret-[#93939f] px-3.5 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px]">About</Link>
            </div>
            <div className="flex items-center gap-y-2 gap-x-2 caret-[#f9f9fb] ml-auto">
              <Link to="/messages" aria-label="Messages" className="hidden md:flex text-[#93939f] w-9 h-9 justify-center items-center caret-[#93939f] relative rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border">
                <Icon12 className="w-4 h-4" />
              </Link>
              <Link to="/account" aria-label="Account" className="hidden md:flex text-[#93939f] w-9 h-9 justify-center items-center caret-[#93939f] rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border">
                <Icon2 />
              </Link>
              <Link to="/marketplace" className="bg-white text-[#0e0e11] text-[14px] font-medium flex items-center gap-y-2 gap-x-2 caret-[#0e0e11] px-4 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] shadow-[rgba(255,255,255,0.4)_0px_1px_0px_0px_inset,rgba(0,0,0,0.8)_0px_8px_24px_-12px]">
                Shop <Icon3 />
              </Link>
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
              {tab === "signup" ? "Join larpings" : tab === "forgot" ? "Reset password" : "Welcome back"}
            </span>
            <h1 className="leading-[1.05] font-medium text-[36px] tracking-[-1.08px] caret-[#f9f9fb] mt-5 mb-0">
              {tab === "signup" ? (
                <>Create your <span className="text-[#ff0000] caret-[#ff0000]">account</span></>
              ) : tab === "forgot" ? (
                <>Forgot your <span className="text-[#ff0000] caret-[#ff0000]">password?</span></>
              ) : (
                <>Sign in to{" "}<span className="text-[#ff0000] caret-[#ff0000]">larpings.com</span></>
              )}
            </h1>
            <p className="text-[#93939f] leading-relaxed text-[14px] caret-[#93939f] mt-3 mb-0">
              {tab === "signup"
                ? "Free to join. Start buying or selling in minutes."
                : tab === "forgot"
                ? "Enter your email address and we'll send you a link to reset your password."
                : "Your email and password. Buying, selling and payouts — one account."}
            </p>
            <div className="caret-[#f9f9fb] mt-8">
              {tab !== "forgot" && (
                <div className="bg-[#111113] grid gap-y-1 gap-x-1 grid-cols-[repeat(2,minmax(0px,1fr))] caret-[#f9f9fb] p-1 rounded-br-[12px] rounded-t-[12px] rounded-bl-[12px] border-[#222226] border">
                  <button
                    type="button"
                    onClick={() => handleTabChange("signin")}
                    className={`font-medium text-[13px] h-10 flex justify-center items-center [appearance:button] p-0 rounded-br-[9px] rounded-t-[9px] rounded-bl-[9px] transition-all ${!isSignup ? "bg-[#ff0000] text-white caret-white" : "bg-transparent text-[#93939f] caret-[#93939f] hover:text-white"}`}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabChange("signup")}
                    className={`font-medium text-[13px] h-10 flex justify-center items-center [appearance:button] p-0 rounded-br-[9px] rounded-t-[9px] rounded-bl-[9px] transition-all ${isSignup ? "bg-[#ff0000] text-white caret-white" : "bg-transparent text-[#93939f] caret-[#93939f] hover:text-white"}`}
                  >
                    Create account
                  </button>
                </div>
              )}

              {/* Form fields */}
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="text-[13px] font-medium p-3.5 rounded-[10px] mb-5 border bg-[rgba(255,0,0,0.08)] border-[rgba(255,0,0,0.2)] text-[#ff0000]">
                    {error}
                  </div>
                )}
                {message && (
                  <div className="text-[13px] font-medium p-3.5 rounded-[10px] mb-5 border bg-[rgba(52,211,153,0.08)] border-[rgba(52,211,153,0.2)] text-emerald-400 flex items-center gap-2">
                    <svg className="w-4 h-4 flex-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    {message}
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
                        className={`bg-[#111113] leading-[20px] text-[14px] w-full h-12 flex caret-[#f9f9fb] pl-7 pr-3 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border outline-none transition-colors ${
                          usernameStatus === "taken" || usernameStatus === "invalid"
                            ? "border-[#ff0000]/50 focus:border-[#ff0000]"
                            : usernameStatus === "available"
                            ? "border-emerald-500/50 focus:border-emerald-500"
                            : "border-[#222226] focus:border-[#ff0000]"
                        }`}
                      />
                    </div>
                    {usernameStatus !== "idle" && (
                      <div className="mt-2 text-[12px] font-medium flex items-center">
                        {usernameStatus === "checking" && <span className="text-[#93939f] flex items-center"><svg className="animate-spin w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Checking availability...</span>}
                        {usernameStatus === "available" && <span className="text-emerald-400 flex items-center"><svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>Username is available</span>}
                        {usernameStatus === "taken" && <span className="text-[#ff0000] flex items-center"><svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>Username is taken</span>}
                        {usernameStatus === "invalid" && <span className="text-[#ff0000] flex items-center"><svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>Invalid format (3-30 chars, letters/numbers/./_/-)</span>}
                      </div>
                    )}
                  </div>
                )}

                <div className="caret-[#f9f9fb] mt-4">
                  <label className="leading-none font-medium text-[14px] caret-[#f9f9fb]">{tab === "forgot" ? "Email" : isSignup ? "Email" : "Email or Username"}</label>
                  <input
                    type={tab === "forgot" || isSignup ? "email" : "text"}
                    id="identifier"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    autoComplete={tab === "forgot" || isSignup ? "email" : "username"}
                    placeholder={tab === "forgot" ? "you@example.com" : isSignup ? "you@example.com" : "you@example.com or yourhandle"}
                    className="bg-[#111113] leading-[20px] text-[14px] w-full h-12 flex caret-[#f9f9fb] mt-2 px-3 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border outline-none focus:border-[#ff0000] transition-colors"
                  />
                </div>

                {tab !== "forgot" && (
                  <div className="caret-[#f9f9fb] mt-4">
                    <div className="flex items-center justify-between caret-[#f9f9fb]">
                      <label className="leading-none font-medium text-[14px] caret-[#f9f9fb]">Password</label>
                      {!isSignup && (
                        <button type="button" onClick={() => handleTabChange("forgot")} className="text-[#ff0000] text-[13px] font-medium caret-[#ff0000]">Forgot password?</button>
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
                )}

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
                  {loading ? "Processing..." : tab === "forgot" ? "Send reset link" : isSignup ? "Create account" : "Sign in"} <Icon5 />
                </button>

                <p className="text-[#93939f] text-[13px] text-center caret-[#93939f] mt-5 mb-0">
                  {tab === "signup" ? (
                    <>Already have an account?{" "}
                      <button type="button" onClick={() => handleTabChange("signin")} className="text-[#ff0000] font-medium caret-[#ff0000] [appearance:button] p-0">Sign in</button>
                    </>
                  ) : tab === "forgot" ? (
                    <>Remembered your password?{" "}
                      <button type="button" onClick={() => handleTabChange("signin")} className="text-[#ff0000] font-medium caret-[#ff0000] [appearance:button] p-0">Sign in</button>
                    </>
                  ) : (
                    <>No account?{" "}
                      <button type="button" onClick={() => handleTabChange("signup")} className="text-[#ff0000] font-medium caret-[#ff0000] [appearance:button] p-0">Sign up free</button>
                    </>
                  )}
                </p>
              </form>
            </div>
          </div>

          {/* Right: Trust panel — redesigned */}
        <div className="hidden lg:flex min-h-[765px] flex-col justify-center bg-[#080809] pt-24 pb-6 px-12 border-l border-[#1a1a1e] relative overflow-hidden">
          {/* Background glow */}
          <div aria-hidden="true" className="absolute -top-32 -right-32 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,0,0,0.07) 0%, transparent 70%)' }} />
          <div aria-hidden="true" className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,0,0,0.04) 0%, transparent 70%)' }} />

          <div className="relative max-w-sm">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 bg-[rgba(255,0,0,0.08)] border border-[rgba(255,0,0,0.2)] text-[#ff6060] font-mono text-[10px] tracking-[2px] uppercase px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff0000] animate-pulse" />
              Protected by escrow
            </span>

            {/* Headline */}
            <h2 className="font-display mt-5 text-[36px] font-semibold leading-[1.1] tracking-[-1.2px] text-white">
              The safest place to{' '}
              <span className="text-[#ff0000]">buy &amp; sell</span>{' '}
              your grails.
            </h2>
            <p className="mt-3 text-[#5a5a6a] text-sm leading-relaxed">
              Escrow-protected transfers. Your payment is held until you confirm the goods — no exceptions.
            </p>

            {/* Stat pills */}
            <div className="flex gap-3 mt-6 flex-wrap">
              {[
                { val: '< 2h', label: 'Avg. transfer' },
                { val: '100%', label: 'Verified sellers' },
                { val: '$0', label: 'Buyer risk' },
              ].map(({ val, label }) => (
                <div key={label} className="bg-[#111113] border border-[#222226] rounded-[12px] px-4 py-3 flex flex-col gap-0.5">
                  <span className="font-mono font-bold text-white text-base">{val}</span>
                  <span className="text-[#5a5a6a] text-[11px]">{label}</span>
                </div>
              ))}
            </div>

            {/* Feature cards */}
            <div className="mt-7 flex flex-col gap-3">
              {[
                {
                  icon: <Icon9 width="16" height="16" className="w-4 h-4 shrink-0 fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]" />,
                  title: 'Crypto checkout',
                  desc: 'Funds held in escrow — never wired to a stranger.',
                },
                {
                  icon: <Icon10 width="16" height="16" className="w-4 h-4 shrink-0 fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]" />,
                  title: 'Buyer confirms first',
                  desc: 'Sellers only get paid after you approve the transfer.',
                },
                {
                  icon: <Icon11 width="16" height="16" className="w-4 h-4 shrink-0 fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]" />,
                  title: 'Tracked step-by-step',
                  desc: 'Live order status from payment to completion.',
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3.5 bg-[#0f0f12] border border-[#1e1e24] rounded-[14px] p-4 hover:border-[#2e2e38] transition-colors">
                  <span className="w-8 h-8 rounded-[10px] bg-[rgba(255,0,0,0.08)] flex items-center justify-center shrink-0">
                    {icon}
                  </span>
                  <div>
                    <p className="text-white text-sm font-medium">{title}</p>
                    <p className="text-[#5a5a6a] text-xs mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      </div>

      <button aria-label="Open chat" className="bg-[#ff0000] text-white text-[16px] w-14 h-14 fixed z-[60] flex justify-center items-center shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_20px_25px_-5px,rgba(0,0,0,0.1)_0px_8px_10px_-6px] caret-white [appearance:button] p-0 rounded-br-full rounded-t-full rounded-bl-full left-auto right-5 top-auto bottom-24">
        <Icon12 width="24" height="24" />
      </button>
    </div>
  );
}
