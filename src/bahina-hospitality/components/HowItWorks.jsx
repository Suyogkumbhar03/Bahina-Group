import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, CalendarCheck, PhoneCall, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { WarliBullockCart } from "./ConstructionTimeline";
import { BlockPrintDivider, BlockPrintCorner } from "./BlockPrintMotif";

export function HowItWorks({ className = "" }) {
  const { t } = useLanguage();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.25"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const cartX = useTransform(scrollYProgress, [0.1, 0.45, 0.85], ["0%", "50%", "100%"]);

  const steps = [
    {
      number: "01",
      icon: Search,
      titleKey: "hosp.howItWorks.step1Title",
      descKey: "hosp.howItWorks.step1Desc",
      stopHint: "Choose farmhouse & dates",
    },
    {
      number: "02",
      icon: CalendarCheck,
      titleKey: "hosp.howItWorks.step2Title",
      descKey: "hosp.howItWorks.step2Desc",
      stopHint: "Send stay request",
    },
    {
      number: "03",
      icon: PhoneCall,
      titleKey: "hosp.howItWorks.step3Title",
      descKey: "hosp.howItWorks.step3Desc",
      stopHint: "Our team coordinates",
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className={`w-full py-16 sm:py-24 relative overflow-hidden bg-[#FFF4D9]/60 rounded-3xl border border-[#1C2B4F]/10 px-4 sm:px-8 my-10 ${className}`}
    >
      <BlockPrintCorner position="top-right" size={56} className="text-[#1C2B4F]" />
      <BlockPrintCorner position="bottom-left" size={56} className="text-[#1C2B4F]" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3 relative z-10">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C2B4F]/10 text-xs font-extrabold uppercase tracking-widest text-[#BA4A21]">
          <Sparkles className="w-3.5 h-3.5 text-[#F4A62A]" />
          <span>{t("hosp.howItWorks.eyebrow", "Effortless Countryside Escapes")}</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1C2B4F] leading-tight">
          {t("hosp.howItWorks.heading", "How Booking Works")}
        </h2>
        <p className="text-sm sm:text-base text-[#1F1B2D]/80 leading-relaxed max-w-xl mx-auto">
          {t(
            "hosp.howItWorks.lead",
            "A transparent, respectful, and direct way to plan your private countryside stay."
          )}
        </p>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP VILLAGE PATH (Interactive SVG + Bullock Cart)        */}
      {/* ============================================================ */}
      <div className="hidden md:block max-w-5xl mx-auto relative z-10 pb-10">
        {/* Animated Warli Bullock Cart tracking along path */}
        <div className="relative h-12 mb-2 px-8">
          <motion.div
            style={{ left: cartX }}
            className="absolute top-0 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFDF8] border-2 border-[#1C2B4F] shadow-lg text-[#BA4A21]"
          >
            <WarliBullockCart className="w-8 h-6 text-[#BA4A21]" />
            <span className="text-xs font-bold text-[#1C2B4F]">Village Path</span>
          </motion.div>
        </div>

        {/* SVG Winding Dotted Path */}
        <div className="relative w-full h-16 mb-4">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 1000 60"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Background dashed guideline */}
            <path
              d="M 50 30 C 250 60, 350 0, 500 30 C 650 60, 750 0, 950 30"
              stroke="#1C2B4F"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeOpacity="0.25"
            />
            {/* Scroll-drawn progress stroke */}
            <motion.path
              d="M 50 30 C 250 60, 350 0, 500 30 C 650 60, 750 0, 950 30"
              stroke="#BA4A21"
              strokeWidth="3.5"
              strokeDasharray="6 6"
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* 3 Interactive Destination Stops */}
        <div className="grid grid-cols-3 gap-8">
          {steps.map((st, i) => {
            const IconComp = st.icon;
            return (
              <div
                key={st.number}
                className="group relative rounded-3xl bg-[#FFFDF8] border-2 border-[#1C2B4F]/20 p-7 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-[#1C2B4F] text-[#F4A62A] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="font-extrabold text-2xl text-[#BA4A21]/60">
                      {st.number}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#1C2B4F] leading-snug">
                    {t(st.titleKey)}
                  </h3>

                  <p className="text-sm text-[#1F1B2D]/80 leading-relaxed">
                    {t(st.descKey)}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-[#1C2B4F]/10 flex items-center justify-between text-xs font-bold text-[#BA4A21] uppercase tracking-wider">
                  <span>Stop {st.number}</span>
                  <span className="text-[#35508C]">{st.stopHint}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE VILLAGE PATH (Clean Vertical Path without cart)       */}
      {/* ============================================================ */}
      <div className="md:hidden relative max-w-lg mx-auto pl-6 space-y-6 z-10">
        {/* Vertical Dotted Path */}
        <div className="absolute top-6 bottom-6 left-[21px] w-[2px] border-l-2 border-dashed border-[#1C2B4F]/30 pointer-events-none" />

        {steps.map((st) => {
          const IconComp = st.icon;
          return (
            <div key={st.number} className="relative flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#1C2B4F] text-[#F4A62A] flex items-center justify-center font-bold text-xs shrink-0 mt-1 shadow-md border-2 border-white">
                {st.number}
              </div>

              <div className="flex-1 bg-[#FFFDF8] border border-[#1C2B4F]/20 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#BA4A21]">
                  <IconComp className="w-4 h-4 text-[#BA4A21]" />
                  <span>Step {st.number}</span>
                </div>
                <h3 className="text-lg font-extrabold text-[#1C2B4F] leading-snug">
                  {t(st.titleKey)}
                </h3>
                <p className="text-sm text-[#1F1B2D]/80 leading-relaxed">
                  {t(st.descKey)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HowItWorks;
