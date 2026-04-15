"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check, Users } from "lucide-react"

import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { TIERS, recommendTierForTeamSize } from "@/lib/tiers"
import { cn } from "@/lib/utils"

export function TierSelector() {
  const [size, setSize] = React.useState(10)
  const recommended = recommendTierForTeamSize(size)

  return (
    <div className="rounded-2xl border border-border/60 bg-surface/40 p-8 backdrop-blur md:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-brand">
            Find your fit
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            How many developers?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Drag the slider to see which tier fits your team.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 px-5 py-3">
          <Users className="h-4 w-4 text-brand" />
          <span className="tabular-nums text-3xl font-semibold tracking-tight">
            {size}
          </span>
          <span className="text-xs text-subtle">devs</span>
        </div>
      </div>

      <div className="mt-8">
        <Slider
          value={[size]}
          min={1}
          max={50}
          step={1}
          onValueChange={(v) =>
            setSize(Array.isArray(v) ? (v[0] ?? 1) : v)
          }
        />
        <div className="mt-2 flex justify-between font-mono text-[10px] text-subtle">
          <span>1</span>
          <span>10</span>
          <span>20</span>
          <span>30</span>
          <span>40</span>
          <span>50</span>
        </div>
      </div>

      <div className="mt-10 grid gap-3 md:grid-cols-5">
        {TIERS.map((tier) => {
          const isReco = tier.id === recommended.id
          return (
            <Card
              key={tier.id}
              className={cn(
                "relative overflow-hidden border-border/60 bg-surface/60 p-4 transition-all",
                isReco &&
                  "border-brand/60 bg-surface ring-1 ring-brand/30 shadow-lg shadow-brand/10"
              )}
            >
              {isReco && (
                <motion.div
                  layoutId="reco-glow"
                  className="pointer-events-none absolute inset-0 rounded-[inherit]"
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  style={{
                    background:
                      "radial-gradient(ellipse at top, rgba(225,29,72,0.15), transparent 70%)",
                  }}
                />
              )}
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-subtle">
                    {tier.name}
                  </span>
                  {isReco && (
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[8px] text-brand-foreground"
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </motion.span>
                  )}
                </div>
                <div className="mt-3 text-[13px] font-semibold tracking-tight">
                  {tier.hardware.replace("Mac ", "")}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {tier.ram}
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-[10px] text-subtle">€</span>
                  <span className="tabular-nums text-base font-semibold">
                    {(tier.price / 1000).toFixed(1)}k
                  </span>
                </div>
                <div className="mt-2 font-mono text-[10px] text-subtle">
                  {tier.devs.min}–{tier.devs.max} devs
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 rounded-xl border border-brand/20 bg-brand/5 p-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-brand-foreground">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </div>
          <div>
            <div className="text-sm">
              <span className="font-semibold">Recommended:</span>{" "}
              <span className="font-semibold text-brand">
                {recommended.name}
              </span>
              <span className="text-muted-foreground">
                {" "}
                · {recommended.hardware} · {recommended.model}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {recommended.tokensPerSec} · fits {recommended.devs.min}–
              {recommended.devs.max} developers comfortably.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
