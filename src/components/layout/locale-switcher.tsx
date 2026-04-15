"use client"

import { useParams, usePathname, useRouter } from "next/navigation"
import { Globe } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LOCALES } from "@/lib/constants"

const LABELS: Record<string, string> = {
  en: "English",
  cs: "Čeština",
}

export function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname() ?? "/"
  const params = useParams<{ locale: string }>()
  const current = params?.locale ?? "en"

  const switchTo = (next: string) => {
    const segments = pathname.split("/")
    if (segments[1] && LOCALES.includes(segments[1] as (typeof LOCALES)[number])) {
      segments[1] = next
    } else {
      segments.splice(1, 0, next)
    }
    router.push(segments.join("/") || `/${next}`)
  }

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
            onSelect={() => switchTo(loc)}
            className={loc === current ? "font-medium" : ""}
          >
            <span className="mr-2 font-mono text-xs uppercase">{loc}</span>
            {LABELS[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
