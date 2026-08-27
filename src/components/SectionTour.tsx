import React, { useEffect, useMemo, useState } from "react";
import TourTooltip from "./TourTooltip";
import type { TourStep } from "./TourTooltip";

const TOURS: Record<string, TourStep[]> = {
  "/marketplace": [
    { title: "Find your next drop", body: "Search handles, filter by platform or category, then switch between grid and list view." },
    { title: "Check the details", body: "Open a listing to review the seller, price, track record and delivery protection before buying." },
    { title: "Pay securely", body: "Choose a supported coin at checkout. Funds stay protected until delivery is confirmed." },
  ],
  "/listing": [
    { title: "Review before you buy", body: "Check the handle, platform, seller profile and ownership status before starting checkout." },
    { title: "Choose a payment coin", body: "Select a coin to create a secure hosted payment invoice. Always send the exact amount shown." },
    { title: "Confirm delivery", body: "After the seller delivers, confirm it from Orders so the escrow process can finish." },
  ],
  "/sell": [
    { title: "Pick your handle name", body: "Enter the exact username — no @ and no spaces. This is what the buyer is purchasing." },
    { title: "Make the listing clear", body: "Add the platform, category, price and a useful description so buyers know exactly what they get." },
    { title: "Verify ownership", body: "After publishing, use the dashboard verification tool to prove control of the account you are listing." },
    { title: "You get paid after delivery", body: "Once the buyer confirms delivery, your earnings move through the platform hold before payout." },
  ],
  "/dashboard": [
    { title: "Your seller control room", body: "Track active listings, confirmed sales, ratings, orders and badge progress in one place." },
    { title: "Manage listings", body: "Use Add listing to publish a new drop, or open a listing to verify ownership and review its status." },
    { title: "Build trust", body: "Complete ownership verification and keep your storefront profile, avatar and bio up to date." },
  ],
  "/account": [
    { title: "Customize your profile", body: "Set your display name, bio, avatar and banner so buyers recognize your storefront." },
    { title: "Add your links", body: "Connect your public social links so buyers can understand your brand before they purchase." },
    { title: "Save your changes", body: "Your profile updates appear on your public seller storefront immediately after saving." },
  ],
  "/messages": [
    { title: "Message safely", body: "Start conversations with sellers from a listing or their storefront. Keep deal details inside larpings." },
    { title: "Choose a conversation", body: "Your conversations appear in the left panel. Select one to read the full message history." },
    { title: "Keep proof in chat", body: "Use messages to confirm delivery details and never share passwords or recovery codes." },
  ],
  "/orders": [
    { title: "Track every purchase", body: "Orders shows your payment and delivery progress, including the listing and current status." },
    { title: "Follow the escrow steps", body: "Wait for payment and delivery updates. The seller is not released until you confirm delivery." },
    { title: "Confirm only when ready", body: "Open the order after checking what you received. Confirm delivery only when it matches the listing." },
  ],
  "/seller": [
    { title: "Know the seller", body: "Review the seller’s bio, profile links, rating, history and active listings before you buy." },
    { title: "Read the badges", body: "Badges summarize track record signals. Open the badge guide to see how each one is earned." },
    { title: "Ask a question", body: "Use Message to contact the seller directly and keep the conversation connected to your purchase." },
  ],
  "/ranks": [
    { title: "Explore top sellers", body: "The leaderboard is ordered from live seller track-record data and active storefront activity." },
    { title: "Open a storefront", body: "Select any seller to review their profile, listings and available ownership signals." },
    { title: "Start climbing", body: "Sellers build rank through successful, buyer-confirmed deliveries and a trustworthy storefront." },
  ],
  "/badges": [
    { title: "Learn every badge", body: "This guide explains the trust and sales milestones that can appear on seller storefronts." },
    { title: "Separate signal from hype", body: "A badge should come from a real platform event or documented milestone—not a seller claim." },
    { title: "Verify your listing", body: "Use Get Verified to learn the current ownership-check process before promoting a listing." },
  ],
  "/get-verified": [
    { title: "Why ownership matters", body: "Verification is meant to help buyers distinguish a seller who controls the account from an unsupported claim." },
    { title: "Follow the challenge", body: "Generate a temporary code, place it where the verification flow instructs you, then submit it for checking." },
    { title: "Keep credentials private", body: "Never share passwords, recovery codes or wallet keys with anyone claiming to verify a listing." },
  ],
};

function sectionKey(pathname: string) {
  if (pathname.startsWith("/listing/")) return "/listing";
  if (pathname.startsWith("/seller/")) return "/seller";
  return pathname;
}

export default function SectionTour({ pathname }: { pathname: string }) {
  const key = sectionKey(pathname);
  const steps = useMemo(() => TOURS[key] ?? [], [key]);
  const storageKey = `larpings:section-tour-complete:${key}`;
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(Boolean(steps.length) && localStorage.getItem(storageKey) !== "1");
  }, [steps.length, storageKey]);

  if (!show) return null;
  return <TourTooltip steps={steps} onDone={() => { localStorage.setItem(storageKey, "1"); setShow(false); }} />;
}
