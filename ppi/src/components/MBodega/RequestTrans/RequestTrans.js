import React, {Component} from 'react' 
import axios from 'axios';  

export default class RequestTrans extends Component{

    state = {
        //Guarda Todos los Productos 
        post: [], 
        //Guarda El valor a Eliminar 
        item: -1, 
        //Guarda los productos agregados 
        productos: [], 
        //Tipo de seleccion 
        seleccion: 1 
    }
    
    componentDidMount(){
        axios.get('https://proyectopi-server.herokuapp.com/producto')
        .then(res => {           
            this.setState({post:res.data}); 
        });
    }

    onChangeSelect = e => {
        if(e.target.value===-1){
            alert("Producto Indefinido"); 
        }else{
            this.setState({
                item: e.target.value
            })       
        }
    }

    onChangeSelectTrans = e => {
        this.setState({
            seleccion: e.target.value
        })
    }

    agregar = e =>{
        if(this.state.item === -1){
            alert("Eliga un producto"); 
        }else{
            //Lo agrego a la tabla 
            const producto = this.state.post.find(producto=>(producto.id_producto.toString()===this.state.item.toString()));
            this.setState({
                productos: [...this.state.productos, producto]
            })  
            //Elimino el valor del combo box 
            const combo_box_productos = this.state.post.filter(producto=>(producto.id_producto.toString()!==this.state.item.toString()));
            this.setState({
                post: combo_box_productos
            }) 
        }
    }

    crearRequest = e =>{
        if(this.state.productos.length === 0){
            alert("Elija un producto"); 
        }else{
            const id_trans = Math.floor(Math.random() * (1000 - 100) + 100); 
            let id_destino = 2; 
            const nuevo = new Date(); 
            const fechaHoy = nuevo.getFullYear()+"-"+nuevo.getMonth()+"-"+nuevo.getDate(); 
            if(this.state.seleccion === "2"){
                //externa 
                id_destino = 62; 
            }
            const params = {
                id_transferencia: id_trans, 
                estado: "p", 
                id_bodega_ori:12, 
                id_bodega_dest: id_destino,
                id_bodeguero: 2, 
                id_repartidor: 2, 
                fecha: fechaHoy, 
                fecha_entrega: fechaHoy
            }
            console.log(params); 
            axios.post('https://proyectopi-server.herokuapp.com/transferencia',params)
            .then(res => {           
                console.log("todo bien, todo correcto");   
            }); 

            this.state.productos.forEach(producto=>{
                const detalle = {
                    id_transferencia: id_trans,
                    id_producto: producto.id_producto, 
                    cantidad: 4
                }
                console.log(detalle); 
                axios.post('https://proyectopi-server.herokuapp.com/detalle_transferencia',detalle)
                .then(res => {           
                    console.log("todo bien, todo correcto");   
                }); 
            })
            
            
        }
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
                            <label>Seleccionar Producto</label>
                            <select className="custom-select mr-sm-2" onChange={this.onChangeSelect}>
                                <option selected value="-1">Choose...</option>
                                {this.state.post.map(
                                    producto=>{
                                        return( 
                                            <option value={producto.id_producto} key={producto.id_producto}>{producto.nombre}</option>
                                        )
                                    }
                                )}
                            </select>
                            <label>Seleccionar tipo de Transaccion</label>
                            <select className="custom-select mr-sm-2" onChange={this.onChangeSelectTrans}>
                                <option selected value="1">Interna</option>
                                <option value="2">Externa</option>
                            </select>
                            <br></br>
                            <br></br>
                            <button className="btn btn-primary btn-block" onClick={this.agregar}>Agregar Producto</button>                    
                            <button className="btn btn-primary btn-block" onClick={this.crearRequest}>Crear Transaccion</button>                    
                        
                        </div>
                    </div>
                </div>

                <br></br>

                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Id Producto</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.productos.map(
                            producto => {
                                return (
                                    <tr key={producto.id_producto} className="table-light">
                                        <th scope="row">{producto.id_producto}</th>
                                        <td>{producto.nombre}</td>
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
        )
    }
}

