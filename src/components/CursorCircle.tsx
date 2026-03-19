"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"

export function CursorCircle() {
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(true)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 420, damping: 34 })
  const y = useSpring(rawY, { stiffness: 420, damping: 34 })

  useEffect(() => {
    // Disable on touch/coarse pointers.
    const media = window.matchMedia?.("(pointer: coarse)")
    if (media?.matches) {
      window.setTimeout(() => setEnabled(false), 0)
      return
    }

    if (reducedMotion) {
      window.setTimeout(() => setEnabled(false), 0)
      return
    }

    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        rawX.set(e.clientX)
        rawY.set(e.clientY)
      })
    }

    const onLeave = () => {
      // Move offscreen instead of toggling display to keep it simple/stable.
      rawX.set(-9999)
      rawY.set(-9999)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
    }
  }, [rawX, rawY, reducedMotion])

  const ringStyle = useMemo(() => {
    // Keep it subtle so it doesn’t fight with the design.
    return {
      width: 34,
      height: 34,
      borderRadius: 9999,
    } as const
  }, [])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-multiply"
      style={{
        translateX: "-50%",
        translateY: "-50%",
        left: x,
        top: y,
      }}
    >
      <motion.div
        style={ringStyle}
        className="rounded-full border border-[#1C352D]/35 bg-transparent shadow-sm backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
    </motion.div>
  )
}

