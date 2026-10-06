import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function LanguageSwitcher({ className = "", compact = false }) {
  const { language, setLanguage, t } = useLanguage()

  if (compact) {
    return (
      <div
        role="group"
        aria-label={t("lang.switchAria", "Choose website language")}
        className={cn(
          "relative inline-flex items-center p-0.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-md select-none shrink-0",
          className
        )}
      >
        {/* English button */}
        <button
          type="button"
          onClick={() => setLanguage("en")}
          aria-pressed={language === "en"}
          className={cn(
            "relative h-8 px-2.5 text-[11px] font-sans font-semibold transition-colors duration-200 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-white/70",
            language === "en" ? "text-white" : "text-neutral-400 hover:text-neutral-200"
          )}
        >
          <span className="relative z-10 tracking-[0.04em]">English</span>
          {language === "en" && (
            <motion.div
              layoutId="lang-active-pill-compact"
              className="absolute inset-0.5 rounded-full bg-white/20 border border-white/30 shadow-sm -z-0"
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            />
          )}
        </button>

        {/* Marathi button */}
        <button
          type="button"
          onClick={() => setLanguage("mr")}
          aria-pressed={language === "mr"}
          className={cn(
            "relative h-8 px-2.5 text-[12px] font-sans font-semibold transition-colors duration-200 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-white/70",
            language === "mr" ? "text-white" : "text-neutral-400 hover:text-neutral-200"
          )}
        >
          <span className="relative z-10 tracking-normal">मराठी</span>
          {language === "mr" && (
            <motion.div
              layoutId="lang-active-pill-compact"
              className="absolute inset-0.5 rounded-full bg-white/20 border border-white/30 shadow-sm -z-0"
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            />
          )}
        </button>
      </div>
    )
  }

  return (
    <div
      role="group"
      aria-label={t("lang.switchAria", "Choose website language")}
      className={cn(
        "relative inline-flex items-center p-1 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-md select-none shrink-0",
        className
      )}
    >
      {/* English option */}
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={cn(
          "relative min-h-[44px] min-w-[44px] px-3.5 py-2 text-xs font-sans font-semibold transition-colors duration-200 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
          language === "en" ? "text-white" : "text-neutral-400 hover:text-neutral-200"
        )}
      >
        <span className="relative z-10 tracking-[0.06em]">English</span>
        {language === "en" && (
          <motion.div
            layoutId="lang-active-pill"
            className="absolute inset-1 rounded-full bg-white/20 border border-white/30 shadow-sm -z-0"
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          />
        )}
      </button>

      {/* Marathi option */}
      <button
        type="button"
        onClick={() => setLanguage("mr")}
        aria-pressed={language === "mr"}
        className={cn(
          "relative min-h-[44px] min-w-[44px] px-3.5 py-2 text-xs font-sans font-semibold transition-colors duration-200 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
          language === "mr" ? "text-white" : "text-neutral-400 hover:text-neutral-200"
        )}
      >
        <span className="relative z-10 tracking-normal text-[13px]">मराठी</span>
        {language === "mr" && (
          <motion.div
            layoutId="lang-active-pill"
            className="absolute inset-1 rounded-full bg-white/20 border border-white/30 shadow-sm -z-0"
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          />
        )}
      </button>
    </div>
  )
}

export default LanguageSwitcher
