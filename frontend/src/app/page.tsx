import Hero from '../../components/Hero'
import About from '../../components/About'
import Timeline from '../../components/Timeline'
import Projects from '../../components/Projects'
import Follow from '../../components/Follow'
import Contact from '../../components/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Follow />
      <Contact />
    </main>
  )
}
