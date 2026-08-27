import React, { useState } from "react";

export interface TourStep {
  title: string;
  body: string;
}

interface TourTooltipProps {
  steps: TourStep[];
  onDone?: () => void;
}

export default function TourTooltip({ steps, onDone }: TourTooltipProps) {
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || steps.length === 0) return null;

  const step = steps[current];
  const total = steps.length;
  const isLast = current === total - 1;

  const handleNext = () => {
    if (isLast) {
      setDismissed(true);
      onDone?.();
    } else {
      setCurrent(c => c + 1);
    }
  };

  const handleSkip = () => {
    setDismissed(true);
    onDone?.();
  };

  return (
    <div
      className="fixed bottom-32 right-5 z-[70] w-[300px] animate-[mkt-enter_0.3s_ease_forwards]"
      role="dialog"
      aria-label="Tour tooltip"
    >
      {/* Card */}
      <div className="bg-[#111113] border border-[#333338] rounded-[14px] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[#222226]">
          <span className="font-semibold text-[15px] text-[#f9f9fb] leading-tight">{step.title}</span>
          <span className="[font-family:'JetBrains_Mono',ui-monospace,monospace] text-[11px] text-[#93939f] font-medium shrink-0 ml-3">
            {current + 1} / {total}
          </span>
        </div>

        {/* Body */}
        <p className="px-4 py-3 text-[13px] leading-relaxed text-[#b7b7c2]">
          {step.body}
        </p>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5 px-4 pb-3">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${i === current ? "w-5 bg-[#ff0000]" : "w-1.5 bg-[#333338] hover:bg-[#555]"}`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 px-4 pb-4">
          <button
            onClick={handleSkip}
            className="text-[#93939f] text-[13px] font-medium hover:text-white transition-colors"
          >
            Skip tour
          </button>
          <button
            onClick={handleNext}
            className="bg-[#ff0000] text-white font-medium text-[13px] px-5 py-2 rounded-[9px] shadow-[rgba(255,0,0,0.3)_0px_4px_14px_-4px] hover:-translate-y-px active:translate-y-0 transition-all"
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
