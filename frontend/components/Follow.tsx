'use client'

import { useState } from 'react'
import SubscribeModal from './SubscribeModal'

export default function Follow() {
  const [isSubscribeOpen, setSubscribeOpen] = useState(false)

  return (
    <section id="follow" className="px-6 pb-20 md:px-16 md:pb-[110px] lg:px-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="font-mono text-[12px] font-medium uppercase leading-[1.6] tracking-[.2em] text-accent">
            Growing every day
          </div>

          <div>
            <p className="m-0 max-w-[620px] font-serif text-[24px] font-light leading-[1.45] text-[#dcecf4] text-pretty md:text-[30px]">
              I document what I learn so the next person does not have to learn it
              the same slow way.
            </p>
            <p className="mt-6 max-w-[620px] text-[15px] leading-[1.8] text-fg/[.68] text-pretty md:text-[16px]">
              I love pushing my limits and picking up new concepts, especially when I
              can turn around and put them straight into my work. Sharing what worked
              and what did not is the part that outlasts any single project. I post as
              consistently as I can — follow the journey or subscribe and I&rsquo;ll come
              to you.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://www.linkedin.com/in/evan-zhang-1a2616167/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent px-8 py-4 font-mono text-[12px] font-medium uppercase leading-none tracking-[.18em] text-bg transition-colors hover:bg-accent-bright"
              >
                Follow my journey
              </a>
              <button
                type="button"
                onClick={() => setSubscribeOpen(true)}
                className="border border-accent/60 px-8 py-4 font-mono text-[12px] font-medium uppercase leading-none tracking-[.18em] text-accent transition-colors hover:border-accent hover:bg-accent/10"
              >
                Subscribe to blog
              </button>
            </div>

            <SubscribeModal
              isOpen={isSubscribeOpen}
              onClose={() => setSubscribeOpen(false)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
