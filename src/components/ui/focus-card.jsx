import React, { useRef, useState, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import { BorderBeam } from "@/components/ui/border-beam"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"

/**
 * FocusCard
 * 
 * An ultra-premium 3D interactive bento card component featuring:
 * - Fluid 3D perspective tilt physics with depth layering
 * - Mouse-tracking dynamic spotlight reflection matching the division accent color
 * - Ambient colored corner glow and dot-matrix architectural background
 * - Glowing icon pill with radial lighting
 * - Hover-activated BorderBeam perimeter ray
 * - Full reduced-motion and touch device graceful degradation
 */
export function FocusCard({
  area,
  index,
  icon: Icon,
  className = "",
}) {
  const { t } = useLanguage()
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (e) => setIsReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const handleMouseMove = (e) => {
    if (isReducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Smooth tilt angles (capped at +/- 7.5 degrees for luxury feel)
    const rotX = ((y - centerY) / centerY) * -7.5
    const rotY = ((x - centerX) / centerX) * 7.5

    setRotateX(rotX)
    setRotateY(rotY)
    setMousePos({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  const formattedNum = String(index + 1).padStart(2, "0")

  return (
    <div
      style={{ perspective: "1000px" }}
      className="w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isReducedMotion
            ? "none"
            : `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
          transformStyle: "preserve-3d",
          transition: isHovered
            ? "transform 0.1s ease-out, box-shadow 0.3s ease-out"
            : "transform 0.5s ease-out, box-shadow 0.5s ease-out",
        }}
        className={cn(
          "relative h-full w-full rounded-2xl border border-white/15 bg-black/45 backdrop-blur-[2px] p-6 sm:p-7 md:p-8 flex flex-col justify-between overflow-hidden shadow-xl group transition-all duration-300",
          "hover:border-white/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]",
          className
        )}
      >
        {/* 1. Subtle Dot Matrix Architectural Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-500"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* 2. Ambient Colored Corner Light Leak */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"
          style={{
            backgroundColor: area.accent,
          }}
        />

        {/* 3. Interactive Mouse Spotlight (Tracks pointer inside card with accent tint) */}
        {isHovered && !isReducedMotion && (
          <div
            className="pointer-events-none absolute -inset-px opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${area.accent}20, transparent 75%)`,
            }}
          />
        )}

        {/* 4. Animated BorderBeam on Hover */}
        {isHovered && (
          <BorderBeam
            size={220}
            duration={8}
            borderWidth={1.5}
            colorFrom={area.accent}
            colorTo="#ffffff"
          />
        )}

        {/* 5. Big Architectural Watermark Index */}
        <div
          style={{
            transform: isReducedMotion ? "none" : "translateZ(15px)",
          }}
          className="pointer-events-none absolute top-4 right-6 font-display font-light text-5xl sm:text-6xl text-white/[0.04] group-hover:text-white/[0.09] transition-colors duration-300 select-none"
        >
          {formattedNum}
        </div>

        {/* Content Wrapper */}
        <div
          style={{
            transform: isReducedMotion ? "none" : "translateZ(30px)",
            transformStyle: "preserve-3d",
          }}
          className="relative z-10"
        >
          {/* Top Row: Glowing Icon Container + Division Pill Badge */}
          <div className="flex items-center justify-between mb-6">
            <div
              className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] transition-all duration-300 group-hover:scale-110 shadow-lg"
              style={{
                boxShadow: `0 8px 20px -4px ${area.accent}33`,
              }}
            >
              <Icon className="h-5 w-5 text-neutral-200 group-hover:text-white transition-colors" />
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${area.accent}35 0%, transparent 70%)`,
                }}
              />
            </div>

            {/* Glowing Division Pill Badge */}
            <div
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full border bg-white/[0.03] backdrop-blur-md text-[11px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 group-hover:border-opacity-60"
              style={{
                color: area.accent,
                borderColor: `${area.accent}40`,
                boxShadow: `0 0 14px ${area.accent}15`,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: area.accent,
                  boxShadow: `0 0 6px ${area.accent}`,
                }}
              />
              <span>{area.division}</span>
            </div>
          </div>

          {/* Title with Fraunces serif */}
          <h3
            style={{
              transform: isReducedMotion ? "none" : "translateZ(25px)",
            }}
            className="font-display text-xl sm:text-2xl md:text-[1.6rem] font-light text-[#F3EFEA] tracking-[-0.01em] mb-3 group-hover:text-white transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
          >
            {area.title}
          </h3>

          {/* Description */}
          <p
            style={{
              transform: isReducedMotion ? "none" : "translateZ(20px)",
            }}
            className="font-sans text-sm sm:text-[15px] md:text-base text-neutral-200 font-normal leading-[1.65] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
          >
            {area.desc}
          </p>
        </div>

        {/* 6. Card Bottom Footer */}
        <div
          style={{
            transform: isReducedMotion ? "none" : "translateZ(25px)",
          }}
          className="relative z-10 mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-neutral-400 uppercase tracking-wider"
        >
          <div className="flex items-center space-x-2">
            <span className="text-neutral-500 font-mono">0{index + 1}</span>
            <span className="h-1 w-1 rounded-full bg-neutral-600" />
            <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors">
              {t ? t("focus.strategicBadge") : "Strategic Capability"}
            </span>
          </div>

          <div
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 group-hover:text-white transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/[0.08]"
            style={{
              borderColor: isHovered ? `${area.accent}60` : undefined,
            }}
          >
            <ArrowUpRight className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FocusCard
