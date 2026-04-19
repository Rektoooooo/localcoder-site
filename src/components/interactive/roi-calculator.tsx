"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

import { Slider } from "@/components/ui/slider"
import { TIERS, recommendTierForTeamSize, type Tier } from "@/lib/tiers"
import { cn } from "@/lib/utils"

const CURRENCY = "€"

const CLOUD_SEAT_COSTS = [
  { id: "copilot", name: "Copilot Business", price: 18 },
  { id: "copilot-e", name: "Copilot Enterprise", price: 36 },
  { id: "cursor", name: "Cursor Pro", price: 19 },
  { id: "claude-max", name: "Claude Max", price: 90 },
] as const

export function ROICalculator() {
  const t = useTranslations("RoiCalculator")
  const tt = useTranslations("Tiers")
  const [teamSize, setTeamSize] = React.useState(12)
  const [seatCostId, setSeatCostId] = React.useState<
    (typeof CLOUD_SEAT_COSTS)[number]["id"]
  >("copilot-e")
  const [tierId, setTierId] = React.useState<Tier["id"]>(() =>
    recommendTierForTeamSize(12).id
  )

  const seatCost =
    CLOUD_SEAT_COSTS.find((s) => s.id === seatCostId) ?? CLOUD_SEAT_COSTS[1]
  const tier = TIERS.find((t) => t.id === tierId) ?? TIERS[1]

  const handleTeamSize = (size: number) => {
    setTeamSize(size)
    setTierId(recommendTierForTeamSize(size).id)
  }

  const monthlyCloud = teamSize * seatCost.price
  const yearlyCloud = monthlyCloud * 12
  const threeYearCloud = yearlyCloud * 3
  const yearlyLocalOpex = Math.round(tier.price * 0.15)
  const threeYearLocal = tier.price + yearlyLocalOpex * 3
  const threeYearSavings = Math.max(0, threeYearCloud - threeYearLocal)
  const paybackMonths =
    monthlyCloud > 0
      ? Math.ceil(tier.price / Math.max(1, monthlyCloud - yearlyLocalOpex / 12))
      : 0

  return (
    <div className="relative overflow-hidden border border-border-strong/70 bg-surface/30 px-8 py-12 md:px-12 md:py-14">
      {/* Corner ticks */}
      <span
        aria-hidden="true"
        className="absolute left-5 top-5 h-2 w-2 border-l border-t border-border-strong/80"
      />
      <span
        aria-hidden="true"
        className="absolute right-5 top-5 h-2 w-2 border-r border-t border-border-strong/80"
      />
      <span
        aria-hidden="true"
        className="absolute left-5 bottom-5 h-2 w-2 border-l border-b border-border-strong/80"
      />
      <span
        aria-hidden="true"
        className="absolute right-5 bottom-5 h-2 w-2 border-r border-b border-border-strong/80"
      />

      {/* Editorial header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
            <span className="h-px w-10 bg-brand" aria-hidden="true" />
            {t("eyebrow")}
          </div>
          <h3 className="mt-6 text-balance text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[40px]">
            {t("title")}
          </h3>
        </div>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        {/* Inputs */}
        <div className="space-y-10">
          {/* Team size */}
          <div>
            <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.22em]">
              <span className="text-subtle">{t("teamSize")}</span>
              <span className="flex items-baseline gap-1 text-foreground">
                <span className="tabular-nums text-[22px] font-semibold leading-none tracking-[-0.01em]">
                  {teamSize}
                </span>
                <span className="text-subtle">{t("devs")}</span>
              </span>
            </div>
            <div className="mt-6">
              <Slider
                value={[teamSize]}
                min={1}
                max={50}
                step={1}
                onValueChange={(v) =>
                  handleTeamSize(Array.isArray(v) ? (v[0] ?? 1) : v)
                }
              />
              <div className="mt-3 flex justify-between font-mono text-[9.5px] uppercase tracking-[0.2em] text-subtle">
                <span>01</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
                <span>50</span>
              </div>
            </div>
          </div>

          {/* Current cloud tool */}
          <div>
            <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em]">
              <span className="text-brand">A</span>
              <span className="text-subtle">{t("currentCloudTool")}</span>
              <span className="h-px flex-1 bg-border-strong/50" aria-hidden="true" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {CLOUD_SEAT_COSTS.map((tool) => {
                const active = seatCostId === tool.id
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => setSeatCostId(tool.id)}
                    className={cn(
                      "group inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-all",
                      active
                        ? "border-brand/60 bg-brand/[0.06] text-foreground"
                        : "border-border-strong/70 bg-surface/40 text-muted-foreground hover:border-brand/40 hover:text-foreground"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-1 w-1 rounded-full transition-colors",
                        active ? "bg-brand" : "bg-border-strong"
                      )}
                    />
                    {tool.name}
                    <span className="text-subtle">
                      {CURRENCY}
                      {tool.price}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tier */}
          <div>
            <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em]">
              <span className="text-brand">B</span>
              <span className="text-subtle">{t("localTier")}</span>
              <span className="h-px flex-1 bg-border-strong/50" aria-hidden="true" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {TIERS.map((tr) => {
                const active = tierId === tr.id
                return (
                  <button
                    key={tr.id}
                    type="button"
                    onClick={() => setTierId(tr.id)}
                    className={cn(
                      "group inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-all",
                      active
                        ? "border-brand/60 bg-brand/[0.06] text-foreground"
                        : "border-border-strong/70 bg-surface/40 text-muted-foreground hover:border-brand/40 hover:text-foreground"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-1 w-1 rounded-full transition-colors",
                        active ? "bg-brand" : "bg-border-strong"
                      )}
                    />
                    {tt(`${tr.id}.name`)}
                    <span className="text-subtle">
                      {CURRENCY}
                      {(tr.price / 1000).toFixed(1)}k
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Results — instrument panel */}
        <div className="relative overflow-hidden border border-border-strong/60 bg-background/60 p-8">
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 90% at 90% 10%, color-mix(in oklab, var(--brand) 10%, transparent), transparent 62%)",
            }}
          />

          <div className="relative">
            {/* Top two cost rows */}
            <dl className="space-y-4">
              <StatRow
                label={t("cloudAi")}
                sub={t("perMonth")}
                value={formatMoney(monthlyCloud)}
              />
              <StatRow
                label={t("localCoder")}
                sub={t("oneTimeHardware")}
                value={formatMoney(tier.price)}
              />
            </dl>

            {/* Payback readout */}
            <div className="mt-8 border-t border-border-strong/60 pt-8">
              <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em]">
                <span className="text-brand">↘</span>
                <span className="text-subtle">{t("paybackPeriod")}</span>
                <span className="h-px flex-1 bg-border-strong/50" aria-hidden="true" />
              </div>
              <motion.div
                key={paybackMonths}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-5 flex items-baseline gap-2"
              >
                <span className="tabular-nums text-[68px] font-semibold leading-[0.9] tracking-[-0.04em] md:text-[80px]">
                  {paybackMonths}
                </span>
                <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-brand">
                  {t("months")}
                </span>
              </motion.div>
              <div
                aria-hidden="true"
                className="mt-4 h-px w-full"
                style={{
                  background:
                    "linear-gradient(to right, color-mix(in oklab, var(--brand) 70%, transparent), color-mix(in oklab, var(--foreground) 10%, transparent) 50%, transparent)",
                }}
              />
            </div>

            {/* 3-year savings */}
            <div className="mt-8 border border-brand/30 bg-brand/[0.04] p-5">
              <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-brand/70" />
                  <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                </span>
                {t("threeYearSavings")}
              </div>
              <motion.div
                key={threeYearSavings}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-3 tabular-nums text-[34px] font-semibold leading-none tracking-[-0.025em] text-foreground"
              >
                {formatMoney(threeYearSavings)}
              </motion.div>
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-subtle">
                {t("vsOnCloud", { amount: formatMoney(threeYearCloud) })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
        {t("disclaimer")}
      </p>
    </div>
  )
}

function StatRow({
  label,
  sub,
  value,
}: {
  label: string
  sub?: string
  value: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border-strong/40 pb-4 last:border-b-0 last:pb-0">
      <div>
        <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-subtle">
          {label}
        </div>
        {sub && (
          <div className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-subtle/80">
            {sub}
          </div>
        )}
      </div>
      <div className="tabular-nums text-[22px] font-semibold leading-none tracking-[-0.015em] text-foreground">
        {value}
      </div>
    </div>
  )
}

function formatMoney(n: number): string {
  return `${CURRENCY}${Math.round(n).toLocaleString("en-US")}`
}
