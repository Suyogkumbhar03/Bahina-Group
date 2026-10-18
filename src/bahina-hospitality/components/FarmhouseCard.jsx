import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Users, Bed, Bell, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { PhotoCarousel } from "./PhotoCarousel";
import { StatusBadge } from "./StatusBadge";
import { AmenityIcon } from "./AmenityIcon";
import { getAmenityById } from "../data/amenities";
import { BlurFade } from "@/components/ui/blur-fade";

export function FarmhouseCard({
  farmhouse,
  onNotifyClick,
  featured = false,
  index = 0,
  className = "",
}) {
  const { t } = useLanguage();

  const isOpen = farmhouse.status === "open";
  const badgeType =
    farmhouse.status === "under_construction"
      ? "construction"
      : farmhouse.status === "coming_soon"
      ? "planned"
      : null;

  const formattedPrice = farmhouse.pricePerNight
    ? `₹${new Intl.NumberFormat("en-IN").format(farmhouse.pricePerNight)}`
    : null;

  // ============================================================
  // 1. FEATURED CARD (Wide 2-column layout on Desktop)
  // ============================================================
  if (featured) {
    return (
      <BlurFade delay={0.05 * index} inView>
        <article
          className={`group bg-[#FFFDF8] rounded-[36px] sm:rounded-[44px] border-2 border-[#1C2B4F]/20 hover:border-[#F4A62A] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 relative h-full ${className}`}
        >
          {/* Featured Left Photo with Arch-Topped Frame */}
          <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full overflow-hidden rounded-t-[34px] lg:rounded-t-none lg:rounded-l-[42px]">
            <PhotoCarousel
              photos={farmhouse.photos}
              badgeType={badgeType}
              status={farmhouse.status}
              farmhouseSlug={farmhouse.slug}
              aspectRatio="aspect-auto h-full min-h-[300px]"
              className="h-full"
            />
            {/* Top-Left Status Badge */}
            <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#1C2B4F] text-[#FFFDF8] shadow-md border border-[#F4A62A]/40">
                {t("hosp.featured.badge", "Featured Escape")}
              </span>
              <StatusBadge status={farmhouse.status} />
            </div>

            {/* Slide-Up Amenities Strip on Hover */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1C2B4F]/95 via-[#1C2B4F]/80 to-transparent p-3 pt-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex items-center justify-center gap-2 z-15 pointer-events-none">
              {farmhouse.amenityIds.slice(0, 4).map((id) => (
                <span
                  key={id}
                  className="px-2.5 py-1 rounded-full bg-white/20 text-[#FFFDF8] text-[13px] font-bold backdrop-blur-xs flex items-center gap-1.5"
                >
                  <AmenityIcon id={id} className="w-3.5 h-3.5 text-[#F4A62A]" />
                  <span>{t(getAmenityById(id)?.labelKey || id)}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Featured Right Info (Flex column so footer sits at bottom) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 relative z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-[13px] text-[#35508C] font-bold tracking-wide uppercase">
                <MapPin className="w-4 h-4 text-[#BA4A21] shrink-0" />
                <span>
                  {t(farmhouse.villageKey)}, {t(farmhouse.districtKey)}
                </span>
              </div>

              <Link
                to={`/hospitality/farmhouses/${farmhouse.slug}`}
                className="block group-hover:text-[#BA4A21] transition-colors focus:outline-none"
              >
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C2B4F] leading-tight">
                  {t(farmhouse.nameKey)}
                </h3>
              </Link>

              <p className="text-base text-[#1F1B2D]/85 leading-relaxed line-clamp-3">
                {t(farmhouse.fullDescKey || farmhouse.leadDescKey)}
              </p>

              {/* Highlights */}
              {farmhouse.highlightKeys && (
                <ul className="space-y-2 text-sm text-[#1F1B2D] font-medium pt-1">
                  {farmhouse.highlightKeys.slice(0, 2).map((k) => (
                    <li key={k} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#E6ECF7] text-[#1C2B4F] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>{t(k)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Capacity specs */}
              <div className="flex items-center gap-3 py-3 border-y border-[#1C2B4F]/15 text-sm font-bold text-[#1C2B4F]">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4D9] border border-[#1C2B4F]/15">
                  <Users className="w-4 h-4 text-[#BA4A21]" />
                  <span>
                    {farmhouse.maxGuests} {t("hosp.card.guests")}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4D9] border border-[#1C2B4F]/15">
                  <Bed className="w-4 h-4 text-[#BA4A21]" />
                  <span>
                    {farmhouse.bedrooms} {t("hosp.card.bedrooms")}
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing & CTA (One single line for price, button never wraps) */}
            <div className="pt-4 border-t border-[#1C2B4F]/15 flex items-center justify-between gap-3">
              <div className="min-w-0">
                {formattedPrice ? (
                  <div className="text-base sm:text-lg font-extrabold text-[#1C2B4F] whitespace-nowrap">
                    <span>{formattedPrice}</span>
                    <span className="text-xs sm:text-sm font-normal text-[#1F1B2D]/70 ml-1">
                      / {t("hosp.price.night", "night")}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm font-bold text-[#35508C] whitespace-nowrap">
                    {t("hosp.card.priceOnRequest", "Price on request")}
                  </span>
                )}
              </div>

              <div className="shrink-0">
                <Link
                  to={`/hospitality/farmhouses/${farmhouse.slug}`}
                  className="whitespace-nowrap inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#BA4A21] hover:bg-[#9E3E1A] text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-xl hover:scale-102 active:scale-98"
                >
                  <span>{isOpen ? t("hosp.card.viewAndRequest", "View & Request") : t("hosp.card.viewDetails", "View details")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </BlurFade>
    );
  }

  // ============================================================
  // 2. STANDARD EDITORIAL CARD
  // ============================================================
  return (
    <BlurFade delay={0.06 * index} inView>
      <article
        className={`bg-[#FFFDF8] rounded-[36px] border-2 border-[#1C2B4F]/20 hover:border-[#F4A62A] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group h-full ${className}`}
      >
        <div className="flex-1 flex flex-col">
          {/* Photo carousel with Arch-Topped Frame */}
          <div className="relative overflow-hidden rounded-t-[34px]">
            <PhotoCarousel
              photos={farmhouse.photos}
              badgeType={badgeType}
              status={farmhouse.status}
              farmhouseSlug={farmhouse.slug}
            />

            {/* Top-Left Status Badge */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <StatusBadge status={farmhouse.status} />
            </div>

            {/* Slide-Up Amenities Strip on Hover */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1C2B4F]/95 via-[#1C2B4F]/80 to-transparent p-2.5 pt-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex items-center justify-center gap-1.5 z-15 pointer-events-none">
              {farmhouse.amenityIds.slice(0, 4).map((id) => (
                <span
                  key={id}
                  className="px-2 py-0.5 rounded-full bg-white/20 text-[#FFFDF8] text-[12px] font-bold backdrop-blur-xs flex items-center gap-1"
                >
                  <AmenityIcon id={id} className="w-3 h-3 text-[#F4A62A]" />
                  <span>{t(getAmenityById(id)?.labelKey || id)}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-2.5">
              {/* Location */}
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#35508C]">
                <MapPin className="w-3.5 h-3.5 text-[#BA4A21] shrink-0" />
                <span className="truncate">
                  {t(farmhouse.villageKey)}, {t(farmhouse.districtKey)}
                </span>
              </div>

              {/* Title */}
              <Link
                to={`/hospitality/farmhouses/${farmhouse.slug}`}
                className="block group-hover:text-[#BA4A21] transition-colors focus:outline-none"
              >
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1C2B4F] hover:text-[#BA4A21] line-clamp-1 transition-colors">
                  {t(farmhouse.nameKey)}
                </h3>
              </Link>

              {/* Tagline / Lead */}
              <p className="text-base text-[#1F1B2D]/80 line-clamp-2 leading-relaxed">
                {t(farmhouse.leadDescKey)}
              </p>
            </div>

            {/* Capacity specs */}
            <div className="flex items-center gap-3 py-2.5 border-y border-[#1C2B4F]/10 text-xs sm:text-sm font-bold text-[#1C2B4F] mt-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF4D9] border border-[#1C2B4F]/10">
                <Users className="w-3.5 h-3.5 text-[#BA4A21]" />
                <span>
                  {farmhouse.maxGuests} {t("hosp.card.guests")}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF4D9] border border-[#1C2B4F]/10">
                <Bed className="w-3.5 h-3.5 text-[#BA4A21]" />
                <span>
                  {farmhouse.bedrooms} {t("hosp.card.bedrooms")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer: Always pinned to bottom, single line price, non-wrapping button */}
        <div className="p-5 sm:p-6 pt-0 border-t border-[#1C2B4F]/10 flex items-center justify-between gap-3 mt-auto">
          <div className="min-w-0">
            {formattedPrice ? (
              <div className="text-base sm:text-lg font-extrabold text-[#1C2B4F] whitespace-nowrap">
                <span>{formattedPrice}</span>
                <span className="text-xs sm:text-sm font-normal text-[#1F1B2D]/70 ml-1">
                  / {t("hosp.price.night", "night")}
                </span>
              </div>
            ) : (
              <span className="text-sm font-bold text-[#35508C] whitespace-nowrap">
                {t("hosp.card.priceOnRequest", "Price on request")}
              </span>
            )}
          </div>

          <div className="shrink-0">
            {isOpen ? (
              <Link
                to={`/hospitality/farmhouses/${farmhouse.slug}`}
                className="whitespace-nowrap inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#BA4A21] hover:bg-[#9E3E1A] text-white text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow-md hover:scale-102 active:scale-98 focus:outline-none"
              >
                <span>{t("hosp.card.viewAndRequest", "View & Request")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to={`/hospitality/farmhouses/${farmhouse.slug}`}
                  className="text-xs sm:text-sm font-bold text-[#1C2B4F] hover:text-[#BA4A21] transition-colors whitespace-nowrap"
                >
                  {t("hosp.card.viewDetails", "Details")}
                </Link>
                <button
                  type="button"
                  onClick={() => onNotifyClick && onNotifyClick(farmhouse)}
                  className="whitespace-nowrap inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FFF4D9] hover:bg-[#F4A62A]/40 text-[#1C2B4F] text-xs font-bold transition-all border border-[#1C2B4F]/20"
                >
                  <Bell className="w-3 h-3 text-[#BA4A21]" />
                  <span>{t("hosp.card.notifyMe", "Notify")}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </article>
    </BlurFade>
  );
}

export default FarmhouseCard;
