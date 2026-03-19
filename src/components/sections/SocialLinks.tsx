"use client"

import { FileTextIcon, GithubIcon, LinkedinIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || ""
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || ""
const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || ""

export function SocialLinks() {
  return (
    <section id="socials" aria-label="Social links" className="py-14 text-white">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-balance text-2xl font-semibold tracking-tight">Socials</h2>
            <p className="mt-1 text-sm text-zinc-200">
              Find me on LinkedIn, GitHub, or grab my resume.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {linkedinUrl ? (
              <Button
                variant="outline"
                className="cursor-pointer gap-2 border-white/35 bg-white/5 text-zinc-100 hover:bg-white/15 hover:text-white"
                onClick={() => window.open(linkedinUrl, "_blank", "noreferrer")}
              >
                <LinkedinIcon className="size-4" />
                LinkedIn
              </Button>
            ) : null}

            {githubUrl ? (
              <Button
                variant="outline"
                className="cursor-pointer gap-2 border-white/35 bg-white/5 text-zinc-100 hover:bg-white/15 hover:text-white"
                onClick={() => window.open(githubUrl, "_blank", "noreferrer")}
              >
                <GithubIcon className="size-4" />
                GitHub
              </Button>
            ) : null}

            {resumeUrl ? (
              <Button
                variant="outline"
                className="cursor-pointer gap-2 border-white/35 bg-white/5 text-zinc-100 hover:bg-white/15 hover:text-white"
                onClick={() => window.open(resumeUrl, "_blank", "noreferrer")}
              >
                <FileTextIcon className="size-4" />
                Resume
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

