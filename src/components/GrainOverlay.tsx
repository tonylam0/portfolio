const NOISE_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E" +
  "%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E" +
  "%3Crect width='180' height='180' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"

const COARSE_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E" +
  "%3Cfilter id='c'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.55' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E" +
  "%3Crect width='80' height='80' filter='url(%23c)' opacity='1'/%3E%3C/svg%3E"

export function GrainOverlay() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[5]"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
          opacity: 0.22,
          mixBlendMode: "multiply",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[6]"
        style={{
          backgroundImage: `url("${COARSE_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "80px 80px",
          opacity: 0.09,
          mixBlendMode: "overlay",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[7]"
        style={{
          background:
            "radial-gradient(ellipse 88% 85% at 50% 50%, transparent 48%, rgba(20,14,8,0.55) 100%)",
        }}
      />
    </>
  )
}
