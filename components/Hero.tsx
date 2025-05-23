'use client'

import { useState } from 'react'

const info = [
  {
    id: 'education',
    label: 'Education',
    desc:
      `As previously stated, I am currently a CS student at the University of Virginia (UVA). I also graduated from 
      Thomas Jefferson High School for Science. In freshmen year of high school I became obsessed with the 
      problem-solving nature of computer science, and since then have pursued numerous courses to build upon that curiosity.
      I have taken courses in Data Structure and Algorithms, Computer System and Organizations, Discrete Math Theroy, Software Development Essentials,
      Software Engineering, Artificial Intelligence, Multivariable Calculus, Linear Algebra, and Probability. This upcoming year I plan to take 
      courses in Databases, Cloud Computing, Natural Language Processing, Machine Learning, and Data Analysis with Python.  
      Combined, I have over half a decade of experience in programming.`,
  },
{
    id: 'skills',
    label: 'Skills',
    desc:
      `I am proficent in several programming languages, including Java, Python, JavaScript, R, C/C++, SQL, and TypeScript. Specifically, I have 
      extensive experience with technologies such as React.js, React Native, Angular, Django, Flask, MongoDB, Next.js, TensorFlow, Android SDK, 
      iOS SDK, Bootstrap, and Tailwind. Furthermore, I have studied concepts like Operating Systems, Artificial Intelligence, Machine Learning, 
      Restful APIs, Cloud, Software Development, Databases, UI/UX Design, and Web-scraping. In terms of soft skills, I am excellent at communicating,
      problem solving, critical thinking, and have displayed leadership countless times throughout my life.`,
  },
  {
    id: 'hobbies',
    label: 'Hobbies',
    desc:
      `When I am not stuyding for school, I love to develop new programs and applications that involve new, cutting-edge technology and makes
      a positive benefit on the users' lives. Besides programming, I also am an avid runner and reader -- I love reading self-improvement books,
      which reflects my desire to grow stronger and more knowledgeable everyday. Additionally, I like to swim or play volleyball with friends. 
      Whenever possible, I enjoy traveling the world and digesting new, immersive experiences. I especially delight in trips where the nature
      is simply stunning!`,
  },
]

export default function Hero() {
  const [activeId, setActiveId] = useState(info[0].id)

  return (
    <section id="home" className="text-fg">
      <div
        className="
          relative h-[50vh] sm:h-[60vh] md:h-[70vh]
          bg-[url('/Evan-Zhang-Hero.jpg')] bg-center bg-cover
        "
      >
        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
          <div className="space-y-6 text-center md:text-left max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Hi, I’m <br /> Evan Zhang
            </h1>
            <p className="max-w-md">
              I’m a computer science student at the University of Virginia!
            </p>
            <button
              onClick={() => document.getElementById('follow')?.scrollIntoView({ behavior: 'smooth' })}
              className="
                mt-4 px-6 py-3 rounded-md font-medium transition-colors duration-200
                bg-accent text-bg
                hover:bg-purple-600
              "
            >
              More →
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl min-h-[350px]">
        <div className="flex justify-between mb-6">
          {info.map(item => {
            const isActive = item.id === activeId
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`
                  flex-1 text-center px-4 pb-2 font-medium transition
                  ${isActive
                    ? 'text-fg border-b-2 border-accent'
                    : 'text-fg/40 hover:text-fg'}
                `}
              >
                {item.label}
              </button>
            )
          })}
        </div>
        <div className="text-fg text-base leading-relaxed">
          {info.map(item =>
            item.id === activeId ? <p key={item.id}>{item.desc}</p> : null
          )}
        </div>
      </div>
    </section>
  )
}
