"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { useTranslations } from "next-intl"

type Node = {
  id: string
  x: number
  y: number
  label: string
  sub: string
  code: string
}

// Paths, defined once so animated particles can share them.
const PATHS = {
  devToApi: "M 180 200 L 290 200",
  apiToVec: "M 430 180 C 500 150, 540 120, 540 110",
  apiToLlm: "M 430 220 C 500 250, 540 280, 540 290",
} as const

// Reversed paths for response particles — simple string reversal of the same
// curves expressed tail-first, so the motion feels like a round trip.
const PATHS_BACK = {
  devFromApi: "M 290 200 L 180 200",
  vecToApi: "M 540 110 C 540 120, 500 150, 430 180",
  llmToApi: "M 540 290 C 540 280, 500 250, 430 220",
} as const

export function ArchitectureDiagram() {
  const t = useTranslations("ArchitectureDiagram")
  const ref = React.useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  const NODES: readonly Node[] = [
    { id: "dev", x: 110, y: 200, label: t("developer"),    sub: t("developerSub"),   code: "N01" },
    { id: "api", x: 360, y: 200, label: t("apiGateway"),   sub: t("apiGatewaySub"),  code: "N02" },
    { id: "vec", x: 600, y: 100, label: t("vectorIndex"),  sub: t("vectorIndexSub"), code: "N03" },
    { id: "llm", x: 600, y: 300, label: t("localLlm"),     sub: t("localLlmSub"),    code: "N04" },
  ] as const

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-strong/70 bg-surface/40 p-6 backdrop-blur md:p-10">
      {/* Ambient brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 80% at 60% 50%, color-mix(in oklab, var(--brand) 10%, transparent), transparent 62%)",
        }}
      />

      {/* Top boundary labels */}
      <div className="relative mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-border-strong" aria-hidden="true" />
          {t("yourNetwork")}
        </span>
        <span className="flex items-center gap-2 text-brand">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand/70" />
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          {t("onPremActive")}
        </span>
      </div>

      <svg
        ref={ref}
        viewBox="0 0 720 400"
        className="relative h-auto w-full"
        aria-label={t("ariaLabel")}
      >
        <defs>
          {/* Request (outbound) — brand red with fade-in */}
          <linearGradient id="req-gradient" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--brand)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </linearGradient>
          {/* Boundary frame gradient */}
          <linearGradient id="boundary-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.08" />
          </linearGradient>
          {/* Soft dot grid inside boundary */}
          <pattern id="arch-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill="var(--border-strong)" opacity="0.55" />
          </pattern>
          {/* Glow for particle bullets */}
          <radialGradient id="req-particle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="1" />
            <stop offset="60%" stopColor="var(--brand)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="res-particle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="60%" stopColor="#10b981" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background dot grid, clipped to boundary */}
        <motion.rect
          x="20"
          y="20"
          width="680"
          height="360"
          rx="18"
          fill="url(#arch-dots)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Boundary frame — dashed, animated draw */}
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
          animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />

        {/* Coordinate tick marks on boundary corners */}
        {inView && <CornerTicks />}

        {/* Edge labels (placed before paths so paths render on top visually via order) */}
        {inView && (
          <g className="font-mono" style={{ fontFamily: "var(--font-mono)" }}>
            <EdgeLabel x={235} y={194} text={t("prompt")} />
            <EdgeLabel x={510} y={150} text={t("chunks")} rotate={-28} />
            <EdgeLabel x={510} y={258} text={t("tokens")} rotate={28} />
          </g>
        )}

        {/* Connecting paths */}
        <motion.path
          d={PATHS.devToApi}
          stroke="var(--border-strong)"
          strokeWidth="1"
          strokeDasharray="3 4"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.9 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeInOut" }}
        />
        <motion.path
          d={PATHS.apiToVec}
          stroke="var(--border-strong)"
          strokeWidth="1"
          strokeDasharray="3 4"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.9 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeInOut" }}
        />
        <motion.path
          d={PATHS.apiToLlm}
          stroke="var(--border-strong)"
          strokeWidth="1"
          strokeDasharray="3 4"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.9 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeInOut" }}
        />

        {/* Particles — staggered outbound (red) and inbound (green) */}
        {inView && (
          <>
            {/* Request: dev → api → vec */}
            <Packet path={`${PATHS.devToApi.slice(2)} ${PATHS.apiToVec.slice(2)}`} delay={1.2} gradient="req-particle" glow halo />
            <Packet path={`${PATHS.devToApi.slice(2)} ${PATHS.apiToVec.slice(2)}`} delay={3.4} gradient="req-particle" glow />
            {/* Request: dev → api → llm */}
            <Packet path={`${PATHS.devToApi.slice(2)} ${PATHS.apiToLlm.slice(2)}`} delay={2.2} gradient="req-particle" glow />

            {/* Response: llm → api → dev */}
            <Packet path={`${PATHS_BACK.llmToApi.slice(2)} ${PATHS_BACK.devFromApi.slice(2)}`} delay={2.8} gradient="res-particle" glow />
            {/* Response: vec → api → dev */}
            <Packet path={`${PATHS_BACK.vecToApi.slice(2)} ${PATHS_BACK.devFromApi.slice(2)}`} delay={1.8} gradient="res-particle" glow />
            <Packet path={`${PATHS_BACK.vecToApi.slice(2)} ${PATHS_BACK.devFromApi.slice(2)}`} delay={4.0} gradient="res-particle" glow />
          </>
        )}

        {/* Nodes */}
        {NODES.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Port dots on left/right edges */}
            <circle cx={node.x - 70} cy={node.y} r="2.25" fill="var(--border-strong)" />
            <circle cx={node.x + 70} cy={node.y} r="2.25" fill="var(--border-strong)" />

            {/* Outer glow ring (subtle) */}
            <rect
              x={node.x - 72}
              y={node.y - 44}
              width="144"
              height="88"
              rx="14"
              fill="none"
              stroke="var(--brand)"
              strokeOpacity="0.08"
              strokeWidth="6"
            />

            {/* Node body */}
            <rect
              x={node.x - 70}
              y={node.y - 42}
              width="140"
              height="84"
              rx="12"
              fill="var(--surface-elevated)"
              stroke="var(--border-strong)"
              strokeWidth="1.25"
            />

            {/* Node chrome row — mono ID + status dot */}
            <text
              x={node.x - 58}
              y={node.y - 22}
              className="fill-[color:var(--subtle)]"
              style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 1.4 }}
            >
              {node.code}
            </text>
            <motion.circle
              cx={node.x + 58}
              cy={node.y - 25}
              r="2.2"
              fill="#10b981"
              animate={inView ? { opacity: [0.4, 1, 0.4] } : {}}
              transition={{ duration: 2.2, delay: 0.8 + i * 0.15, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Label */}
            <text
              x={node.x}
              y={node.y + 2}
              textAnchor="middle"
              className="fill-foreground"
              style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, letterSpacing: -0.2 }}
            >
              {node.label}
            </text>
            <text
              x={node.x}
              y={node.y + 22}
              textAnchor="middle"
              className="fill-[color:var(--muted-foreground)]"
              style={{ fontFamily: "var(--font-mono)", fontSize: 10 }}
            >
              {node.sub}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* Legend */}
      <div className="relative mt-4 flex flex-wrap items-center justify-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {t("legendRequest")}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          {t("legendResponse")}
        </span>
        <span className="flex items-center gap-2">
          <span
            className="h-px w-6"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, var(--border-strong) 0 3px, transparent 3px 7px)",
            }}
          />
          {t("legendBoundary")}
        </span>
      </div>
    </div>
  )
}

function CornerTicks() {
  const pts: Array<[number, number, number, number]> = [
    [20, 20, 1, 1],
    [700, 20, -1, 1],
    [20, 380, 1, -1],
    [700, 380, -1, -1],
  ]
  return (
    <g>
      {pts.map(([x, y, dx, dy], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={x + dx * 10} y2={y} stroke="var(--brand)" strokeWidth="1.25" strokeOpacity="0.7" />
          <line x1={x} y1={y} x2={x} y2={y + dy * 10} stroke="var(--brand)" strokeWidth="1.25" strokeOpacity="0.7" />
        </g>
      ))}
    </g>
  )
}

function EdgeLabel({ x, y, text, rotate = 0 }: { x: number; y: number; text: string; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <rect x={-22} y={-7} width={44} height={13} rx={2} fill="var(--surface-elevated)" stroke="var(--border-strong)" strokeWidth="0.75" />
      <text
        x={0}
        y={2}
        textAnchor="middle"
        className="fill-[color:var(--subtle)]"
        style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 1.2 }}
      >
        {text}
      </text>
    </g>
  )
}

// A single glowing packet that continuously traverses a compound path.
function Packet({
  path,
  delay,
  gradient,
  glow,
  halo,
}: {
  path: string
  delay: number
  gradient: string
  glow?: boolean
  halo?: boolean
}) {
  const offsetPath = `path('M ${path}')`
  return (
    <>
      {halo && (
        <motion.circle
          r="7"
          fill={`url(#${gradient})`}
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ offsetDistance: "100%", opacity: [0, 0.35, 0.35, 0] }}
          transition={{
            duration: 3.2,
            delay,
            repeat: Infinity,
            repeatDelay: 1.6,
            ease: "linear",
          }}
          style={{ offsetPath }}
        />
      )}
      <motion.circle
        r={glow ? 2.6 : 2}
        fill={`url(#${gradient})`}
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 3.2,
          delay,
          repeat: Infinity,
          repeatDelay: 1.6,
          ease: "linear",
        }}
        style={{ offsetPath }}
      />
    </>
  )
}
