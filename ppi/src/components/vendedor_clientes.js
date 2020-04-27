import React, { Component } from "react";
import { BrowserRouter as Router} from "react-router-dom";

export default class Vendedor_clientes extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }
    render() {
        return (
            <Router>
                <br/>
                <br/>
                <br/>
                <h1>CRUD clientes</h1>
            </Router>
        );
    }
}