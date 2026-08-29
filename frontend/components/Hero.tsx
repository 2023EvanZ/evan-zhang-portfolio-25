'use client'

import dynamic from 'next/dynamic'
import { milestones } from './siteData'

// WebGL only ever runs in the browser; keep three.js out of the server render.
const PoolWorld = dynamic(() => import('./PoolWorld'), { ssr: false })

const nav = [
  { label: 'Work', href: '#timeline' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Hero() {
  return (
    <section id="home" className="relative h-[560px] md:h-[720px] bg-[#062033]">
      <PoolWorld milestones={milestones} />

      {/* Scrim: the nearest lane marker drifts behind the headline, and the pool
          floor is bright enough that text-shadow alone does not carry the copy. */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-[#041624]/90 via-[#041624]/60 to-[#041624]/10 md:inset-y-0 md:left-0 md:w-3/5 md:bg-gradient-to-r md:from-[#041624]/85 md:via-[#041624]/35 md:to-transparent" />

      <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-6 md:px-8 md:py-[26px]">
        <div className="font-mono text-[13px] font-medium uppercase leading-none tracking-[.22em] text-fg/90">
          Evan Zhang
        </div>
        <div className="pointer-events-auto hidden gap-[26px] font-mono text-[12px] uppercase leading-none tracking-[.16em] text-fg/60 sm:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-accent">
              {n.label}
            </a>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute left-6 right-6 top-[110px] z-30 max-w-[520px] md:left-8 md:right-auto md:top-[130px]">
        <h1 className="font-serif text-[44px] font-light leading-[1.02] tracking-[-0.03em] text-white [text-shadow:0_8px_40px_rgba(0,20,40,.6)] sm:text-[56px] md:text-[68px]">
          Six years, one long lane.
        </h1>
        <p className="mt-[22px] max-w-[420px] text-[15px] leading-[1.7] text-fg/[.78] md:text-[16px]">
          Computer science and statistics at the University of Virginia. Software
          engineering, machine learning, and the unglamorous middle of the stack.
          Swim down the lane to read the timeline.
        </p>
      </div>
    </section>
  )
}
