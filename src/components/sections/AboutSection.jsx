import React from "react"
import { motion } from "framer-motion"
import { TextRevealByWord } from "@/components/ui/text-reveal"
import { NumberTicker } from "@/components/ui/number-ticker"
import { ShinyText } from "@/components/ui/shiny-text"
import { WarliCorner } from "@/components/ui/warli-divider"
import { useLanguage } from "@/lib/i18n"

export function AboutSection() {
  const { t } = useLanguage()

  const stats = [
    {
      number: 3,
      suffix: "",
      label: t("about.stat1Label"),
    },
    {
      number: 7,
      suffix: "",
      label: t("about.stat2Label"),
    },
    {
      number: 6,
      suffix: "",
      label: t("about.stat3Label"),
    },
    {
      number: 1,
      suffix: "",
      label: t("about.stat4Label"),
    },
  ]

  const bodyText = t("about.body")

  return (
    <section id="about" className="relative z-10 w-full scroll-mt-28 py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Eyebrow & Asymmetric Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        <div className="relative lg:col-span-4 bg-black/40 backdrop-blur-[2px] p-6 sm:p-8 rounded-3xl border border-[#D9A441]/20 shadow-lg">
          <div className="absolute top-3 right-3 rotate-90">
            <WarliCorner accent="#D9A441" />
          </div>
          {/* Section label with self-drawing underline on entry */}
          <div className="inline-block relative pb-2 mb-4">
            <ShinyText text={t("about.eyebrow")} className="text-[12px] font-sans font-semibold tracking-[0.14em]" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/40 origin-left"
            />
          </div>

          <h2 className="font-display font-light text-[#F3EFEA] leading-snug text-[clamp(1.75rem,3.2vw,2.5rem)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            {t("about.heading")}
          </h2>
        </div>

        {/* Word-by-word reveal on scroll (Magic UI Text Reveal) */}
        <div className="relative lg:col-span-8 bg-black/40 backdrop-blur-[2px] p-6 sm:p-8 rounded-3xl border border-[#D9A441]/20 shadow-lg">
          <div className="absolute top-3 right-3 rotate-90">
            <WarliCorner accent="#D9A441" />
          </div>
          <TextRevealByWord key={bodyText} text={bodyText} />

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <blockquote className="font-display italic text-lg sm:text-xl text-neutral-200 font-light max-w-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              "{t("about.quote")}"
            </blockquote>
          </div>
        </div>
      </div>

      {/* Number Ticker Row */}
      <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col border-l border-white/20 pl-6 py-3 bg-black/30 backdrop-blur-[2px] rounded-r-2xl border-t border-b border-r border-white/10 shadow-md"
          >
            <div className="font-display text-4xl sm:text-5xl font-light text-[#F3EFEA] tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
              <NumberTicker
                value={stat.number}
                suffix={stat.suffix}
                delay={idx * 0.15}
              />
            </div>
            <p className="mt-2 text-[14px] text-neutral-200 font-sans font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AboutSection
