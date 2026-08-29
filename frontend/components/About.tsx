const blocks = [
  {
    id: 'who',
    eyebrow: 'Who I am',
    lead:
      'I got hooked on problem-solving freshman year of high school and never really got unhooked. Everything since has been some version of that same itch.',
    body: [
      `Thomas Jefferson High School for Science and Technology first, then UVA, where I finished two bachelor's degrees — computer science and applied statistics — in May 2026 with a 3.9. I'm still there now, working on a master's in computer science that should wrap up May 2027.`,
      `The coursework is behind me rather than ahead of me at this point: data structures and algorithms, artificial intelligence, machine learning, natural language processing, probability, linear algebra, and data analysis with Python. Grad school is where it stops being a syllabus and starts being a question you have to pick yourself.`,
      `Right now that means three things. I'm doing research on autonomous driving systems — the datasets and the safety-critical scenarios that break them. I'm building agentic workflows, which is also what I do at ChronoOS, so the research and the job keep feeding each other. And I'm working through systems and data center architecture at the graduate level, because I want to actually understand the machines underneath everything I've been writing on top of.`,
    ],
  },
  {
    id: 'drives',
    eyebrow: 'What drives me',
    lead:
      'I want the things I build to matter to somebody. Clever is easy to come by; useful is the harder and more interesting target.',
    body: [
      `Impact is the point. I'd rather ship something a real person depends on than something that only looks good in a demo, and that preference has shaped basically every project I've picked up. It's also why I like the unglamorous parts — the test suite, the pipeline, the thing that quietly stops breaking.`,
      `Past that, I'm trying to stay a lifelong learner, personally and professionally. I don't think I'll ever be finished, and I've made peace with that. The fastest growth I've had has always come right after admitting I didn't understand something.`,
      `And I take ownership of what I put my name on. If I built it, I'm the one who chases the bug at 11pm, writes the doc nobody asked for, and follows the fix all the way into production. That's not heroics, it's just the deal — the work is mine until it's genuinely done.`,
    ],
  },
]

export default function About() {
  return (
    <section id="about" className="border-t border-white/[.09] px-6 py-20 md:px-16 md:py-[110px] lg:px-24">
      <div className="mx-auto max-w-[1120px] space-y-20 md:space-y-[110px]">
        {blocks.map((b) => (
          <div key={b.id} className="grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
            <div className="font-mono text-[12px] font-medium uppercase leading-[1.6] tracking-[.2em] text-accent">
              {b.eyebrow}
            </div>
            <div>
              <p className="m-0 font-serif text-[24px] font-light leading-[1.45] text-[#dcecf4] text-pretty md:text-[30px]">
                {b.lead}
              </p>
              {b.body.map((p, i) => (
                <p
                  key={i}
                  className="mt-6 max-w-[620px] text-[15px] leading-[1.8] text-fg/[.68] text-pretty md:mt-7 md:text-[16px]"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
