import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { CLIENTS_QUERY } from '../queries';

const Clients = () => (
  // pollInterval={1000}
  <Query query={CLIENTS_QUERY} fetchPolicy="network-only">
    {({ loading, error, data, startPolling, stopPolling }): any => {
      if (loading) return 'Loading...'
      if (error) return `Error: ${error.message}`

      return (
        <Fragment>
          <h2 className='text-center mt-4'>Lista de Clientes</h2>
          <ul className='list-group mt-4'>
            {data.getClients.map((item: any) => (
              <li key={item.id} className='list-group-item'>
                <div className='row justify-content-between align-items-center'>
                  <div className='col-8 d-flex justify-content-between align-items-center'>
                   {`${item.name} ${item.surname} - ${item.company}`}
                   <small>{item.type}</small>
                  </div>
                  <div className='col-4 d-flex justify-content-end'>
                   <Link to={`/edit/${item.id}`} className='btn btn-success d-block d-md-inline-block'>Editar Cliente</Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fragment>
      )
    }}
  </Query>
);

export default Clients;
