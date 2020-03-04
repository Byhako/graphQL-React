import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_PRODUCTS } from '../../queries';
import { DELETE_PRODUCT } from '../../mutations';

import Pager from '../Layout/Pager';

const Product = () => {
  interface Pagination {
    limit: number,
    page: number,
  }
  const [pagination, setPagination] = useState<Pagination>({
    limit: 5,
    page: 0,
  })
  const offset = pagination.limit * pagination.page;
  // pollInterval={1000}
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "network-only",
    variables: { limit: pagination.limit, offset }
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT,{
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
    <Fragment>
      <h2 className='text-center mt-4'>Lista de Productos</h2>
      <ul className='list-group mt-4'>
        <li className='list-group-item'>
          <div className='row justify-content-between align-items-center'>
            <div className='col-4 d-flex justify-content-between align-items-center'>
              <strong>Producto</strong>
            </div>
            <div className='col-2 d-flex justify-content-between align-items-center'>
              <strong>Precio</strong>
            </div>
            <div className='col-2 d-flex justify-content-between align-items-center'>
              <strong>Stock</strong>
            </div>

            <div className='col-4 d-flex justify-content-end' />
          </div>
        </li>
        {data.getProducts.map((item: any) => (
          <li key={item.id} className='list-group-item'>
            <div className='row justify-content-between align-items-center'>
              <div className='col-4 d-flex justify-content-between align-items-center'>
                {`${item.name}`}
              </div>
              <div className='col-2 d-flex justify-content-between align-items-center'>
                {`$ ${item.price}`}
              </div>
              <div className='col-2 d-flex justify-content-between align-items-center'>
                {`${item.stock}`}
              </div>

              <div className='col-4 d-flex justify-content-end'>
                <button
                  className='btn btn-danger d-block d-md-inline-block btn-sm'
                  onClick={() => {
                    if (window.confirm(`Deseas borrar ${item.name}?`)) {
                      deleteProduct({ variables: { id: item.id } })
                    }
                  }}
                >Borrar</button>
                <Link to={`/editProduct/${item.id}`} className='btn btn-success d-block d-md-inline-block ml-5 btn-sm'>Editar</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Pager
        pagination={pagination}
        numberClients={data.numberProducts}
        changePage={changePage}
      />
    </Fragment>
  );
};

export default Product;
