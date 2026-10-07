import React, { useRef } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion"

function wrap(min, max, v) {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

function ParallaxRow({ children, baseVelocity = 2, className = "" }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)
  const directionFactor = useRef(1)

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="flex flex-nowrap overflow-hidden whitespace-nowrap">
      <motion.div
        className={`flex whitespace-nowrap gap-10 ${className}`}
        style={{ x }}
      >
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  )
}

export function ScrollVelocity({ texts = [], className = "" }) {
  return (
    <div className={`w-full overflow-hidden py-4 select-none ${className}`}>
      {texts.map((text, idx) => (
        <ParallaxRow
          key={idx}
          baseVelocity={idx % 2 === 0 ? 1.5 : -1.5}
          className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.12em] font-medium text-white/80"
        >
          {text}
        </ParallaxRow>
      ))}
    </div>
  )
}

export default ScrollVelocity
