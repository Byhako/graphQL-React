import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const closeSession = (client, history) => {
  localStorage.removeItem('token');
  // logout client
  client.resetStore();
  // redirect
  history.push('/login');
};

const CloseSession = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return (
        <button
          type='button'
          onClick={() => closeSession(client, history)}
          className="btn btn-outline-secondary btn-sm ml-md-2 mt-2 mt-md-0"
        >
          Cerrar Sesión
        </button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(CloseSession);
