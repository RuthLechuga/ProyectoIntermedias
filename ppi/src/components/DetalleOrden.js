import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Button, Row } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Container } from '@material-ui/core';
import axios from 'axios';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Table from 'react-bootstrap/Table'

class DetalleOrden extends Component {

    usuario;
    venta;
    cliente;

    constructor(props) {
        super(props);

        this.usuario = JSON.parse(localStorage.getItem('usuario'))
        this.venta = localStorage.getItem('Venta')
        this.state = {
            dataV: [],
            dataCliente: "",
            dataVendedor: "",
            dataProducto: [],
            dataDetalles: [],
            idCliente: 0,
            idUsuario: 0

        }
    }
    componentDidMount() {
        axios.get("https://proyectopi-server.herokuapp.com/detalle_venta/venta/" + this.venta).then(res => {
            const dataDetalles = res.data;
            this.setState({ dataDetalles });
        });
        axios.get("https://proyectopi-server.herokuapp.com/producto").then(res => {
            const dataProducto = res.data;
            this.setState({ dataProducto });
        });
        axios.get("https://proyectopi-server.herokuapp.com/venta/" + this.venta).then(res => {
            const dataV = res.data;
            this.setState({ dataV });

            localStorage.setItem('cliente', res.data[0].id_cliente);
            localStorage.setItem('vendedor', res.data[0].id_usuario);


        });



        axios.get("https://proyectopi-server.herokuapp.com/cliente/" + localStorage.getItem('cliente')).then(res => {

            const dataCliente = res.data[0].nombre;
            this.setState({ dataCliente });

        });
        axios.get("https://proyectopi-server.herokuapp.com/usuario/" + localStorage.getItem('vendedor')).then(res => {


            console.log(res.data)
            const dataVendedor = res.data[0].nombre;
            this.setState({ dataVendedor });


        });

       
        localStorage.removeItem('cliente');
        localStorage.removeItem('vendedor');






    }



    render() {


        return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Button size="large" title="Home" onClick={() => {
                            this.props.history.push("/repartidor/ordenes")
                        }}>Grupo 8</Button>
                        <IconButton aria-label="delete" onClick={() => {
                            this.props.history.push("/repartidor/ordenes")
                        }}>
                            <ArrowBackIcon fontSize="large" />
                        </IconButton>
                    </div>
                </nav>
                <br />
                <br />
                <br />
                <h1 className="display-1">Detalle Orden</h1>
                <Container>
                    <div className="card" style={{ width: '80rem' }}>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <Row>

                                    {
                                        this.state.dataV.map(
                                            orden => {

                                                return (
                                                    <div className="container">
                                                        <Row>
                                                            <div className="col-2">
                                                                <h5><span className="badge badge-secondary">ID:</span>{this.venta}</h5>
                                                            </div>
                                                            <div className="col-5">
                                                                <h5><span className="badge badge-secondary">Fecha facturación:  </span>
                                                                    {orden.fecha_facturacion}
                                                                </h5>
                                                            </div>
                                                            <div className="col-5">
                                                                <h5><span className="badge badge-secondary">Fecha Entrega:  </span>
                                                                    {orden.fecha_entrega}
                                                                </h5>
                                                            </div>
                                                        </Row>
                                                    </div>


                                                )

                                            }
                                        )
                                    }
                                </Row>

                            </li>
                            <li className="list-group-item">
                                <Container>
                                    <div className="row">

                                        <div className="col-6">
                                            <h5><span className="badge badge-secondary">Cliente:</span>
                                                {this.state.dataCliente}
                                            </h5>
                                        </div>
                                        <div className="col-6">
                                            <h5><span className="badge badge-secondary">Vendedor:</span>
                                                {this.state.dataVendedor}
                                            </h5>
                                        </div>

                                    </div>
                                </Container>

                            </li>

                        </ul>

                        <Container>
                            <h1 className="DETALLE ORDEN"></h1>
                            <Container className="fluid">
                                <Table striped bordered hover className="table table-sm table-dark" responsive>
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.dataDetalles.map(
                                                detalle => {

                                                    return (<tr key={detalle.id_venta + "" + detalle.id_producto}>
                                                        <td >
                                                            {
                                                                this.state.dataProducto.map(product => {
                                                                    if(product.id_producto== detalle.id_producto){
                                                                        return(
                                                                            product.nombre
                                                                        )
                                                                    }

                                                                })
                                                            }
                                                        </td>
                                                        <td>{detalle.cantidad}</td>
                                                        <td>{detalle.Precio}</td>

                                                    </tr>
                                                    )

                                                }
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </Container>
                        </Container>
                    </div>
                </Container>



            </div>


        );
    }
}
export default DetalleOrden;