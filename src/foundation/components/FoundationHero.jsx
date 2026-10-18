import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Compass, ChevronLeft, ChevronRight } from "lucide-react"

export function FoundationHero({ onOpenDonate }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // 4 User-provided images with matched text overlays
  const slides = [
    {
      id: "plantation",
      image: "/foundation/hero/hero-tree-plantation.jpg",
      titlePart1: "Together, We Can",
      scriptHighlight: "Grow a Greener Tomorrow",
      description:
        "Bahina Foundation is dedicated to empowering communities through sustainable initiatives, native tree afforestation, and ecological stewardship across rural Maharashtra.",
      primaryCta: "MAKE A DONATION",
      secondaryCta: "EXPLORE OUR INITIATIVES",
    },
    {
      id: "education",
      image: "/foundation/hero/hero-girl-education.jpg",
      titlePart1: "Empowering Rural Girls,",
      scriptHighlight: "Igniting Brighter Futures",
      description:
        "Guaranteeing holistic schooling, digital tablets, and higher secondary scholarships for first-generation tribal schoolgirls across remote Maharashtra villages.",
      primaryCta: "SPONSOR A STUDENT",
      secondaryCta: "EXPLORE INITIATIVES",
    },
    {
      id: "livelihoods",
      image: "/foundation/hero/hero-women-empowerment.jpg",
      titlePart1: "Fostering Self-Reliance,",
      scriptHighlight: "Dignity for Every Woman",
      description:
        "Equipping rural women with vocational tailoring skills, micro-credit linkages, and direct fair-trade cooperatives to achieve sustainable family livelihoods.",
      primaryCta: "SUPPORT WOMEN'S SHG",
      secondaryCta: "EXPLORE INITIATIVES",
    },
    {
      id: "community",
      image: "/foundation/hero/hero-village-meeting.jpg",
      titlePart1: "Rooted in the Soil,",
      scriptHighlight: "Reaching Every Village",
      description:
        "Partnering hand-in-hand with village Gram Panchayats and tribal elders to build decentralized water security, clean cookstoves, and thriving communities.",
      primaryCta: "MAKE A DONATION",
      secondaryCta: "OUR COMMUNITY MODEL",
    },
  ]

  const SLIDE_DURATION = 5000 // 5 seconds per slide continuous auto-scroll

  // Continuous auto-scrolling (never stops or pauses)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (idx) => {
    setCurrentSlide(idx)
  }

  const active = slides[currentSlide]

  return (
    <section
      className="relative min-h-[92vh] lg:min-h-screen text-[#F3EFEA] flex flex-col justify-between pt-28 sm:pt-36 pb-8 overflow-hidden select-none"
      aria-label="Bahina Foundation Hero Slideshow"
    >
      {/* ========================================================================= */}
      {/* 1. VISIBLE AUTO-SCROLLING BACKGROUND IMAGES (No -z-10, Bright & Vivid)   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={active.image}
              alt={active.titlePart1}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Balanced Vignette: Soft gradient preserving full image visibility and text clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/75" />
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN HERO TEXT OVERLAY (Star line removed, starting directly with title) */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-12 text-center flex-1 flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            {/* Main Title with Italic Script Highlight */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-semibold leading-[1.08] tracking-tight text-white max-w-4xl text-balance drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
              <span>{active.titlePart1}</span>{" "}
              <span
                className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F7D070] via-[#E2C785] to-[#86EFAC] block mt-1 drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontStyle: "italic",
                }}
              >
                {active.scriptHighlight}
              </span>
            </h1>

            {/* Subtitle / Description text overlaid on image */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-100 max-w-2xl font-sans leading-relaxed text-pretty drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] px-4 py-1.5 rounded-2xl">
              {active.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              {/* Primary Yellow Button */}
              <button
                onClick={onOpenDonate}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#E5B842] hover:bg-[#d8a832] text-black font-sans font-semibold text-xs sm:text-sm uppercase tracking-[0.14em] shadow-2xl hover:shadow-[0_0_24px_rgba(229,184,66,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 min-h-[48px]"
              >
                <Heart className="w-4 h-4 fill-current text-black" />
                <span>{active.primaryCta}</span>
              </button>

              {/* Secondary Dark Outline Button */}
              <a
                href="#active-causes"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-black/45 hover:bg-black/65 border border-white/30 hover:border-[#86EFAC] text-white font-sans font-semibold text-xs sm:text-sm uppercase tracking-[0.12em] backdrop-blur-md transition-all duration-300 flex items-center justify-center space-x-2 min-h-[48px] shadow-lg"
              >
                <Compass className="w-4 h-4 text-[#86EFAC]" />
                <span>{active.secondaryCta}</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM CAROUSEL CONTROLS (No numbers, No pause/play button)            */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex flex-col items-center space-y-3 mt-6">
        
        {/* Animated Countdown Progress Bar */}
        <div className="w-36 sm:w-48 h-1 rounded-full bg-white/25 overflow-hidden">
          <motion.div
            key={currentSlide}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: SLIDE_DURATION / 1000,
              ease: "linear",
            }}
            className="h-full bg-[#E5B842] rounded-full"
          />
        </div>

        {/* Carousel Arrow Buttons & Dots (Numbers and pause button removed) */}
        <div className="flex items-center space-x-3">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border border-white/30 bg-black/40 hover:bg-white/20 backdrop-blur-sm text-white transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 4 Interactive Slide Pill Dots */}
          <div className="flex items-center space-x-2">
            {slides.map((_, idx) => {
              const isCurrent = currentSlide === idx
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? "w-7 bg-[#E5B842] shadow-[0_0_8px_#E5B842]"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              )
            })}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 rounded-full border border-white/30 bg-black/40 hover:bg-white/20 backdrop-blur-sm text-white transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Organic Bottom Wave Shape Transition into Light Cream Section */}
      <div className="relative w-full overflow-hidden leading-none mt-2 pointer-events-none z-10">
        <svg
          className="relative block w-full h-10 sm:h-14 md:h-16 text-[#FAF8F5]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  )
}

export default FoundationHero
