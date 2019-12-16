import React, { Component } from 'react';
import './App.css';
import AppNavbar from './components/layouts/AppNavbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddClient from './components/clients/AddClient';
import EditClient from './components/clients/EditClient';
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
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/client/add" component={AddClient} />
            <Route exact path="/client/edit/:id" component={EditClient} />
            <Route exact path="/client/:id" component={ClientDetails} />

          </Switch>
        </div>
      </Router>
    </Provider>
  );

}

export default App;
