"use client"

import { memo, useEffect, useState } from "react"
import { GrainGradient } from "@paper-design/shaders-react"

const MIN_PIXEL_RATIO = 1
const MAX_PIXEL_COUNT = 960 * 540
const BASE_SPEED = 0.45
const NORMAL_FPS = 30
const SLOW_FPS = 7
const NORMAL_INTERVAL_MS = 1000 / NORMAL_FPS
const SLOW_INTERVAL_MS = 1000 / SLOW_FPS
const FRAME_STEP = BASE_SPEED * NORMAL_INTERVAL_MS

const WEBGL_ATTRS = {
  powerPreference: "high-performance" as const,
  antialias: false,
}

type Props = {
  slowed?: boolean
}

function PaperDesignShaderBackgroundImpl({ slowed = false }: Props) {
  const [frame, setFrame] = useState(0)
  const intervalMs = slowed ? SLOW_INTERVAL_MS : NORMAL_INTERVAL_MS

  useEffect(() => {
    let id: ReturnType<typeof setInterval> | null = null
    const start = () => {
      if (id !== null) return
      id = setInterval(() => setFrame((f) => f + FRAME_STEP), intervalMs)
    }
    const stop = () => {
      if (id === null) return
      clearInterval(id)
      id = null
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    start()
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      stop()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [intervalMs])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        minPixelRatio={MIN_PIXEL_RATIO}
        maxPixelCount={MAX_PIXEL_COUNT}
        webGlContextAttributes={WEBGL_ATTRS}
        colorBack="#efe7dc"
        softness={0.82}
        intensity={0.28}
        noise={0.08}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1.08}
        rotation={-4}
        speed={0}
        frame={frame}
        colors={["#e7dccf", "#d7c5b2", "#c7b5a0", "#b8a58f"]}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(231, 231, 255, 0.38),transparent_52%),radial-gradient(circle_at_84%_22%,rgba(138,102,76,0.14),transparent_56%),radial-gradient(circle_at_72%_78%,rgba(84,66,54,0.08),transparent_58%)]" />
    </div>
  )
}

export const PaperDesignShaderBackground = memo(PaperDesignShaderBackgroundImpl)
