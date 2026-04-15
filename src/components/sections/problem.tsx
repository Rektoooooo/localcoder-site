import { useTranslations } from "next-intl"
import { Lock, Scale, TrendingDown } from "lucide-react"

import { SectionHeader } from "@/components/sections/section-header"
import { Card } from "@/components/ui/card"
import { Reveal, RevealStagger, RevealItem } from "@/components/interactive/reveal"

export function Problem() {
  const t = useTranslations("Problem")

  const cards = [
    { icon: Lock, title: t("card1Title"), body: t("card1Body") },
    { icon: Scale, title: t("card2Title"), body: t("card2Body") },
    { icon: TrendingDown, title: t("card3Title"), body: t("card3Body") },
  ]

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        </Reveal>

        <RevealStagger className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map(({ icon: Icon, title, body }) => (
            <RevealItem key={title}>
              <Card className="group relative h-full overflow-hidden border-border/60 bg-surface/40 p-7 backdrop-blur transition-colors hover:border-border-strong">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-background/60 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
