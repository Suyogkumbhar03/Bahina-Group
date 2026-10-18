import React from "react";
import { Trees, Users, HeartHandshake, Sparkles, Coffee } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function FeaturedExperience() {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Users,
      titleKey: "hosp.feat.highlight1Title",
      titleDefault: "Space to reconnect.",
      descKey: "hosp.feat.highlight1Desc",
      descDefault:
        "Expansive shaded verandahs, lush open lawns, and peaceful courtyards designed for long conversations with family and friends.",
    },
    {
      icon: Trees,
      titleKey: "hosp.feat.highlight2Title",
      titleDefault: "Nature at your doorstep.",
      descKey: "hosp.feat.highlight2Desc",
      descDefault:
        "Wake up to mist rising over fruit orchards, breathe clean country air, and listen to the gentle flow of rural streams.",
    },
    {
      icon: Coffee,
      titleKey: "hosp.feat.highlight3Title",
      titleDefault: "Time well spent.",
      descKey: "hosp.feat.highlight3Desc",
      descDefault:
        "Freshly prepared village meals, lazy afternoons by the private pool, and evening bonfires under unpolluted starry skies.",
    },
  ];

  return (
    <section id="experience" className="py-20 sm:py-28 bg-[#F8F3E8] text-[#252821] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Layered Photography Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E8E0D2] aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                alt="Traditional Indian Farmhouse Verandah"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#203F30]/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Experience Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#203F30] text-[#DFA82E] flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#203F30]">
                    {t("hosp.feat.badgeTitle", "Rural Comfort & Simplicity")}
                  </h4>
                  <p className="text-xs text-[#5E534D]">
                    {t("hosp.feat.badgeSub", "Handcrafted stays built with authentic local character.")}
                  </p>
                </div>
              </div>
            </div>

            {/* Overlapping Complementary Photo */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80"
                alt="Farmhouse Swimming Pool"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Editorial Storytelling */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B9532C]">
                {t("hosp.feat.eyebrow", "The BAHINA Philosophy")}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#203F30] leading-tight">
                {t("hosp.feat.heading", "Not just a stay. A slower way of living.")}
              </h2>
              <p className="text-sm sm:text-base text-[#5E534D] leading-relaxed">
                {t(
                  "hosp.feat.subheading",
                  "Wake up to open skies, spend your day surrounded by nature, and make memories away from the everyday rush."
                )}
              </p>
            </div>

            {/* 3 Experience Highlights */}
            <div className="space-y-5 pt-2">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-3 rounded-2xl transition-colors hover:bg-white/60">
                    <div className="w-10 h-10 rounded-xl bg-[#203F30]/10 text-[#203F30] flex items-center justify-center shrink-0 mt-0.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold text-[#203F30]">
                        {t(item.titleKey, item.titleDefault)}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5E534D] leading-relaxed">
                        {t(item.descKey, item.descDefault)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedExperience;
