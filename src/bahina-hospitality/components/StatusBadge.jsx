import React from "react";
import { useLanguage } from "@/lib/i18n";
import { PREVIEW_MODE } from "@/config";

export function StatusBadge({ status = "open", showSampleChip = true, className = "" }) {
  const { t } = useLanguage();

  const getStatusStyles = () => {
    switch (status) {
      case "open":
        return "bg-emerald-50 text-emerald-900 border-emerald-300/80 shadow-xs";
      case "under_construction":
        return "bg-amber-50 text-amber-900 border-amber-300/80 shadow-xs";
      case "coming_soon":
      default:
        return "bg-stone-100 text-stone-800 border-stone-300/80 shadow-xs";
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "open":
        return t("hosp.status.open", "Open for Stays");
      case "under_construction":
        return t("hosp.status.underConstruction", "Under Construction");
      case "coming_soon":
      default:
        return t("hosp.status.comingSoon", "Coming Soon");
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-sans font-bold tracking-wide border ${getStatusStyles()}`}
      >
        {status === "open" && (
          <span className="relative flex h-2 w-2 mr-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
          </span>
        )}
        {status === "under_construction" && (
          <span className="relative flex h-2 w-2 mr-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600" />
          </span>
        )}
        <span>{getStatusLabel()}</span>
      </span>

      {PREVIEW_MODE && showSampleChip && (
        <span
          className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-sans font-semibold tracking-wide bg-[#F6F0E4] text-[#5E534D] border border-[#E8DFCC]"
          title="Sample design item"
        >
          {t("hosp.badge.sample", "Sample")}
        </span>
      )}
    </div>
  );
}

export default StatusBadge;
