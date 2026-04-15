import { useTranslations } from "next-intl"

import { SectionHeader } from "@/components/sections/section-header"
import { BENCHMARKS } from "@/lib/benchmarks"
import { Reveal, RevealStagger, RevealItem } from "@/components/interactive/reveal"

export function Benchmarks() {
  const t = useTranslations("Benchmarks")

  const stats = [
    {
      value: `${BENCHMARKS.speedup}×`,
      label: t("stat1Label"),
      note: t("stat1Note"),
    },
    {
      value: `${BENCHMARKS.contextReduction}×`,
      label: t("stat2Label"),
      note: t("stat2Note"),
    },
    {
      value: "−65%",
      label: t("stat3Label"),
      note: t("stat3Note"),
    },
  ]

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        </Reveal>

        <RevealStagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 md:grid-cols-3">
          {stats.map((stat) => (
            <RevealItem
              key={stat.label}
              className="flex flex-col gap-3 bg-background px-8 py-12 text-center"
            >
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">
                {stat.label}
              </span>
              <span className="tabular-nums text-6xl font-semibold tracking-[-0.04em] text-foreground md:text-7xl">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.note}</span>
            </RevealItem>
          ))}
        </RevealStagger>

        <p className="mt-6 text-center font-mono text-[11px] text-subtle">
          {BENCHMARKS.hardware} · {BENCHMARKS.model} ·{" "}
          {BENCHMARKS.repos.join(", ")}
        </p>
      </div>
    </section>
  )
}
