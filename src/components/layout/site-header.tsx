"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/brand/logo"
import { NAV_LINKS } from "@/lib/constants"
import { LocaleSwitcher } from "@/components/layout/locale-switcher"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteHeader() {
  const t = useTranslations("Nav")
  const params = useParams<{ locale: string }>()
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const locale = params?.locale ?? "en"
  const localized = (href: string) => `/${locale}${href}`

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href={localized("")} className="shrink-0" aria-label={`${locale} home`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const href = localized(link.href)
            const active = pathname === href
            return (
              <Link
                key={link.key}
                href={href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  active && "text-foreground"
                )}
              >
                {t(link.key)}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button
            size="sm"
            className="ml-1"
            nativeButton={false}
            render={<Link href={localized("/pilot")} />}
          >
            {t("pilot")}
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label={t("openMenu")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1 px-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.key}
                    href={localized(link.href)}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                  >
                    {t(link.key)}
                  </Link>
                ))}
                <div className="my-4 h-px bg-border" />
                <div className="flex items-center gap-2 px-3">
                  <LocaleSwitcher />
                  <ThemeToggle />
                </div>
                <Button
                  className="mt-4 mx-3"
                  nativeButton={false}
                  render={
                    <Link
                      href={localized("/pilot")}
                      onClick={() => setOpen(false)}
                    />
                  }
                >
                  {t("pilot")}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
