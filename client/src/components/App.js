// src/components/App.js

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import PrivateRoute from './PrivateRoute'; // Example of a PrivateRoute component for authenticated routes

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          {/* Example of a private route */}
          {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
