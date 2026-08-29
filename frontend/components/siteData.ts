// Single source of truth for portfolio content.
// Shared by the 3D pool hero and the selected-work list.

export interface Milestone {
  year: string
  title: string
  body: string
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

/**
 * Markers you swim past in the pool hero, ordered newest -> oldest: swimming
 * down the lane walks backwards through the work. `year` is a short label
 * rendered into a canvas pill, not a date — keep it to a few characters.
 */
export const milestones: Milestone[] = [
  {
    year: 'NOW',
    title: 'Software Engineer — ChronoOS',
    body: 'Designing agentic AI workflows and feedback loops that analyze business data, generate and evaluate recommended actions, estimate expected gains, and learn from what actually happened.',
  },
  {
    year: '2026',
    title: 'Software Engineer Intern — Wells Fargo',
    body: 'A BDD regression suite of 61 end-to-end scenarios across check-processing workflows, and a SQL-backed resource pool that cut cross-browser runtime by 37%.',
  },
  {
    year: '2025',
    title: 'Software Engineer Intern — GEICO',
    body: 'Production UI components inside an internal design system used by hundreds of engineers, plus 50+ automated tests in the CI pipeline.',
  },
  {
    year: '2024',
    title: 'Assistant Lead Developer — Pangu',
    body: 'Team of five building an e-commerce startup for college students. 10+ frontend features in React, 5+ backend features on Express and Supabase.',
  },
  {
    year: '2024',
    title: 'Lead Instructor — Fairfax Collegiate',
    body: 'Taught 50+ middle-school students to write algorithms and games in Python across 80 lectures I wrote myself.',
  },
  {
    year: '2023',
    title: 'Teacher Assistant — Fairfax Collegiate',
    body: 'Backed up lectures, gave impromptu ones, and sat with students one on one to debug their programs.',
  },
  {
    year: 'UVA',
    title: 'University of Virginia',
    body: "Bachelor's in computer science and applied statistics, May 2026, 3.9 GPA. Master's in computer science at UVA, expected May 2027.",
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
    stack: 'Python · Django · REST APIs · AWS · PostgreSQL',
    period: '2025',
  },
  {
    id: 'checkmate',
    title: 'CheckMate',
    desc: 'A Chrome extension that verifies the information on whatever page you are reading. Full RAG model in the backend, querying Perplexity AI.',
    img: '/projects/CheckMate.png',
    url: 'https://github.com/allenh99/checkMate',
    stack: 'Gemini · Perplexity · Selenium',
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
