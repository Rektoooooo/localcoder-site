import { useTranslations } from "next-intl"
import { Database, Search, Sparkles, Terminal } from "lucide-react"

import { SectionHeader } from "@/components/sections/section-header"

export function HowItWorks() {
  const t = useTranslations("HowItWorks")

  const steps = [
    {
      icon: Database,
      num: "01",
      title: t("step1Title"),
      body: t("step1Body"),
    },
    { icon: Search, num: "02", title: t("step2Title"), body: t("step2Body") },
    {
      icon: Sparkles,
      num: "03",
      title: t("step3Title"),
      body: t("step3Body"),
    },
    {
      icon: Terminal,
      num: "04",
      title: t("step4Title"),
      body: t("step4Body"),
    },
  ]

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, num, title, body }) => (
            <div
              key={num}
              className="group relative flex flex-col gap-6 bg-background p-8 transition-colors hover:bg-surface/60"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-surface/60 text-brand">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className="font-mono text-[11px] font-medium text-subtle">
                  {num}
                </span>
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
