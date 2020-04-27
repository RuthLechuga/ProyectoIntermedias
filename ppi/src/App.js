import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Home from "./components/home";
import Sedes from "./components/sedes"

function App() {
  return (<Router>
              <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={"/components/login"}>Grupo 8</Link>
                </div>
              </nav>
                    
              <div className="App">
                    <Switch>
                      <Route exact path='/' component={Login} />
                      <Route path="/components/login" component={Login} />
                      <Route path="/components/home" component={Home} />
                      <Route path="/components/sedes" component={Sedes} />
                    </Switch>
              </div>
          </Router>
  );
}

export default App;