import React, { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

export function HyperText({
  text = "BAHINA",
  duration = 800,
  className = "",
  animateOnHover = false,
}) {
  const [displayText, setDisplayText] = useState(text.split(""))
  const [trigger, setTrigger] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const iterations = useRef(0)

  useEffect(() => {
    if (isInView && !trigger) {
      setTrigger(true)
    }
  }, [isInView, trigger])

  useEffect(() => {
    if (!trigger) return

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
  }, [text, duration, trigger])

  const handleMouseEnter = () => {
    if (animateOnHover) {
      iterations.current = 0
      setTrigger(true)
    }
  }

  return (
    <motion.span
      ref={ref}
      onMouseEnter={handleMouseEnter}
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
