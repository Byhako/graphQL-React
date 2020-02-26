import React from 'react';
import { Query } from 'react-apollo';
import { CLIENTS_QUERY } from '../queries';

const Clients = () => (
  <Query query={CLIENTS_QUERY}>
    {({ loading, error, data }): any => {
      if (loading) return 'Loading...'
      if (error) return `Error: ${error.message}`
      console.log(data)
      return (
        <h2 className='text-center'>Lista de Clientes</h2>

      )
    }}
  </Query>
);

export default Clients;
