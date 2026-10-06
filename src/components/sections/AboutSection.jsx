import React from "react"
import { motion } from "framer-motion"
import { TextRevealByWord } from "@/components/ui/text-reveal"
import { NumberTicker } from "@/components/ui/number-ticker"
import { ShinyText } from "@/components/ui/shiny-text"
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
        <div className="lg:col-span-4">
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

          <h2 className="font-display font-light text-[#F3EFEA] leading-snug text-[clamp(1.75rem,3.2vw,2.5rem)]">
            {t("about.heading")}
          </h2>
        </div>

        {/* Word-by-word reveal on scroll (Magic UI Text Reveal) */}
        <div className="lg:col-span-8">
          <TextRevealByWord key={bodyText} text={bodyText} />

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <blockquote className="font-display italic text-lg sm:text-xl text-neutral-200 font-light max-w-xl">
              "{t("about.quote")}"
            </blockquote>
          </div>
        </div>
      </div>

      {/* Number Ticker Row */}
      <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col border-l border-white/15 pl-6 py-2"
          >
            <div className="font-display text-4xl sm:text-5xl font-light text-[#F3EFEA] tracking-tight">
              <NumberTicker
                value={stat.number}
                suffix={stat.suffix}
                delay={idx * 0.15}
              />
            </div>
            <p className="mt-2 text-[14px] text-neutral-300 font-sans font-normal">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AboutSection
