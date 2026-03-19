import { ContactForm } from "@/components/sections/ContactForm"
import { Hero } from "@/components/sections/Hero"
import { ProjectsBento } from "@/components/sections/ProjectsBento"
import { LearningStatus } from "@/components/learning/LearningStatus"
import { UvaBadge } from "@/components/UvaBadge"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <UvaBadge />
      <Hero />
      <LearningStatus />
      <ProjectsBento />
      <ContactForm />

      <footer className="border-t border-foreground/10 py-10">
        <div className="mx-auto w-full max-w-5xl px-6 text-xs text-zinc-500 dark:text-zinc-400">
          Built with Next.js, Tailwind, shadcn/ui, and Framer Motion.
        </div>
      </footer>
    </main>
  )
}

