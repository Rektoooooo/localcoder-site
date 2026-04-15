"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { TrendingDown } from "lucide-react"

import { Slider } from "@/components/ui/slider"
import { TIERS, recommendTierForTeamSize, type Tier } from "@/lib/tiers"
import { cn } from "@/lib/utils"

const CURRENCY = "€"

// Assumption: average cloud coding AI seat cost per dev per month (EUR)
const CLOUD_SEAT_COSTS = [
  { id: "copilot", name: "Copilot Business", price: 18 },
  { id: "copilot-e", name: "Copilot Enterprise", price: 36 },
  { id: "cursor", name: "Cursor Pro", price: 19 },
  { id: "claude-max", name: "Claude Max", price: 90 },
] as const

export function ROICalculator() {
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

  // When team size changes, auto-recommend tier
  const handleTeamSize = (size: number) => {
    setTeamSize(size)
    setTierId(recommendTierForTeamSize(size).id)
  }

  const monthlyCloud = teamSize * seatCost.price
  const yearlyCloud = monthlyCloud * 12
  const threeYearCloud = yearlyCloud * 3
  // Assume 15% ongoing local maintenance of hardware price annually
  const yearlyLocalOpex = Math.round(tier.price * 0.15)
  const threeYearLocal = tier.price + yearlyLocalOpex * 3
  const threeYearSavings = Math.max(0, threeYearCloud - threeYearLocal)
  const paybackMonths =
    monthlyCloud > 0
      ? Math.ceil(tier.price / Math.max(1, monthlyCloud - yearlyLocalOpex / 12))
      : 0

  return (
    <div className="rounded-2xl border border-border/60 bg-surface/40 p-8 backdrop-blur md:p-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-brand">
            ROI calculator
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            See how fast it pays for itself.
          </h3>
        </div>
        <div className="hidden md:block">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-background/60 text-brand">
            <TrendingDown className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Inputs */}
        <div className="space-y-8">
          {/* Team size */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Team size</label>
              <span className="tabular-nums text-sm font-semibold text-foreground">
                {teamSize} devs
              </span>
            </div>
            <div className="mt-4">
              <Slider
                value={[teamSize]}
                min={1}
                max={50}
                step={1}
                onValueChange={(v) =>
                  handleTeamSize(Array.isArray(v) ? (v[0] ?? 1) : v)
                }
              />
              <div className="mt-2 flex justify-between font-mono text-[10px] text-subtle">
                <span>1</span>
                <span>50</span>
              </div>
            </div>
          </div>

          {/* Current cloud tool */}
          <div>
            <label className="text-sm font-medium">
              Current cloud AI tool
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              {CLOUD_SEAT_COSTS.map((tool) => (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => setSeatCostId(tool.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                    seatCostId === tool.id
                      ? "border-brand/60 bg-brand/10 text-foreground"
                      : "border-border bg-surface/40 text-muted-foreground hover:border-border-strong hover:text-foreground"
                  )}
                >
                  {tool.name}
                  <span className="ml-1.5 text-subtle">
                    {CURRENCY}
                    {tool.price}/mo
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tier */}
          <div>
            <label className="text-sm font-medium">LocalCoder tier</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {TIERS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTierId(t.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                    tierId === t.id
                      ? "border-brand/60 bg-brand/10 text-foreground"
                      : "border-border bg-surface/40 text-muted-foreground hover:border-border-strong hover:text-foreground"
                  )}
                >
                  {t.name}
                  <span className="ml-1.5 text-subtle">
                    {CURRENCY}
                    {(t.price / 1000).toFixed(1)}k
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="relative overflow-hidden rounded-xl border border-border/60 bg-background/40 p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(225,29,72,0.06),transparent_70%)]"
          />

          <div className="relative space-y-6">
            <StatRow
              label="Cloud AI (monthly)"
              value={formatMoney(monthlyCloud)}
              muted
            />
            <StatRow
              label="LocalCoder hardware"
              value={formatMoney(tier.price)}
              sub="one-time"
              muted
            />

            <div className="border-t border-border/60 pt-6">
              <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-subtle">
                Payback period
              </div>
              <motion.div
                key={paybackMonths}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-3 tabular-nums text-5xl font-semibold tracking-[-0.03em] md:text-6xl"
              >
                {paybackMonths}
                <span className="ml-2 text-2xl font-normal text-muted-foreground">
                  months
                </span>
              </motion.div>
            </div>

            <div className="rounded-lg border border-success/20 bg-success/5 p-4">
              <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-success">
                3-year savings
              </div>
              <motion.div
                key={threeYearSavings}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-2 tabular-nums text-3xl font-semibold tracking-tight text-foreground"
              >
                {formatMoney(threeYearSavings)}
              </motion.div>
              <p className="mt-1 text-xs text-muted-foreground">
                vs {formatMoney(threeYearCloud)} on cloud
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 font-mono text-[10.5px] text-subtle">
        Assumes 15% annual hardware opex (power, support, model updates). Does
        not factor the value of keeping your code on-prem.
      </p>
    </div>
  )
}

function StatRow({
  label,
  value,
  sub,
  muted,
}: {
  label: string
  value: string
  sub?: string
  muted?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        {sub && <div className="text-[11px] text-subtle">{sub}</div>}
      </div>
      <div
        className={cn(
          "tabular-nums text-lg font-semibold tracking-tight",
          muted ? "text-muted-foreground" : "text-foreground"
        )}
      >
        {value}
      </div>
    </div>
  )
}

function formatMoney(n: number): string {
  return `${CURRENCY}${Math.round(n).toLocaleString("en-US")}`
}
