"use client"

import { useCallback, useMemo, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { CopyIcon, FileTextIcon, GithubIcon, LinkedinIcon, MailIcon, SparklesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

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

  const avatarUrl = process.env.NEXT_PUBLIC_AVATAR_URL || ""
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || ""
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || ""
  const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || ""

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

  const initials = useMemo(() => initialsFromName(displayName), [])

  return (
    <section aria-label="Hero" className="relative overflow-hidden py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(28,53,45,0.22),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(28,53,45,0.12),transparent_45%)]"
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
                Hi! I am{" "}
                <span className="font-extrabold text-[#1C352D]">{displayName}</span>
              </span>
            </div>

            <div className="flex flex-col gap-4 pt-4">
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
                className="max-w-2xl text-pretty text-zinc-600"
              >
                I like to take ideas from prototype to polished UI. Projects below are interactive,
                and my learning status stays up to date.
              </motion.p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button onClick={onCopyEmail} variant="secondary" className="gap-2">
                {copied ? <MailIcon className="size-4" /> : <CopyIcon className="size-4" />}
                {copied ? "Copied!" : "Copy email"}
              </Button>

              <Button onClick={onViewProjects} variant="outline" className="gap-2">
                View projects
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {linkedinUrl ? (
                <Button
                  variant="outline"
                  className="h-9 gap-2"
                  onClick={() => window.open(linkedinUrl, "_blank", "noreferrer")}
                >
                  <LinkedinIcon className="size-4" />
                  LinkedIn
                </Button>
              ) : null}

              {githubUrl ? (
                <Button
                  variant="outline"
                  className="h-9 gap-2"
                  onClick={() => window.open(githubUrl, "_blank", "noreferrer")}
                >
                  <GithubIcon className="size-4" />
                  GitHub
                </Button>
              ) : null}

              {resumeUrl ? (
                <Button
                  variant="outline"
                  className="h-9 gap-2"
                  onClick={() => window.open(resumeUrl, "_blank", "noreferrer")}
                >
                  <FileTextIcon className="size-4" />
                  Resume
                </Button>
              ) : null}
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

              {avatarUrl ? (
                <Image
                  src={avatarUrl}
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
