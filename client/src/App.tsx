import React, { Fragment } from 'react';

import Header from './components/Header';
import Clients from './components/Clients';

function App() {
  return (
    <Fragment>
      <Header />
      <div className='container'>
        <Clients />
      </div>
    </Fragment>
  );
}

export default App;
