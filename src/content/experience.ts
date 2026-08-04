export type Experience = {
  id: string
  org: string
  role?: string
  description: string
  period: string
  tags: string[]
}

export const experience: Experience[] = [
  {
    id: "bluelearn",
    org: "bluelearn",
    role: "director of technology",
    description: "a nonprofit learning platform that facilitates universal access to free, structured educational material. 5000+ member community.",
    period: "may 2026 — present",
    tags: ["web", "educational", "nonprofit"],
  },
  {
    id: "cargolabs",
    org: "cargolabs",
    role: "software engineer intern",
    description: "a marketplace making truck insurance instant and self-serve for the freight industry.",
    period: "mar 2026 — present",
    tags: ["web", "insurance", "b2b"],
  },
]
