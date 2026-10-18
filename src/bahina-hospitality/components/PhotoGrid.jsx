import React, { useState } from "react";
import { Grid } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { PhotoFallback } from "./PhotoFallback";
import { Lightbox } from "./Lightbox";

export function PhotoGrid({
  photos = [],
  artVariation = "hills-sunrise",
  badgeType = null,
  status = null,
  className = "",
}) {
  const { t } = useLanguage();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxInitialIdx, setLightboxInitialIdx] = useState(0);

  const hasPhotos = Array.isArray(photos) && photos.length > 0;
  const totalCount = hasPhotos ? photos.length : 5;

  const openLightboxAt = (idx) => {
    setLightboxInitialIdx(idx);
    setIsLightboxOpen(true);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Desktop & Tablet: 1 Large Arch-Framed Photo + 4 Grid Tiles */}
      <div className="hidden sm:grid grid-cols-4 gap-3.5 h-[460px] rounded-[36px] overflow-hidden">
        {/* Large Main Arch Photo */}
        <div
          onClick={() => openLightboxAt(0)}
          className="col-span-2 row-span-2 relative cursor-pointer group overflow-hidden rounded-t-[44px] rounded-b-2xl border-2 border-[#1C2B4F]/20 bg-[#1C2B4F]/10"
        >
          {hasPhotos ? (
            <img
              src={photos[0]?.url || photos[0]}
              alt={photos[0]?.label || "Main Farmhouse View"}
              loading="eager"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <PhotoFallback
              badgeType={badgeType}
              status={status}
              aspectRatio="aspect-auto h-full"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C2B4F]/70 via-transparent to-black/10 group-hover:from-[#1C2B4F]/85 transition-colors" />

          {/* Photo Caption Label */}
          {hasPhotos && photos[0]?.label && (
            <div className="absolute bottom-4 left-5 z-10">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/60 text-[#FFFDF8] backdrop-blur-xs border border-white/20">
                {photos[0].label}
              </span>
            </div>
          )}
        </div>

        {/* 4 Smaller Grid Photos */}
        {Array.from({ length: 4 }).map((_, idx) => {
          const photoItem = hasPhotos ? photos[idx + 1] : null;
          return (
            <div
              key={idx}
              onClick={() => openLightboxAt(idx + 1)}
              className="relative cursor-pointer group overflow-hidden rounded-2xl border border-[#1C2B4F]/20 bg-[#1C2B4F]/10"
            >
              {photoItem ? (
                <img
                  src={photoItem.url || photoItem}
                  alt={photoItem.label || `Farmhouse photo ${idx + 2}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <PhotoFallback
                  badgeType={badgeType}
                  status={status}
                  aspectRatio="aspect-auto h-full"
                />
              )}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
            </div>
          );
        })}
      </div>

      {/* Mobile: 1 Main Arch Photo */}
      <div
        onClick={() => openLightboxAt(0)}
        className="sm:hidden relative rounded-t-[36px] rounded-b-2xl cursor-pointer overflow-hidden border-2 border-[#1C2B4F]/20 bg-[#1C2B4F]/10"
      >
        {hasPhotos ? (
          <img
            src={photos[0]?.url || photos[0]}
            alt={photos[0]?.label || "Main Farmhouse View"}
            className="w-full h-full object-cover aspect-[4/3]"
          />
        ) : (
          <PhotoFallback
            badgeType={badgeType}
            status={status}
            aspectRatio="aspect-[4/3]"
          />
        )}
      </div>

      {/* "Show all photos" Floating Button */}
      <button
        type="button"
        onClick={() => openLightboxAt(0)}
        className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-4 py-2 bg-[#FFFDF8]/95 text-[#1C2B4F] font-bold text-xs sm:text-sm rounded-full shadow-lg border border-[#1C2B4F]/20 hover:bg-white transition-all backdrop-blur-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BA4A21]"
      >
        <Grid className="w-4 h-4 text-[#BA4A21]" />
        <span>{t("hosp.photos.showAll", "Show all photos")} ({totalCount})</span>
      </button>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        initialIndex={lightboxInitialIdx}
        photos={photos}
        badgeType={badgeType}
      />
    </div>
  );
}

export default PhotoGrid;
