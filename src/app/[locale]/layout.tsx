import type { Metadata } from "next"
import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { Geist, Geist_Mono } from "next/font/google"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { routing } from "@/i18n/routing"
import { BRAND } from "@/lib/constants"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Toaster } from "@/components/ui/sonner"

import "../globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Meta" })
  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://localcoder.cz"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        cs: "/cs",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "cs" ? "cs_CZ" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: BRAND.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS (on-prem appliance)",
    description:
      "Turnkey on-prem AI coding assistant for Czech enterprises. Apple Silicon hardware plus a RAG pipeline over your own codebase.",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: "2200",
      availability: "https://schema.org/PreOrder",
    },
    publisher: {
      "@type": "Organization",
      name: BRAND.parent,
      url: "https://localcoder.cz",
      email: BRAND.contact,
      address: {
        "@type": "PostalAddress",
        addressCountry: "CZ",
        addressLocality: "Prague",
      },
    },
  }

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <div className="relative flex min-h-dvh flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
