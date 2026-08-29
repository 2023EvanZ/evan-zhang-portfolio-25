export default function Follow() {
  return (
    <section id="follow" className="px-6 pb-20 md:px-16 md:pb-[110px] lg:px-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="font-mono text-[12px] font-medium uppercase leading-[1.6] tracking-[.2em] text-accent">
            Growing every day
          </div>

          <div>
            <p className="m-0 max-w-[620px] font-serif text-[24px] font-light leading-[1.45] text-[#dcecf4] text-pretty md:text-[30px]">
              I document what I learn so the next person doesn&rsquo;t have to learn
              it the same slow way.
            </p>
            <p className="mt-6 max-w-[620px] text-[15px] leading-[1.8] text-fg/[.68] text-pretty md:text-[16px]">
              I love pushing my limits and picking up new things, especially when I can
              turn around and put them straight into my work. But the part that has
              actually stuck with me is the people. Teaching 50+ middle schoolers to write
              their first program, sitting with a student until their bug finally made
              sense, arguing through a design with teammates who cared as much as I did —
              that&rsquo;s the work I remember, not the commits.
            </p>
            <p className="mt-6 max-w-[620px] text-[15px] leading-[1.8] text-fg/[.68] text-pretty md:text-[16px]">
              So I try to invest in people the way people invested in me: share what
              worked and what didn&rsquo;t, answer the message, hand someone the shortcut I
              wish I&rsquo;d had. My ceiling should be somebody else&rsquo;s starting point, and
              that only happens if I&rsquo;m actually paying attention to the people around me.
            </p>

            <div className="mt-8">
              <a
                href="https://www.linkedin.com/in/evan-zhang-1a2616167/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent px-8 py-4 font-mono text-[12px] font-medium uppercase leading-none tracking-[.18em] text-bg transition-colors hover:bg-accent-bright"
              >
                Let&rsquo;s connect
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
