"use client"

import { memo, useEffect, useRef } from "react"

const SIZE = 30
// Stop the rAF loop once we're within this many pixels of the target. Restarts
// on the next mousemove. Keeps the cursor pixel-identical when in motion while
// freeing the compositor when the user isn't moving the mouse.
const REST_EPSILON = 0.05

type Props = {
  // mix-blend-difference forces the compositor to read the rasterized backdrop
  // beneath the cursor on every move. When a heavy backdrop-filter region is
  // visible (e.g. the email modal's frosted scrim + panel), that read requires
  // re-evaluating the gaussian blur per frame — the dominant cost behind the
  // sluggish cursor. Setting `flat` swaps to a non-blending dark ring, which
  // composites with no readback and stays smooth over filter regions.
  flat?: boolean
}

const CLASS_BASE = "pointer-events-none fixed left-0 top-0 z-[100]"
const CLASS_BLEND = `${CLASS_BASE} mix-blend-difference`
const BORDER_BLEND = "1.5px solid rgba(255,255,255,0.85)"
const BORDER_FLAT = "1.5px solid rgba(30,26,22,0.55)"

function CustomCursorImpl({ flat = false }: Props) {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const targetX = useRef(0)
  const targetY = useRef(0)
  const x = useRef(0)
  const y = useRef(0)
  const lastX = useRef(0)
  const lastY = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const tick = () => {
      const el = dotRef.current
      x.current += (targetX.current - x.current) * 0.22
      y.current += (targetY.current - y.current) * 0.22

      const dx = x.current - lastX.current
      const dy = y.current - lastY.current
      const speed = Math.hypot(dx, dy)
      const angle = Math.atan2(dy, dx)
      const stretch = 1 + Math.min(speed * 0.052, 1.35)
      const squash = 1 / Math.sqrt(stretch)

      if (el) {
        el.style.transform =
          `translate(${x.current - SIZE / 2}px, ${y.current - SIZE / 2}px)` +
          ` rotate(${angle}rad) scaleX(${stretch}) scaleY(${squash})`
      }

      lastX.current = x.current
      lastY.current = y.current

      const distToTarget = Math.hypot(
        targetX.current - x.current,
        targetY.current - y.current,
      )
      if (distToTarget < REST_EPSILON && speed < REST_EPSILON) {
        rafRef.current = null
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    const onMove = (e: MouseEvent) => {
      targetX.current = e.clientX
      targetY.current = e.clientY
      startLoop()
    }

    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className={flat ? CLASS_BASE : CLASS_BLEND}
      style={{
        width: SIZE,
        height: SIZE,
        borderRadius: "50%",
        border: flat ? BORDER_FLAT : BORDER_BLEND,
        willChange: "transform",
        transition: "border-color 200ms ease",
      }}
    />
  )
}

export const CustomCursor = memo(CustomCursorImpl)
