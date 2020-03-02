import React from 'react';

const Pager = (props) => {
  const { page } = props;
  return (
    <div className='mt-5 d-flex justify-content-center align-items-center'>
      <button
        type='button'
        className='btn btn-outline-dark btn-sm'
        style={{ visibility: page > 0 ? 'visible' : 'hidden' }}
      >&laquo; Anterior</button>
      <p className='m-0 ml-5 mr-5'>Página {page + 1}</p>
      <button
        type='button'
        className='btn btn-outline-dark btn-sm'
        style={{ visibility: page > 10 ? 'hidden' : 'visible' }}
      >Siguiente &raquo;</button>
    </div>
  )
};

export default Pager;