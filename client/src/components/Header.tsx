import React from 'react';

const Header = () => (
  <nav className='navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex'>
    <div className='container'>
      <a href="/" className='navbar-brand text-light font-weight-bold'>CRM</a>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navigation' aria-controls='navigation' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon' />
      </button>

      <div className='collapse navbar-collapse' id='navigation'>
        <ul className='navbar-nav ml-auto text-right'>
          <li className='nav-item active'>
            <a href="/" className='btn btn-success'>Nuevo Cliente</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
