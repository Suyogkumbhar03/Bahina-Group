import React, { useEffect, useState, useCallback } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { WelcomeOverlay } from "@/components/ui/welcome-overlay"
import { FrameSequenceBackground } from "@/components/background/FrameSequenceBackground"
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { ClickSpark } from "@/components/ui/ClickSpark"
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
import { WarliSectionDivider } from "@/components/ui/warli-divider"
import { LanguageProvider } from "@/lib/i18n"

function shouldShowWelcomeInitial() {
  if (typeof window === "undefined") return false
  try {
    const params = new URLSearchParams(window.location.search)
    if (params.get("skip") === "1" || params.get("no-welcome") === "1") return false
    return true
  } catch (e) {
    return true
  }
}

export function App() {
  const [activeTheme, setActiveTheme] = useState("neutral")
  const [loaded, setLoaded] = useState(false)
  const [pass1Progress, setPass1Progress] = useState(0)
  const [pass1Ready, setPass1Ready] = useState(false)
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(shouldShowWelcomeInitial)

  const handlePass1Complete = useCallback(() => {
    setPass1Ready(true)
    setLoaded(true)
    if (typeof window !== "undefined") {
      ScrollTrigger.refresh()
    }
  }, [])

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
      <div className="relative min-h-screen bg-transparent text-[#F3EFEA] font-sans selection:bg-[#3E9B63]/30 selection:text-white overflow-x-clip">
        {/* 1. Magic UI Smooth Cursor (Desktop mouse only) */}
        <SmoothCursor />

        {/* 2. React Bits Click Spark (Tiny gold spark burst on click) */}
        <ClickSpark sparkColor="#D9A441" sparkCount={8} duration={400} />

        {/* 3. Desktop Fixed Right-Edge Section Indicator (01-05 dots) */}
        <SectionIndicator />

        {/* 4. Fullscreen Welcome Video Overlay with Native Voice */}
        <WelcomeOverlay
          isOpen={isWelcomeOpen}
          onClose={() => setIsWelcomeOpen(false)}
          isPageReady={pass1Ready}
        />

        {/* Thin Loading Bar (shown only if frames are still loading after welcome overlay is dismissed) */}
        {!pass1Ready && !isWelcomeOpen && (
          <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/10 overflow-hidden pointer-events-none">
            <div
              className="h-full bg-[#D9A441] transition-all duration-200"
              style={{ width: `${Math.max(5, Math.round(pass1Progress * 100))}%` }}
            />
          </div>
        )}

        {/* 5. The Frame Sequence Background (Fixed full-screen canvas with progressive multi-pass loader) */}
        <FrameSequenceBackground
          onPass1Progress={setPass1Progress}
          onPass1Complete={handlePass1Complete}
        />

        {/* 7. Main Page Content Flow with isolated stacking contexts */}
        <div className="relative z-10 flex flex-col">
          {/* Slim floating navbar (The ONLY glass element on the site) */}
          <Navbar />

          {/* Hero Section */}
          <HeroSection onOpenWelcomeVideo={() => setIsWelcomeOpen(true)} />

          {/* About Section */}
          <AboutSection />

          <WarliSectionDivider />

          {/* Three Divisions (GSAP Pinned Scroll Showpiece with pinSpacing: true) */}
          <DivisionsSection onThemeChange={setActiveTheme} />

          <WarliSectionDivider />

          {/* Vision and Mission (With Animated Beam Diagram) */}
          <VisionMissionSection />

          {/* Core Focus Areas (Two-row Marquee + MagicCard Bento Grid) */}
          <FocusAreasSection />

          {/* Values (React Bits Glare Hover Horizontal Expanding Panels / Mobile Accordion) */}
          <ValuesSection />

          {/* Our Approach (Vertical Sticky Timeline with SVG Line-Draw) */}
          <ApproachSection />

          <WarliSectionDivider />

          {/* Final CTA (Rural-first painted wall card with Warli accents) */}
          <FinalCtaSection />

          <WarliSectionDivider />

          {/* Footer (Flowing Menu + Scroll Velocity + HyperText + Magnet Back to Top) */}
          <FooterSection onOpenWelcomeVideo={() => setIsWelcomeOpen(true)} />
        </div>
      </div>
    </LanguageProvider>
  )
}

export default App
