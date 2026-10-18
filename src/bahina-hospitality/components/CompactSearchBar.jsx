import React from "react";
import { Search, MapPin, Calendar, Users, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

export function CompactSearchBar({
  visible = true,
  searchParams,
  searchState,
  onSearchClick,
  onExpand,
  onFiltersClick,
  className = "",
}) {
  const { t, language } = useLanguage();

  const state = searchParams || searchState || {};

  const adults = state.guests?.adults ?? state.adults ?? 1;
  const children = state.guests?.children ?? state.children ?? 0;
  const totalGuests = adults + children;

  const locationText = t("hosp.common.location", "Radhanagari, Kolhapur");

  const checkIn = state.dates?.checkIn || state.startDate;
  const checkOut = state.dates?.checkOut || state.endDate;

  const formatDateSnippet = (d) => {
    if (!d) return "";
    if (typeof d === "string") return d.slice(5);
    if (d instanceof Date) {
      return `${d.getMonth() + 1}/${d.getDate()}`;
    }
    return "";
  };

  const datesText =
    checkIn && checkOut
      ? `${formatDateSnippet(checkIn)} - ${formatDateSnippet(checkOut)}`
      : t("hosp.dates.anytime", "Anytime");

  const handleClick = () => {
    if (onSearchClick) {
      onSearchClick();
    } else if (onExpand) {
      onExpand();
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed top-[78px] sm:top-[88px] left-0 right-0 z-35 flex justify-center px-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-auto w-full max-w-xl flex items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-[#FFFDF8] border border-[#1C2B4F]/25 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer ${className}`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }}
          >
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1C2B4F] truncate">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#BA4A21] shrink-0" />
                <span className="truncate">{locationText}</span>
              </div>

              <span className="w-1 h-1 rounded-full bg-[#1C2B4F]/20 shrink-0" />

              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#35508C] truncate">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#BA4A21] shrink-0" />
                <span className="truncate">{datesText}</span>
              </div>

              <span className="w-1 h-1 rounded-full bg-[#1C2B4F]/20 shrink-0 hidden xs:inline-block" />

              <div className="hidden xs:flex items-center gap-1.5 text-xs sm:text-sm text-[#35508C]">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#BA4A21] shrink-0" />
                <span>{totalGuests}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {onFiltersClick && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFiltersClick();
                  }}
                  className="p-1.5 rounded-full hover:bg-[#E6ECF7] text-[#1C2B4F] transition-colors"
                  title={t("hosp.filters.openAria", "Open Filters")}
                  aria-label={t("hosp.filters.openAria", "Open Filters")}
                >
                  <SlidersHorizontal className="w-4 h-4 text-[#35508C]" />
                </button>
              )}

              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#BA4A21] text-white flex items-center justify-center shrink-0 shadow-sm hover:scale-105 transition-transform">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CompactSearchBar;
