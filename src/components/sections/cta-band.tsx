import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/interactive/reveal"

export function CtaBand() {
  const t = useTranslations("CtaBand")
  const locale = useLocale()

  const terms = [
    { label: t("termDurationLabel"), value: t("termDurationValue") },
    { label: t("termShipLabel"), value: t("termShipValue") },
    { label: t("termCostLabel"), value: t("termCostValue") },
  ]

  return (
    <section className="relative py-24 md:py-32">
      <Reveal className="relative mx-auto max-w-6xl px-6">
        {/* Band — no rounded card, hairline frame, atmospheric brand glow */}
        <div className="relative overflow-hidden border border-border-strong/70 bg-surface/30 px-8 py-14 md:px-14 md:py-20">
          {/* Radial brand glow, weighted to the right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 80% at 92% 50%, color-mix(in oklab, var(--brand) 16%, transparent), transparent 62%), radial-gradient(ellipse 40% 70% at 5% 20%, color-mix(in oklab, var(--brand) 6%, transparent), transparent 60%)",
            }}
          />
          {/* Dashed rulers along top and bottom */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-8 right-8 top-6 h-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 22%, transparent) 0 6px, transparent 6px 14px)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-8 right-8 bottom-6 h-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 22%, transparent) 0 6px, transparent 6px 14px)",
            }}
          />
          {/* Corner brackets */}
          <span
            aria-hidden="true"
            className="absolute left-5 top-5 h-3 w-3 border-l border-t border-border-strong"
          />
          <span
            aria-hidden="true"
            className="absolute right-5 top-5 h-3 w-3 border-r border-t border-border-strong"
          />
          <span
            aria-hidden="true"
            className="absolute left-5 bottom-5 h-3 w-3 border-l border-b border-border-strong"
          />
          <span
            aria-hidden="true"
            className="absolute right-5 bottom-5 h-3 w-3 border-r border-b border-border-strong"
          />

          <div className="relative grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-20">
            {/* Left — statement */}
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
                <span className="h-px w-10 bg-brand" aria-hidden="true" />
                {t("eyebrow")}
              </div>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.03em] md:text-5xl lg:text-[60px] lg:leading-[1.0]">
                {t("title")}
              </h2>
              <p className="mt-7 max-w-xl text-pretty text-[15px] leading-[1.7] text-muted-foreground md:text-[17px]">
                {t("subtitle")}
              </p>
            </div>

            {/* Right — terms + CTA */}
            <div className="flex flex-col gap-8">
              <dl className="grid grid-cols-3 gap-6 border-y border-border-strong/60 py-5">
                {terms.map((term) => (
                  <div key={term.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                      {term.label}
                    </dt>
                    <dd className="mt-1.5 text-[17px] font-semibold tracking-[-0.01em] text-foreground">
                      {term.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <Button
                size="lg"
                className="group h-14 w-full gap-2.5 text-[15px] shadow-lg shadow-brand/20"
                nativeButton={false}
                render={<Link href={`/${locale}/pilot`} />}
              >
                {t("cta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>

              <p className="flex items-center justify-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-subtle">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-70" />
                  <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                {t("reply")}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
