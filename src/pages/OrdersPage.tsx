import React from "react";
import { Link } from "react-router-dom";

const ClipboardIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4" />
    <path d="M12 16h4" />
    <path d="M8 11h.01" />
    <path d="M8 16h.01" />
  </svg>
);

export default function OrdersPage() {
  return (
    <div className="bg-zinc-950 text-[#f9f9fb] min-h-screen font-[Poppins,ui-sans-serif,system-ui,sans-serif]">
      <div className="w-full max-w-[672px] mx-auto pt-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">
            Purchases &amp; sales
          </span>
          <h1 className="leading-10 font-medium text-[36px] tracking-[-1.08px] mt-3">
            Your <span className="text-[#ff0000]">orders.</span>
          </h1>
          <p className="text-[#93939f] leading-5 text-sm mt-2">
            Track every transfer — confirm delivery to release payment to the seller.
          </p>
        </div>

        {/* Sign-in card */}
        <div className="bg-[#111113] p-6 rounded-[14px] border border-[#222226]">
          <div className="bg-[rgba(255,0,0,0.1)] w-14 h-14 flex justify-center items-center mx-auto rounded-[12px] text-[#ff0000]">
            <ClipboardIcon />
          </div>
          <div className="text-center mt-4">
            <h2 className="leading-7 font-medium text-lg tracking-[-0.54px]">Track your orders</h2>
            <p className="text-[#93939f] leading-5 text-sm mt-1">
              Sign in to view purchases, sales, and manage delivery.
            </p>
          </div>
          <Link
            to="/signin"
            className="bg-[#ff0000] text-white leading-none font-medium text-sm w-full inline-flex justify-center items-center gap-2 shadow-[rgba(255,255,255,0.18)_0px_1px_0px_0px_inset,rgba(255,0,0,0.55)_0px_8px_24px_-12px] mt-5 px-[22px] py-3 rounded-[10px] hover:bg-[#cc0000] hover:-translate-y-px active:translate-y-0 transition-all"
          >
            Sign in
          </Link>
        </div>

        {/* Info blurb */}
        <p className="text-[#93939f] text-xs leading-relaxed text-center mt-6 pb-8">
          Once signed in, both your buyer purchases and seller sales will appear here. Confirm delivery on any open order to release the held payment to the seller.
        </p>
      </div>
    </div>
  );
}
