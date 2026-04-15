import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"

import { Logo } from "@/components/brand/logo"
import { BRAND } from "@/lib/constants"

export function SiteFooter() {
  const t = useTranslations("Footer")
  const locale = useLocale()
  const year = new Date().getFullYear()
  const l = (href: string) => `/${locale}${href}`

  return (
    <footer className="mt-32 border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {t("tagline")}
            </p>
            <p className="mt-3 text-xs text-subtle">{t("parentCompany")}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t("product")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href={l("/product")} className="hover:text-foreground">
                  {t("howItWorks")}
                </Link>
              </li>
              <li>
                <Link href={l("/hardware")} className="hover:text-foreground">
                  {t("hardware")}
                </Link>
              </li>
              <li>
                <Link href={l("/security")} className="hover:text-foreground">
                  {t("security")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t("company")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href={l("/about")} className="hover:text-foreground">
                  {t("about")}
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.contact}`}
                  className="hover:text-foreground"
                >
                  {t("contact")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border/60 pt-8 text-xs text-subtle md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {BRAND.parent}. {t("rights")}
          </p>
          <p className="max-w-xl text-right text-[11px]">{t("trademark")}</p>
        </div>
      </div>
    </footer>
  )
}
