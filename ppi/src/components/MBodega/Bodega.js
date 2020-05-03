import React,{Component} from 'react' 
import {BrowserRouter as Router} from "react-router-dom";

export default class Bodega extends Component{

    render(){

        return ( //className="btn btn-light"
            <Router>
                <br></br>
                            <div className='container'> 
                                <div className='row p-5'>
                                    <div className="col-sm-3 p-2">
                                        <div className="card text-white bg-dark">
                                            <div className="card-body">
                                                <h5 className="card-title">Actualizar Productos</h5>
                                                <p className="card-text">Actualice la cantidad de los productos almacenados en las bodegas</p>
                                                <a href="UpdateInv" class="btn btn-light">Ver información</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-2">
                                        <div className="card text-white bg-dark">
                                            <div className="card-body">
                                                <h5 className="card-title">Solicitar Transferencia</h5>
                                                <p className="card-text">Eliga una serie de productos para moverlo de bodega.</p>
                                                <a href="RequestTran" class="btn btn-light">Ver información</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-2">
                                        <div className="card text-white bg-dark">
                                            <div className="card-body">
                                                <h5 className="card-title">Ordenes Externas</h5>
                                                <p className="card-text">Visualice y acepte ordenes entre bodegas de diferentes cedes.</p>
                                                <a href="ShowExt" class="btn btn-light">Ver información</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-2">
                                        <div className="card text-white bg-dark">
                                            <div className="card-body">
                                                <h5 className="card-title">Ordenes Internas</h5>
                                                <p className="card-text">Visualice y acepte ordenes entre bodegas de la misma cede</p>
                                                <a href="ShowInt" class="btn btn-light">Ver información</a>
                                            </div>
                                        </div>
                                    </div>            
                                </div>
                            </div>
            </Router>
        ); 
    }
}