export function TerminalPreview() {
  return (
    <div className="terminal-wrap relative">
      <div className="terminal-glow" aria-hidden="true" />
      <div className="terminal-3d relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d0d10] shadow-2xl shadow-black/60 ring-1 ring-white/[0.04]">
        {/* Chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#121216] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-4 font-mono text-[11px] text-[#6b6b75]">
            <span className="text-[#a1a1aa]">~/acme-backend</span>
            <span className="mx-2 text-[#3f3f46]">·</span>
            <span>opencode</span>
          </div>
          <div className="ml-auto flex items-center gap-2 rounded-md border border-[#1f1f23] bg-black/40 px-2 py-1 text-[10px] font-mono text-[#a1a1aa]">
            <span className="pulse-dot relative h-1.5 w-1.5 rounded-full text-[#10b981]">
              <span className="absolute inset-0 rounded-full bg-[#10b981]" />
            </span>
            <span>On-device</span>
          </div>
        </div>

        {/* Body */}
        <div className="relative p-5 font-mono text-[12.5px] leading-[1.7]">
          {/* Subtle inner glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(225,29,72,0.06),transparent_70%)]"
          />

          <div className="relative">
            {/* Prompt */}
            <div className="flex items-start gap-3">
              <span className="shrink-0 select-none text-[#e11d48]">❯</span>
              <span className="text-[#d4d4d8]">
                where does the payment webhook validate the signature?
              </span>
            </div>

            {/* Retrieval steps */}
            <div className="mt-5 space-y-1.5">
              <div className="flex items-center gap-2 text-[#71717a]">
                <span className="text-[#10b981]">●</span>
                <span>Retrieving 3 chunks from local index</span>
                <span className="ml-2 text-[#3f3f46]">142 ms</span>
              </div>
              <div className="pl-5 font-mono text-[11.5px]">
                <span className="text-[#6b6b75]">└─ </span>
                <span className="text-[#a78bfa]">src/webhooks/stripe.ts</span>
                <span className="text-[#52525b]">:</span>
                <span className="text-[#fbbf24]">42</span>
                <span className="ml-2 text-[#52525b]">
                  verifyWebhookSignature()
                </span>
              </div>
              <div className="pl-5 font-mono text-[11.5px]">
                <span className="text-[#6b6b75]">└─ </span>
                <span className="text-[#a78bfa]">src/lib/crypto.ts</span>
                <span className="text-[#52525b]">:</span>
                <span className="text-[#fbbf24]">18</span>
                <span className="ml-2 text-[#52525b]">timingSafeCompare()</span>
              </div>
              <div className="pl-5 font-mono text-[11.5px]">
                <span className="text-[#6b6b75]">└─ </span>
                <span className="text-[#a78bfa]">src/config/stripe.ts</span>
                <span className="text-[#52525b]">:</span>
                <span className="text-[#fbbf24]">7</span>
                <span className="ml-2 text-[#52525b]">
                  STRIPE_WEBHOOK_SECRET
                </span>
              </div>
            </div>

            {/* Answer block */}
            <div className="mt-5 rounded-lg border border-white/[0.06] bg-black/30 p-4">
              <p className="text-[12.5px] leading-[1.75] text-[#d4d4d8]">
                Verified in{" "}
                <span className="text-[#4ec9b0]">verifyWebhookSignature</span>
                <span className="text-[#52525b]">()</span> at{" "}
                <span className="text-[#a78bfa]">
                  src/webhooks/stripe.ts:42
                </span>
                . It calls{" "}
                <span className="text-[#4ec9b0]">timingSafeCompare</span>
                <span className="text-[#52525b]">()</span> from{" "}
                <span className="text-[#a78bfa]">src/lib/crypto.ts</span>{" "}
                against{" "}
                <span className="text-[#f97316]">STRIPE_WEBHOOK_SECRET</span>,
                then checks the{" "}
                <span className="text-[#569cd6]">t=</span> timestamp is within
                a <span className="text-[#ce9178]">5-minute</span> window to
                block replays.
              </p>
            </div>

            {/* Footer stats */}
            <div className="mt-4 flex items-center justify-between border-t border-white/[0.04] pt-4 font-mono text-[10.5px]">
              <div className="flex items-center gap-3 text-[#6b6b75]">
                <span className="flex items-center gap-1.5">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 1.5L10 3.5V8L6 10.5L2 8V3.5L6 1.5Z"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                  <span>Qwen 2.5 Coder 32B</span>
                </span>
                <span className="text-[#3f3f46]">·</span>
                <span>1.4s</span>
                <span className="text-[#3f3f46]">·</span>
                <span>312 tokens</span>
              </div>
              <span className="text-[#10b981]">● local</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
