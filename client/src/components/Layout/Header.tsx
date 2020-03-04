import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className='navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex'>
    <div className='container'>
      <Link
        to='/'
        className='navbar-brand text-light font-weight-bold'
      >CRM</Link>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navigation' aria-controls='navigation' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon' />
      </button>

      <div className='collapse navbar-collapse' id='navigation'>
        <ul className='navbar-nav ml-auto text-right'>
          <li className='nav-item active'>
            <Link
              to='/createProduct'
              className='btn btn-success mr-2'
            >Nuevo Producto</Link>
            <Link
              to='/createClient'
              className='btn btn-success'
            >Nuevo Cliente</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
