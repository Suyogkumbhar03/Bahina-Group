import React from "react";
import { X, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { AMENITIES } from "../data/amenities";

export function FilterSheet({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset,
  resultCount = 0,
}) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleStatusToggle = (statusVal) => {
    const current = filters.status || [];
    const next = current.includes(statusVal)
      ? current.filter((s) => s !== statusVal)
      : [...current, statusVal];
    onChange({ ...filters, status: next });
  };

  const handleAmenityToggle = (amenityId) => {
    const current = filters.amenities || [];
    const next = current.includes(amenityId)
      ? current.filter((id) => id !== amenityId)
      : [...current, amenityId];
    onChange({ ...filters, amenities: next });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="filters-sheet-title"
      className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="bg-[#FFFFFF] rounded-t-3xl border-t border-[#E8DFCC] max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F6F0E4]">
          <h3 id="filters-sheet-title" className="font-serif text-xl font-bold text-[#23402F]">
            {t("hosp.filter.title")}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("hosp.common.close")}
            className="p-2 rounded-full hover:bg-[#F6F0E4] text-[#5E534D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filters Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. Status Filter */}
          <div>
            <h4 className="font-bold text-sm text-[#23402F] uppercase tracking-wider mb-3">
              {t("hosp.filter.statusTitle")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "open", label: t("hosp.status.open") },
                { id: "coming_soon", label: t("hosp.status.comingSoon") },
                { id: "under_construction", label: t("hosp.status.underConstruction") },
              ].map((st) => {
                const isSelected = (filters.status || []).includes(st.id);
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleStatusToggle(st.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                      isSelected
                        ? "bg-[#23402F] text-white border-[#23402F]"
                        : "bg-[#FFFFFF] text-[#2B2420] border-[#E8DFCC] hover:bg-[#F6F0E4]"
                    }`}
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Min Capacity / Guests */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm text-[#23402F] uppercase tracking-wider">
                {t("hosp.filter.minGuests")}
              </h4>
              <span className="font-bold text-[#B4532A] text-sm">
                {filters.minGuests || 1}+ {t("hosp.guests.count")}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={filters.minGuests || 1}
              onChange={(e) =>
                onChange({ ...filters, minGuests: parseInt(e.target.value, 10) })
              }
              className="w-full accent-[#B4532A] cursor-pointer"
            />
          </div>

          {/* 3. Max Price per Night Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm text-[#23402F] uppercase tracking-wider">
                {t("hosp.filter.maxPrice")}
              </h4>
              <span className="font-bold text-[#B4532A] text-sm">
                ₹{new Intl.NumberFormat("en-IN").format(filters.maxPrice || 12000)}
              </span>
            </div>
            <input
              type="range"
              min="3000"
              max="15000"
              step="500"
              value={filters.maxPrice || 12000}
              onChange={(e) =>
                onChange({ ...filters, maxPrice: parseInt(e.target.value, 10) })
              }
              className="w-full accent-[#B4532A] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-[#5E534D] mt-1">
              <span>₹3,000</span>
              <span>₹15,000+</span>
            </div>
          </div>

          {/* 4. Amenities Checkboxes */}
          <div>
            <h4 className="font-bold text-sm text-[#23402F] uppercase tracking-wider mb-3">
              {t("hosp.filter.amenitiesTitle")}
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {AMENITIES.map((amenity) => {
                const isChecked = (filters.amenities || []).includes(amenity.id);
                return (
                  <label
                    key={amenity.id}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer select-none transition-colors ${
                      isChecked
                        ? "bg-[#EBF2EA] border-[#8FAE8B] text-[#23402F]"
                        : "bg-[#FFFFFF] border-[#E8DFCC] text-[#2B2420] hover:bg-[#F6F0E4]"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                        isChecked
                          ? "bg-[#23402F] border-[#23402F] text-white"
                          : "border-[#D1C5B0] bg-white"
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs sm:text-sm font-medium">
                      {t(amenity.labelKey)}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer with Reset and Apply */}
        <div className="p-4 sm:p-6 border-t border-[#F6F0E4] bg-[#FDFBF7] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onReset}
            className="text-sm font-semibold text-[#5E534D] underline hover:text-[#23402F]"
          >
            {t("hosp.filter.clearAll")}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-clay flex-1 max-w-xs text-sm sm:text-base"
          >
            {t("hosp.filter.showResults")} ({resultCount})
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterSheet;
