import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Home from "./components/home";

function App() {
  return (<Router>

    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/components/login" component={Login} />
            <Route path="/components/home" component={Home} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;