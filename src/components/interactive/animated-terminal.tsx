"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

export type TerminalLine = {
  node: React.ReactNode
  delay?: number // additional delay before appearing (ms)
}

export function AnimatedTerminal({
  prompt,
  lines,
  header,
  footer,
  statusLabel = "On-device",
  className = "",
  cps = 60,
  postPromptDelay = 400,
  stagger = 180,
}: {
  prompt: string
  lines: TerminalLine[]
  header?: React.ReactNode
  footer?: React.ReactNode
  statusLabel?: string
  className?: string
  cps?: number
  postPromptDelay?: number
  stagger?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduce = useReducedMotion()

  const [typed, setTyped] = React.useState("")
  const [promptDone, setPromptDone] = React.useState(false)
  const [visibleLines, setVisibleLines] = React.useState(0)
  const [cursorOn, setCursorOn] = React.useState(true)

  // Cursor blink
  React.useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setCursorOn((v) => !v), 530)
    return () => clearInterval(id)
  }, [reduce])

  // Scene playback
  React.useEffect(() => {
    if (!inView) return

    if (reduce) {
      setTyped(prompt)
      setPromptDone(true)
      setVisibleLines(lines.length)
      return
    }

    let cancelled = false
    const step = 1000 / cps

    const play = async () => {
      // Typewriter the prompt
      for (let i = 1; i <= prompt.length; i++) {
        if (cancelled) return
        setTyped(prompt.slice(0, i))
        await sleep(step)
      }
      setPromptDone(true)
      await sleep(postPromptDelay)

      // Reveal lines one by one
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return
        await sleep(lines[i].delay ?? stagger)
        setVisibleLines(i + 1)
      }
    }
    play()
    return () => {
      cancelled = true
    }
  }, [inView, reduce, prompt, lines, cps, postPromptDelay, stagger])

  return (
    <div ref={ref} className={`terminal-wrap relative ${className}`}>
      <div className="terminal-glow" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="terminal-3d relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d0d10] shadow-2xl shadow-black/60 ring-1 ring-white/[0.04]"
      >
        {/* Chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#121216] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-4 font-mono text-[11px] text-[#6b6b75]">
            {header ?? (
              <>
                <span className="text-[#a1a1aa]">~/acme-backend</span>
                <span className="mx-2 text-[#3f3f46]">·</span>
                <span>opencode</span>
              </>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2 rounded-md border border-[#1f1f23] bg-black/40 px-2 py-1 text-[10px] font-mono text-[#a1a1aa]">
            <span className="pulse-dot relative h-1.5 w-1.5 rounded-full text-[#10b981]">
              <span className="absolute inset-0 rounded-full bg-[#10b981]" />
            </span>
            <span>{statusLabel}</span>
          </div>
        </div>

        {/* Body */}
        <div className="relative min-h-[380px] p-5 font-mono text-[12.5px] leading-[1.7]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(225,29,72,0.06),transparent_70%)]"
          />

          <div className="relative">
            {/* Prompt line */}
            <div className="flex items-start gap-3">
              <span className="shrink-0 select-none text-[#e11d48]">❯</span>
              <span className="text-[#d4d4d8]">
                {typed}
                {!promptDone && (
                  <span
                    className={`ml-0.5 inline-block h-[1em] w-[6px] translate-y-[2px] bg-[#e11d48] ${
                      cursorOn ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )}
              </span>
            </div>

            {/* Revealed lines */}
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={
                  i < visibleLines ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {line.node}
              </motion.div>
            ))}
          </div>
        </div>

        {footer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              visibleLines === lines.length && promptDone
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={{ duration: 0.4, delay: 0.2 }}
            className="border-t border-white/[0.04] bg-[#0a0a0d] px-5 py-3 font-mono text-[10.5px]"
          >
            {footer}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
