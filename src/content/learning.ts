export type LearningItem = {
  id: string
  title: string
  summary: string
  details: string[]
  links?: { label: string; href: string }[]
  updatedAtISO: string
}

export const learningItems: LearningItem[] = [
  {
    id: "react-perf",
    title: "Learning AWS",
    summary: "Currently studying to pass my AWS Certified Cloud Practitioner Exam",
    details: [
      "Studying through a 14 hour YouTube course",
      "Taking as many practice tests I can",
      "Taking the exam on March 20th, 2026",
    ],
    updatedAtISO: "2026-03-20T20:00:00.000Z",
  },
  {
    id: "next-security",
    title: "Next.js security basics",
    summary: "Hardening client/server boundaries and validating inputs end-to-end.",
    details: [
      "Validate payloads with Zod in API routes",
      "Avoid leaking secrets into client components",
      "Handle errors consistently for UX and logs",
    ],
    updatedAtISO: "2026-03-18T18:30:00.000Z",
  },
  {
    id: "ux-motion",
    title: "UX motion that teaches",
    summary: "Using subtle animation to guide attention instead of distracting.",
    details: [
      "Use small staggered reveals for hierarchy",
      "Prefer spring/easing tuned to content density",
      "Ensure motion respects reduced-motion preferences",
    ],
    updatedAtISO: "2026-03-17T12:15:00.000Z",
  },
]
