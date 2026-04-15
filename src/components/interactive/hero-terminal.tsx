"use client"

import { AnimatedTerminal, type TerminalLine } from "./animated-terminal"

const lines: TerminalLine[] = [
  {
    delay: 420,
    node: (
      <div className="mt-5 flex items-center gap-2 text-[#71717a]">
        <span className="text-[#10b981]">●</span>
        <span>Retrieving 3 chunks from local index</span>
        <span className="ml-2 text-[#3f3f46]">142 ms</span>
      </div>
    ),
  },
  {
    delay: 180,
    node: (
      <div className="mt-1.5 pl-5 font-mono text-[11.5px]">
        <span className="text-[#6b6b75]">└─ </span>
        <span className="text-[#a78bfa]">src/webhooks/stripe.ts</span>
        <span className="text-[#52525b]">:</span>
        <span className="text-[#fbbf24]">42</span>
        <span className="ml-2 text-[#52525b]">verifyWebhookSignature()</span>
      </div>
    ),
  },
  {
    delay: 120,
    node: (
      <div className="mt-1.5 pl-5 font-mono text-[11.5px]">
        <span className="text-[#6b6b75]">└─ </span>
        <span className="text-[#a78bfa]">src/lib/crypto.ts</span>
        <span className="text-[#52525b]">:</span>
        <span className="text-[#fbbf24]">18</span>
        <span className="ml-2 text-[#52525b]">timingSafeCompare()</span>
      </div>
    ),
  },
  {
    delay: 120,
    node: (
      <div className="mt-1.5 pl-5 font-mono text-[11.5px]">
        <span className="text-[#6b6b75]">└─ </span>
        <span className="text-[#a78bfa]">src/config/stripe.ts</span>
        <span className="text-[#52525b]">:</span>
        <span className="text-[#fbbf24]">7</span>
        <span className="ml-2 text-[#52525b]">STRIPE_WEBHOOK_SECRET</span>
      </div>
    ),
  },
  {
    delay: 500,
    node: (
      <div className="mt-5 rounded-lg border border-white/[0.06] bg-black/30 p-4">
        <p className="text-[12.5px] leading-[1.75] text-[#d4d4d8]">
          Verified in{" "}
          <span className="text-[#4ec9b0]">verifyWebhookSignature</span>
          <span className="text-[#52525b]">()</span> at{" "}
          <span className="text-[#a78bfa]">src/webhooks/stripe.ts:42</span>.
          It calls <span className="text-[#4ec9b0]">timingSafeCompare</span>
          <span className="text-[#52525b]">()</span> from{" "}
          <span className="text-[#a78bfa]">src/lib/crypto.ts</span> against{" "}
          <span className="text-[#f97316]">STRIPE_WEBHOOK_SECRET</span>, then
          checks the <span className="text-[#569cd6]">t=</span> timestamp is
          within a <span className="text-[#ce9178]">5-minute</span> window to
          block replays.
        </p>
      </div>
    ),
  },
]

export function HeroTerminal() {
  return (
    <AnimatedTerminal
      prompt="where does the payment webhook validate the signature?"
      lines={lines}
      footer={
        <div className="flex items-center justify-between">
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
      }
    />
  )
}
