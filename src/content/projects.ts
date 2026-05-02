export type ProjectLink = { label: string; href: string }

export type Project = {
  id: string
  title: string
  description: string
  listDescription?: string
  year?: string
  tags: string[]
  previewImage?: string
  links?: ProjectLink[]
}

export const projects: Project[] = [
  {
    id: "wallhax",
    title: "WallHax",
    description: "An award-winning multi-device AR platform with post-mission 3D environmental rendering for shared situational awareness.",
    listDescription: "award-winning ar collaboration app for shared situational awareness.",
    year: "2026",
    tags: ["Best AI & Data Science Hack", "ios"],
    previewImage: "/projects/wallhax.jpeg",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/wallhax-896ck3" }
    ]
  },
  {
    id: "evergreen",
    title: "Evergreen",
    description: "A full-stack web platform for sharing and reviewing video essays.",
    listDescription: "platform for sharing & reviewing video essays with an age-boosted discovery algorithm.",
    year: "2026",
    tags: ["Creative", "Web"],
    previewImage: "/projects/evergreen.png",
    links: [{ label: "GitHub", href: "https://github.com/tonylam0/Evergreen-legacy" }],
  },
  {
    id: "digits-recognition",
    title: "Digits Recognition",
    description: "A neural network built entirely from scratch without external ML frameworks.",
    listDescription: "neural network from scratch w/o any external machine learning frameworks.",
    year: "2025",
    tags: ["AI", "Math"],
    previewImage: "/projects/digits.png",
    links: [{ label: "GitHub", href: "https://github.com/tonylam0/Handwritten-Digits-Recognition" }],
  },
  {
    id: "personal-website",
    title: "Personal website",
    description: "My personal website to share my thoughts and workflow.",
    listDescription: "minimalistic site showcasing thoughts and workflow.",
    year: "2026",
    tags: ["Creative", "Web"],
    previewImage: "/projects/personal.png",
    links: [{ label: "My website", href: "https://tonylam0.github.io/" }],
  },
  {
    id: "planet-sim",
    title: "Planetary Simulation",
    description: "A physics-based simulation of the inner solar system and orbital mechanics.",
    listDescription: "physics-driven orbital mechanics simulation of the inner solar system.",
    year: "2024",
    tags: ["Math", "Simulation"],
    previewImage: "/projects/planet-sim.png",
    links: [{ label: "GitHub", href: "https://github.com/tonylam0/Planetary-Simulation" }],
  },
  {
    id: "mandelbrot-generator",
    title: "Mandelbrot Set Generator",
    description: "An interactive fractal explorer with real-time color mapping and formula tweaks.",
    listDescription: "high-resolution fractal renderer optimized with numpy for pixel-heavy calculations.",
    year: "2025",
    tags: ["Math", "Simulation"],
    previewImage: "/projects/mandelbrot.png",
    links: [{ label: "GitHub", href: "https://github.com/tonylam0/Mandelbrot-Set-Generator" }],
  }
]
