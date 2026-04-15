import Link from "next/link"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { ArrowRight, Check, Cpu, Users, Zap, X } from "lucide-react"

import { SectionHeader } from "@/components/sections/section-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TIERS } from "@/lib/tiers"
import { cn } from "@/lib/utils"

type Props = { params: Promise<{ locale: string }> }

export default async function HardwarePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Hardware")

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        {/* Tier cards */}
        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          {TIERS.map((tier) => (
            <Card
              key={tier.id}
              className={cn(
                "relative flex flex-col gap-6 overflow-hidden border-border/60 bg-surface/40 p-8 backdrop-blur transition-colors hover:border-border-strong",
                tier.featured && "border-brand/40 bg-surface/60 shadow-lg shadow-brand/10"
              )}
            >
              {tier.featured && (
                <Badge className="absolute right-6 top-6 border-brand/30 bg-brand/10 text-brand">
                  Most popular
                </Badge>
              )}

              <div>
                <div className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
                  {tier.name}
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                  {tier.hardware}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{tier.ram}</p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-xs text-subtle">from</span>
                <span className="tabular-nums text-4xl font-semibold tracking-tight">
                  €{tier.price.toLocaleString("en-US")}
                </span>
                <span className="text-xs text-subtle">one-time</span>
              </div>

              <div className="grid grid-cols-3 gap-3 rounded-xl border border-border/50 bg-background/40 p-4">
                <Stat
                  icon={Cpu}
                  label="Model"
                  value={tier.model.split(" ")[0]}
                />
                <Stat
                  icon={Zap}
                  label="Speed"
                  value={tier.tokensPerSec}
                />
                <Stat
                  icon={Users}
                  label="Team"
                  value={`${tier.devs.min}–${tier.devs.max}`}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-[0.14em] text-success">
                    Handles well
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {tier.does.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-[0.14em] text-warn">
                    Trade-offs
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {tier.doesNot.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warn" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* What's included */}
        <div className="mt-24 grid gap-8 rounded-2xl border border-border/60 bg-surface/40 p-10 backdrop-blur md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Hardware",
              body: "Pre-configured Apple Silicon box, delivered to your office.",
            },
            {
              title: "Install & setup",
              body: "On-site installation, network integration, and staff training.",
            },
            {
              title: "Codebase indexing",
              body: "Unlimited repos, AST-aware chunking, git hooks for live updates.",
            },
            {
              title: "Support",
              body: "12 months of priority support, model updates, and security patches.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h4 className="text-sm font-semibold">{item.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Button
            size="lg"
            className="h-12 gap-2 px-7"
            nativeButton={false}
            render={<Link href={`/${locale}/pilot`} />}
          >
            Request a pilot
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.14em] text-subtle">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className="mt-1.5 text-sm font-medium tracking-tight">{value}</div>
    </div>
  )
}
