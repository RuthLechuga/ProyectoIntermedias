import React, { Component } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import axios from 'axios';

export default class Recuperar extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
        };
        this.recuperar = this.recuperar.bind(this);
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    recuperar(event){
        console.log(this.state.email)

        const params = {
            correo: this.state.email
        }

        axios.post('https://proyectopi-server.herokuapp.com/recoverpassword',params)
        .then(res => {
            alert('Se ha enviado un password temporal a su correo, por favor verifique e inicie sesion.')
        });
    }
 
    render() {
        return (
            <Router>
            <div className="auth-wrapper">
                <div className="auth-inner">

                    <h3>Recuperar password</h3>

                    <div className="form-group">
                        <label>Correo</label>
                        <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={this.myChangeHandler}/>
                    </div>

                    <button className="btn btn-primary btn-block" onClick={this.recuperar.bind(this)}>Recuperar</button>        
                </div>
            </div>
            </Router>
        );
    }
}
