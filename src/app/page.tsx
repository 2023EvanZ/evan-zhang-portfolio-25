import Hero from '../../components/Hero'
import Projects     from '../../components/Projects'
import Timeline     from '../../components/Timeline'
import Contact      from '../../components/Contact'
import Follow from '../../components/Follow'

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Timeline />
      <Follow />
      <Contact />
    </main>
  )
}