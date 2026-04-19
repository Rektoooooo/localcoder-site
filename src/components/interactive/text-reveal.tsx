"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

type Props = {
  children: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
  highlightWord?: string
  highlightClassName?: string
  delay?: number
}

export function TextReveal({
  children,
  className,
  as: Tag = "h1",
  highlightWord,
  highlightClassName,
  delay = 0,
}: Props) {
  const ref = React.useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduced = useReducedMotion()

  const words = children.split(" ")

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {words.map((word, i) => {
        const isHighlight = highlightWord && word.includes(highlightWord)
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden">
            <motion.span
              className={`inline-block ${isHighlight ? highlightClassName ?? "" : ""}`}
              initial={reduced ? {} : { y: "110%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: delay + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && "\u00A0"}
          </span>
        )
      })}
    </Tag>
  )
}
