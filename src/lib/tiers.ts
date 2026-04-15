export type Tier = {
  id: string
  name: string
  hardware: string
  price: number // EUR
  priceCzk: number
  ram: string
  model: string
  tokensPerSec: string
  devs: { min: number; max: number }
  does: string[]
  doesNot: string[]
  featured?: boolean
}

export const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    hardware: "Mac Mini M4 Pro",
    price: 2200,
    priceCzk: 55000,
    ram: "48 GB unified",
    model: "Qwen 2.5 Coder 32B (Q4)",
    tokensPerSec: "15–25 tok/s",
    devs: { min: 3, max: 5 },
    does: [
      "Codebase Q&A and navigation",
      "Tests, boilerplate, docs",
      "Small refactors inside a file",
    ],
    doesNot: [
      "Cross-file reasoning on large monorepos",
      "Heavy concurrent load beyond 5 devs",
    ],
  },
  {
    id: "team",
    name: "Team",
    hardware: "Mac Studio M4 Max",
    price: 3800,
    priceCzk: 95000,
    ram: "64 GB unified",
    model: "Llama 3.3 70B (Q4)",
    tokensPerSec: "25–40 tok/s",
    devs: { min: 5, max: 10 },
    does: [
      "Richer reasoning and bug-finding",
      "Multi-file context within a service",
      "Solid code review on your conventions",
    ],
    doesNot: [
      "Frontier architectural design",
      "Very long contexts beyond 32k tokens",
    ],
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    hardware: "Mac Studio M4 Ultra",
    price: 5800,
    priceCzk: 145000,
    ram: "128 GB unified",
    model: "DeepSeek V3 (MoE)",
    tokensPerSec: "35–55 tok/s",
    devs: { min: 10, max: 20 },
    does: [
      "Near-frontier reasoning on most tasks",
      "Multi-service monorepos",
      "Long contexts up to ~64k tokens",
    ],
    doesNot: [
      "Claude Opus-tier edge cases in novel domains",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    hardware: "Mac Studio M4 Ultra",
    price: 9400,
    priceCzk: 235000,
    ram: "192 GB unified",
    model: "GLM-5.1 (1-bit MoE)",
    tokensPerSec: "10–18 tok/s",
    devs: { min: 10, max: 15 },
    does: [
      "Approaching Claude Opus-level intelligence",
      "Complex reasoning, long contexts",
      "Fully on-prem, MIT-licensed model",
    ],
    doesNot: [
      "High concurrency — single large model",
      "Latency-critical UX for big teams",
    ],
  },
  {
    id: "cluster",
    name: "Cluster",
    hardware: "3× Mac Studio cluster",
    price: 22000,
    priceCzk: 550000,
    ram: "256–384 GB combined",
    model: "Smart routing: fast + smart",
    tokensPerSec: "Load-balanced",
    devs: { min: 20, max: 50 },
    does: [
      "Full cloud replacement for most teams",
      "Fast model for easy tasks, smart for hard",
      "Concurrent serving across whole dev org",
    ],
    doesNot: [
      "Beats managed GPU inference on raw throughput",
    ],
  },
]

export function recommendTierForTeamSize(size: number): Tier {
  return (
    TIERS.find((t) => size >= t.devs.min && size <= t.devs.max) ??
    TIERS[TIERS.length - 1]
  )
}
