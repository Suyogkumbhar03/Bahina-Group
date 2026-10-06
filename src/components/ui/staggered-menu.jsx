import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

export function StaggeredMenu({ isOpen, onClose }) {
  const { t, isMarathi } = useLanguage()

  const navLinks = [
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.divisions"), href: "#divisions" },
    { name: t("nav.visionMission"), href: "#vision-mission" },
    { name: t("nav.focusAreas"), href: "#focus-areas" },
    { name: t("nav.values"), href: "#values" },
    { name: t("nav.approach"), href: "#approach" },
  ]

  const divisions = [
    {
      id: "hospitality",
      shortName: t("division.hospitality.shortName"),
      accent: "#D9A441",
    },
    {
      id: "foundation",
      shortName: t("division.foundation.shortName"),
      accent: "#3E9B63",
    },
    {
      id: "labs",
      shortName: t("division.labs.shortName"),
      accent: "#4C8DF6",
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          {/* Layer 1: Backdrop with dark blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Layer 2: Sliding Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="absolute inset-y-0 right-0 w-full max-w-sm bg-[#0E1210] border-l border-white/10 shadow-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          >
            {/* Header with Language Switcher & Close button */}
            <div className="flex flex-col space-y-4 border-b border-white/10 pb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span
                    lang="en"
                    className="font-display text-2xl font-light tracking-[0.16em] text-white"
                  >
                    BAHINA
                  </span>
                  <span className="text-[12px] uppercase font-sans font-semibold tracking-[0.14em] text-neutral-400">
                    {t("brand.group")}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
                  aria-label={t("nav.menuClose")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Language Switcher at top of mobile menu */}
              <div className="pt-2 flex justify-start">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Nav Links with Staggered Entrance */}
            <nav className="flex flex-col space-y-3 my-auto py-6" aria-label={t("nav.mobileNavAria")}>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.15 + idx * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-center justify-between py-2.5 text-xl sm:text-2xl font-display font-light text-neutral-200 hover:text-white transition-colors border-b border-white/5 min-h-[44px]"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {link.name}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-neutral-500 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </nav>

            {/* Bottom: Three Division Color Dots + Contact CTA */}
            <div className="border-t border-white/10 pt-6 space-y-4">
              <span className="block text-[12px] font-sans font-semibold uppercase tracking-[0.14em] text-neutral-400">
                {t("hero.divisionsBarLabel")}
              </span>
              <div className="flex items-center justify-between gap-2.5">
                {divisions.map((div) => (
                  <a
                    key={div.id}
                    href="#divisions"
                    onClick={onClose}
                    className="flex items-center space-x-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all flex-1 min-h-[44px]"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: div.accent }}
                    />
                    <span className="text-[12px] font-sans font-medium text-neutral-300 truncate">
                      {div.shortName}
                    </span>
                  </a>
                ))}
              </div>

              {/* Contact Button */}
              <a
                href="#contact"
                onClick={onClose}
                className="block w-full text-center py-3.5 rounded-full bg-white text-black font-sans font-semibold text-[13px] uppercase tracking-[0.14em] hover:bg-neutral-200 transition-colors min-h-[44px]"
              >
                {t("nav.contact")}
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default StaggeredMenu
