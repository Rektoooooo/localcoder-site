import Link from "next/link"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { ArrowRight, MapPin } from "lucide-react"

import { SectionHeader } from "@/components/sections/section-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BRAND } from "@/lib/constants"

type Props = { params: Promise<{ locale: string }> }

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("About")

  return (
    <>
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="hero-glow" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-6">
          <SectionHeader
            eyebrow="About"
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-6 text-pretty text-muted-foreground md:text-[17px] md:leading-[1.7]">
            <p>
              LocalCoder is built in Prague by engineers who watched their
              clients get nervous every time a developer opened a cloud coding
              assistant. Proprietary code, regulated data, customer records —
              all of it was being streamed to third-party infrastructure with
              no audit trail.
            </p>
            <p>
              The technology to keep that code on-prem finally caught up in
              2026. Apple Silicon unified memory, MLX-accelerated inference,
              and open models like Qwen 2.5 Coder and DeepSeek V3 made local
              coding assistants actually useful — not just a demo.
            </p>
            <p>
              We productized the hard parts — the RAG pipeline, the indexing,
              the IDE integration, the 12 months of support — so a Czech
              engineering team can have a Cursor-like experience without a
              single byte of source code leaving the building.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2">
            <Card className="border-border/60 bg-surface/40 p-6 backdrop-blur">
              <div className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">
                <MapPin className="h-3 w-3" />
                Based in
              </div>
              <div className="mt-3 text-base font-semibold">Prague, Czechia</div>
              <p className="mt-1 text-sm text-muted-foreground">
                On-site visits anywhere in the CZ, SK and DACH region.
              </p>
            </Card>

            <Card className="border-border/60 bg-surface/40 p-6 backdrop-blur">
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">
                Parent company
              </div>
              <div className="mt-3 text-base font-semibold">{BRAND.parent}</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Established s.r.o. providing IT services since 1999.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            Want to talk?
          </h2>
          <p className="mt-4 text-muted-foreground">
            We&apos;re happy to come to your office with a live demo on the
            actual hardware you&apos;d deploy.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-12 gap-2 px-7"
              nativeButton={false}
              render={<Link href={`/${locale}/pilot`} />}
            >
              Request a pilot
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-7"
              nativeButton={false}
              render={<a href={`mailto:${BRAND.contact}`} />}
            >
              {BRAND.contact}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
