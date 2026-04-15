import { NextResponse } from "next/server"
import { Resend } from "resend"

import { pilotFormSchema } from "@/lib/schemas"
import { BRAND } from "@/lib/constants"

const resendApiKey = process.env.RESEND_API_KEY
const toAddress = process.env.PILOT_INBOX ?? BRAND.contact
const fromAddress = process.env.PILOT_FROM ?? `LocalCoder <noreply@localcoder.cz>`

export const runtime = "nodejs"

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 })
  }

  const parsed = pilotFormSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.issues },
      { status: 400 }
    )
  }

  // Honeypot — silently accept to avoid telegraphing the field
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const { name, email, company, role, teamSize, timeline, message } =
    parsed.data

  const subject = `New pilot request — ${company} (${teamSize})`

  const lines = [
    `Name:      ${name}`,
    `Email:     ${email}`,
    `Company:   ${company}`,
    role ? `Role:      ${role}` : null,
    `Team size: ${teamSize}`,
    `Timeline:  ${timeline}`,
    "",
    message ? `Message:\n${message}` : null,
  ].filter(Boolean)

  const text = lines.join("\n")

  if (!resendApiKey) {
    // Dev / preview mode: log instead of sending
    console.log("[pilot] (no RESEND_API_KEY — would have sent)")
    console.log(subject)
    console.log(text)
    return NextResponse.json({ ok: true, dev: true })
  }

  try {
    const resend = new Resend(resendApiKey)
    await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject,
      text,
    })
  } catch (err) {
    console.error("[pilot] resend failed", err)
    return NextResponse.json({ error: "send_failed" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
