import React from "react";
import { motion } from "framer-motion";
import { Home, ShieldCheck, Utensils, SunMedium, Sparkles, Trees, ArrowUpRight, Compass } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShinyText } from "@/components/ui/shiny-text";
import { Marquee } from "@/components/ui/marquee";
import { useLanguage } from "@/lib/i18n";

export function HospitalityBentoGrid() {
  const { t } = useLanguage();

  const destinations = [
    "Radhanagari Wildlife Foothills",
    "Dajipur Bison Sanctuary Trails",
    "Bhogawati River Basin Stays",
    "Shivrai Sada High Plateau",
    "Kalammawadi Reservoir Edge",
    "Kolhapur Green Hinterlands",
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#182C20] text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#3E9B63]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 1. Continuous Smooth Destination Marquee */}
      <div className="w-full mb-16 sm:mb-20 border-y border-white/10 py-3 bg-white/[0.02]">
        <Marquee pauseOnHover={false} className="[--duration:28s]">
          {destinations.map((dest, i) => (
            <div key={i} className="flex items-center gap-4 mx-3">
              <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-white/80">
                {dest}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#DFA82E]" />
            </div>
          ))}
        </Marquee>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-sans font-bold uppercase tracking-[0.14em] text-[#DFA82E]">
            <Sparkles className="w-3.5 h-3.5" />
            <ShinyText
              text={t("hosp.bento.eyebrow", "THE BAHINA STANDARD")}
              className="text-[#DFA82E] font-bold"
            />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {t("hosp.bento.heading", "Crafted for complete privacy and countryside calm.")}
          </h2>

          <p className="font-sans text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            {t(
              "hosp.bento.subheading",
              "Every property is designed from the ground up to offer unhurried seclusion, authentic local flavours, and respectful stewardship of the land."
            )}
          </p>
        </div>

        {/* 4-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Large Featured Card (Spans 2 cols on desktop) */}
          <MagicCard
            gradientColor="rgba(223, 168, 46, 0.16)"
            gradientSize={350}
            className="lg:col-span-2 relative bg-[#132219]/90 border border-white/15 p-8 sm:p-10 rounded-3xl overflow-hidden flex flex-col justify-between min-h-[380px]"
          >
            {/* Border Beam on Featured Card */}
            <BorderBeam size={280} duration={14} colorFrom="#DFA82E" colorTo="#B9532C" />

            <div className="space-y-4 max-w-lg z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#DFA82E]/20 text-[#DFA82E] flex items-center justify-center border border-[#DFA82E]/30">
                <Home className="w-6 h-6" />
              </div>

              <span className="font-mono text-xs font-bold text-[#DFA82E] tracking-widest uppercase">
                01 • ARCHITECTURE OF COMFORT
              </span>

              <h3 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
                {t("hosp.bento.card1Title", "Handcrafted with Red Stone & Teakwood.")}
              </h3>

              <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                {t(
                  "hosp.bento.card1Desc",
                  "Built with climate-responsive red laterite stone, high vaulted teakwood ceilings, and central open verandahs that channel refreshing hill breezes without noise or artificial barriers."
                )}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-sans text-white/70 tracking-wider uppercase font-semibold">
              <span>Naturally Ventilated • Traditional Craft</span>
              <span className="text-[#DFA82E] flex items-center gap-1">
                Explore Design <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </MagicCard>

          {/* Card 2: 100% Gated Private Stays */}
          <MagicCard
            gradientColor="rgba(62, 155, 99, 0.18)"
            gradientSize={280}
            className="bg-[#132219]/90 border border-white/15 p-8 rounded-3xl flex flex-col justify-between min-h-[380px]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#3E9B63]/20 text-[#3E9B63] flex items-center justify-center border border-[#3E9B63]/30">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <span className="font-mono text-xs font-bold text-[#3E9B63] tracking-widest uppercase">
                02 • ABSOLUTE SECLUSION
              </span>

              <h3 className="font-display text-2xl font-bold text-white leading-tight">
                {t("hosp.bento.card2Title", "100% Gated, Entire Property Yours.")}
              </h3>

              <p className="font-sans text-sm text-white/80 leading-relaxed font-normal">
                {t(
                  "hosp.bento.card2Desc",
                  "No shared lawns, no strangers next door. When you reserve a stay, the entire farmhouse, private pool, and orchards belong exclusively to your group."
                )}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs font-sans text-white/70 uppercase tracking-wider font-semibold">
              Zero Interruption Guarantee
            </div>
          </MagicCard>

          {/* Card 3: Woodfire & Village Cook */}
          <MagicCard
            gradientColor="rgba(185, 83, 44, 0.2)"
            gradientSize={280}
            className="bg-[#132219]/90 border border-white/15 p-8 rounded-3xl flex flex-col justify-between min-h-[380px]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#B9532C]/20 text-[#B9532C] flex items-center justify-center border border-[#B9532C]/30">
                <Utensils className="w-6 h-6" />
              </div>

              <span className="font-mono text-xs font-bold text-[#B9532C] tracking-widest uppercase">
                03 • CULINARY HERITAGE
              </span>

              <h3 className="font-display text-2xl font-bold text-white leading-tight">
                {t("hosp.bento.card3Title", "Dedicated Local Farmhouse Chef.")}
              </h3>

              <p className="font-sans text-sm text-white/80 leading-relaxed font-normal">
                {t(
                  "hosp.bento.card3Desc",
                  "Enjoy hand-made jowar and bajra bhakris, stone-ground curries, garden greens, and farm fresh buttermilk prepared to your family's taste."
                )}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs font-sans text-white/70 uppercase tracking-wider font-semibold">
              Authentic Woodfire Cooking
            </div>
          </MagicCard>

          {/* Card 4: Clean Energy & Sustainability (Spans 2 cols on desktop) */}
          <MagicCard
            gradientColor="rgba(217, 164, 65, 0.16)"
            gradientSize={350}
            className="lg:col-span-2 bg-[#132219]/90 border border-white/15 p-8 sm:p-10 rounded-3xl flex flex-col justify-between min-h-[380px]"
          >
            <div className="space-y-4 max-w-lg">
              <div className="w-12 h-12 rounded-2xl bg-[#D9A441]/20 text-[#D9A441] flex items-center justify-center border border-[#D9A441]/30">
                <SunMedium className="w-6 h-6" />
              </div>

              <span className="font-mono text-xs font-bold text-[#DFA82E] tracking-widest uppercase">
                04 • ECOLOGICAL HARMONY
              </span>

              <h3 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
                {t("hosp.bento.card4Title", "Solar Powered & Zero Plastic Estates.")}
              </h3>

              <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                {t(
                  "hosp.bento.card4Desc",
                  "Harnessing Maharashtra's abundant sun for 100% clean electricity, rainwater recharge pits that nourish native groundwater, and strict zero-single-use-plastic policies across all retreats."
                )}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-sans text-white/70 tracking-wider uppercase font-semibold">
              <span>Solar Grid Backup • Native Rainwater Recharge</span>
              <span className="text-[#3E9B63] font-bold">100% Sustainable</span>
            </div>
          </MagicCard>
        </div>
      </div>
    </section>
  );
}

export default HospitalityBentoGrid;
