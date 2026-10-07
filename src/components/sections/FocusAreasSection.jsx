import React, { useMemo } from "react"
import {
  Hotel,
  Cpu,
  Sprout,
  FlaskConical,
  Workflow,
  HeartHandshake,
  Building2,
} from "lucide-react"
import { Marquee } from "@/components/ui/marquee"
import { FocusCard } from "@/components/ui/focus-card"
import { ShinyText } from "@/components/ui/shiny-text"
import { useLanguage } from "@/lib/i18n"

const iconMap = {
  "hospitality-tourism": Hotel,
  "ai-tech": Cpu,
  "agri-innovation": Sprout,
  "rd": FlaskConical,
  "automation": Workflow,
  "social-csr": HeartHandshake,
  "infrastructure": Building2,
}

export function FocusAreasSection() {
  const { t } = useLanguage()

  const focusAreas = useMemo(
    () => [
      {
        id: "hospitality-tourism",
        title: t("focus.card1Title"),
        desc: t("focus.card1Desc"),
        division: t("division.hospitality.shortName"),
        accent: "#D9A441",
      },
      {
        id: "ai-tech",
        title: t("focus.card2Title"),
        desc: t("focus.card2Desc"),
        division: t("division.labs.shortName"),
        accent: "#4C8DF6",
      },
      {
        id: "agri-innovation",
        title: t("focus.card3Title"),
        desc: t("focus.card3Desc"),
        division: t("division.labs.shortName"),
        accent: "#3E9B63",
      },
      {
        id: "rd",
        title: t("focus.card4Title"),
        desc: t("focus.card4Desc"),
        division: t("division.labs.shortName"),
        accent: "#4C8DF6",
      },
      {
        id: "automation",
        title: t("focus.card5Title"),
        desc: t("focus.card5Desc"),
        division: t("division.labs.shortName"),
        accent: "#4C8DF6",
      },
      {
        id: "social-csr",
        title: t("focus.card6Title"),
        desc: t("focus.card6Desc"),
        division: t("division.foundation.shortName"),
        accent: "#3E9B63",
      },
      {
        id: "infrastructure",
        title: t("focus.card7Title"),
        desc: t("focus.card7Desc"),
        division: t("brand.group"),
        accent: "#C8C4BD",
      },
    ],
    [t]
  )

  const row1 = focusAreas.slice(0, 4)
  const row2 = focusAreas.slice(3)

  return (
    <section id="focus-areas" className="relative z-10 w-full scroll-mt-28 py-20 sm:py-28 md:py-36 overflow-hidden">
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-8 sm:mb-12">
        <ShinyText text={t("focus.eyebrow")} className="text-[12px] font-sans font-semibold tracking-[0.14em]" />
        <h2 className="mt-3 font-display font-medium text-[#F3EFEA] text-[clamp(1.75rem,3.8vw,3.25rem)]">
          {t("focus.heading")}
        </h2>
        <p className="mt-3 font-sans text-base sm:text-[18px] text-neutral-100 max-w-xl font-semibold leading-[1.65]">
          {t("focus.description")}
        </p>
      </div>

      {/* 1. Two-Row Marquee Moving in Opposite Directions with Soft Fade Edges */}
      <div className="relative w-full py-3 sm:py-4 mb-12 sm:mb-16 overflow-hidden border-y border-white/10 bg-white/[0.01] space-y-2.5 sm:space-y-3">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 sm:w-28 bg-gradient-to-r from-white/10 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 sm:w-28 bg-gradient-to-l from-white/10 to-transparent" />

        {/* Row 1: Forward */}
        <Marquee pauseOnHover repeat={4} className="py-1">
          {row1.map((area) => (
            <div
              key={`row1-${area.id}`}
              className="flex items-center space-x-3 rounded-full border border-white/10 bg-[#0E1210]/70 px-4 sm:px-5 py-2 sm:py-2.5 mx-1.5 sm:mx-2 text-xs font-sans text-white"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: area.accent }}
              />
              <span className="font-display font-medium text-white">
                {area.title}
              </span>
              <span className="text-[11px] font-sans font-semibold text-white uppercase tracking-wider">
                / {area.division}
              </span>
            </div>
          ))}
        </Marquee>

        {/* Row 2: Reverse */}
        <Marquee reverse pauseOnHover repeat={4} className="py-1">
          {row2.map((area) => (
            <div
              key={`row2-${area.id}`}
              className="flex items-center space-x-3 rounded-full border border-white/10 bg-[#0E1210]/70 px-4 sm:px-5 py-2 sm:py-2.5 mx-1.5 sm:mx-2 text-xs font-sans text-white"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: area.accent }}
              />
              <span className="font-display font-medium text-white">
                {area.title}
              </span>
              <span className="text-[11px] font-sans font-semibold text-white uppercase tracking-wider">
                / {area.division}
              </span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* 2. Bento Grid with Different Card Sizes & MagicCard Spotlight */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
          {focusAreas.map((area, idx) => {
            const Icon = iconMap[area.id] || Cpu

            let colSpan = "md:col-span-4"
            if (idx === 0) colSpan = "md:col-span-7"
            else if (idx === 1) colSpan = "md:col-span-5"
            else if (idx === 2) colSpan = "md:col-span-5"
            else if (idx === 3) colSpan = "md:col-span-7"
            else if (idx === 4) colSpan = "md:col-span-4"
            else if (idx === 5) colSpan = "md:col-span-4"
            else if (idx === 6) colSpan = "md:col-span-4"

            return (
              <div key={area.id} className={colSpan}>
                <FocusCard
                  area={area}
                  index={idx}
                  icon={Icon}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FocusAreasSection
