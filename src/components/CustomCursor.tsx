"use client"

import { memo, useEffect, useRef } from "react"

const SIZE = 30
// Stop the rAF loop once we're within this many pixels of the target. Restarts
// on the next mousemove. Keeps the cursor pixel-identical when in motion while
// freeing the compositor when the user isn't moving the mouse.
const REST_EPSILON = 0.05

function CustomCursorImpl() {
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
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{
        width: SIZE,
        height: SIZE,
        borderRadius: "50%",
        border: "1.5px solid rgba(255,255,255,0.85)",
        willChange: "transform",
      }}
    />
  )
}

export const CustomCursor = memo(CustomCursorImpl)
