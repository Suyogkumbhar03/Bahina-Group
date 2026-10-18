import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Sunset, Moon, Sunrise, Clock, Sparkles, Wind, Volume2, Thermometer } from "lucide-react";
import { ShinyText } from "@/components/ui/shiny-text";
import { useLanguage } from "@/lib/i18n";
import { DAY_TO_NIGHT_PHASES } from "../data/farmhouses.sample";

export function DayToNightSection() {
  const { t } = useLanguage();
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);

  const phase = DAY_TO_NIGHT_PHASES[activePhaseIdx];

  const phaseAtmosphere = [
    {
      id: "morning",
      temp: "21°C",
      wind: "Gentle Morning Dew",
      sound: "Songbirds in mango orchards",
      ambientGlow: "rgba(223, 168, 46, 0.25)",
      bgMood: "#1B2A1E",
    },
    {
      id: "afternoon",
      temp: "29°C",
      wind: "Cool Verandah Shade",
      sound: "Gentle rustle of coconut fronds",
      ambientGlow: "rgba(240, 190, 70, 0.22)",
      bgMood: "#233928",
    },
    {
      id: "sunset",
      temp: "24°C",
      wind: "Refreshing Hill Valley Breeze",
      sound: "Dusk cicadas by the natural stream",
      ambientGlow: "rgba(200, 90, 50, 0.3)",
      bgMood: "#3E2218",
    },
    {
      id: "night",
      temp: "18°C",
      wind: "Crisp Starlit Night Calm",
      sound: "Crackling teakwood campfire embers",
      ambientGlow: "rgba(100, 140, 200, 0.2)",
      bgMood: "#0A120E",
    },
  ];

  const currentAtmo = phaseAtmosphere[activePhaseIdx] || phaseAtmosphere[0];

  const getPhaseIcon = (id) => {
    switch (id) {
      case "morning":
        return Sunrise;
      case "afternoon":
        return Sun;
      case "sunset":
        return Sunset;
      case "night":
        return Moon;
      default:
        return Sun;
    }
  };

  return (
    <section
      id="daytonight"
      className="relative py-24 sm:py-32 overflow-hidden text-white transition-colors duration-1000"
      style={{ backgroundColor: currentAtmo.bgMood }}
    >
      {/* Background Photography with Crossfade Motion */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={phase.id}
            src={phase.image}
            alt={t(phase.titleKey, phase.id)}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
          />
        </AnimatePresence>

        {/* Dynamic Color Atmospheric Bloom Overlay */}
        <div
          className="absolute inset-0 transition-all duration-1000 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${currentAtmo.ambientGlow}, transparent 75%)`,
          }}
        />

        {/* Ambient Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/60 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Fraunces Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-sans font-bold uppercase tracking-[0.14em] text-[#DFA82E] border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <ShinyText
              text={t("hosp.dayNight.eyebrow", "A DAY AT THE FARMHOUSE")}
              className="text-[#DFA82E] font-bold"
            />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {t("hosp.dayNight.heading", "Every hour feels a little different here.")}
          </h2>

          <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto font-normal">
            {t(
              "hosp.dayNight.subheading",
              "From early morning valley fog to warm campfire embers under a starlit canopy — watch the rhythms of rural life unfold."
            )}
          </p>
        </div>

        {/* Interactive Time Selector Dial / Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 sm:mb-12">
          {DAY_TO_NIGHT_PHASES.map((p, idx) => {
            const Icon = getPhaseIcon(p.id);
            const isSelected = activePhaseIdx === idx;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePhaseIdx(idx)}
                className={`flex items-center gap-2.5 px-5 sm:px-7 py-3.5 rounded-full text-xs sm:text-sm font-sans font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-md border ${
                  isSelected
                    ? "bg-[#DFA82E] text-[#182C20] border-[#DFA82E] shadow-2xl scale-105"
                    : "bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-[#182C20]" : "text-[#DFA82E]"}`} />
                <span>{p.time}</span>
              </button>
            );
          })}
        </div>

        {/* Active Phase Glass Showcase with Live Weather / Soundscape Badges */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-10 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/20 shadow-2xl space-y-6 text-center"
            >
              {/* Top Meta Badges: Temp, Wind, Sound */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 border-b border-white/10 pb-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-sans text-white/90">
                  <Thermometer className="w-3.5 h-3.5 text-[#DFA82E]" />
                  <span>{currentAtmo.temp}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-sans text-white/90">
                  <Wind className="w-3.5 h-3.5 text-[#DFA82E]" />
                  <span>{currentAtmo.wind}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-sans text-white/90">
                  <Volume2 className="w-3.5 h-3.5 text-[#DFA82E]" />
                  <span>{currentAtmo.sound}</span>
                </div>
              </div>

              {/* Headline & Description in Fraunces & Manrope */}
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold tracking-widest text-[#DFA82E] uppercase">
                  {phase.time}
                </span>

                <h3 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
                  {t(phase.titleKey, phase.id)}
                </h3>

                <p className="font-sans text-sm sm:text-base text-white/85 leading-relaxed font-normal max-w-xl mx-auto">
                  {t(phase.descKey, "")}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default DayToNightSection;
