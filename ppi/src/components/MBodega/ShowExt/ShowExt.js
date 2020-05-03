import React,{Component} from 'react' 
import axios from 'axios';  

export default class ShowExt extends Component{

    state = {
        //Guarda todas las solicitudes ext 
        request: [], 
        //Guarda todas las bodegas ext 
        bodega: [], 
        //Guarda todos los usuarios 
        user: [], 
        //Guarda El valor a Eliminar 
        item: -2, 
        //Guarda los productos agregados 
        productos: [], 
    }

    componentDidMount(){
        axios.get('https://proyectopi-server.herokuapp.com/transferencia/externa')
        .then(res => {           
            this.setState({request:res.data}); 
        });
        axios.get('https://proyectopi-server.herokuapp.com/bodega')
        .then(res => {           
            this.setState({bodega:res.data}); 
        });
        axios.get('https://proyectopi-server.herokuapp.com/usuario')
        .then(res => {           
            this.setState({user:res.data}); 
        });
    }

    render(){
        return(
            <div className="container"> 
                <br></br>
                <br></br>
                <br></br>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <div className="form-group">
                            <label>Seleccionar Transferencia</label>
                            <select className="custom-select mr-sm-2" onChange={this.onChangeSelect}>
                                <option selected value="-1">Choose...</option>
                                {this.state.request.map(
                                    transferencia=>{
                                        return( 
                                            <option value={transferencia.id_transferencia} key={transferencia.id_transferencia}>{transferencia.id_transferencia}</option>
                                        )
                                    }
                                )}
                            </select>
                            <br></br>
                            <br></br>
                            <button className="btn btn-primary btn-block" onClick={this.update}>Actualizar Transferencia</button>                                              
                        </div>
                    </div>
                    <br></br>
                            <br></br>
                    <div className="auth-inner">
                        <div className="form-group">
                            <div>
                                <label>Seleccionar Transferencia</label>
                                <select className="custom-select mr-sm-2" onChange={this.onChangeSelect}>
                                    <option selected value="-1">Choose...</option>
                                    {this.state.request.map(
                                        transferencia=>{
                                            return( 
                                                <option value={transferencia.id_transferencia} key={transferencia.id_transferencia}>{transferencia.id_transferencia}</option>
                                            )
                                        }
                                    )}
                                </select>
                            </div>
                            <div>
                                <label>Seleccionar Transferencia</label>
                                <select className="custom-select mr-sm-2" onChange={this.onChangeSelect}>
                                    <option selected value="-1">Choose...</option>
                                    {this.state.request.map(
                                        transferencia=>{
                                            return( 
                                                <option value={transferencia.id_transferencia} key={transferencia.id_transferencia}>{transferencia.id_transferencia}</option>
                                            )
                                        }
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>

                    <br></br>

                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Id Producto</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.productos.map(
                                producto => {
                                    return (
                                        <tr key={producto.id_producto} className="table-light">
                                            <th scope="row">{producto.id_producto}</th>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.descripcion}</td>
                                            <td>{producto.precio}</td>
                                        </tr>
                                    )
                                }
                            )}
                        </tbody>
                    </table>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
            </div>
        )
    }
}
