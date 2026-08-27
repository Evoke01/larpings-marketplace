import React from "react";
import { useParams, Link } from "react-router-dom";
import SellerProfile from "../components/SellerProfile";

export default function SellerProfilePage() {
  const { handle } = useParams();

  return (
    <div className="bg-zinc-950 text-[#f9f9fb] font-[Poppins,ui-sans-serif,system-ui,sans-serif] min-h-screen">
      <SellerProfile />
    </div>
  );
}
