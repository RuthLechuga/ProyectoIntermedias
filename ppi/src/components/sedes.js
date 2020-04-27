import React, { Component } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import axios from 'axios';

export default class Sedes extends Component {

    constructor(props) {
        super(props)

        this.state = {
           sedes: []
        }
     }

    renderTableData() {

        axios.get('https://proyectopi-server.herokuapp.com/sede')
        .then(res => {
            console.log(res);
            this.state.sedes = res.data;
        });

        return this.state.sedes.map((sede, index) => {
           const { id_sede, alias, direcccion } = sede //destructuring
           return (
              <tr class="table-light" key={id_sede}>
                 <td>{id_sede}</td>
                 <td>{alias}</td>
                 <td>{direcccion}</td>
              </tr>
           )
        })
    }

    render() {
        return (
            <Router>
                <br></br><br></br><br></br>
                <div>
                    <h1 id='title'>Sede</h1>
                    <table class="table" id='sedes'>
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Alias</th>
                        <th scope="col">Direccion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                    </table>
                </div>
            </Router>
        );
    }
}