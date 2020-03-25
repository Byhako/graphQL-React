import React from 'react';

const Pager = (props) => {
  const { pagination: { limit, page }, numberClients, changePage } = props;

  const totalPages: number = Math.ceil(numberClients/limit);

  return (
    <div className='mt-5 d-flex justify-content-center align-items-center'>
      <button
        type='button'
        className='btn btn-outline-dark btn-sm'
        style={{ visibility: page > 1 ? 'visible' : 'hidden' }}
        onClick={() => changePage(-1)}
      >&laquo; Anterior</button>
      <p className='m-0 ml-5 mr-5'>Página {page}</p>
      <button
        type='button'
        className='btn btn-outline-dark btn-sm'
        style={{ visibility: page < totalPages ? 'visible' : 'hidden' }}
        onClick={() => changePage(1)}
      >Siguiente &raquo;</button>
    </div>
  )
};

export default Pager;