import React, { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BorderBeam } from "@/components/ui/border-beam"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { ShinyText } from "@/components/ui/shiny-text"
import { Magnet } from "@/components/ui/Magnet"
import { WarliCorner } from "@/components/ui/warli-divider"
import { useLanguage } from "@/lib/i18n"

export function DivisionsSection({ onThemeChange }) {
  const { t, isMarathi } = useLanguage()
  const [activeIdx, setActiveIdx] = useState(0)
  const wrapperRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(true)

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

  const current = divisions[activeIdx]

  useEffect(() => {
    if (current) {
      onThemeChange?.(current.id)
    }
  }, [activeIdx, current, onThemeChange])

  // Screen size check for desktop scroll-pinning vs mobile vertical flow
  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(typeof window !== "undefined" && window.innerWidth >= 1024)
    }
    checkSize()
    window.addEventListener("resize", checkSize, { passive: true })
    return () => window.removeEventListener("resize", checkSize)
  }, [])

  // Scroll-driven animation: automatically cycles cards 01 -> 02 -> 03 as user scrolls down
  useEffect(() => {
    if (!isDesktop || !wrapperRef.current) return

    const handleScroll = () => {
      if (!wrapperRef.current) return
      const rect = wrapperRef.current.getBoundingClientRect()
      const scrollDistance = rect.height - window.innerHeight
      if (scrollDistance <= 0) return

      let progress = -rect.top / scrollDistance
      progress = Math.max(0, Math.min(0.999, progress))

      // 3 zones: 0..0.33 (Hospitality), 0.33..0.66 (Foundation), 0.66..1.0 (Labs)
      const index = Math.min(2, Math.floor(progress * 3))
      setActiveIdx(index)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDesktop])

  // Navigate to specific card when tab/panel is clicked
  const handleSelectPanel = (idx) => {
    setActiveIdx(idx)
    if (isDesktop && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect()
      const scrollDistance = rect.height - window.innerHeight
      if (scrollDistance > 0) {
        const targetProgress = idx === 0 ? 0.05 : idx === 1 ? 0.5 : 0.95
        window.scrollTo({
          top: window.scrollY + rect.top + (scrollDistance * targetProgress),
          behavior: "smooth",
        })
      }
    }
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleSelectPanel(idx)
    }
  }

  return (
    <section
      id="divisions"
      ref={wrapperRef}
      className="relative z-20 w-full"
      style={{
        minHeight: isDesktop ? "250vh" : "auto",
      }}
    >
      {/* Sticky viewport container (stays centered and perfectly visible on desktop while scrolling) */}
      <div
        className={
          isDesktop
            ? "sticky top-0 left-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 md:px-10 xl:px-12"
            : "w-full py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto"
        }
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-center h-full max-h-[92vh] pt-10 sm:pt-14 pb-4">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-4 mb-6 shrink-0">
            <div>
              <ShinyText
                text={t("divisions.eyebrow")}
                className="text-[12px] font-sans font-semibold tracking-[0.14em]"
              />
              <h2 className="mt-1.5 font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-[#F3EFEA]">
                {t("divisions.heading")}
              </h2>
            </div>

            {/* Desktop Quick Indicator Tabs */}
            <div className="hidden lg:flex items-center space-x-2 mt-4 sm:mt-0">
              {divisions.map((div, i) => {
                const isActive = activeIdx === i
                return (
                  <button
                    key={div.id}
                    onClick={() => handleSelectPanel(i)}
                    className={`min-h-[36px] px-3.5 py-1 font-sans text-xs uppercase tracking-[0.12em] font-semibold transition-all rounded-full border ${
                      isActive
                        ? "border-white/50 bg-white/20 text-white shadow-md"
                        : "border-transparent text-neutral-300 hover:text-white hover:bg-white/10"
                    }`}
                    style={{ color: isActive ? div.accent : undefined }}
                  >
                    {div.number} {div.shortName}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ============================================================ */}
          {/* 1. DESKTOP VIEW (>= 1024px): Three Tall Expanding Panels      */}
          {/* ============================================================ */}
          <div className="hidden lg:flex w-full h-[520px] max-h-[66vh] gap-4 items-stretch shrink-0">
            {divisions.map((div, idx) => {
              const isActive = activeIdx === idx

              return (
                <motion.div
                  key={div.id}
                  layout
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  onClick={() => handleSelectPanel(idx)}
                  onFocus={() => setActiveIdx(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isActive}
                  aria-label={`${div.number} ${div.name}`}
                  className={`relative rounded-3xl border cursor-pointer transition-colors duration-300 overflow-hidden flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                    isActive
                      ? "flex-[3.5] border-white/30 bg-black/70 backdrop-blur-md shadow-2xl ring-1 ring-white/20"
                      : "flex-1 border-white/15 bg-black/45 backdrop-blur-md hover:border-white/30 hover:bg-black/60"
                  }`}
                >
                  {/* Top Accent Strip */}
                  <div
                    className="w-full h-1.5 shrink-0 transition-opacity duration-300"
                    style={{
                      backgroundColor: div.accent,
                      opacity: isActive ? 1 : 0.6,
                    }}
                  />

                  {/* Active Border Beam Highlight */}
                  {isActive && (
                    <BorderBeam
                      size={280}
                      duration={14}
                      colorFrom={div.accent}
                      colorTo="#ffffff"
                    />
                  )}

                  {/* Warli Corner for Indian Heritage Accent */}
                  {isActive && (
                    <div className="absolute top-4 right-4 rotate-90 pointer-events-none">
                      <WarliCorner accent={div.accent} />
                    </div>
                  )}

                  {/* Atmosphere Background Effects (Active Card Only) */}
                  {isActive && div.id === "foundation" && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10 opacity-30">
                      {[...Array(10)].map((_, i) => (
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
                          style={{ left: `${i * 10 + 5}%` }}
                          className="absolute w-1.5 h-1.5 rounded-full bg-[#3E9B63] blur-[0.5px]"
                        />
                      ))}
                    </div>
                  )}
                  {isActive && div.id === "labs" && (
                    <FlickeringGrid
                      squareSize={4}
                      gridGap={10}
                      color="#4C8DF6"
                      maxOpacity={0.2}
                      className="opacity-60"
                    />
                  )}

                  {/* ============================================================ */}
                  {/* CARD CONTENT: OPEN VS CLOSED                                  */}
                  {/* ============================================================ */}
                  {isActive ? (
                    // --- OPEN STATE (Expanded width) ---
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.08 }}
                      className="p-6 xl:p-8 flex flex-col justify-between h-full overflow-y-auto scrollbar-hide"
                    >
                      {/* Top Block: Number + Names */}
                      <div>
                        <div className="flex items-baseline justify-between">
                          <span
                            className="font-display font-medium tracking-tight block leading-none select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
                            style={{
                              fontSize: "clamp(3rem, 5vw, 4.5rem)",
                              color: div.accent,
                              textShadow: `0 0 24px ${div.accent}33`,
                            }}
                          >
                            {div.number}
                          </span>
                          <span
                            className="font-sans text-[11px] uppercase font-bold tracking-[0.16em] px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white"
                          >
                            {div.shortName}
                          </span>
                        </div>

                        <h3 className="mt-3 font-display font-semibold text-[#F3EFEA] text-xl xl:text-2xl leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                          {div.name}
                        </h3>

                        <p
                          className="mt-1.5 font-display italic font-medium text-sm xl:text-base drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                          style={{ color: div.accent }}
                        >
                          "{div.tagline}"
                        </p>
                      </div>

                      {/* Middle Block: Lead + Bullets */}
                      <div className="my-4 space-y-3">
                        <p
                          className="font-sans font-semibold leading-relaxed text-neutral-100 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
                          style={{ fontSize: isMarathi ? "16px" : "14px" }}
                        >
                          {div.leadText}
                        </p>

                        <div className="border-t border-white/10 pt-3 space-y-2">
                          {div.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start space-x-2.5">
                              <span
                                className="font-sans text-xs font-bold shrink-0 mt-0.5"
                                style={{ color: div.accent }}
                              >
                                —
                              </span>
                              <span
                                className="font-sans font-semibold leading-relaxed text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] text-xs sm:text-sm"
                              >
                                {bullet}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Block: Category & CTA */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-4">
                        <div className="font-sans uppercase text-[10px] tracking-[0.14em] font-semibold text-neutral-200 truncate max-w-[220px]">
                          {div.category}
                        </div>

                        <Magnet magnetStrength={0.2} padding={15}>
                          <a href={div.link} data-cursor-label="Explore">
                            <Button
                              variant="editorial"
                              size="sm"
                              className="group rounded-full text-xs font-sans font-semibold tracking-[0.12em] uppercase border-white/25 hover:border-white/60 px-4 py-1.5 min-h-[38px]"
                            >
                              <span>{div.ctaText}</span>
                              <ArrowUpRight
                                className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                style={{ color: div.accent }}
                              />
                            </Button>
                          </a>
                        </Magnet>
                      </div>
                    </motion.div>
                  ) : (
                    // --- CLOSED STATE (Narrow panel) ---
                    <div className="p-6 flex flex-col justify-between h-full select-none">
                      {/* Top Number */}
                      <div>
                        <span
                          className="font-display font-medium tracking-tight block leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                          style={{
                            fontSize: "2.5rem",
                            color: div.accent,
                          }}
                        >
                          {div.number}
                        </span>
                        <span className="font-sans text-[11px] uppercase tracking-[0.16em] font-bold text-neutral-200 mt-2 block">
                          {div.shortName}
                        </span>
                      </div>

                      {/* Middle Title */}
                      <div className="my-auto py-3">
                        <h3 className="font-display font-semibold text-[#F3EFEA] text-base xl:text-lg leading-tight line-clamp-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                          {div.name}
                        </h3>
                      </div>

                      {/* Bottom Tap Hint */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="font-sans text-[10px] uppercase tracking-[0.14em] font-semibold text-neutral-300">
                          Explore
                        </span>
                        <ChevronRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          style={{ color: div.accent }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Desktop Bottom Scroll Progress Bar */}
          {isDesktop && (
            <div className="hidden lg:flex items-center justify-between pt-4 mt-3 border-t border-white/10 text-xs font-sans text-neutral-300">
              <span className="font-medium tracking-wide">
                {t("divisions.scrollHint") || "Scroll to explore companies"}
              </span>
              <div className="flex items-center space-x-2">
                {divisions.map((d, i) => (
                  <span
                    key={d.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIdx === i ? "w-8 bg-white" : "w-2 bg-white/25"
                    }`}
                    style={{ backgroundColor: activeIdx === i ? d.accent : undefined }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 2. MOBILE / TABLET VIEW (< 1024px): Clean Vertical Accordion */}
          {/* ============================================================ */}
          <div className="lg:hidden flex flex-col space-y-4">
            {divisions.map((div, idx) => {
              const isOpen = activeIdx === idx

              return (
                <div
                  key={div.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-xl ${
                    isOpen
                      ? "border-white/30 bg-black/75 backdrop-blur-md ring-1 ring-white/20"
                      : "border-white/15 bg-black/50 backdrop-blur-md"
                  }`}
                  style={{ borderLeft: `4px solid ${div.accent}` }}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => setActiveIdx(isOpen ? -1 : idx)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 min-h-[56px]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center space-x-3.5 pr-2">
                      <span
                        className="font-display text-2xl font-semibold"
                        style={{ color: div.accent }}
                      >
                        {div.number}
                      </span>
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-semibold text-[#F3EFEA]">
                          {div.name}
                        </h3>
                        <p className="font-sans text-xs text-neutral-200 font-semibold tracking-wide mt-0.5">
                          {div.shortName} • {div.category}
                        </p>
                      </div>
                    </div>

                    <div
                      className="p-2 rounded-full border border-white/10 bg-white/5 shrink-0"
                    >
                      <ChevronDown
                        className={`h-4 w-4 text-white transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Expandable Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-white/10 flex flex-col space-y-5">
                          <p
                            className="font-display italic text-base drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                            style={{ color: div.accent }}
                          >
                            "{div.tagline}"
                          </p>

                          <p className="font-sans text-sm sm:text-base text-neutral-100 font-semibold leading-relaxed">
                            {div.leadText}
                          </p>

                          <div className="space-y-2.5 pt-2 border-t border-white/10">
                            {div.bullets.map((bullet, bIdx) => (
                              <div key={bIdx} className="flex items-start space-x-2.5">
                                <span
                                  className="text-xs font-bold shrink-0 mt-0.5"
                                  style={{ color: div.accent }}
                                >
                                  —
                                </span>
                                <span className="text-xs sm:text-sm text-white leading-relaxed font-semibold">
                                  {bullet}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-3">
                            <a href={div.link}>
                              <Button
                                variant="editorial"
                                size="default"
                                className="w-full text-xs font-sans font-semibold uppercase tracking-[0.14em] min-h-[44px]"
                              >
                                <span>{div.ctaText}</span>
                                <ArrowUpRight className="h-4 w-4 ml-1.5" />
                              </Button>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

export default DivisionsSection
