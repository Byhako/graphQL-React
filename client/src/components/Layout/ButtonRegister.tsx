import React from 'react';
import { Link } from 'react-router-dom';

const ButtonRegister = () => {

  return (
    <Link
      to='/register'
      className="btn btn-outline-dark btn-sm ml-md-2 mt-2 mt-md-0 d-flex align-items-center"
    >
      Registrar Usuarios
    </Link>
  )
};

export default ButtonRegister;
