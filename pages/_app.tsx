import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '../src/lib/apollo'

import Navbar from '../src/components/navbar'
import Footer from '../src/components/footer'

import '../styles/globals.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: AppProps & { pageProps: { apolloState: any } }) {
  if (pageProps.apolloState) {
    client.restore(pageProps.apolloState)
  }

  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  )
}

export default MyApp
