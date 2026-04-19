import Link from "next/link"
import { setRequestLocale, getTranslations } from "next-intl/server"
import {
  ArrowRight,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  Search,
  Sparkles,
  Terminal,
} from "lucide-react"

import { HeroTerminal } from "@/components/interactive/hero-terminal"
import { ArchitectureDiagram } from "@/components/interactive/architecture-diagram"
import { Button } from "@/components/ui/button"
import { BENCHMARKS } from "@/lib/benchmarks"

type Props = { params: Promise<{ locale: string }> }

export default async function ProductPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Product")

  const modules = [
    {
      icon: FileCode2,
      name: t("architecture.editor.name"),
      spec: t("architecture.editor.spec"),
      stack: t("architecture.editor.stack"),
      body: t("architecture.editor.body"),
    },
    {
      icon: Terminal,
      name: t("architecture.gateway.name"),
      spec: t("architecture.gateway.spec"),
      stack: t("architecture.gateway.stack"),
      body: t("architecture.gateway.body"),
    },
    {
      icon: Database,
      name: t("architecture.vector.name"),
      spec: t("architecture.vector.spec"),
      stack: t("architecture.vector.stack"),
      body: t("architecture.vector.body"),
    },
    {
      icon: Sparkles,
      name: t("architecture.model.name"),
      spec: t("architecture.model.spec"),
      stack: t("architecture.model.stack"),
      body: t("architecture.model.body"),
    },
  ]

  const ragFeatures = [
    {
      icon: GitBranch,
      title: t("rag.feature1Title"),
      body: t("rag.feature1Body"),
      metric: t("rag.feature1Metric"),
    },
    {
      icon: Search,
      title: t("rag.feature2Title"),
      body: t("rag.feature2Body"),
      metric: t("rag.feature2Metric"),
    },
    {
      icon: Code2,
      title: t("rag.feature3Title"),
      body: t("rag.feature3Body"),
      metric: t("rag.feature3Metric"),
    },
  ]

  const clients = [
    { name: "OpenCode", glyph: "◆", kind: t("integrations.kindCli") },
    { name: "Aider", glyph: "●", kind: t("integrations.kindCli") },
    { name: "Continue.dev", glyph: "▲", kind: t("integrations.kindExtension") },
    { name: "VS Code", glyph: "❯", kind: t("integrations.kindIde") },
    { name: "JetBrains", glyph: "▣", kind: t("integrations.kindIde") },
    { name: "Cursor", glyph: "✦", kind: t("integrations.kindOffline") },
    { name: "Zed", glyph: "◈", kind: t("integrations.kindIde") },
    { name: t("integrations.clientCustom"), glyph: "⌘", kind: t("integrations.kindAny") },
  ]

  return (
    <>
      {/* Hero — editorial, left aligned */}
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

      {/* Architecture */}
      <section className="relative py-24 md:py-32">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
                <span className="h-px w-10 bg-brand" aria-hidden="true" />
                {t("architecture.eyebrow")}
              </div>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.028em] md:text-5xl lg:text-[56px] lg:leading-[1.02]">
                {t("architecture.title")}
              </h2>
            </div>
            <p className="text-pretty text-[15px] leading-[1.7] text-muted-foreground md:text-[17px]">
              {t("architecture.body")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureDiagram />
          </div>

          {/* Component ledger */}
          <div className="mt-16 grid gap-px overflow-hidden border border-border-strong/70 bg-border-strong/40 md:grid-cols-2 lg:grid-cols-4">
            {modules.map((item, i) => (
              <div
                key={item.name}
                className="group relative flex flex-col bg-background px-7 pb-8 pt-7 transition-colors hover:bg-surface/50"
              >
                {/* Top status bar */}
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
                  <span className="flex items-center gap-1.5 text-success">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-success/70" />
                      <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-success" />
                    </span>
                    {t("architecture.running")}
                  </span>
                  <span className="flex items-center gap-2 text-subtle">
                    <span className="text-brand">{t("architecture.modLabel")}</span>
                    <span>0{i + 1}</span>
                  </span>
                </div>

                {/* Icon + title block */}
                <div className="mt-8 flex items-start gap-4">
                  <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface/70 text-brand transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand/50 group-hover:bg-brand/[0.06]">
                    <item.icon className="h-5 w-5" strokeWidth={1.75} />
                    {/* subtle corner tick on icon tile */}
                    <span
                      aria-hidden="true"
                      className="absolute -right-px -top-px h-1.5 w-1.5 border-r border-t border-brand/60"
                    />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-[18px] font-semibold leading-tight tracking-tight">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                      {item.spec}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-5 text-[13px] leading-[1.6] text-muted-foreground">
                  {item.body}
                </p>

                {/* Tech strip footer */}
                <div className="mt-auto">
                  <div
                    aria-hidden="true"
                    className="mt-6 h-px w-full"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 15%, transparent) 0 4px, transparent 4px 9px)",
                    }}
                  />
                  <div className="mt-4 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.2em] text-subtle">
                    <span>{item.stack}</span>
                    <span className="text-brand/70">↗</span>
                  </div>
                </div>

                {/* Hover brand underline */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-brand to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RAG pipeline deep dive */}
      <section className="relative py-24 md:py-32">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
                <span className="h-px w-10 bg-brand" aria-hidden="true" />
                {t("rag.eyebrow")}
              </div>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.028em] md:text-5xl lg:text-[52px] lg:leading-[1.02]">
                {t("rag.title")}
              </h2>
              <p className="mt-7 text-pretty text-[15px] leading-[1.7] text-muted-foreground md:text-[17px]">
                {t("rag.body")}
              </p>

              {/* Stage rail — vertical brand line linking 3 pipeline stages */}
              <div className="relative mt-12">
                {/* Top / bottom pipeline markers */}
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
                  <span className="text-brand">{t("rag.input")}</span>
                  <span className="h-px flex-1 bg-border-strong/60" aria-hidden="true" />
                  <span>{t("rag.codebase")}</span>
                </div>

                {/* Vertical rail */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-10 left-[19px] top-10 w-px"
                  style={{
                    background:
                      "linear-gradient(to bottom, color-mix(in oklab, var(--brand) 55%, transparent), color-mix(in oklab, var(--foreground) 12%, transparent) 50%, color-mix(in oklab, var(--brand) 55%, transparent))",
                  }}
                />

                <ul className="relative">
                  {ragFeatures.map((f, i) => (
                    <li key={f.title} className="group relative flex items-start gap-5 py-6">
                      {/* Node on the rail */}
                      <span className="relative z-10 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong/70 bg-background text-brand transition-all duration-300 group-hover:border-brand/60">
                        <f.icon className="h-4 w-4" strokeWidth={1.75} />
                        {/* Dashed ring that tightens on hover */}
                        <span className="absolute inset-[3px] rounded-full border border-dashed border-brand/25 transition-all duration-300 group-hover:inset-[1px] group-hover:border-brand/70" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[10.5px] tracking-[0.22em] text-brand">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <h4 className="text-[15.5px] font-semibold tracking-tight">
                              {f.title}
                            </h4>
                          </div>
                          {/* Metric badge */}
                          <span className="hidden shrink-0 border border-border-strong/70 bg-surface/60 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-foreground/80 md:inline-block">
                            {f.metric}
                          </span>
                        </div>
                        <p className="mt-2 text-[13.5px] leading-[1.6] text-muted-foreground">
                          {f.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
                  <span className="text-brand">{t("rag.output")}</span>
                  <span className="h-px flex-1 bg-border-strong/60" aria-hidden="true" />
                  <span>{t("rag.groundedAnswer")}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <HeroTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* Benchmark comparison */}
      <section className="relative py-24 md:py-32">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
                <span className="h-px w-10 bg-brand" aria-hidden="true" />
                {t("benchmark.eyebrow")}
              </div>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.028em] md:text-5xl lg:text-[56px] lg:leading-[1.02]">
                {t("benchmark.title")}
              </h2>
            </div>
            <p className="text-pretty text-[15px] leading-[1.7] text-muted-foreground md:text-[17px]">
              {t("benchmark.body")}
            </p>
          </div>

          {/* Two-plate comparison */}
          <div className="mt-20 grid gap-px overflow-hidden border border-border-strong/70 bg-border-strong/40 md:grid-cols-2">
            {/* Naive */}
            <div className="relative bg-background p-10 md:p-12">
              <span
                aria-hidden="true"
                className="absolute left-5 top-5 h-2 w-2 border-l border-t border-border-strong/80"
              />
              <span
                aria-hidden="true"
                className="absolute right-5 bottom-5 h-2 w-2 border-r border-b border-border-strong/80"
              />
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                <span className="text-subtle">A</span>
                <span className="h-px w-6 bg-border-strong/60" aria-hidden="true" />
                <span className="text-subtle">{t("benchmark.columnA")}</span>
              </div>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="tabular-nums text-[72px] font-semibold leading-[0.9] tracking-[-0.04em] text-muted-foreground">
                  {BENCHMARKS.naiveAvgSeconds}
                </span>
                <span className="font-mono text-[13px] uppercase tracking-[0.18em] text-subtle">
                  {t("benchmark.sAvg")}
                </span>
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                {BENCHMARKS.naiveAvgChars.toLocaleString()} {t("benchmark.charsPerQuery")}
              </p>
              <dl className="mt-8 divide-y divide-border-strong/40 border-t border-border-strong/50 pt-2 text-[13px]">
                <StatRow label={t("benchmark.rowContext")} value="12.8k chars" />
                <StatRow label={t("benchmark.rowResponseTime")} value="174.7s" />
                <StatRow label={t("benchmark.rowRelevance")} value={t("benchmark.relevanceNaive")} />
              </dl>
            </div>

            {/* LocalCoder */}
            <div className="relative bg-surface/60 p-10 md:p-12">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent"
              />
              <span
                aria-hidden="true"
                className="absolute left-5 top-5 h-2 w-2 border-l border-t border-brand/60"
              />
              <span
                aria-hidden="true"
                className="absolute right-5 bottom-5 h-2 w-2 border-r border-b border-brand/60"
              />
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                <span className="text-brand">B</span>
                <span className="h-px w-6 bg-brand/50" aria-hidden="true" />
                <span className="text-subtle">{t("benchmark.columnB")}</span>
              </div>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="tabular-nums text-[72px] font-semibold leading-[0.9] tracking-[-0.04em]">
                  {BENCHMARKS.ragAvgSeconds}
                </span>
                <span className="font-mono text-[13px] uppercase tracking-[0.18em] text-brand">
                  {t("benchmark.sAvg")}
                </span>
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                {BENCHMARKS.ragAvgChars.toLocaleString()} {t("benchmark.charsPerQuery")}
              </p>
              <dl className="mt-8 divide-y divide-border-strong/40 border-t border-border-strong/50 pt-2 text-[13px]">
                <StatRow label={t("benchmark.rowContext")} value="3.7k chars" highlight />
                <StatRow label={t("benchmark.rowResponseTime")} value="66.4s" highlight />
                <StatRow label={t("benchmark.rowRelevance")} value={t("benchmark.relevanceRag")} highlight />
              </dl>
            </div>
          </div>

          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-subtle">
            <span className="text-brand">{t("benchmark.measuredOn")}</span>
            <span>{BENCHMARKS.hardware}</span>
            <span className="text-border-strong" aria-hidden="true">·</span>
            <span>{BENCHMARKS.model}</span>
          </p>
        </div>
      </section>

      {/* Integrations */}
      <section className="relative py-24 md:py-32">
        <div className="relative mx-auto max-w-6xl px-6">
          {/* Editorial header matching the rest of the page */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
                <span className="h-px w-10 bg-brand" aria-hidden="true" />
                {t("integrations.eyebrow")}
              </div>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.028em] md:text-5xl lg:text-[56px] lg:leading-[1.02]">
                {t("integrations.title")}
              </h2>
            </div>
            <p className="text-pretty text-[15px] leading-[1.7] text-muted-foreground md:text-[17px]">
              {t("integrations.body")}
            </p>
          </div>

          {/* Endpoint specimen strip */}
          <div className="mt-16 flex items-center gap-4 border-y border-border-strong/60 py-4">
            <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand/70" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              {t("integrations.endpoint")}
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 18%, transparent) 0 4px, transparent 4px 9px)",
              }}
            />
            <code className="font-mono text-[12px] text-foreground/90">
              https://localcoder.local/v1/chat/completions
            </code>
            <span
              aria-hidden="true"
              className="h-px flex-1"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 18%, transparent) 0 4px, transparent 4px 9px)",
              }}
            />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-subtle">
              {t("integrations.openAiCompatible")}
            </span>
          </div>

          {/* Client grid — 8 tiles in a shared hairline frame */}
          <div className="mt-8 grid gap-px overflow-hidden border border-border-strong/70 bg-border-strong/40 md:grid-cols-4">
            {clients.map((client) => (
              <div
                key={client.name}
                className="group relative flex items-center gap-4 bg-background px-6 py-5 transition-colors hover:bg-surface/60"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface/70 font-mono text-[16px] text-brand transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand/50 group-hover:bg-brand/[0.06]">
                  {client.glyph}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold tracking-tight">
                    {client.name}
                  </div>
                  <div className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-subtle">
                    {client.kind}
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  ↗
                </span>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <p className="mt-6 text-center font-mono text-[10.5px] uppercase tracking-[0.2em] text-subtle">
            {t("integrations.dropIn")} <code className="text-foreground/90">OPENAI_BASE_URL</code> {t("integrations.dropInSuffix")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-28 pt-8">
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden border border-border-strong/70 bg-surface/30 px-8 py-10 md:px-12 md:py-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 50% 120% at 95% 50%, color-mix(in oklab, var(--brand) 14%, transparent), transparent 62%)",
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

            <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
              <div>
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
                  <span className="h-px w-10 bg-brand" aria-hidden="true" />
                  {t("cta.eyebrow")}
                </div>
                <h3 className="mt-4 text-balance text-2xl font-semibold tracking-[-0.02em] md:text-[30px]">
                  {t("cta.title")}
                </h3>
              </div>
              <Button
                size="lg"
                className="group h-12 shrink-0 gap-2.5 px-7 text-[15px] shadow-lg shadow-brand/20"
                nativeButton={false}
                render={<Link href={`/${locale}/pilot`} />}
              >
                {t("cta.button")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function StatRow({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-subtle">
        {label}
      </span>
      <span
        className={
          highlight
            ? "font-medium text-foreground"
            : "text-muted-foreground"
        }
      >
        {value}
      </span>
    </div>
  )
}
