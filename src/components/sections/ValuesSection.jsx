import React, { useMemo } from "react"
import { ExpandingPanels } from "@/components/ui/expanding-panels"
import { ShinyText } from "@/components/ui/shiny-text"
import { useLanguage } from "@/lib/i18n"

export function ValuesSection() {
  const { t } = useLanguage()

  const values = useMemo(
    () => [
      {
        name: t("values.item1Name"),
        desc: t("values.item1Desc"),
      },
      {
        name: t("values.item2Name"),
        desc: t("values.item2Desc"),
      },
      {
        name: t("values.item3Name"),
        desc: t("values.item3Desc"),
      },
      {
        name: t("values.item4Name"),
        desc: t("values.item4Desc"),
      },
      {
        name: t("values.item5Name"),
        desc: t("values.item5Desc"),
      },
      {
        name: t("values.item6Name"),
        desc: t("values.item6Desc"),
      },
    ],
    [t]
  )

  return (
    <section id="values" className="relative z-10 w-full scroll-mt-28 py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-5 sm:pb-6 mb-10 sm:mb-16">
        <div>
          <ShinyText text={t("values.eyebrow")} className="text-[12px] font-sans font-semibold tracking-[0.14em]" />
          <h2 className="mt-3 font-display font-medium text-[#F3EFEA] text-[clamp(1.75rem,3.8vw,3.25rem)]">
            {t("values.heading")}
          </h2>
        </div>
        <p className="mt-3 sm:mt-0 font-sans text-sm sm:text-base text-neutral-100 max-w-sm font-semibold leading-relaxed">
          {t("values.description")}
        </p>
      </div>

      {/* React Bits Glare Hover Horizontal Expanding Panels (Mobile: Accordion) */}
      <ExpandingPanels key={values.map(v => v.name).join("-")} values={values} />
    </section>
  )
}

export default ValuesSection
