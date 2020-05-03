import React, { Component } from "react";
import { forwardRef } from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import axios from 'axios';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

export default class Productos extends Component {

    tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    constructor(props) {
        super(props)

        this.state = {
            columns: [
                { title: 'ID', field: 'id_producto' },
                { title: 'NOMBRE', field: 'nombre' },
                { title: 'DESCRIPCION', field: 'descripcion'},
                { title: 'PRECIO', field: 'precio'},
            ],
            data: [],
            categorias: [],
            categoriaSelected: 0,
            productoSelected: 0,
            nombre: '',
            descripcion: '',
            precio: 0.0
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    componentDidMount() {
        axios.get('https://proyectopi-server.herokuapp.com/producto')
        .then(res => {
            const data = res.data;
            this.setState({data});
        });

        axios.get('https://proyectopi-server.herokuapp.com/categoria')
        .then(res => {
            const categorias = res.data;
            this.setState({categorias});
        });
    }

    asignar(event){
        const params = {
            "id_producto": this.state.productoSelected,
            "id_categoria": this.state.categoriaSelected
        }

        console.log(params);
        
        axios.post('https://proyectopi-server.herokuapp.com/detalle_productocategoria',params)
        .then(res => {
            alert('Asignado exitosamente');
        });
    }

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
                <br></br><br></br><br></br><br></br>
                <div>
                    <h1 id='title'>Productos</h1>
                    <MaterialTable
                        icons={this.tableIcons}
                        title="Productos existentes"
                        columns={this.state.columns}
                        data={this.state.data}
                        editable={{

                            onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                resolve();
                                axios.post('https://proyectopi-server.herokuapp.com/producto',newData)
                                .then(res => {
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data.push(newData);
                                        return { ...prevState, data };
                                    });
                                    alert('Producto creado exitosamente');
                                });
                                }, 600);
                            }),

                            onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    const cambiar=newData
                                    cambiar.id_producto=oldData.id_producto
                                    axios.put("https://proyectopi-server.herokuapp.com/producto",cambiar).then(res=>{
                                        this.setState((prevState) => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                    })
                                }
                                }, 600);
                            }),

                            onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                const data_eliminar = { "id_producto": oldData.id_producto }
                                resolve();

                                axios.delete("https://proyectopi-server.herokuapp.com/producto",{data: data_eliminar}).
                                then(res => {
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                })
                                }, 600);
                            }),
                        }}
                    />
                </div>
                <br></br><br></br>
                <div class="container">
                    <h2 id="simple-modal-title">Asignar Categoria</h2>

                    <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Producto</span>
                            </div>
                            <select
                                class="form-control"
                                value={this.state.productoSelected}
                                onChange={e =>
                                    this.setState({
                                    productoSelected: e.target.value,
                                    validationError:
                                        e.target.value === ""
                                        ? "You must select your favourite team"
                                        : ""
                                    })
                                }
                                >
                                {this.state.data.map(producto => (
                                    <option
                                    key={producto.id_producto}
                                    value={producto.id_producto}
                                    >
                                    {producto.nombre}
                                    </option>
                                ))}
                            </select>
                    </div>
                    
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Categoria</span>
                        </div>
                        <select
                            class="form-control"
                            value={this.state.categoriaSelected}
                            onChange={e =>
                                this.setState({
                                categoriaSelected: e.target.value,
                                validationError:
                                    e.target.value === ""
                                    ? "You must select your favourite team"
                                    : ""
                                })
                            }
                            >
                            {this.state.categorias.map(categoria => (
                                <option
                                key={categoria.id_categoria}
                                value={categoria.id_categoria}
                                >
                                {categoria.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br></br><br></br>
                    <Button onClick={this.asignar.bind(this)} variant="contained" color="primary">Asignar Categoria</Button>
                    <br></br><br></br><br></br>
                </div>
            </Router>
        );
    }
}