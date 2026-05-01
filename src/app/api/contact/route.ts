import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(1).max(4000),
})

function escapeForText(input: string) {
  return input.replace(/\r\n/g, "\n").trim()
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  const name = escapeForText(parsed.data.name)
  const email = escapeForText(parsed.data.email)
  const message = escapeForText(parsed.data.message)

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    return NextResponse.json({ ok: false, error: "RESEND_API_KEY is not set" }, { status: 500 })
  }

  const toEmail = process.env.CONTACT_TO_EMAIL
  if (!toEmail) {
    return NextResponse.json({ ok: false, error: "CONTACT_TO_EMAIL is not set" }, { status: 500 })
  }

  const rawFromEmail = (process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev").trim()
  const fromEmail = rawFromEmail.replace(/[=;,]+$/, "").trim()
  const fromName = process.env.CONTACT_FROM_NAME || "Portfolio"
  const hasPreformattedFrom = /<[^>]+>/.test(fromEmail)
  const fromValue = hasPreformattedFrom ? fromEmail : `${fromName} <${fromEmail}>`

  const resend = new Resend(resendApiKey)

  const plainText = `New portfolio contact message\n\nFrom: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`

  try {
    const sendResult = await resend.emails.send({
      from: fromValue,
      to: [toEmail],
      subject: `Portfolio contact from ${name}`,
      replyTo: email,
      text: plainText,
    })
    if ((sendResult as { error?: { message?: string } | null } | null)?.error) {
      const resendError =
        (sendResult as { error?: { message?: string } | null } | null)?.error?.message ||
        "Resend reported an unknown error"
      return NextResponse.json({ ok: false, error: resendError }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    const err = e instanceof Error ? e.message : "Unknown error"
    return NextResponse.json({ ok: false, error: err }, { status: 500 })
  }
}
