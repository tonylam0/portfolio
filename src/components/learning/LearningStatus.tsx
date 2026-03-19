"use client"

import { ElementType, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { learningItems } from "@/content/learning"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

function formatUpdatedAt(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export type LearningStatusProps = {
  /**
   * Compact card variant for embedding (hero).
   * Keeps the same interactivity, but reduces spacing/sizing.
   */
  compact?: boolean
  /**
   * Whether to wrap in a <section>. For embedding, use showSection=false.
   */
  showSection?: boolean
}

export function LearningStatus({ compact = false, showSection = true }: LearningStatusProps) {
  const reducedMotion = useReducedMotion()
  const items = learningItems

  const [index, setIndex] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [paused, setPaused] = useState(false)

  const current = items[index]

  const lastUpdated = useMemo(() => {
    return formatUpdatedAt(current.updatedAtISO)
  }, [current.updatedAtISO])

  // Auto-rotate "live" status; pause on hover for a calm UX.
  useEffect(() => {
    if (reducedMotion || paused) return

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, 8000)

    return () => window.clearInterval(id)
  }, [items.length, paused, reducedMotion])

  const wrapClassName = compact ? "px-0" : "px-6"
  const cardPadding = compact ? "p-4" : "p-6"
  const sectionPadding = compact ? "" : "py-14"
  const titleClass = compact ? "text-lg" : "text-xl"

  const Wrapper: ElementType = showSection ? "section" : "div"

  return (
    <Wrapper
      id="learning"
      aria-label="Always learning"
      className={sectionPadding}
    >
      <div className={`mx-auto w-full max-w-5xl ${wrapClassName}`}>
        <Card
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className={`relative overflow-hidden ${cardPadding}`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(28,53,45,0.18),transparent_45%),radial-gradient(circle_at_100%_0%,rgba(28,53,45,0.10),transparent_45%)]"
          />

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <motion.span
                aria-hidden="true"
                className={`relative inline-flex ${compact ? "h-2 w-2" : "h-2.5 w-2.5"} items-center justify-center rounded-full bg-[#1C352D]`}
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <Badge variant="secondary">What I'm current learning</Badge>
            </div>

            <div className="text-right text-xs text-zinc-600 dark:text-zinc-300">
              <div className="font-medium">Last updated</div>
              <div>{lastUpdated}</div>
            </div>
          </div>

          <div
            className={
              compact ? "mt-3 flex flex-col gap-3" : "mt-5 flex flex-col gap-3"
            }
          >
            <AnimatePresence mode="wait">
              <motion.h3
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className={`${titleClass} font-semibold tracking-tight`}
              >
                {current.title}
              </motion.h3>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`${current.id}-summary`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="text-pretty text-zinc-600 dark:text-zinc-300"
              >
                {current.summary}
              </motion.p>
            </AnimatePresence>
          </div>

          <AnimatePresence initial={false}>
            {showDetails ? (
              <motion.div
                key={`${current.id}-details`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mt-4 overflow-hidden"
              >
                <div className="text-sm font-medium">What I’m working on</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
                  {current.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>

                {current.links?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {current.links.map((l) => (
                      <Button
                        key={l.href}
                        variant="outline"
                        className="h-8 px-3 text-xs"
                        type="button"
                        onClick={() => window.open(l.href, "_blank", "noreferrer")}
                      >
                        {l.label}
                      </Button>
                    ))}
                  </div>
                ) : null}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div
            className={
              compact ? "mt-4 flex flex-wrap gap-2" : "mt-6 flex flex-wrap gap-2"
            }
          >
            <Button
              variant="secondary"
              className="gap-2"
              onClick={() => setIndex((i) => (i + 1) % items.length)}
            >
              Next
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowDetails((v) => !v)}
            >
              {showDetails ? "Hide details" : "Show details"}
            </Button>

            <div className="ml-auto self-center text-xs text-zinc-500 dark:text-zinc-400">
              {paused ? "Paused" : reducedMotion ? "Reduced motion" : "Auto-rotating"}
            </div>
          </div>
        </Card>
      </div>
    </Wrapper>
  )
}
