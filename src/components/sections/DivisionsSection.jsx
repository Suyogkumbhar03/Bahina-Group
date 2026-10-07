import React, { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { BorderBeam } from "@/components/ui/border-beam"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { ShinyText } from "@/components/ui/shiny-text"
import { Magnet } from "@/components/ui/Magnet"
import { WarliCorner } from "@/components/ui/warli-divider"
import { useLanguage } from "@/lib/i18n"

export function DivisionsSection({ onThemeChange }) {
  const { t, isMarathi } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const pinWrapperRef = useRef(null)
  const cardRef = useRef(null)

  const divisions = useMemo(
    () => [
      {
        id: "hospitality",
        number: "01",
        name: t("division.hospitality.name"),
        shortName: t("division.hospitality.shortName"),
        accent: "#D9A441", // amber
        tagline: t("division.hospitality.tagline"),
        category: t("division.hospitality.category"),
        leadText: t("division.hospitality.lead"),
        bullets: [
          t("division.hospitality.bullet1"),
          t("division.hospitality.bullet2"),
          t("division.hospitality.bullet3"),
        ],
        ctaText: t("division.hospitality.cta"),
        link: "#contact",
      },
      {
        id: "foundation",
        number: "02",
        name: t("division.foundation.name"),
        shortName: t("division.foundation.shortName"),
        accent: "#3E9B63", // green
        tagline: t("division.foundation.tagline"),
        category: t("division.foundation.category"),
        leadText: t("division.foundation.lead"),
        bullets: [
          t("division.foundation.bullet1"),
          t("division.foundation.bullet2"),
          t("division.foundation.bullet3"),
        ],
        ctaText: t("division.foundation.cta"),
        link: "#contact",
      },
      {
        id: "labs",
        number: "03",
        name: t("division.labs.name"),
        shortName: t("division.labs.shortName"),
        accent: "#4C8DF6", // cool blue
        tagline: t("division.labs.tagline"),
        category: t("division.labs.category"),
        leadText: t("division.labs.lead"),
        bullets: [
          t("division.labs.bullet1"),
          t("division.labs.bullet2"),
          t("division.labs.bullet3"),
        ],
        ctaText: t("division.labs.cta"),
        link: "#contact",
      },
    ],
    [t]
  )

  const current = divisions[activeIndex]

  // Hospitality amber light mouse position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    onThemeChange?.(current.id)
  }, [activeIndex, current.id, onThemeChange])

  // GSAP Pinned Scroll setup on Desktop with pinSpacing: true
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || typeof window === "undefined") return

    if (window.innerWidth < 1024) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinWrapperRef.current,
        start: "top top",
        end: "+=2200",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        onUpdate: (self) => {
          const index = Math.min(2, Math.floor(self.progress * 3))
          setActiveIndex(index)
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const handleCardMouseMove = (e) => {
    if (current.id !== "hospitality" || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section id="divisions" className="relative z-20 w-full scroll-mt-28">
      {/* Pinned Desktop Container */}
      <div
        ref={pinWrapperRef}
        className="relative w-full min-h-screen flex flex-col justify-center py-16 px-6 md:px-12 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-5 mb-10">
          <div>
            <ShinyText text={t("divisions.eyebrow")} className="text-[12px] font-sans font-semibold tracking-[0.14em]" />
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-light text-[#F3EFEA]">
              {t("divisions.heading")}
            </h2>
          </div>

          {/* Division Direct Selector Pills */}
          <div className="mt-4 sm:mt-0 flex items-center space-x-2">
            {divisions.map((div, i) => {
              const isActive = activeIndex === i
              return (
                <button
                  key={div.id}
                  onClick={() => setActiveIndex(i)}
                  className={`min-h-[44px] px-4 py-2 font-sans text-xs uppercase tracking-[0.12em] font-semibold transition-all rounded-full border ${
                    isActive
                      ? "border-white/50 bg-white/15 text-white"
                      : "border-transparent text-neutral-400 hover:text-neutral-200"
                  }`}
                  style={{
                    color: isActive ? div.accent : undefined,
                  }}
                >
                  {div.number} {div.shortName}
                </button>
              )
            })}
          </div>
        </div>

        {/* Desktop Presentation: Asymmetric Card Layout with Vertical Progress Rail */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch min-h-[540px]">
          {/* Vertical Progress Rail (01 - 02 - 03) */}
          <div className="col-span-1 flex flex-col items-center justify-center space-y-6">
            {divisions.map((div, i) => (
              <button
                key={div.id}
                onClick={() => setActiveIndex(i)}
                className="flex flex-col items-center space-y-2 group focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 p-2 min-h-[44px] min-w-[44px]"
                aria-label={div.name}
              >
                <span
                  className={`font-sans text-xs tracking-wider transition-colors ${
                    activeIndex === i ? "font-bold text-white" : "text-neutral-400"
                  }`}
                  style={{ color: activeIndex === i ? div.accent : undefined }}
                >
                  {div.number}
                </span>
                <span
                  className={`w-0.5 rounded-full transition-all duration-300 ${
                    activeIndex === i ? "h-12 bg-white" : "h-6 bg-white/20 group-hover:bg-white/40"
                  }`}
                  style={{
                    backgroundColor: activeIndex === i ? div.accent : undefined,
                  }}
                />
              </button>
            ))}
          </div>

          {/* The Active Division Showcase Card with BorderBeam & Atmospheric Backdrop */}
          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            className="col-span-11 relative rounded-3xl border border-[#D9A441]/25 bg-[#070908]/45 backdrop-blur-[2px] p-8 lg:p-11 overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            <div className="absolute top-4 right-4 rotate-90">
              <WarliCorner accent={current.accent} />
            </div>

            {/* 1. Magic UI BorderBeam on the active division card */}
            <BorderBeam
              size={350}
              duration={12}
              colorFrom={current.accent}
              colorTo="#ffffff"
            />

            {/* 2. Desktop Atmosphere per division */}
            {current.id === "hospitality" && (
              <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 -z-10"
                style={{
                  background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(217, 164, 65, 0.16), transparent 75%)`,
                }}
              />
            )}

            {current.id === "foundation" && (
              <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10 opacity-30">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: ["100%", "-20%"],
                      opacity: [0, 0.8, 0],
                      x: [Math.sin(i) * 20, Math.cos(i) * 30],
                    }}
                    transition={{
                      duration: 6 + (i % 4),
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                    style={{
                      left: `${(i * 9 + 5)}%`,
                    }}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#3E9B63] blur-[0.5px]"
                  />
                ))}
              </div>
            )}

            {current.id === "labs" && (
              <FlickeringGrid
                squareSize={4}
                gridGap={10}
                color="#4C8DF6"
                maxOpacity={0.2}
                className="opacity-70"
              />
            )}

            {/* Inner Content Grid */}
            <div className="grid grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Number, Title, Tagline */}
              <div className="col-span-5 flex flex-col justify-between bg-black/40 backdrop-blur-[2px] p-7 rounded-2xl border border-white/10 shadow-lg">
                <div>
                  <motion.span
                    key={current.number}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="font-display text-8xl lg:text-9xl font-light tracking-tight block leading-none select-none transition-colors duration-500 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
                    style={{
                      color: current.accent,
                      textShadow: `0 0 25px ${current.accent}33`,
                    }}
                  >
                    {current.number}
                  </motion.span>

                  <h3 className="mt-4 font-display text-3xl lg:text-4xl font-normal text-[#F3EFEA] leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    {current.name}
                  </h3>

                  <p
                    className="mt-3 font-display italic text-lg lg:text-xl font-light tracking-wide transition-colors duration-500 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                    style={{ color: current.accent }}
                  >
                    "{current.tagline}"
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-xs font-sans uppercase tracking-[0.14em] font-semibold text-neutral-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  {current.category}
                </div>
              </div>

              {/* Right Column: Lead text, 3 bullets, explore button */}
              <div className="col-span-7 flex flex-col justify-between space-y-6 bg-black/40 backdrop-blur-[2px] p-7 rounded-2xl border border-white/10 shadow-lg">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-6"
                  >
                    <p className="font-sans text-[18px] text-neutral-100 font-normal leading-[1.65] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                      {current.leadText}
                    </p>

                    {/* 3 Profile Bullets */}
                    <div className="space-y-3.5 pt-4 border-t border-white/10">
                      {current.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start space-x-3.5">
                          <span
                            className="font-sans text-sm font-bold shrink-0 mt-0.5"
                            style={{ color: current.accent }}
                          >
                            —
                          </span>
                          <span className="font-sans text-sm text-neutral-200 font-normal leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Explore Link with Magnet */}
                    <div className="pt-2">
                      <Magnet magnetStrength={0.2} padding={30}>
                        <a href={current.link} data-cursor-label="Explore">
                          <Button
                            variant="editorial"
                            size="lg"
                            className="group rounded-full text-xs font-sans font-semibold tracking-[0.12em] uppercase border-white/25 hover:border-white/60 min-h-[44px]"
                          >
                            <span>{current.ctaText}</span>
                            <ArrowUpRight
                              className="h-3.5 w-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              style={{ color: current.accent }}
                            />
                          </Button>
                        </a>
                      </Magnet>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Progress Note */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-neutral-400">
              <span>{t("divisions.scrollHint")}</span>
              <span className="font-sans font-semibold">{activeIndex + 1} {t("divisions.counter")}</span>
            </div>
          </div>
        </div>

        {/* Mobile Layout: Clean Translucent Stack */}
        <div className="lg:hidden flex flex-col space-y-6 mt-6">
          {divisions.map((div) => (
            <div
              key={div.id}
              className="p-7 rounded-2xl border border-white/15 bg-black/45 backdrop-blur-[2px] flex flex-col space-y-4 shadow-xl"
              style={{ borderLeft: `3px solid ${div.accent}` }}
            >
              <div className="flex items-baseline justify-between">
                <span
                  className="font-display text-5xl font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                  style={{ color: div.accent }}
                >
                  {div.number}
                </span>
                <span className="font-sans text-xs uppercase font-semibold tracking-[0.14em] text-neutral-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  {div.shortName}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-normal text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  {div.name}
                </h3>
                <p
                  className="mt-1 font-display italic text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  style={{ color: div.accent }}
                >
                  "{div.tagline}"
                </p>
              </div>

              <p className="text-sm text-neutral-100 leading-relaxed font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                {div.leadText}
              </p>

              <div className="space-y-2.5 pt-3 border-t border-white/10">
                {div.bullets.map((b, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: div.accent }}>
                      —
                    </span>
                    <span className="text-xs text-neutral-300 leading-relaxed font-normal">
                      {b}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a href={div.link}>
                  <Button
                    variant="editorial"
                    size="sm"
                    className="w-full text-xs font-sans font-semibold uppercase tracking-[0.14em] min-h-[44px]"
                  >
                    <span>{div.ctaText}</span>
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DivisionsSection
