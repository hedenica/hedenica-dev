import type { NextPage } from 'next'
import Head from 'next/head'
import About from '../src/containers/about'
import Hero from '../src/containers/hero'
import Projects from '../src/containers/projects'
import Technologies from '../src/containers/technologies'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hedênica | Portfolio</title>
        <meta name="description" content="Welcome, make yourself at home" />
      </Head>
      <main>
        <Hero />
        <About />
        <Technologies />
        <Projects />
      </main>
    </>
  )
}

export default Home
