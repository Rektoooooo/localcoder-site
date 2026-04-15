export const BRAND = {
  name: "LocalCoder",
  tagline: "AI coding that never leaves your building.",
  parent: "IC SERVIS s.r.o.",
  contact: "hello@localcoder.cz",
  github: "",
  linkedin: "",
} as const

export const NAV_LINKS = [
  { href: "/product", key: "product" },
  { href: "/hardware", key: "hardware" },
  { href: "/security", key: "security" },
  { href: "/about", key: "about" },
] as const

export const LOCALES = ["en", "cs"] as const
export type Locale = (typeof LOCALES)[number]
