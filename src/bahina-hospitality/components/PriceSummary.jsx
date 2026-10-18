import React from "react";
import { Info } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { NumberTicker } from "@/components/ui/number-ticker";

export function PriceSummary({
  pricePerNight,
  nights: propNights,
  dates = null,
  className = "",
}) {
  const { t } = useLanguage();

  let nights = propNights;
  if (!nights && dates) {
    const start = dates.startDate || dates.checkIn;
    const end = dates.endDate || dates.checkOut;
    if (start && end) {
      const diff = Math.abs(new Date(end) - new Date(start));
      nights = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }
  }
  nights = nights || 1;

  if (!pricePerNight) return null;

  const totalEstimate = pricePerNight * nights;
  const formattedNightPrice = `₹${new Intl.NumberFormat("en-IN").format(pricePerNight)}`;

  return (
    <div
      className={`p-5 bg-[#FFF4D9]/60 border border-[#1C2B4F]/15 rounded-2xl space-y-3 shadow-xs ${className}`}
    >
      {/* Night calculation */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#35508C]">
        <span>
          {formattedNightPrice} × {nights}{" "}
          {t(
            nights === 1 ? "hosp.price.night" : "hosp.price.nights",
            nights === 1 ? "night" : "nights"
          )}
        </span>
        <span className="font-extrabold text-[#1C2B4F]">
          ₹{new Intl.NumberFormat("en-IN").format(totalEstimate)}
        </span>
      </div>

      {/* Estimated total with Number Ticker */}
      <div className="pt-2.5 border-t border-[#1C2B4F]/15 flex items-center justify-between">
        <span className="font-extrabold text-sm sm:text-base text-[#1C2B4F]">
          {t("hosp.price.totalEstimated", "Estimated Total")}
        </span>
        <span className="font-extrabold text-xl sm:text-2xl text-[#BA4A21] flex items-center font-mono">
          <span>₹</span>
          <NumberTicker value={totalEstimate} />
        </span>
      </div>

      {/* Honesty notice */}
      <div className="flex items-start gap-2 pt-1 text-[12px] text-[#1F1B2D]/80 leading-relaxed">
        <Info className="w-3.5 h-3.5 text-[#BA4A21] shrink-0 mt-0.5" />
        <span>
          {t(
            "hosp.price.estimatedNotice",
            "Estimated price. Our team confirms the final price."
          )}
        </span>
      </div>
    </div>
  );
}

export default PriceSummary;
