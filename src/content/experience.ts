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
    description: "directing engineering on a nonprofit learning platform that facilitates universal access to free, structured educational material.",
    period: "may 2026 — present",
    tags: ["Web", "educational", "nonprofit"],
  },
  {
    id: "cargolabs",
    org: "cargolabs",
    role: "software engineer intern",
    description: "building serverless aws workflows and react interfaces for freight logistics.",
    period: "mar 2026 — present",
    tags: ["typescript", "aws", "node"],
  },
]
