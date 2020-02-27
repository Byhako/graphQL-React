import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './Home';
import EditClient from './components/EditClient';
import NewClient from './components/NewClient';
import NofoundPage from './NoFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/edit/:id' component={EditClient} />
      <Route exact path='/create' component={NewClient} />
      <Route path='' component={NofoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
