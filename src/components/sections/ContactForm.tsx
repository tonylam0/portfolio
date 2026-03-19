"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { z } from "zod"
import { toast } from "sonner"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(10).max(4000),
})

type FormValues = z.infer<typeof schema>
const quickStartPrompts = [
  {
    label: "Project idea",
    text: "My project idea is ",
  },
  {
    label: "Job opportunity",
    text: "I'd love to talk to you about an internship or role at my company. My company is ",
  },
  {
    label: "Question",
    text: "I have a question about ",
  },
]

export function ContactForm() {
  const [sending, setSending] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  })
  const messageValue = useWatch({ control, name: "message" }) || ""
  const messageLength = messageValue.length
  const goalLength = 280
  const progressValue = Math.min((messageLength / goalLength) * 100, 100)

  const onSubmit = async (values: FormValues) => {
    setSending(true)
    // #region agent log
    fetch("http://127.0.0.1:7629/ingest/7f1887d1-8eb8-473e-a00c-5cbe963c058b",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"a13546"},body:JSON.stringify({sessionId:"a13546",runId:"initial",hypothesisId:"H1",location:"ContactForm.tsx:onSubmit:start",message:"Submitting contact form",data:{hasName:Boolean(values.name),hasEmail:Boolean(values.email),messageLength:values.message?.length ?? 0},timestamp:Date.now()})}).catch(()=>{})
    // #endregion
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data: unknown = await res.json().catch(() => null)
      // #region agent log
      fetch("http://127.0.0.1:7629/ingest/7f1887d1-8eb8-473e-a00c-5cbe963c058b",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"a13546"},body:JSON.stringify({sessionId:"a13546",runId:"initial",hypothesisId:"H1",location:"ContactForm.tsx:onSubmit:response",message:"Received contact API response",data:{status:res.status,resOk:res.ok,apiOk:Boolean((data as { ok?: unknown } | null)?.ok),apiError:(data as { error?: string } | null)?.error ?? null},timestamp:Date.now()})}).catch(()=>{})
      // #endregion
      const ok = Boolean((data as { ok?: unknown } | null)?.ok)
      if (!res.ok || !ok) {
        const error =
          (data as { error?: string } | null)?.error ||
          "Something went wrong sending your message."
        throw new Error(error)
      }

      toast.success("Message sent. I’ll get back to you soon.")
      reset()
    } catch (e) {
      const message = e instanceof Error ? e.message : "Could not send message."
      // #region agent log
      fetch("http://127.0.0.1:7629/ingest/7f1887d1-8eb8-473e-a00c-5cbe963c058b",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"a13546"},body:JSON.stringify({sessionId:"a13546",runId:"initial",hypothesisId:"H5",location:"ContactForm.tsx:onSubmit:catch",message:"Contact form submit failed",data:{errorMessage:message},timestamp:Date.now()})}).catch(()=>{})
      // #endregion
      toast.error(message)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" aria-label="Contact" className="py-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Card className="p-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-balance text-2xl font-semibold tracking-tight">Contact</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Send a message and I’ll respond as soon as I can.
            </p>
          </div>

          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Quick start
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {quickStartPrompts.map((prompt) => (
                <Button
                  key={prompt.label}
                  type="button"
                  variant="outline"
                  className="h-8 cursor-pointer text-xs"
                  onClick={() => {
                    setValue("message", prompt.text, { shouldDirty: true, shouldTouch: true })
                  }}
                >
                  {prompt.label}
                </Button>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 grid gap-4"
          >
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("name")}
              />
              {errors.name ? (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.name.message}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                placeholder="you@email.com"
                autoComplete="email"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
              />
              {errors.email ? (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell me what you’re building (or what you want to improve)."
                aria-invalid={errors.message ? "true" : "false"}
                className="min-h-28"
                {...register("message")}
              />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span>{messageLength < goalLength ? "Tip: 2-4 sentences gives me context fast." : "Great detail level."}</span>
                  <span>{messageLength}/{goalLength}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <motion.div
                    className="h-full rounded-full bg-[#1C352D]"
                    animate={{ width: `${progressValue}%` }}
                    transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  />
                </div>
              </div>
              {errors.message ? (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.message.message}
                </p>
              ) : null}
            </div>

            <motion.div
              initial={false}
              animate={{ opacity: sending ? 0.9 : 1 }}
              className="pt-1"
            >
              <Button
                type="submit"
                disabled={sending}
                className="gap-2 rounded-md bg-black cursor-pointer hover:bg-[#212121]"
              >
                {sending ? (
                  <motion.span
                    aria-hidden="true"
                    className="inline-flex items-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
                  >
                    <span className="inline-block size-4 rounded-full border-2 border-current border-r-transparent" />
                  </motion.span>
                ) : (
                  "Send message"
                )}
              </Button>
            </motion.div>
          </form>
        </Card>
      </div>
    </section>
  )
}

