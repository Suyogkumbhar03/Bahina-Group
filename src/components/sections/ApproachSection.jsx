import React, { useRef, useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ShinyText } from "@/components/ui/shiny-text"
import { useLanguage } from "@/lib/i18n"

export function ApproachSection() {
  const { t } = useLanguage()
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  })

  // SVG line stroke length drawn from 0 to 1 as user scrolls
  const pathLength = useTransform(scrollYProgress, [0, 0.95], [0, 1])

  const steps = useMemo(
    () => [
      {
        num: "01",
        title: t("approach.step1Title"),
        desc: t("approach.step1Desc"),
      },
      {
        num: "02",
        title: t("approach.step2Title"),
        desc: t("approach.step2Desc"),
      },
      {
        num: "03",
        title: t("approach.step3Title"),
        desc: t("approach.step3Desc"),
      },
      {
        num: "04",
        title: t("approach.step4Title"),
        desc: t("approach.step4Desc"),
      },
      {
        num: "05",
        title: t("approach.step5Title"),
        desc: t("approach.step5Desc"),
      },
    ],
    [t]
  )

  return (
    <section
      id="approach"
      ref={containerRef}
      className="relative z-10 w-full scroll-mt-28 py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        {/* Left Sticky Header Column */}
        <div className="lg:col-span-4 sticky top-28">
          <ShinyText text={t("approach.eyebrow")} className="text-[12px] font-sans font-semibold tracking-[0.14em]" />
          <h2 className="mt-3 font-display font-light text-[#F3EFEA] text-[clamp(1.85rem,3.8vw,3.25rem)]">
            {t("approach.heading")}
          </h2>
          <p className="mt-4 font-sans text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-xs">
            {t("approach.description")}
          </p>
        </div>

        {/* Right Column: Vertical Timeline with SVG Line-Draw */}
        <div className="lg:col-span-8 relative pl-6 sm:pl-10">
          {/* Animated Drawing SVG Spine */}
          <div className="absolute left-0 top-6 bottom-6 w-8 pointer-events-none">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <line
                x1="12"
                y1="0"
                x2="12"
                y2="100%"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="2"
              />
              <motion.line
                x1="12"
                y1="0"
                x2="12"
                y2="100%"
                stroke="#EDE8E1"
                strokeWidth="2.5"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="flex flex-col space-y-12">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-8 rounded-2xl border border-white/15 bg-black/45 backdrop-blur-[2px] group hover:border-white/30 transition-all shadow-lg"
              >
                {/* Milestone Node on Timeline with illuminated pulse on view */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  whileInView={{
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0px rgba(255,255,255,0.2)",
                      "0 0 16px rgba(255,255,255,0.9)",
                      "0 0 6px rgba(255,255,255,0.5)",
                    ],
                  }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  className="absolute -left-[31px] sm:-left-[47px] top-8 h-4 w-4 rounded-full border-2 border-[#070908] bg-[#EDE8E1]"
                />

                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-neutral-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                    {t("approach.stepLabel")} {step.num}
                  </span>
                  <span className="h-[1px] w-12 bg-white/10 group-hover:w-20 group-hover:bg-white/30 transition-all" />
                </div>

                <h3 className="font-display text-2xl font-light text-[#F3EFEA] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  {step.title}
                </h3>

                <p className="mt-3 font-sans text-sm sm:text-base text-neutral-200 font-normal leading-relaxed max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApproachSection
