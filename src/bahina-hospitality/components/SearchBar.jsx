import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { DateRangePicker } from "./DateRangePicker";
import { GuestPicker } from "./GuestPicker";

export function SearchBar({
  onSearch,
  initialValues = {},
  initialDates,
  initialGuests,
  initialDistrict,
  availableDistricts = ["radhanagari"],
  className = "",
}) {
  const { t, language } = useLanguage();

  const [selectedDistrict, setSelectedDistrict] = useState(
    initialDistrict || initialValues.district || "radhanagari"
  );
  const [dates, setDates] = useState({
    startDate: initialDates?.checkIn || initialValues.startDate || null,
    endDate: initialDates?.checkOut || initialValues.endDate || null,
  });
  const [guests, setGuests] = useState({
    adults: initialGuests?.adults || initialValues.adults || 2,
    children: initialGuests?.children || initialValues.children || 0,
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch?.({
      district: selectedDistrict,
      dates: { checkIn: dates.startDate, checkOut: dates.endDate },
      startDate: dates.startDate,
      endDate: dates.endDate,
      guests: { adults: guests.adults, children: guests.children },
      adults: guests.adults,
      children: guests.children,
    });
  };

  return (
    <form
      id="hero-search-bar"
      onSubmit={handleSearchSubmit}
      className={`w-full bg-[#FFFDF8] border-2 border-[#1C2B4F]/20 rounded-3xl p-3 sm:p-5 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-3 items-center relative ${className}`}
    >
      {/* Decorative Ticket Perforation Stubs on left & right edge for wide screens */}
      <div className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-6 bg-[#1C2B4F] rounded-r-full pointer-events-none" />
      <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-6 bg-[#1C2B4F] rounded-l-full pointer-events-none" />

      {/* 1. Location Fixed Chip (Radhanagari, Kolhapur) */}
      <div className="md:col-span-3">
        <div className="relative">
          <label className="block text-xs uppercase tracking-wider text-[#35508C] font-bold leading-none mb-1 pl-3">
            {t("hosp.search.locationLabel", "Location")}
          </label>
          <div className="flex items-center px-3.5 py-2 bg-[#FAF0EC] border border-[#BA4A21]/30 rounded-2xl min-h-[50px]">
            <MapPin className="w-5 h-5 text-[#BA4A21] shrink-0 mr-2" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-bold text-[#1C2B4F] text-sm">
                {t("hosp.common.location", "Radhanagari, Kolhapur")}
              </span>
              <span className="text-[10px] text-[#5C6E64]">
                {t("hosp.dest.kolhapurSubtitle", "Western Ghats Sanctuary")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Date Range Picker */}
      <div className="md:col-span-4">
        <label className="block text-xs uppercase tracking-wider text-[#35508C] font-bold leading-none mb-1 pl-3">
          {t("hosp.search.datesLabel", "Dates")}
        </label>
        <DateRangePicker
          startDate={dates.startDate}
          endDate={dates.endDate}
          onChange={setDates}
        />
      </div>

      {/* 3. Guest Picker */}
      <div className="md:col-span-3">
        <label className="block text-xs uppercase tracking-wider text-[#35508C] font-bold leading-none mb-1 pl-3">
          {t("hosp.search.guestsLabel", "Guests")}
        </label>
        <GuestPicker
          adults={guests.adults}
          children={guests.children}
          onChange={setGuests}
        />
      </div>

      {/* 4. Search Button */}
      <div className="md:col-span-2 flex items-end">
        <button
          type="submit"
          className="w-full min-h-[50px] px-5 py-3 rounded-2xl bg-[#BA4A21] hover:bg-[#9E3E1A] text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-xl hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BA4A21]"
        >
          <Search className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span className="whitespace-nowrap">{t("hosp.search.button", "Search")}</span>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
