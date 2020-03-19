import React from 'react';
import OrdersClient from './OrdersClient';

import { useQuery } from '@apollo/react-hooks';
import { GET_CLIENT, GET_ORDERS } from '../../queries';

const Order = (props) => {
  const { idClient } = props.match.params;
  const { loading, error, data } = useQuery(GET_CLIENT, {
    fetchPolicy: "network-only",
    variables: { id: idClient }
  });

  const {
    loading: loadingOrders,
    error: errorOrders,
    data: dataOrders,
    refetch } = useQuery(GET_ORDERS, {
    fetchPolicy: "network-only",
    variables: { id: idClient }
  });

  if (loading || loadingOrders) return <p>Cargando...</p>;
  if (error) return <p>{`Error Server: ${error.message}`}</p>;
  if (errorOrders) return <p>{`Error Server: ${errorOrders.message}`}</p>;

  return (
    <div className="container">
      <h1 className="text-center my-5">{`Pedidos de ${data.getClient.name}`}</h1>

      <div className="row">
        {dataOrders.getOrders.map((item) => (
          <OrdersClient key={item.id} orders={item} refetch={refetch} />
        ))}
      </div>
    </div>
  )
};

export default Order;
