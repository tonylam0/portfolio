export type ProjectLink = { label: string; href: string }

export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  gridClassName: string
  problem: string
  stack: string[]
  highlights: string[]
  previewImage?: string
  links?: ProjectLink[]
}

export const projects: Project[] = [
  {
    id: "evergreen",
    title: "Evergreen",
    description: "A full-stack web platform for sharing and reviewing video essays.",
    tags: ["Creative", "Web"],
    gridClassName: "col-span-1 md:col-span-7 md:row-span-2",
    problem: 'Engineering a "non-brainrotting" discovery engine that surfaces timeless content through human curation and an age-boosted algorithm.',
    stack: ["React", "Django", "Python", "SQLite", "CSS"],
    highlights: [
      "Architected a decoupled Django/React platform.",
      "Designed a relational database schema for profiles, media, and comment threads",
      'Developed an "age-boosted" discovery algorithm that prioritizes enduring viewer engagement over temporary trends.',
      "Integrated YouTube embedding and OAuth authentication to support human-curated feeds.",
    ],
    previewImage: "/projects/evergreen.png"
  },
  {
    id: "digits-recognition",
    title: "Digits Recognition",
    description: "A neural network built entirely from scratch without external ML frameworks.",
    tags: ["AI", "Math"],
    gridClassName: "col-span-1 md:col-span-5 md:row-span-2",
    problem: "Understand the underlying mathematics of machine learning by implementing core algorithms manually.",
    stack: ["Python", "NumPy"],
    highlights: [
      "Engineered feedforward, backpropagation, and gradient descent algorithms",
      "Processed and trained the model on the MNIST dataset",
      "Achieved over 95% accuracy in handwritten digit classification",
    ],
    previewImage: "/projects/digits.png",
    links: [{ label: "GitHub", href: "https://github.com/tonylam0/Handwritten-Digits-Recognition" }],
  },
  {
    id: "planet-sim",
    title: "Planetary Simulation",
    description: "A physics-based simulation of the inner solar system and orbital mechanics.",
    tags: ["Simulation", "Math"],
    gridClassName: "col-span-1 md:col-span-4 md:row-span-2",
    problem: "Accurately model complex gravitational attraction and orbital physics in real-time.",
    stack: ["Python", "Pygame"],
    highlights: [
      "Calculated real-time orbital mechanics and gravitational forces",
      "Designed modular, Object-Oriented Planet and Moon classes",
      "Built an interactive UX with dynamic zooming and camera tracking",
    ],
    previewImage: "/projects/planet-sim.png",
    links: [{ label: "GitHub", href: "https://github.com/tonylam0/Planetary-Simulation" }],
  },
  {
    id: "conways-gol",
    title: "Conway's Game of Life",
    description: "An interactive cellular automaton with real-time population tracking.",
    tags: ["Simulation", "Math"],
    gridClassName: "col-span-1 md:col-span-4 md:row-span-2",
    problem: "Visualize generation stability and state changes mathematically over time.",
    stack: ["Python", "Pygame", "Matplotlib"],
    highlights: [
      "Built interactive simulation controls (pause, reset, speed adjustment)",
      "Engineered real-time data visualization using Matplotlib",
      "Tracked and graphed population stability across generations",
    ],
    previewImage: "/projects/gol.png",
    links: [{ label: "GitHub", href: "https://github.com/tonylam0/Conways-Game-of-Life" }],
  },
  {
    id: "personal-website",
    title: "Personal website",
    description: "My personal website to share my thoughts and workflow.",
    tags: ["Creative", "Web"],
    gridClassName: "col-span-1 md:col-span-4 md:row-span-2",
    problem: "Create an minimalistic website that showcases my life and thoughts.",
    stack: ["React", "CSS"],
    highlights: [
      "Implemented a responsive, interactive Bento grid layout",
      "Engineered dynamic layout animations and micro-interactions",
      "Optimized for high performance and accessibility standards",
    ],
    previewImage: "/projects/personal.png",
    links: [{ label: "My website", href: "https://tonylam0.github.io/" }],
  },
  {
    id: "mandelbrot-generator",
    title: "Mandelbrot Set Generator",
    description: "An interactive fractal explorer with real-time color mapping and formula tweaks.",
    tags: ["Math", "Simulation"],
    gridClassName: "col-span-1 md:col-span-12 md:row-span-2",
    problem: "Render high-resolution fractals interactively while allowing dynamic changes to complex mathematical bounds.",
    stack: ["Python", "NumPy", "Pygame"],
    highlights: [
      "Engineered real-time rendering using color-mapped iteration counts for visual depth",
      "Built support for dynamic recursive formulas, handling non-integer and negative exponents",
      "Optimized pixel-heavy mathematical calculations using NumPy for smooth performance",
    ],
    previewImage: "/projects/mandelbrot.png",
    links: [{ label: "GitHub", href: "https://github.com/tonylam0/Mandelbrot-Set-Generator" }],
  }
]

export const projectTags = [
  "All",
  "Web",
  "Simulation",
  "Math",
  "Creative",
  "AI"
]
