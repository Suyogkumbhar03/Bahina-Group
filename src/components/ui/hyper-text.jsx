import React, { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/lib/i18n"

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

export function HyperText({
  text = "BAHINA",
  duration = 800,
  className = "",
  animateOnHover = false,
}) {
  const { isMarathi } = useLanguage()
  const isLatinWordmark = text === "BAHINA" || /^[A-Za-z0-9\s]+$/.test(text)
  const shouldScramble = !isMarathi || isLatinWordmark

  const [displayText, setDisplayText] = useState(text.split(""))
  const [trigger, setTrigger] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const iterations = useRef(0)

  useEffect(() => {
    setDisplayText(text.split(""))
  }, [text])

  useEffect(() => {
    if (isInView && !trigger) {
      setTrigger(true)
    }
  }, [isInView, trigger])

  useEffect(() => {
    if (!trigger || !shouldScramble) return

    const intervalTime = duration / (text.length * 4)
    const interval = setInterval(() => {
      if (iterations.current < text.length) {
        setDisplayText((prev) =>
          prev.map((l, i) =>
            l === " "
              ? l
              : i <= iterations.current
              ? text[i]
              : alphabets[Math.floor(Math.random() * alphabets.length)]
          )
        )
        iterations.current += 0.25
      } else {
        setDisplayText(text.split(""))
        clearInterval(interval)
      }
    }, intervalTime)

    return () => clearInterval(interval)
  }, [text, duration, trigger, shouldScramble])

  const handleMouseEnter = () => {
    if (animateOnHover && shouldScramble) {
      iterations.current = 0
      setTrigger(true)
    }
  }

  // If Marathi and non-Latin: simple fade-up instead of scramble
  if (!shouldScramble) {
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`inline-block font-display select-none ${className}`}
      >
        {text}
      </motion.span>
    )
  }

  return (
    <motion.span
      ref={ref}
      onMouseEnter={handleMouseEnter}
      lang={isLatinWordmark && isMarathi ? "en" : undefined}
      className={`inline-block font-display select-none tracking-[0.08em] ${className}`}
    >
      {displayText.map((letter, i) => (
        <span key={i} className="inline-block">
          {letter}
        </span>
      ))}
    </motion.span>
  )
}

export default HyperText
