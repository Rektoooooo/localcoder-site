import { useTranslations } from "next-intl"
import { Check, Minus } from "lucide-react"

import { Reveal, RevealStagger, RevealItem } from "@/components/interactive/reveal"

export function HonestPositioning() {
  const t = useTranslations("HonestPositioning")

  const dos = [t("do1"), t("do2"), t("do3"), t("do4")]
  const donts = [t("dont1"), t("dont2"), t("dont3"), t("dont4")]

  return (
    <section className="relative py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Editorial header */}
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

        {/* Diptych — two ledger columns sharing a single hairline frame */}
        <RevealStagger className="relative mt-20 grid overflow-hidden border border-border-strong/70 md:mt-24 md:grid-cols-2">
          {/* LOCAL — the opinionated, brand-lit side */}
          <RevealItem>
            <div className="group relative flex h-full flex-col bg-surface/40 px-8 py-12 md:px-12 md:py-14">
              {/* Brand accent rail on the left edge */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-brand to-transparent"
              />
              {/* Corner ticks */}
              <span
                aria-hidden="true"
                className="absolute left-5 top-5 h-2 w-2 border-l border-t border-border-strong/80"
              />
              <span
                aria-hidden="true"
                className="absolute right-5 bottom-5 h-2 w-2 border-r border-b border-border-strong/80"
              />

              {/* Column header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                  <span className="text-brand">A</span>
                  <span className="h-px w-6 bg-brand/60" aria-hidden="true" />
                  <span className="text-subtle">Local</span>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/40 bg-brand/[0.06] text-brand">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </div>

              <h3 className="mt-10 text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] md:text-[32px]">
                {t("doTitle")}
              </h3>

              <ul className="mt-8 flex-1 divide-y divide-border-strong/40 border-t border-border-strong/40">
                {dos.map((line, i) => (
                  <li
                    key={line}
                    className="group/row flex items-start gap-5 py-4 transition-colors"
                  >
                    <span className="mt-[3px] font-mono text-[10.5px] tracking-[0.22em] text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] leading-[1.55] text-foreground/90">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>

          {/* CLOUD — muted counter-column */}
          <RevealItem>
            <div className="group relative flex h-full flex-col border-t border-border-strong/60 bg-background px-8 py-12 md:border-l md:border-t-0 md:px-12 md:py-14">
              {/* Corner ticks */}
              <span
                aria-hidden="true"
                className="absolute left-5 top-5 h-2 w-2 border-l border-t border-border-strong/80"
              />
              <span
                aria-hidden="true"
                className="absolute right-5 bottom-5 h-2 w-2 border-r border-b border-border-strong/80"
              />

              {/* Column header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                  <span className="text-subtle">B</span>
                  <span className="h-px w-6 bg-border-strong/70" aria-hidden="true" />
                  <span className="text-subtle">Cloud</span>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong/80 bg-muted/40 text-subtle">
                  <Minus className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </div>

              <h3 className="mt-10 text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] text-foreground/80 md:text-[32px]">
                {t("dontTitle")}
              </h3>

              <ul className="mt-8 flex-1 divide-y divide-border-strong/40 border-t border-border-strong/40">
                {donts.map((line, i) => (
                  <li
                    key={line}
                    className="flex items-start gap-5 py-4"
                  >
                    <span className="mt-[3px] font-mono text-[10.5px] tracking-[0.22em] text-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] leading-[1.55] text-muted-foreground">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  )
}
