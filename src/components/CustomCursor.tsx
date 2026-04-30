"use client"

import { useEffect, useRef } from "react"

const SIZE = 14

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const targetX = useRef(0)
  const targetY = useRef(0)
  const x = useRef(0)
  const y = useRef(0)
  const lastX = useRef(0)
  const lastY = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetX.current = e.clientX
      targetY.current = e.clientY
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useEffect(() => {
    let raf = 0
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
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
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
