import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n"

export function AnimatedBeamDiagram() {
  const { t, isMarathi } = useLanguage()

  return (
    <div className="relative w-full max-w-lg mx-auto p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0A0D0B]/85 flex flex-col items-center justify-center min-h-[340px] sm:min-h-[360px]">
      <div className="text-center mb-6 sm:mb-8">
        <span className="font-sans text-xs uppercase font-semibold tracking-[0.14em] text-neutral-400">
          {t("beam.badge")}
        </span>
      </div>

      {/* SVG Connecting Animated Beams */}
      <div className="relative w-full h-48 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <defs>
            <linearGradient id="beamHospitality" x1="50%" y1="50%" x2="15%" y2="85%">
              <stop offset="0%" stopColor="#EDE8E1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D9A441" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="beamFoundation" x1="50%" y1="50%" x2="50%" y2="85%">
              <stop offset="0%" stopColor="#EDE8E1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3E9B63" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="beamLabs" x1="50%" y1="50%" x2="85%" y2="85%">
              <stop offset="0%" stopColor="#EDE8E1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4C8DF6" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Path 1: Center to Hospitality */}
          <path
            d="M 50% 28% L 20% 80%"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <motion.path
            d="M 50% 28% L 20% 80%"
            stroke="url(#beamHospitality)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Path 2: Center to Foundation */}
          <path
            d="M 50% 28% L 50% 80%"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <motion.path
            d="M 50% 28% L 50% 80%"
            stroke="url(#beamFoundation)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Path 3: Center to Labs */}
          <path
            d="M 50% 28% L 80% 80%"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <motion.path
            d="M 50% 28% L 80% 80%"
            stroke="url(#beamLabs)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* Center Node: BAHINA */}
        <div className="absolute top-[8%] flex flex-col items-center">
          <div className="h-14 w-14 rounded-full border border-white/30 bg-[#121614] flex items-center justify-center shadow-xl">
            <span
              lang="en"
              className="font-display text-sm font-semibold tracking-widest text-[#F3EFEA]"
            >
              BAHINA
            </span>
          </div>
          <span className="mt-1 font-sans text-[10px] uppercase font-semibold text-neutral-400">
            {t("beam.centerNode")}
          </span>
        </div>

        {/* Bottom Three Division Nodes */}
        <div className="absolute bottom-[2%] left-0 right-0 flex justify-between px-2 sm:px-8">
          {/* Node 1: Hospitality (Amber) */}
          <div className="flex flex-col items-center">
            <div className="h-11 w-11 rounded-full border border-[#D9A441]/40 bg-[#16140F] flex items-center justify-center shadow-md">
              <span className="h-2.5 w-2.5 rounded-full bg-[#D9A441]" />
            </div>
            <span className="mt-1.5 font-sans text-[11px] font-semibold text-[#D9A441]">
              {t("beam.hospitality")}
            </span>
          </div>

          {/* Node 2: Foundation (Green) */}
          <div className="flex flex-col items-center">
            <div className="h-11 w-11 rounded-full border border-[#3E9B63]/40 bg-[#0D1510] flex items-center justify-center shadow-md">
              <span className="h-2.5 w-2.5 rounded-full bg-[#3E9B63]" />
            </div>
            <span className="mt-1.5 font-sans text-[11px] font-semibold text-[#3E9B63]">
              {t("beam.foundation")}
            </span>
          </div>

          {/* Node 3: Labs (Cool Blue) */}
          <div className="flex flex-col items-center">
            <div className="h-11 w-11 rounded-full border border-[#4C8DF6]/40 bg-[#0E1318] flex items-center justify-center shadow-md">
              <span className="h-2.5 w-2.5 rounded-full bg-[#4C8DF6]" />
            </div>
            <span className="mt-1.5 font-sans text-[11px] font-semibold text-[#4C8DF6]">
              {t("beam.labs")}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimatedBeamDiagram
