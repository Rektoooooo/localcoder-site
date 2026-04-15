import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowRight, Cpu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TerminalPreview } from "@/components/sections/terminal-preview"

export function Hero() {
  const t = useTranslations("Hero")
  const locale = useLocale()

  return (
    <section className="relative overflow-hidden pt-24 pb-28 md:pt-32 md:pb-36 lg:pt-40">
      <div className="hero-orb" aria-hidden="true" />
      <div className="bg-grid absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <Cpu className="h-3.5 w-3.5 text-brand" />
              {t("eyebrow")}
            </div>

            <h1 className="mt-6 text-balance text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl lg:text-[72px]">
              {t("title")}
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-[17px]">
              {t("subtitle")}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 gap-2 px-6 text-[15px]"
                nativeButton={false}
                render={<Link href={`/${locale}/pilot`} />}
              >
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-6 text-[15px]"
                nativeButton={false}
                render={<Link href={`/${locale}/hardware`} />}
              >
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>

          <div className="relative">
            <TerminalPreview />
          </div>
        </div>
      </div>
    </section>
  )
}
