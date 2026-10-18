import React from "react";
import {
  Waves,
  Utensils,
  Wifi,
  Flame,
  Zap,
  Trees,
  Sparkles,
  Car,
  Mountain,
  Dices,
  Heart,
  Wind,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getAmenityById } from "../data/amenities";

const ICON_MAP = {
  pool: Waves,
  meals: Utensils,
  wifi: Wifi,
  kitchen: Flame,
  power_backup: Zap,
  lawn: Trees,
  campfire: Sparkles,
  parking: Car,
  mountain_view: Mountain,
  games: Dices,
  pet_friendly: Heart,
  ac: Wind,
};

export function AmenityIcon({ id, showLabel = true, size = "md", className = "" }) {
  const { t } = useLanguage();
  const amenity = getAmenityById(id);

  if (!amenity) return null;

  const IconComp = ICON_MAP[id] || CheckCircle;

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className={`inline-flex items-center gap-2 text-[#23402F] ${className}`}>
      <span className="p-1.5 rounded-lg bg-[#EBF2EA] text-[#23402F] shrink-0" aria-hidden="true">
        <IconComp className={iconSizes[size] || iconSizes.md} />
      </span>
      {showLabel && (
        <span className="text-sm font-medium text-[#2B2420]">
          {t(amenity.labelKey)}
        </span>
      )}
    </div>
  );
}

export default AmenityIcon;
