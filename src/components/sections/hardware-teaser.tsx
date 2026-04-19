import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TIERS } from "@/lib/tiers"
import { cn } from "@/lib/utils"
import { Reveal, RevealStagger, RevealItem } from "@/components/interactive/reveal"

export function HardwareTeaser() {
  const t = useTranslations("HardwareTeaser")
  const tt = useTranslations("Tiers")
  const locale = useLocale()
  const featured = [TIERS[0], TIERS[1], TIERS[2]]

  return (
    <section className="relative py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Editorial header — matches Problem / HowItWorks / Benchmarks */}
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

        {/* Spec sheets — no rounded cards, hairline ledger plates */}
        <RevealStagger className="mt-20 grid gap-px overflow-hidden border border-border-strong/70 bg-border-strong/40 md:mt-24 md:grid-cols-3">
          {featured.map((tier, i) => (
            <RevealItem key={tier.id}>
              <div
                className={cn(
                  "group relative flex h-full flex-col bg-background px-8 py-10 transition-colors hover:bg-surface/50",
                  tier.featured && "bg-surface/70"
                )}
              >
                {/* Brand accent bar on the featured tier */}
                {tier.featured && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent"
                  />
                )}

                {/* Corner ticks — technical framing */}
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-5 h-2 w-2 border-l border-t border-border-strong/80"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-5 bottom-5 h-2 w-2 border-r border-b border-border-strong/80"
                />

                {/* Index + name row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                    <span className="text-brand">{`0${i + 1}`}</span>
                    <span className="text-subtle">{tt(`${tier.id}.name`)}</span>
                  </div>
                  {tier.featured && (
                    <span className="inline-flex items-center gap-1.5 border border-brand/40 bg-brand/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                      <span className="h-1 w-1 rounded-full bg-brand" aria-hidden="true" />
                      {t("popular")}
                    </span>
                  )}
                </div>

                {/* Hardware title */}
                <h3 className="mt-6 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[26px]">
                  {tier.hardware}
                </h3>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                  {tier.ram}
                </p>

                {/* Price — oversized tabular with Euro as the accent */}
                <div className="mt-8 flex items-baseline gap-1.5 border-t border-border-strong/60 pt-6">
                  <span className="tabular-nums text-brand text-[32px] font-semibold leading-none">
                    €
                  </span>
                  <span className="tabular-nums text-[52px] font-semibold leading-[0.9] tracking-[-0.035em] md:text-[60px]">
                    {tier.price.toLocaleString("en-US")}
                  </span>
                </div>
                <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-subtle">
                  {t("startingAt")} · {tier.devs.min}–{tier.devs.max} {t("devs")}
                </p>

                {/* Spec strip */}
                <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border-strong/60 pt-5 font-mono text-[10.5px] uppercase tracking-[0.14em]">
                  <div>
                    <dt className="text-subtle">{t("model")}</dt>
                    <dd className="mt-1 text-foreground/85 normal-case tracking-normal">
                      {tier.model}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-subtle">{t("throughput")}</dt>
                    <dd className="mt-1 text-foreground/85 normal-case tracking-normal">
                      {tier.tokensPerSec}
                    </dd>
                  </div>
                </dl>

                {/* Capability list */}
                <ul className="mt-6 flex-1 space-y-3 border-t border-border-strong/60 pt-6 text-[13.5px] leading-[1.55]">
                  {[
                    tt(`${tier.id}.does1`),
                    tt(`${tier.id}.does2`),
                    tt(`${tier.id}.does3`),
                  ].filter(Boolean).map((line) => (
                    <li key={line} className="flex items-start gap-2.5 text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" strokeWidth={2.5} />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-12 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            nativeButton={false}
            render={<Link href={`/${locale}/hardware`} />}
          >
            {t("seeAll")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
