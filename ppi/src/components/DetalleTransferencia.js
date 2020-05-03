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

class DetalleTransferencia extends Component {

    usuario;
    venta;
    cliente;

    constructor(props) {
        super(props);

        this.usuario = JSON.parse(localStorage.getItem('usuario'))
        this.transferencia = localStorage.getItem('Transferencia')
        this.state = {
            dataProducto: [],
            dataDetalles: [],
        }
    }
    componentDidMount() {
        axios.get("https://proyectopi-server.herokuapp.com/detalle_transferencia/transferencia/" + this.transferencia).then(res => {
            const dataDetalles = res.data;
            this.setState({ dataDetalles });
        });
        axios.get("https://proyectopi-server.herokuapp.com/producto").then(res => {
            const dataProducto = res.data;
            this.setState({ dataProducto });
        });

    }



    render() {


        return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Button size="large" title="Home" onClick={() => {
                            this.props.history.push("/repartidor/transferencia")
                        }}>Grupo 8</Button>
                        <IconButton aria-label="delete" onClick={() => {
                            this.props.history.push("/repartidor/transferencia")
                        }}>
                            <ArrowBackIcon fontSize="large" />
                        </IconButton>
                    </div>
                </nav>
                <br />
                <br />
                <br />
                <h1 className="display-1">Detalle Transferencia</h1>

                <Container>
                    <h1 className="DETALLE ORDEN"></h1>
                    <Container className="fluid">
                        <Table striped bordered hover className="table table-sm table-dark" responsive>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.dataDetalles.map(
                                        detalle => {

                                            return (<tr key={detalle.id_transferencia + "" + detalle.id_producto}>
                                                <td >
                                                    {
                                                        this.state.dataProducto.map(product => {
                                                            if (product.id_producto == detalle.id_producto) {
                                                                return (
                                                                    product.nombre
                                                                )
                                                            }

                                                        })
                                                    }
                                                </td>
                                                <td>{detalle.cantidad}</td>
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

        );
    }
}
export default DetalleTransferencia;