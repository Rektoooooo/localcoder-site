import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CtaBand() {
  const t = useTranslations("CtaBand")
  const locale = useLocale()

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-surface/50 p-10 text-center backdrop-blur md:p-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent"
          />
          <div className="relative">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] md:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-[17px]">
              {t("subtitle")}
            </p>
            <div className="mt-10 flex justify-center">
              <Button
                size="lg"
                className="h-12 gap-2 px-7 text-[15px]"
                nativeButton={false}
                render={<Link href={`/${locale}/pilot`} />}
              >
                {t("cta")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
