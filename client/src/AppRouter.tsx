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

  const message = getUser ?
    `Usuario ${getUser.user}` :
    <Redirect to='/login' />;

  return (
    <BrowserRouter>
      <Header session={sessions} />
      <div className="container">
        <p className="text-right">{message}</p>
        <Switch>
          <Route exact path='/clients' component={Clients} />
          <Route exact path='/createClient' component={NewClient} />
          <Route exact path='/editClient/:id' component={EditClient} />
          <Route exact path='/products' component={Products} />
          <Route exact path='/createProduct' component={NewProduct} />
          <Route exact path='/editProduct/:id' component={EditProduct} />
          <Route exact path='/newOrder/:idClient' component={NewOrder} />
          <Route exact path='/order/:idClient' component={Order} />
          <Route exact path='/panel' component={Panel} />
          <Route exact path='/register' component={Register} />
          <Route
            exact
            path='/login'
            render={() => <Login refetch={refetch} />}
          />
          <Route path='' component={NofoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}


const RootSession = Sessions(AppRouter);

export { RootSession };
