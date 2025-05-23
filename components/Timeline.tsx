import { ReactNode } from 'react'
import { Calendar } from 'lucide-react' 

interface TimelineItem {
  period: string
  title: string
  subtitle?: string
  points: string[]
  icon?: ReactNode
}

const timeline: TimelineItem[] = [
  {
    period: 'Jun 2024 – Aug 2024',
    title: 'Assistant Lead Developer',
    subtitle: 'Pangu - Startup',
    points: [
      'Team of 5 created a start-up e-commerce website for college students under the supervision of a current Software Engineer.',
      'Implemented 10+ frontend features with React and Tailwind. Built 5+ backend features with robust APIs with Express for secure authentication and used Supabase for database.',
      'Built and executed numerous unit tests and end-to-end tests ensuring sufficient code coverage.'
    ],
    icon: <Calendar size={20} className="text-accent" />
  },
  {
    period: 'May 2024 – Aug 2024',
    title: 'Lead Instructor',
    subtitle: 'Fairfax Collegiate',
    points: [
      'Taught over 50 middle-school students of various skill levels and taught them to program complex algorithms and games in Python.',
      'Created 80 lectures with custom activities for student learning and handled communication with parents.',
      'Substituted for other classes and monitored students during break time to ensure their safety.'
    ],
    icon: <Calendar size={20} className="text-accent" />
  },
  {
    period: 'Jun 2023 – Aug 2023',
    title: 'Teacher Assistant',
    subtitle: 'Fairfax Collegiate',
    points: [
      'Assisted with teacher lectures by ensuring no mistakes were made, often gave impromptu ones to students struggling with concepts.',
      'Worked individually with students to help debug their programs and offer more in-depth and personalized lessons.',
      'Responsible for teaching students various sorting algorithmns, data structures, boolean logic, and game design.'
    ],
    icon: <Calendar size={20} className="text-accent" />
  },
]

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 bg-bg text-fg">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-semibold mb-12 text-center">My Journey</h2>
        <div className="relative before:absolute before:top-0 before:left-4 before:h-full before:w-px before:bg-fg/20">
          {timeline.map((item, i) => (
            <div key={i} className="relative mb-16 pl-12">
              {/* Icon circle */}
              <div className="absolute left-0 top-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1c20] ring-2 ring-accent">
                  {item.icon}
                </div>
              </div>

              {/* Card */}
              <div className="bg-[#1a1c20] p-6 rounded-md shadow-md">
                <span className="text-sm text-fg/70">{item.period}</span>
                <h3 className="mt-1 text-xl font-bold">{item.title}</h3>
                {item.subtitle && (
                  <p className="text-accent mb-4">{item.subtitle}</p>
                )}
                <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
                  {item.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
