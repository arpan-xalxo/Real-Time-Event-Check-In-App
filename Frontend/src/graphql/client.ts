import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { authStore } from '../store/authStore';

const httpLink = createHttpLink({
  uri: 'http://192.168.31.200:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = authStore.getState().token;
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
}); 