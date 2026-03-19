import { ContactForm } from "@/components/sections/ContactForm"
import { Hero } from "@/components/sections/Hero"
import { GithubHeatmap } from "@/components/sections/GithubHeatmap"
import { ProjectsBento } from "@/components/sections/ProjectsBento"
import { LearningStatus } from "@/components/learning/LearningStatus"
import { UvaBadge } from "@/components/UvaBadge"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <UvaBadge />
      <Hero />
      <GithubHeatmap />
      <LearningStatus />
      <ProjectsBento />
      <ContactForm />
    </main>
  )
}

