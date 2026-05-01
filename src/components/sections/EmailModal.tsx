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
  const [tried, setTried] = useState(false)

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
        setTried(false)
      }, 250)
      return () => window.clearTimeout(t)
    }
  }, [open])

  const canSubmit =
    name.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(email) &&
    message.trim().length >= 1 &&
    status !== "sending"

  const fieldErrors = tried
    ? {
      name: name.trim().length === 0 ? "name required" : null,
      email: !/\S+@\S+\.\S+/.test(email) ? "valid email required" : null,
      message: message.trim().length === 0 ? "message required" : null,
    }
    : { name: null, email: null, message: null }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTried(true)
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
            className="absolute inset-0"
            style={{
              background: "rgba(30,26,22,0.18)",
              willChange: "opacity",
              contain: "paint",
            }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-label="Send email"
            className="relative w-full max-w-[420px] overflow-hidden rounded-[14px] border shadow-[0_24px_60px_-20px_rgba(30,26,22,0.28)]"
            style={{
              background: "rgba(240,235,227,0.42)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              borderColor: "rgba(255,255,255,0.3)",
              isolation: "isolate",
            }}
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className="px-6 pb-6 pt-5">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6a6050]">
                  Send a message
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[14px] leading-none font-light text-[#6a6050] transition-colors hover:text-[#1e1a16]"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <p className="mb-6 text-[12px] leading-relaxed tracking-[-0.011em] lowercase text-[#6a6050]">
                drop a line and i&apos;ll get back as soon as i can.
              </p>

              {status === "sent" ? (
                <div className="flex flex-col gap-3 py-6 text-center">
                  <p className="text-[14px] font-semibold tracking-[-0.022em] lowercase text-[#1e1a16]">
                    message sent.
                  </p>
                  <p className="text-[12px] leading-relaxed tracking-[-0.011em] lowercase text-[#6a6050]">
                    thanks for sending the message.
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
                <form onSubmit={onSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-0.5">
                    <input
                      className="modal-input"
                      placeholder="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                    />
                    {fieldErrors.name && (
                      <p className="text-[10px] lowercase text-[#a04040]">{fieldErrors.name}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <input
                      className="modal-input"
                      placeholder="email"
                      type="text"
                      inputMode="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                    {fieldErrors.email && (
                      <p className="text-[10px] lowercase text-[#a04040]">{fieldErrors.email}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <textarea
                      className="modal-input min-h-[110px] resize-y"
                      placeholder="your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    {fieldErrors.message && (
                      <p className="text-[10px] lowercase text-[#a04040]">{fieldErrors.message}</p>
                    )}
                  </div>

                  {status === "error" && errorMsg ? (
                    <p className="text-[11px] lowercase text-[#a04040]">
                      {errorMsg}
                    </p>
                  ) : null}

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] lowercase text-[#a09880]">
                      {message.length}/280
                    </span>
                    <button
                      type="submit"
                      aria-disabled={!canSubmit}
                      className={`group relative bg-transparent p-0 text-[12px] lowercase text-[#6a6050] transition-colors duration-200 hover:text-[#1e1a16] ${!canSubmit ? "opacity-50" : ""
                        }`}
                    >
                      <span className="inline-flex items-center gap-1">
                        {status === "sending" ? "sending…" : "send"}
                        <span className="translate-x-0 opacity-0 transition-[transform,opacity] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                          →
                        </span>
                      </span>
                      <span className="absolute -bottom-[2px] left-0 h-px w-0 bg-[rgba(30,26,22,0.55)] transition-all duration-200 group-hover:w-full" />
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
