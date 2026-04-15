import { Circle } from "lucide-react"

export function TerminalPreview() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand/40 via-transparent to-transparent blur-xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-border/70 bg-surface-elevated/80 px-4 py-3">
          <Circle className="h-3 w-3 fill-[#ff5f57] text-[#ff5f57]" />
          <Circle className="h-3 w-3 fill-[#febc2e] text-[#febc2e]" />
          <Circle className="h-3 w-3 fill-[#28c840] text-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-subtle">
            ~/acme-backend · opencode
          </span>
        </div>

        <div className="p-6 font-mono text-[13px] leading-relaxed">
          <p className="text-subtle">
            <span className="text-brand">›</span> where does the payment webhook
            validate the signature?
          </p>

          <div className="mt-5 space-y-3 text-muted-foreground">
            <p>
              <span className="text-success">●</span> Reading 3 chunks from
              index…
            </p>
            <p className="pl-4 text-subtle">
              · src/webhooks/stripe.ts:42{" "}
              <span className="text-subtle/70">verifyWebhookSignature()</span>
            </p>
            <p className="pl-4 text-subtle">
              · src/lib/crypto.ts:18{" "}
              <span className="text-subtle/70">timingSafeCompare()</span>
            </p>
            <p className="pl-4 text-subtle">
              · src/config/stripe.ts:7{" "}
              <span className="text-subtle/70">STRIPE_WEBHOOK_SECRET</span>
            </p>
          </div>

          <div className="mt-6 rounded-lg border border-border/60 bg-background/40 p-4 text-[13px] text-foreground">
            <p>
              Signature validation happens in{" "}
              <span className="text-brand">verifyWebhookSignature()</span> at{" "}
              <span className="text-brand">src/webhooks/stripe.ts:42</span>. It
              uses{" "}
              <span className="text-brand">timingSafeCompare()</span> from{" "}
              <span className="text-brand">src/lib/crypto.ts</span> against{" "}
              <span className="text-brand">STRIPE_WEBHOOK_SECRET</span>, then
              checks the{" "}
              <span className="text-brand">t=</span> timestamp is within 5
              minutes to block replays.
            </p>
            <p className="mt-3 text-subtle">
              <span className="text-success">↳</span> 1.4 s · 312 tokens ·
              on-device
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
