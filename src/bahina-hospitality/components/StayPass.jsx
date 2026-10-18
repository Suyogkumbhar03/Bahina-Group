import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, ShieldCheck, PhoneCall, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { BlockPrintFlower } from "./BlockPrintMotif";

export function StayPass({
  farmhouse,
  dates,
  guests,
  requestId = "BH-2026-8492",
  showStamp = true,
  className = "",
}) {
  const { t } = useLanguage();

  const totalGuests = (guests?.adults || 2) + (guests?.children || 0);

  const checkInStr =
    dates?.checkIn || dates?.startDate || "2026-11-14";
  const checkOutStr =
    dates?.checkOut || dates?.endDate || "2026-11-16";

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto bg-[#FFFDF8] border-2 border-[#1C2B4F]/25 rounded-3xl shadow-2xl overflow-hidden ${className}`}
    >
      {/* 1. INDIGO HEADER STRIP */}
      <div className="bg-[#1C2B4F] text-[#FFFDF8] px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-[#1C2B4F]">
        <div className="flex items-center gap-2.5">
          <BlockPrintFlower size={20} className="text-[#F4A62A]" />
          <div>
            <h3 className="font-extrabold tracking-widest text-xs sm:text-sm uppercase text-[#FFFDF8]">
              {t("hosp.pass.title", "BAHINA HOSPITALITY STAY PASS")}
            </h3>
            <span className="text-[11px] text-[#F4A62A] font-bold block tracking-wider">
              {t("hosp.pass.previewNote", "Design preview: nothing was sent or stored")}
            </span>
          </div>
        </div>

        <div className="hidden xs:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold text-[#FFF4D9] uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#F4A62A]" />
          <span>{t("hosp.pass.guestCopy", "GUEST COPY")}</span>
        </div>
      </div>

      {/* 2. TICKET PERFORATION LINE WITH NOTCHED EDGES */}
      <div className="relative py-2 bg-[#FFFDF8]">
        {/* Left Cutout Notch */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1C2B4F]/10 border-r-2 border-[#1C2B4F]/25" />
        {/* Right Cutout Notch */}
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1C2B4F]/10 border-l-2 border-[#1C2B4F]/25" />
        {/* Dotted Perforation Line */}
        <div className="mx-6 border-t-2 border-dashed border-[#1C2B4F]/25" />
      </div>

      {/* 3. TICKET BODY */}
      <div className="p-6 sm:p-8 space-y-6 relative bg-[#FFFDF8]">
        {/* Farmhouse Details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1C2B4F]/10 pb-5">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#BA4A21]">
              {t("hosp.pass.location", "LOCATION")}
            </span>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-[#1C2B4F] mt-0.5">
              {farmhouse ? t(farmhouse.nameKey, "Sample Stay") : "Mango Orchard Retreat"}
            </h4>
            <div className="flex items-center gap-1 text-sm text-[#35508C] font-semibold mt-1">
              <MapPin className="w-4 h-4 text-[#BA4A21]" />
              <span>
                {farmhouse
                  ? `${t(farmhouse.villageKey)}, ${t(farmhouse.districtKey)}`
                  : "Radhanagari, Kolhapur"}
              </span>
            </div>
          </div>

          {/* Request Reference Badge */}
          <div className="p-3 rounded-2xl bg-[#FFF4D9] border border-[#1C2B4F]/15 self-start sm:self-auto text-left sm:text-right">
            <span className="text-[11px] font-bold text-[#1F1B2D]/70 block uppercase tracking-wider">
              {t("hosp.pass.reference", "REQUEST NUMBER")}
            </span>
            <span className="text-lg font-black text-[#1C2B4F] font-mono tracking-tight block">
              {requestId}
            </span>
          </div>
        </div>

        {/* Dates & Guests Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#E6ECF7]/50 border border-[#1C2B4F]/15">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#35508C] mb-1">
              <Calendar className="w-4 h-4 text-[#BA4A21]" />
              <span>{t("hosp.pass.dates", "RESERVED DATES")}</span>
            </div>
            <div className="text-base font-extrabold text-[#1C2B4F]">
              {checkInStr} → {checkOutStr}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#E6ECF7]/50 border border-[#1C2B4F]/15">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#35508C] mb-1">
              <Users className="w-4 h-4 text-[#BA4A21]" />
              <span>{t("hosp.pass.guests", "TOTAL GUESTS")}</span>
            </div>
            <div className="text-base font-extrabold text-[#1C2B4F]">
              {totalGuests} {t("hosp.search.guestSummaryPlural", "guests")} ({guests?.adults || 2} adults, {guests?.children || 0} kids)
            </div>
          </div>
        </div>

        {/* Host Call Reassurance */}
        <div className="p-4 rounded-2xl bg-[#FFF4D9] border border-[#F4A62A]/40 flex items-start gap-3">
          <PhoneCall className="w-5 h-5 text-[#BA4A21] shrink-0 mt-0.5" />
          <p className="text-sm font-semibold text-[#1C2B4F] leading-relaxed">
            {t(
              "hosp.pass.contactNote",
              "Our local host team will call within 24 hours to confirm fresh farm meals and arrival directions."
            )}
          </p>
        </div>

        {/* ============================================================ */}
        {/* 4. THE ANIMATED INK STAMP ("REQUEST SENT")                   */}
        {/* ============================================================ */}
        {showStamp && (
          <div className="pt-2 flex justify-end">
            <motion.div
              initial={{ scale: 2.4, opacity: 0, rotate: -25 }}
              animate={{ scale: 1, opacity: 0.95, rotate: -6 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 22,
                delay: 0.25,
              }}
              className="px-6 py-2.5 rounded-2xl border-4 border-[#BA4A21] bg-[#FFFDF8] shadow-xl text-center select-none"
              style={{
                boxShadow: "0 4px 14px rgba(186, 74, 33, 0.25)",
              }}
            >
              <span className="block text-xl sm:text-2xl font-black tracking-widest text-[#BA4A21] uppercase leading-none font-mono">
                {t("hosp.pass.stamp", "REQUEST SENT")}
              </span>
              <span className="block text-[10px] font-bold text-[#1C2B4F] uppercase tracking-wider mt-1">
                {t("hosp.pass.previewNote", "Design preview: nothing was sent")}
              </span>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StayPass;
