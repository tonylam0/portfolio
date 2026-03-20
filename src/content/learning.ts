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
    title: "Amazon Web Services (AWS)",
    summary: "Currently studying to pass my AWS Certified Cloud Practitioner Exam.",
    details: [
      "Studying through a 14 hour YouTube course",
      "Taking as many practice tests I can",
      "Taking the exam on March 20th, 2026",
    ],
    updatedAtISO: "2026-03-19T20:00:00.000Z",
  },
  {
    id: "running",
    title: "Relearning how to run",
    summary: "Getting back into running after hiatus.",
    details: [
      "Running 2 times a week",
      "Integrating both light and hard runs"
    ],
    updatedAtISO: "2026-03-17T23:45:00.000Z",
  },
  {
    id: "dsa-patterns",
    title: "Advanced Data Structures & Algorithms",
    summary: "Deepening my understanding of algorithm efficiency and complex data models.",
    details: [
      "Mastering graph traversal algorithms and greedy programming patterns",
      "Analyzing Big O complexity to improve runtime performance in full-stack apps",
    ],
    updatedAtISO: "2026-03-19T00:01:00.000Z",
  }
]
