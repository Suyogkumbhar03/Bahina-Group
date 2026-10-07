import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BG_IMAGE } from "@/data/content"

export function AnimatedBackground({ activeTheme = "neutral" }) {
  const imgRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    // Check prefers-reduced-motion or mobile
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const isMobile = window.innerWidth < 768
    setIsReducedMotion(mq.matches || isMobile)

    if (mq.matches || isMobile) return

    gsap.registerPlugin(ScrollTrigger)

    const img = imgRef.current
    if (!img) return

    // Dramatic scroll-driven camera motion: Scale 1.0 -> 1.4, Y: 0 -> -28%, X drift
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        {
          scale: 1.0,
          yPercent: 0,
          xPercent: 0,
          transformOrigin: "center center",
        },
        {
          scale: 1.42,
          yPercent: -22,
          xPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.0,
            invalidateOnRefresh: true,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Blurred dark placeholder until image loads */}
      <div
        className={`absolute inset-0 bg-[#0C100E] transition-opacity duration-700 ${
          imageLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* 120% Viewport Height Image Container for Generous Parallax Travel */}
      <div className="absolute top-[-10vh] left-[-4vw] w-[108vw] h-[125vh] overflow-hidden">
        <img
          ref={imgRef}
          src={BG_IMAGE}
          alt=""
          fetchPriority="high"
          onLoad={() => {
            setImageLoaded(true)
            if (typeof window !== "undefined" && window.ScrollTrigger) {
              window.ScrollTrigger.refresh()
            }
          }}
          className={`h-full w-full object-cover will-change-transform transition-opacity duration-700 ${
            isReducedMotion ? "" : "ken-burns-idle"
          } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          style={{
            objectPosition: "center 40%",
          }}
        />
      </div>

      {/* A3: Left-Side Text Column Scrim (70% dark on text side, fading to 0% on open photo side) */}
      {/* This ensures the photo is clearly visible on the right while text on the left passes WCAG AA */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent pointer-events-none" />

      {/* Top & Bottom Ambient Vignette to protect Navbar and Footer legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10 pointer-events-none" />

      {/* A2: Visible Section Tint Crossfades */}
      {/* Hospitality: Amber #D9A441 */}
      <div
        className={`absolute inset-0 bg-[#D9A441] mix-blend-color transition-opacity duration-1000 pointer-events-none ${
          activeTheme === "hospitality" ? "opacity-30" : "opacity-0"
        }`}
      />

      {/* Foundation: Green #3E9B63 */}
      <div
        className={`absolute inset-0 bg-[#3E9B63] mix-blend-color transition-opacity duration-1000 pointer-events-none ${
          activeTheme === "foundation" ? "opacity-28" : "opacity-0"
        }`}
      />

      {/* Labs: Cool Blue #4C8DF6 */}
      <div
        className={`absolute inset-0 bg-[#4C8DF6] mix-blend-color transition-opacity duration-1000 pointer-events-none ${
          activeTheme === "labs" ? "opacity-30" : "opacity-0"
        }`}
      />

      {/* Film grain texture */}
      <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />
    </div>
  )
}
