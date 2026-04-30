"use client"

import { memo, useEffect, useState } from "react"
import { AnimatePresence, motion, type Transition } from "framer-motion"

type Props = {
  open: boolean
  onClose: () => void
}

type SendStatus = "idle" | "sending" | "sent" | "error"

// Hoisted to module scope so React/Framer Motion see stable object identities
// across keystroke re-renders. New literals on every render force Framer to
// diff and reapply inline styles, which can invalidate the panel's expensive
// backdrop-filter compositor layer.
const OVERLAY_INITIAL = { opacity: 0 }
const OVERLAY_ANIMATE = { opacity: 1 }
const OVERLAY_EXIT = { opacity: 0 }
const OVERLAY_TRANSITION: Transition = { duration: 0.18 }

// The scrim is a flat alpha overlay — no backdrop-filter. We previously stacked
// `backdrop-blur-md` over the entire viewport beneath the panel's own 20px blur,
// which forced the compositor to evaluate two backdrop-filters per frame for
// anything reading through it. The panel's own blur dominates the visual, so
// dropping the scrim's blur is imperceptible while removing a full-viewport
// per-frame filter pass. `willChange: opacity` lets the fade-in run on its own
// composited layer so it doesn't repaint the rest of the page.
const SCRIM_STYLE = {
  background: "rgba(30,26,22,0.18)",
  willChange: "opacity",
  contain: "paint",
} as const

// `contain: layout paint style` + `willChange: transform, opacity` promote the
// panel to its own GPU layer so its expensive `backdrop-filter: blur(20px)`
// output is rasterized once and cached as a compositor texture. `isolation:
// isolate` makes that explicit by creating a fresh stacking context, which
// also keeps any future blend-mode descendants from forcing repaints in the
// surrounding tree.
const PANEL_STYLE = {
  background: "rgba(240,235,227,0.42)",
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  borderColor: "rgba(255,255,255,0.3)",
  contain: "layout paint style",
  isolation: "isolate",
  willChange: "transform, opacity",
} as const

const PANEL_INITIAL = { opacity: 0, y: 14, scale: 0.97 }
const PANEL_ANIMATE = { opacity: 1, y: 0, scale: 1 }
const PANEL_EXIT = { opacity: 0, y: 8, scale: 0.98 }
const PANEL_TRANSITION: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
}

function EmailModalImpl({ open, onClose }: Props) {
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
          initial={OVERLAY_INITIAL}
          animate={OVERLAY_ANIMATE}
          exit={OVERLAY_EXIT}
          transition={OVERLAY_TRANSITION}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            style={SCRIM_STYLE}
            onClick={onClose}
            initial={OVERLAY_INITIAL}
            animate={OVERLAY_ANIMATE}
            exit={OVERLAY_EXIT}
          />

          <motion.div
            role="dialog"
            aria-label="Send email"
            className="relative w-full max-w-[420px] overflow-hidden rounded-[14px] border shadow-[0_24px_60px_-20px_rgba(30,26,22,0.28)]"
            style={PANEL_STYLE}
            initial={PANEL_INITIAL}
            animate={PANEL_ANIMATE}
            exit={PANEL_EXIT}
            transition={PANEL_TRANSITION}
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
                <form onSubmit={onSubmit} className="flex flex-col gap-3">
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

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] lowercase text-[#a09880]">
                      {message.length}/280 — 2-4 sentences is plenty
                    </span>
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="group relative bg-transparent p-0 text-[12px] lowercase text-[#6a6050] transition-colors duration-200 hover:text-[#1e1a16] disabled:cursor-not-allowed disabled:opacity-50"
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

export const EmailModal = memo(EmailModalImpl)
