import { setRequestLocale, getTranslations } from "next-intl/server"
import { Check, PhoneCall, Truck, Activity } from "lucide-react"

import { PilotForm } from "@/components/forms/pilot-form"

type Props = { params: Promise<{ locale: string }> }

export default async function PilotPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Pilot")

  const steps = [
    {
      icon: PhoneCall,
      num: "01",
      title: t("step1Title"),
      body: t("step1Body"),
    },
    {
      icon: Truck,
      num: "02",
      title: t("step2Title"),
      body: t("step2Body"),
    },
    {
      icon: Activity,
      num: "03",
      title: t("step3Title"),
      body: t("step3Body"),
    },
  ]

  const includedItems = [
    t("incl1"),
    t("incl2"),
    t("incl3"),
    t("incl4"),
    t("incl5"),
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
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
              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.03em] md:text-5xl lg:text-[64px] lg:leading-[1.02]">
                {t("title")}
              </h1>
            </div>
            <p className="text-pretty text-[15px] leading-[1.7] text-muted-foreground md:text-[17px]">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="relative pb-28">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
            {/* Form plate */}
            <div className="relative border border-border-strong/70 bg-surface/30 px-7 py-10 md:px-10 md:py-12">
              {/* Corner ticks */}
              <span
                aria-hidden="true"
                className="absolute left-5 top-5 h-2 w-2 border-l border-t border-border-strong/80"
              />
              <span
                aria-hidden="true"
                className="absolute right-5 top-5 h-2 w-2 border-r border-t border-border-strong/80"
              />
              <span
                aria-hidden="true"
                className="absolute left-5 bottom-5 h-2 w-2 border-l border-b border-border-strong/80"
              />
              <span
                aria-hidden="true"
                className="absolute right-5 bottom-5 h-2 w-2 border-r border-b border-border-strong/80"
              />

              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                <span className="text-brand">A</span>
                <span className="h-px w-6 bg-brand/60" aria-hidden="true" />
                <span className="text-subtle">{t("formLabel")}</span>
              </div>

              <div className="mt-8">
                <PilotForm />
              </div>
            </div>

            {/* Sidebar — pipeline + included */}
            <aside className="flex flex-col gap-12">
              {/* What happens next — vertical pipeline */}
              <div>
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                  <span className="text-brand">B</span>
                  <span className="h-px w-6 bg-brand/60" aria-hidden="true" />
                  <span className="text-subtle">{t("whatNext")}</span>
                </div>

                <div className="relative mt-8">
                  {/* Vertical rail */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[19px] top-5 bottom-5 w-px"
                    style={{
                      background:
                        "linear-gradient(to bottom, color-mix(in oklab, var(--brand) 55%, transparent), color-mix(in oklab, var(--foreground) 12%, transparent) 50%, color-mix(in oklab, var(--brand) 55%, transparent))",
                    }}
                  />

                  <ol className="space-y-7">
                    {steps.map(({ icon: Icon, num, title, body }) => (
                      <li key={num} className="group relative flex items-start gap-5">
                        {/* Node */}
                        <span className="relative z-10 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong/70 bg-background text-brand transition-all duration-300 group-hover:border-brand/60">
                          <Icon className="h-4 w-4" strokeWidth={1.75} />
                          <span className="absolute inset-[3px] rounded-full border border-dashed border-brand/25 transition-all duration-300 group-hover:inset-[1px] group-hover:border-brand/70" />
                        </span>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[10.5px] tracking-[0.22em] text-brand">
                              {num}
                            </span>
                            <h4 className="text-[14.5px] font-semibold tracking-tight">
                              {title}
                            </h4>
                          </div>
                          <p className="mt-1.5 text-[13px] leading-[1.6] text-muted-foreground">
                            {body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* What's included — hairline ledger */}
              <div className="relative border border-border-strong/70 bg-surface/30 px-6 py-7">
                {/* Corner ticks */}
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-4 h-2 w-2 border-l border-t border-border-strong/80"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-4 bottom-4 h-2 w-2 border-r border-b border-border-strong/80"
                />

                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                  <span className="text-brand">C</span>
                  <span className="h-px w-6 bg-brand/60" aria-hidden="true" />
                  <span className="text-subtle">{t("included")}</span>
                </div>

                <ul className="mt-5 divide-y divide-border-strong/40 border-y border-border-strong/40">
                  {includedItems.map((line, i) => (
                    <li key={line} className="flex items-start gap-3 py-3">
                      <span className="mt-[3px] font-mono text-[10px] tracking-[0.2em] text-subtle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Check
                        className="mt-[3px] h-3.5 w-3.5 shrink-0 text-brand"
                        strokeWidth={2.5}
                      />
                      <span className="text-[13px] leading-[1.55] text-foreground/90">
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
