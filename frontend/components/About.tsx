const blocks = [
  {
    id: 'who',
    eyebrow: 'Who I am',
    lead:
      'I got obsessed with the problem-solving side of computer science in my freshman year of high school, and I have essentially been chasing that same feeling ever since.',
    body: [
      `Thomas Jefferson High School for Science and Technology first, then computer science and statistics at UVA. Along the way: data structures and algorithms, computer systems and organization, discrete math theory, software development essentials, software engineering, artificial intelligence, multivariable calculus, linear algebra, and probability. Databases, cloud computing, natural language processing, machine learning, and data analysis with Python are what's next.`,
      `In practice that means Java, Python, JavaScript, TypeScript, R, C/C++, and SQL, with React, React Native, Angular, Django, Flask, Next.js, TensorFlow, the Android and iOS SDKs, MongoDB, Bootstrap, and Tailwind on top of them. Over half a decade of writing programs, and the useful part has been learning which of those tools to leave in the bag.`,
    ],
  },
  {
    id: 'drives',
    eyebrow: 'What drives me',
    lead:
      'Growth takes time and it has to be consistent. My ceiling should be somebody else’s starting point.',
    body: [
      `I care about building things with cutting-edge technology that actually make someone's life better, and about writing down what worked and what did not so the people coming up behind me do not have to rediscover it. That is most of why I document the journey at all.`,
      `Away from a keyboard I run, I swim, I play volleyball, and I read a lot of self-improvement books — which is really just the same instinct pointed somewhere else. When I can, I travel; the trips where the nature is genuinely stunning are the ones that stay with me.`,
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
