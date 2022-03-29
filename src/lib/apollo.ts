import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/ckzscad4n02pb01zafme3cz97/master',
  cache: new InMemoryCache()
});

export { client }