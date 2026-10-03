import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { GlareHover } from "@/components/ui/glare-hover"

export function ExpandingPanels({ values }) {
  const [activeIdx, setActiveIdx] = useState(0)

  const handleKeyDown = (e, idx) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setActiveIdx(idx)
    }
  }

  return (
    <div>
      {/* Desktop View: Horizontal Expanding Panels with React Bits GlareHover */}
      <div className="hidden lg:flex w-full h-[380px] gap-3">
        {values.map((val, idx) => {
          const isActive = activeIdx === idx

          return (
            <motion.div
              key={val.name}
              onMouseEnter={() => setActiveIdx(idx)}
              onFocus={() => setActiveIdx(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              tabIndex={0}
              layout
              role="button"
              aria-expanded={isActive}
              aria-label={`Core Value ${idx + 1}: ${val.name}`}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className={`relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 ${
                isActive
                  ? "flex-[3.5] border-white/30 bg-[#0E1310]/95 shadow-2xl"
                  : "flex-1 border-white/10 bg-[#080B09]/80 hover:border-white/20"
              }`}
            >
              <GlareHover className="h-full w-full p-7 flex flex-col justify-between">
                {/* Top Header */}
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs font-semibold text-neutral-400">
                    0{idx + 1}
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full transition-colors ${
                      isActive ? "bg-[#EDE8E1]" : "bg-white/20"
                    }`}
                  />
                </div>

                {/* Title & Description */}
                <div>
                  <h3
                    className={`font-display font-normal text-[#F3EFEA] transition-all leading-tight ${
                      isActive ? "text-3xl" : "text-xl truncate"
                    }`}
                  >
                    {val.name}
                  </h3>

                  {/* Description shown on widened active panel */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="mt-4 font-sans text-sm sm:text-base text-neutral-200 font-normal leading-relaxed max-w-sm"
                      >
                        {val.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom tag */}
                <div className="pt-2">
                  <span className="font-sans text-[11px] uppercase tracking-[0.14em] font-semibold text-neutral-400">
                    Core Value
                  </span>
                </div>
              </GlareHover>
            </motion.div>
          )
        })}
      </div>

      {/* Mobile View: Clean Accessible Accordion */}
      <div className="lg:hidden flex flex-col space-y-3">
        {values.map((val, idx) => {
          const isOpen = activeIdx === idx

          return (
            <div
              key={val.name}
              className="rounded-2xl border border-white/10 bg-[#0C100E] p-5 overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveIdx(isOpen ? -1 : idx)}
                className="w-full flex items-center justify-between text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
                aria-expanded={isOpen}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-sans text-xs font-semibold text-neutral-400">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display text-xl font-normal text-[#F3EFEA]">
                    {val.name}
                  </h3>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-neutral-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 pt-3 border-t border-white/10 font-sans text-sm text-neutral-300 font-normal leading-relaxed">
                      {val.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExpandingPanels
