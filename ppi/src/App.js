import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Home from "./components/home";
import Sedes from "./components/sedes";

import Vendedor_home from "./components/vendedor_home";

function App() {
  return (<Router>
              <div className="App">
                    <Switch>
                      <Route exact path='/' component={Login} />
                      <Route path="/login" component={Login} />
                      <Route path="/home" component={Home} />
                      <Route path="/sedes" component={Sedes} />
                      <Route path="/vendedor_home" component={Vendedor_home} />
                    </Switch>
              </div>
          </Router>
  );
}

export default App;