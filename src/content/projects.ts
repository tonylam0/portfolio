export type ProjectLink = { label: string; href: string }

export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  // Bento grid placement
  gridClassName: string
  problem: string
  stack: string[]
  highlights: string[]
  links?: ProjectLink[]
}

export const projects: Project[] = [
  {
    id: "planet-sim",
    title: "Planet Simulation",
    description: "A physics-inspired sandbox with responsive visuals.",
    tags: ["Web", "Sim"],
    gridClassName: "col-span-7 row-span-2",
    problem: "Make simulation visuals feel smooth and controllable for users.",
    stack: ["Canvas", "TypeScript", "React", "Custom physics"],
    highlights: [
      "Tuned animation loop for stable frame pacing",
      "Clean controls layer (pause, reset, parameters)",
      "Readable UI with layered information design",
    ],
    links: [{ label: "Case study", href: "#" }],
  },
  {
    id: "mandelbrot",
    title: "Mandelbrot Set",
    description: "Interactive fractal explorer with palette tweaks.",
    tags: ["Web", "Math"],
    gridClassName: "col-span-5 row-span-2",
    problem: "Speed up pixel-heavy rendering while keeping the experience interactive.",
    stack: ["WebGL/Canvas", "Performance profiling", "UI polish"],
    highlights: [
      "Adaptive iteration strategy for better detail",
      "Palette/contrast controls for exploration",
      "Hover/click affordances with immediate feedback",
    ],
    links: [{ label: "Source", href: "#" }],
  },
  {
    id: "learning-tools",
    title: "Friction (Interactive Learning Tool)",
    description: "Micro-interactions that teach the user what’s happening.",
    tags: ["UX", "Tools"],
    gridClassName: "col-span-4 row-span-2",
    problem: "Turn complex systems into intuitive interaction patterns.",
    stack: ["React", "State modeling", "Animation systems"],
    highlights: [
      "Clear state transitions backed by UI feedback",
      "Motion used to guide attention rather than distract",
      "Edge cases handled with consistent UX behavior",
    ],
    links: [{ label: "Demo", href: "#" }],
  },
  {
    id: "ucb",
    title: "Key Club Website",
    description: "A lightweight site experience with accessible components.",
    tags: ["Web", "Accessibility"],
    gridClassName: "col-span-4 row-span-2",
    problem: "Make content easy to find and navigation easy to use.",
    stack: ["Next.js", "Responsive layout", "Accessibility checks"],
    highlights: [
      "Semantic markup and keyboard-friendly interactions",
      "Fast page loads with minimal UI friction",
      "Consistent design system spacing and typography",
    ],
  },
  {
    id: "spam",
    title: "SPAM Animation",
    description: "Playful animation study focused on readability.",
    tags: ["AI", "Creative"],
    gridClassName: "col-span-4 row-span-2",
    problem: "Create delightful motion while maintaining clarity and performance.",
    stack: ["Animation", "Timing curves", "UI feedback"],
    highlights: [
      "Staggered reveals to preserve hierarchy",
      "Reduced-motion friendly implementation",
      "Visual rhythm that feels intentional",
    ],
    links: [{ label: "Write-up", href: "#" }],
  },
  {
    id: "evergreen",
    title: "Evergreen",
    description: "A calm dashboard aesthetic with practical components.",
    tags: ["Tools", "UX"],
    gridClassName: "col-span-12 row-span-1",
    problem: "Blend aesthetics with productivity and keep UI interactions predictable.",
    stack: ["Design system", "Components", "Interaction patterns"],
    highlights: [
      "Cohesive spacing and typography",
      "Reusable components that stay consistent across pages",
      "Interaction patterns that reduce user uncertainty",
    ],
    links: [{ label: "Preview", href: "#" }],
  },
]

export const projectTags = ["All", "Web", "Tools", "UX", "Sim", "Math", "Accessibility", "Creative", "AI"]

