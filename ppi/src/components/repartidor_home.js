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

class repartidor_home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <h1 className="display-1">REPARTIDOR ID {this.props.id}</h1>
                <Container>
                    <Row>
                        <Col md={{ span: 2, offset: 2 }}>
                            <Card style={{ width: '50rem' }}>
                                <Card.Body>
                                    <Card.Title>Ordenes</Card.Title>
                                    <Card.Text>
                                        AQUÍ PUEDE ADMINISTRAR LAS ÓRDENES DISPONIBLES PARA SU ENTREGA
                                </Card.Text>

                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            this.props.history.push("/repartidor/ordenes")
                                        }}>
                                        VER ORDENES
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row></Row>
                    <Row>
                        <Col md={{ span: 2, offset: 2 }}>
                            <Card style={{ width: '50rem' }}>
                                <Card.Body>
                                    <Card.Title>Transferencias</Card.Title>
                                    <Card.Text>
                                        AQUÍ PUEDE ADMINISTRAR LAS TRANSFERENCIAS DISPONIBLES PARA SU ENTREGA
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            this.props.history.push("/repartidor/transferencia")
                                        }}>
                                        VER TRANSFERENCIAS
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </Router>

        );
    }
}
export default repartidor_home;