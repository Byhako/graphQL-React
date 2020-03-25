import React from 'react';
import { Link } from 'react-router-dom';

const ButtonRegister = () => {

  return (
    <Link
      to='/register'
      className="btn btn-outline-dark btn-sm mr-0 mr-md-2 d-flex align-items-center justify-content-center mb-md-0 mb-2"
    >
      Registrar Usuarios
    </Link>
  )
};

export default ButtonRegister;
