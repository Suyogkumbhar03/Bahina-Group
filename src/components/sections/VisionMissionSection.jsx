import React, { useMemo } from "react"
import { AnimatedBeamDiagram } from "@/components/ui/animated-beam"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { BlurFade } from "@/components/ui/blur-fade"
import { ShinyText } from "@/components/ui/shiny-text"
import { useLanguage } from "@/lib/i18n"

export function VisionMissionSection() {
  const { t, isMarathi } = useLanguage()

  const missionItems = useMemo(
    () => [
      {
        num: "01",
        title: t("visionMission.item1Title"),
        desc: t("visionMission.item1Desc"),
      },
      {
        num: "02",
        title: t("visionMission.item2Title"),
        desc: t("visionMission.item2Desc"),
      },
      {
        num: "03",
        title: t("visionMission.item3Title"),
        desc: t("visionMission.item3Desc"),
      },
      {
        num: "04",
        title: t("visionMission.item4Title"),
        desc: t("visionMission.item4Desc"),
      },
      {
        num: "05",
        title: t("visionMission.item5Title"),
        desc: t("visionMission.item5Desc"),
      },
    ],
    [t]
  )

  return (
    <section id="vision-mission" className="relative z-10 w-full scroll-mt-28 py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Top Split: Left Column Vision, Right Column Animated Beam Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
        {/* Left Column: Vision Statement */}
        <div className="lg:col-span-6">
          <ShinyText text={t("visionMission.eyebrow")} className="text-[12px] font-sans font-semibold tracking-[0.14em]" />

          <h3 className="mt-3 font-sans text-xs uppercase tracking-[0.14em] font-semibold text-neutral-300">
            {t("visionMission.visionBadge")}
          </h3>

          {/* Vision Statement with AnimatedGradientText on highlight phrase */}
          <blockquote className="mt-6 font-display font-light text-[#F3EFEA] leading-[1.2] tracking-[-0.01em] text-[clamp(1.85rem,3.8vw,3rem)]">
            "{t("visionMission.visionQuotePart1")}{" "}
            <AnimatedGradientText className={`font-normal ${isMarathi ? "not-italic font-medium text-[#D9A441]" : "italic"}`}>
              {t("visionMission.visionQuoteHighlight")}
            </AnimatedGradientText>{" "}
            {t("visionMission.visionQuotePart2")}"
          </blockquote>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-sans text-neutral-400 uppercase tracking-[0.14em] font-semibold">
            <span>{t("visionMission.purposeLabel")}</span>
            <span lang="en">BAHINA Group</span>
          </div>
        </div>

        {/* Right Column: Magic UI Animated Beam Diagram */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <AnimatedBeamDiagram />
        </div>
      </div>

      {/* Bottom: Mission Points as a Numbered List with Staggered BlurFade */}
      <div className="border-t border-white/10 pt-16">
        <div className="mb-10">
          <span className="font-sans text-xs uppercase tracking-[0.14em] font-semibold text-neutral-400">
            {t("visionMission.missionBadge")}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missionItems.map((item, idx) => (
            <BlurFade
              key={item.num}
              delay={idx * 0.08}
              yOffset={20}
              className="p-7 rounded-2xl border border-white/10 bg-[#0C100E]/80 flex flex-col justify-between group hover:border-white/25 transition-all"
            >
              <div>
                <span className="font-display text-2xl font-light text-neutral-400 group-hover:text-white transition-colors block mb-3">
                  {item.num}
                </span>
                <h4 className="font-display text-lg font-normal text-[#F3EFEA] leading-snug">
                  {item.title}
                </h4>
                <p className="mt-3 font-sans text-sm text-neutral-300 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VisionMissionSection
