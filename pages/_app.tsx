import type { AppProps } from 'next/app'

import Navbar from '../src/components/navbar'
import Footer from '../src/components/footer'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
