import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Sunrise, Utensils, Waves, Moon } from "lucide-react";
import { ShinyText } from "@/components/ui/shiny-text";
import { GlareHover } from "@/components/ui/glare-hover";
import { useLanguage } from "@/lib/i18n";

export function HospitalityExpandingShowcase() {
  const { t, language } = useLanguage();
  const isMr = language === "mr";
  const [activeIdx, setActiveIdx] = useState(0);

  const panels = [
    {
      id: "verandah",
      num: "01",
      icon: Sunrise,
      tag: t("hosp.showcase.card1Tag", "06:30 AM • SILENT DAWN"),
      title: t("hosp.showcase.card1Title", "Verandah Mornings"),
      desc: t(
        "hosp.showcase.card1Desc",
        "Watch the morning mist lift over Sahyadri ridges with piping hot brass filter coffee and birdsong filling the courtyard."
      ),
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "culinary",
      num: "02",
      icon: Utensils,
      tag: t("hosp.showcase.card2Tag", "01:00 PM • RURAL FEAST"),
      title: t("hosp.showcase.card2Title", "Farm-to-Fork Cuisine"),
      desc: t(
        "hosp.showcase.card2Desc",
        "Hand-pounded spices, fresh garden vegetables, woodfire bhakri, and earthen pot curries slow-cooked by local village chefs."
      ),
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "orchard",
      num: "03",
      icon: Waves,
      tag: t("hosp.showcase.card3Tag", "04:30 PM • PURE SECLUSION"),
      title: t("hosp.showcase.card3Title", "Private Orchard Oasis"),
      desc: t(
        "hosp.showcase.card3Desc",
        "Cool off in a private stone-lined plunge pool nestled right inside acres of lush mango, coconut, and teakwood groves."
      ),
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "bonfire",
      num: "04",
      icon: Moon,
      tag: t("hosp.showcase.card4Tag", "09:30 PM • COSMIC CANOPY"),
      title: t("hosp.showcase.card4Title", "Bonfire & Celestial Skies"),
      desc: t(
        "hosp.showcase.card4Desc",
        "Zero light pollution. Gather around warm fragrant wood embers to gaze upon the Milky Way and unhurried conversation."
      ),
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const handleScrollToStays = () => {
    const el = document.getElementById("stays");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="atmosphere" className="relative py-24 sm:py-32 bg-gradient-to-b from-[#F7F3EA] via-[#FCFAF5] to-[#F3ECE0] text-[#252821] overflow-hidden">
      {/* Ambient Warm Atmosphere Glows */}
      <div className="absolute top-10 right-1/4 w-[650px] h-[450px] bg-[#DFA82E]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[350px] bg-[#203F30]/6 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#203F30]/10 text-xs font-sans font-bold uppercase tracking-[0.14em] text-[#B9532C] border border-[#203F30]/15 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#DFA82E]" />
              <span>{t("hosp.showcase.eyebrow", "The Countryside Atmosphere")}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#182C20] leading-tight drop-shadow-xs">
              {t("hosp.showcase.heading", "The art of living at nature's pace.")}
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#5E534D] max-w-md leading-relaxed font-normal">
            {t(
              "hosp.showcase.subheading",
              "From early dawn over misty fruit orchards to starlit bonfires, discover the quiet rhythms that make our farmsteads unforgettable."
            )}
          </p>
        </motion.div>

        {/* Desktop Interactive Expanding Panels */}
        <div className="hidden lg:flex gap-4 h-[520px] w-full">
          {panels.map((panel, idx) => {
            const isActive = activeIdx === idx;
            const Icon = panel.icon;

            return (
              <motion.div
                key={panel.id}
                layout
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 shadow-xl border ${
                  isActive
                    ? "border-[#DFA82E]/50 shadow-2xl flex-[4]"
                    : "border-[#E8E0D2] opacity-80 hover:opacity-100 flex-[1.2]"
                }`}
                style={{ minWidth: isActive ? "300px" : "80px" }}
              >
                {/* Background Photography */}
                <img
                  src={panel.image}
                  alt={panel.title}
                  className="w-full h-full object-cover filter brightness-[0.78] contrast-[1.08] transition-transform duration-700 hover:scale-105"
                />

                {/* Ambient Gradient Overlays */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? "bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                      : "bg-gradient-to-t from-black/85 via-black/50 to-black/30"
                  }`}
                />

                {/* Glare Hover Dynamic Highlight */}
                <GlareHover className="absolute inset-0 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                  <span
                    className={`font-mono text-xs font-bold px-2.5 py-1 rounded-full transition-colors ${
                      isActive
                        ? "bg-[#DFA82E] text-[#203F30]"
                        : "bg-white/20 text-white backdrop-blur-md"
                    }`}
                  >
                    {panel.num}
                  </span>

                  <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <Icon className="w-4 h-4 text-[#DFA82E]" />
                  </div>
                </div>

                {/* Inactive Vertical Title Pill */}
                {!isActive && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap -rotate-90 origin-center">
                    <span className="font-display text-lg font-bold text-white tracking-wide">
                      {panel.title}
                    </span>
                  </div>
                )}

                {/* Active Expanded Content */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 }}
                    className="absolute bottom-0 left-0 right-0 p-8 z-10 space-y-4"
                  >
                    <div className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-[0.14em] text-[#DFA82E] uppercase">
                      <span>{panel.tag}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {panel.title}
                    </h3>

                    <p className="font-sans text-sm sm:text-base text-white/90 max-w-lg leading-relaxed font-normal">
                      {panel.desc}
                    </p>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScrollToStays();
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#203F30] font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#DFA82E] transition-colors shadow-lg"
                      >
                        <span>{t("hosp.card.viewStays", "Explore Farmhouses")}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Accordion Stack (below 1024px) */}
        <div className="flex lg:hidden flex-col gap-4">
          {panels.map((panel, idx) => {
            const isExpanded = activeIdx === idx;
            const Icon = panel.icon;

            return (
              <div
                key={panel.id}
                onClick={() => setActiveIdx(idx)}
                className="relative rounded-2xl overflow-hidden border border-[#E8E0D2] shadow-md bg-white cursor-pointer"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={panel.image}
                    alt={panel.title}
                    className="w-full h-full object-cover filter brightness-[0.8]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-[#DFA82E] text-[#203F30]">
                      {panel.num}
                    </span>
                    <span className="text-xs font-sans font-bold text-[#DFA82E] uppercase tracking-wider">
                      {panel.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-white">
                      {panel.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Icon className="w-4 h-4 text-[#DFA82E]" />
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-5 bg-white space-y-3">
                    <p className="font-sans text-sm text-[#5E534D] leading-relaxed">
                      {panel.desc}
                    </p>
                    <button
                      type="button"
                      onClick={handleScrollToStays}
                      className="inline-flex items-center gap-2 text-xs font-sans font-bold text-[#B9532C] uppercase tracking-wider hover:underline"
                    >
                      <span>{t("hosp.card.viewStays", "Explore Farmhouses")}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HospitalityExpandingShowcase;
