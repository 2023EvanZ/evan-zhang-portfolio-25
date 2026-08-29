import { timeline } from './siteData'

export default function Timeline() {
  return (
    <section id="timeline" className="px-6 pb-20 md:px-16 md:pb-[110px] lg:px-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="font-mono text-[12px] font-medium uppercase leading-[1.6] tracking-[.2em] text-accent">
            Where I&rsquo;ve been
          </div>

          <div className="grid gap-px bg-white/[.09]">
            {timeline.map((item) => (
              <div
                key={`${item.title}-${item.period}`}
                className="grid gap-6 bg-bg py-[34px] md:grid-cols-[1fr_240px] md:gap-10"
              >
                <div>
                  <div className="font-serif text-[24px] font-normal text-white md:text-[26px]">
                    {item.title}
                  </div>
                  <div className="mt-1 text-[15px] text-fg/60">{item.subtitle}</div>
                  <ul className="mt-4 max-w-[560px] space-y-2">
                    {item.points.map((pt, j) => (
                      <li
                        key={j}
                        className="relative pl-5 text-[15px] leading-[1.7] text-fg/[.62] text-pretty before:absolute before:left-0 before:top-[10px] before:h-[3px] before:w-[3px] before:rounded-full before:bg-accent"
                      >
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="font-mono text-[12px] leading-[2] text-accent">
                  {item.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
