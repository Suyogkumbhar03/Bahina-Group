import React, { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n"

export function SectionIndicator() {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState("hero")

  const sections = useMemo(
    () => [
      { id: "hero", label: "01", name: t("indicator.overview") },
      { id: "about", label: "02", name: t("indicator.essence") },
      { id: "divisions", label: "03", name: t("indicator.divisions") },
      { id: "vision-mission", label: "04", name: t("indicator.pillars") },
      { id: "contact", label: "05", name: t("indicator.connect") },
    ],
    [t]
  )

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center space-y-4 pointer-events-auto"
      aria-label={t("indicator.aria")}
    >
      {sections.map((sec) => {
        const isActive = activeSection === sec.id
        return (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            className="group relative flex items-center justify-center p-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 rounded-full"
            aria-label={`${t("indicator.scrollTo")} ${sec.name}`}
          >
            {/* Hover Tooltip */}
            <span className="pointer-events-none absolute right-7 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[11px] font-sans uppercase tracking-[0.14em] text-neutral-100 bg-[#0E1210]/90 border border-white/10 px-2 py-0.5 rounded backdrop-blur-sm whitespace-nowrap">
              {sec.name}
            </span>

            {/* Indicator Dot */}
            <div className="relative flex items-center justify-center">
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-2.5 h-2.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                    : "w-1.5 h-1.5 bg-white/25 group-hover:bg-white/60"
                }`}
              />
              {isActive && (
                <motion.div
                  layoutId="active-section-ring"
                  className="absolute -inset-1 rounded-full border border-white/40"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default SectionIndicator
