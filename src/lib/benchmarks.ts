export const BENCHMARKS = {
  naiveAvgSeconds: 174.7,
  ragAvgSeconds: 66.4,
  naiveAvgChars: 12771,
  ragAvgChars: 3715,
  speedup: 2.6,
  contextReduction: 3.4,
  hardware: "Apple M1 Pro, 16 GB unified memory",
  model: "Qwen 2.5 Coder 14B (Q4_K_M)",
  repos: ["Express.js", "Next.js", "Private Swift codebase"],
} as const

export type Benchmark = typeof BENCHMARKS
