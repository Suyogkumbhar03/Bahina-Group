import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.65,
  delay = 0,
  yOffset = 20,
  inView = true,
  inViewMargin = "-50px",
  blur = "8px",
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: inViewMargin })
  const shouldAnimate = inView ? isInView : true

  const defaultVariants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
  }

  const combinedVariants = variant || defaultVariants

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      exit="hidden"
      variants={combinedVariants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default BlurFade
