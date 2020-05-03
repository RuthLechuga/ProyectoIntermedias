import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Home from "./components/home";
import Sedes from "./components/sedes";
import Bodegas from "./components/bodegas";
import Usuarios from "./components/usuarios";
import Productos from "./components/productos";

import Vendedor_home from "./components/vendedor_home";
import Vendedor_clientes from "./components/vendedor_clientes";
import Vendedor_reportes from "./components/vendedor_reportes";
import Vendedor_ventas from './components/vendedor_ventas';
import Roles from './components/roles';
import Perfil from './components/perfil';

function App() {
  return (<Router>
              <div className="App">
                    <Switch>
                      <Route exact path='/' component={Login} />
                      <Route path="/login" component={Login} />
                      <Route path="/home" component={Home} />
                      <Route path="/sedes" component={Sedes} />
                      <Route exact path="/vendedor_home" component={Vendedor_home} />
                      <Route exact path="/vendedor_home/clientes" component={Vendedor_clientes} />
                      <Route exact path="/vendedor_home/reportes" component={Vendedor_reportes} />
                      <Route exact path="/vendedor_home/ventas" component={Vendedor_ventas} />
                      <Route path="/bodegas" component={Bodegas} />
                      <Route path="/usuarios" component={Usuarios} />
                      <Route path="/productos" component={Productos} />
                      <Route path="/vendedor_home" component={Vendedor_home} />
                      <Route path="/roles" component={Roles} />
                      <Route path="/perfil_admin" component={Perfil} />
                    </Switch>
              </div>
          </Router>
  );
}

export default App;