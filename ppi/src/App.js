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

import repartidor_home from './components/repartidor_home';
import repartidor_ordenes from './components/repartidor_ordenes';
import repartidor_transferencia from './components/repartidor_transferencia';
import DetalleOrden from './components/DetalleOrden'
import DetalleTransferencia from  './components/DetalleTransferencia'

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
                      <Route path="/repartidor_home" component={repartidor_home} />
                      <Route path="/repartidor/ordenes" component={repartidor_ordenes} />
                      <Route path="/repartidor/transferencia" component={repartidor_transferencia} />
                      <Route path="/Orden/Detalle" component={DetalleOrden} />
                      <Route path="/Transferencia/Detalle" component={DetalleTransferencia} />
                      
                    </Switch>
              </div>
          </Router>
  );
}

export default App;