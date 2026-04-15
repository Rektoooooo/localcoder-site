"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ArrowRight, Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { pilotFormSchema, type PilotFormValues } from "@/lib/schemas"
import { cn } from "@/lib/utils"

const TEAM_SIZES = [
  { value: "1-5", label: "1–5" },
  { value: "6-15", label: "6–15" },
  { value: "16-30", label: "16–30" },
  { value: "31-50", label: "31–50" },
  { value: "50+", label: "50+" },
] as const

const TIMELINES = [
  { value: "now", label: "Ready now" },
  { value: "1-3m", label: "1–3 months" },
  { value: "3-6m", label: "3–6 months" },
  { value: "exploring", label: "Just exploring" },
] as const

export function PilotForm() {
  const [submitted, setSubmitted] = React.useState(false)

  const form = useForm<PilotFormValues>({
    resolver: zodResolver(pilotFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      teamSize: undefined,
      timeline: undefined,
      message: "",
      website: "",
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = form

  const teamSize = watch("teamSize")
  const timeline = watch("timeline")

  const onSubmit = async (values: PilotFormValues) => {
    try {
      const res = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error("request_failed")
      setSubmitted(true)
      toast.success("Thanks — we'll reach out within 2 business days.")
    } catch {
      toast.error("Something went wrong. Please try again or email us.")
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/5 p-10 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-success/30 bg-success/10 text-success">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight">
          Request received
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          We&apos;ll reach out within two business days to schedule a call and
          scope the pilot.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-7"
      noValidate
    >
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <Input
            placeholder="Jan Novák"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>

        <Field label="Work email" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="jan@company.cz"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>

        <Field label="Company" error={errors.company?.message}>
          <Input
            placeholder="Acme s.r.o."
            autoComplete="organization"
            aria-invalid={!!errors.company}
            {...register("company")}
          />
        </Field>

        <Field label="Role" optional error={errors.role?.message}>
          <Input
            placeholder="CTO / Head of Engineering"
            autoComplete="organization-title"
            {...register("role")}
          />
        </Field>
      </div>

      <Field label="Team size" error={errors.teamSize?.message}>
        <div className="flex flex-wrap gap-2">
          {TEAM_SIZES.map((opt) => (
            <ToggleChip
              key={opt.value}
              selected={teamSize === opt.value}
              onClick={() =>
                setValue("teamSize", opt.value, { shouldValidate: true })
              }
            >
              {opt.label}
            </ToggleChip>
          ))}
        </div>
      </Field>

      <Field label="Timeline" error={errors.timeline?.message}>
        <div className="flex flex-wrap gap-2">
          {TIMELINES.map((opt) => (
            <ToggleChip
              key={opt.value}
              selected={timeline === opt.value}
              onClick={() =>
                setValue("timeline", opt.value, { shouldValidate: true })
              }
            >
              {opt.label}
            </ToggleChip>
          ))}
        </div>
      </Field>

      <Field
        label="Anything we should know?"
        optional
        error={errors.message?.message}
      >
        <Textarea
          placeholder="Stack, repos, concerns, constraints…"
          rows={5}
          {...register("message")}
        />
      </Field>

      <div className="flex items-center justify-between gap-4 border-t border-border/50 pt-6">
        <p className="text-xs text-subtle">
          We&apos;ll reply within 2 business days.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-11 gap-2 px-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Request pilot
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string
  optional?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        {optional && (
          <span className="text-[11px] text-subtle">Optional</span>
        )}
      </div>
      {children}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}

function ToggleChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
        selected
          ? "border-brand/60 bg-brand/10 text-foreground shadow-sm shadow-brand/20"
          : "border-border bg-surface/40 text-muted-foreground hover:border-border-strong hover:text-foreground"
      )}
    >
      {children}
    </button>
  )
}
