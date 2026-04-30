import { memo } from "react"

const NOISE_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E" +
  "%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E" +
  "%3Crect width='180' height='180' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"

const COARSE_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E" +
  "%3Cfilter id='c'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E" +
  "%3Crect width='80' height='80' filter='url(%23c)' opacity='1'/%3E%3C/svg%3E"

const SPECKLE_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E" +
  "%3Cfilter id='s'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E" +
  "%3Crect width='140' height='140' filter='url(%23s)' opacity='1'/%3E%3C/svg%3E"

function GrainOverlayImpl() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[40]"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
          opacity: 0.34,
          mixBlendMode: "multiply",
          filter: "contrast(125%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[41]"
        style={{
          backgroundImage: `url("${COARSE_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "72px 72px",
          opacity: 0.22,
          mixBlendMode: "soft-light",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[42]"
        style={{
          backgroundImage: `url("${SPECKLE_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "120px 120px",
          opacity: 0.12,
          mixBlendMode: "overlay",
        }}
      />
    </>
  )
}

export const GrainOverlay = memo(GrainOverlayImpl)
