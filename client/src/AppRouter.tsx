import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Layout/Header';
import Home from './Home';
import NewClient from './components/client/NewClient';
import EditClient from './components/client/EditClient';
import Products from './components/product/Products';
import NewProduct from './components/product/NewProduct';
import EditProduct from './components/product/EditProduct';
import NofoundPage from './NoFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/createClient' component={NewClient} />
      <Route exact path='/editClient/:id' component={EditClient} />
      <Route exact path='/products' component={Products} />
      <Route exact path='/createProduct' component={NewProduct} />
      <Route exact path='/editProduct/:id' component={EditProduct} />
      <Route path='' component={NofoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
