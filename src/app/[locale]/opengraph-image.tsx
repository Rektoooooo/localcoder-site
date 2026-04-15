import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "LocalCoder — AI coding that never leaves your building"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

type Props = { params: Promise<{ locale: string }> }

export default async function Image({ params }: Props) {
  const { locale } = await params

  const tagline =
    locale === "cs"
      ? "AI kódování, které nikdy neopustí vaši budovu."
      : "AI coding that never leaves your building."

  const headline =
    locale === "cs"
      ? "Ship AI kódování\nbez odesílání kódu."
      : "Ship AI coding\nwithout shipping your code."

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0a0a0b",
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 85% 15%, rgba(225, 29, 72, 0.35), transparent 60%), radial-gradient(ellipse 40% 40% at 10% 90%, rgba(249, 115, 22, 0.15), transparent 60%)",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              border: "2px solid #fafafa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                background: "#e11d48",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            LocalCoder
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontFamily: "monospace",
              color: "#e11d48",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            On-prem AI coding for Czech enterprises
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              whiteSpace: "pre-line",
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#a1a1aa",
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#71717a",
            fontFamily: "monospace",
          }}
        >
          <div>localcoder.cz</div>
          <div style={{ display: "flex", gap: 24 }}>
            <span>Air-gapped</span>
            <span>· GDPR</span>
            <span>· EU AI Act</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
