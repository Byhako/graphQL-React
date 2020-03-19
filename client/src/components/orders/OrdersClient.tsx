import React from 'react';
import Article from './Article';

const OrdersClient = (props) => {
  const { orders } = props;
  const date = new Date(Number(orders.date));

  return (
    <div className="col-md-4">
        <div className={`card mb-3`} >
          <div className="card-body">
            <p className="card-text font-weight-bold ">Estado:
              <select
                className="form-control my-3"
                value={orders.state}
                onChange={() => console.log()}
              >
                <option value="PENDING">PENDIENTE</option>
                <option value="COMPLETED">COMPLETADO</option>
                <option value="CANCELLED">CANCELADO</option>
              </select>
            </p> 
            <p className="card-text font-weight-bold">ID:
              <span className="font-weight-normal"> {orders.id}</span>
            </p> 
            <p className="card-text font-weight-bold">Fecha Pedido: 
              <span className="font-weight-normal">
                &nbsp;{date.toLocaleString('es-MX')}
              </span>
            </p>
            <p className="card-text font-weight-bold">Total: 
              <span className="font-weight-normal"> ${orders.total}</span>
            </p>

            <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
            {orders.order.map((item) => (
              <Article key={item.id} order={item} />
            ))}
          </div>
        </div>
      </div>
  )
};

export default OrdersClient;
