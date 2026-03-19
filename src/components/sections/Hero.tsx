"use client"

import { useCallback, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { CopyIcon, MailIcon, SparklesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const defaultEmail = "you@example.com"

export function Hero() {
  const email = useMemo(() => {
    return process.env.NEXT_PUBLIC_CONTACT_EMAIL || defaultEmail
  }, [])

  const [copied, setCopied] = useState(false)

  const onCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // If clipboard API fails, do nothing (user can still type contact form).
    }
  }, [email])

  const onViewProjects = useCallback(() => {
    const el = document.getElementById("projects")
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <section aria-label="Hero" className="relative overflow-hidden py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(132,204,22,0.18),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.18),transparent_45%)]"
      />

      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-7"
        >
          <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200">
            <span className="font-medium">Hi! I am Tony Lam</span>
          </div>

          <div className="flex flex-col gap-4">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.45 }}
              className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              Building apps that feel fast and look calm.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.45 }}
              className="max-w-2xl text-pretty text-zinc-600 dark:text-zinc-300"
            >
              I like to take ideas from prototype to polished UI. Projects below are interactive,
              and my learning status stays up to date.
            </motion.p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={onCopyEmail}
              variant="secondary"
              className="gap-2"
            >
              {copied ? (
                <MailIcon className="size-4" />
              ) : (
                <CopyIcon className="size-4" />
              )}
              {copied ? "Copied!" : "Copy email"}
            </Button>

            <Button onClick={onViewProjects} variant="outline" className="gap-2">
              View projects
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

