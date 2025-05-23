'use client'

import Image from 'next/image'

export default function Follow() {
  return (
    <section id="follow" className="relative h-screen flex justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Evan-Zhang-Picture.jpg"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-bg/80" />
      </div>

      {/* Content wrapper: 80% width */}
      <div className="relative flex w-4/5 max-w-[80vw] mx-auto h-full">
        {/* Left content (70%) */}
        <div className="w-7/12 flex flex-col justify-center pr-8">
          <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight text-fg">
            Growing<br/>
            Every Day.
          </h2>
          <div className="flex space-x-6">
            <a
              href="https://www.tiktok.com/@evan.codes"
              className="border border-accent bg-accent text-bg px-8 py-4 rounded-md font-medium hover:bg-accent/90 transition"
            >
              Follow My Journey
            </a>
            <a
              href="#"
              className="border border-accent text-accent px-8 py-4 rounded-md font-medium hover:bg-accent/10 transition"
            >
              Subscribe to Blog
            </a>
          </div>
        </div>

        {/* Right sidebar (30%) */}
        <aside className="hidden lg:flex flex-none w-5/12 flex-col justify-center pl-8 border-l border-fg/20">
          <h3 className="text-2xl font-semibold mb-4 text-fg">Growth</h3>
          <p className="text-sm leading-relaxed text-fg/70">
            is something that takes time and needs to be consistent. I love pushing my limits and learning new concepts, especially when
            I can then turn around and implement those concepts into my life and work. I also care deeply about sharing the lessons I learned
            to inspire and guide the future generations so that their potential far exceeds mine -- essentially, my ceiling
            should be their starting point. I do this by documentating my journey so that others can learn what worked and what didn't 
            work for me. I'll do my best to consistently post, so make sure to follow me on Tik Tok 
            and subscribe to my blog so you don't miss out on anything!
          </p>
        </aside>
      </div>
    </section>
  )
}