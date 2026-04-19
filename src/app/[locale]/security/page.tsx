import Link from "next/link"
import { setRequestLocale, getTranslations } from "next-intl/server"
import {
  ArrowRight,
  Check,
  FileLock,
  Lock,
  Minus,
  Network,
  Scale,
  Shield,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"

type Props = { params: Promise<{ locale: string }> }

export default async function SecurityPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Security")

  const pillars = [
    { icon: Network,     name: t("pillars.p1Name"), spec: t("pillars.p1Spec"), body: t("pillars.p1Body") },
    { icon: Lock,        name: t("pillars.p2Name"), spec: t("pillars.p2Spec"), body: t("pillars.p2Body") },
    { icon: Shield,      name: t("pillars.p3Name"), spec: t("pillars.p3Spec"), body: t("pillars.p3Body") },
    { icon: Scale,       name: t("pillars.p4Name"), spec: t("pillars.p4Spec"), body: t("pillars.p4Body") },
    { icon: FileLock,    name: t("pillars.p5Name"), spec: t("pillars.p5Spec"), body: t("pillars.p5Body") },
    { icon: ShieldCheck, name: t("pillars.p6Name"), spec: t("pillars.p6Spec"), body: t("pillars.p6Body") },
  ]

  const protects = [
    t("threat.protects1"),
    t("threat.protects2"),
    t("threat.protects3"),
    t("threat.protects4"),
    t("threat.protects5"),
  ]

  const doesNot = [
    t("threat.yours1"),
    t("threat.yours2"),
    t("threat.yours3"),
    t("threat.yours4"),
    t("threat.yours5"),
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-aurora" />
          <div className="hero-dots" />
          <div className="hero-rulers" />
          <div className="hero-corners" />
        </div>
        <div className="absolute inset-0 bg-noise" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
                <span className="h-px w-10 bg-brand" aria-hidden="true" />
                {t("heroEyebrow")}
              </div>
              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.03em] md:text-5xl lg:text-[68px] lg:leading-[1.0]">
                {t("title")}
              </h1>
            </div>
            <p className="text-pretty text-[15px] leading-[1.7] text-muted-foreground md:text-[17px]">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative py-24 md:py-32">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
                <span className="h-px w-10 bg-brand" aria-hidden="true" />
                {t("pillars.eyebrow")}
              </div>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.028em] md:text-5xl lg:text-[56px] lg:leading-[1.02]">
                {t("pillars.title")}
              </h2>
            </div>
            <p className="text-pretty text-[15px] leading-[1.7] text-muted-foreground md:text-[17px]">
              {t("pillars.body")}
            </p>
          </div>

          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.name}
                className="group relative -mb-px -mr-px flex flex-col border border-border-strong/70 bg-background px-7 pb-8 pt-7 transition-colors hover:bg-surface/50"
              >
                {/* Top status bar */}
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
                  <span className="flex items-center gap-1.5 text-success">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-success/70" />
                      <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-success" />
                    </span>
                    {t("pillars.enforced")}
                  </span>
                  <span className="flex items-center gap-2 text-subtle">
                    <span className="text-brand">{t("pillars.pLabel")}</span>
                    <span>0{i + 1}</span>
                  </span>
                </div>

                {/* Icon + name */}
                <div className="mt-8 flex items-start gap-4">
                  <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface/70 text-brand transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand/50 group-hover:bg-brand/[0.06]">
                    <pillar.icon className="h-5 w-5" strokeWidth={1.75} />
                    <span
                      aria-hidden="true"
                      className="absolute -right-px -top-px h-1.5 w-1.5 border-r border-t border-brand/60"
                    />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-[18px] font-semibold leading-tight tracking-tight">
                      {pillar.name}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                      {pillar.spec}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-[13px] leading-[1.6] text-muted-foreground">
                  {pillar.body}
                </p>

                <div
                  aria-hidden="true"
                  className="mt-auto pt-6"
                />
                <div
                  aria-hidden="true"
                  className="h-px w-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 15%, transparent) 0 4px, transparent 4px 9px)",
                  }}
                />
                <div className="mt-3 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.2em] text-subtle">
                  <span>{t("pillars.verifiable")}</span>
                  <span className="text-brand/70">↗</span>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-brand to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat model — diptych */}
      <section className="relative py-24 md:py-32">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
                <span className="h-px w-10 bg-brand" aria-hidden="true" />
                {t("threat.eyebrow")}
              </div>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.028em] md:text-5xl lg:text-[56px] lg:leading-[1.02]">
                {t("threat.title")}
              </h2>
            </div>
            <p className="text-pretty text-[15px] leading-[1.7] text-muted-foreground md:text-[17px]">
              {t("threat.body")}
            </p>
          </div>

          {/* Diptych */}
          <div className="mt-20 grid overflow-hidden border border-border-strong/70 md:grid-cols-2">
            {/* Protected */}
            <div className="relative flex h-full flex-col bg-surface/40 px-8 py-12 md:px-12 md:py-14">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-brand to-transparent"
              />
              <span
                aria-hidden="true"
                className="absolute left-5 top-5 h-2 w-2 border-l border-t border-border-strong/80"
              />
              <span
                aria-hidden="true"
                className="absolute right-5 bottom-5 h-2 w-2 border-r border-b border-border-strong/80"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                  <span className="text-brand">A</span>
                  <span className="h-px w-6 bg-brand/60" aria-hidden="true" />
                  <span className="text-subtle">{t("threat.protectedLabel")}</span>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/40 bg-brand/[0.06] text-brand">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </div>

              <h3 className="mt-10 text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] md:text-[32px]">
                {t("threat.protectedTitle")}
              </h3>

              <ul className="mt-8 flex-1 divide-y divide-border-strong/40 border-t border-border-strong/40">
                {protects.map((line, i) => (
                  <li key={line} className="flex items-start gap-5 py-4">
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

            {/* Not protected */}
            <div className="relative flex h-full flex-col border-t border-border-strong/60 bg-background px-8 py-12 md:border-l md:border-t-0 md:px-12 md:py-14">
              <span
                aria-hidden="true"
                className="absolute left-5 top-5 h-2 w-2 border-l border-t border-border-strong/80"
              />
              <span
                aria-hidden="true"
                className="absolute right-5 bottom-5 h-2 w-2 border-r border-b border-border-strong/80"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                  <span className="text-subtle">B</span>
                  <span className="h-px w-6 bg-border-strong/70" aria-hidden="true" />
                  <span className="text-subtle">{t("threat.yourJobLabel")}</span>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong/80 bg-muted/40 text-subtle">
                  <Minus className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </div>

              <h3 className="mt-10 text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] text-foreground/80 md:text-[32px]">
                {t("threat.yourJobTitle")}
              </h3>

              <ul className="mt-8 flex-1 divide-y divide-border-strong/40 border-t border-border-strong/40">
                {doesNot.map((line, i) => (
                  <li key={line} className="flex items-start gap-5 py-4">
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
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative pb-28 pt-12">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden border border-border-strong/70 bg-surface/30 px-8 py-12 md:px-14 md:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 55% 100% at 92% 50%, color-mix(in oklab, var(--brand) 16%, transparent), transparent 62%)",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute left-5 top-5 h-2 w-2 border-l border-t border-border-strong"
            />
            <span
              aria-hidden="true"
              className="absolute right-5 top-5 h-2 w-2 border-r border-t border-border-strong"
            />
            <span
              aria-hidden="true"
              className="absolute left-5 bottom-5 h-2 w-2 border-l border-b border-border-strong"
            />
            <span
              aria-hidden="true"
              className="absolute right-5 bottom-5 h-2 w-2 border-r border-b border-border-strong"
            />

            <div className="relative grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-end md:gap-16">
              <div>
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
                  <span className="h-px w-10 bg-brand" aria-hidden="true" />
                  {t("cta.eyebrow")}
                </div>
                <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.025em] md:text-[40px] md:leading-[1.05]">
                  {t("cta.title")}
                </h2>
                <p className="mt-5 max-w-xl text-pretty text-[15px] leading-[1.65] text-muted-foreground md:text-[16px]">
                  {t("cta.body")}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  size="lg"
                  className="group h-14 w-full gap-2.5 text-[15px] shadow-lg shadow-brand/20"
                  nativeButton={false}
                  render={<Link href={`/${locale}/pilot`} />}
                >
                  {t("cta.button")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
                <p className="flex items-center justify-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-subtle">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-success/70" />
                    <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  {t("cta.dpa")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
