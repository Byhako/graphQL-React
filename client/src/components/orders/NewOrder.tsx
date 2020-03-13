import React from 'react';
import DataClient from './DataClient';

const NewOrder = (props) => {
  const id: number = props.match.params.idClient;

  return (
    <div className="container">
      <h1 className="text-center my-5">Nuevo Pedido</h1>

      <div className="row">
        <div className="col-md-3">
          <DataClient id={id} />
        </div>
        <div className="col-md-9">
          pedido
        </div>
      </div>
    </div>
  );
};

export default NewOrder;