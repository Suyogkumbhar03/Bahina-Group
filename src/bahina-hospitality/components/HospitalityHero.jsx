import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { SearchBar } from "./SearchBar";
import { WordRotate } from "@/components/ui/word-rotate";
import { SAMPLE_FARMHOUSES, HERO_ASSETS } from "../data/farmhouses.sample";
import { BlockPrintCorner } from "./BlockPrintMotif";

export function HospitalityHero({
  onSearch,
  searchDates,
  searchGuests,
  searchDistrict,
}) {
  const { t, language } = useLanguage();

  // 3 Sample farmhouses for the 3 doorways
  const doorways = [
    {
      id: "doorway-1",
      farmhouse: SAMPLE_FARMHOUSES[0], // Radhanagari, Kolhapur
      titleKey: "hosp.hero.doorway1Title",
      locKey: "hosp.hero.doorway1Loc",
      image: SAMPLE_FARMHOUSES[0].photos[0].url,
      caption: "Mango Orchard Villa • Radhanagari, Kolhapur",
    },
    {
      id: "doorway-2",
      farmhouse: SAMPLE_FARMHOUSES[1],
      titleKey: "hosp.hero.doorway2Title",
      locKey: "hosp.hero.doorway2Loc",
      image: SAMPLE_FARMHOUSES[1].photos[0].url,
      caption: "Valley Mist Stone House • Radhanagari, Kolhapur",
    },
    {
      id: "doorway-3",
      farmhouse: SAMPLE_FARMHOUSES[3] || SAMPLE_FARMHOUSES[2],
      titleKey: "hosp.hero.doorway3Title",
      locKey: "hosp.hero.doorway3Loc",
      image: (SAMPLE_FARMHOUSES[3] || SAMPLE_FARMHOUSES[2]).photos[0].url,
      caption: "Riverfront Teak Cottage • Radhanagari, Kolhapur",
    },
  ];

  const [activeDoorwayIndex, setActiveDoorwayIndex] = useState(0);
  const activeDoorway = doorways[activeDoorwayIndex];

  const handleScrollToStays = () => {
    const el = document.getElementById("stays");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Rotating words settling on final phrase
  const rotatingWords = t(
    "hosp.hero.rotatingWords",
    "peaceful|family|quiet|countryside stays"
  ).split("|");

  // Headline words for word-by-word reveal
  const headlineWords = t(
    "hosp.hero.headlineWords",
    "Find|your|kind|of|nowhere."
  ).split("|");

  return (
    <section className="relative min-h-[92vh] sm:min-h-[96vh] flex flex-col justify-between bg-[#1C2B4F] text-white overflow-hidden">
      {/* Background Photography with Crossfade & Ken Burns Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="sync">
          <motion.img
            key={activeDoorway.image}
            src={activeDoorway.image}
            alt={activeDoorway.caption}
            initial={{ opacity: 0.35, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 18, ease: "linear" },
            }}
            fetchPriority="high"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
          />
        </AnimatePresence>

        {/* Soft Indigo Gradient from Left for AA Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C2B4F]/95 via-[#1C2B4F]/80 to-[#1C2B4F]/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2B4F] via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Decorative Indigo Block-Print Motif in Corners */}
      <BlockPrintCorner position="top-right" size={64} className="text-[#F4A62A]/20" />

      {/* Main Hero Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-28 flex-1 flex flex-col justify-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Word Reveal Headline, Word Rotate, Narrative */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Eyebrow Chip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold tracking-widest uppercase text-[#FFF4D9]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F4A62A]" />
              <span>{t("hosp.brand.name", "BAHINA Hospitality")}</span>
            </motion.div>

            {/* Headline Word-by-Word Reveal in Mukta 800 */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-md">
              {headlineWords.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-2.5 sm:mr-3.5"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Rotating Word Line (peaceful / family / quiet settles on final phrase) */}
            <div className="flex items-center flex-wrap gap-2 text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#FFFDF8]">
              <span className="text-[#F4A62A]">
                <WordRotate
                  words={rotatingWords}
                  duration={2200}
                  className="text-[#F4A62A] underline decoration-wavy decoration-[#BA4A21]/60"
                />
              </span>
              <span className="text-[#FFF4D9]/90 font-semibold text-lg sm:text-xl">
                {t("hosp.hero.rotateSuffix", "farmhouse retreats across Maharashtra.")}
              </span>
            </div>

            {/* Supporting Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-base sm:text-lg text-[#FFFDF8]/90 font-normal leading-relaxed max-w-xl"
            >
              {t(
                "hosp.hero.supporting",
                "Discover peaceful farmhouse stays, open landscapes, and memorable moments with the people who matter."
              )}
            </motion.p>

            {/* Active Doorway Caption & Preview Mode Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-3 pt-2 text-xs sm:text-sm text-[#FFF4D9]/80 font-medium"
            >
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                <MapPin className="w-3.5 h-3.5 text-[#F4A62A]" />
                <span>{t(activeDoorway.titleKey, activeDoorway.caption)}</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#BA4A21] text-white font-bold">
                {t("hosp.photo.sample", "Sample")}
              </span>
            </motion.div>
          </div>

          {/* Right Column: 3 Arch-Shaped Doorway Thumbnails */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#F4A62A] mb-3 block">
              {t("hosp.hero.doorwayAria", "Select Farmhouse Scene")}
            </span>

            {/* On desktop: Vertical or angled arch doorway cards. On phones: horizontal row */}
            <div className="flex flex-row lg:flex-col gap-3 sm:gap-4 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
              {doorways.map((dw, idx) => {
                const isActive = activeDoorwayIndex === idx;

                return (
                  <button
                    key={dw.id}
                    type="button"
                    onClick={() => setActiveDoorwayIndex(idx)}
                    onMouseEnter={() => setActiveDoorwayIndex(idx)}
                    onFocus={() => setActiveDoorwayIndex(idx)}
                    className={`group relative flex items-center gap-3 p-2 sm:p-2.5 rounded-2xl transition-all duration-300 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A62A] shrink-0 ${
                      isActive
                        ? "bg-[#FFFDF8]/20 border-2 border-[#F4A62A] shadow-xl scale-102"
                        : "bg-black/30 border border-white/20 hover:bg-[#FFFDF8]/10"
                    }`}
                    aria-label={`Show ${t(dw.titleKey)}`}
                  >
                    {/* Arch-topped photo container */}
                    <div className="w-14 h-20 sm:w-16 sm:h-22 rounded-t-[28px] rounded-b-xl overflow-hidden border border-white/40 shrink-0 relative shadow-inner">
                      <img
                        src={dw.image}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-[#F4A62A]/20 pointer-events-none" />
                      )}
                    </div>

                    {/* Doorway Info Label */}
                    <div className="pr-3 min-w-[140px] sm:min-w-[160px]">
                      <span className="text-[11px] font-bold text-[#F4A62A] block uppercase tracking-wider">
                        Doorway 0{idx + 1}
                      </span>
                      <h4 className="text-sm font-extrabold text-white leading-tight mt-0.5">
                        {t(dw.titleKey)}
                      </h4>
                      <span className="text-xs text-[#FFFDF8]/70 block mt-0.5">
                        {t(dw.locKey)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Ticket-Style Search Bar (Overlaps Hero Bottom Edge) */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 w-full -mb-10 sm:-mb-14">
        <SearchBar
          onSearch={onSearch}
          initialDates={searchDates}
          initialGuests={searchGuests}
          initialDistrict={searchDistrict}
        />
      </div>
    </section>
  );
}

export default HospitalityHero;
