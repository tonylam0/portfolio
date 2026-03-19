"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
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

  const filteredProjects = useMemo(() => {
    if (tag === "All") return projects
    return projects.filter((p) => p.tags.includes(tag))
  }, [tag])

  const activeProject = useMemo(() => {
    if (!activeId) return null
    return projects.find((p) => p.id === activeId) ?? null
  }, [activeId])

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
    <section id="projects" aria-label="Projects" className="py-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-balance text-2xl font-semibold tracking-tight">
              Projects
            </h2>
            <p className="mt-1 max-w-prose text-sm text-zinc-600 dark:text-zinc-300">
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
                <TabsTrigger key={t} value={t} className="px-2 py-1 text-xs">
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
            {projectTags.map((t) => (
              <TabsContent key={t} value={t} />
            ))}
          </Tabs>
        </div>

        <div className="mt-7 grid grid-cols-12 gap-4">
          {filteredProjects.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.35 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              className={`text-left focus-visible:outline-none ${p.gridClassName}`}
              onClick={() => {
                setActiveId(p.id)
                setOpen(true)
              }}
            >
              <Card className="h-full p-5 ring-1 ring-foreground/10 transition-[filter] group/card">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-base font-semibold tracking-tight">
                      {p.title}
                    </div>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((t) => (
                    <Badge key={t} variant="secondary" className="h-5 px-2 text-[11px]">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
                  Click for details
                </div>
              </Card>
            </motion.button>
          ))}
        </div>

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

