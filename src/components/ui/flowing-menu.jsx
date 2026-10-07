import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export function FlowingMenu({ items = [] }) {
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [tappedIdx, setTappedIdx] = useState(null)

  const handleTouch = (idx) => {
    setTappedIdx(idx)
    setTimeout(() => setTappedIdx(null), 400)
  }

  return (
    <div className="w-full border-t border-b border-white/10 overflow-hidden divide-y divide-white/10">
      {items.map((item, idx) => {
        const isHovered = hoveredIdx === idx
        const isTapped = tappedIdx === idx

        return (
          <div
            key={item.text || item.title || idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => handleTouch(idx)}
            className="group relative w-full h-16 sm:h-24 md:h-28 overflow-hidden cursor-pointer flex items-center justify-between px-4 sm:px-10 transition-colors duration-300"
            style={{
              backgroundColor: isTapped
                ? `${item.color || "#ffffff"}15`
                : "transparent",
            }}
          >
            {/* Standard Row Layout (Desktop & Mobile) */}
            <div className="relative z-10 flex items-center space-x-3 sm:space-x-8 min-w-0 pr-2">
              <span className="font-sans text-xs uppercase tracking-[0.18em] text-neutral-500 font-semibold shrink-0">
                {item.number || `0${idx + 1}`}
              </span>
              <span className="font-display text-base sm:text-2xl md:text-3xl font-medium text-white group-hover:text-white transition-colors duration-300 truncate">
                {item.text || item.title}
              </span>
            </div>

            <div className="relative z-10 flex items-center space-x-4">
              <span className="hidden sm:inline-block text-xs font-sans uppercase tracking-[0.14em] text-white">
                {item.category || "Explore"}
              </span>
              <div
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:border-white/50 group-hover:scale-110"
                style={{
                  backgroundColor: isHovered ? item.color : "transparent",
                }}
              >
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{
                    color: isHovered ? "#000000" : "#ffffff",
                  }}
                />
              </div>
            </div>

            {/* Desktop Sliding Hover Marquee Reveal */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "-100%" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="hidden md:flex absolute inset-0 z-20 items-center overflow-hidden pointer-events-none"
                  style={{
                    backgroundColor: item.color || "#D9A441",
                  }}
                >
                  <div className="flex whitespace-nowrap animate-marquee py-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex items-center mx-6 space-x-6">
                        <span className="font-display text-2xl md:text-3xl font-semibold uppercase tracking-[0.12em] text-black">
                          {item.text || item.title}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-white/10" />
                        <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-black/70">
                          {item.tagline || "BAHINA Group"}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default FlowingMenu
