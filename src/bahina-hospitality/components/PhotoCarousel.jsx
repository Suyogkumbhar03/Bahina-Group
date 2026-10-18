import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhotoFallback } from "./PhotoFallback";
import { useLanguage } from "@/lib/i18n";

export function PhotoCarousel({
  photos = [],
  badgeType = null,
  status = null,
  farmhouseSlug = "",
  className = "",
  aspectRatio = "aspect-[16/10]",
}) {
  const { t } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [imgError, setImgError] = useState(false);

  const hasPhotos = Array.isArray(photos) && photos.length > 0;
  const totalSlides = hasPhotos ? photos.length : 1;

  const handlePrev = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIdx((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIdx((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const currentPhoto = hasPhotos ? photos[currentIdx] : null;
  const photoUrl = typeof currentPhoto === "string" ? currentPhoto : currentPhoto?.url;
  const photoLabel = typeof currentPhoto === "object" ? currentPhoto?.label : null;

  const getOverlayLabel = () => {
    if (badgeType === "construction" || status === "under_construction") {
      return t("hosp.photo.constructionProgress", "Construction progress");
    }
    if (badgeType === "planned" || status === "coming_soon") {
      return t("hosp.photo.artistsImpression", "Artist's impression");
    }
    return t("hosp.photo.sample", "Sample");
  };

  return (
    <div className={`relative w-full overflow-hidden group select-none ${aspectRatio} ${className}`}>
      {hasPhotos && !imgError ? (
        <div className="w-full h-full relative overflow-hidden bg-[#1C2B4F]/10">
          <img
            src={photoUrl}
            alt={photoLabel || "Countryside Farmhouse"}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle bottom shadow vignette for badge/dots contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C2B4F]/60 via-transparent to-black/15 pointer-events-none" />

          {/* Top-Right: Photo Classification Label */}
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#1C2B4F]/85 text-[#FFFDF8] border border-white/20 backdrop-blur-md shadow-xs">
              {getOverlayLabel()}
            </span>
          </div>

          {/* Bottom-Left Photo Caption (if photo has specific label) */}
          {photoLabel && (
            <div className="absolute bottom-3 left-3 z-10 max-w-[60%]">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-black/60 text-[#FFFDF8] backdrop-blur-xs truncate block">
                {photoLabel}
              </span>
            </div>
          )}
        </div>
      ) : (
        <PhotoFallback
          badgeType={badgeType}
          status={status}
          aspectRatio="aspect-auto h-full"
        />
      )}

      {/* Prev / Next controls */}
      {totalSlides > 1 && (
        <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo"
            className="pointer-events-auto w-8 h-8 rounded-full bg-[#FFFDF8]/95 hover:bg-[#FFFDF8] text-[#1C2B4F] flex items-center justify-center shadow-md transition-all hover:scale-105 focus:outline-none"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo"
            className="pointer-events-auto w-8 h-8 rounded-full bg-[#FFFDF8]/95 hover:bg-[#FFFDF8] text-[#1C2B4F] flex items-center justify-center shadow-md transition-all hover:scale-105 focus:outline-none"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Slide indicator dots - Centered at bottom without overlapping labels */}
      {totalSlides > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 pointer-events-none">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <span
              key={idx}
              className={`rounded-full transition-all ${
                idx === currentIdx
                  ? "w-4 h-1.5 bg-[#F4A62A]"
                  : "w-1.5 h-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PhotoCarousel;
