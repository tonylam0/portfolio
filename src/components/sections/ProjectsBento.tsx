"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion, useMotionValue } from "framer-motion"
import { ExternalLinkIcon } from "lucide-react"

import { projects, projectTags, type Project } from "@/content/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

function escapeSvg(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function projectPreviewSrc(project: Project) {
  const colorPool = ["#1C352D", "#0F766E", "#2563EB", "#7C3AED", "#059669", "#DC2626"]
  const seed = Array.from(project.id).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const color = colorPool[seed % colorPool.length]
  const title = escapeSvg(project.title)
  const tag = escapeSvg(project.tags[0] ?? "")

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${color}" stop-opacity="1"/>
          <stop offset="1" stop-color="#0b1220" stop-opacity="0.7"/>
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="300" height="180" rx="18" fill="url(#g)"/>
      <rect x="10" y="10" width="300" height="180" rx="18" fill="none" stroke="rgba(255,255,255,0.18)"/>
      <text x="160" y="92" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="20" font-weight="700" fill="#ffffff">${title}</text>
      <text x="160" y="132" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="14" font-weight="600" fill="rgba(255,255,255,0.85)">${tag}</text>
      <circle cx="68" cy="52" r="8" fill="rgba(255,255,255,0.22)"/>
      <circle cx="248" cy="56" r="6" fill="rgba(255,255,255,0.18)"/>
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function ProjectDialogBody({ project }: { project: Project }) {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Problem
        </div>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          {project.problem}
        </p>
      </div>

      <div>
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Stack
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Badge key={s} variant="outline" className="border-zinc-200/60 dark:border-zinc-800/60">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Highlights
        </div>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>

      {project.links?.length ? (
        <div>
          <div className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Links
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.links.map((l) => (
              <Button
                key={l.href}
                variant="outline"
                className="h-9 gap-2"
                type="button"
                onClick={() => window.open(l.href, "_blank", "noreferrer")}
              >
                {l.label}
                <ExternalLinkIcon className="size-4" />
              </Button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function ProjectsBento() {
  const [tag, setTag] = useState<string>("All")
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null)
  const [canHoverPreview, setCanHoverPreview] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)")
    const updateHoverCapability = () => {
      setCanHoverPreview(mediaQuery.matches)
    }

    updateHoverCapability()
    mediaQuery.addEventListener("change", updateHoverCapability)

    return () => {
      mediaQuery.removeEventListener("change", updateHoverCapability)
    }
  }, [])

  useEffect(() => {
    if (!canHoverPreview) {
      setHoveredProjectId(null)
    }
  }, [canHoverPreview])

  const filteredProjects = useMemo(() => {
    if (tag === "All") return projects
    return projects.filter((p) => p.tags.includes(tag))
  }, [tag])

  const activeProject = useMemo(() => {
    if (!activeId) return null
    return projects.find((p) => p.id === activeId) ?? null
  }, [activeId])

  const hoveredProject = useMemo(() => {
    if (!canHoverPreview || !hoveredProjectId) return null
    return projects.find((p) => p.id === hoveredProjectId) ?? null
  }, [canHoverPreview, hoveredProjectId])

  const previewSrc = useMemo(() => {
    if (!hoveredProject) return ""
    return hoveredProject.previewImage || projectPreviewSrc(hoveredProject)
  }, [hoveredProject])

  const onTagChange = (nextTag: string) => {
    setTag(nextTag)

    if (!open || !activeId) return
    const stillVisible =
      nextTag === "All" ? true : projects.some((p) => p.id === activeId && p.tags.includes(nextTag))
    if (!stillVisible) {
      setOpen(false)
      setActiveId(null)
    }
  }

  return (
    <section id="projects" aria-label="Projects" className="py-16 text-white">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-balance text-2xl font-semibold tracking-tight">
              Projects
            </h2>
            <p className="mt-1 max-w-prose text-sm text-white/80 dark:text-zinc-300">
              Click any card for details. Filter by tag to find what you care about.
            </p>
          </div>

          <Tabs
            value={tag}
            onValueChange={onTagChange}
            className="w-full md:w-auto"
          >
            <TabsList className="h-auto flex-wrap gap-2 p-1">
              {projectTags.map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className="cursor-pointer px-2 py-1 text-xs text-black transition-colors hover:text-[#2F5755] data-[state=active]:text-[#95BDC6]"
                >
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
            {projectTags.map((t) => (
              <TabsContent key={t} value={t} />
            ))}
          </Tabs>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-12">
          {filteredProjects.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: i * 0.08,
                type: "spring",
                stiffness: 190,
                damping: 18,
                mass: 0.7,
              }}
              whileHover={canHoverPreview ? { y: -2 } : undefined}
              whileTap={{ scale: 0.99 }}
              className={`group cursor-pointer text-left focus-visible:outline-none ${p.gridClassName} ${hoveredProjectId === p.id ? "dark" : ""
                }`}
              onMouseEnter={() => {
                if (canHoverPreview) setHoveredProjectId(p.id)
              }}
              onMouseLeave={() => {
                if (canHoverPreview) {
                  setHoveredProjectId((id) => (id === p.id ? null : id))
                }
              }}
              onMouseMove={(e) => {
                if (canHoverPreview) {
                  cursorX.set(e.clientX)
                  cursorY.set(e.clientY)
                }
              }}
              onClick={() => {
                setActiveId(p.id)
                setOpen(true)
              }}
            >
              <Card className="relative flex flex-col h-full overflow-hidden bg-[#A0D585] p-5 text-zinc-800 ring-1 ring-foreground/10">
                <div className="absolute inset-0 z-0 origin-top scale-y-0 bg-[#EEFABD] transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100" />

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-base font-semibold tracking-tight">
                      {p.title}
                    </div>
                    <p className="mt-1 text-sm text-zinc-700 transition-colors duration-200 group-hover:text-zinc-900 group-focus-visible:text-zinc-900">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="h-5 border border-black bg-white px-2 text-[11px] text-zinc-800 transition-colors duration-200 group-hover:bg-white/70 group-hover:text-zinc-900 group-focus-visible:bg-white/70 group-focus-visible:text-zinc-900"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="relative z-10 mt-auto pt-4 text-xs text-zinc-700 transition-colors duration-200 group-hover:text-zinc-900 group-focus-visible:text-zinc-900">
                  Click for details
                </div>
              </Card>
            </motion.button>
          ))}
        </div>

        {/* Hover preview that appears next to your cursor */}
        <AnimatePresence>
          {canHoverPreview && hoveredProject && previewSrc ? (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none fixed z-[60]"
              style={{
                left: cursorX,
                top: cursorY,
                translateX: 18,
                translateY: -30,
              }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.12 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewSrc}
                alt=""
                className="h-[150px] w-[230px] rounded-xl border border-white/15 bg-black/20 object-cover shadow-lg"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <Dialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v)
            if (!v) setActiveId(null)
          }}
        >
          {activeProject ? (
            <DialogContent className="sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle>{activeProject.title}</DialogTitle>
                <DialogDescription>{activeProject.description}</DialogDescription>
              </DialogHeader>

              <ProjectDialogBody project={activeProject} />

              <div className="pt-2 text-xs text-zinc-500 dark:text-zinc-400">
                Tip: use the tag filter to explore related projects.
              </div>
            </DialogContent>
          ) : null}
        </Dialog>
      </div>
    </section>
  )
}

