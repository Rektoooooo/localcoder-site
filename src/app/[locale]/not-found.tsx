import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-24">
      <div className="hero-glow" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div className="relative mx-auto max-w-xl px-6 text-center">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
          404
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
          Page not found
        </h1>
        <p className="mt-5 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Button
            size="lg"
            className="h-12 gap-2 px-6"
            nativeButton={false}
            render={<Link href="/" />}
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Button>
        </div>
      </div>
    </section>
  )
}
