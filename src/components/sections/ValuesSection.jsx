import React from "react"
import { BAHINA_CONTENT } from "@/data/content"
import { ExpandingPanels } from "@/components/ui/expanding-panels"
import { ShinyText } from "@/components/ui/shiny-text"

export function ValuesSection() {
  const { values } = BAHINA_CONTENT

  return (
    <section id="values" className="relative z-10 w-full scroll-mt-28 py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-16">
        <div>
          <ShinyText text="04 / Moral Anchor" className="text-[12px] font-sans font-semibold tracking-[0.14em]" />
          <h2 className="mt-3 font-display font-light text-[#F3EFEA] text-[clamp(1.85rem,3.8vw,3.25rem)]">
            Values That Anchor Us
          </h2>
        </div>
        <p className="mt-4 sm:mt-0 font-sans text-sm sm:text-base text-neutral-300 max-w-sm font-normal leading-relaxed">
          Principles that remain immutable across all market transformations, operational scales, and forward-looking horizons.
        </p>
      </div>

      {/* React Bits Glare Hover Horizontal Expanding Panels (Mobile: Accordion) */}
      <ExpandingPanels values={values} />
    </section>
  )
}

export default ValuesSection
