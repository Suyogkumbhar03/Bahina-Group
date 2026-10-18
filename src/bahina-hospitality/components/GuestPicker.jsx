import React, { useState, useRef, useEffect } from "react";
import { Users, Plus, Minus, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function GuestPicker({
  adults: propAdults,
  children: propChildren,
  guests = null,
  maxGuests = 20,
  onChange,
  onGuestsChange,
  className = "",
  compact = false,
}) {
  const { t, isMarathi } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const adults = propAdults ?? guests?.adults ?? 2;
  const children = propChildren ?? guests?.children ?? 0;
  const totalGuests = adults + children;

  const triggerChange = (newGuests) => {
    onChange?.(newGuests);
    onGuestsChange?.(newGuests);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAdultChange = (delta) => {
    const newAdults = Math.max(1, adults + delta);
    if (newAdults + children <= maxGuests) {
      triggerChange({ adults: newAdults, children });
    }
  };

  const handleChildChange = (delta) => {
    const newChildren = Math.max(0, children + delta);
    if (adults + newChildren <= maxGuests) {
      triggerChange({ adults, children: newChildren });
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={`w-full flex items-center justify-between text-left px-4 py-3 bg-[#FFFFFF] border border-[#E8DFCC] rounded-xl hover:border-[#B4532A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B4532A] min-h-[52px] ${
          compact ? "py-2 px-3 text-sm" : ""
        }`}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <Users className="w-5 h-5 text-[#B4532A] shrink-0" aria-hidden="true" />
          <div>
            {!compact && (
              <span className="block text-xs uppercase tracking-wider text-[#5E534D] font-medium leading-none mb-1">
                {t("hosp.guests.label")}
              </span>
            )}
            <span className="block font-semibold text-[#2B2420] truncate text-sm sm:text-base">
              {totalGuests} {t("hosp.guests.count")}
              {children > 0 && ` (${adults} + ${children})`}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#5E534D] transition-transform shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Stepper Popover Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={t("hosp.guests.label")}
          className="absolute top-full left-0 md:left-auto md:right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-[#FFFFFF] border border-[#E8DFCC] rounded-2xl shadow-2xl p-4 sm:p-5 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Adults row */}
          <div className="flex items-center justify-between py-3 border-b border-[#F6F0E4]">
            <div>
              <span className="block font-bold text-[#23402F] text-sm sm:text-base">
                {t("hosp.guests.adults")}
              </span>
              <span className="block text-xs text-[#5E534D]">
                {t("hosp.guests.adultsAge")}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={adults <= 1}
                onClick={() => handleAdultChange(-1)}
                aria-label={t("hosp.guests.decreaseAdults")}
                className="w-10 h-10 rounded-full border border-[#D1C5B0] flex items-center justify-center text-[#23402F] hover:bg-[#F6F0E4] disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-bold text-base text-[#2B2420]">
                {adults}
              </span>
              <button
                type="button"
                disabled={adults + children >= maxGuests}
                onClick={() => handleAdultChange(1)}
                aria-label={t("hosp.guests.increaseAdults")}
                className="w-10 h-10 rounded-full border border-[#D1C5B0] flex items-center justify-center text-[#23402F] hover:bg-[#F6F0E4] disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Children row */}
          <div className="flex items-center justify-between py-3">
            <div>
              <span className="block font-bold text-[#23402F] text-sm sm:text-base">
                {t("hosp.guests.children")}
              </span>
              <span className="block text-xs text-[#5E534D]">
                {t("hosp.guests.childrenAge")}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={children <= 0}
                onClick={() => handleChildChange(-1)}
                aria-label={t("hosp.guests.decreaseChildren")}
                className="w-10 h-10 rounded-full border border-[#D1C5B0] flex items-center justify-center text-[#23402F] hover:bg-[#F6F0E4] disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-bold text-base text-[#2B2420]">
                {children}
              </span>
              <button
                type="button"
                disabled={adults + children >= maxGuests}
                onClick={() => handleChildChange(1)}
                aria-label={t("hosp.guests.increaseChildren")}
                className="w-10 h-10 rounded-full border border-[#D1C5B0] flex items-center justify-center text-[#23402F] hover:bg-[#F6F0E4] disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Max note & Apply */}
          <div className="pt-3 mt-1 border-t border-[#F6F0E4] flex items-center justify-between">
            <span className="text-xs text-[#5E534D]">
              {t("hosp.guests.maxCapacity")}: {maxGuests}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#23402F] text-white hover:bg-[#1a3023] transition-colors"
            >
              {t("hosp.common.done")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GuestPicker;
