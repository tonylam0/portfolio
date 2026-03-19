"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { z } from "zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
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

export function ContactForm() {
  const [sending, setSending] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  })

  const onSubmit = async (values: FormValues) => {
    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data: unknown = await res.json().catch(() => null)
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
                className="gap-2"
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

