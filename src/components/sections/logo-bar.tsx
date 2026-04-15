import { useTranslations } from "next-intl"

const LOGOS = [
  "Apple Silicon",
  "Ollama",
  "OpenCode",
  "Qwen",
  "DeepSeek",
  "Tree-sitter",
]

export function LogoBar() {
  const t = useTranslations("LogoBar")

  return (
    <section className="relative border-y border-border/40 bg-surface/30 py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent"
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-10">
          <p className="shrink-0 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-subtle">
            {t("builtOn")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-10">
            {LOGOS.map((logo, i) => (
              <div
                key={logo}
                className="flex items-center gap-8 md:gap-10"
              >
                <span className="text-sm font-medium tracking-tight text-muted-foreground/80 transition-colors hover:text-foreground">
                  {logo}
                </span>
                {i < LOGOS.length - 1 && (
                  <span
                    className="hidden h-1 w-1 rounded-full bg-border md:inline-block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
