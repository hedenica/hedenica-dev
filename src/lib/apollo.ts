import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.GRAPH_CMS_API,
  cache: new InMemoryCache()
});

export { client }