import React, { Fragment } from 'react';

import Clients from './components/client/Clients';

function Home() {
  return (
    <Fragment>
      <div className='container'>
        <Clients />
      </div>
    </Fragment>
  );
}

export default Home;
