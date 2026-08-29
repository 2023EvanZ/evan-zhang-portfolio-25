'use client'
import { useEffect, useState } from 'react'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'follow', label: 'Follow' },
  { id: 'contact', label: 'Contact' },
]

/*
  Section rail. Hidden while the pool hero is on screen — the hero has its own
  depth indicator, and a second rail on top of it just reads as clutter.
*/
export default function ProgressBar() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const idx = sections.findIndex((s) => s.id === e.target.id)
          if (idx >= 0) setActiveIdx(idx)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const hero = document.getElementById('home')
    if (!hero) return
    const obs = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [])

  return (
    <nav
      aria-label="Sections"
      className={`fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 lg:block ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <ul className="flex flex-col gap-5">
        {sections.map((sec, i) => (
          <li key={sec.id}>
            <a
              href={`#${sec.id}`}
              className="group flex items-center gap-3"
              aria-current={i === activeIdx ? 'true' : undefined}
            >
              <span
                className={`block h-px transition-all duration-300 ${
                  i === activeIdx
                    ? 'w-6 bg-accent'
                    : 'w-3 bg-fg/25 group-hover:w-5 group-hover:bg-fg/60'
                }`}
              />
              <span
                className={`font-mono text-[10px] uppercase tracking-[.18em] transition-colors ${
                  i === activeIdx ? 'text-accent' : 'text-fg/30 group-hover:text-fg/70'
                }`}
              >
                {sec.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
