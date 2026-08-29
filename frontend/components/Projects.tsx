import Image from 'next/image'
import { projects } from './siteData'

export default function Projects() {
  return (
    <section id="projects" className="px-6 pb-20 md:px-16 md:pb-[110px] lg:px-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="font-mono text-[12px] font-medium uppercase leading-[1.6] tracking-[.2em] text-accent">
            Selected work
          </div>

          <div className="grid gap-px bg-white/[.09]">
            {projects.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid items-start gap-6 bg-bg py-[34px] transition-colors md:grid-cols-[1fr_240px] md:gap-10"
              >
                <div className="flex items-start gap-5">
                  <Image
                    src={p.img}
                    alt=""
                    width={56}
                    height={56}
                    className="mt-1 size-14 flex-none rounded-full object-cover ring-1 ring-accent/40 transition group-hover:ring-accent"
                  />
                  <div>
                    <div className="font-serif text-[24px] font-normal text-white transition-colors group-hover:text-accent md:text-[26px]">
                      {p.title}
                    </div>
                    <p className="mt-[10px] max-w-[520px] text-[15px] leading-[1.7] text-fg/[.62] text-pretty">
                      {p.desc}
                    </p>
                  </div>
                </div>
                <div className="font-mono text-[12px] leading-[2] text-accent">
                  {p.stack}
                  <br />
                  {p.period}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
