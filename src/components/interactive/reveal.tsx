"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

type Props = {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  amount?: number
  as?: "div" | "section"
}

/**
 * Fade-and-rise reveal triggered when the element scrolls into view.
 * Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  amount = 0.2,
  as = "div",
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount })
  const reduce = useReducedMotion()

  const initial = reduce ? { opacity: 1, y: 0 } : { opacity: 0, y }
  const animate = inView ? { opacity: 1, y: 0 } : initial

  const Comp = as === "section" ? motion.section : motion.div

  return (
    <Comp
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Comp>
  )
}

/**
 * Container that staggers children into view. Wrap with <Reveal.Stagger>
 * and use <Reveal.Item> for each child.
 */
export function RevealStagger({
  children,
  className,
  amount = 0.2,
  stagger = 0.08,
}: {
  children: React.ReactNode
  className?: string
  amount?: number
  stagger?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount })
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduce ? 0 : stagger },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  y = 16,
}: {
  children: React.ReactNode
  className?: string
  y?: number
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
