import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { STORY_SCENES } from "../data/farmhouses.sample";

export function HospitalityStorytelling() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto transition scenes every 6 seconds unless paused by user interaction
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % STORY_SCENES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const currentScene = STORY_SCENES[activeIdx];

  const handleSelectScene = (idx) => {
    setActiveIdx(idx);
    setIsAutoPlaying(false);
  };

  const handleScrollToStays = () => {
    const el = document.getElementById("stays");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="storytelling"
      className="relative py-24 sm:py-32 bg-[#203F30] text-white overflow-hidden"
    >
      {/* Background Decorative Rings */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#536B4E]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#B9532C]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Eyebrow */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-[#DFA82E] border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("hosp.story.eyebrow", "The Countryside Journey")}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {t("hosp.story.mainHeading", "Leave the rush. Find your breath.")}
          </h2>
          <p className="text-sm sm:text-base text-[#F8F3E8]/80 leading-relaxed">
            {t(
              "hosp.story.mainSub",
              "From highway to hillside — follow the transition from hectic city hours to peaceful rural silence."
            )}
          </p>
        </div>

        {/* Interactive Cinematic Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Interactive Scene Progress List (Desktop) */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {STORY_SCENES.map((scene, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => handleSelectScene(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 relative overflow-hidden flex items-start gap-4 border ${
                    isActive
                      ? "bg-white/15 border-white/30 shadow-lg translate-x-1 sm:translate-x-2"
                      : "bg-white/5 border-white/10 hover:bg-white/10 text-white/70"
                  }`}
                >
                  {/* Step Badge */}
                  <span
                    className={`font-mono text-xs font-bold px-2 py-1 rounded-md shrink-0 transition-colors ${
                      isActive
                        ? "bg-[#DFA82E] text-[#203F30]"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {scene.step}
                  </span>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#DFA82E]">
                        {t(scene.taglineKey, scene.location)}
                      </span>
                      {isActive && (
                        <span className="text-[11px] text-white/60 font-mono hidden sm:inline">
                          Active
                        </span>
                      )}
                    </div>

                    <h3
                      className={`font-serif text-lg sm:text-xl font-bold transition-colors ${
                        isActive ? "text-white" : "text-white/80"
                      }`}
                    >
                      {t(scene.titleKey)}
                    </h3>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed transition-all ${
                        isActive
                          ? "text-[#F8F3E8]/90 block opacity-100 max-h-24"
                          : "text-white/50 hidden sm:block opacity-70 line-clamp-1"
                      }`}
                    >
                      {t(scene.descKey)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Cinematic Visual Showcase */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScene.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={currentScene.image}
                    alt={t(currentScene.titleKey)}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Scene Caption Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#203F30]/90 text-white backdrop-blur-md border border-white/20">
                      <MapPin className="w-3.5 h-3.5 text-[#DFA82E]" />
                      <span>{t(currentScene.badgeKey, currentScene.location)}</span>
                    </div>

                    <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      {t(currentScene.titleKey)}
                    </h4>

                    <p className="text-xs sm:text-sm text-white/90 max-w-xl leading-relaxed">
                      {t(currentScene.descKey)}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar inside visual frame */}
              <div className="absolute top-4 left-4 right-4 flex items-center gap-1.5 z-20">
                {STORY_SCENES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectScene(i)}
                    className="flex-1 h-1 rounded-full overflow-hidden bg-white/30 backdrop-blur-xs focus:outline-none"
                  >
                    <div
                      className={`h-full transition-all duration-500 ${
                        activeIdx === i ? "w-full bg-[#DFA82E]" : "w-0"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick CTA to skip to stays */}
            <div className="mt-4 flex items-center justify-between text-xs text-white/70 px-2">
              <span>{t("hosp.story.sceneCount", `Scene ${activeIdx + 1} of 5`)}</span>
              <button
                type="button"
                onClick={handleScrollToStays}
                className="inline-flex items-center gap-1.5 text-[#DFA82E] hover:text-white font-semibold transition-colors"
              >
                <span>{t("hosp.story.viewStays", "Explore all farmhouse stays")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HospitalityStorytelling;
