import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(10).max(4000),
})

function escapeForText(input: string) {
  // Keep it simple: email text body doesn't need HTML escaping because we only send plain text.
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

  const fromEmail = process.env.CONTACT_FROM_EMAIL || toEmail
  const fromName = process.env.CONTACT_FROM_NAME || "Portfolio"

  const resend = new Resend(resendApiKey)

  const plainText = `New portfolio contact message\n\nFrom: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`

  try {
    await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [toEmail],
      subject: `Portfolio contact from ${name}`,
      replyTo: email,
      text: plainText,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    const err = e instanceof Error ? e.message : "Unknown error"
    return NextResponse.json({ ok: false, error: err }, { status: 500 })
  }
}

