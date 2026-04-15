import { setRequestLocale, getTranslations } from "next-intl/server"

import { SectionHeader } from "@/components/sections/section-header"

type Props = { params: Promise<{ locale: string }> }

export default async function PilotPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Pilot")

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
      </div>
    </section>
  )
}
