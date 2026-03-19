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
    id: "evergreen",
    title: "Evergreen",
    description: "A full-stack web platform for sharing and discussing video essays.",
    tags: ["Web", "UX"],
    gridClassName: "col-span-7 row-span-2",
    problem: "Build a robust, decoupled architecture to handle user authentication, relational data, and media.",
    stack: ["React", "Django", "Vite", "SQLite"],
    highlights: [
      "Architected a Django backend with RESTful APIs for auth and content management",
      "Built a responsive frontend utilizing component-based state management",
      "Designed a relational database schema for profiles, media, and comment threads",
    ],
    links: [{ label: "GitHub", href: "https://github.com/tonylam0" }],
  },
  {
    id: "digits-recognition",
    title: "Digits Recognition",
    description: "A neural network built entirely from scratch without external ML frameworks.",
    tags: ["AI", "Math"],
    gridClassName: "col-span-5 row-span-2",
    problem: "Understand the underlying mathematics of machine learning by implementing core algorithms manually.",
    stack: ["Python", "NumPy", "Linear Algebra"],
    highlights: [
      "Engineered feedforward, backpropagation, and gradient descent algorithms",
      "Processed and trained the model on the MNIST dataset",
      "Achieved over 95% accuracy in handwritten digit classification",
    ],
    links: [{ label: "GitHub", href: "https://github.com/tonylam0" }],
  },
  {
    id: "planet-sim",
    title: "Planetary Simulation",
    description: "A physics-based simulation of the inner solar system and orbital mechanics.",
    tags: ["Sim", "Creative"],
    gridClassName: "col-span-4 row-span-2",
    problem: "Accurately model complex gravitational attraction and orbital physics in real-time.",
    stack: ["Python", "Pygame", "OOP"],
    highlights: [
      "Calculated real-time orbital mechanics and gravitational forces",
      "Designed modular, Object-Oriented Planet and Moon classes",
      "Built an interactive UX with dynamic zooming and camera tracking",
    ],
    links: [{ label: "GitHub", href: "https://github.com/tonylam0" }],
  },
  {
    id: "conways-gol",
    title: "Conway's Game of Life",
    description: "An interactive cellular automaton with real-time population tracking.",
    tags: ["Sim", "Tools"],
    gridClassName: "col-span-4 row-span-2",
    problem: "Visualize generation stability and state changes mathematically over time.",
    stack: ["Python", "Pygame", "Matplotlib"],
    highlights: [
      "Built interactive simulation controls (pause, reset, speed adjustment)",
      "Engineered real-time data visualization using Matplotlib",
      "Tracked and graphed population stability across generations",
    ],
    links: [{ label: "GitHub", href: "https://github.com/tonylam0" }],
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    description: "An interactive digital workspace to showcase my projects and workflow.",
    tags: ["Web", "Tools"],
    gridClassName: "col-span-4 row-span-2",
    problem: "Create an engaging, performant web presence with modern UI/UX patterns.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Implemented a responsive, interactive Bento grid layout",
      "Engineered dynamic layout animations and micro-interactions",
      "Optimized for high performance and accessibility standards",
    ],
    links: [{ label: "GitHub", href: "https://github.com/tonylam0" }],
  },
]

export const projectTags = [
  "All",
  "Web",
  "Tools",
  "UX",
  "Sim",
  "Math",
  "Creative",
  "AI"
]
