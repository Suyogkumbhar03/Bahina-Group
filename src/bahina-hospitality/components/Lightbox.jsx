import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { SamplePlaceholderArt } from "./SamplePlaceholderArt";

export function Lightbox({
  isOpen,
  onClose,
  initialIndex = 0,
  photos = [],
  variations = ["hills-sunrise", "orchard-verandah", "valley-terrace", "construction-site"],
  badgeType = null,
}) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const hasPhotos = Array.isArray(photos) && photos.length > 0;
  const totalCount = hasPhotos ? photos.length : variations.length;

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? totalCount - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev === totalCount - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, totalCount, onClose]);

  if (!isOpen) return null;

  const currentPhoto = hasPhotos ? photos[currentIndex] : null;
  const currentUrl = typeof currentPhoto === "string" ? currentPhoto : currentPhoto?.url;
  const currentLabel = typeof currentPhoto === "object" ? currentPhoto?.label : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      {/* Top bar: counter & close */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 text-white">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            {currentIndex + 1} / {totalCount}
          </span>
          {currentLabel && (
            <span className="text-sm font-semibold text-white/90 hidden sm:inline">
              {currentLabel}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("hosp.common.close")}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main photo display */}
      <div className="relative w-full max-w-5xl max-h-[85vh] flex items-center justify-center">
        {hasPhotos ? (
          <div className="relative max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={currentUrl}
              alt={currentLabel || "Farmhouse view"}
              className="max-h-[80vh] max-w-full object-contain rounded-2xl"
            />
            {currentLabel && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-center">
                <span className="text-sm sm:text-base font-semibold text-white">
                  {currentLabel}
                </span>
              </div>
            )}
          </div>
        ) : (
          <SamplePlaceholderArt
            variation={variations[currentIndex]}
            badgeType={badgeType}
            aspectRatio="16/10"
            className="w-full max-h-[75vh] rounded-2xl shadow-2xl"
          />
        )}

        {/* Prev / Next buttons */}
        {totalCount > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) => (prev === 0 ? totalCount - 1 : prev - 1))
              }
              aria-label="Previous photo"
              className="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) => (prev === totalCount - 1 ? 0 : prev + 1))
              }
              aria-label="Next photo"
              className="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Lightbox;
