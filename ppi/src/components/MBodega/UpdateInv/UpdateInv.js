import React, {Component} from 'react' 
import axios from 'axios';  

export default class UpdateInv extends Component{

    state = {
        post: [], 
        id_producto: 0, 
        nombre: "", 
        descripcion: "", 
        precio: 0.0, 
        cantidad: '', 
        cantidad_antigua: 0, 
        //posee el valor del select 
        selectValue: '-1', 
        //rason del envio
        razon: '', 
        id_user: 2, 
    }

    componentDidMount(){
        axios.get('https://proyectopi-server.herokuapp.com/producto')
        .then(res => {           
            this.setState({post:res.data}); 
        });
    }

    onChangeSelect = e => {
        this.setState({selectValue:e.target.value}); 
        if(e.target.value===-1){
            alert("Producto Indefinido"); 
        }else{
            const producto = this.state.post.find(producto=>(producto.id_producto.toString()===e.target.value.toString()));
            this.setState({
                id_producto: producto.id_producto, 
                nombre: producto.nombre, 
                descripcion: producto.descripcion, 
                precio: producto.precio, 
                cantidad: Math.floor(Math.random() * (100 - 10) + 10),
                cantidad_antigua: this.state.cantidad
            })           
        }
    }

    onChange = e =>{
        this.setState({
            cantidad: e.target.value 
        })
    }

    onChangeValue = e =>{
        this.setState({
            razon: e.target.value 
        })
    }

    onSubmit = e =>{
        const temp = parseInt(this.state.cantidad,10); 
        if( !isNaN(temp) ){
            if(!(this.state.id_producto===0)){
                const nuevo = new Date(); 
                const fechaHoy = nuevo.getFullYear()+"-"+nuevo.getMonth()+"-"+nuevo.getDate(); 
                const params = {
                    cantidad_antigua: this.state.cantidad_antigua,
                    cantidad_nueva: this.state.cantidad,
                    descripcion: this.state.razon,
                    fecha:fechaHoy,
                    id_usuario:this.state.id_user,
                    id_producto:this.state.id_producto
                }
                console.log(params); 
                axios.post('https://proyectopi-server.herokuapp.com/bitacora_inventario',params)
                .then(res => {           
                    console.log("todo bien, todo correcto");   
                }); 
            }else{
                alert("Escoja un producto primero"); 
            }
        }else{
            alert("Cantidad de producto erronea") 
        }
    }

    render(){
        return(
            <div>
                <br></br>
                <div className='container'> 
                    <div className='row p-5' style={{border: 'black'}}>
                        <div className="col-sm-2 " style={{height: 0}}>&nbsp;</div> 
                        <div className="col-sm-4 ">
                            <label className="mr-sm-2">Seleccione el Producto</label>
                        </div>
                        <div className="col-sm-4 ">
                            <select value={this.state.selectValue} className="custom-select mr-sm-2" onChange={this.onChangeSelect}>
                                <option selected value="-1">Choose...</option>
                                {this.state.post.map(
                                    producto=>{
                                        return( 
                                            <option value={producto.id_producto} key={producto.id_producto}>{producto.nombre}</option>
                                        )
                                    }
                                )}
                            </select>
                        </div>
                        <div className="col-sm-2 " style={{height: 0}}>&nbsp;</div>
                    </div>  


                    <div className="auth-wrapper">
                        <div className="auth-inner">

                            <h3>Datos del Producto</h3>

                            <div className="form-group">
                                <label>Id Producto</label>
                                <input value={this.state.id_producto} className="form-control" name="id_producto" placeholder="Id Producto" readOnly/>
                            </div>

                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input value={this.state.nombre} className="form-control" name="name_producto" placeholder="Nombre producto" readOnly />
                            </div>

                            <div className="form-group">
                                <label>Descripcion Producto</label>
                                <textarea value={this.state.descripcion} className="form-control" name="des_producto" placeholder="Descripcion producto" readOnly />
                            </div>

                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input value={this.state.precio} className="form-control" name="precio_producto" placeholder="Precio producto" readOnly />
                            </div>

                            <div className="form-group">
                                <label>Cantidad Producto</label>
                                <input onChange={this.onChange} name="cantidad" value={this.state.cantidad}  className="form-control" placeholder="Cantidad producto"/>
                            </div>

                            <button onClick={this.onSubmit} className="btn btn-primary btn-block" >Actualizar</button>
                            
                            <br></br>
                            <div className="form-group">
                                <label>Descripcion de la Actualizacion</label>
                                <textarea onChange={this.onChangeValue} name="razon" value={this.state.razon} className="form-control"  placeholder="Descripcion producto" />
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                </div> 
            </div>
        )
    }
}
