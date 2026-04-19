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
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-6 text-pretty text-muted-foreground md:text-[17px] md:leading-[1.7]">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2">
            <Card className="border-border/60 bg-surface/40 p-6 backdrop-blur">
              <div className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">
                <MapPin className="h-3 w-3" />
                {t("basedInLabel")}
              </div>
              <div className="mt-3 text-base font-semibold">{t("basedInCity")}</div>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("basedInBody")}
              </p>
            </Card>

            <Card className="border-border/60 bg-surface/40 p-6 backdrop-blur">
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">
                {t("parentLabel")}
              </div>
              <div className="mt-3 text-base font-semibold">{BRAND.parent}</div>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("parentBody")}
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            {t("talkTitle")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("talkBody")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-12 gap-2 px-7"
              nativeButton={false}
              render={<Link href={`/${locale}/pilot`} />}
            >
              {t("requestPilot")}
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
