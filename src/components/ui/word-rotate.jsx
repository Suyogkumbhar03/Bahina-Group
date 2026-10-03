import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function WordRotate({
  words = ["Hospitality.", "Community.", "Research.", "Enriching Every Life."],
  duration = 2000,
  framerProps = {
    initial: { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 16 },
    transition: { duration: 0.35, ease: "easeOut" },
  },
  className,
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index === words.length - 1) return

    const interval = setInterval(() => {
      setIndex((prev) => (prev < words.length - 1 ? prev + 1 : prev))
    }, duration)

    return () => clearInterval(interval)
  }, [words, duration, index])

  return (
    <div className="overflow-hidden py-1 inline-flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={cn(className)}
          {...framerProps}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
