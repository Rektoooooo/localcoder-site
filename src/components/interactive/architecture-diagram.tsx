"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"

export function ArchitectureDiagram() {
  const ref = React.useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  const nodes = [
    { id: "dev", x: 90, y: 180, label: "Developer", sub: "OpenCode / IDE" },
    { id: "api", x: 320, y: 180, label: "API gateway", sub: "auth · RAG · logs" },
    {
      id: "vec",
      x: 560,
      y: 80,
      label: "Vector index",
      sub: "Qdrant · AST chunks",
    },
    {
      id: "llm",
      x: 560,
      y: 280,
      label: "Local LLM",
      sub: "Ollama + MLX",
    },
  ] as const

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface/40 p-6 backdrop-blur md:p-10">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,72,0.08),transparent_60%)]"
      />

      {/* Boundary labels */}
      <div className="relative mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
        <span>Your network</span>
        <span className="text-brand">● On-prem</span>
      </div>

      <svg
        ref={ref}
        viewBox="0 0 720 400"
        className="relative h-auto w-full"
        aria-label="LocalCoder architecture"
      >
        {/* Dashed boundary box */}
        <motion.rect
          x="20"
          y="20"
          width="680"
          height="360"
          rx="18"
          fill="none"
          stroke="url(#boundary-gradient)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />

        {/* Connecting paths */}
        <motion.path
          d="M 150 180 L 280 180"
          stroke="url(#line-gradient)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
        />
        <motion.path
          d="M 360 160 Q 460 100 520 95"
          stroke="url(#line-gradient)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeInOut" }}
        />
        <motion.path
          d="M 360 200 Q 460 260 520 290"
          stroke="url(#line-gradient)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeInOut" }}
        />

        {/* Animated particles along the main path */}
        {inView && (
          <>
            <motion.circle
              r="3"
              fill="#e11d48"
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.8,
                delay: 1.4,
                repeat: Infinity,
                repeatDelay: 1.6,
                ease: "linear",
              }}
              style={{
                offsetPath: "path('M 150 180 L 280 180 L 520 95')",
              }}
            />
            <motion.circle
              r="3"
              fill="#10b981"
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.8,
                delay: 2.4,
                repeat: Infinity,
                repeatDelay: 1.6,
                ease: "linear",
              }}
              style={{
                offsetPath: "path('M 520 290 L 280 180 L 150 180')",
              }}
            />
          </>
        )}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.2 + i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <rect
              x={node.x - 60}
              y={node.y - 36}
              width="120"
              height="72"
              rx="12"
              fill="#111113"
              stroke="#2a2a2f"
              strokeWidth="1.5"
            />
            <text
              x={node.x}
              y={node.y - 6}
              textAnchor="middle"
              className="fill-foreground text-[13px] font-semibold"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {node.label}
            </text>
            <text
              x={node.x}
              y={node.y + 14}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {node.sub}
            </text>
          </motion.g>
        ))}

        <defs>
          <linearGradient id="line-gradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#e11d48" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="boundary-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#e11d48" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#e11d48" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Legend */}
      <div className="relative mt-4 flex flex-wrap items-center justify-center gap-6 font-mono text-[10px] text-subtle">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand" />
          Request
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success" />
          Response
        </span>
        <span className="flex items-center gap-2">
          <span className="h-px w-6 border-t border-dashed border-muted-foreground/50" />
          Air-gapped boundary
        </span>
      </div>
    </div>
  )
}
