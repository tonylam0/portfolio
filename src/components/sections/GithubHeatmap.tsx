import { Card } from "@/components/ui/card"

/* eslint-disable @next/next/no-img-element */
export function GithubHeatmap() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? ""

  const src = username
    ? `https://ghchart.rshah.org/${encodeURIComponent(username)}`
    : ""

  return (
    <section id="heatmap" aria-label="GitHub heatmap" className="py-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-balance text-2xl font-semibold tracking-tight">
                GitHub activity
              </h2>
              <p className="mt-1 text-sm text-zinc-600">
                Heatmap for <span className="font-medium text-[#1C352D]">{username || "—"}</span>.
              </p>
            </div>
          </div>

          {src ? (
            <div className="mt-5 flex justify-center overflow-x-auto">
              <img
                src={src}
                alt={`GitHub contributions heatmap for ${username}`}
                className="mx-auto min-w-[520px]"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="mt-5 text-sm text-zinc-600">
              Add <code>NEXT_PUBLIC_GITHUB_USERNAME</code> in your env to show your heatmap.
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}

