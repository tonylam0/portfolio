"use client"

import { useEffect, useRef, useState } from "react"
import { projects } from "@/content/projects"

const TAG_STYLES: Record<string, { color: string; background: string }> = {
  AI: { color: "#6f4a84", background: "rgba(123,79,142,0.12)" },
  Web: { color: "#4c8f81", background: "rgba(95,168,152,0.12)" },
  Math: { color: "#756c2a", background: "rgba(196,190,90,0.17)" },
  Simulation: { color: "#356b61", background: "rgba(172,207,163,0.22)" },
  Creative: { color: "#8f3b71", background: "rgba(196,127,168,0.16)" },
}

const REST_EPSILON = 0.1

export function ProjectList() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const previewRef = useRef<HTMLDivElement | null>(null)
  const smoothPos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const tick = () => {
      smoothPos.current.x += (targetPos.current.x - smoothPos.current.x) * 0.13
      smoothPos.current.y += (targetPos.current.y - smoothPos.current.y) * 0.13

      const el = previewRef.current
      if (el) {
        el.style.left = `${smoothPos.current.x + 24}px`
        el.style.top = `${smoothPos.current.y - 84}px`
      }

      const dx = targetPos.current.x - smoothPos.current.x
      const dy = targetPos.current.y - smoothPos.current.y
      if (Math.hypot(dx, dy) < REST_EPSILON) {
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
      targetPos.current.x = e.clientX
      targetPos.current.y = e.clientY
      startLoop()
    }

    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6a6050]">
          Projects
        </h2>
      </div>

      {/* Floating preview card */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-50 overflow-hidden rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.22)] transition-[opacity,transform] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          width: 260,
          height: 168,
          left: 0,
          top: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.88)",
          willChange: "transform, left, top",
        }}
      >
        {projects.map((p) => (
          <div
            key={p.id}
            className="absolute inset-0 transition-[opacity,transform,filter] duration-[400ms] ease-out"
            style={{
              opacity: hoveredId === p.id ? 1 : 0,
              transform: hoveredId === p.id ? "scale(1)" : "scale(1.08)",
              filter: hoveredId === p.id ? "none" : "blur(6px)",
            }}
          >
            {p.previewImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.previewImage}
                alt={p.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="h-full w-full"
                style={{ background: "linear-gradient(135deg,#1a1a2e,#2d2d4e)" }}
              />
            )}
          </div>
        ))}
        <div className="absolute inset-0 rounded-[10px] bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Project rows */}
      {projects.map((p) => (
        <a
          key={p.id}
          href={p.links?.[0]?.href ?? "#"}
          target={p.links?.[0]?.href ? "_blank" : undefined}
          rel="noreferrer"
          className="project-row group relative block no-underline"
          onMouseEnter={() => {
            setHoveredId(p.id)
            setVisible(true)
          }}
          onMouseLeave={() => {
            setVisible(false)
            setHoveredId(null)
          }}
        >
          {/* Hover slab */}
          <div className="absolute inset-y-1 -inset-x-3 rounded-lg bg-[rgba(172,207,163,0.22)] opacity-0 transition-[opacity,transform] duration-[250ms] ease-out group-hover:opacity-100" />

          <div className="relative flex items-start justify-between gap-6 border-t border-[rgba(30,26,22,0.12)] py-4 last:border-b">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-1.5">
                <span className="project-link proj-name text-[15px] font-semibold lowercase tracking-[-0.022em] text-[#1e1a16]">
                  {p.title}
                </span>
                <svg
                  className="arrow h-[14px] w-[14px] shrink-0 text-[#6a6050] opacity-0 -translate-x-1 translate-y-1 transition-[opacity,transform] duration-[250ms] ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
              <p className="text-[12px] font-normal leading-[1.55] lowercase tracking-[-0.011em] text-[#6a6050] transition-colors duration-200 group-hover:text-[#3a342c]">
                {p.listDescription ?? p.description}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-2">
              <span className="font-mono text-[10px] text-[#8a8070] transition-colors duration-200 group-hover:text-[#3a342c]">
                {p.year ?? "2024"}
              </span>
              <div className="flex flex-wrap justify-end gap-2">
                {p.tags.map((tag) => {
                  const s = TAG_STYLES[tag] ?? { color: "#6a6050", background: "rgba(0,0,0,0.05)" }
                  return (
                    <span
                      key={tag}
                      className="rounded-[10px] px-2 py-[3px] text-[9px] font-semibold lowercase tracking-[0.01em]"
                      style={{ color: s.color, background: s.background }}
                    >
                      {tag}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
