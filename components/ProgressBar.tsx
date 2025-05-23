'use client'
import { useLayoutEffect, useEffect, useState, useRef } from 'react'

const sections = [
  { id: 'home',     label: 'Home'     },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'contact',  label: 'Contact'  },
  { id: 'follow',   label: 'Follow'   },
]

export default function ProgressBar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const axisRef      = useRef<HTMLDivElement>(null)
  const markerRef    = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [scrollProg, setScrollProg] = useState(0)
  const [range, setRange] = useState({ start: 0, end: 0 })

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = sections.findIndex(s => s.id === e.target.id)
            if (idx >= 0) setActiveIdx(idx)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      setScrollProg(doc.scrollTop / (doc.scrollHeight - window.innerHeight))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    const measure = () => {
      if (!axisRef.current || !markerRef.current) return
      const axisRect   = axisRef.current.getBoundingClientRect()
      const markerH    = markerRef.current.getBoundingClientRect().height
      const dots       = document.querySelectorAll<HTMLElement>('.pn-dot')
      if (dots.length < 2) return

      const firstDot   = dots[0].getBoundingClientRect()
      const lastDot    = dots[dots.length-1].getBoundingClientRect()

      const startCenter = firstDot.top + firstDot.height/2 - axisRect.top
      const endCenter   = lastDot.top  + lastDot.height/2  - axisRect.top

      setRange({
        start: startCenter - markerH/2,
        end:   endCenter   - markerH/2,
      })
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const markerTop = Math.min(
    Math.max(range.start + scrollProg * (range.end - range.start), range.start),
    range.end
  )

  return (
    <div
      ref={containerRef}
      className="fixed left-8 top-0 bottom-0 flex items-center z-50
                 py-4 sm:py-8 md:py-12"
    >
      <div
        ref={axisRef}
        className="relative h-full w-[3px] bg-fg/50"
      >
        <div
          ref={markerRef}
          className="absolute left-1/2 transform -translate-x-1/2
                     w-4 h-4 bg-accent rounded-full ring-2 ring-fg
                     transition-all duration-200"
          style={{ top: `${markerTop}px` }}
        />
      </div>

      <ul className="ml-4 flex flex-col justify-between h-full">
        {sections.map((sec, i) => (
          <li key={sec.id}>
            <a href={`#${sec.id}`} className="flex items-center space-x-2 group">
              <span
                className={`pn-dot block w-2 h-2 rounded-full ${
                  i === activeIdx ? 'bg-accent' : 'bg-fg/40'
                } group-hover:bg-accent transition`}
              />
              <span
                className={`text-xs font-mono ${
                  i === activeIdx ? 'text-fg' : 'text-fg/50'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
