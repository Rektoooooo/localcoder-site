import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowRight, Check } from "lucide-react"

import { SectionHeader } from "@/components/sections/section-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TIERS } from "@/lib/tiers"
import { cn } from "@/lib/utils"
import { Reveal, RevealStagger, RevealItem } from "@/components/interactive/reveal"

export function HardwareTeaser() {
  const t = useTranslations("HardwareTeaser")
  const locale = useLocale()
  const featured = [TIERS[0], TIERS[1], TIERS[2]]

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        </Reveal>

        <RevealStagger className="mt-16 grid gap-6 md:grid-cols-3">
          {featured.map((tier) => (
            <RevealItem key={tier.id} className="h-full">
            <Card
              className={cn(
                "relative flex h-full flex-col overflow-hidden border-border/60 bg-surface/40 p-8 backdrop-blur transition-colors hover:border-border-strong",
                tier.featured && "border-brand/50 bg-surface/60"
              )}
            >
              {tier.featured && (
                <Badge className="absolute right-6 top-6 border-brand/30 bg-brand/10 text-brand">
                  Popular
                </Badge>
              )}
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">
                {tier.name}
              </span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                {tier.hardware}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{tier.ram}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-xs text-subtle">{t("startingAt")}</span>
                <span className="tabular-nums text-3xl font-semibold tracking-tight">
                  €{tier.price.toLocaleString("en-US")}
                </span>
              </div>
              <p className="mt-1 text-xs text-subtle">
                {tier.devs.min}–{tier.devs.max} {t("devs")} · {tier.model}
              </p>

              <ul className="mt-6 space-y-2.5 text-sm">
                {tier.does.slice(0, 3).map((line) => (
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
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-12 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            nativeButton={false}
            render={<Link href={`/${locale}/hardware`} />}
          >
            {t("seeAll")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
