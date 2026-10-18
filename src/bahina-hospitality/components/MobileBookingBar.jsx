import React, { useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { BookingCard } from "./BookingCard";

export function MobileBookingBar({
  farmhouse,
  dates,
  guests,
  onDatesChange,
  onGuestsChange,
  onRequestBooking,
  onNotifyMe,
}) {
  const { t } = useLanguage();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isOpen = farmhouse.status === "open";
  const formattedPrice = farmhouse.pricePerNight
    ? `₹${new Intl.NumberFormat("en-IN").format(farmhouse.pricePerNight)}`
    : null;

  return (
    <>
      {/* Fixed Smooth Bottom Bar on Phones (< lg: 1024px) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF8]/95 border-t border-[#1C2B4F]/20 px-4 py-3 backdrop-blur-md shadow-2xl flex items-center justify-between gap-3">
        <div className="min-w-0">
          {formattedPrice ? (
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-[#1C2B4F]">
                {formattedPrice}
              </span>
              <span className="text-xs text-[#1F1B2D]/70 font-semibold">
                / {t("hosp.price.night", "night")}
              </span>
            </div>
          ) : (
            <span className="text-sm font-bold text-[#35508C]">
              {t("hosp.card.priceOnRequest", "Price on request")}
            </span>
          )}
          <span className="text-[11px] font-bold text-[#BA4A21] block truncate">
            {isOpen ? "Direct host coordination" : t("hosp.status.comingSoon", "Coming soon")}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsSheetOpen(true)}
          className={`shrink-0 text-xs sm:text-sm font-extrabold py-2.5 px-5 rounded-full transition-all shadow-md active:scale-98 text-white ${
            isOpen ? "bg-[#BA4A21] hover:bg-[#9E3E1A]" : "bg-[#1C2B4F] hover:bg-[#35508C]"
          }`}
        >
          {isOpen ? t("hosp.details.requestToBook", "Request to book") : t("hosp.card.notifyMe", "Notify me")}
        </button>
      </div>

      {/* Mobile Booking Sheet Modal */}
      {isSheetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
        >
          <div className="bg-[#FFFDF8] rounded-t-[32px] border-t-2 border-[#1C2B4F]/25 max-h-[85vh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C2B4F]/15">
              <h3 className="text-lg font-extrabold text-[#1C2B4F]">
                {isOpen ? t("hosp.details.requestToBook", "Request to book") : t("hosp.details.notifyWhenOpens", "Notify me when it opens")}
              </h3>
              <button
                type="button"
                onClick={() => setIsSheetOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#E6ECF7] text-[#1C2B4F]"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <BookingCard
              farmhouse={farmhouse}
              dates={dates}
              guests={guests}
              onDatesChange={onDatesChange}
              onGuestsChange={onGuestsChange}
              onRequestBooking={() => {
                setIsSheetOpen(false);
                onRequestBooking?.();
              }}
              onNotifyMe={() => {
                setIsSheetOpen(false);
                onNotifyMe?.();
              }}
              className="border-none shadow-none p-0 bg-transparent"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default MobileBookingBar;
