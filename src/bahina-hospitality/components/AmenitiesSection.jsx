import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { AMENITIES_LIST } from "../data/amenities";
import { AmenityIcon } from "./AmenityIcon";

export function AmenitiesSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", labelKey: "hosp.amenities.catAll", defaultLabel: "All Essentials" },
    { id: "leisure", labelKey: "hosp.amenities.catLeisure", defaultLabel: "Nature & Leisure", ids: ["pool", "lawn", "campfire", "mountain_view"] },
    { id: "comfort", labelKey: "hosp.amenities.catComfort", defaultLabel: "Comfort & Living", ids: ["ac", "wifi", "power_backup", "parking"] },
    { id: "hospitality", labelKey: "hosp.amenities.catDining", defaultLabel: "Dining & Care", ids: ["meals", "kitchen", "games", "pet_friendly"] },
  ];

  const filteredAmenities = AMENITIES_LIST.filter((item) => {
    if (activeCategory === "all") return true;
    const cat = categories.find((c) => c.id === activeCategory);
    return cat?.ids?.includes(item.id);
  });

  return (
    <section id="amenities" className="py-24 sm:py-32 bg-[#F6F1E5] text-[#2B2420] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DFA82E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#182C20]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#E8DFCC] shadow-2xs text-xs font-sans font-bold uppercase tracking-[0.14em] text-[#B9532C]">
            <Sparkles className="w-3.5 h-3.5 text-[#DFA82E]" />
            <span>{t("hosp.amenities.eyebrow", "Hospitality & Amenities")}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#182C20] leading-tight">
            {t("hosp.amenities.heading", "Everything you need for a restful stay.")}
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#5E534D] leading-relaxed">
            {t(
              "hosp.amenities.subheading",
              "Each BAHINA farmhouse is thoughtfully prepared with authentic rural warmth and comfortable modern conveniences."
            )}
          </p>

          {/* Interactive Category Segmented Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-sans font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-white font-bold"
                      : "bg-white/60 text-[#5E534D] border border-[#E8DFCC] hover:bg-white hover:text-[#182C20]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="amenity-tab-active-indicator"
                      className="absolute inset-0 rounded-full bg-[#182C20] shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span>{t(cat.labelKey, cat.defaultLabel)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Grid of Amenities */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredAmenities.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-white border border-[#E8DFCC] shadow-sm hover:shadow-xl hover:border-[#182C20]/25 transition-all duration-300 flex flex-col justify-between gap-4 group cursor-default"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#F6F0E4] group-hover:bg-[#182C20] text-[#182C20] group-hover:text-[#DFA82E] flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:scale-105">
                      <AmenityIcon id={item.id} showLabel={false} size="md" />
                    </div>
                    <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#DFA82E]/80 bg-amber-50/60 px-2 py-0.5 rounded-full border border-amber-200/50">
                      Standard
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-bold text-[#182C20] group-hover:text-[#B9532C] transition-colors">
                      {t(item.labelKey || item.nameKey)}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#5E534D] leading-relaxed">
                      {t(item.descKey)}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F1ECE0] flex items-center gap-1.5 text-[11px] font-sans font-semibold text-[#182C20]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Available on-site</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Guarantee Banner at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#182C20] via-[#203F30] to-[#182C20] text-white border border-[#30523E] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#DFA82E] flex items-center justify-center shrink-0 border border-white/15">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                Authentic Care & Village Warmth
              </h4>
              <p className="font-sans text-xs sm:text-sm text-white/80 mt-0.5">
                Dedicated local caretakers, organic drinking water, and homemade regional cuisine prepared fresh daily.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-sans font-bold text-[#DFA82E]">
            <ShieldCheck className="w-4 h-4 text-[#DFA82E]" />
            <span>100% Verified Farmhouse Stays</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AmenitiesSection;
