import React from "react";
import { MapPin, ArrowRight, Compass } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { DESTINATION_TILES } from "../data/farmhouses.sample";

export function DestinationDiscovery({ onSelectDestination }) {
  const { t } = useLanguage();

  const handleTileClick = (districtId) => {
    if (onSelectDestination) {
      onSelectDestination(districtId);
    }
    const el = document.getElementById("stays");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="destinations" className="py-20 sm:py-28 bg-[#F1ECE0] text-[#252821]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B9532C]">
              <Compass className="w-3.5 h-3.5" />
              <span>{t("hosp.dest.eyebrow", "Explore Western Maharashtra")}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#203F30] leading-tight">
              {t("hosp.dest.heading", "Destinations worth slowing down for.")}
            </h2>
            <p className="text-sm sm:text-base text-[#5E534D] leading-relaxed">
              {t(
                "hosp.dest.subheading",
                "From riverside ghats to misty Sahyadri valleys — pick a countryside landscape that suits your getaway."
              )}
            </p>
          </div>

          <span className="text-xs font-semibold text-[#5E534D] hidden sm:block">
            {t("hosp.dest.hint", "Click any region to filter farmhouse stays")}
          </span>
        </div>

        {/* 4 Image-Led Destination Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATION_TILES.map((tile) => (
            <button
              key={tile.id}
              type="button"
              onClick={() => handleTileClick(tile.districtId)}
              className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 text-left flex flex-col justify-end p-6 border border-[#E8E0D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B9532C]"
            >
              {/* Background Photo with Zoom on Hover */}
              <img
                src={tile.image}
                alt={t(tile.titleKey, tile.titleDefault)}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent group-hover:from-black/90 transition-colors" />

              {/* Content Overlay */}
              <div className="relative z-10 space-y-2 text-white">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#DFA82E] bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20">
                    <MapPin className="w-3 h-3" />
                    <span>{tile.districtId.toUpperCase()}</span>
                  </span>

                  <span className="text-xs font-semibold text-white/80 bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full">
                    {tile.comingSoon
                      ? t("hosp.status.comingSoon", "Coming soon")
                      : `${tile.stayCount} ${t("hosp.filter.farmhousesCount", "stays")}`}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#DFA82E] transition-colors leading-tight">
                  {t(tile.titleKey, tile.titleDefault)}
                </h3>

                <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
                  {t(tile.subtitleKey, tile.subtitleDefault)}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#DFA82E] group-hover:translate-x-1 transition-transform">
                  <span>{t("hosp.dest.exploreRegion", "Explore stays")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DestinationDiscovery;
