import type { MetadataRoute } from "next"

import { routing } from "@/i18n/routing"

export const dynamic = "force-static"

const ROUTES = ["", "/product", "/hardware", "/security", "/about", "/pilot"]

const BASE_URL = "https://localcoder.cz"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const route of ROUTES) {
    const alternates = Object.fromEntries(
      routing.locales.map((loc) => [loc, `${BASE_URL}/${loc}${route}`])
    )
    for (const loc of routing.locales) {
      entries.push({
        url: `${BASE_URL}/${loc}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.7,
        alternates: { languages: alternates },
      })
    }
  }

  return entries
}
