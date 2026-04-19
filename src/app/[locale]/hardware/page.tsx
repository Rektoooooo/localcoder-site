import Link from "next/link"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { ArrowRight, Check, Minus } from "lucide-react"

import { SectionHeader } from "@/components/sections/section-header"
import { Button } from "@/components/ui/button"
import { TierSelector } from "@/components/interactive/tier-selector"
import { ROICalculator } from "@/components/interactive/roi-calculator"
import { TIERS } from "@/lib/tiers"
import { cn } from "@/lib/utils"

type Props = { params: Promise<{ locale: string }> }

export default async function HardwarePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Hardware")
  const tt = await getTranslations("Tiers")

  const included = [
    { title: t("included.item1Title"), body: t("included.item1Body") },
    { title: t("included.item2Title"), body: t("included.item2Body") },
    { title: t("included.item3Title"), body: t("included.item3Body") },
    { title: t("included.item4Title"), body: t("included.item4Body") },
  ]

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        {/* Tier selector slider */}
        <div className="mt-16">
          <TierSelector />
        </div>

        {/* Tier spec sheets */}
        <div className="mt-20 grid lg:grid-cols-2">
          {TIERS.map((tier, i) => {
            const does = [
              tt(`${tier.id}.does1`),
              tt(`${tier.id}.does2`),
              tt(`${tier.id}.does3`),
            ].filter(Boolean)
            const doesNot = [
              tt(`${tier.id}.doesNot1`),
              tt(`${tier.id}.doesNot2`),
            ].filter(Boolean)
            const tierName = tt(`${tier.id}.name`)
            return (
            <div
              key={tier.id}
              className={cn(
                "group relative -mb-px -mr-px flex h-full flex-col border border-border-strong/70 bg-background px-8 pb-10 pt-8 transition-colors hover:bg-surface/50 md:px-10 md:pb-12 md:pt-10",
                tier.featured && "bg-surface/60"
              )}
            >
              {/* Brand accent bar on the featured tier */}
              {tier.featured && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent"
                />
              )}

              {/* Corner ticks */}
              <span
                aria-hidden="true"
                className="absolute left-5 top-5 h-2 w-2 border-l border-t border-border-strong/80"
              />
              <span
                aria-hidden="true"
                className="absolute right-5 bottom-5 h-2 w-2 border-r border-b border-border-strong/80"
              />

              {/* Index row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                  <span className="text-brand">{`0${i + 1}`}</span>
                  <span className="h-px w-6 bg-border-strong/60" aria-hidden="true" />
                  <span className="text-subtle">{tierName}</span>
                </div>
                {tier.featured && (
                  <span className="inline-flex items-center gap-1.5 border border-brand/40 bg-brand/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                    <span className="relative flex h-1 w-1">
                      <span className="absolute inset-0 animate-ping rounded-full bg-brand/70" />
                      <span className="relative inline-block h-1 w-1 rounded-full bg-brand" />
                    </span>
                    {t("mostPopular")}
                  </span>
                )}
              </div>

              {/* Hardware title */}
              <h3 className="mt-7 text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[32px]">
                {tier.hardware}
              </h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                {tier.ram}
              </p>

              {/* Price */}
              <div className="mt-8 flex items-baseline gap-1.5 border-t border-border-strong/60 pt-6">
                <span className="tabular-nums text-brand text-[28px] font-semibold leading-none">
                  €
                </span>
                <span className="tabular-nums text-[56px] font-semibold leading-[0.88] tracking-[-0.035em] md:text-[64px]">
                  {tier.price.toLocaleString("en-US")}
                </span>
                <span className="ml-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-subtle">
                  {t("oneTime")}
                </span>
              </div>

              {/* Spec data sheet */}
              <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden border border-border-strong/60 bg-border-strong/40">
                <SpecCell label={t("specModel")} value={tier.model.split(" ").slice(0, 2).join(" ")} />
                <SpecCell label={t("specThroughput")} value={tier.tokensPerSec} />
                <SpecCell label={t("specTeam")} value={`${tier.devs.min}–${tier.devs.max}`} />
              </dl>

              {/* Handles well */}
              <div className="mt-8">
                <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em]">
                  <span className="text-brand">+</span>
                  <span className="text-subtle">{t("handlesWell")}</span>
                  <span className="h-px flex-1 bg-border-strong/50" aria-hidden="true" />
                </div>
                <ul className="mt-4 divide-y divide-border-strong/40 border-y border-border-strong/40">
                  {does.map((line) => (
                    <li key={line} className="flex items-start gap-3 py-3">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" strokeWidth={2.5} />
                      <span className="text-[14px] leading-[1.5] text-foreground/90">
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trade-offs */}
              <div className="mt-6">
                <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em]">
                  <span className="text-subtle">−</span>
                  <span className="text-subtle">{t("tradeOffs")}</span>
                  <span className="h-px flex-1 bg-border-strong/50" aria-hidden="true" />
                </div>
                <ul className="mt-4 divide-y divide-border-strong/40 border-y border-border-strong/40">
                  {doesNot.map((line) => (
                    <li key={line} className="flex items-start gap-3 py-3">
                      <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-subtle" strokeWidth={2.5} />
                      <span className="text-[14px] leading-[1.5] text-muted-foreground">
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )})}
        </div>

        {/* ROI calculator */}
        <div className="mt-24">
          <ROICalculator />
        </div>

        {/* What's included */}
        <div className="mt-24">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
            <span className="h-px w-10 bg-brand" aria-hidden="true" />
            {t("included.title")}
          </div>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4">
            {included.map((item, i) => (
              <div
                key={item.title}
                className="relative -mb-px -mr-px border border-border-strong/70 bg-background px-7 py-8"
              >
                <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.22em]">
                  <span className="text-brand">{`0${i + 1}`}</span>
                  <span className="h-px flex-1 mx-3 bg-border-strong/50" aria-hidden="true" />
                  <span className="text-subtle">{t("included.mark")}</span>
                </div>
                <h4 className="mt-5 text-[16px] font-semibold tracking-tight">
                  {item.title}
                </h4>
                <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Button
            size="lg"
            className="h-12 gap-2 px-7"
            nativeButton={false}
            render={<Link href={`/${locale}/pilot`} />}
          >
            {t("requestPilot")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background px-4 py-3">
      <dt className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-subtle">
        {label}
      </dt>
      <dd className="mt-1 text-[13px] font-semibold tracking-tight text-foreground">
        {value}
      </dd>
    </div>
  )
}
