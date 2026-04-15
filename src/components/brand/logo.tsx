import { BRAND } from "@/lib/constants"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="1.5"
          y="1.5"
          width="21"
          height="21"
          rx="6"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="6"
          y="6"
          width="12"
          height="12"
          rx="3"
          fill="var(--brand)"
        />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight">
        {BRAND.name}
      </span>
    </span>
  )
}
