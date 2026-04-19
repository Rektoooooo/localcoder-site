"use client"

import { useTranslations } from "next-intl"

import { BENCHMARKS } from "@/lib/benchmarks"
import { Reveal, RevealStagger, RevealItem } from "@/components/interactive/reveal"
import { CountUp } from "@/components/interactive/count-up"

export function Benchmarks() {
  const t = useTranslations("Benchmarks")

  const stats = [
    {
      value: BENCHMARKS.speedup,
      decimals: 1,
      prefix: "",
      valueUnit: "×",
      label: t("stat1Label"),
      note: t("stat1Note"),
    },
    {
      value: BENCHMARKS.contextReduction,
      decimals: 1,
      prefix: "",
      valueUnit: "×",
      label: t("stat2Label"),
      note: t("stat2Note"),
    },
    {
      value: 65,
      decimals: 0,
      prefix: "−",
      valueUnit: "%",
      label: t("stat3Label"),
      note: t("stat3Note"),
    },
  ]

  return (
    <section className="relative py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Editorial header — same language as Problem / HowItWorks */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-16">
          <Reveal>
            <div>
              <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-brand">
                <span className="h-px w-10 bg-brand" aria-hidden="true" />
                {t("eyebrow")}
              </div>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.028em] md:text-5xl lg:text-[56px] lg:leading-[1.02]">
                {t("title")}
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <p className="text-pretty text-[15px] leading-[1.7] text-muted-foreground md:text-[17px]">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        {/* Instrument-style stat row — no card chrome, vertical rules between */}
        <RevealStagger className="relative mt-20 grid border-y border-border-strong/70 md:mt-24 md:grid-cols-3">
          {stats.map((stat, i) => (
            <RevealItem
              key={stat.label}
              className="group relative flex flex-col gap-5 px-7 py-14 md:py-16 lg:px-10"
            >
              {/* vertical divider (except first) */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-10 left-0 hidden w-px bg-border-strong/50 md:block"
                />
              )}
              {/* corner ticks — technical framing */}
              <span
                aria-hidden="true"
                className="absolute left-6 top-6 h-2 w-2 border-l border-t border-border-strong/80"
              />
              <span
                aria-hidden="true"
                className="absolute right-6 bottom-6 h-2 w-2 border-r border-b border-border-strong/80"
              />

              {/* Label row */}
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                <span className="text-brand">{`0${i + 1}`}</span>
                <span className="h-px w-6 bg-border-strong/60" aria-hidden="true" />
                <span className="text-subtle">{stat.label}</span>
              </div>

              {/* Big numeric readout — counts up when scrolled into view */}
              <div className="flex items-baseline gap-1.5">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  decimals={stat.decimals}
                  className="tabular-nums text-[76px] font-semibold leading-[0.88] tracking-[-0.045em] md:text-[92px] lg:text-[108px]"
                />
                <span className="tabular-nums text-[40px] font-semibold leading-none tracking-[-0.03em] text-brand md:text-[52px]">
                  {stat.valueUnit}
                </span>
              </div>

              {/* Axis rule fading out */}
              <div
                aria-hidden="true"
                className="h-px w-full"
                style={{
                  background:
                    "linear-gradient(to right, color-mix(in oklab, var(--brand) 70%, transparent), color-mix(in oklab, var(--foreground) 10%, transparent) 40%, transparent)",
                }}
              />

              <p className="text-[13.5px] leading-[1.6] text-muted-foreground">
                {stat.note}
              </p>
            </RevealItem>
          ))}
        </RevealStagger>

        {/* Technical byline — specimen-sheet style */}
        <Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-subtle">
            <span className="text-brand">{t("measuredOn")}</span>
            <span>{BENCHMARKS.hardware}</span>
            <span className="text-border-strong" aria-hidden="true">
              ·
            </span>
            <span>{BENCHMARKS.model}</span>
            <span className="text-border-strong" aria-hidden="true">
              ·
            </span>
            <span>{BENCHMARKS.repos.join(" / ")}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
