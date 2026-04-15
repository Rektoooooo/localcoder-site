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

import { SectionHeader } from "@/components/sections/section-header"
import { HeroTerminal } from "@/components/interactive/hero-terminal"
import { ArchitectureDiagram } from "@/components/interactive/architecture-diagram"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BENCHMARKS } from "@/lib/benchmarks"

type Props = { params: Promise<{ locale: string }> }

export default async function ProductPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Product")

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="hero-glow" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="absolute inset-0 bg-noise" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-6">
          <SectionHeader
            eyebrow="Product"
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </div>
      </section>

      {/* Architecture */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            title="Four moving parts, one box"
            subtitle="The whole stack runs on a single Apple Silicon machine inside your network. Nothing phones home."
          />

          <div className="mt-16">
            <ArchitectureDiagram />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: FileCode2,
                name: "Editor",
                body: "OpenCode, Aider, Continue.dev, VS Code or JetBrains. Any OpenAI-compatible client works.",
              },
              {
                icon: Terminal,
                name: "API gateway",
                body: "Auth, usage tracking, RAG context injection. Lightweight FastAPI service.",
              },
              {
                icon: Database,
                name: "Vector index",
                body: "Qdrant running locally with AST-aware chunks from your repos. Git-hook fresh.",
              },
              {
                icon: Sparkles,
                name: "Local model",
                body: "Qwen, DeepSeek, or GLM via Ollama + MLX. Swap models without changing the stack.",
              },
            ].map((item, i) => (
              <Card
                key={item.name}
                className="group relative overflow-hidden border-border/60 bg-surface/40 p-6 backdrop-blur"
              >
                <div className="absolute right-5 top-5 font-mono text-[10px] text-subtle">
                  0{i + 1}
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-background/60 text-brand">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* RAG pipeline deep dive */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-brand">
                RAG Pipeline
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] md:text-4xl lg:text-5xl">
                The part that makes local actually work.
              </h2>
              <p className="mt-6 text-pretty text-muted-foreground md:text-[17px]">
                Naive code search dumps whole files into the prompt and hopes.
                Our pipeline parses your codebase with tree-sitter, extracts
                semantic chunks — functions, classes, docstrings — and
                retrieves only what&apos;s relevant. Smaller context, faster
                answers, grounded in your actual code.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  {
                    icon: GitBranch,
                    title: "AST-aware chunking",
                    body: "Tree-sitter parses 7 languages. Functions stay intact, context headers included, cross-references tracked.",
                  },
                  {
                    icon: Search,
                    title: "Hybrid retrieval",
                    body: "Semantic embeddings + keyword search. Conceptual questions and exact lookups both work.",
                  },
                  {
                    icon: Code2,
                    title: "Fresh on every push",
                    body: "Git hook re-indexes only changed files. A typical commit refreshes in 2–5 seconds.",
                  },
                ].map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-surface/60 text-brand">
                      <f.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{f.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {f.body}
                      </p>
                    </div>
                  </div>
                ))}
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
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            title="Grep vs RAG, measured"
            subtitle="Real queries against Express.js, Next.js and a private Swift codebase. Same model, same machine."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <Card className="border-border/60 bg-surface/40 p-8">
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">
                Naive grep + file dump
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="tabular-nums text-5xl font-semibold tracking-tight text-muted-foreground">
                  {BENCHMARKS.naiveAvgSeconds}
                </span>
                <span className="text-sm text-subtle">s avg</span>
              </div>
              <div className="mt-2 text-sm text-subtle">
                {BENCHMARKS.naiveAvgChars.toLocaleString()} chars of context per
                query
              </div>

              <div className="mt-8 space-y-2 text-xs text-subtle">
                <Row label="Context" value="12.8k chars" muted />
                <Row label="Response time" value="174.7s" muted />
                <Row label="Relevance" value="Best-effort" muted />
              </div>
            </Card>

            <Card className="border-brand/40 bg-surface/60 p-8 shadow-lg shadow-brand/10">
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand">
                LocalCoder RAG pipeline
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="tabular-nums text-5xl font-semibold tracking-tight">
                  {BENCHMARKS.ragAvgSeconds}
                </span>
                <span className="text-sm text-muted-foreground">s avg</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {BENCHMARKS.ragAvgChars.toLocaleString()} chars of context per
                query
              </div>

              <div className="mt-8 space-y-2 text-xs">
                <Row label="Context" value="3.7k chars" highlight />
                <Row label="Response time" value="66.4s" highlight />
                <Row label="Relevance" value="Grounded in code" highlight />
              </div>
            </Card>
          </div>

          <p className="mt-8 text-center font-mono text-[11px] text-subtle">
            {BENCHMARKS.hardware} · {BENCHMARKS.model}
          </p>
        </div>
      </section>

      {/* Integrations */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionHeader
            title="Developers keep their tools"
            subtitle="We expose an OpenAI-compatible endpoint. Anything that talks to OpenAI talks to LocalCoder — no new CLI to learn."
          />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {[
              "OpenCode",
              "Aider",
              "Continue.dev",
              "VS Code",
              "JetBrains",
              "Cursor (offline)",
              "Zed",
              "Custom CLIs",
            ].map((name) => (
              <span
                key={name}
                className="rounded-full border border-border/70 bg-surface/40 px-4 py-2 text-sm font-medium text-muted-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
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
      </section>
    </>
  )
}

function Row({
  label,
  value,
  highlight,
  muted,
}: {
  label: string
  value: string
  highlight?: boolean
  muted?: boolean
}) {
  return (
    <div className="flex items-center justify-between border-t border-border/40 pt-2">
      <span className="text-subtle">{label}</span>
      <span
        className={
          highlight
            ? "font-medium text-foreground"
            : muted
              ? "text-muted-foreground"
              : ""
        }
      >
        {value}
      </span>
    </div>
  )
}
