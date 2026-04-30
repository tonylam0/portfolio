"use client"

import { memo } from "react"
import { GrainGradient } from "@paper-design/shaders-react"

// The shader package defaults to minPixelRatio=2 and maxPixelCount=4K*2x (~8.3M
// pixels per frame). For a soft, noisy gradient that's pure waste — capping the
// render budget here drops GPU fragment work by ~75% with no perceptible change.
const MIN_PIXEL_RATIO = 1
const MAX_PIXEL_COUNT = 1280 * 720

function PaperDesignShaderBackgroundImpl() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        minPixelRatio={MIN_PIXEL_RATIO}
        maxPixelCount={MAX_PIXEL_COUNT}
        colorBack="#efe7dc"
        softness={0.82}
        intensity={0.28}
        noise={0.08}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1.08}
        rotation={-4}
        speed={0.45}
        colors={["#e7dccf", "#d7c5b2", "#c7b5a0", "#b8a58f"]}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(231, 231, 255, 0.38),transparent_52%),radial-gradient(circle_at_84%_22%,rgba(138,102,76,0.14),transparent_56%),radial-gradient(circle_at_72%_78%,rgba(84,66,54,0.08),transparent_58%)]" />
    </div>
  )
}

export const PaperDesignShaderBackground = memo(PaperDesignShaderBackgroundImpl)
