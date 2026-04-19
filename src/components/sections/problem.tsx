import { useTranslations } from "next-intl"
import { Lock, Scale, TrendingDown } from "lucide-react"

import { Reveal, RevealStagger, RevealItem } from "@/components/interactive/reveal"

export function Problem() {
  const t = useTranslations("Problem")

  const entries = [
    { icon: Lock, title: t("card1Title"), body: t("card1Body") },
    { icon: Scale, title: t("card2Title"), body: t("card2Body") },
    { icon: TrendingDown, title: t("card3Title"), body: t("card3Body") },
  ]

  return (
    <section className="relative py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Editorial header — left aligned, eyebrow rule + oversized headline */}
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

        {/* Ledger entries — thin rule, monospaced index, large title, no card chrome */}
        <RevealStagger className="mt-20 grid gap-x-10 gap-y-14 md:grid-cols-3 md:mt-24">
          {entries.map(({ icon: Icon, title, body }, i) => (
            <RevealItem key={title}>
              <div className="group relative">
                <div className="flex items-center justify-between border-t border-border-strong/80 pt-6 transition-colors group-hover:border-brand/60">
                  <span className="font-mono text-[11px] tracking-[0.22em] text-subtle">
                    {String(i + 1).padStart(2, "0")}
                    <span className="mx-1.5 text-border-strong">/</span>
                    {String(entries.length).padStart(2, "0")}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface/70 text-brand transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand/50 group-hover:bg-brand/[0.06]">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="mt-7 text-[22px] font-semibold leading-[1.2] tracking-[-0.015em] md:text-[24px]">
                  {title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.65] text-muted-foreground">
                  {body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
