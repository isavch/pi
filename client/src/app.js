import React, { Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom';
import PrivateRoute from './components/private-route';
import Login from './components/login';
import Home from './components/home';

const App = () => {
    return (
        <Router>
            <div>
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/" component={Home} />
            </div>
        </Router>
    );
}

export default App;