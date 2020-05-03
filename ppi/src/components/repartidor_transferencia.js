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



class repartidor_transferencia extends Component {

    usuario;
    constructor(props) {
        super(props);
        this.usuario = JSON.parse(localStorage.getItem('usuario'))
        this.state = {
            data: [],
            dataBodegueros: [],
        }
    }
    componentDidMount() {
        axios.get("https://proyectopi-server.herokuapp.com/transferencia/byrepartidor/" + this.usuario.id_usuario).then(res => {
            const data = res.data;
            this.setState({ data });
        });
        axios.get("https://proyectopi-server.herokuapp.com/usuario").then(res => {
            const dataBodegueros = res.data;
            this.setState({ dataBodegueros });
        });
    }

    render() {
        console.log(this.state.data)
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
                <h1>TRANSFERENCIAS SIN ENTREGAR</h1>
                <Container className="fluid">
                    <Table striped bordered hover className="table table-sm table-dark" responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>BODEGA ORIGEN</th>
                                <th>BODEGA DESTINO</th>
                                <th>BODEGUERO</th>
                                <th>FECHA</th>
                                <th>FECHA ENTREGA</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.map(
                                    transferencia => {
                                        if (transferencia.estado == "0") {
                                            return (<tr key={transferencia.id_transferencia}>
                                                <td >{transferencia.id_transferencia}</td>
                                                <td >{transferencia.id_bodega_ori}</td>
                                                <td>{transferencia.id_bodega_dest}</td>
                                                <td>
                                                    {
                                                        this.state.dataBodegueros.map(
                                                            user => {
                                                                if (user.id_usuario == transferencia.id_bodeguero) {
                                                                    return (
                                                                        user.nombre
                                                                    )
                                                                }
                                                            }
                                                        )
                                                    }
                                                </td>
                                                <td>{transferencia.fecha}</td>
                                                <td>{transferencia.fecha_entrega}</td>
                                                <td><Button
                                                    variant="info"
                                                    size="small"
                                                    title="Ver"
                                                    onClick={() => {

                                                        localStorage.setItem('Transferencia', transferencia.id_transferencia);
                                                        this.props.history.push("/Transferencia/Detalle")
                                                    }}
                                                >Ver</Button>
                                                    <Button
                                                        variant="primary"
                                                        size="small"
                                                        title="Entregar"
                                                        onClick={() => {
                                                            this.state.dataBodegueros.map(bodeguero => {

                                                                if (bodeguero.id_usuario == transferencia.id_bodeguero) {
                                                                       
                                                                            const body = {
                                                                                id_transferencia: transferencia.id_transferencia,
                                                                                correo: bodeguero.correo
                                                                            }
                                                                            axios.post('https://proyectopi-server.herokuapp.com/notifydeliverytransfer', body)


                                                                            const modificar = {
                                                                                id_transferencia: transferencia.id_transferencia,
                                                                                estado: "1",
                                                                                id_bodega_ori: transferencia.id_bodega_ori,
                                                                                id_bodega_dest: transferencia.id_bodega_dest,
                                                                                id_bodeguero: transferencia.id_bodeguero,
                                                                                id_repartidor: this.usuario.id_usuario,
                                                                                fecha:transferencia.fecha,
                                                                                fecha_entrega: transferencia.fecha_entrega

                                                                            }
                                                                            axios.put('https://proyectopi-server.herokuapp.com/transferencia', modificar)
                                                                            alert("se a completado la entrega");



                                                                        

                                                                    

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

            </div>


        );
    }
}
export default repartidor_transferencia;