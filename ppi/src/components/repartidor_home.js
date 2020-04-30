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

    constructor(props){
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
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                        <Row>
                            <Col md={{ span: 2, offset: 2 }}>
                                <Card style={{ width: '50rem' }}>
                                    <Card.Body>
                                        <Card.Title>Transferencias</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
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