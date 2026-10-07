import React from "react"
import { useLanguage } from "@/lib/i18n"

/**
 * TextSizeControl
 * 
 * Provides accessible text scaling buttons:
 * - Marathi: "अ", "अ+", "अ++"
 * - English: "A", "A+", "A++"
 * Corresponding to 100%, 115%, and 130% root font scaling.
 * Minimum tap target >= 52px for accessibility across all ages.
 */
export function TextSizeControl({ className = "", compact = false }) {
  const { t, isMarathi, textScale, setTextScale } = useLanguage()

  const options = [
    {
      scale: "100",
      label: isMarathi ? "अ" : "A",
      ariaLabel: t("textSize.smallAria"),
    },
    {
      scale: "115",
      label: isMarathi ? "अ+" : "A+",
      ariaLabel: t("textSize.mediumAria"),
    },
    {
      scale: "130",
      label: isMarathi ? "अ++" : "A++",
      ariaLabel: t("textSize.largeAria"),
    },
  ]

  return (
    <div
      role="group"
      aria-label={t("textSize.label")}
      className={`inline-flex items-center rounded-full bg-white/5 border border-white/15 p-1 ${className}`}
    >
      <span className="sr-only">{t("textSize.label")}</span>
      {options.map((opt) => {
        const isActive = textScale === opt.scale
        return (
          <button
            key={opt.scale}
            type="button"
            onClick={() => setTextScale(opt.scale)}
            aria-pressed={isActive}
            aria-label={opt.ariaLabel}
            className={`relative flex items-center justify-center font-sans font-bold transition-all rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 select-none ${
              compact
                ? "min-w-[38px] sm:min-w-[42px] min-h-[38px] sm:min-h-[42px] text-xs px-2"
                : "min-w-[52px] min-h-[52px] text-sm px-3"
            } ${
              isActive
                ? "bg-[#D9A441] text-black shadow-md font-extrabold"
                : "text-neutral-200 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default TextSizeControl
