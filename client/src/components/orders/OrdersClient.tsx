import React from 'react';
import Article from './Article';

import { useMutation } from '@apollo/react-hooks';
import { UPDATE_ORDER } from '../../mutations';

const OrdersClient = (props) => {
  const { orders, refetch } = props;
  const dateFormat = new Date(Number(orders.date));
  const { id, order, total, client, state } = orders;

  const [updateOrder] = useMutation(UPDATE_ORDER, {
    onCompleted: () => refetch(),
    onError: (error) => console.log(error)
  });

  let clase;

  if (state === 'PENDING') {
    clase = 'bg-warning';
  } else if (state === 'COMPLETED') {
    clase = 'bg-success';
  } else {
    clase = 'bg-danger';
  }

  const handleOnChane = (value: string) => {
    const orderOld = order.map(item => ({
      quantity: item.quantity,
      id: item.id
    }));

    const input = {
      id,
      order: orderOld,
      total,
      date: new Date(),
      client,
      state: value,
    };

    updateOrder({ variables: { input } });
  };

  return (
    <div className="col-md-4">
        <div className={`card mb-3 `} >
          <div className="card-body">
            <p className={`card-text font-weight-bold p-2 ${clase}`}>Estado:
              <select
                className="form-control my-3"
                value={state}
                onChange={(e) => handleOnChane(e.target.value)}
                disabled={state === 'COMPLETED'}
              >
                <option value="PENDING">PENDIENTE</option>
                <option value="COMPLETED">COMPLETADO</option>
                <option value="CANCELLED">CANCELADO</option>
              </select>
            </p> 
            <p className="card-text font-weight-bold">ID:
              <span className="font-weight-normal"> {id}</span>
            </p> 
            <p className="card-text font-weight-bold">Fecha Pedido: 
              <span className="font-weight-normal">
                &nbsp;{dateFormat.toLocaleString('es-MX')}
              </span>
            </p>
            <p className="card-text font-weight-bold">Total: 
              <span className="font-weight-normal"> ${total}</span>
            </p>

            <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
            {order.map((item) => (
              <Article key={item.id} order={item} />
            ))}
          </div>
        </div>
      </div>
  )
};

export default OrdersClient;
