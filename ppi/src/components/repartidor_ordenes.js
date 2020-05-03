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
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Modal from 'react-bootstrap/Modal'

export default class repartidor_ordenes extends Component {

    usuario;

    constructor(props) {
        super(props);
        this.usuario = JSON.parse(localStorage.getItem('usuario'))
        this.state = {
            data: [],
            dataUsuario: [],
            dataVenta: []
        }

    }
    componentDidMount() {
        axios.get("https://proyectopi-server.herokuapp.com/orden/byrepartidor/" + this.usuario.id_usuario).then(res => {
            const data = res.data;
            this.setState({ data });
        });
        axios.get("https://proyectopi-server.herokuapp.com/usuario").then(res => {
            const dataUsuario = res.data;
            this.setState({ dataUsuario });
        });
        axios.get("https://proyectopi-server.herokuapp.com/venta").then(res => {
            const dataVenta = res.data;
            this.setState({ dataVenta });
        });

    }

    render() {


        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Button size="large" title="Home" onClick={() => {
                            this.props.history.push("/repartidor_home")
                        }}>Grupo 8</Button>
                        <IconButton aria-label="delete" onClick={() => {
                            this.props.history.push("/repartidor_home")
                        }}>
                            <ArrowBackIcon fontSize="large" />
                        </IconButton>
                    </div>
                </nav>
                <br />
                <br />
                <br />
                <h1>ORDENES SIN ENTREGAR</h1>
                <Container className="fluid">
                    <Table striped bordered hover className="table table-sm table-dark" responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>VENTA</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.map(
                                    orden => {
                                        if (orden.estado == "0") {
                                            return (<tr key={orden.id_orden}>
                                                <td >{orden.id_orden}</td>
                                                <td>{orden.id_venta}</td>
                                                <td><Button
                                                    variant="info"
                                                    size="small"
                                                    title="Ver"
                                                    onClick={() => {

                                                        localStorage.setItem('Venta', orden.id_venta);
                                                        this.props.history.push("/Orden/Detalle")
                                                    }}
                                                >VER</Button>
                                                    <Button
                                                        variant="primary"
                                                        size="small"
                                                        title="Entregar"
                                                        onClick={() => {
                                                            this.state.dataVenta.map(venta => {

                                                                if (venta.id_venta == orden.id_venta) {
                                                                    this.state.dataUsuario.map(user => {
                                                                        if (user.id_usuario == venta.id_usuario) {
                                                                            const body = {
                                                                                id_venta: orden.id_venta,
                                                                                correo: user.correo
                                                                            }
                                                                            axios.post('https://proyectopi-server.herokuapp.com/notifydeliverysale', body)
                                                                            

                                                                            const modificar = {
                                                                                id_orden: orden.id_orden,
                                                                                estado :"1",
                                                                                id_venta: venta.id_venta,
                                                                                id_repartidor: this.usuario.id_usuario
                                                                            }
                                                                            axios.put('https://proyectopi-server.herokuapp.com/orden', modificar)
                                                                            alert("se a completado la entrega");
                                                                           


                                                                        }

                                                                    })

                                                                }

                                                            })
                                                        }}
                                                    >ENTREGAR</Button>
                                                </td>
                                            </tr>
                                            )
                                        }
                                    }
                                )
                            }
                        </tbody>
                    </Table>
                </Container>

            </div >

        );
    }
}

function Modal1() {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>CONFIRMACION</Modal.Title>
                </Modal.Header>
                <Modal.Body>DESEA CONFIRMAR LA ENTREGA DE LA ORDEN DE VENTA  {localStorage.getItem('Venta')}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        NO
            </Button>
                    <Button variant="primary" onClick={
                        handleClose

                    }>
                        SI
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}