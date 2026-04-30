"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

type Props = {
  open: boolean
  onClose: () => void
}

type SendStatus = "idle" | "sending" | "sent" | "error"

export function EmailModal({ open, onClose }: Props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<SendStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      const t = window.setTimeout(() => {
        setStatus("idle")
        setErrorMsg("")
      }, 250)
      return () => window.clearTimeout(t)
    }
  }, [open])

  const canSubmit =
    name.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(email) &&
    message.trim().length >= 10 &&
    status !== "sending"

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setStatus("sending")
    setErrorMsg("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      const data: unknown = await res.json().catch(() => null)
      const ok = Boolean((data as { ok?: unknown } | null)?.ok)
      if (!res.ok || !ok) {
        const err =
          (data as { error?: string } | null)?.error || "Something went wrong."
        throw new Error(err)
      }
      setStatus("sent")
      setName("")
      setEmail("")
      setMessage("")
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Could not send.")
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 backdrop-blur-md"
            style={{ background: "rgba(30,26,22,0.18)" }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-label="Send email"
            className="relative w-full max-w-[420px] overflow-hidden rounded-[14px] border border-[rgba(30,26,22,0.10)] shadow-[0_24px_60px_-20px_rgba(30,26,22,0.35)]"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 20% 0%, rgba(196,127,168,0.35) 0%, transparent 60%)," +
                "radial-gradient(ellipse 90% 70% at 100% 100%, rgba(172,207,163,0.40) 0%, transparent 60%)," +
                "rgba(240,235,227,0.92)",
            }}
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className="px-6 pb-6 pt-5">
              <div className="mb-1 flex items-center justify-between">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6a6050]">
                  Send a message
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[18px] leading-none text-[#6a6050] transition-colors hover:text-[#1e1a16]"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <p className="mb-4 text-[12px] lowercase text-[#6a6050]">
                drop a line and i&apos;ll get back as soon as i can.
              </p>

              {status === "sent" ? (
                <div className="flex flex-col gap-3 py-6 text-center">
                  <p className="text-[14px] font-semibold lowercase text-[#1e1a16]">
                    message sent.
                  </p>
                  <p className="text-[12px] lowercase text-[#6a6050]">
                    thanks — i&apos;ll reply soon.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mx-auto mt-2 text-[12px] lowercase underline decoration-[rgba(30,26,22,0.3)] underline-offset-[3px] transition-colors hover:decoration-[#1e1a16]"
                  >
                    close
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-2.5">
                  <input
                    className="modal-input"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                  <input
                    className="modal-input"
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <textarea
                    className="modal-input min-h-[110px] resize-y"
                    placeholder="your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  {status === "error" && errorMsg ? (
                    <p className="text-[11px] lowercase text-[#a04040]">
                      {errorMsg}
                    </p>
                  ) : null}

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] lowercase text-[#a09880]">
                      {message.length}/280 — 2-4 sentences is plenty
                    </span>
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="rounded-full border border-[rgba(30,26,22,0.25)] bg-[rgba(255,255,255,0.5)] px-4 py-1.5 text-[12px] font-semibold lowercase text-[#1e1a16] transition-[background,border-color,opacity] duration-200 hover:bg-[rgba(255,255,255,0.8)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {status === "sending" ? "sending…" : "send"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
