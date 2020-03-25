import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Layout/Header';
// import Home from './Home';
import Clients from './components/client/Clients';
import NewClient from './components/client/NewClient';
import EditClient from './components/client/EditClient';
import Products from './components/product/Products';
import NewProduct from './components/product/NewProduct';
import EditProduct from './components/product/EditProduct';
import NewOrder from './components/orders/NewOrder';
import Order from './components/orders/Order';
import Panel from './components/panel/Panel';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Sessions from './components/Layout/Sessions';
import NofoundPage from './NoFoundPage';

const AppRouter = ({ refetch, sessions }) => {
  const { getUser } = sessions;

  if (!getUser) {
    return (
      <BrowserRouter>
      <Header session={sessions} />
        <Switch>
          <Route
            exact
            path='/login'
            render={() => <Login refetch={refetch} />}
          />
          <Route path='' component={NofoundPage} />
        </Switch>
    </BrowserRouter>
    )
  }

  const message = getUser ?
    `${getUser.name}` :
    <Redirect to='/login' />;

  return (
    <BrowserRouter>
      <Header session={sessions} />
      <div className="container">
        <h4
          className="mb-0"
          style={{ 
            width: 'max-content',
            position: 'absolute',
            top: '18px',
            left: '45%'
          }}
        >
          <span className="badge badge-success">
            {message}
            </span>
        </h4>
        <Switch>
          <Route exact path='/clients'
            render={() => <Clients session={sessions} />}
          />
          <Route exact path='/createClient'
            render={() => <NewClient session={sessions} />}
          />
          <Route exact path='/editClient/:id' component={EditClient} />
          <Route exact path='/products' component={Products} />
          <Route exact path='/createProduct' component={NewProduct} />
          <Route exact path='/editProduct/:id' component={EditProduct} />
          <Route exact path='/newOrder/:idClient' component={NewOrder} />
          <Route exact path='/order/:idClient' component={Order} />
          <Route exact path='/panel' component={Panel} />
          <Route exact path='/register'
            render={() => <Register session={sessions} />}
          />
          {/* <Route
            exact
            path='/login'
            render={() => <Login refetch={refetch} />}
          /> */}
          <Route path='' component={NofoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}


const RootSession = Sessions(AppRouter);

export { RootSession };
