import { z } from "zod"

export const pilotFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Please enter your name" })
    .max(80),
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .max(160),
  company: z
    .string()
    .min(2, { message: "Please enter your company" })
    .max(120),
  role: z.string().max(120).optional().or(z.literal("")),
  teamSize: z.enum(["1-5", "6-15", "16-30", "31-50", "50+"], {
    message: "Select a team size",
  }),
  timeline: z.enum(["now", "1-3m", "3-6m", "exploring"], {
    message: "Select a timeline",
  }),
  message: z.string().max(2000).optional().or(z.literal("")),
  // honeypot — checked server-side, not validated here
  website: z.string().max(200).optional().or(z.literal("")),
})

export type PilotFormValues = z.infer<typeof pilotFormSchema>
