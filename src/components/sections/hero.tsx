import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TerminalPreview } from "@/components/sections/terminal-preview"

export function Hero() {
  const t = useTranslations("Hero")
  const locale = useLocale()

  return (
    <section className="relative overflow-hidden pt-24 pb-24 md:pt-32 md:pb-32 lg:pt-40 lg:pb-36">
      {/* Layered background */}
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-spotlight" aria-hidden="true" />
      <div className="hero-beams" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div className="absolute inset-0 bg-noise" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="shimmer-border inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-[11px] font-medium tracking-wide">
              <span className="pulse-dot relative h-1.5 w-1.5 rounded-full text-success">
                <span className="absolute inset-0 rounded-full bg-success" />
              </span>
              <span className="text-muted-foreground">{t("eyebrow")}</span>
            </div>

            {/* Headline */}
            <h1 className="mt-7 text-balance font-semibold leading-[0.98] tracking-[-0.035em] text-[48px] md:text-[64px] lg:text-[80px]">
              {t("titleLine1")}
              <br />
              {t("titleLine2Before")}
              <span className="text-gradient-brand">
                {t("titleLine2Highlight")}
              </span>
              <br />
              {t("titleLine3")}
            </h1>

            {/* Subtitle */}
            <p className="mt-7 max-w-xl text-pretty text-base leading-[1.6] text-muted-foreground md:text-[17px]">
              {t("subtitle")}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="h-12 gap-2 px-6 text-[14px] shadow-lg shadow-brand/20"
                nativeButton={false}
                render={<Link href={`/${locale}/pilot`} />}
              >
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-6 text-[14px]"
                nativeButton={false}
                render={<Link href={`/${locale}/hardware`} />}
              >
                {t("ctaSecondary")}
              </Button>
            </div>

            {/* Trust signals */}
            <div className="mt-12 flex items-center gap-6 text-[11px] font-mono uppercase tracking-[0.14em] text-subtle">
              <div className="flex items-center gap-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 1.5L13.5 4V10L8 12.5L2.5 10V4L8 1.5Z"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                  <path
                    d="M5.5 7.5L7 9L10.5 5.5"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                </svg>
                {t("trustAirGap")}
              </div>
              <div className="h-3 w-px bg-border" />
              <div className="flex items-center gap-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 3H14V11C14 12.1 13.1 13 12 13H4C2.9 13 2 12.1 2 11V3Z"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                  <path
                    d="M6 7H10"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                </svg>
                {t("trustGdpr")}
              </div>
              <div className="h-3 w-px bg-border" />
              <div className="flex items-center gap-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.25" />
                  <path
                    d="M8 4V8L10.5 9.5"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                </svg>
                {t("trustAiAct")}
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="relative">
            <TerminalPreview />
          </div>
        </div>
      </div>
    </section>
  )
}
