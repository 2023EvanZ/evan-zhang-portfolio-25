// Single source of truth for portfolio content.
// Shared by the 3D pool hero, the timeline rows and the work list.

export interface Milestone {
  year: string
  title: string
  body: string
}

export interface TimelineItem {
  period: string
  title: string
  subtitle: string
  points: string[]
}

export interface Project {
  id: string
  title: string
  desc: string
  img: string
  url: string
  stack: string
  period: string
}

/** Markers you swim past in the pool hero. Ordered oldest -> newest. */
export const milestones: Milestone[] = [
  {
    year: 'UVA',
    title: 'CS & Statistics, University of Virginia',
    body: 'Data structures, computer systems, discrete math, software engineering, AI, linear algebra and probability. Databases, cloud, NLP and machine learning are next.',
  },
  {
    year: '2023',
    title: 'Teacher Assistant — Fairfax Collegiate',
    body: 'Backed up lectures, gave impromptu ones, and sat with students one on one to debug their programs.',
  },
  {
    year: '2024',
    title: 'Lead Instructor — Fairfax Collegiate',
    body: 'Taught 50+ middle-school students to write algorithms and games in Python across 80 lectures I wrote myself.',
  },
  {
    year: '2024',
    title: 'Assistant Lead Developer — Pangu',
    body: 'Team of five building an e-commerce startup for college students. 10+ frontend features in React, 5+ backend features on Express and Supabase.',
  },
  {
    year: '2025',
    title: 'Software Engineer Intern — GEICO',
    body: 'Reusable web components in Lit, authored the Storybook documentation, and led data collection and the live demo for our internal AI hackathon entry.',
  },
  {
    year: '2027',
    title: 'Open to what is next',
    body: 'Looking for ML and software engineering work where the systems are hard and the team argues well.',
  },
]

/** Full role detail, rendered as text below the pool. */
export const timeline: TimelineItem[] = [
  {
    period: 'Jun 2025 — Aug 2025',
    title: 'Software Engineer Intern',
    subtitle: 'GEICO',
    points: [
      "Developed reusable end-to-end web components with Lit, building GEICO's digital brand by maintaining and authoring Storybook documentation.",
      "Active member of our team's submission for an internal AI hackathon event, leading the data collection, model output, and the live demo.",
      'Triaged and resolved bugs from prior UI releases, collaborating with Designers and Product Managers to expedite fixes, and participated in daily code reviews with other developers.',
    ],
  },
  {
    period: 'Jun 2024 — Aug 2024',
    title: 'Assistant Lead Developer',
    subtitle: 'Pangu — Startup',
    points: [
      'Team of 5 created a start-up e-commerce website for college students under the supervision of a current Software Engineer.',
      'Implemented 10+ frontend features with React and Tailwind. Built 5+ backend features with robust APIs with Express for secure authentication and used Supabase for database.',
      'Built and executed numerous unit tests and end-to-end tests ensuring sufficient code coverage.',
    ],
  },
  {
    period: 'May 2024 — Aug 2024',
    title: 'Lead Instructor',
    subtitle: 'Fairfax Collegiate',
    points: [
      'Taught over 50 middle-school students of various skill levels and taught them to program complex algorithms and games in Python.',
      'Created 80 lectures with custom activities for student learning and handled communication with parents.',
      'Substituted for other classes and monitored students during break time to ensure their safety.',
    ],
  },
  {
    period: 'Jun 2023 — Aug 2023',
    title: 'Teacher Assistant',
    subtitle: 'Fairfax Collegiate',
    points: [
      'Assisted with teacher lectures by ensuring no mistakes were made, often gave impromptu ones to students struggling with concepts.',
      'Worked individually with students to help debug their programs and offer more in-depth and personalized lessons.',
      'Responsible for teaching students various sorting algorithms, data structures, boolean logic, and game design.',
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'go-loco',
    title: 'Go Loco',
    desc: 'A short-form content platform that promotes small business. Tourists browse the app, see the small businesses nearby, and go there to support them.',
    img: '/projects/Go-Loco-Logo.png',
    url: 'https://github.com/2023EvanZ/wics-sp2025',
    stack: 'Team project',
    period: '2025',
  },
  {
    id: 'kitchenware',
    title: 'Kitchenware',
    desc: 'A semester-long full-stack build where users request and loan kitchen items. In-app messaging, real-time notifications, and a database behind all of it.',
    img: '/projects/Kitchenware-logo.png',
    url: 'https://github.com/2023EvanZ/swe-project-sp25',
    stack: 'Full-stack · Team project',
    period: '2025',
  },
  {
    id: 'checkmate',
    title: 'CheckMate',
    desc: 'A Chrome extension that verifies the information on whatever page you are reading. Full RAG model in the backend, querying Perplexity AI.',
    img: '/projects/CheckMate.png',
    url: 'https://github.com/allenh99/checkMate',
    stack: 'Chrome Extension · RAG · Perplexity AI',
    period: '2025',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    desc: 'This site. TypeScript and Next.js on the front, AWS on the back — Amazon SES relays the contact form to my inbox and DynamoDB stores subscribers.',
    img: '/projects/Portfolio-logo.png',
    url: 'https://github.com/2023EvanZ/evan-zhang-portfolio-25',
    stack: 'TypeScript · Next.js · AWS',
    period: '2025',
  },
]

export const social = [
  { label: 'GitHub', url: 'https://github.com/2023EvanZ' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/evan-zhang-1a2616167/' },
]
