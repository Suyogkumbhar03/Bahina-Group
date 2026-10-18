import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { BlockPrintDivider } from "./BlockPrintMotif";

// Hand-drawn Warli-style bullock cart line art
export function WarliBullockCart({ className = "w-10 h-7 text-[#BA4A21]" }) {
  return (
    <svg
      viewBox="0 0 48 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Wooden Cart Frame */}
      <path d="M12 18 L32 18 L36 12 L8 12 Z" />
      {/* Front yoke shaft */}
      <path d="M32 18 L44 14" />
      {/* Spoked Wheel Left */}
      <circle cx="16" cy="22" r="6" />
      <line x1="16" y1="16" x2="16" y2="28" />
      <line x1="10" y1="22" x2="22" y2="22" />
      {/* Spoked Wheel Right */}
      <circle cx="28" cy="22" r="6" />
      <line x1="28" y1="16" x2="28" y2="28" />
      <line x1="22" y1="22" x2="34" y2="22" />
      {/* Warli Driver (Geometric triangles) */}
      <polygon points="20,11 16,6 24,6" fill="currentColor" />
      <circle cx="20" cy="4" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function ConstructionTimeline({ currentStep = 3, className = "" }) {
  const { t } = useLanguage();

  const steps = [
    { number: 1, titleKey: "hosp.timeline.step1", descKey: "hosp.timeline.step1Desc" },
    { number: 2, titleKey: "hosp.timeline.step2", descKey: "hosp.timeline.step2Desc" },
    { number: 3, titleKey: "hosp.timeline.step3", descKey: "hosp.timeline.step3Desc" },
    { number: 4, titleKey: "hosp.timeline.step4", descKey: "hosp.timeline.step4Desc" },
    { number: 5, titleKey: "hosp.timeline.step5", descKey: "hosp.timeline.step5Desc" },
  ];

  return (
    <div className={`w-full bg-[#FFFDF8] border border-[#1C2B4F]/20 rounded-3xl p-5 sm:p-8 md:p-10 shadow-md ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-[#1C2B4F]/10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6ECF7] text-xs font-bold text-[#1C2B4F]">
            <Sparkles className="w-3.5 h-3.5 text-[#F4A62A]" />
            <span>Stage {currentStep} of {steps.length} Active</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1C2B4F]">
            {t("hosp.timeline.heading", "Live Construction Milestone Progress")}
          </h3>
          <p className="text-sm text-[#1F1B2D]/80">
            {t(
              "hosp.timeline.lead",
              "Transparent milestone updates from our master craftsmen on site."
            )}
          </p>
        </div>

        {/* Small Warli bullock cart banner */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFF4D9] border border-[#F4A62A]/40 text-xs font-bold text-[#1C2B4F]">
          <WarliBullockCart className="w-8 h-6 text-[#BA4A21]" />
          <span>Milestone Path</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP PATH: Alternating cards above & below center track  */}
      {/* ============================================================ */}
      <div className="hidden md:block relative pt-12 pb-12">
        {/* Horizontal Dotted Village Path */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[3px] border-t-2 border-dashed border-[#1C2B4F]/30 z-0 pointer-events-none" />

        <div className="grid grid-cols-5 gap-4 relative z-10">
          {steps.map((st, idx) => {
            const isCompleted = st.number < currentStep;
            const isCurrent = st.number === currentStep;
            const isUpcoming = st.number > currentStep;
            const isAbove = idx % 2 === 0; // Steps 1, 3, 5 sit above path; 2, 4 sit below path

            return (
              <div key={st.number} className="relative flex flex-col items-center">
                {/* CARD (If Above) */}
                {isAbove ? (
                  <div className="w-full mb-10 flex flex-col justify-end min-h-[140px]">
                    <div
                      className={`p-3.5 rounded-2xl border transition-all duration-300 text-center ${
                        isCurrent
                          ? "bg-[#FFF4D9] border-[#F4A62A] shadow-md ring-2 ring-[#F4A62A]/50"
                          : isCompleted
                          ? "bg-[#E6ECF7]/60 border-[#1C2B4F]/15"
                          : "bg-white/60 border-dashed border-[#1C2B4F]/20 opacity-75"
                      }`}
                    >
                      <span className="text-[12px] font-bold uppercase tracking-wider text-[#BA4A21] block">
                        Stage 0{st.number}
                      </span>
                      <h4 className="font-extrabold text-sm text-[#1C2B4F] mt-1 leading-snug">
                        {t(st.titleKey)}
                      </h4>
                      <p className="text-xs text-[#1F1B2D]/80 mt-1 leading-relaxed">
                        {t(st.descKey)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full mb-10 min-h-[140px]" />
                )}

                {/* NODE on the Central Path */}
                <div className="relative z-20 my-2 flex items-center justify-center">
                  {isCompleted ? (
                    <div className="w-10 h-10 rounded-full bg-[#1C2B4F] text-white flex items-center justify-center shadow-md border-2 border-white">
                      <Check className="w-5 h-5 text-white stroke-[3]" />
                    </div>
                  ) : isCurrent ? (
                    <div className="relative flex items-center justify-center">
                      <span className="absolute -inset-2 rounded-full bg-[#F4A62A] opacity-40 animate-ping" />
                      <div className="w-12 h-12 rounded-full bg-[#F4A62A] text-[#1C2B4F] flex items-center justify-center font-extrabold text-sm shadow-lg border-2 border-[#1C2B4F]">
                        <WarliBullockCart className="w-7 h-5 text-[#1C2B4F]" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-[#1C2B4F]/40 text-[#1C2B4F]/60 flex items-center justify-center font-bold text-xs shadow-xs">
                      0{st.number}
                    </div>
                  )}
                </div>

                {/* CARD (If Below) */}
                {!isAbove ? (
                  <div className="w-full mt-10 flex flex-col justify-start min-h-[140px]">
                    <div
                      className={`p-3.5 rounded-2xl border transition-all duration-300 text-center ${
                        isCurrent
                          ? "bg-[#FFF4D9] border-[#F4A62A] shadow-md ring-2 ring-[#F4A62A]/50"
                          : isCompleted
                          ? "bg-[#E6ECF7]/60 border-[#1C2B4F]/15"
                          : "bg-white/60 border-dashed border-[#1C2B4F]/20 opacity-75"
                      }`}
                    >
                      <span className="text-[12px] font-bold uppercase tracking-wider text-[#BA4A21] block">
                        Stage 0{st.number}
                      </span>
                      <h4 className="font-extrabold text-sm text-[#1C2B4F] mt-1 leading-snug">
                        {t(st.titleKey)}
                      </h4>
                      <p className="text-xs text-[#1F1B2D]/80 mt-1 leading-relaxed">
                        {t(st.descKey)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full mt-10 min-h-[140px]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE PATH: Vertical dotted trail with left spine          */}
      {/* ============================================================ */}
      <div className="md:hidden relative pl-6 space-y-6">
        {/* Vertical Dotted Line */}
        <div className="absolute top-4 bottom-4 left-[21px] w-[2px] border-l-2 border-dashed border-[#1C2B4F]/30 pointer-events-none" />

        {steps.map((st) => {
          const isCompleted = st.number < currentStep;
          const isCurrent = st.number === currentStep;

          return (
            <div key={st.number} className="relative flex items-start gap-4">
              {/* Node on Vertical Track */}
              <div className="relative z-10 shrink-0 mt-1">
                {isCompleted ? (
                  <div className="w-9 h-9 rounded-full bg-[#1C2B4F] text-white flex items-center justify-center shadow-sm">
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                  </div>
                ) : isCurrent ? (
                  <div className="relative">
                    <span className="absolute -inset-1 rounded-full bg-[#F4A62A] opacity-50 animate-ping" />
                    <div className="w-9 h-9 rounded-full bg-[#F4A62A] text-[#1C2B4F] border-2 border-[#1C2B4F] flex items-center justify-center font-bold shadow-md">
                      <span className="text-xs font-black">0{st.number}</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-white border border-[#1C2B4F]/30 text-[#1C2B4F]/60 flex items-center justify-center font-bold text-xs">
                    0{st.number}
                  </div>
                )}
              </div>

              {/* Milestone Details Card */}
              <div
                className={`flex-1 p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? "bg-[#FFF4D9] border-[#F4A62A] shadow-md ring-1 ring-[#F4A62A]"
                    : isCompleted
                    ? "bg-[#E6ECF7]/50 border-[#1C2B4F]/15"
                    : "bg-white border-[#1C2B4F]/10 opacity-80"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#BA4A21]">
                    Stage 0{st.number}
                  </span>
                  {isCurrent && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#F4A62A] text-[#1C2B4F]">
                      Active
                    </span>
                  )}
                  {isCompleted && (
                    <span className="text-[11px] font-bold text-[#1C2B4F]">
                      ✓ Completed
                    </span>
                  )}
                </div>
                <h4 className="text-base font-extrabold text-[#1C2B4F] mt-1 leading-snug">
                  {t(st.titleKey)}
                </h4>
                <p className="text-sm text-[#1F1B2D]/80 mt-1 leading-relaxed">
                  {t(st.descKey)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ConstructionTimeline;
