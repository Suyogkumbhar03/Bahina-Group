import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export function TextRevealByWord({ text, className }) {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.85", "end 0.25"],
  })

  const words = text.split(" ")

  return (
    <div ref={targetRef} className={cn("relative z-0", className)}>
      <p className="flex flex-wrap text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium leading-tight text-white/20">
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          )
        })}
      </p>
    </div>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  const y = useTransform(progress, range, [4, 0])

  return (
    <span className="relative mr-2.5 lg:mr-3.5 my-1 inline-block">
      <motion.span style={{ opacity, y }} className="text-[#F3EFEA] inline-block transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
        {children}
      </motion.span>
    </span>
  )
}
