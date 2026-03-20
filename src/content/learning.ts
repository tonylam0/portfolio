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
      "I passed!",
    ],
    updatedAtISO: "2026-03-20T21:34:00.000Z",
  },
  {
    id: "running",
    title: "Relearning how to run",
    summary: "Getting back into running after hiatus.",
    details: [
      "Running 2 times a week",
      "Integrating both light and hard runs"
    ],
    updatedAtISO: "2026-03-19T23:45:00.000Z",
  },
  {
    id: "slam",
    title: "SLAM & Swift",
    summary: "Preparing for HooHacks 26' by learning SLAM (Simultaneous Localization and Mapping) & Swift",
    details: [
      "Creating the inner logic and architecture of our SLAM-related project",
      "Learning Swift in order to code the mobile app that houses our project",
    ],
    updatedAtISO: "2026-03-20T21:37:00.000Z",
  }
]
