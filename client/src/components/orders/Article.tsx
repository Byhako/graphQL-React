import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT } from '../../queries';

const OrdersClient = (props) => {
  const { order } = props;

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    fetchPolicy: "network-only",
    variables: { id: order.id }
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{`Error Server: ${error.message}`}</p>;

  const product = data.getProduct;

  return (
    <div className='border mb-4 p-4' style={{ backgroundColor: 'whiteSmoke' }}>
      <p className="card-text font-weight-bold">
        Nombre:
        <span className="font-weight-normal"> {product.name}</span>
      </p>
      <p className="card-text font-weight-bold">
        Cantidad:
        <span className="font-weight-normal"> {order.quantity}</span>
      </p>
      <p className="card-text font-weight-bold">
        Precio:
        <span className="font-weight-normal"> ${product.price}</span>
      </p>
    </div>
  )
};

export default OrdersClient;
