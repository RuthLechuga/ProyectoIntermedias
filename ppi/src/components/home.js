import React, { Component } from "react";
import { BrowserRouter as Router, Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Sedes from "./sedes";
import { BrowserRouter, Route } from 'react-router-dom'

export default class Home extends Component {
    render() {
        const style={
            back:{
                float:"right"
            }
        }
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Button
                            size="large"
                            title="Home"
                            onClick={() => {
                                this.props.history.push("/vendedor_home")
                            }}
                        >Grupo 8</Button>
                        <IconButton aria-label="delete" style={style.back} onClick={()=>{                         
                        }}>
                            <ArrowBackIcon fontSize="large" />
                        </IconButton>
                    </div>
                </nav>
                <br/>
                <br/>
                <br/>

                <div className="container">
                <br></br><br></br><br></br>
                <div class="row">
                    <div class="col-sm-3">
                        <div class="card text-white bg-dark">
                        <div class="card-body">
                            <h5 className="card-title">Administrar sedes</h5>
                            <p className="card-text">Registrar, eliminar y modificar información de sedes existentes</p>
                            
                            <a href="sedes" class="btn btn-light">Ver información</a>
                        </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="card text-white bg-dark">
                        <div class="card-body">
                            <h5 class="card-title">Administrar usuarios</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-light">Go somewhere</a>
                        </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="card text-white bg-dark">
                        <div class="card-body">
                            <h5 class="card-title">Administrar bodegas</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-light">Go somewhere</a>
                        </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="card text-white bg-dark">
                        <div class="card-body">
                            <h5 class="card-title">Administrar productos</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-light">Go somewhere</a>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
                <br></br>
            </Router>
        );
    }
}
