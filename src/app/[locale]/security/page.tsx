import Link from "next/link"
import { setRequestLocale, getTranslations } from "next-intl/server"
import {
  ArrowRight,
  Check,
  FileLock,
  Lock,
  Network,
  Scale,
  Shield,
} from "lucide-react"

import { SectionHeader } from "@/components/sections/section-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Props = { params: Promise<{ locale: string }> }

export default async function SecurityPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Security")

  return (
    <>
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="hero-glow" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-6">
          <SectionHeader
            eyebrow="Security"
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </div>
      </section>

      {/* Pillars */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Network,
                title: "Air-gapped by default",
                body: "The box runs fully offline. Optional outbound is allow-listed to your model mirror and nothing else.",
              },
              {
                icon: Lock,
                title: "Your data, your disks",
                body: "Source code, embeddings, logs, and session history live on hardware you control. No replication, no telemetry.",
              },
              {
                icon: Shield,
                title: "Local auth & audit",
                body: "Per-developer API keys, usage logs, and export-ready audit trails for your SIEM. SSO via OIDC on request.",
              },
              {
                icon: Scale,
                title: "GDPR aligned",
                body: "As a processor, we never receive customer data. DPAs ready on request; Czech/EU residency by construction.",
              },
              {
                icon: FileLock,
                title: "EU AI Act ready",
                body: "Coding assistants classify as minimal-risk. We provide technical documentation and a transparent risk statement.",
              },
              {
                icon: Check,
                title: "Open foundation",
                body: "We use OSS components with clear licensing — Qdrant, Ollama, tree-sitter, OpenCode. No black boxes.",
              },
            ].map((pillar) => (
              <Card
                key={pillar.title}
                className="border-border/60 bg-surface/40 p-7 backdrop-blur"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-background/60 text-brand">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Threat model */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader
            title="Honest threat model"
            subtitle="What we protect against — and what we don't."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <Card className="border-success/20 bg-success/5 p-8">
              <h3 className="flex items-center gap-2 text-sm font-mono font-medium uppercase tracking-[0.14em] text-success">
                <Check className="h-4 w-4" />
                What LocalCoder protects against
              </h3>
              <ul className="mt-6 space-y-3">
                {[
                  "Proprietary code leaking to third-party AI providers",
                  "Prompts and codebase context crossing network boundaries",
                  "Vendor lock-in — the stack is open and swappable",
                  "Shadow IT: developers pasting code into public LLMs",
                  "Data residency violations for EU-regulated industries",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border-warn/20 bg-warn/5 p-8">
              <h3 className="flex items-center gap-2 text-sm font-mono font-medium uppercase tracking-[0.14em] text-warn">
                Still your job
              </h3>
              <ul className="mt-6 space-y-3">
                {[
                  "Physical security of the hardware inside your building",
                  "Network segmentation between dev machines and the box",
                  "User provisioning, SSO, and off-boarding workflows",
                  "Patching the underlying macOS and your IDE plugins",
                  "Classifying which repos are safe to index",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-0.5 text-warn">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            Need the CISO one-pager?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Email us — we&apos;ll send the architecture diagram, data flow,
            and a DPA template ready for your legal team.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="h-12 gap-2 px-7"
              nativeButton={false}
              render={<Link href={`/${locale}/pilot`} />}
            >
              Talk to us
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
