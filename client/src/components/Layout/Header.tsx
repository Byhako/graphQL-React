import React from 'react';
import { Link } from 'react-router-dom';
import CloseSession from './CloseSession';
import ButtonRegister from './ButtonRegister';

const NoAuth = () => (
  <nav className='navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex'>
    <div className='container'>
      <Link
        to='/login'
        className='navbar-brand text-light font-weight-bold'
      >CRM
      </Link>
    </div>
  </nav>
);

const YesAuth = ({ session }) => (
  <nav className='navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex'>
    <div className='container'>
      <Link
        to='/panel'
        className='navbar-brand text-light font-weight-bold'
      >CRM</Link>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navigation' aria-controls='navigation' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon' />
      </button>

      <div className='collapse navbar-collapse' id='navigation'>
        <ul className='navbar-nav ml-auto text-right'>
          <li className='nav-item dropdown mt-md-0 mt-2'>
            <button
              className='nav-link dropdown-toggle btn btn-block btn-info'
              data-toggle='dropdown'
            >Clientes</button>
            <div className="dropdown-menu" aria-labelledby='navigacion'>
              <Link
                to='/clients'
                className='dropdown-item'
              >Clientes</Link>
              <Link
                to='/createClient'
                className='dropdown-item'
              >Nuevo Cliente</Link>
            </div>
          </li>

          <li className='nav-item dropdown mx-md-2 mx-0 my-md-0 my-2'>
            <button
              className='nav-link dropdown-toggle btn btn-block btn-info'
              data-toggle='dropdown'
            >Productos</button>
            <div className="dropdown-menu" aria-labelledby='navigacion'>
              <Link
                to='/products'
                className='dropdown-item'
              >Productos</Link>
              <Link
                to='/createProduct'
                className='dropdown-item'
              >Nuevo Producto</Link>
            </div>
          </li>
          {session.role === 'ADMINISTRADOR' && (
            <ButtonRegister />
          )}
          <CloseSession />
        </ul>
      </div>
    </div>
  </nav>
);

const Header = props => {
  if (props.session.getUser) {
    return <YesAuth session={props.session.getUser} />
  }
  return <NoAuth />
}

export default Header;
