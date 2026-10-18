import React from "react";
import { PREVIEW_MODE } from "@/data/config";
import { useLanguage } from "@/lib/i18n";
import { BlockPrintMotif } from "./BlockPrintMotif";

export function PhotoFallback({
  aspectRatio = "aspect-[16/10]",
  badgeType = null,
  status = null,
  className = "",
  label = null,
}) {
  const { t } = useLanguage();

  const getLabelText = () => {
    if (label) return label;
    if (badgeType === "construction" || status === "under_construction") {
      return t("hosp.photo.constructionProgress", "Construction progress");
    }
    if (badgeType === "planned" || status === "coming_soon") {
      return t("hosp.photo.artistsImpression", "Artist's impression");
    }
    if (PREVIEW_MODE) {
      return t("hosp.photo.sample", "Sample");
    }
    return null;
  };

  const overlayLabel = getLabelText();

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-br from-[#1C2B4F] via-[#253966] to-[#F4A62A]/90 ${aspectRatio} ${className}`}
    >
      {/* Subtle Grain Texture Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 80%)`,
        }}
      />

      {/* Decorative Woodblock Corner Motifs */}
      <div className="absolute top-3 right-3 pointer-events-none">
        <BlockPrintMotif variant="corner" size={32} opacity={0.18} />
      </div>
      <div className="absolute bottom-3 left-3 pointer-events-none rotate-180">
        <BlockPrintMotif variant="corner" size={32} opacity={0.18} />
      </div>

      {/* Center Block-print Motif Medallion */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-xs">
          <BlockPrintMotif variant="medallion" size={48} opacity={0.25} />
        </div>
      </div>

      {/* Top Left: Farmhouse Classification Badge */}
      <div className="relative z-10 flex items-center gap-2">
        {overlayLabel && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#1C2B4F]/85 text-[#FFFDF8] border border-white/20 backdrop-blur-md shadow-xs">
            {overlayLabel}
          </span>
        )}
      </div>

      {/* Bottom Right: Dev-only "Photo needed" label */}
      <div className="relative z-10 flex items-end justify-between mt-auto">
        <div className="text-white/60 text-xs font-mono tracking-wider">
          BAHINA RETREAT
        </div>

        {PREVIEW_MODE && (
          <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-black/40 text-amber-200 border border-amber-300/30 backdrop-blur-xs">
            {t("hosp.photo.photoNeeded", "Photo needed")}
          </span>
        )}
      </div>
    </div>
  );
}

export default PhotoFallback;
