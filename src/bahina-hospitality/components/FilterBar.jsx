import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown, X, Check, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { AMENITIES } from "../data/amenities";
import { FilterSheet } from "./FilterSheet";

export function FilterBar({
  filters = {},
  onChange,
  onFiltersChange,
  onReset,
  onClearAll,
  onOpenMobileFilter,
  sortBy = "recommended",
  onSortChange,
  resultCount = 0,
  className = "",
}) {
  const { t } = useLanguage();
  const [internalSheetOpen, setInternalSheetOpen] = useState(false);
  const triggerChange = onFiltersChange || onChange;
  const triggerReset = onClearAll || onReset;

  // Desktop popover states
  const [activePopover, setActivePopover] = useState(null); // 'price' | 'amenities' | null
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setActivePopover(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedStatuses = Array.isArray(filters?.status) ? filters.status : [];
  const selectedAmenities = Array.isArray(filters?.amenities) ? filters.amenities : [];

  const handleStatusToggle = (statusVal) => {
    const next = selectedStatuses.includes(statusVal)
      ? selectedStatuses.filter((s) => s !== statusVal)
      : [...selectedStatuses, statusVal];
    triggerChange?.({ ...filters, status: next });
  };

  const handleAmenityToggle = (amenityId) => {
    const next = selectedAmenities.includes(amenityId)
      ? selectedAmenities.filter((id) => id !== amenityId)
      : [...selectedAmenities, amenityId];
    triggerChange?.({ ...filters, amenities: next });
  };

  // Count active applied filters
  const activeFiltersCount =
    selectedStatuses.length +
    selectedAmenities.length +
    (filters?.minGuests > 1 ? 1 : 0) +
    ((filters?.maxPrice || 15000) < 15000 ? 1 : 0);

  const handleMobileClick = () => {
    if (onOpenMobileFilter) {
      onOpenMobileFilter();
    } else {
      setInternalSheetOpen(true);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Filter Header & Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8DFCC]">
        {/* Mobile Filter Button (visible below 640px) */}
        <div className="flex sm:hidden items-center gap-2 w-full">
          <button
            type="button"
            onClick={handleMobileClick}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#E8DFCC] rounded-full font-sans font-bold text-xs text-[#182C20] shadow-sm min-tap-target hover:border-[#B9532C] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#B9532C]" />
            <span>{t("hosp.filter.button", "Filters")}</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#B9532C] text-white text-xs flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Mobile Sort Dropdown */}
          <select
            value={filters?.sortBy || sortBy}
            onChange={(e) => {
              if (onSortChange) onSortChange(e.target.value);
              else triggerChange?.({ ...filters, sortBy: e.target.value });
            }}
            className="px-3 py-2.5 bg-white border border-[#E8DFCC] rounded-full text-xs font-sans font-semibold text-[#182C20] min-tap-target focus:outline-none"
          >
            <option value="recommended">{t("hosp.sort.recommended", "Recommended")}</option>
            <option value="price_asc">{t("hosp.sort.priceAsc", "Price: Low to High")}</option>
            <option value="price_desc">{t("hosp.sort.priceDesc", "Price: High to Low")}</option>
            <option value="capacity_desc">{t("hosp.sort.capacityDesc", "Capacity: Largest")}</option>
          </select>
        </div>

        {/* Desktop Filter Chips */}
        <div ref={popoverRef} className="hidden sm:flex flex-wrap items-center gap-2.5 relative">
          {/* Status Quick Segmented Tabs with Spring Indicator */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-[#E8DFCC] shadow-xs">
            {[
              { id: "all", label: t("hosp.status.all", "All Stays") },
              { id: "open", label: t("hosp.status.open", "Open Now") },
              { id: "coming_soon", label: t("hosp.status.comingSoon", "Coming Soon") },
              { id: "under_construction", label: t("hosp.status.underConstruction", "Under Construction") },
            ].map((st) => {
              const isSelected =
                st.id === "all"
                  ? !filters.status || filters.status.length === 0
                  : (filters.status || []).includes(st.id);

              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => {
                    if (st.id === "all") {
                      triggerChange?.({ ...filters, status: [] });
                    } else {
                      handleStatusToggle(st.id);
                    }
                  }}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-200 z-10 ${
                    isSelected
                      ? "text-white font-bold"
                      : "text-[#5E534D] hover:text-[#182C20]"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="filter-status-active-pill"
                      className="absolute inset-0 rounded-full bg-[#182C20] shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span>{st.label}</span>
                </button>
              );
            })}
          </div>

          {/* Price Popover Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActivePopover(activePopover === "price" ? null : "price")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-sans font-semibold transition-all ${
                (filters.maxPrice || 15000) < 15000
                  ? "bg-emerald-50 text-[#182C20] border-emerald-400 font-bold shadow-xs"
                  : "bg-white text-[#5E534D] border-[#E8DFCC] hover:border-[#B9532C] hover:text-[#182C20]"
              }`}
            >
              <span>
                {(filters.maxPrice || 15000) < 15000
                  ? `≤ ₹${new Intl.NumberFormat("en-IN").format(filters.maxPrice)}`
                  : t("hosp.filter.price", "Price")}
              </span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activePopover === "price" && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-[#E8DFCC] rounded-2xl p-5 shadow-2xl z-40 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-sans font-bold text-[#182C20] uppercase tracking-wider">
                    {t("hosp.filter.maxPrice", "Max Price / Night")}
                  </span>
                  <span className="font-mono font-bold text-[#B9532C] text-sm bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    ₹{new Intl.NumberFormat("en-IN").format(filters.maxPrice || 15000)}
                  </span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="15000"
                  step="500"
                  value={filters.maxPrice || 15000}
                  onChange={(e) =>
                    triggerChange?.({ ...filters, maxPrice: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-[#B9532C] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-sans font-semibold text-[#5E534D] mt-2">
                  <span>₹3,000</span>
                  <span>₹15,000+</span>
                </div>
              </div>
            )}
          </div>

          {/* Amenities Popover Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActivePopover(activePopover === "amenities" ? null : "amenities")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-sans font-semibold transition-all ${
                selectedAmenities.length > 0
                  ? "bg-emerald-50 text-[#182C20] border-emerald-400 font-bold shadow-xs"
                  : "bg-white text-[#5E534D] border-[#E8DFCC] hover:border-[#B9532C] hover:text-[#182C20]"
              }`}
            >
              <span>
                {selectedAmenities.length > 0
                  ? `${t("hosp.filter.amenitiesTitle", "Amenities")} (${selectedAmenities.length})`
                  : t("hosp.filter.amenitiesTitle", "Amenities")}
              </span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activePopover === "amenities" && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-[#E8DFCC] rounded-2xl p-5 shadow-2xl z-40 animate-in fade-in zoom-in-95 duration-150">
                <span className="block text-xs font-sans font-bold text-[#182C20] uppercase tracking-wider mb-3">
                  {t("hosp.filter.amenitiesTitle", "Select Amenities")}
                </span>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                  {AMENITIES.map((a) => {
                    const isChecked = selectedAmenities.includes(a.id);
                    return (
                      <label
                        key={a.id}
                        className={`flex items-center gap-2 p-2 rounded-xl text-xs font-sans font-medium cursor-pointer transition-colors ${
                          isChecked
                            ? "bg-emerald-50 text-[#182C20] font-bold"
                            : "hover:bg-[#F6F0E4] text-[#2B2420]"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                            isChecked
                              ? "bg-[#182C20] border-[#182C20] text-white"
                              : "border-[#D1C5B0] bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="truncate">{t(a.labelKey)}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Sort Dropdown & Result Counter */}
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-xs font-sans text-[#5E534D] font-bold tracking-wide">
            {resultCount} {t("hosp.results.count", "stays found")}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-sans text-[#5E534D] font-medium">{t("hosp.sort.label", "Sort")}:</span>
            <select
              value={filters?.sortBy || sortBy}
              onChange={(e) => {
                if (onSortChange) onSortChange(e.target.value);
                else triggerChange?.({ ...filters, sortBy: e.target.value });
              }}
              className="bg-white border border-[#E8DFCC] rounded-full px-3 py-1.5 text-xs font-sans font-bold text-[#182C20] cursor-pointer hover:border-[#B9532C] focus:outline-none transition-colors shadow-xs"
            >
              <option value="recommended">{t("hosp.sort.recommended", "Recommended")}</option>
              <option value="price_asc">{t("hosp.sort.priceAsc", "Price: Low to High")}</option>
              <option value="price_desc">{t("hosp.sort.priceDesc", "Price: High to Low")}</option>
              <option value="capacity_desc">{t("hosp.sort.capacityDesc", "Capacity: Largest")}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applied Filters Removable Chips & Clear All */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-3">
          <span className="text-xs font-sans font-bold text-[#5E534D] uppercase tracking-wider">
            {t("hosp.filter.applied", "Applied")}:
          </span>

          {/* Status chips */}
          {selectedStatuses.map((st) => (
            <span
              key={st}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium bg-emerald-50 text-[#182C20] border border-emerald-200 shadow-xs"
            >
              <span>{t(`hosp.status.${st === "coming_soon" ? "comingSoon" : st === "under_construction" ? "underConstruction" : "open"}`)}</span>
              <button
                type="button"
                onClick={() => handleStatusToggle(st)}
                className="hover:text-[#B9532C] transition-colors"
                aria-label="Remove filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          {/* Amenities chips */}
          {selectedAmenities.map((id) => (
            <span
              key={id}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium bg-emerald-50 text-[#182C20] border border-emerald-200 shadow-xs"
            >
              <span>{t(`hosp.amenity.${id}`)}</span>
              <button
                type="button"
                onClick={() => handleAmenityToggle(id)}
                className="hover:text-[#B9532C] transition-colors"
                aria-label="Remove amenity filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          {/* Max price chip */}
          {(filters?.maxPrice || 15000) < 15000 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium bg-amber-50 text-[#182C20] border border-amber-200 shadow-xs">
              <span>≤ ₹{new Intl.NumberFormat("en-IN").format(filters.maxPrice)}</span>
              <button
                type="button"
                onClick={() => triggerChange?.({ ...filters, maxPrice: 15000 })}
                className="hover:text-[#B9532C] transition-colors"
                aria-label="Remove price filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {/* Clear All Button */}
          <button
            type="button"
            onClick={triggerReset}
            className="text-xs font-sans font-bold text-[#B9532C] hover:underline ml-2 uppercase tracking-wider"
          >
            {t("hosp.filter.clearAll", "Clear all")}
          </button>
        </div>
      )}

      {/* Internal Mobile Sheet Fallback if needed */}
      {!onOpenMobileFilter && (
        <FilterSheet
          isOpen={internalSheetOpen}
          onClose={() => setInternalSheetOpen(false)}
          filters={filters}
          onChange={triggerChange}
          onReset={triggerReset}
          resultCount={resultCount}
        />
      )}
    </div>
  );
}

export default FilterBar;
