import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RootSession } from './AppRouter';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
  uri: "http://localhost:5050/graphql",
  // Send toke to server
  fetchOptions: { credentials: 'include' },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: { authorization: token }
    })
  },
  cache: new InMemoryCache({ addTypename: true }),
  onError: ({ networkError, graphQLErrors }) => {
    console.error('graphQL Errors', graphQLErrors);
    console.error('network Error', networkError);
  }
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <RootSession />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
