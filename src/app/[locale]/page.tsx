import { setRequestLocale } from "next-intl/server"

import { Hero } from "@/components/sections/hero"
import { LogoBar } from "@/components/sections/logo-bar"
import { Problem } from "@/components/sections/problem"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Benchmarks } from "@/components/sections/benchmarks"
import { HardwareTeaser } from "@/components/sections/hardware-teaser"
import { HonestPositioning } from "@/components/sections/honest-positioning"
import { CtaBand } from "@/components/sections/cta-band"

type Props = { params: Promise<{ locale: string }> }

export default async function LandingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <LogoBar />
      <Problem />
      <HowItWorks />
      <Benchmarks />
      <HardwareTeaser />
      <HonestPositioning />
      <CtaBand />
    </>
  )
}
