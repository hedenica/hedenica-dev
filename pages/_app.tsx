import type { AppProps } from 'next/app'

import AppShell from '../src/components/appShell'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  )
}

export default MyApp
