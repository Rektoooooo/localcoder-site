import { cn } from "@/lib/utils"

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-mono font-medium uppercase tracking-[0.14em] text-brand">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance text-3xl font-semibold tracking-[-0.02em] md:text-4xl lg:text-5xl",
          eyebrow && "mt-4"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-[17px]">
          {subtitle}
        </p>
      )}
    </div>
  )
}
