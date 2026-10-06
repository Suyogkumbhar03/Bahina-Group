import React, { useEffect, useState, useCallback } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Preloader } from "@/components/sections/Preloader"
import { FrameSequenceBackground } from "@/components/background/FrameSequenceBackground"
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { ClickSpark } from "@/components/ui/ClickSpark"
import { Particles } from "@/components/ui/particles"
import { SectionIndicator } from "@/components/ui/section-indicator"
import { Navbar } from "@/components/sections/Navbar"
import { HeroSection } from "@/components/sections/HeroSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { DivisionsSection } from "@/components/sections/DivisionsSection"
import { VisionMissionSection } from "@/components/sections/VisionMissionSection"
import { FocusAreasSection } from "@/components/sections/FocusAreasSection"
import { ValuesSection } from "@/components/sections/ValuesSection"
import { ApproachSection } from "@/components/sections/ApproachSection"
import { FinalCtaSection } from "@/components/sections/FinalCtaSection"
import { FooterSection } from "@/components/sections/FooterSection"
import { LanguageProvider } from "@/lib/i18n"

export function App() {
  const [activeTheme, setActiveTheme] = useState("neutral")
  const [loaded, setLoaded] = useState(false)
  const [pass1Progress, setPass1Progress] = useState(0)
  const [pass1Ready, setPass1Ready] = useState(false)

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true)
    if (typeof window !== "undefined") {
      ScrollTrigger.refresh()
    }
  }, [])

  const handlePass1Complete = useCallback(() => {
    setPass1Ready(true)
    if (typeof window !== "undefined") {
      ScrollTrigger.refresh()
    }
  }, [])

  // Particle color mapped to active division
  const particleColor =
    activeTheme === "hospitality"
      ? "#D9A441"
      : activeTheme === "foundation"
      ? "#3E9B63"
      : activeTheme === "labs"
      ? "#4C8DF6"
      : "#C8C4BD"

  // Initialize Lenis Smooth Scrolling and sync with GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    })

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger after fonts, images, and layout stabilize
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
      })
    }

    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener("resize", handleResize, { passive: true })

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 600)

    return () => {
      clearTimeout(refreshTimer)
      window.removeEventListener("resize", handleResize)
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#070908] text-[#F3EFEA] font-sans selection:bg-[#3E9B63]/30 selection:text-white overflow-x-hidden">
        {/* 1. Magic UI Smooth Cursor (Desktop mouse only) */}
        <SmoothCursor />

        {/* 2. React Bits Click Spark (Tiny gold spark burst on click) */}
        <ClickSpark sparkColor="#D9A441" sparkCount={8} duration={400} />

        {/* 3. Magic UI Particles (Tiny dust motes tinted by section, max 35 on desktop, 0 on mobile) */}
        <Particles color={particleColor} quantity={35} />

        {/* 4. Desktop Fixed Right-Edge Section Indicator (01-05 dots) */}
        <SectionIndicator />

        {/* 5. The Preloader Sequence (waits for Pass 1 frames; counter shows real loading progress) */}
        <Preloader
          progress={pass1Progress}
          isReady={pass1Ready}
          onComplete={handlePreloaderComplete}
        />

        {/* 6. The Frame Sequence Background (Fixed full-screen canvas with progressive multi-pass loader) */}
        <FrameSequenceBackground
          activeTheme={activeTheme}
          onPass1Progress={setPass1Progress}
          onPass1Complete={handlePass1Complete}
        />

        {/* 7. Main Page Content Flow with isolated stacking contexts */}
        <div className="relative z-10 flex flex-col">
          {/* Slim floating navbar (The ONLY glass element on the site) */}
          <Navbar />

          {/* Hero Section */}
          <HeroSection />

          {/* About Section */}
          <AboutSection />

          {/* Three Divisions (GSAP Pinned Scroll Showpiece with pinSpacing: true) */}
          <DivisionsSection onThemeChange={setActiveTheme} />

          {/* Vision and Mission (With Animated Beam Diagram) */}
          <VisionMissionSection />

          {/* Core Focus Areas (Two-row Marquee + MagicCard Bento Grid) */}
          <FocusAreasSection />

          {/* Values (React Bits Glare Hover Horizontal Expanding Panels / Mobile Accordion) */}
          <ValuesSection />

          {/* Our Approach (Vertical Sticky Timeline with SVG Line-Draw) */}
          <ApproachSection />

          {/* Final CTA (Lighter card with BorderBeam & Aurora Text) */}
          <FinalCtaSection />

          {/* Footer (Flowing Menu + Scroll Velocity + HyperText + Magnet Back to Top) */}
          <FooterSection />
        </div>
      </div>
    </LanguageProvider>
  )
}

export default App
