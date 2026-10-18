import React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Award } from "lucide-react"
import { foundationContent } from "../data/foundationContent"

export function ImpactNumbers() {
  const { impact } = foundationContent

  return (
    <section id="impact" className="relative bg-[#061D12] text-white py-16 sm:py-24 px-4 sm:px-6 md:px-12 overflow-hidden border-t border-[#3E9B63]/20">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3E9B63]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#86EFAC] font-sans text-xs uppercase font-semibold tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>{impact.badge}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
            {impact.heading}
          </h2>
          <p className="mt-3 text-neutral-300 font-sans text-base sm:text-lg">
            {impact.subheading}
          </p>
        </div>

        {/* 4 Impact Stat Cards (Matching screenshot style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impact.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="group rounded-3xl bg-[#0B281A] border border-[#3E9B63]/30 p-7 flex flex-col justify-between hover:border-[#86EFAC]/60 transition-all duration-300 shadow-xl relative overflow-hidden"
            >
              {/* Corner Watermark Leaf / Warli Accent */}
              <div className="absolute top-3 right-3 text-[#3E9B63]/20 group-hover:text-[#3E9B63]/40 transition-colors">
                <Award className="w-6 h-6" />
              </div>

              <div>
                <span className="font-display text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white block">
                  {stat.value}
                </span>
                <h4 className="mt-3 font-sans text-base sm:text-lg font-semibold text-[#D9A441]">
                  {stat.label}
                </h4>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-neutral-300/90 font-sans leading-relaxed pt-3 border-t border-white/10">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ImpactNumbers
