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
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class Bodegas extends Component {

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
                { title: 'ID', field: 'id_bodega' },
                { title: 'NOMBRE', field: 'nombre' },
                { title: 'ESTADO', field: 'estado'},
            ],
            data: [],
            sedes: [],
            usuarios: [],
            selectedSedes: 0,
            selectedUsuario: 0,
            selectedBodega: 0,
            nombre: '',
            estado: '',
            id_usuario: localStorage.getItem('idUsuario'),
            checkedA: true,
            checkedB: true,
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    componentDidMount() {
        axios.get('https://proyectopi-server.herokuapp.com/bodega')
        .then(res => {
            const data = res.data;
            this.setState({data});
        });

        axios.get('https://proyectopi-server.herokuapp.com/sede')
        .then(res => {
            console.log(res);
            const sedes = res.data;
            this.setState({sedes});
        });

        axios.get('https://proyectopi-server.herokuapp.com/usuario')
        .then(res => {
            console.log(res);
            const usuarios = res.data;
            this.setState({usuarios});
        });

        console.log(this.state.sedes);
    }

    handleChange = (event) => {
        console.log(event.target.value);
    };

    crear(event){
        const estado = this.state.checkedA ? "1": "0";

        const params = {
            "nombre": this.state.nombre,
            "estado": estado,
            "id_sede": this.state.selectedSedes,
            "id_usuario": this.state.selectedUsuario
        }
        console.log(params);
        axios.post('https://proyectopi-server.herokuapp.com/bodega',params)
        .then(res => {
            alert('Bodega creada exitosamente');
        });
    }

    cambiar(event){
        const estado = this.state.checkedB ? "1": "0";

        const bodega = this.state.data.filter(bodega => bodega.id_bodega==this.state.selectedBodega)[0];
        bodega.estado = estado;

        axios.put('https://proyectopi-server.herokuapp.com/bodega',bodega)
        .then(res => {
            alert('Estado cambiado exitosamente');
        });

        console.log(estado);
        console.log(bodega);
    }

    handleChangeSwitch = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
    };

    handleChangeSwitch2 = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
    };

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
                                this.props.history.push("/home")
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
                    <h1 id='title'>Bodegas</h1>
                    <MaterialTable
                        icons={this.tableIcons}
                        title="Sedes existentes"
                        columns={this.state.columns}
                        data={this.state.data}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    this.setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                    });
                                }
                                }, 600);
                            }),
                            onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                const data_eliminar = { "id_bodega": oldData.id_bodega }
                                console.log(oldData);
                                resolve();

                                axios.delete("https://proyectopi-server.herokuapp.com/bodega",{data: data_eliminar}).
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
                    <h2 id="simple-modal-title">Crear Bodega</h2>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Nombre</span>
                        </div>
                        <input name="nombre" type="text" class="form-control" placeholder="Nombre" aria-label="nombre" aria-describedby="basic-addon1" onChange={this.myChangeHandler}></input>
                    </div>

                    <FormGroup row>
                        <FormControlLabel
                            label="Estado Bodega"
                            control={<Switch checked={this.state.checkedA} onChange={this.handleChangeSwitch} name="checkedA" />}
                        />
                    </FormGroup>
                    
                    <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Sede</span>
                            </div>
                            <select
                                class="form-control"
                                value={this.state.selectedSedes}
                                onChange={e =>
                                    this.setState({
                                    selectedSedes: e.target.value,
                                    validationError:
                                        e.target.value === ""
                                        ? "You must select your favourite team"
                                        : ""
                                    })
                                }
                                >
                                {this.state.sedes.map(sede => (
                                    <option
                                    key={sede.id_sede}
                                    value={sede.id_sede}
                                    >
                                    {sede.alias}
                                    </option>
                                ))}
                            </select>
                    </div>
                    
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Encargado</span>
                        </div>
                        <select
                            class="form-control"
                            value={this.state.selectedUsuario}
                            onChange={e =>
                                this.setState({
                                selectedUsuario: e.target.value,
                                validationError:
                                    e.target.value === ""
                                    ? "You must select your favourite team"
                                    : ""
                                })
                            }
                            >
                            {this.state.usuarios.map(usuario => (
                                <option
                                key={usuario.id_usuario}
                                value={usuario.id_usuario}
                                >
                                {usuario.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <br></br><br></br>
                    <Button onClick={this.crear.bind(this)} variant="contained" color="primary">Crear Bodega</Button>
                    <br></br><br></br><br></br>
                </div>
                <br></br><br></br>
                <div class="container">
                    <h2 id="simple-modal-title">Cambiar Estado Bodega</h2>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Bodega</span>
                        </div>
                        <select
                            class="form-control"
                            value={this.state.selectedBodega}
                            onChange={e =>
                                this.setState({
                                selectedBodega: e.target.value,
                                validationError:
                                    e.target.value === ""
                                    ? "You must select your favourite team"
                                    : ""
                                })
                            }
                            >
                            {this.state.data.map(bodega => (
                                <option
                                key={bodega.id_bodega}
                                value={bodega.id_bodega}
                                >
                                {bodega.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <FormGroup row>
                        <FormControlLabel
                            label="Estado Bodega"
                            control={<Switch checked={this.state.checkedB} onChange={this.handleChangeSwitch2} name="checkedB" />}
                        />
                    </FormGroup>
                    <br></br><br></br>
                    <Button onClick={this.cambiar.bind(this)} variant="contained" color="primary">Cambiar Estado</Button>
                    <br></br><br></br><br></br>
                </div>
            </Router>
        );
    }
}