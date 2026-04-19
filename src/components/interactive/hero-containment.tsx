"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { useTranslations } from "next-intl"

// Hero visual: "Your code never leaves the building."
// A containment-field diagram showing a developer and a local LLM
// exchanging packets inside a dashed boundary, while an attempted
// connection to a cloud provider above is visibly blocked at the edge.
export function HeroContainment() {
  const t = useTranslations("HeroContainment")
  const ref = React.useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { amount: 0.3, once: true })

  return (
    <div className="relative">
      {/* Top ribbon */}
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
        <span className="flex items-center gap-2 text-brand">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand/70" />
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          {t("liveOnPrem")}
        </span>
        <span className="text-subtle">{t("containmentField")}</span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border-strong/70 bg-surface/40 p-5 backdrop-blur md:p-7">
        {/* Ambient brand glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 85%, color-mix(in oklab, var(--brand) 12%, transparent), transparent 62%)",
          }}
        />

        <svg
          ref={ref}
          viewBox="0 0 720 560"
          className="relative h-auto w-full"
          aria-label={t("ariaLabel")}
        >
          <defs>
            <radialGradient id="req-particle" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--brand)" stopOpacity="1" />
              <stop offset="60%" stopColor="var(--brand)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="res-particle" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="60%" stopColor="#10b981" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
            <pattern
              id="hero-bg-dots"
              x="0"
              y="0"
              width="22"
              height="22"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.9" fill="var(--border-strong)" opacity="0.6" />
            </pattern>
            <linearGradient id="building-gradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          {/* ───────── Above the building: the cloud we do NOT talk to ───────── */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.85 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CloudShape cx={360} cy={72} />
            <text
              x={360}
              y={118}
              textAnchor="middle"
              className="fill-[color:var(--subtle)]"
              style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2 }}
            >
              {t("cloudOffLimits")}
            </text>
          </motion.g>

          {/* Dashed attempt line from developer → cloud, blocked at boundary */}
          <motion.path
            d="M 150 300 L 150 170"
            stroke="var(--subtle)"
            strokeWidth="1"
            strokeDasharray="3 4"
            fill="none"
            opacity={0.45}
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          />

          {/* ───────── Building boundary + its background grid ───────── */}
          <motion.rect
            x={20}
            y={170}
            width={680}
            height={330}
            rx={18}
            fill="url(#hero-bg-dots)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.rect
            x={20}
            y={170}
            width={680}
            height={330}
            rx={18}
            fill="none"
            stroke="url(#building-gradient)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.75 } : {}}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />

          {/* Building label chip — sits on the top edge of the boundary */}
          <g>
            <rect x={36} y={158} width={148} height={22} fill="var(--background)" />
            <text
              x={50}
              y={173}
              className="fill-[color:var(--brand)]"
              style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2 }}
            >
              {t("yourBuilding")}
            </text>
          </g>

          {/* Corner ticks on the boundary */}
          {inView && <CornerTicks />}

          {/* Pulsing X exactly where the attempt crosses the boundary */}
          <motion.g
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.4 }}
            style={{ transformOrigin: "150px 170px" }}
          >
            <circle cx={150} cy={170} r={11} fill="var(--background)" stroke="var(--brand)" strokeWidth="1.5" />
            <line x1={144} y1={164} x2={156} y2={176} stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1={156} y1={164} x2={144} y2={176} stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" />
            <motion.circle
              cx={150}
              cy={170}
              r={11}
              fill="none"
              stroke="var(--brand)"
              strokeWidth="1"
              animate={inView ? { r: [11, 28], opacity: [0.8, 0] } : {}}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 1.6 }}
            />
          </motion.g>
          <motion.text
            x={170}
            y={152}
            className="fill-[color:var(--brand)]"
            style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1.6 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.7 }}
          >
            {t("blocked")}
          </motion.text>

          {/* ───────── Nodes inside the building ───────── */}
          <NodeBox inView={inView} x={150} y={340} label={t("developer")} sub={t("developerSub")} code="N01" delay={0.5} />
          <NodeBox inView={inView} x={570} y={340} label={t("localLlm")} sub={t("localLlmSub")} code="N02" delay={0.7} />

          {/* Two-lane flow between them */}
          <motion.path
            d="M 222 324 L 498 324"
            stroke="var(--border-strong)"
            strokeWidth="1"
            strokeDasharray="3 4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
          />
          <motion.path
            d="M 498 358 L 222 358"
            stroke="var(--border-strong)"
            strokeWidth="1"
            strokeDasharray="3 4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
          />

          {/* Edge labels sitting on the lanes */}
          {inView && (
            <>
              <EdgeLabel x={360} y={316} text={t("prompt")} />
              <EdgeLabel x={360} y={366} text={t("tokens")} />
            </>
          )}

          {/* Continuous particles — outbound red prompts, inbound green responses */}
          {inView && (
            <>
              <Packet path="M 222 324 L 498 324" delay={1.4} gradient="req-particle" glow halo />
              <Packet path="M 222 324 L 498 324" delay={3.2} gradient="req-particle" glow />
              <Packet path="M 222 324 L 498 324" delay={5.0} gradient="req-particle" glow />
              <Packet path="M 498 358 L 222 358" delay={2.2} gradient="res-particle" glow />
              <Packet path="M 498 358 L 222 358" delay={4.0} gradient="res-particle" glow />
              <Packet path="M 498 358 L 222 358" delay={5.8} gradient="res-particle" glow />
            </>
          )}

          {/* ───────── Rail at the bottom of the building: activity counters ───────── */}
          <g>
            <line
              x1={36}
              y1={460}
              x2={684}
              y2={460}
              stroke="var(--border-strong)"
              strokeWidth="0.75"
              strokeDasharray="2 4"
              opacity="0.7"
            />
            <text
              x={42}
              y={484}
              className="fill-[color:var(--subtle)]"
              style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1.6 }}
            >
              {t("traffic")}
            </text>
            <text
              x={140}
              y={484}
              className="fill-[color:var(--foreground)]"
              style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1.6, opacity: 0.85 }}
            >
              {t("loopClosed")}
            </text>
            <text
              x={350}
              y={484}
              className="fill-[color:var(--subtle)]"
              style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1.6 }}
            >
              {t("egress")}
            </text>
            <text
              x={446}
              y={484}
              className="fill-[color:var(--brand)]"
              style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1.6 }}
            >
              {t("egressBlocked")}
            </text>
            <text
              x={602}
              y={484}
              className="fill-[color:var(--subtle)]"
              style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1.6, textAnchor: "end" }}
              textAnchor="end"
            >
              {t("localFull")}
            </text>
            <text
              x={678}
              y={484}
              className="fill-[color:#10b981]"
              style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1.6 }}
              textAnchor="end"
            />
          </g>
        </svg>

        {/* Bottom legend */}
        <div className="relative mt-4 flex flex-wrap items-center justify-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {t("legendPrompt")}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {t("legendResponse")}
          </span>
          <span className="flex items-center gap-2">
            <span className="text-brand">✕</span>
            {t("legendEgress")}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────── helpers ───────────────────────────

function CornerTicks() {
  const pts: Array<[number, number, number, number]> = [
    [20, 170, 1, 1],
    [700, 170, -1, 1],
    [20, 500, 1, -1],
    [700, 500, -1, -1],
  ]
  return (
    <g>
      {pts.map(([x, y, dx, dy], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={x + dx * 10} y2={y} stroke="var(--brand)" strokeWidth="1.25" strokeOpacity="0.75" />
          <line x1={x} y1={y} x2={x} y2={y + dy * 10} stroke="var(--brand)" strokeWidth="1.25" strokeOpacity="0.75" />
        </g>
      ))}
    </g>
  )
}

function CloudShape({ cx, cy }: { cx: number; cy: number }) {
  // Cloud outline drawn from a small path, dashed stroke.
  const d = `M ${cx - 58} ${cy + 14}
             q -4 -22 20 -24
             q 6 -16 26 -12
             q 10 -18 32 -8
             q 16 -10 28 4
             q 26 -2 24 22
             q 14 6 6 20
             q -6 8 -20 6
             l -110 0
             q -16 2 -22 -6
             q -8 -12 16 -2 z`
  return (
    <g>
      <path d={d} fill="none" stroke="var(--border-strong)" strokeWidth="1.25" strokeDasharray="4 4" />
      {/* Big X over the cloud */}
      <line x1={cx - 14} y1={cy - 4} x2={cx + 14} y2={cy + 14} stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={cx + 14} y1={cy - 4} x2={cx - 14} y2={cy + 14} stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  )
}

function NodeBox({
  inView,
  x,
  y,
  label,
  sub,
  code,
  delay,
}: {
  inView: boolean
  x: number
  y: number
  label: string
  sub: string
  code: string
  delay: number
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 6 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Port dots on left/right edges */}
      <circle cx={x - 72} cy={y} r="2.25" fill="var(--border-strong)" />
      <circle cx={x + 72} cy={y} r="2.25" fill="var(--border-strong)" />

      {/* Outer brand glow ring */}
      <rect
        x={x - 74}
        y={y - 50}
        width={148}
        height={100}
        rx={14}
        fill="none"
        stroke="var(--brand)"
        strokeOpacity="0.08"
        strokeWidth="6"
      />

      {/* Body */}
      <rect
        x={x - 72}
        y={y - 48}
        width={144}
        height={96}
        rx={12}
        fill="var(--surface-elevated)"
        stroke="var(--border-strong)"
        strokeWidth="1.25"
      />

      {/* Mono code top-left */}
      <text
        x={x - 60}
        y={y - 26}
        className="fill-[color:var(--subtle)]"
        style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 1.4 }}
      >
        {code}
      </text>

      {/* Pulsing status dot top-right */}
      <motion.circle
        cx={x + 60}
        cy={y - 29}
        r="2.4"
        fill="#10b981"
        animate={inView ? { opacity: [0.4, 1, 0.4] } : {}}
        transition={{ duration: 2.2, delay, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Label */}
      <text
        x={x}
        y={y + 2}
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, letterSpacing: -0.2 }}
      >
        {label}
      </text>
      <text
        x={x}
        y={y + 22}
        textAnchor="middle"
        className="fill-[color:var(--muted-foreground)]"
        style={{ fontFamily: "var(--font-mono)", fontSize: 10 }}
      >
        {sub}
      </text>
    </motion.g>
  )
}

function EdgeLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-26} y={-7} width={52} height={13} rx={2} fill="var(--surface-elevated)" stroke="var(--border-strong)" strokeWidth="0.75" />
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
  const offsetPath = `path('${path}')`
  return (
    <>
      {halo && (
        <motion.circle
          r={7}
          fill={`url(#${gradient})`}
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ offsetDistance: "100%", opacity: [0, 0.35, 0.35, 0] }}
          transition={{
            duration: 2.6,
            delay,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: "linear",
          }}
          style={{ offsetPath }}
        />
      )}
      <motion.circle
        r={glow ? 2.8 : 2}
        fill={`url(#${gradient})`}
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2.6,
          delay,
          repeat: Infinity,
          repeatDelay: 1.2,
          ease: "linear",
        }}
        style={{ offsetPath }}
      />
    </>
  )
}
