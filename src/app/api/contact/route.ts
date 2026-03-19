import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(10).max(4000),
})

function escapeForText(input: string) {
  return input.replace(/\r\n/g, "\n").trim()
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
    // #region agent log
    fetch("http://127.0.0.1:7629/ingest/7f1887d1-8eb8-473e-a00c-5cbe963c058b",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"a13546"},body:JSON.stringify({sessionId:"a13546",runId:"initial",hypothesisId:"H2",location:"route.ts:POST:parsedBody",message:"Parsed contact body JSON",data:{hasName:Boolean((body as { name?: unknown })?.name),hasEmail:Boolean((body as { email?: unknown })?.email),messageLength:typeof (body as { message?: unknown })?.message === "string" ? ((body as { message?: string }).message?.length ?? 0) : null},timestamp:Date.now()})}).catch(()=>{})
    // #endregion
  } catch {
    // #region agent log
    fetch("http://127.0.0.1:7629/ingest/7f1887d1-8eb8-473e-a00c-5cbe963c058b",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"a13546"},body:JSON.stringify({sessionId:"a13546",runId:"initial",hypothesisId:"H2",location:"route.ts:POST:invalidJson",message:"Failed to parse request JSON",data:{},timestamp:Date.now()})}).catch(()=>{})
    // #endregion
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    // #region agent log
    fetch("http://127.0.0.1:7629/ingest/7f1887d1-8eb8-473e-a00c-5cbe963c058b",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"a13546"},body:JSON.stringify({sessionId:"a13546",runId:"initial",hypothesisId:"H2",location:"route.ts:POST:validationFailed",message:"Contact schema validation failed",data:{issues:parsed.error.flatten().fieldErrors},timestamp:Date.now()})}).catch(()=>{})
    // #endregion
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
    // #region agent log
    fetch("http://127.0.0.1:7629/ingest/7f1887d1-8eb8-473e-a00c-5cbe963c058b",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"a13546"},body:JSON.stringify({sessionId:"a13546",runId:"initial",hypothesisId:"H3",location:"route.ts:POST:missingResendKey",message:"RESEND_API_KEY missing",data:{hasResendKey:false},timestamp:Date.now()})}).catch(()=>{})
    // #endregion
    return NextResponse.json({ ok: false, error: "RESEND_API_KEY is not set" }, { status: 500 })
  }

  const toEmail = process.env.CONTACT_TO_EMAIL
  if (!toEmail) {
    // #region agent log
    fetch("http://127.0.0.1:7629/ingest/7f1887d1-8eb8-473e-a00c-5cbe963c058b",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"a13546"},body:JSON.stringify({sessionId:"a13546",runId:"initial",hypothesisId:"H3",location:"route.ts:POST:missingToEmail",message:"CONTACT_TO_EMAIL missing",data:{hasContactToEmail:false},timestamp:Date.now()})}).catch(()=>{})
    // #endregion
    return NextResponse.json({ ok: false, error: "CONTACT_TO_EMAIL is not set" }, { status: 500 })
  }

  const rawFromEmail = (process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev").trim()
  const fromEmail = rawFromEmail.replace(/[=;,]+$/, "").trim()
  const fromName = process.env.CONTACT_FROM_NAME || "Portfolio"
  if (fromEmail !== rawFromEmail) {
    // #region agent log
    fetch("http://127.0.0.1:7629/ingest/7f1887d1-8eb8-473e-a00c-5cbe963c058b",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"a13546"},body:JSON.stringify({sessionId:"a13546",runId:"post-fix",hypothesisId:"H7",location:"route.ts:POST:normalizedFromEmail",message:"Normalized CONTACT_FROM_EMAIL",data:{rawFromEmail,fromEmail},timestamp:Date.now()})}).catch(()=>{})
    // #endregion
  }
  const hasPreformattedFrom = /<[^>]+>/.test(fromEmail)
  const fromValue = hasPreformattedFrom ? fromEmail : `${fromName} <${fromEmail}>`
  // #region agent log
  fetch("http://127.0.0.1:7629/ingest/7f1887d1-8eb8-473e-a00c-5cbe963c058b",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"a13546"},body:JSON.stringify({sessionId:"a13546",runId:"post-fix",hypothesisId:"H6",location:"route.ts:POST:fromFieldComposed",message:"Composed from field for resend",data:{hasPreformattedFrom,fromValue},timestamp:Date.now()})}).catch(()=>{})
  // #endregion

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
      // #region agent log
      fetch("http://127.0.0.1:7629/ingest/7f1887d1-8eb8-473e-a00c-5cbe963c058b",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"a13546"},body:JSON.stringify({sessionId:"a13546",runId:"post-fix",hypothesisId:"H4",location:"route.ts:POST:resendReturnedErrorField",message:"Resend returned error field without throwing",data:{error:resendError},timestamp:Date.now()})}).catch(()=>{})
      // #endregion
      return NextResponse.json({ ok: false, error: resendError }, { status: 500 })
    }
    // #region agent log
    fetch("http://127.0.0.1:7629/ingest/7f1887d1-8eb8-473e-a00c-5cbe963c058b",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"a13546"},body:JSON.stringify({sessionId:"a13546",runId:"initial",hypothesisId:"H4",location:"route.ts:POST:resendSuccess",message:"Resend call succeeded",data:{resultType:typeof sendResult,hasErrorField:Boolean((sendResult as { error?: unknown } | null)?.error)},timestamp:Date.now()})}).catch(()=>{})
    // #endregion

    return NextResponse.json({ ok: true })
  } catch (e) {
    const err = e instanceof Error ? e.message : "Unknown error"
    // #region agent log
    fetch("http://127.0.0.1:7629/ingest/7f1887d1-8eb8-473e-a00c-5cbe963c058b",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"a13546"},body:JSON.stringify({sessionId:"a13546",runId:"initial",hypothesisId:"H4",location:"route.ts:POST:resendError",message:"Resend call threw error",data:{error:err},timestamp:Date.now()})}).catch(()=>{})
    // #endregion
    return NextResponse.json({ ok: false, error: err }, { status: 500 })
  }
}
