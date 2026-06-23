import type { NextPage } from 'next'
import Head from 'next/head'
import About from '../src/containers/about'
import Hero from '../src/containers/hero'
import Projects from '../src/containers/projects'
import Technologies from '../src/containers/technologies'
import { Window } from '../src/components/window'
import { ArrowRight } from '../src/components/icons'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hedênica | Frontend Engineer</title>
        <meta name="description" content="Welcome, make yourself at home" />
      </Head>
      <Hero />
      <About />
      <Technologies />
      <Projects />

      <div className="w-full">
        <Window id="contact" title="contact" accentEdge>
          <h1 className="text-3xl sm:text-4xl">
            <span className="highlight">Let&apos;s</span> work together
          </h1>
          <p className="mt-4 max-w-xl text-fg-muted">
            Got a project in mind or just want to say hi? I&apos;m one message
            away.
          </p>
          <a
            href="https://www.linkedin.com/in/hedenica/"
            target="_blank"
            rel="noreferrer"
            className="glass mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm text-fg transition-colors hover:text-accent"
          >
            let&apos;s-work-together
            <ArrowRight size={14} />
          </a>
        </Window>
      </div>
    </>
  )
}

export default Home
