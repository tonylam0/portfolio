export type ProjectLink = { label: string; href: string }

export type Project = {
  id: string
  title: string
  description: string
  listDescription?: string
  year?: string
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
    id: "wallhax",
    title: "WallHax",
    description: "An award-winning multi-device AR platform with post-mission 3D environmental rendering for shared situational awareness.",
    listDescription: "award-winning ar platform for shared situational awareness.",
    year: "2026",
    tags: ["AI", "Web"],
    gridClassName: "col-span-1 md:col-span-7 md:row-span-2",
    problem: "Teams in hazardous environments (SAR, military) operate blind indoors. We needed to sync live spatial data across devices and generate photorealistic post-mission 3D digital environments.",
    stack: ["Swift (ARKit)", "Python", "React", "Three.js", "Luma AI", "Matplotlib"],
    highlights: [
      "Won the Best AI & Data Science Track at 2026 HooHacks Hackathon.",
      "Engineered a heuristics engine to translate live ARKit SLAM/IMU data into 3D character animations over a low-latency UDP relay.",
      "Leveraged Luma AI's machine learning pipeline to process capture data into highly detailed 3D Gaussian Splats.",
      "Architected a React/WebGL web server to render the photorealistic digital world with a frame-by-frame timeline for post-mission tactical review."
    ],
    previewImage: "/projects/wallhax.jpeg",
    links: [
      { label: "Demo", href: "https://youtu.be/II26dfXLtV0?si=kI4TycO0T1HWsRAU" },
      { label: "GitHub", href: "https://github.com/HyunLee8/wallhax" },
      { label: "Devpost", href: "https://devpost.com/software/wallhax-896ck3" }
    ]
  },
  {
    id: "digits-recognition",
    title: "Digits Recognition",
    description: "A neural network built entirely from scratch without external ML frameworks.",
    listDescription: "neural network from scratch — no ml frameworks, pure math.",
    year: "2025",
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
    listDescription: "physics-based simulation of the inner solar system.",
    year: "2025",
    tags: ["Simulation", "Math"],
    gridClassName: "col-span-1 md:col-span-5 md:row-span-2",
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
    id: "evergreen",
    title: "Evergreen",
    description: "A full-stack web platform for sharing and reviewing video essays.",
    listDescription: "platform for video essays with an age-boosted discovery algorithm.",
    year: "2024",
    tags: ["Creative", "Web"],
    gridClassName: "col-span-1 md:col-span-7 md:row-span-2",
    problem: 'Engineering a "non-brainrotting" discovery engine that surfaces timeless content through human curation and an age-boosted algorithm.',
    stack: ["Vite + React", "Django", "Python", "SQLite", "CSS"],
    highlights: [
      "Architected a decoupled Django/React platform.",
      "Designed a relational database schema for profiles, media, and comment threads",
      'Developed an "age-boosted" discovery algorithm that prioritizes enduring viewer engagement over temporary trends.',
      "Integrated YouTube embedding and OAuth authentication to support human-curated feeds.",
    ],
    previewImage: "/projects/evergreen.png"
  },
  {
    id: "personal-website",
    title: "Personal website",
    description: "My personal website to share my thoughts and workflow.",
    listDescription: "minimalistic site showcasing thoughts and workflow.",
    year: "2024",
    tags: ["Creative", "Web"],
    gridClassName: "col-span-1 md:col-span-4 md:row-span-2",
    problem: "Create an minimalistic website that showcases my life and thoughts.",
    stack: ["Vite + React", "CSS"],
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
    listDescription: "interactive fractal explorer with real-time color mapping.",
    year: "2024",
    tags: ["Math", "Simulation"],
    gridClassName: "col-span-1 md:col-span-8 md:row-span-2",
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
