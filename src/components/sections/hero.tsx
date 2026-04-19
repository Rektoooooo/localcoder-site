"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import * as React from "react"

import { Button } from "@/components/ui/button"

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const t = useTranslations("Hero")
  const locale = useLocale()
  const imageRef = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const imageScale = useTransform(scrollYProgress, [0, 0.4], [0.95, 1])

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
      {/* Layered background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-aurora" />
        <div className="hero-rings" />
        <div className="hero-dots" />
        <div className="hero-rulers" />
        <div className="hero-corners" />
      </div>
      <div className="absolute inset-0 bg-noise" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Top eyebrow pill */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0 }}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-[11px] font-medium tracking-wide backdrop-blur-sm">
            <span className="pulse-dot relative h-1.5 w-1.5 rounded-full text-success">
              <span className="absolute inset-0 rounded-full bg-success" />
            </span>
            <span className="text-muted-foreground">{t("eyebrow")}</span>
          </div>
        </motion.div>

        {/* Massive centered display headline — word-by-word stagger */}
        <motion.h1
          className="mx-auto mt-10 max-w-5xl text-center font-semibold leading-[0.95] tracking-[-0.04em] text-[48px] md:text-[80px] lg:text-[104px]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
          }}
        >
          <WordReveal>{t("titleLine1")}</WordReveal>{" "}
          <WordReveal>{t("titleLine2Before")}</WordReveal>
          <WordReveal className="text-gradient-brand">
            {t("titleLine2Highlight")}
          </WordReveal>{" "}
          <WordReveal>{t("titleLine3")}</WordReveal>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-8 max-w-2xl text-pretty text-center text-[16px] leading-[1.65] text-muted-foreground md:text-[18px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.45 }}
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="group h-12 gap-2 px-7 text-[15px] shadow-lg shadow-brand/20"
            nativeButton={false}
            render={<Link href={`/${locale}/pilot`} />}
          >
            {t("ctaPrimary")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-7 text-[15px]"
            nativeButton={false}
            render={<Link href={`/${locale}/hardware`} />}
          >
            {t("ctaSecondary")}
          </Button>
        </motion.div>

        {/* Trust strip — compliance signals */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-subtle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          <TrustItem
            icon={
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1.5L13.5 4V10L8 12.5L2.5 10V4L8 1.5Z" stroke="currentColor" strokeWidth="1.25" />
                <path d="M5.5 7.5L7 9L10.5 5.5" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            }
            label={t("trustAirGap")}
          />
          <span aria-hidden="true" className="h-3 w-px bg-border-strong/70" />
          <TrustItem
            icon={
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 3H14V11C14 12.1 13.1 13 12 13H4C2.9 13 2 12.1 2 11V3Z" stroke="currentColor" strokeWidth="1.25" />
                <path d="M6 7H10" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            }
            label={t("trustGdpr")}
          />
          <span aria-hidden="true" className="h-3 w-px bg-border-strong/70" />
          <TrustItem
            icon={
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.25" />
                <path d="M8 4V8L10.5 9.5" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            }
            label={t("trustAiAct")}
          />
        </motion.div>

        {/* Product moment — Mac mini with scroll-linked parallax */}
        <div ref={imageRef} className="relative mt-20 flex flex-col items-center md:mt-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 bottom-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 55% at 50% 38%, color-mix(in oklab, var(--brand) 20%, transparent), transparent 70%)",
            }}
          />

          <motion.div
            className="relative aspect-[520/340] w-[280px] -translate-x-1 select-none md:w-[420px] md:-translate-x-6 lg:w-[480px] lg:-translate-x-10"
            style={{
              y: imageY,
              scale: imageScale,
              WebkitMaskImage:
                "radial-gradient(ellipse 58% 70% at 50% 38%, black 0%, black 42%, transparent 92%)",
              maskImage:
                "radial-gradient(ellipse 58% 70% at 50% 38%, black 0%, black 42%, transparent 92%)",
            }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease, delay: 0.85 }}
          >
            <Image
              src="/mac-mini-hand.png"
              alt="Mac mini M4 held in a hand"
              fill
              priority
              sizes="(max-width: 768px) 280px, 480px"
              className="object-cover"
              style={{ objectPosition: "50% 12%" }}
            />
          </motion.div>

          <motion.div
            className="relative mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-subtle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <span className="h-px w-8 bg-border-strong/70" aria-hidden="true" />
            <span className="text-brand">Mac mini M4 Pro</span>
            <span aria-hidden="true" className="text-border-strong">/</span>
            <span className="text-foreground/80">48 GB unified</span>
            <span aria-hidden="true" className="text-border-strong">/</span>
            <span className="text-foreground/80">Silent · Fits in your hand</span>
            <span className="h-px w-8 bg-border-strong/70" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function WordReveal({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  const words = children.trim().split(/\s+/)
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className={`inline-block ${className ?? ""}`}
            variants={{
              hidden: { y: "115%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.65, ease },
              },
            }}
          >
            {word}
          </motion.span>
          {"\u00A0"}
        </span>
      ))}
    </>
  )
}

function TrustItem({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) {
  return (
    <span className="flex items-center gap-2">
      {icon}
      {label}
    </span>
  )
}
