import React from 'react';
import Clients from './Clients';

const Panel = ({ session }) => {

  return (
    <>
      <h1 className="text-center my-5">Top 5 Clientes que más Compran</h1>
      <Clients session={session} />
    </>
  )
};

export default Panel;
