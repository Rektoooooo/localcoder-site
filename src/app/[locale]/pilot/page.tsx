import { setRequestLocale, getTranslations } from "next-intl/server"
import { Check } from "lucide-react"

import { SectionHeader } from "@/components/sections/section-header"
import { PilotForm } from "@/components/forms/pilot-form"
import { Card } from "@/components/ui/card"

type Props = { params: Promise<{ locale: string }> }

export default async function PilotPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Pilot")

  const steps = [
    {
      num: "01",
      title: "Discovery call",
      body: "45-minute video call. We learn about your stack, team, and security constraints.",
    },
    {
      num: "02",
      title: "We deliver the hardware",
      body: "Pre-configured Mac Mini or Studio shipped with OpenCode, RAG pipeline, and your repos indexed.",
    },
    {
      num: "03",
      title: "Two-week measured pilot",
      body: "Your devs use it daily. We instrument it and report usage, latency, and cost savings weekly.",
    },
  ]

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Card className="border-border/60 bg-surface/40 p-8 backdrop-blur md:p-10">
            <PilotForm />
          </Card>

          <aside className="space-y-8">
            <div>
              <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
                What happens next
              </h3>
              <ol className="mt-6 space-y-6">
                {steps.map((step) => (
                  <li key={step.num} className="flex gap-4">
                    <span className="font-mono text-[11px] text-brand">
                      {step.num}
                    </span>
                    <div className="flex-1 border-l border-border/60 pl-4">
                      <h4 className="text-sm font-semibold">{step.title}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl border border-border/60 bg-surface/40 p-5">
              <h4 className="text-sm font-semibold">What&apos;s included</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {[
                  "Hardware rental for 2 weeks",
                  "On-site install & setup",
                  "Codebase indexing (up to 3 repos)",
                  "OpenCode + IDE integration",
                  "Weekly usage report",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
