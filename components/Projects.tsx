// components/ProjectCarousel.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  id: string
  title: string
  desc: string
  img: string
  url: string
}

const projects: Project[] = [
  {
    id: 'go-loco',
    title: 'Go Loco',
    desc: 'GoLoco is a short-form content platform that promotes small business. Tourists can browse this app and see all the small businessses nearby and go there to support them.',
    img: '/projects/Go-Loco-Logo.png',
    url: 'https://github.com/2023EvanZ/wics-sp2025'    // ← replace with your real link
  },
  {
    id: 'kitchenware',
    title: 'Kitchenware',
    desc: 'Worked with a team in a semester to build out a full-stack project where users can request and loan kitchen items. Includes a in-app messaging system, real-time notification system, and a database.',
    img: '/projects/Kitchenware-logo.png',
    url: 'https://github.com/2023EvanZ/swe-project-sp25'    // ← replace with your real link

  },
  {
    id: 'checkmate',
    title: 'CheckMate',
    desc: 'Created a google chrome extension that verifies any information on a website the user is own. Worked with a team to build out a full RAG model in the backend with queries to Perplexity AI.',
    img: '/projects/CheckMate.png',
    url: 'https://github.com/allenh99/checkMate'    // ← replace with your real link
  },
]

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
  }),
}

export default function ProjectCarousel() {
  const [[idx, direction], setState] = useState<[number, number]>([0, 0])
  const len = projects.length

  const paginate = (newDirection: number) => {
    setState([
      (idx + newDirection + len) % len,
      newDirection,
    ])
  }

  const project = projects[idx]

  return (
    <section
      id="projects"
      className="bg-bg text-fg flex items-center justify-center h-[80vh] overflow-hidden"
    >
      <div className="container mx-auto px-6 flex flex-col items-center justify-center h-full">
        <h2 className="text-4xl md:text-5xl font-semibold mb-12">
          My Featured Projects
        </h2>
        <div className="relative flex items-center justify-center w-full max-w-3xl">
          {/* Prev */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 text-fg/60 hover:text-fg p-3 text-4xl"
            aria-label="Previous"
          >
            ‹
          </button>

          {/* AnimatePresence for one slide */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={project.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="w-full max-w-lg h-[50vh] flex flex-col items-center gap-4 pt-6"
            >
              {/* Clickable image */}
              <Link href={project.url} className="block">
                <Image
                  src={project.img}
                  alt={project.title}
                  width={250}
                  height={250}
                  className="rounded-full object-cover ring-4 ring-accent"
                />
              </Link>

              {/* Title and description */}
              <h3 className="text-2xl md:text-3xl font-bold text-center">
                <Link href={project.url} className="hover:text-accent transition">
                  {project.title}
                </Link>
              </h3>
              <p className="max-w-xl text-center text-base md:text-lg leading-relaxed">
                {project.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Next */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 text-fg/60 hover:text-fg p-3 text-4xl"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
