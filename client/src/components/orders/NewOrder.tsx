import React from 'react';
import DataClient from './DataClient';
import Products from './Products';

import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS } from '../../queries';

import './styles.css';

const NewOrder = (props) => {
  const id: number = props.match.params.idClient;

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "network-only",
    // variables: { limit: pagination.limit, offset }
  });

  if (loading) return <div className="spinner" />;
  if (error) return <p>{`Error Server: ${error.message}`}</p>;

  return (
    <div className="container">
      <h1 className="text-center my-5">Nuevo Pedido</h1>

      <div className="row">
        <div className="col-md-3">
          <DataClient id={id} />
        </div>
        <div className="col-md-9">
          <Products
            id={id}
            products={data.getProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default NewOrder;