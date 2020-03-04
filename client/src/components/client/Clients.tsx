import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_CLIENTS } from '../../queries';
import { DELETE_CLIENT } from '../../mutations';

import Pager from '../Layout/Pager';

const Clients = () => {
  interface Pagination {
    limit: number,
    page: number,
  }
  const [pagination, setPagination] = useState<Pagination>({
    limit: 5,
    page: 1,
  });
  const [message, setMessage] = useState<string>('');
  const offset = pagination.limit * (pagination.page - 1);
  // pollInterval={1000}
  const { loading, error, data, refetch } = useQuery(GET_CLIENTS, {
    fetchPolicy: "network-only",
    variables: { limit: pagination.limit, offset }
  });

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  }, [message]);

  const [deleteClient] = useMutation(DELETE_CLIENT,{
    onCompleted: () => refetch(),
    onError: (error) => console.log(error)
  });

  const changePage = (change: number) => {
    let { page } = pagination;
    page = page + change;
    setPagination({ ...pagination, page });
  }

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{`Error Server: ${error.message}`}</p>;

  return (
    <div className='container'>
      <h2 className='text-center mt-4'>Lista de Clientes</h2>
      {message && (
        <h5 className='alert alert-success p-3 w-100 text-center'>{message}</h5>
      )}
      <ul className='list-group mt-4'>
        {data.getClients.map((item: any) => (
          <li key={item.id} className='list-group-item'>
            <div className='row justify-content-between align-items-center'>
              <div className='col-8 d-flex justify-content-between align-items-center'>
              {`${item.name} ${item.surname} - ${item.company}`}
              <small>{item.type}</small>
              </div>

              <div className='col-4 d-flex justify-content-end'>
                <button
                  className='btn btn-danger d-block d-md-inline-block btn-sm'
                  onClick={() => {
                    if (window.confirm(`Deseas borrar a ${item.name} ${item.surname}?`)) {
                      deleteClient({ variables: { id: item.id } })
                      setMessage(`${item.name}  ${item.surname} borrado con exito.`);
                    }
                  }}
                >Borrar</button>
                <Link to={`/editClient/${item.id}`} className='btn btn-success d-block d-md-inline-block ml-5 btn-sm'>Editar</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Pager
        pagination={pagination}
        numberClients={data.numberClients}
        changePage={changePage}
      />
    </div>
  );
};

export default Clients;