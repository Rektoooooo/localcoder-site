import { useTranslations } from "next-intl"
import { Check, X } from "lucide-react"

import { SectionHeader } from "@/components/sections/section-header"
import { Card } from "@/components/ui/card"

export function HonestPositioning() {
  const t = useTranslations("HonestPositioning")

  const dos = [t("do1"), t("do2"), t("do3"), t("do4")]
  const donts = [t("dont1"), t("dont2"), t("dont3"), t("dont4")]

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Card className="border-border/60 bg-surface/40 p-8 backdrop-blur">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-success/30 bg-success/10 text-success">
              <Check className="h-4.5 w-4.5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">
              {t("doTitle")}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {dos.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 text-muted-foreground"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="border-border/60 bg-surface/40 p-8 backdrop-blur">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-warn/30 bg-warn/10 text-warn">
              <X className="h-4.5 w-4.5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">
              {t("dontTitle")}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {donts.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 text-muted-foreground"
                >
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-warn" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
