import { useTranslations } from "next-intl"
import { Database, Search, Sparkles, Terminal } from "lucide-react"

import { Reveal, RevealStagger, RevealItem } from "@/components/interactive/reveal"

export function HowItWorks() {
  const t = useTranslations("HowItWorks")

  const steps = [
    { icon: Database, num: "01", title: t("step1Title"), body: t("step1Body") },
    { icon: Search, num: "02", title: t("step2Title"), body: t("step2Body") },
    { icon: Sparkles, num: "03", title: t("step3Title"), body: t("step3Body") },
    { icon: Terminal, num: "04", title: t("step4Title"), body: t("step4Body") },
  ]

  const total = String(steps.length).padStart(2, "0")

  return (
    <section className="relative py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Editorial header — matches Problem section */}
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

        {/* Pipeline — dashed connector with four nodes */}
        <div className="relative mt-20 md:mt-24">
          {/* Dashed connector (desktop only, passes behind the nodes) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[6%] right-[6%] top-[34px] hidden lg:block"
            style={{
              height: "1px",
              backgroundImage:
                "repeating-linear-gradient(to right, var(--border-strong) 0 6px, transparent 6px 14px)",
            }}
          />
          {/* Brand accent layered over the connector */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[34px] hidden h-px w-[38%] -translate-x-1/2 lg:block"
            style={{
              background:
                "linear-gradient(to right, transparent, color-mix(in oklab, var(--brand) 55%, transparent), transparent)",
            }}
          />

          <RevealStagger className="relative grid gap-14 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:grid-cols-4 lg:gap-x-10">
            {steps.map(({ icon: Icon, num, title, body }) => (
              <RevealItem key={num} className="group relative">
                {/* Node — sits on the connector line (h/2 = 34px) */}
                <div className="relative inline-flex h-[68px] w-[68px] items-center justify-center rounded-full border border-border bg-background">
                  <span className="absolute inset-[5px] rounded-full border border-dashed border-brand/35 transition-all duration-300 group-hover:inset-[3px] group-hover:border-brand/80" />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle, color-mix(in oklab, var(--brand) 18%, transparent), transparent 70%)",
                    }}
                  />
                  <Icon className="relative h-5 w-5 text-brand" strokeWidth={1.75} />
                </div>

                {/* Index row */}
                <div className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                  <span className="text-brand">{num}</span>
                  <span className="h-px flex-1 bg-border-strong/60" aria-hidden="true" />
                  <span className="text-subtle">{total}</span>
                </div>

                <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.015em] md:text-[22px]">
                  {title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-muted-foreground">
                  {body}
                </p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  )
}
