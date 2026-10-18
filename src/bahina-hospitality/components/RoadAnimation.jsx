import React, { useEffect, useState, useRef } from "react";
import { MapPin, Compass } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animated road visualization connecting Kolhapur to Radhanagari (~46 km).
 * Draws an SVG path with an moving Warli-style vehicle on scroll.
 * Uses ScrollTrigger: start "top 80%", end "center 45%", scrub 0.6.
 * Reaches exactly 1 before the section leaves the screen.
 */
export function RoadAnimation() {
  const { t, language } = useLanguage();
  const isMr = language === "mr";
  const containerRef = useRef(null);

  const isReducedMotion =
    (typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) ||
    (typeof navigator !== "undefined" &&
      Boolean(navigator.connection?.saveData));

  const [progress, setProgress] = useState(isReducedMotion ? 1 : 0);

  useEffect(() => {
    if (isReducedMotion) {
      setProgress(1);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    let st = null;
    try {
      st = ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        end: "center 45%",
        scrub: 0.6,
        onUpdate: (self) => {
          let p = self.progress;
          // Clamp progress between 0 and 1. If progress >= 0.98 snap to 1.
          if (p >= 0.98) p = 1;
          else if (p < 0) p = 0;
          setProgress(p);
        },
      });
    } catch (err) {
      console.warn("ScrollTrigger creation failed:", err);
    }

    // Time-based animation fallback (1.2s) when section is 50% visible (if page is short or ScrollTrigger absent)
    let observer = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Trigger refresh to ensure geometry is synchronized
            ScrollTrigger.refresh();
          }
        },
        { threshold: [0.5] }
      );
      observer.observe(element);
    }

    // Call ScrollTrigger.refresh() on language change, fonts loaded, images loaded, resize
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleRefresh);
    window.addEventListener("load", handleRefresh);
    if (document.fonts?.ready) {
      document.fonts.ready.then(handleRefresh);
    }
    const timer = setTimeout(handleRefresh, 150);

    return () => {
      if (st) st.kill();
      if (observer) observer.disconnect();
      window.removeEventListener("resize", handleRefresh);
      window.removeEventListener("load", handleRefresh);
      clearTimeout(timer);
    };
  }, [isReducedMotion, language]);

  const isArrived = progress >= 1;
  // Calculate bus horizontal position from 0% (Kolhapur) to 100% (Radhanagari)
  const cartLeftPercent = Math.min(Math.max(progress * 100, 0), 100);

  return (
    <div
      ref={containerRef}
      className="my-12 rounded-3xl border border-[#E2E7E3] bg-white p-6 md:p-10 shadow-soft"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FAF0EC] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#B5472A]">
            <Compass className="h-3.5 w-3.5 text-[#B5472A]" />
            {t("hosp.road.eyebrow", "Road Distance")}
          </span>
          <h3 className="mt-2 text-2xl font-semibold text-[#1A2E24]">
            {t("hosp.road.title", "Kolhapur to Radhanagari Route")}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`rounded-2xl px-5 py-2.5 text-center transition-all duration-300 ${
              isArrived
                ? "bg-[#173327] ring-2 ring-[#B5472A] shadow-md"
                : "bg-[#173327]"
            }`}
          >
            <span className="text-xs uppercase tracking-widest text-[#D9A441] block">
              {t("hosp.road.totalDist", "Total Distance")}
            </span>
            <span
              className={`font-display text-xl transition-all duration-300 block ${
                isArrived
                  ? "font-extrabold text-white scale-105"
                  : "font-bold text-white/90"
              }`}
            >
              {t("hosp.road.aboutDist", "About 46 km")}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Road Graphic */}
      <div className="relative py-8 px-4 sm:px-6">
        {/* Road track */}
        <div className="relative h-12 flex items-center">
          {/* Asphalt track */}
          <div className="h-4 w-full rounded-full bg-[#1A2E24]/10 relative overflow-hidden">
            {/* Drawn progress line */}
            <div
              className="h-full bg-gradient-to-r from-[#173327] via-[#B5472A] to-[#D9A441] transition-all duration-150"
              style={{ width: `${cartLeftPercent}%` }}
            />
            {/* Center dashed road line */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] border-t-2 border-dashed border-white/60" />
          </div>

          {/* Moving Warli-style bus / cart */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none transition-transform duration-150"
            style={{ left: `${cartLeftPercent}%` }}
          >
            {/* Warli Bus / Cart icon */}
            <div
              className={`grid h-10 w-10 place-items-center rounded-full text-white shadow-md border-2 border-white transition-all duration-300 ${
                isArrived
                  ? "bg-[#173327] scale-110 ring-2 ring-[#D9A441]"
                  : "bg-[#B5472A]"
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                {/* Warli geometric bus shape */}
                <rect x="3" y="6" width="18" height="10" rx="2" fill="white" />
                <rect x="5" y="8" width="4" height="4" fill="#B5472A" />
                <rect x="10" y="8" width="4" height="4" fill="#B5472A" />
                <rect x="15" y="8" width="4" height="4" fill="#B5472A" />
                <circle
                  cx="7"
                  cy="17"
                  r="2.5"
                  fill="#173327"
                  stroke="white"
                  strokeWidth="1"
                />
                <circle
                  cx="17"
                  cy="17"
                  r="2.5"
                  fill="#173327"
                  stroke="white"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <span
              className={`mt-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-sm transition-all duration-300 ${
                isArrived
                  ? "bg-[#B5472A] text-white font-extrabold ring-1 ring-white"
                  : "bg-[#173327] text-white"
              }`}
            >
              {isArrived
                ? t("hosp.road.arrived", "Arrived at Radhanagari")
                : t("hosp.road.enRoute", "En route")}
            </span>
          </div>
        </div>

        {/* Milestone endpoints */}
        <div className="mt-6 flex justify-between items-start">
          {/* Kolhapur */}
          <div className="max-w-[200px]">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B5472A]">
              <MapPin className="h-4 w-4 shrink-0" />
              {t("hosp.road.startLabel", "Starting Point")}
            </div>
            <p className="mt-1 font-semibold text-base text-[#1A2E24]">
              {t("hosp.road.startName", "Kolhapur City")}
            </p>
            <p className="text-xs text-[#5C6E64]">
              {t("hosp.road.startDesc", "Railway Station & Highway Junction")}
            </p>
          </div>

          {/* Midpoint Info */}
          <div className="text-center hidden sm:block max-w-[220px]">
            <span className="text-[11px] font-semibold text-[#5C6E64] block">
              {t("hosp.road.midText", "Bhogawati River Basin & Sahyadri Foothills")}
            </span>
            <span className="inline-block mt-1 text-[11px] font-bold text-[#B5472A] bg-[#FAF0EC] px-3 py-0.5 rounded-full">
              {t("hosp.road.midTag", "Forest Ghat Road")}
            </span>
          </div>

          {/* Radhanagari */}
          <div className="text-right max-w-[200px] relative">
            <div className="flex items-center justify-end gap-1.5 text-xs font-bold uppercase tracking-wider text-[#173327]">
              {t("hosp.road.destLabel", "Destination")}
              <div className="relative inline-flex items-center justify-center">
                {isArrived && (
                  <span className="absolute -inset-1 rounded-full bg-[#B5472A]/40 animate-ping" />
                )}
                <MapPin
                  className={`h-4 w-4 shrink-0 transition-colors duration-300 ${
                    isArrived ? "text-[#B5472A]" : "text-[#173327]"
                  }`}
                />
              </div>
            </div>
            <p className="mt-1 font-semibold text-base text-[#1A2E24]">
              {t("hosp.road.destName", "Radhanagari")}
            </p>
            <p className="text-xs text-[#5C6E64]">
              {t("hosp.road.destDesc", "Wildlife Sanctuary & Dam Basin")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadAnimation;
