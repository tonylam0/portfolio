"use client"

import { useCallback, useMemo, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { CopyIcon, MailIcon } from "lucide-react"
import headshot from "@/assets/headshot.png"

import { Button } from "@/components/ui/button"
import { LearningStatus } from "@/components/learning/LearningStatus"

const defaultEmail = "you@example.com"
const displayName = "Tony Lam"

function initialsFromName(name: string) {
  const parts = name.split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : ""
  return (first + last).toUpperCase()
}

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
    }
  }, [email])

  const onViewProjects = useCallback(() => {
    const el = document.getElementById("projects")
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const initials = useMemo(() => initialsFromName(displayName), [])

  return (
    <section aria-label="Hero" className="relative overflow-hidden py-36 md:py-52">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-white"
      />

      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-zinc-700">
              <span className="font-semibold">
                Available for work
              </span>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.45 }}
                className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
              >
               Hi, I&apos;m Tony 
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.45 }}
                className="max-w-2xl text-pretty text-zinc-600"
              >
              <p className="text-zinc-600">
                Tinkering with <span className="text-[#1C352D] font-bold">Neovim</span>, 
                the <span className="text-[#1C352D] font-bold">gym</span>, 
                and scaling <span className="text-[#1C352D] font-bold">full-stack architecture</span>.
              </p>
              </motion.p>
            </div>

            <div className="pt-4">
              <LearningStatus compact showSection={false} />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                onClick={onCopyEmail}
                variant="secondary"
                className="cursor-pointer gap-2"
              >
                {copied ? <MailIcon className="size-4" /> : <CopyIcon className="size-4" />}
                {copied ? "Copied!" : "Copy email"}
              </Button>

              <Button
                onClick={onViewProjects}
                variant="outline"
                className="cursor-pointer gap-2"
              >
                View projects
              </Button>
            </div>
          </div>

          <div className="mt-8 flex w-full justify-center md:mt-0 md:w-[260px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.5, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-[#1C352D]/25 bg-zinc-50 shadow-sm"
              whileHover={{ y: -2 }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(28,53,45,0.18),transparent_45%)]"
              />

              {headshot ? (
                <Image
                  src={headshot}
                  alt={`${displayName} headshot`}
                  width={260}
                  height={260}
                  className="h-[260px] w-[260px] object-cover"
                  priority
                />
              ) : (
                <div className="flex h-[260px] w-[260px] items-center justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#1C352D]/30 bg-[#1C352D]/5">
                    <span className="text-3xl font-extrabold tracking-wide text-[#1C352D]">
                      {initials}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
