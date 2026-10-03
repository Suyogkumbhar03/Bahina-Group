import React, { useState, useEffect } from "react"
import { motion, useSpring } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { BAHINA_CONTENT } from "@/data/content"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { WordRotate } from "@/components/ui/word-rotate"
import { SplitText } from "@/components/ui/split-text"
import { ShinyText } from "@/components/ui/shiny-text"
import { Magnet } from "@/components/ui/Magnet"

export function HeroSection() {
  const { hero } = BAHINA_CONTENT

  // Desktop Mouse Parallax (shifts headline & background opposite by max 12px)
  const springConfig = { damping: 25, stiffness: 200 }
  const mouseX = useSpring(0, springConfig)
  const mouseY = useSpring(0, springConfig)

  // Scroll elevation & fade (moves up slightly and fades on scroll)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset || 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!isDesktop || prefersReducedMotion) return

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const xOffset = ((e.clientX / innerWidth) - 0.5) * 12
      const yOffset = ((e.clientY / innerHeight) - 0.5) * 12
      mouseX.set(xOffset)
      mouseY.set(yOffset)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Calculated scroll reactions (animate only transform & opacity)
  const heroOpacity = Math.max(0, 1 - scrollY / 420)
  const heroYOffset = -(Math.min(50, scrollY * 0.12))
  const hintOpacity = Math.max(0, 1 - scrollY / 90)

  return (
    <section
      id="hero"
      className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-32 md:pt-36 pb-12 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-28"
    >
      {/* Soft gradient scrim behind text column only - keeps right photo side open */}
      <div className="absolute inset-y-0 left-0 w-full md:w-3/5 pointer-events-none -z-10 bg-gradient-to-r from-[#070908]/90 via-[#070908]/60 to-transparent" />

      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateY: heroYOffset,
          opacity: heroOpacity,
        }}
        className="flex flex-col items-start justify-center my-auto max-w-3xl z-10 pt-6 will-change-transform"
      >
        {/* Eyebrow with Shiny Text */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="h-[1px] w-8 bg-white/40" />
          <ShinyText text={hero.eyebrow} className="text-[12px] font-sans font-semibold tracking-[0.14em]" />
        </div>

        {/* Hero Headline with React Bits SplitText */}
        <h1 className="font-display font-light text-[#F3EFEA] tracking-[-0.03em] leading-[1.02] text-[clamp(2.75rem,7vw,6.25rem)]">
          <SplitText
            text="From Soil to Spaces."
            italicWords={["to", "Spaces."]}
            delay={0.2}
            stagger={0.06}
          />
        </h1>

        {/* Word Rotate Subline */}
        <div className="mt-6 flex flex-wrap items-center gap-2 font-display text-xl sm:text-2xl md:text-3xl text-neutral-200 font-light tracking-wide">
          <span>Stewardship in</span>
          <WordRotate
            words={["Hospitality.", "Community.", "Research.", "Enriching Every Life."]}
            duration={2400}
            className="font-normal text-white border-b border-white/20 pb-0.5"
          />
        </div>

        {/* Body Description - strict 18px, 400, line-height 1.65, 85%+ white */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-sans text-[18px] font-normal leading-[1.65] text-[#EDE8E1] max-w-2xl"
        >
          {hero.description}
        </motion.p>

        {/* Action Buttons: ShimmerButton + InteractiveHoverButton with Magnet */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4"
        >
          {/* Primary CTA with Magnet and Shimmer Button */}
          <Magnet magnetStrength={0.25} padding={40}>
            <a href={hero.primaryCta.href} data-cursor-label="Explore">
              <ShimmerButton
                shimmerColor="#D9A441"
                shimmerDuration="3s"
                background="rgba(243, 239, 234, 0.98)"
                className="text-[#070908] hover:text-black font-sans font-bold text-xs tracking-[0.16em] border-white/60 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.35)]"
              >
                <span>{hero.primaryCta.text}</span>
              </ShimmerButton>
            </a>
          </Magnet>

          {/* Secondary CTA with Magnet and Interactive Hover Button */}
          <Magnet magnetStrength={0.2} padding={30}>
            <a href={hero.secondaryCta.href} data-cursor-label="Contact">
              <InteractiveHoverButton text={hero.secondaryCta.text} />
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
        className="flex items-center justify-between pt-8 border-t border-white/10 text-xs font-sans font-semibold tracking-[0.14em] uppercase text-neutral-400 transition-opacity duration-150"
      >
        <div className="flex items-center space-x-2">
          <span>Three Divisions</span>
          <span>•</span>
          <span className="text-[#D9A441]">Hospitality</span>
          <span>/</span>
          <span className="text-[#3E9B63]">Foundation</span>
          <span>/</span>
          <span className="text-[#4C8DF6]">Labs</span>
        </div>

        <a
          href="#about"
          className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors group focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 rounded"
          aria-label="Scroll down to About section"
        >
          <span>{hero.scrollHint}</span>
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
