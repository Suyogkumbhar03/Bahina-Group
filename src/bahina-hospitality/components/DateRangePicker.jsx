import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const DEFAULT_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DEFAULT_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DateRangePicker({
  startDate: propStartDate = null,
  endDate: propEndDate = null,
  dates = null,
  unavailableDates = [],
  onChange,
  onDatesChange,
  className = "",
  compact = false,
}) {
  const { t, isMarathi } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const monthsList = t("hosp.cal.months", "").split(",").filter(Boolean);
  const displayMonths = monthsList.length === 12 ? monthsList : DEFAULT_MONTHS;
  const daysList = t("hosp.cal.days", "").split(",").filter(Boolean);
  const displayDays = daysList.length === 7 ? daysList : DEFAULT_DAYS;

  const startDate = propStartDate || dates?.startDate || dates?.checkIn || null;
  const endDate = propEndDate || dates?.endDate || dates?.checkOut || null;

  const triggerChange = (newRange) => {
    onChange?.(newRange);
    onDatesChange?.({
      ...newRange,
      checkIn: newRange.startDate,
      checkOut: newRange.endDate,
    });
  };

  // Default displayed month
  const initialDate = startDate ? new Date(startDate) : new Date();
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth()); // 0-11

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = displayMonths[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfWeek = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateUnavailable = (dateStr) => {
    // Past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    if (d < today) return true;

    // Sample unavailable dates
    return unavailableDates.includes(dateStr);
  };

  const handleDateClick = (dateStr) => {
    if (isDateUnavailable(dateStr)) return;

    if (!startDate || (startDate && endDate)) {
      // Start a new range
      triggerChange({ startDate: dateStr, endDate: null });
    } else if (startDate && !endDate) {
      if (new Date(dateStr) < new Date(startDate)) {
        // If clicked earlier date, reset start
        triggerChange({ startDate: dateStr, endDate: null });
      } else if (dateStr === startDate) {
        // Single night not allowed for check-in = check-out
        return;
      } else {
        // Check if any unavailable date exists inside range
        const start = new Date(startDate);
        const end = new Date(dateStr);
        let hasConflict = false;
        let cur = new Date(start);
        cur.setDate(cur.getDate() + 1);

        while (cur < end) {
          const y = cur.getFullYear();
          const m = String(cur.getMonth() + 1).padStart(2, "0");
          const day = String(cur.getDate()).padStart(2, "0");
          const iso = `${y}-${m}-${day}`;
          if (unavailableDates.includes(iso)) {
            hasConflict = true;
            break;
          }
          cur.setDate(cur.getDate() + 1);
        }

        if (!hasConflict) {
          triggerChange({ startDate, endDate: dateStr });
          setIsOpen(false);
        }
      }
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    const today = new Date();
    if (currentYear === today.getFullYear() && currentMonth <= today.getMonth()) {
      return; // don't go to past months
    }
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfWeek(currentYear, currentMonth);

  const monthLabel = `${displayMonths[currentMonth]} ${currentYear}`;

  const displayText =
    startDate && endDate
      ? `${formatDisplayDate(startDate)} — ${formatDisplayDate(endDate)}`
      : startDate
      ? `${formatDisplayDate(startDate)} — ${t("hosp.dates.selectCheckout")}`
      : t("hosp.dates.placeholder");

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
          <CalendarIcon className="w-5 h-5 text-[#B4532A] shrink-0" aria-hidden="true" />
          <div className="overflow-hidden">
            {!compact && (
              <span className="block text-xs uppercase tracking-wider text-[#5E534D] font-medium leading-none mb-1">
                {t("hosp.dates.label")}
              </span>
            )}
            <span
              className={`block truncate font-semibold text-sm sm:text-base ${
                startDate ? "text-[#2B2420]" : "text-[#5E534D]"
              }`}
            >
              {displayText}
            </span>
          </div>
        </div>

        {startDate && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onChange?.({ startDate: null, endDate: null });
            }}
            className="p-1 hover:bg-[#F6F0E4] rounded-full text-[#5E534D]"
            title={t("hosp.common.clear")}
          >
            <X className="w-4 h-4" />
          </span>
        )}
      </button>

      {/* Calendar Popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={t("hosp.dates.label")}
          className="absolute top-full left-0 sm:left-auto right-auto mt-2 w-[310px] sm:w-[350px] max-w-[calc(100vw-2rem)] bg-[#FFFFFF] border border-[#E8DFCC] rounded-2xl shadow-2xl p-4 sm:p-5 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Month Header */}
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-[#23402F] text-base sm:text-lg">
              {monthLabel}
            </h4>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevMonth}
                aria-label="Previous month"
                className="w-9 h-9 rounded-full border border-[#E8DFCC] flex items-center justify-center text-[#23402F] hover:bg-[#F6F0E4] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                aria-label="Next month"
                className="w-9 h-9 rounded-full border border-[#E8DFCC] flex items-center justify-center text-[#23402F] hover:bg-[#F6F0E4] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#5E534D] mb-2">
            {displayDays.map((d) => (
              <span key={d} className="py-1">
                {d}
              </span>
            ))}
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty slots before first day */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="w-9 h-9 sm:w-10 sm:h-10" />
            ))}

            {/* Days in month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const mStr = String(currentMonth + 1).padStart(2, "0");
              const dStr = String(day).padStart(2, "0");
              const iso = `${currentYear}-${mStr}-${dStr}`;

              const isStart = startDate === iso;
              const isEnd = endDate === iso;
              const isInRange =
                startDate && endDate && new Date(iso) > new Date(startDate) && new Date(iso) < new Date(endDate);
              const isUnavailable = isDateUnavailable(iso);

              let btnClass = "w-9 h-9 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center justify-center ";

              if (isStart || isEnd) {
                btnClass += "bg-[#B4532A] text-white shadow-sm ring-2 ring-[#B4532A] ring-offset-1";
              } else if (isInRange) {
                btnClass += "bg-[#EBF2EA] text-[#23402F] rounded-none";
              } else if (isUnavailable) {
                btnClass += "text-[#D1C5B0] line-through cursor-not-allowed";
              } else {
                btnClass += "text-[#2B2420] hover:bg-[#F6F0E4]";
              }

              return (
                <button
                  key={iso}
                  type="button"
                  disabled={isUnavailable}
                  onClick={() => handleDateClick(iso)}
                  className={btnClass}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Legend / Info footer */}
          <div className="mt-4 pt-3 border-t border-[#F6F0E4] flex items-center justify-between text-xs text-[#5E534D]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B4532A]" />
              {t("hosp.dates.selected")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D1C5B0]" />
              {t("hosp.dates.bookedOrPast")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default DateRangePicker;
