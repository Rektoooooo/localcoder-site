"use client"

import * as React from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"

// Hero visual: the Mac mini as a premium 3D-feeling centerpiece.
// Everything lives in a `preserve-3d` scene that tilts with the cursor;
// layers are placed at different translateZ for real parallax depth.
export function HeroHardware() {
  const t = useTranslations("HeroHardware")
  const stageRef = React.useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, { amount: 0.25, once: true })

  // ─── Layout constants ───────────────────────────────────────────
  const VB_W = 720
  const VB_H = 640
  const CX = VB_W / 2
  const CY = VB_H / 2 + 20 // nudge slightly below center

  // Editor tiles arranged around an ellipse matching the stage aspect.
  // `rPctX/Y` are % of the stage (so they scale with any width).
  const rPctX = 38
  const rPctY = 40
  const clients = [
    { name: "VS Code", glyph: "❯", angle: 200 },
    { name: "Cursor", glyph: "✦", angle: 235 },
    { name: "Zed", glyph: "◈", angle: 270 },
    { name: "OpenCode", glyph: "◆", angle: 305 },
    { name: "JetBrains", glyph: "▣", angle: 340 },
    { name: "Aider", glyph: "●", angle: 20 },
  ].map((c, i) => {
    const rad = (c.angle * Math.PI) / 180
    const leftPct = 50 + Math.cos(rad) * rPctX
    const topPct = 50 + Math.sin(rad) * rPctY + (CY - VB_H / 2) / VB_H * 100
    // SVG-space coordinates for the connection line endpoint
    const sx = (leftPct / 100) * VB_W
    const sy = (topPct / 100) * VB_H
    return { ...c, leftPct, topPct, sx, sy, depth: 30 + (i % 3) * 12 }
  })

  // ─── Mouse-tracked tilt ─────────────────────────────────────────
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 110, damping: 18 })
  const smy = useSpring(my, { stiffness: 110, damping: 18 })
  const rotateX = useTransform(smy, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(smx, [-0.5, 0.5], [-12, 12])

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = stageRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function handleLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <div className="relative">
      {/* Top ribbon */}
      <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em]">
        <span className="flex items-center gap-2 text-brand">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand/70" />
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          {t("onPremRunning")}
        </span>
        <span className="text-subtle">{t("macMini")}</span>
      </div>

      {/* Perspective stage */}
      <div
        ref={stageRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative overflow-hidden rounded-xl border border-border-strong/70 bg-surface/40 p-4 backdrop-blur md:p-6"
        style={{ perspective: "1400px" }}
      >
        {/* Ambient brand glow (flat, behind everything) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 58%, color-mix(in oklab, var(--brand) 22%, transparent), transparent 62%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-40"
        />

        {/* 3D scene — everything inside preserves 3D so layers stack with real depth */}
        <motion.div
          className="relative aspect-[720/640] w-full"
          style={{
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
          }}
        >
          {/* Layer: dot grid, flat, behind everything */}
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
            style={{ transform: "translateZ(-90px)" }}
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="hw-dots"
                x="0"
                y="0"
                width="26"
                height="26"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill="var(--border-strong)" opacity="0.55" />
              </pattern>
            </defs>
            <rect x={0} y={0} width={VB_W} height={VB_H} fill="url(#hw-dots)" />
          </svg>

          {/* Layer: tilted orbit "stage disc" */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2"
            style={{
              width: `${rPctX * 2 + 8}%`,
              aspectRatio: "1 / 1",
              transform:
                "translate(-50%, -40%) translateZ(-40px) rotateX(70deg)",
            }}
          >
            <div
              className="absolute inset-0 rounded-full border border-dashed border-border-strong/70"
              style={{ opacity: 0.7 }}
            />
            <div
              className="absolute inset-[6%] rounded-full border border-dashed border-border-strong/50"
              style={{ opacity: 0.5 }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--brand) 20%, transparent), transparent 60%)",
              }}
            />
          </div>

          {/* Layer: connection lines + particles (slightly forward) */}
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
            style={{ transform: "translateZ(20px)" }}
            aria-label={t("ariaLabel")}
          >
            <defs>
              <radialGradient id="hw-particle" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--brand)" stopOpacity="1" />
                <stop offset="60%" stopColor="var(--brand)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {clients.map((c, i) => {
              const d = `M ${CX} ${CY} L ${c.sx} ${c.sy}`
              return (
                <motion.path
                  key={`line-${c.name}`}
                  d={d}
                  stroke="var(--border-strong)"
                  strokeWidth="1.25"
                  strokeDasharray="4 6"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 0.9 } : {}}
                  transition={{ duration: 0.9, delay: 0.8 + i * 0.08 }}
                />
              )
            })}

            {inView &&
              clients.map((c, i) => {
                const d = `M ${c.sx} ${c.sy} L ${CX} ${CY}`
                return (
                  <Packet
                    key={`pkt-${c.name}`}
                    path={d}
                    delay={1.6 + i * 0.32}
                    duration={2.6}
                  />
                )
              })}
          </svg>

          {/* Layer: Mac mini image — front-most */}
          <motion.div
            className="pointer-events-none absolute"
            style={{
              left: "50%",
              top: `${(CY / VB_H) * 100}%`,
              width: "40%",
              aspectRatio: "1280 / 800",
              transform: "translate(-50%, -50%) translateZ(80px)",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative h-full w-full"
              style={{
                filter:
                  "drop-shadow(0 24px 34px color-mix(in oklab, var(--brand) 30%, transparent)) drop-shadow(0 8px 16px rgba(0,0,0,0.22))",
              }}
            >
              <Image
                src="/mac-mini-m4.png"
                alt="Mac mini M4"
                fill
                priority
                sizes="(max-width: 1024px) 260px, 360px"
                className="object-contain"
              />
              {/* Pulsing power LED overlay */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[78%] flex h-2 w-2 -translate-x-1/2"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-success/70" />
                <span className="relative inline-block h-2 w-2 rounded-full bg-success" />
              </span>
            </div>
          </motion.div>

          {/* Layer: editor tiles (HTML, each at its own Z for parallax) */}
          {clients.map((c, i) => (
            <motion.div
              key={c.name}
              className="absolute"
              style={{
                left: `${c.leftPct}%`,
                top: `${c.topPct}%`,
                transform: `translate(-50%, -50%) translateZ(${c.depth}px)`,
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.7 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ClientTileHtml c={c} />
            </motion.div>
          ))}
        </motion.div>

        {/* Spec rail — flat, below the 3D stage, so it reads clearly */}
        <div className="relative mt-5 flex items-center justify-between border-t border-border-strong/50 pt-4 font-mono text-[11px] uppercase tracking-[0.2em]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-subtle">
              <span className="text-brand">◆</span>
              {t("device")}
              <span className="text-foreground/90">{t("deviceValue")}</span>
            </span>
            <span className="hidden items-center gap-2 text-subtle md:flex">
              <span className="text-brand">◆</span>
              {t("model")}
              <span className="text-foreground/90">{t("modelValue")}</span>
            </span>
          </div>
          <span className="text-brand">{t("localFull")}</span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────── sub-components ───────────────────────────

function ClientTileHtml({
  c,
}: {
  c: { name: string; glyph: string }
}) {
  const t = useTranslations("HeroHardware")
  return (
    <div
      className="flex items-center gap-2.5 rounded-lg border border-border-strong/70 bg-surface-elevated px-3 py-2 shadow-xl shadow-brand/10 backdrop-blur"
      style={{
        boxShadow:
          "0 10px 24px -8px color-mix(in oklab, var(--brand) 22%, transparent), 0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background font-mono text-[18px] leading-none text-brand">
        {c.glyph}
      </div>
      <div className="min-w-0 pr-1">
        <div className="text-[13px] font-semibold leading-tight tracking-tight text-foreground">
          {c.name}
        </div>
        <div className="mt-1 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-subtle">
          <span className="relative flex h-1 w-1">
            <span className="absolute inset-0 animate-ping rounded-full bg-success/80" />
            <span className="relative inline-block h-1 w-1 rounded-full bg-success" />
          </span>
          {t("online")}
        </div>
      </div>
    </div>
  )
}

function Packet({
  path,
  delay,
  duration,
}: {
  path: string
  delay: number
  duration: number
}) {
  const offsetPath = `path('${path}')`
  return (
    <>
      <motion.circle
        r={7}
        fill="url(#hw-particle)"
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ offsetDistance: "100%", opacity: [0, 0.38, 0] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatDelay: 0.9,
          ease: "linear",
        }}
        style={{ offsetPath }}
      />
      <motion.circle
        r={3}
        fill="url(#hw-particle)"
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatDelay: 0.9,
          ease: "linear",
        }}
        style={{ offsetPath }}
      />
    </>
  )
}
