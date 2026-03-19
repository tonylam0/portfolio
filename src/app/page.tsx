import { ContactForm } from "@/components/sections/ContactForm"
import { Hero } from "@/components/sections/Hero"
import { GithubHeatmap } from "@/components/sections/GithubHeatmap"
import { SocialLinks } from "@/components/sections/SocialLinks"
import { ProjectsBento } from "@/components/sections/ProjectsBento"
import { UvaBadge } from "@/components/UvaBadge"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <UvaBadge />
      <Hero />
      <div className="border-t border-[#1C352D]/15 bg-[#F0F7F3]">
        <ProjectsBento />
        <ContactForm />
        <GithubHeatmap />
        <SocialLinks />
      </div>
    </main>
  )
}

