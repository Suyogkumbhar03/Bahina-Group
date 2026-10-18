import React from "react";
import { Marquee } from "@/components/ui/marquee";
import { useLanguage } from "@/lib/i18n";
import { AmenityIcon } from "./AmenityIcon";
import { BlockPrintFlower } from "./BlockPrintMotif";

export function AmenitiesMarquee({ className = "" }) {
  const { t } = useLanguage();

  const amenityItems = [
    { id: "pool", labelKey: "hosp.amenity.pool" },
    { id: "meals", labelKey: "hosp.amenity.meals" },
    { id: "lawn", labelKey: "hosp.amenity.lawn" },
    { id: "campfire", labelKey: "hosp.amenity.campfire" },
    { id: "power_backup", labelKey: "hosp.amenity.powerBackup" },
    { id: "wifi", labelKey: "hosp.amenity.wifi" },
    { id: "parking", labelKey: "hosp.amenity.parking" },
    { id: "mountain_view", labelKey: "hosp.amenity.mountainView" },
  ];

  return (
    <div
      className={`w-full py-5 border-y border-[#1C2B4F]/15 bg-[#FFF4D9]/50 overflow-hidden relative ${className}`}
      aria-label="Amenities marquee"
    >
      <div className="max-w-7xl mx-auto px-4">
        <Marquee pauseOnHover={true} repeat={3} className="[--duration:28s]">
          {amenityItems.map((item) => (
            <div
              key={item.id}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#FFFDF8] border border-[#1C2B4F]/15 shadow-2xs hover:border-[#F4A62A] transition-all cursor-default"
            >
              <div className="w-7 h-7 rounded-full bg-[#E6ECF7] text-[#1C2B4F] flex items-center justify-center shrink-0">
                <AmenityIcon id={item.id} className="w-4 h-4 text-[#1C2B4F]" />
              </div>
              <span className="text-sm font-bold text-[#1C2B4F] whitespace-nowrap">
                {t(item.labelKey, item.id)}
              </span>
              <BlockPrintFlower size={14} className="text-[#BA4A21]/40 ml-2" />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default AmenitiesMarquee;
