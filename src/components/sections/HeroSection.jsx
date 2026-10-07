import React, { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { WordRotate } from "@/components/ui/word-rotate"
import { SplitText } from "@/components/ui/split-text"
import { ShinyText } from "@/components/ui/shiny-text"
import { Magnet } from "@/components/ui/Magnet"
import { useLanguage } from "@/lib/i18n"

export function HeroSection({ onOpenWelcomeVideo }) {
  const { t, isMarathi } = useLanguage()

  // Scroll elevation & fade (moves up slightly and fades on scroll)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset || 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])



  // Calculated scroll reactions (animate only transform & opacity)
  const heroOpacity = Math.max(0, 1 - scrollY / 420)
  const heroYOffset = -(Math.min(50, scrollY * 0.12))
  const hintOpacity = Math.max(0, 1 - scrollY / 90)

  const rotateWords = useMemo(
    () => [
      t("hero.rotateWord1"),
      t("hero.rotateWord2"),
      t("hero.rotateWord3"),
      t("hero.rotateWord4"),
    ],
    [t]
  )

  const headlineText = isMarathi
    ? "मातीपासून वास्तूपर्यंत."
    : "From Soil to Spaces."

  return (
    <section
      id="hero"
      className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto scroll-mt-28"
    >
      {/* Soft gradient scrim behind text column only - ensures AA contrast across bright daytime frames */}
      <div className="absolute inset-y-0 left-0 w-full md:w-3/5 pointer-events-none -z-10 bg-gradient-to-r from-[#070908]/94 via-[#070908]/75 to-transparent" />

      <motion.div
        style={{
          translateY: heroYOffset,
          opacity: heroOpacity,
        }}
        className="flex flex-col items-start justify-center my-auto max-w-3xl z-10 pt-4 sm:pt-6 will-change-transform"
      >
        {/* Warm Villager Greeting & Device Local Time Greeting */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#D9A441]/15 border border-[#D9A441]/35 backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-pulse" />
            <span className="text-xs sm:text-sm font-sans font-medium text-[#F3EFEA]">
              {t("greeting.welcome")}
            </span>
          </div>

          {/* Watch Welcome Video Button */}
          {onOpenWelcomeVideo && (
            <button
              onClick={onOpenWelcomeVideo}
              type="button"
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-[#F3EFEA] text-xs sm:text-sm font-sans font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 min-h-[44px] min-w-[52px]"
              aria-label={t("welcome.watchVideoAria")}
            >
              <Play className="h-3.5 w-3.5 text-[#D9A441] fill-current" />
              <span>{t("welcome.watchVideo")}</span>
            </button>
          )}
        </div>

        {/* Eyebrow with Shiny Text */}
        <div className="flex items-center space-x-3 mb-5 sm:mb-6">
          <span className="h-[1px] w-8 bg-white/40" />
          <ShinyText text={t("hero.eyebrow")} className="text-[12px] font-sans font-semibold tracking-[0.14em]" />
        </div>

        {/* Hero Headline with React Bits SplitText */}
        <h1 className="font-display font-light text-[#F3EFEA] tracking-[-0.03em] leading-[1.12] text-[clamp(2.15rem,6.5vw,6rem)]">
          <SplitText
            key={headlineText}
            text={headlineText}
            italicWords={isMarathi ? ["वास्तूपर्यंत."] : ["to", "Spaces."]}
            delay={0.2}
            stagger={0.06}
          />
        </h1>

        {/* Word Rotate Subline */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 font-display text-lg sm:text-2xl md:text-3xl text-neutral-200 font-light tracking-wide">
          <span>{t("hero.rotatePrefix")}</span>
          <WordRotate
            key={rotateWords.join("-")}
            words={rotateWords}
            duration={2400}
            className="font-normal text-white border-b border-white/20 pb-0.5"
          />
        </div>

        {/* Body Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 sm:mt-6 font-sans text-base sm:text-[18px] font-normal leading-[1.65] text-[#EDE8E1] max-w-2xl"
        >
          {t("hero.description")}
        </motion.p>

        {/* Action Buttons: ShimmerButton + InteractiveHoverButton with Magnet */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-12 flex flex-wrap items-center gap-3.5 sm:gap-4"
        >
          {/* Primary CTA: "See our companies" */}
          <Magnet magnetStrength={0.25} padding={40}>
            <a href="#divisions" data-cursor-label="Explore">
              <ShimmerButton
                shimmerColor="#D9A441"
                shimmerDuration="3s"
                background="rgba(243, 239, 234, 0.98)"
                className="text-[#070908] hover:text-black font-sans font-bold text-xs tracking-[0.12em] border-white/60 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.35)] min-h-[44px]"
              >
                <span>{t("hero.primaryCta")}</span>
              </ShimmerButton>
            </a>
          </Magnet>

          {/* Secondary CTA: "Contact us" */}
          <Magnet magnetStrength={0.2} padding={30}>
            <a href="#contact" data-cursor-label="Contact">
              <InteractiveHoverButton text={t("hero.secondaryCta")} />
            </a>
          </Magnet>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 0.8, delay: 1.25 }}
        style={{ opacity: hintOpacity }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 sm:pt-8 border-t border-white/10 text-xs font-sans font-semibold tracking-[0.14em] uppercase text-neutral-400 transition-opacity duration-150"
      >
        <div className="flex flex-wrap items-center gap-1.5 sm:space-x-2">
          <span>{t("hero.divisionsBarLabel")}</span>
          <span>•</span>
          <span className="text-[#D9A441]">{t("division.hospitality.shortName")}</span>
          <span>/</span>
          <span className="text-[#3E9B63]">{t("division.foundation.shortName")}</span>
          <span>/</span>
          <span className="text-[#4C8DF6]">{t("division.labs.shortName")}</span>
        </div>

        <a
          href="#about"
          className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors group focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 rounded"
          aria-label={t("hero.scrollPromptAria")}
        >
          <span>{t("hero.scrollPrompt")}</span>
          <div className="h-6 w-3.5 rounded-full border border-white/40 flex items-start justify-center p-0.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="h-1.5 w-1 rounded-full bg-white"
            />
          </div>
        </a>
      </motion.div>
    </section>
  )
}

export default HeroSection
