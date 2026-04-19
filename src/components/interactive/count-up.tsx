"use client"

import * as React from "react"
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion"

type Props = {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2,
  className,
}: Props) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotion()

  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, {
    stiffness: 60,
    damping: 20,
    duration: duration * 1000,
  })
  const [display, setDisplay] = React.useState("0")

  React.useEffect(() => {
    if (inView) {
      motionVal.set(reduced ? value : value)
      if (!reduced) {
        motionVal.set(0)
        setTimeout(() => motionVal.set(value), 50)
      }
    }
  }, [inView, value, motionVal, reduced])

  React.useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setDisplay(
        v.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      )
    })
    return unsub
  }, [spring, decimals])

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  )
}
