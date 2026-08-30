import React, { useState } from "react";
import { supabase } from "../lib/supabase";

const Icon1 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(147, 147, 159)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-center align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    {...props}
  >
    <path
      d="m6 9 6 6 6-6"
      className="inline fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></path>
  </svg>
);

const Icon2 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(147, 147, 159)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    {...props}
  >
    <path
      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      className="inline fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></path>
    <circle
      cx="12"
      cy="7"
      r="4"
      className="inline fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></circle>
  </svg>
);

const Icon3 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(14, 14, 17)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#0e0e11] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#0e0e11]"
    {...props}
  >
    <circle
      cx="11"
      cy="11"
      r="8"
      className="inline fill-none stroke-[#0e0e11] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#0e0e11]"
    ></circle>
    <path
      d="m21 21-4.3-4.3"
      className="inline fill-none stroke-[#0e0e11] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#0e0e11]"
    ></path>
  </svg>
);

const Icon4 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(249, 249, 251)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-center align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#f9f9fb] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"
    {...props}
  >
    <line
      x1="4"
      x2="20"
      y1="12"
      y2="12"
      className="inline fill-none stroke-[#f9f9fb] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"
    ></line>
    <line
      x1="4"
      x2="20"
      y1="6"
      y2="6"
      className="inline fill-none stroke-[#f9f9fb] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"
    ></line>
    <line
      x1="4"
      x2="20"
      y1="18"
      y2="18"
      className="inline fill-none stroke-[#f9f9fb] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"
    ></line>
  </svg>
);

const Icon5 = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    ariaHidden="true"
    className="align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden caret-[#f9f9fb]"
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="12"
      fill="rgb(38, 165, 228)"
      className="inline fill-[#26a5e4] caret-[#f9f9fb]"
    ></circle>
    <path
      d="M16.906 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
      fill="rgb(255, 255, 255)"
      className="inline fill-white caret-[#f9f9fb]"
    ></path>
  </svg>
);

const Icon6 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(249, 249, 251)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="align-middle w-5 h-5 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#f9f9fb] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"
    {...props}
  >
    <circle
      cx="12"
      cy="8"
      r="5"
      className="inline fill-none stroke-[#f9f9fb] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"
    ></circle>
    <path
      d="M20 21a8 8 0 0 0-16 0"
      className="inline fill-none stroke-[#f9f9fb] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"
    ></path>
  </svg>
);

const Icon7 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(147, 147, 159)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#93939f] align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden shrink-0 fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    {...props}
  >
    <path
      d="M5 12h14"
      className="inline fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></path>
    <path
      d="m12 5 7 7-7 7"
      className="inline fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></path>
  </svg>
);

const Icon8 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(255, 255, 255)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden fill-none stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
    {...props}
  >
    <path
      d="M5 12h14"
      className="inline fill-none stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
    ></path>
    <path
      d="m12 5 7 7-7 7"
      className="inline fill-none stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
    ></path>
  </svg>
);

const Icon9 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(147, 147, 159)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="align-middle w-3 h-3 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    {...props}
  >
    <rect
      width="18"
      height="11"
      x="3"
      y="11"
      rx="2"
      ry="2"
      className="w-[18px] h-[11px] inline fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></rect>
    <path
      d="M7 11V7a5 5 0 0 1 10 0v4"
      className="inline fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></path>
  </svg>
);

const Icon10 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(255, 0, 0)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#ff0000] align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden shrink-0 fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"
    {...props}
  >
    <path
      d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"
    ></path>
    <path
      d="m9 12 2 2 4-4"
      className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"
    ></path>
  </svg>
);

const Icon11 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(255, 0, 0)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#ff0000] align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden shrink-0 fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"
    ></circle>
    <polyline
      points="12 6 12 12 16 14"
      className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"
    ></polyline>
  </svg>
);

const Icon12 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="rgb(255, 0, 0)"
    stroke="rgb(255, 255, 255)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-label="Verified"
    className="text-white [text-wrap-mode:nowrap] align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden shrink-0 fill-[#ff0000] stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
    {...props}
  >
    <path
      d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      className="[text-wrap-mode:nowrap] inline fill-[#ff0000] stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
    ></path>
    <path
      d="m9 12 2 2 4-4"
      className="[text-wrap-mode:nowrap] inline fill-[#ff0000] stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
    ></path>
  </svg>
);

const Icon13 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="rgb(255, 255, 255)"
    stroke="rgb(255, 0, 0)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="align-middle w-3 h-3 block overflow-x-hidden overflow-y-hidden fill-white stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
    {...props}
  >
    <path
      d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      className="inline fill-white stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
    ></path>
    <path
      d="m9 12 2 2 4-4"
      className="inline fill-white stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
    ></path>
  </svg>
);

const Icon14 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(110, 231, 183)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="align-middle w-3 h-3 block overflow-x-hidden overflow-y-hidden fill-none stroke-emerald-300 stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-emerald-300"
    {...props}
  >
    <path
      d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"
      className="inline fill-none stroke-emerald-300 stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-emerald-300"
    ></path>
    <path
      d="M11 12 5.12 2.2"
      className="inline fill-none stroke-emerald-300 stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-emerald-300"
    ></path>
    <path
      d="m13 12 5.88-9.8"
      className="inline fill-none stroke-emerald-300 stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-emerald-300"
    ></path>
    <path
      d="M8 7h8"
      className="inline fill-none stroke-emerald-300 stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-emerald-300"
    ></path>
    <circle
      cx="12"
      cy="17"
      r="5"
      className="inline fill-none stroke-emerald-300 stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-emerald-300"
    ></circle>
    <path
      d="M12 18v-2h-.5"
      className="inline fill-none stroke-emerald-300 stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-emerald-300"
    ></path>
  </svg>
);

const Icon15 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(255, 255, 255)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-center align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden fill-none stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
    {...props}
  >
    <path
      d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"
      className="inline fill-none stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
    ></path>
  </svg>
);

const Icon16 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(183, 183, 194)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-center align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#b7b7c2] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#b7b7c2]"
    {...props}
  >
    <path
      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      className="inline fill-none stroke-[#b7b7c2] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#b7b7c2]"
    ></path>
    <circle
      cx="12"
      cy="7"
      r="4"
      className="inline fill-none stroke-[#b7b7c2] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#b7b7c2]"
    ></circle>
  </svg>
);

const Icon17 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(14, 14, 17)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-center align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#0e0e11] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#0e0e11]"
    {...props}
  >
    <path
      d="M5 12h14"
      className="inline fill-none stroke-[#0e0e11] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#0e0e11]"
    ></path>
    <path
      d="m12 5 7 7-7 7"
      className="inline fill-none stroke-[#0e0e11] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#0e0e11]"
    ></path>
  </svg>
);

const Icon18 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(255, 0, 0)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#ff0000] align-middle w-3 h-3 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"
    {...props}
  >
    <path
      d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
      className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"
    ></path>
  </svg>
);

const Icon19 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(255, 0, 0)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#ff0000] align-middle w-3 h-3 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"
    {...props}
  >
    <path
      d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"
    ></path>
    <path
      d="m9 12 2 2 4-4"
      className="inline fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"
    ></path>
  </svg>
);

const Icon20 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(147, 147, 159)"
    strokeWidth="1.8px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="align-middle w-6 h-6 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    {...props}
  >
    <path
      d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
      className="inline fill-none stroke-[#93939f] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></path>
    <path
      d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      className="inline fill-none stroke-[#93939f] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></path>
  </svg>
);

const Icon21 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(249, 249, 251)"
    strokeWidth="1.8px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="align-middle w-6 h-6 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#f9f9fb] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"
    {...props}
  >
    <circle
      cx="11"
      cy="11"
      r="8"
      className="inline fill-none stroke-[#f9f9fb] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"
    ></circle>
    <path
      d="m21 21-4.3-4.3"
      className="inline fill-none stroke-[#f9f9fb] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"
    ></path>
  </svg>
);

const Icon22 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(147, 147, 159)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="align-middle w-7 h-7 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="4"
      className="inline fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></circle>
    <path
      d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"
      className="inline fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></path>
  </svg>
);

const Icon23 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(147, 147, 159)"
    strokeWidth="1.8px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="align-middle w-6 h-6 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    {...props}
  >
    <path
      d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"
      className="inline fill-none stroke-[#93939f] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></path>
    <path
      d="M3 6h18"
      className="inline fill-none stroke-[#93939f] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></path>
    <path
      d="M16 10a4 4 0 0 1-8 0"
      className="inline fill-none stroke-[#93939f] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></path>
  </svg>
);

const Icon24 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(147, 147, 159)"
    strokeWidth="1.8px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="align-middle w-6 h-6 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    {...props}
  >
    <path
      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      className="inline fill-none stroke-[#93939f] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></path>
    <circle
      cx="12"
      cy="7"
      r="4"
      className="inline fill-none stroke-[#93939f] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
    ></circle>
  </svg>
);

const Icon25 = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(255, 255, 255)"
    strokeWidth="2px"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-center align-middle w-6 h-6 block overflow-x-hidden overflow-y-hidden fill-none stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
    {...props}
  >
    <path
      d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"
      className="inline fill-none stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
    ></path>
  </svg>
);

export default function Listing() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    if (error && error.code !== "23505") { // Ignore unique violation if already subscribed
      setStatus("error");
    } else {
      setStatus("success");
      setEmail("");
    }
  };
  return (
    <div className="bg-zinc-950 text-[#f9f9fb] leading-normal [font-family:Poppins,ui-sans-serif,system-ui,sans-serif,system-ui,sans-serif] caret-[#f9f9fb]">
      <div id="root" className="caret-[#f9f9fb]">
        <div
          role="region"
          aria-label="Notifications (F8)"
          tabIndex={-1}
          className="caret-[#f9f9fb] pointer-events-none"
        ></div>
        <section
          aria-label="Notifications alt+T"
          tabIndex={-1}
          className="caret-[#f9f9fb]"
        ></section>
        <div className="fixed z-50 caret-[#f9f9fb] top-3 bottom-auto inset-x-3">
          <div className="bg-[rgba(17,17,19,0.72)] max-w-[1152px] shadow-[rgba(0,0,0,0.9)_0px_12px_40px_-18px,rgba(255,255,255,0.04)_0px_1px_0px_0px_inset] backdrop-blur-[18px] backdrop-saturate-150 caret-[#f9f9fb] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] mx-auto rounded-br-[14px] rounded-t-[14px] rounded-bl-[14px] border-[rgba(34,34,38,0.9)] border">
            <div className="h-12 flex items-center gap-y-2 gap-x-2 caret-[#f9f9fb] px-4">
              <a
                aria-label="larpings.com home"
                href="/"
                className="flex shrink-0 items-center caret-[#f9f9fb] mr-1"
              >
                <span className="font-bold text-xl tracking-tight text-white">larpings<span className="text-[#ff0000] text-[14px] align-middle relative -top-[1px]">@</span>com</span>
              </a>
              <nav className="flex grow basis-[0%] items-center gap-y-1 gap-x-1 caret-[#f9f9fb] pl-4">
                <button className="bg-[rgba(0,0,0,0)] text-[#93939f] leading-[20px] font-medium text-[14px] flex items-center gap-y-1 gap-x-1 caret-[#93939f] [appearance:button] px-3.5 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px]">
                  Shop
                  <Icon1
                    width="24"
                    height="24"
                    className="text-center align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
                  />
                </button>
                <a
                  href="/sold"
                  className="text-[#93939f] leading-[20px] font-medium text-[14px] block caret-[#93939f] px-3.5 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px]"
                >
                  Sold
                </a>
                <a
                  href="/blog"
                  className="text-[#93939f] leading-[20px] font-medium text-[14px] block caret-[#93939f] px-3.5 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px]"
                >
                  Blog
                </a>
                <a
                  href="/about"
                  className="text-[#93939f] leading-[20px] font-medium text-[14px] block caret-[#93939f] px-3.5 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px]"
                >
                  About
                </a>
              </nav>
              <div className="flex items-center gap-y-2 gap-x-2 caret-[#f9f9fb] ml-auto">
                <a
                  aria-label="Account"
                  href="/account"
                  className="text-[#93939f] w-9 h-9 flex justify-center items-center caret-[#93939f] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border"
                >
                  <Icon2
                    width="24"
                    height="24"
                    className="align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
                  />
                </a>
                <a
                  href="/marketplace"
                  className="bg-white text-[#0e0e11] leading-none font-medium text-[14px] flex justify-center items-center gap-y-2 gap-x-2 shadow-[rgba(255,255,255,0.4)_0px_1px_0px_0px_inset,rgba(0,0,0,0.8)_0px_8px_24px_-12px] caret-[#0e0e11] px-4 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] hover:shadow-[0_1px_#fff6_inset,0_14px_34px_-12px_hsl(var(--accent)_/_0.45)] hover:-translate-y-px active:translate-y-0 group"
                >
                  Shop{" "}
                  <Icon3
                    width="24"
                    height="24"
                    className="align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#0e0e11] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#0e0e11]"
                  />
                </a>
                <button
                  aria-label="Open menu"
                  className="bg-[rgba(0,0,0,0)] text-[16px] w-9 h-9 hidden justify-center items-center caret-[#f9f9fb] [appearance:button] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] p-0 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border"
                >
                  <Icon4
                    width="24"
                    height="24"
                    className="text-center align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#f9f9fb] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="h-[68px] caret-[#f9f9fb]"></div>
        <div className="bg-zinc-950 min-h-[765px] caret-[#f9f9fb]">
          <main className="max-w-[1152px] caret-[#f9f9fb] mx-auto pb-24 px-4">
            <nav
              aria-label="Breadcrumb"
              className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase flex flex-wrap items-center gap-y-2 gap-x-2 caret-[#93939f] mb-6"
            >
              <a href="/marketplace" className="block caret-[#93939f]">
                Usernames
              </a>
              <span className="block caret-[#93939f]">/</span>
              <a
                href="/marketplace?platform=telegram"
                className="capitalize block caret-[#93939f]"
              >
                telegram
              </a>
              <span className="block caret-[#93939f]">/</span>
              <span className="text-[#f9f9fb] block caret-[#f9f9fb]">
                @f111fr
              </span>
            </nav>
            <div className="grid gap-y-8 gap-x-8 grid-cols-[1.2fr_1fr] caret-[#f9f9fb]">
              <div className="caret-[#f9f9fb]">
                <div
                  style={{
                    backgroundImage:
                      "radial-gradient(90% 70% at 18% 0%, rgba(255, 0, 0, 0.1), rgba(0, 0, 0, 0) 55%), radial-gradient(70% 60% at 100% 100%, rgba(42, 160, 244, 0.08), rgba(0, 0, 0, 0) 60%), none",
                  }}
                  className="[--hero-hue:0_100%_50%] [--hero-hue2:0_100%_50%] bg-[rgba(17,17,19,0.5)] relative overflow-x-hidden overflow-y-hidden [background-position-x:0%,0%,0%] [background-position-y:0%,0%,0%] [background-repeat:repeat,repeat,repeat] isolate caret-[#f9f9fb] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] rounded-br-[18px] rounded-t-[18px] rounded-bl-[18px] border-[#222226] border"
                >
                  <div
                    aria-hidden="true"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(249, 249, 251, 0.035) 1px, rgba(0, 0, 0, 0) 1px), linear-gradient(90deg, rgba(249, 249, 251, 0.035) 1px, rgba(0, 0, 0, 0) 1px)",
                    }}
                    className="absolute [background-position-x:0%,0%] [background-position-y:0%,0%] [background-repeat:repeat,repeat] bg-[44px_44px,44px_44px] [mask-image:radial-gradient(100%_100%_at_50%_0%,rgb(0,0,0)_40%,rgba(0,0,0,0)_85%)] caret-[#f9f9fb] inset-0"
                  ></div>
                  <span
                    aria-hidden="true"
                    className="text-[rgba(249,249,251,0.04)] leading-none font-semibold text-[547.2px] absolute right-[-4%] block translate-x-0 -translate-y-2/4 caret-[rgba(249,249,251,0.04)] pointer-events-none select-none left-auto top-2/4 bottom-auto"
                  >
                    @
                  </span>
                  <div className="aspect-[16_/_10] relative z-10 flex flex-col caret-[#f9f9fb] px-6 py-5">
                    <div className="flex justify-between items-center caret-[#f9f9fb]">
                      <span className="font-bold text-xl tracking-tight text-white">larpings<span className="text-[#ff0000] text-[14px] align-middle relative -top-[1px]">@</span>com</span>
                      <span className="bg-[rgba(52,211,153,0.1)] text-emerald-400 [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase flex items-center gap-y-1.5 gap-x-1.5 caret-emerald-400 [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-2.5 py-1.5 rounded-br-[8px] rounded-t-[8px] rounded-bl-[8px] border-[rgba(52,211,153,0.35)] border">
                        <span className="bg-emerald-400 w-1.5 h-1.5 block caret-emerald-400 rounded-br-full rounded-t-full rounded-bl-full"></span>{" "}
                        1 of 1 — unique
                      </span>
                    </div>
                    <div className="flex flex-col grow basis-[0%] justify-center items-center caret-[#f9f9fb]">
                      <div className="leading-none text-[60px] text-center text-ellipsis [white-space-collapse:collapse] [text-wrap-mode:nowrap] max-w-full overflow-x-hidden overflow-y-hidden caret-[#f9f9fb] px-2">
                        <span className="text-[#93939f] [text-wrap-mode:nowrap] caret-[#93939f]">
                          @
                        </span>
                        <span className="font-medium [text-wrap-mode:nowrap] caret-[#f9f9fb]">
                          f111fr
                        </span>
                      </div>
                      <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-2 caret-[#f9f9fb] mt-6">
                        <span className="bg-[rgba(9,9,11,0.6)] leading-[16px] font-medium text-[12px] capitalize flex items-center gap-y-1.5 gap-x-1.5 caret-[#f9f9fb] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-3 py-1.5 rounded-br-[8px] rounded-t-[8px] rounded-bl-[8px] border-[#222226] border">
                          <Icon5
                            width="14"
                            height="14"
                            className="align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden caret-[#f9f9fb]"
                          />{" "}
                          telegram
                        </span>
                        <span className="bg-[rgba(9,9,11,0.6)] text-[#b7b7c2] leading-[16px] font-medium text-[12px] flex items-center caret-[#b7b7c2] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-3 py-1.5 rounded-br-[8px] rounded-t-[8px] rounded-bl-[8px] border-[#222226] border">
                          6-letter
                        </span>
                        <span className="bg-[rgba(9,9,11,0.6)] text-[#b7b7c2] leading-[16px] font-medium text-[12px] capitalize flex items-center caret-[#b7b7c2] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-3 py-1.5 rounded-br-[8px] rounded-t-[8px] rounded-bl-[8px] border-[#222226] border">
                          username
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="[animation-delay:80ms] grid gap-y-6 gap-x-6 grid-cols-[repeat(3,minmax(0px,1fr))] caret-[#f9f9fb] mt-6">
                  <div className="caret-[#f9f9fb]">
                    <div className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase caret-[#93939f]">
                      Platform
                    </div>
                    <div className="leading-[20px] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] text-[14px] capitalize caret-[#f9f9fb] mt-1.5">
                      telegram
                    </div>
                  </div>
                  <div className="caret-[#f9f9fb]">
                    <div className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase caret-[#93939f]">
                      Length
                    </div>
                    <div className="leading-[20px] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] text-[14px] caret-[#f9f9fb] mt-1.5">
                      6 characters
                    </div>
                  </div>
                  <div className="caret-[#f9f9fb]">
                    <div className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase caret-[#93939f]">
                      Category
                    </div>
                    <div className="leading-[20px] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] text-[14px] capitalize caret-[#f9f9fb] mt-1.5">
                      username
                    </div>
                  </div>
                </div>
                <div className="[animation-delay:140ms] bg-[#111113] caret-[#f9f9fb] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] mt-6 p-6 rounded-br-[14px] rounded-t-[14px] rounded-bl-[14px] border-[#222226] border">
                  <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase caret-[#93939f]">
                    About this username
                  </span>
                  <p className="text-[#b7b7c2] leading-relaxed text-[14px] [white-space-collapse:preserve-breaks] [text-wrap-mode:wrap] caret-[#b7b7c2] mt-3 mb-0">
                    Telegram username
                  </p>
                </div>
                <div className="[animation-delay:200ms] bg-[#111113] caret-[#f9f9fb] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] mt-6 p-6 rounded-br-[14px] rounded-t-[14px] rounded-bl-[14px] border-[#222226] border">
                  <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase caret-[#93939f]">
                    How the protected transfer works
                  </span>
                  <ol className="list-none caret-[#f9f9fb] mb-0 pl-0">
                    <li className="text-[#b7b7c2] leading-[20px] text-[14px] flex items-start gap-y-3 gap-x-3 list-outside caret-[#b7b7c2]">
                      <span className="text-[#ff0000] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase block caret-[#ff0000] mt-0.5">
                        01
                      </span>
                      Pick your coin and pay on the secure hosted checkout.
                    </li>
                    <li className="text-[#b7b7c2] leading-[20px] text-[14px] flex items-start gap-y-3 gap-x-3 list-outside caret-[#b7b7c2] mt-3.5">
                      <span className="text-[#ff0000] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase block caret-[#ff0000] mt-0.5">
                        02
                      </span>
                      The listing is locked to you while the seller hands the
                      handle over.
                    </li>
                    <li className="text-[#b7b7c2] leading-[20px] text-[14px] flex items-start gap-y-3 gap-x-3 list-outside caret-[#b7b7c2] mt-3.5">
                      <span className="text-[#ff0000] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase block caret-[#ff0000] mt-0.5">
                        03
                      </span>
                      You confirm it's yours — only then the seller gets paid.
                    </li>
                  </ol>
                </div>
              </div>
              <div className="sticky self-start caret-[#f9f9fb] top-24 bottom-auto inset-x-auto">
                <div className="[animation-delay:60ms] bg-[#111113] caret-[#f9f9fb] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] p-6 rounded-br-[18px] rounded-t-[18px] rounded-bl-[18px] border-[#222226] border">
                  <div className="text-emerald-400 [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase inline-flex items-center gap-y-2 gap-x-2 caret-emerald-400">
                    <span className="w-2 h-2 relative flex caret-emerald-400">
                      <span className="bg-emerald-400 w-full h-full absolute flex opacity-[0.0744886] caret-emerald-400 rounded-br-full rounded-t-full rounded-bl-full scale-[1.87585]"></span>
                      <span className="bg-emerald-400 w-2 h-2 relative flex caret-emerald-400 rounded-br-full rounded-t-full rounded-bl-full"></span>
                    </span>
                    Available — reserves instantly
                  </div>
                  <div className="flex justify-between items-end gap-y-4 gap-x-4 caret-[#f9f9fb] mt-5">
                    <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase block caret-[#93939f] pb-2">
                      Price
                    </span>
                    <div className="text-right caret-[#f9f9fb]">
                      <div className="leading-none [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] text-[48px] caret-[#f9f9fb]">
                        $49
                      </div>
                      <div className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase caret-[#93939f] mt-2">
                        All-in · no fees on top
                      </div>
                    </div>
                  </div>
                  <a
                    href="/auth?next=%2Flisting%2F74e04897-b466-4e0d-bc39-8fcbf079982b"
                    className="bg-[rgba(255, 0, 0, 0.06)] flex items-center gap-y-3 gap-x-3 caret-[#f9f9fb] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] mt-6 p-4 rounded-br-[12px] rounded-t-[12px] rounded-bl-[12px] border-[rgba(255, 0, 0, 0.3)] border"
                  >
                    <span className="bg-zinc-950 w-10 h-10 flex shrink-0 justify-center items-center caret-[#f9f9fb] rounded-br-full rounded-t-full rounded-bl-full">
                      <Icon6
                        width="24"
                        height="24"
                        className="align-middle w-5 h-5 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#f9f9fb] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"
                      />
                    </span>
                    <span className="min-w-0 block grow basis-[0%] caret-[#f9f9fb]">
                      <span className="leading-[20px] font-medium text-[14px] block caret-[#f9f9fb]">
                        Sign in to buy — ten seconds
                      </span>
                      <span className="text-[#93939f] leading-relaxed text-[12px] block caret-[#93939f] mt-0.5">
                        Order history, protected checkout, live delivery
                        tracking. You land right back here.
                      </span>
                    </span>
                    <Icon7
                      width="24"
                      height="24"
                      className="text-[#93939f] align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden shrink-0 fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
                    />
                  </a>
                  <div className="caret-[#f9f9fb] mt-6">
                    <div className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase caret-[#93939f] mb-2.5">
                      Pay with
                    </div>
                    <div className="grid gap-y-2 gap-x-2 grid-cols-[repeat(5,minmax(0px,1fr))] caret-[#f9f9fb]">
                      <button
                        type="button"
                        title="Bitcoin"
                        className="bg-[rgba(9,9,11,0.5)] text-[16px] flex flex-col items-center gap-y-1.5 gap-x-1.5 caret-[#f9f9fb] [appearance:button] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-0 py-2.5 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border"
                      >
                        <img
                          src="https://placehold.co/150x150"
                          alt="BTC"
                          width="28"
                          height="28"
                          loading="lazy"
                          className="text-center align-middle w-7 h-7 max-w-full aspect-[auto_28_/_28] block caret-[#f9f9fb]"
                        />
                        <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] text-[10px] text-center block caret-[#93939f]">
                          BTC
                        </span>
                      </button>
                      <button
                        type="button"
                        title="Ethereum"
                        className="bg-[rgba(9,9,11,0.5)] text-[16px] flex flex-col items-center gap-y-1.5 gap-x-1.5 caret-[#f9f9fb] [appearance:button] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-0 py-2.5 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border"
                      >
                        <img
                          src="https://placehold.co/150x150"
                          alt="ETH"
                          width="28"
                          height="28"
                          loading="lazy"
                          className="text-center align-middle w-7 h-7 max-w-full aspect-[auto_28_/_28] block caret-[#f9f9fb]"
                        />
                        <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] text-[10px] text-center block caret-[#93939f]">
                          ETH
                        </span>
                      </button>
                      <button
                        type="button"
                        title="Tether"
                        className="bg-[rgba(9,9,11,0.5)] text-[16px] flex flex-col items-center gap-y-1.5 gap-x-1.5 caret-[#f9f9fb] [appearance:button] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-0 py-2.5 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border"
                      >
                        <img
                          src="https://placehold.co/150x150"
                          alt="USDT"
                          width="28"
                          height="28"
                          loading="lazy"
                          className="text-center align-middle w-7 h-7 max-w-full aspect-[auto_28_/_28] block caret-[#f9f9fb]"
                        />
                        <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] text-[10px] text-center block caret-[#93939f]">
                          USDT
                        </span>
                      </button>
                      <button
                        type="button"
                        title="USD Coin"
                        className="bg-[rgba(9,9,11,0.5)] text-[16px] flex flex-col items-center gap-y-1.5 gap-x-1.5 caret-[#f9f9fb] [appearance:button] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-0 py-2.5 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border"
                      >
                        <img
                          src="https://placehold.co/150x150"
                          alt="USDC"
                          width="28"
                          height="28"
                          loading="lazy"
                          className="text-center align-middle w-7 h-7 max-w-full aspect-[auto_28_/_28] block caret-[#f9f9fb]"
                        />
                        <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] text-[10px] text-center block caret-[#93939f]">
                          USDC
                        </span>
                      </button>
                      <button
                        type="button"
                        title="Solana"
                        className="bg-[rgba(9,9,11,0.5)] text-[16px] flex flex-col items-center gap-y-1.5 gap-x-1.5 caret-[#f9f9fb] [appearance:button] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-0 py-2.5 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border"
                      >
                        <img
                          src="https://placehold.co/150x150"
                          alt="SOL"
                          width="28"
                          height="28"
                          loading="lazy"
                          className="text-center align-middle w-7 h-7 max-w-full aspect-[auto_28_/_28] block caret-[#f9f9fb]"
                        />
                        <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] text-[10px] text-center block caret-[#93939f]">
                          SOL
                        </span>
                      </button>
                      <button
                        type="button"
                        title="Toncoin"
                        className="bg-[rgba(9,9,11,0.5)] text-[16px] flex flex-col items-center gap-y-1.5 gap-x-1.5 caret-[#f9f9fb] [appearance:button] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-0 py-2.5 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border"
                      >
                        <img
                          src="https://placehold.co/150x150"
                          alt="TON"
                          width="28"
                          height="28"
                          loading="lazy"
                          className="text-center align-middle w-7 h-7 max-w-full aspect-[auto_28_/_28] block caret-[#f9f9fb]"
                        />
                        <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] text-[10px] text-center block caret-[#93939f]">
                          TON
                        </span>
                      </button>
                      <button
                        type="button"
                        title="TRON"
                        className="bg-[rgba(9,9,11,0.5)] text-[16px] flex flex-col items-center gap-y-1.5 gap-x-1.5 caret-[#f9f9fb] [appearance:button] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-0 py-2.5 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border"
                      >
                        <img
                          src="https://placehold.co/150x150"
                          alt="TRX"
                          width="28"
                          height="28"
                          loading="lazy"
                          className="text-center align-middle w-7 h-7 max-w-full aspect-[auto_28_/_28] block caret-[#f9f9fb]"
                        />
                        <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] text-[10px] text-center block caret-[#93939f]">
                          TRX
                        </span>
                      </button>
                      <button
                        type="button"
                        title="BNB"
                        className="bg-[rgba(9,9,11,0.5)] text-[16px] flex flex-col items-center gap-y-1.5 gap-x-1.5 caret-[#f9f9fb] [appearance:button] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-0 py-2.5 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border"
                      >
                        <img
                          src="https://placehold.co/150x150"
                          alt="BNB"
                          width="28"
                          height="28"
                          loading="lazy"
                          className="text-center align-middle w-7 h-7 max-w-full aspect-[auto_28_/_28] block caret-[#f9f9fb]"
                        />
                        <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] text-[10px] text-center block caret-[#93939f]">
                          BNB
                        </span>
                      </button>
                      <button
                        type="button"
                        title="Polygon"
                        className="bg-[rgba(9,9,11,0.5)] text-[16px] flex flex-col items-center gap-y-1.5 gap-x-1.5 caret-[#f9f9fb] [appearance:button] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-0 py-2.5 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border"
                      >
                        <span
                          style={{ backgroundImage: "initial" }}
                          className="bg-[#8247e5] text-white font-semibold text-[9px] text-center w-7 h-7 flex justify-center items-center caret-white rounded-br-full rounded-t-full rounded-bl-full"
                        >
                          POL
                        </span>
                        <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] text-[10px] text-center block caret-[#93939f]">
                          POL
                        </span>
                      </button>
                      <button
                        type="button"
                        title="Dai"
                        className="bg-[rgba(9,9,11,0.5)] text-[16px] flex flex-col items-center gap-y-1.5 gap-x-1.5 caret-[#f9f9fb] [appearance:button] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-0 py-2.5 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border"
                      >
                        <img
                          src="https://placehold.co/150x150"
                          alt="DAI"
                          width="28"
                          height="28"
                          loading="lazy"
                          className="text-center align-middle w-7 h-7 max-w-full aspect-[auto_28_/_28] block caret-[#f9f9fb]"
                        />
                        <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] text-[10px] text-center block caret-[#93939f]">
                          DAI
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="caret-[#f9f9fb] mt-5">
                    <a
                      href="/auth?next=%2Flisting%2F74e04897-b466-4e0d-bc39-8fcbf079982b"
                      className="bg-[#ff0000] text-white leading-none font-medium text-[14px] w-full inline-flex justify-center items-center gap-y-2 gap-x-2 shadow-[rgba(255,255,255,0.18)_0px_1px_0px_0px_inset,rgba(255, 0, 0, 0.55)_0px_10px_30px_-12px] caret-white px-[22px] py-3.5 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] hover:bg-[#cc0000] hover:bg-[initial] hover:[background-repeat:initial] hover:[background-clip:initial] hover:[background-origin:initial] hover:[background-attachment:initial] hover:shadow-[0_1px_#ffffff2e_inset,0_16px_40px_-12px_hsl(var(--accent)_/_0.65)] hover:-translate-y-px active:translate-y-0"
                    >
                      Sign in to continue{" "}
                      <Icon8
                        width="24"
                        height="24"
                        className="align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden fill-none stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
                      />
                    </a>
                    <p className="text-[#93939f] text-[11px] flex justify-center items-center gap-y-1.5 gap-x-1.5 caret-[#93939f] mt-3 mb-0">
                      <Icon9
                        width="24"
                        height="24"
                        className="align-middle w-3 h-3 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
                      />{" "}
                      Reserving locks this name to you for 45 minutes while you
                      pay
                    </p>
                    <div className="bg-[rgba(9,9,11,0.4)] caret-[#f9f9fb] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] mt-3 p-3.5 rounded-br-[12px] rounded-t-[12px] rounded-bl-[12px] border-[#222226] border">
                      <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase caret-[#93939f]">
                        How the escrow works
                      </span>
                      <div className="caret-[#f9f9fb] mt-2.5">
                        <div className="caret-[#f9f9fb]">
                          <div className="flex items-center caret-[#f9f9fb]">
                            <div className="flex grow basis-[0%] items-center caret-[#f9f9fb]">
                              <div className="flex flex-col items-center gap-y-1 gap-x-1 caret-[#f9f9fb]">
                                <span className="bg-zinc-950 w-4 h-4 relative z-[1] flex shrink-0 justify-center items-center caret-[#f9f9fb] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] rounded-br-full rounded-t-full rounded-bl-full border-2 border-[#ff0000]">
                                  <span
                                    aria-hidden="true"
                                    className="bg-[rgba(255, 0, 0, 0.4)] absolute block opacity-[0.124148] caret-[#f9f9fb] rounded-br-full rounded-t-full rounded-bl-full scale-[1.87585] inset-0"
                                  ></span>
                                  <span className="bg-[#ff0000] w-1.5 h-1.5 block caret-[#f9f9fb] rounded-br-full rounded-t-full rounded-bl-full"></span>
                                </span>
                                <span className="[font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[9px] tracking-[0.72px] uppercase block caret-[#f9f9fb]">
                                  Paid
                                </span>
                              </div>
                              <div className="bg-[#222226] h-px grow basis-[0%] caret-[#f9f9fb] mb-4 mx-1"></div>
                            </div>
                            <div className="flex grow basis-[0%] items-center caret-[#f9f9fb]">
                              <div className="flex flex-col items-center gap-y-1 gap-x-1 caret-[#f9f9fb]">
                                <span className="bg-zinc-900 w-4 h-4 relative z-[1] flex shrink-0 justify-center items-center caret-[#f9f9fb] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] rounded-br-full rounded-t-full rounded-bl-full border-[#222226] border">
                                  <span className="bg-[rgba(147,147,159,0.4)] w-1 h-1 block caret-[#f9f9fb] rounded-br-full rounded-t-full rounded-bl-full"></span>
                                </span>
                                <span className="text-[rgba(147,147,159,0.6)] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[9px] tracking-[0.72px] uppercase block caret-[rgba(147,147,159,0.6)]">
                                  Deliver
                                </span>
                              </div>
                              <div className="bg-[#222226] h-px grow basis-[0%] caret-[#f9f9fb] mb-4 mx-1"></div>
                            </div>
                            <div className="flex grow basis-[0%] items-center caret-[#f9f9fb]">
                              <div className="flex flex-col items-center gap-y-1 gap-x-1 caret-[#f9f9fb]">
                                <span className="bg-zinc-900 w-4 h-4 relative z-[1] flex shrink-0 justify-center items-center caret-[#f9f9fb] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] rounded-br-full rounded-t-full rounded-bl-full border-[#222226] border">
                                  <span className="bg-[rgba(147,147,159,0.4)] w-1 h-1 block caret-[#f9f9fb] rounded-br-full rounded-t-full rounded-bl-full"></span>
                                </span>
                                <span className="text-[rgba(147,147,159,0.6)] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[9px] tracking-[0.72px] uppercase block caret-[rgba(147,147,159,0.6)]">
                                  Confirm
                                </span>
                              </div>
                              <div className="bg-[#222226] h-px grow basis-[0%] caret-[#f9f9fb] mb-4 mx-1"></div>
                            </div>
                            <div className="flex items-center caret-[#f9f9fb]">
                              <div className="flex flex-col items-center gap-y-1 gap-x-1 caret-[#f9f9fb]">
                                <span className="bg-zinc-900 w-4 h-4 relative z-[1] flex shrink-0 justify-center items-center caret-[#f9f9fb] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] rounded-br-full rounded-t-full rounded-bl-full border-[#222226] border">
                                  <span className="bg-[rgba(147,147,159,0.4)] w-1 h-1 block caret-[#f9f9fb] rounded-br-full rounded-t-full rounded-bl-full"></span>
                                </span>
                                <span className="text-[rgba(147,147,159,0.6)] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[9px] tracking-[0.72px] uppercase block caret-[rgba(147,147,159,0.6)]">
                                  Released
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-y-2 gap-x-2 grid-cols-[repeat(1,minmax(0px,1fr))] caret-[#f9f9fb] mt-6">
                    <div className="bg-[rgba(9,9,11,0.4)] text-[#b7b7c2] leading-[16px] font-medium text-[12px] flex items-center gap-y-2.5 gap-x-2.5 caret-[#b7b7c2] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-3 py-2.5 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border">
                      <Icon10
                        width="24"
                        height="24"
                        className="text-[#ff0000] align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden shrink-0 fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"
                      />{" "}
                      Buyer protection on every order
                    </div>
                    <div className="bg-[rgba(9,9,11,0.4)] text-[#b7b7c2] leading-[16px] font-medium text-[12px] flex items-center gap-y-2.5 gap-x-2.5 caret-[#b7b7c2] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-3 py-2.5 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border">
                      <Icon11
                        width="24"
                        height="24"
                        className="text-[#ff0000] align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden shrink-0 fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"
                      />{" "}
                      Most transfers complete in minutes
                    </div>
                  </div>
                </div>
                <div className="[animation-delay:130ms] bg-[#111113] caret-[#f9f9fb] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] mt-4 p-5 rounded-br-[14px] rounded-t-[14px] rounded-bl-[14px] border-[#222226] border">
                  <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase caret-[#93939f]">
                    Seller
                  </span>
                  <div className="flex items-center gap-y-3 gap-x-3 caret-[#f9f9fb] mt-3">
                    <img
                      src="https://placehold.co/735x555"
                      alt="@nbx"
                      className="align-middle w-10 h-10 max-w-full block object-cover caret-[#f9f9fb] rounded-br-full rounded-t-full rounded-bl-full"
                    />
                    <div className="min-w-0 grow basis-[0%] caret-[#f9f9fb]">
                      <p className="leading-[20px] font-medium text-[14px] text-ellipsis [white-space-collapse:collapse] [text-wrap-mode:nowrap] flex overflow-x-hidden overflow-y-hidden items-center gap-y-1 gap-x-1 caret-[#f9f9fb] my-0">
                        @nbx
                        <Icon12
                          width="24"
                          height="24"
                          className="text-white [text-wrap-mode:nowrap] align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden shrink-0 fill-[#ff0000] stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
                        />
                      </p>
                      <div className="text-[#93939f] leading-[16px] text-[12px] flex items-center gap-y-2 gap-x-2 caret-[#93939f]">
                        <span className="block caret-[#93939f]">0 sales</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-y-1.5 gap-x-1.5 caret-[#f9f9fb] mt-3">
                    <span
                      title="The blue filled seal. Our team verified this seller's identity and track record — the strongest trust signal on larpings.com."
                      className="bg-[#ff0000] text-white font-medium text-[10px] flex items-center gap-y-1.5 gap-x-1.5 caret-white [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-2 py-0.5 rounded-br-full rounded-t-full rounded-bl-full border-[rgba(255, 0, 0, 0.5)] border"
                    >
                      <Icon13
                        width="24"
                        height="24"
                        className="align-middle w-3 h-3 block overflow-x-hidden overflow-y-hidden fill-white stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
                      />
                      Verified
                    </span>
                    <span
                      title="Joined larpings.com in its earliest days. Respect."
                      className="bg-[rgba(52,211,153,0.1)] text-emerald-300 font-medium text-[10px] flex items-center gap-y-1.5 gap-x-1.5 caret-emerald-300 [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-2 py-0.5 rounded-br-full rounded-t-full rounded-bl-full border-[rgba(52,211,153,0.4)] border"
                    >
                      <Icon14
                        width="24"
                        height="24"
                        className="align-middle w-3 h-3 block overflow-x-hidden overflow-y-hidden fill-none stroke-emerald-300 stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-emerald-300"
                      />
                      OG User
                    </span>
                  </div>
                  <button className="bg-[#ff0000] text-white leading-[16px] font-medium text-[12px] w-full inline-flex justify-center items-center gap-y-2 gap-x-2 shadow-[rgba(255,255,255,0.18)_0px_1px_0px_0px_inset,rgba(255, 0, 0, 0.55)_0px_10px_30px_-12px] caret-white [appearance:button] mt-4 px-[22px] py-2.5 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] hover:bg-[#cc0000] hover:bg-[initial] hover:[background-repeat:initial] hover:[background-clip:initial] hover:[background-origin:initial] hover:[background-attachment:initial] hover:shadow-[0_1px_#ffffff2e_inset,0_16px_40px_-12px_hsl(var(--accent)_/_0.65)] hover:-translate-y-px active:translate-y-0">
                    <Icon15
                      width="24"
                      height="24"
                      className="text-center align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden fill-none stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
                    />
                    Contact the seller
                  </button>
                  <div className="flex gap-y-2 gap-x-2 caret-[#f9f9fb] mt-2">
                    <button className="bg-[rgba(0,0,0,0)] text-[#b7b7c2] leading-[16px] font-medium text-[12px] flex grow basis-[0%] justify-center items-center gap-y-1.5 gap-x-1.5 caret-[#b7b7c2] [appearance:button] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-3 py-2 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border">
                      <Icon16
                        width="24"
                        height="24"
                        className="text-center align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#b7b7c2] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#b7b7c2]"
                      />{" "}
                      Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <div className="bg-[#0d0d0f] relative overflow-x-hidden overflow-y-hidden caret-[#f9f9fb] mt-24 border-b-0 border-x-0 border-t border-[#222226]">
            <div className="max-w-[1152px] caret-[#f9f9fb] mx-auto px-4">
              <div className="flex justify-between items-center gap-y-6 gap-x-6 caret-[#f9f9fb] py-10 border-t-0 border-x-0 border-b border-[#222226]">
                <div className="caret-[#f9f9fb]">
                  <h3 className="leading-[28px] font-medium text-[18px] tracking-[-0.54px] caret-[#f9f9fb] my-0">
                    Never miss a drop
                  </h3>
                  <p className="text-[#93939f] leading-[20px] text-[14px] caret-[#93939f] mt-1 mb-0">
                    One email when rare names hit the marketplace. No spam,
                    unsubscribe anytime.
                  </p>
                </div>
                <form className="w-full max-w-[448px] flex gap-y-2 gap-x-2 caret-[#f9f9fb] mb-0" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading" || status === "success"}
                    className="bg-zinc-950 leading-[20px] text-[14px] h-11 block grow basis-[0%] caret-[#f9f9fb] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-4 py-0 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] border-[#222226] border disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="bg-white text-[#0e0e11] leading-none font-medium text-[14px] h-11 flex shrink-0 justify-center items-center gap-y-2 gap-x-2 shadow-[rgba(255,255,255,0.4)_0px_1px_0px_0px_inset,rgba(0,0,0,0.8)_0px_8px_24px_-12px] caret-[#0e0e11] [appearance:button] px-[22px] py-0 rounded-br-[10px] rounded-t-[10px] rounded-bl-[10px] hover:shadow-[0_1px_#fff6_inset,0_14px_34px_-12px_hsl(var(--accent)_/_0.45)] hover:-translate-y-px active:translate-y-0 group disabled:opacity-50"
                  >
                    {status === "success" ? "Subscribed!" : status === "loading" ? "..." : "Get alerts"}{" "}
                    {status !== "success" && status !== "loading" && (
                      <Icon17
                        width="24"
                        height="24"
                        className="text-center align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#0e0e11] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#0e0e11]"
                      />
                    )}
                  </button>
                </form>
              </div>
              <div className="grid gap-y-10 gap-x-6 grid-cols-[repeat(6,minmax(0px,1fr))] caret-[#f9f9fb] py-12">
                <div className="col-start-[span_2] col-end-[span_2] caret-[#f9f9fb]">
                  <span className="font-bold text-xl tracking-tight text-white">larpings.com</span>
                  <p className="text-[#93939f] leading-relaxed text-[14px] max-w-80 caret-[#93939f] mb-0">
                    The marketplace for rare usernames. Instant crypto checkout,
                    protected delivery, crypto payouts.
                  </p>
                  <div className="flex flex-wrap gap-y-2 gap-x-2 caret-[#f9f9fb] mt-5">
                    <span className="text-[#93939f] font-medium text-[11px] flex items-center gap-y-1.5 gap-x-1.5 caret-[#93939f] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-2.5 py-1.5 rounded-br-[8px] rounded-t-[8px] rounded-bl-[8px] border-[#222226] border">
                      <Icon18
                        width="24"
                        height="24"
                        className="text-[#ff0000] align-middle w-3 h-3 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"
                      />{" "}
                      Instant crypto checkout
                    </span>
                    <span className="text-[#93939f] font-medium text-[11px] flex items-center gap-y-1.5 gap-x-1.5 caret-[#93939f] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] px-2.5 py-1.5 rounded-br-[8px] rounded-t-[8px] rounded-bl-[8px] border-[#222226] border">
                      <Icon19
                        width="24"
                        height="24"
                        className="text-[#ff0000] align-middle w-3 h-3 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#ff0000] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#ff0000]"
                      />{" "}
                      Buyer protection
                    </span>
                  </div>
                </div>
                <nav aria-label="Marketplace" className="caret-[#f9f9fb]">
                  <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase caret-[#93939f]">
                    Marketplace
                  </span>
                  <ul className="list-none caret-[#f9f9fb] mb-0 pl-0">
                    <li className="list-outside caret-[#f9f9fb]">
                      <a
                        href="/marketplace"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        All handles
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/marketplace?category=username"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        Usernames
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/marketplace?category=account"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        Accounts
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/sold"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        Sold archive
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/ranks"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        Top sellers
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/sell"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        Sell a handle
                      </a>
                    </li>
                  </ul>
                </nav>
                <nav aria-label="Platforms" className="caret-[#f9f9fb]">
                  <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase caret-[#93939f]">
                    Platforms
                  </span>
                  <ul className="list-none caret-[#f9f9fb] mb-0 pl-0">
                    <li className="list-outside caret-[#f9f9fb]">
                      <a
                        href="/marketplace?platform=instagram"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        Instagram
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/marketplace?platform=tiktok"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        TikTok
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/marketplace?platform=twitter"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        X / Twitter
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/marketplace?platform=snapchat"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        Snapchat
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/marketplace?platform=telegram"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        Telegram
                      </a>
                    </li>
                  </ul>
                </nav>
                <nav aria-label="Company" className="caret-[#f9f9fb]">
                  <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase caret-[#93939f]">
                    Company
                  </span>
                  <ul className="list-none caret-[#f9f9fb] mb-0 pl-0">
                    <li className="list-outside caret-[#f9f9fb]">
                      <a
                        href="/about"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        About us
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/legit"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        Are we legit?
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/blog"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        Blog
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/contact"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        Contact
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/support"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        Support
                      </a>
                    </li>
                  </ul>
                </nav>
                <nav aria-label="Resources" className="caret-[#f9f9fb]">
                  <span className="text-[#93939f] [font-family:'JetBrains_Mono',ui-monospace,monospace,system-ui,sans-serif] font-medium text-[11px] tracking-[1.76px] uppercase caret-[#93939f]">
                    Resources
                  </span>
                  <ul className="list-none caret-[#f9f9fb] mb-0 pl-0">
                    <li className="list-outside caret-[#f9f9fb]">
                      <a
                        href="/guides"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        All guides
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/guides/how-to-buy-instagram-username"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        How to buy a username
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/guides/3-letter-instagram-usernames"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        3-letter usernames
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/guides/4-letter-usernames"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        4-letter usernames
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/terms"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        Terms of service
                      </a>
                    </li>
                    <li className="list-outside caret-[#f9f9fb] mt-2.5">
                      <a
                        href="/privacy"
                        className="text-[#b7b7c2] leading-[20px] text-[14px] caret-[#b7b7c2]"
                      >
                        Privacy policy
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="text-[#93939f] text-[13px] flex justify-between items-center gap-y-4 gap-x-4 caret-[#93939f] py-6 border-b-0 border-x-0 border-t border-[#222226]">
                <p className="caret-[#93939f] my-0">
                  © 2026 larpings.com — All rights reserved.
                </p>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 caret-[#93939f]">
                  <a
                    href="/it/username-instagram-in-vendita"
                    className="block caret-[#93939f]"
                  >
                    Italiano
                  </a>
                  <a
                    href="/es/comprar-usuario-instagram"
                    className="block caret-[#93939f]"
                  >
                    Español
                  </a>
                  <a
                    href="/de/instagram-benutzername-kaufen"
                    className="block caret-[#93939f]"
                  >
                    Deutsch
                  </a>
                  <a
                    href="/fr/acheter-pseudo-instagram"
                    className="block caret-[#93939f]"
                  >
                    Français
                  </a>
                  <a href="/support" className="block caret-[#93939f]">
                    Support — chat with @Guardian
                  </a>
                </div>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="overflow-x-hidden overflow-y-hidden caret-[#f9f9fb] pointer-events-none select-none"
            >
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255, 0, 0, 0.14), rgba(0, 0, 0, 0) 78%)",
                }}
                className="mb-[-36px] text-[rgba(0,0,0,0)] leading-[0.8] font-semibold text-[208px] tracking-[-5.2px] text-center max-w-[1152px] bg-clip-text caret-[rgba(0,0,0,0)] pointer-events-none select-none mx-auto"
              >
                larpings.com
              </div>
            </div>
          </div>
        </div>
        <nav
          aria-label="Quick navigation"
          className="fixed z-40 caret-[#f9f9fb] top-auto bottom-3 inset-x-3"
        >
          <div className="bg-[rgba(255,255,255,0.05)] h-16 max-w-[448px] relative grid items-center grid-cols-[repeat(5,minmax(0px,1fr))] shadow-[rgba(255,255,255,0.14)_0px_1px_0px_0px_inset,rgba(0,0,0,0.35)_0px_-1px_0px_0px_inset,rgba(0,0,0,0.55)_0px_18px_50px_0px] backdrop-blur-2xl backdrop-saturate-150 caret-[#f9f9fb] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] mx-auto rounded-br-full rounded-t-full rounded-bl-full border-[rgba(255,255,255,0.1)] border">
            <div
              aria-hidden="true"
              style={{ transform: "translate(100%, 0px) translate(0px, -50%)" }}
              className="[transition-behavior:normal,normal] duration-[0.55s,0.25s] ease-[cubic-bezier(0.3,1.4,0.45,1),ease] delay-[0s,0s] transition-[transform,opacity] opacity-100 w-1/5 h-12 absolute caret-[#f9f9fb] pointer-events-none left-0 right-auto top-2/4 bottom-auto"
            >
              <div className="bg-[rgba(255,255,255,0.12)] h-full shadow-[rgba(255,255,255,0.25)_0px_1px_0px_0px_inset,rgba(0,0,0,0.18)_0px_-6px_14px_0px_inset,rgba(0,0,0,0.35)_0px_6px_18px_0px] backdrop-blur-xl caret-[#f9f9fb] pointer-events-none [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] mx-1.5 rounded-br-full rounded-t-full rounded-bl-full border-[rgba(255,255,255,0.2)] border"></div>
            </div>
            <a
              aria-label="Home"
              href="/"
              className="text-[#93939f] h-full relative z-10 flex justify-center items-center caret-[#93939f]"
            >
              <Icon20
                width="24"
                height="24"
                className="align-middle w-6 h-6 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
              />
            </a>
            <a
              aria-label="Marketplace"
              href="/marketplace"
              className="h-full relative z-10 flex justify-center items-center caret-[#f9f9fb]"
            >
              <Icon21
                width="24"
                height="24"
                className="align-middle w-6 h-6 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#f9f9fb] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#f9f9fb]"
              />
            </a>
            <a
              aria-label="Messages"
              href="/messages"
              className="text-[#93939f] h-full relative z-10 flex justify-center items-center caret-[#93939f]"
            >
              <Icon22
                width="24"
                height="24"
                className="align-middle w-7 h-7 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
              />
            </a>
            <a
              aria-label="Orders"
              href="/orders"
              className="text-[#93939f] h-full relative z-10 flex justify-center items-center caret-[#93939f]"
            >
              <Icon23
                width="24"
                height="24"
                className="align-middle w-6 h-6 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
              />
            </a>
            <a
              aria-label="Account"
              href="/account"
              className="text-[#93939f] h-full relative z-10 flex justify-center items-center caret-[#93939f]"
            >
              <Icon24
                width="24"
                height="24"
                className="align-middle w-6 h-6 block overflow-x-hidden overflow-y-hidden fill-none stroke-[#93939f] stroke-[1.8px] [stroke-linecap:round] [stroke-linejoin:round] caret-[#93939f]"
              />
            </a>
          </div>
        </nav>
        <button
          aria-label="Open chat"
          className="bg-[#ff0000] text-white text-[16px] w-14 h-14 fixed z-[60] flex justify-center items-center shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_20px_25px_-5px,rgba(0,0,0,0.1)_0px_8px_10px_-6px] caret-white [appearance:button] p-0 rounded-br-full rounded-t-full rounded-bl-full left-auto right-5 top-auto bottom-24"
        >
          <Icon25
            width="24"
            height="24"
            className="text-center align-middle w-6 h-6 block overflow-x-hidden overflow-y-hidden fill-none stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] caret-white"
          />
        </button>
      </div>

      <div
        data-was-iframe="true"
        data-sd-iframe-type="same-origin"
        className="align-middle w-px h-px absolute overflow-x-clip overflow-y-clip invisible caret-[#f9f9fb] left-0 right-auto top-0 bottom-auto"
      >
        <div className="bg-white [font-family:'Times_New_Roman',system-ui,sans-serif] m-2"></div>
      </div>
    </div>
  );
}
