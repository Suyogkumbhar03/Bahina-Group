import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Bell, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { DateRangePicker } from "./DateRangePicker";
import { GuestPicker } from "./GuestPicker";
import { PriceSummary } from "./PriceSummary";
import { BorderBeam } from "@/components/ui/border-beam";

export function BookingCard({
  farmhouse,
  dates: controlledDates,
  guests: controlledGuests,
  onDatesChange,
  onGuestsChange,
  onRequestBooking,
  onNotifyMe,
  onNotifyClick,
  className = "",
}) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [internalDates, setInternalDates] = useState({
    startDate: null,
    endDate: null,
  });

  const [internalGuests, setInternalGuests] = useState({
    adults: 2,
    children: 0,
  });

  const rawDates = controlledDates || internalDates;
  const startDate = rawDates.startDate || rawDates.checkIn;
  const endDate = rawDates.endDate || rawDates.checkOut;
  const guests = controlledGuests || internalGuests;

  const handleDatesUpdate = (newDates) => {
    if (onDatesChange) onDatesChange(newDates);
    else setInternalDates(newDates);
  };

  const handleGuestsUpdate = (newGuests) => {
    if (onGuestsChange) onGuestsChange(newGuests);
    else setInternalGuests(newGuests);
  };

  const isOpen = farmhouse.status === "open";

  // Calculate number of nights
  const calculateNights = () => {
    if (!startDate || !endDate) return 1;
    const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const nights = calculateNights();

  const handleRequestClick = () => {
    if (onRequestBooking) {
      onRequestBooking();
      return;
    }
    const params = new URLSearchParams();
    if (startDate) params.set("checkIn", startDate);
    if (endDate) params.set("checkOut", endDate);
    params.set("adults", guests.adults);
    params.set("children", guests.children);

    navigate(`/hospitality/book/${farmhouse.slug}?${params.toString()}`);
  };

  const handleNotifyTrigger = () => {
    if (onNotifyMe) onNotifyMe();
    else if (onNotifyClick) onNotifyClick(farmhouse);
  };

  return (
    <div
      className={`bg-[#FFFDF8] rounded-[32px] border-2 border-[#1C2B4F]/25 shadow-2xl p-6 sm:p-7 space-y-5 relative overflow-hidden ${className}`}
    >
      {/* Signature Border Beam (The ONLY element that uses it as required) */}
      <BorderBeam
        size={240}
        duration={12}
        anchor={90}
        borderWidth={2}
        colorFrom="#F4A62A"
        colorTo="#BA4A21"
      />

      {/* Price Header */}
      <div className="flex items-baseline justify-between border-b border-[#1C2B4F]/15 pb-4 pt-1">
        {farmhouse.pricePerNight ? (
          <div>
            <span className="text-xs font-bold text-[#35508C] block uppercase tracking-wider">
              {t("hosp.card.fromPrice", "From")}
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#1C2B4F]">
                ₹{new Intl.NumberFormat("en-IN").format(farmhouse.pricePerNight)}
              </span>
              <span className="text-xs sm:text-sm text-[#1F1B2D]/70 font-semibold">
                / {t("hosp.price.night", "night")}
              </span>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-lg font-bold text-[#35508C]">
              {t("hosp.card.priceOnRequest", "Price on request")}
            </span>
            <span className="text-xs text-[#F4A62A] font-bold block mt-0.5">
              {t("hosp.status.comingSoon", "Coming soon")}
            </span>
          </div>
        )}

        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#E6ECF7] text-[#1C2B4F] text-xs font-bold border border-[#1C2B4F]/15">
          <ShieldCheck className="w-3.5 h-3.5 text-[#BA4A21]" />
          <span>Verified Stay</span>
        </div>
      </div>

      {/* Date Range Picker */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-[#35508C] font-bold mb-1.5 pl-1">
          {t("hosp.search.datesLabel", "Stay Dates")}
        </label>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          unavailableDates={farmhouse.unavailableDates || []}
          onChange={handleDatesUpdate}
        />
      </div>

      {/* Guest Picker */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-[#35508C] font-bold mb-1.5 pl-1">
          {t("hosp.search.guestsLabel", "Guests")}
        </label>
        <GuestPicker
          adults={guests.adults}
          children={guests.children}
          maxGuests={farmhouse.maxGuests}
          onChange={handleGuestsUpdate}
        />
      </div>

      {/* Price Breakdown Summary with Animated NumberTicker */}
      {farmhouse.pricePerNight && startDate && endDate && (
        <PriceSummary
          pricePerNight={farmhouse.pricePerNight}
          nights={nights}
        />
      )}

      {/* Action Button */}
      <div className="pt-2">
        {isOpen ? (
          <button
            type="button"
            onClick={handleRequestClick}
            className="w-full py-3.5 px-6 rounded-full bg-[#BA4A21] hover:bg-[#9E3E1A] text-white font-extrabold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-xl hover:scale-101 active:scale-99 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BA4A21]"
          >
            <span>{t("hosp.details.requestToBook", "Request to book")}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNotifyTrigger}
            className="w-full py-3.5 px-6 rounded-full bg-[#1C2B4F] hover:bg-[#35508C] text-[#FFFDF8] font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-xl hover:scale-101 active:scale-99 flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
          >
            <Bell className="w-5 h-5 text-[#F4A62A]" />
            <span>{t("hosp.details.notifyWhenOpens", "Notify me when it opens")}</span>
          </button>
        )}
      </div>

      {/* Reassurance */}
      <p className="text-center text-xs text-[#1F1B2D]/70 leading-relaxed pt-1">
        {isOpen
          ? t("hosp.book.previewNoPayment", "Design preview: no payment taken • Direct host coordination")
          : t("hosp.details.constructionUpdatesTitle", "Construction updates")}
      </p>
    </div>
  );
}

export default BookingCard;
