import React from "react"
import {
  Hotel,
  Cpu,
  Sprout,
  FlaskConical,
  Workflow,
  HeartHandshake,
  Building2,
} from "lucide-react"
import { BAHINA_CONTENT } from "@/data/content"
import { Marquee } from "@/components/ui/marquee"
import { FocusCard } from "@/components/ui/focus-card"
import { ShinyText } from "@/components/ui/shiny-text"

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
  const { focusAreas } = BAHINA_CONTENT

  const row1 = focusAreas.slice(0, 4)
  const row2 = focusAreas.slice(3)

  return (
    <section id="focus-areas" className="relative z-10 w-full scroll-mt-28 py-28 md:py-36 overflow-hidden">
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <ShinyText text="03 / Strategic Scope" className="text-[12px] font-sans font-semibold tracking-[0.14em]" />
        <h2 className="mt-3 font-display font-light text-[#F3EFEA] text-[clamp(1.85rem,3.8vw,3.25rem)]">
          Core Focus Areas
        </h2>
        <p className="mt-3 font-sans text-[18px] text-neutral-300 max-w-xl font-normal leading-[1.65]">
          Seven strategic capabilities bridging biological agriculture with modern hospitality and deep technological research.
        </p>
      </div>

      {/* 1. Two-Row Marquee Moving in Opposite Directions with Soft Fade Edges */}
      <div className="relative w-full py-4 mb-16 overflow-hidden border-y border-white/10 bg-white/[0.01] space-y-3">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-28 bg-gradient-to-r from-[#070908] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-28 bg-gradient-to-l from-[#070908] to-transparent" />

        {/* Row 1: Forward */}
        <Marquee pauseOnHover repeat={4} className="py-1">
          {row1.map((area) => (
            <div
              key={`row1-${area.id}`}
              className="flex items-center space-x-3 rounded-full border border-white/10 bg-[#0E1210]/70 px-5 py-2.5 mx-2 text-xs font-sans text-neutral-200"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: area.accent }}
              />
              <span className="font-display font-medium text-white">
                {area.title}
              </span>
              <span className="text-[11px] font-sans font-semibold text-neutral-400 uppercase tracking-wider">
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
              className="flex items-center space-x-3 rounded-full border border-white/10 bg-[#0E1210]/70 px-5 py-2.5 mx-2 text-xs font-sans text-neutral-200"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: area.accent }}
              />
              <span className="font-display font-medium text-white">
                {area.title}
              </span>
              <span className="text-[11px] font-sans font-semibold text-neutral-400 uppercase tracking-wider">
                / {area.division}
              </span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* 2. Bento Grid with Different Card Sizes & MagicCard Spotlight */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {focusAreas.map((area, idx) => {
            const Icon = iconMap[area.id] || Cpu

            // Varied asymmetric bento grid spans
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
