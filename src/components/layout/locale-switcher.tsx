"use client"

import { useParams } from "next/navigation"
import { Globe } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, usePathname } from "@/i18n/navigation"
import { LOCALES } from "@/lib/constants"

const LABELS: Record<string, string> = {
  en: "English",
  cs: "Čeština",
}

export function LocaleSwitcher() {
  const pathname = usePathname()
  const params = useParams<{ locale: string }>()
  const current = params?.locale ?? "en"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Change language"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Globe className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {LOCALES.map((loc) => (
          <DropdownMenuItem
            key={loc}
            className={loc === current ? "font-medium" : ""}
            render={<Link href={pathname} locale={loc} />}
          >
            <span className="mr-2 font-mono text-xs uppercase">{loc}</span>
            {LABELS[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
