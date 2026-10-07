import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n"

export function SplitText({
  text = "",
  className = "",
  delay = 0,
  stagger = 0.06,
  italicWords = [],
}) {
  const { isMarathi } = useLanguage()
  const words = text.split(" ")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => {
        const isEmphasized = italicWords.some((w) =>
          word.toLowerCase().includes(w.toLowerCase())
        )
        // In Marathi: NO italic; use accent color / heavier weight instead
        const emphasisClass = isEmphasized
          ? isMarathi
            ? "font-medium text-[#D9A441]"
            : "italic font-medium text-neutral-100"
          : ""

        return (
          <motion.span
            key={i}
            variants={wordVariants}
            className={`inline-block mr-[0.25em] ${emphasisClass}`}
          >
            {word}
          </motion.span>
        )
      })}
    </motion.span>
  )
}

export default SplitText
