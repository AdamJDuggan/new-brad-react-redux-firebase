import React, { Component } from 'react';
import './App.css';
import AppNavbar from './components/layouts/AppNavbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/Auth'
import AddClient from './components/clients/AddClient';
import EditClient from './components/clients/EditClient';
import Login from './components/auth/Login';
import ClientDetails from './components/clients/ClientDetails';
import Dashboard from './components/layouts/Dashboard';
import { Provider } from 'react-redux';
import store from './store';



const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div >
          <AppNavbar />
          <Switch>
            <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
            <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
            <Route exact path="/client/add" component={UserIsAuthenticated(AddClient)} />
            <Route exact path="/client/edit/:id" component={UserIsAuthenticated(EditClient)} />
            <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetails)} />

          </Switch>
        </div>
      </Router>
    </Provider>
  );

}

export default App;
