import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const closeSession = (client, history) => {
  localStorage.removeItem('token');
  // logout client
  client.resetStore();
  // redirect
  history.push('/');
};

const CloseSession = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return (
        <button
          type='button'
          onClick={() => closeSession(client, history)}
          className="btn btn-outline-secondary btn-sm"
        >
          Cerrar Sesión
        </button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(CloseSession);
