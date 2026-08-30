import React, { useState } from "react";

export interface TourStep {
  title: string;
  body: string;
}

interface TourTooltipProps {
  steps: TourStep[];
  onDone?: () => void;
  tourId?: string;
}

export default function TourTooltip({ steps, onDone, tourId = "default_tour" }: TourTooltipProps) {
  const [current, setCurrent] = useState(0);
  const storageKey = `larpings_tour_dismissed_${tourId}`;
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem(storageKey) === 'true';
  });

  if (dismissed || steps.length === 0) return null;

  const step = steps[current];
  const total = steps.length;
  const isLast = current === total - 1;

  const dismissTour = () => {
    setDismissed(true);
    localStorage.setItem(storageKey, 'true');
    onDone?.();
  };

  const handleNext = () => {
    if (isLast) {
      dismissTour();
    } else {
      setCurrent(c => c + 1);
    }
  };

  const handleSkip = () => {
    dismissTour();
  };

  return (
    <div
      className="fixed bottom-24 right-4 z-[70] w-[240px] animate-[mkt-enter_0.3s_ease_forwards] sm:bottom-28 sm:right-5 sm:w-[300px]"
      role="dialog"
      aria-label="Tour tooltip"
    >
      {/* Card */}
      <div className="bg-[#111113] border border-[#333338] rounded-[10px] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3 pt-3 pb-2.5 border-b border-[#222226] sm:px-4 sm:pt-4 sm:pb-3">
          <span className="font-semibold text-[13px] text-[#f9f9fb] leading-tight sm:text-[15px]">{step.title}</span>
          <span className="[font-family:'JetBrains_Mono',ui-monospace,monospace] text-[9px] text-[#93939f] font-medium shrink-0 ml-2 sm:ml-3 sm:text-[11px]">
            {current + 1} / {total}
          </span>
        </div>

        {/* Body */}
        <p className="px-3 py-3 text-[11px] leading-relaxed text-[#b7b7c2] sm:px-4 sm:text-[13px]">
          {step.body}
        </p>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5 px-3 pb-2.5 sm:px-4 sm:pb-3">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all ${i === current ? "w-4 bg-[#ff0000]" : "w-1 bg-[#333338] hover:bg-[#555]"}`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 px-3 pb-3 sm:px-4 sm:pb-4">
          <button
            onClick={handleSkip}
            className="text-[#93939f] text-[10px] font-medium hover:text-white transition-colors sm:text-[13px]"
          >
            Skip tour
          </button>
          <button
            onClick={handleNext}
            className="bg-[#ff0000] text-white font-medium text-[11px] px-4 py-2 rounded-[8px] shadow-[rgba(255,0,0,0.3)_0px_4px_14px_-4px] hover:-translate-y-px active:translate-y-0 transition-all sm:px-5 sm:text-[13px]"
          >
            {isLast ? "Got it" : "Next →"}
          </button>
        </div>
      </div>

      {/* Tail */}
      <div className="absolute -bottom-[7px] right-7 w-3.5 h-3.5 bg-[#111113] border-r border-b border-[#333338] rotate-45" />
    </div>
  );
}
