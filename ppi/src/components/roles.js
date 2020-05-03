import React, { Component } from "react";
import { forwardRef } from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import axios from 'axios';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default class Roles extends Component {

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
            usuarios: [],
            usuarioSelected: 0,
            rolSelected: 0,
            checkedVendedor: 0,
            checkedBodeguero: 0,
            checkedRepartidor: 0,
            checkedAdmin: 0,
            permisos: [],
            isVendedor: false,
            isBogeguero: false,
            isRepartidor: false,
            isAdmin: false
        }
    }

    handleChange = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
    };

    componentDidMount() {
        axios.get('https://proyectopi-server.herokuapp.com/usuario')
        .then(res => {
            const usuarios = res.data;
            this.setState({usuarios});
        });

        axios.get('https://proyectopi-server.herokuapp.com/detalle_rol')
        .then(res => {
            const permisos = res.data;
            console.log(permisos);
            this.setState({permisos});
        });

    }

    asignar(event){
        if(this.state.isVendedor ^ this.state.checkedVendedor){
            const params = {
                "id_usuario": this.state.usuarioSelected,
                "id_rol": 1
            };

            if(this.state.checkedVendedor){
                axios.post('https://proyectopi-server.herokuapp.com/detalle_rol',params)
                .then(res => {})
            }
            else {
                axios.delete('https://proyectopi-server.herokuapp.com/detalle_rol',{data: params})
                .then(res => {})
            }
        }

        if(this.state.isBogeguero ^ this.state.checkedBodeguero){
            const params = {
                "id_usuario": this.state.usuarioSelected,
                "id_rol": 2
            };

            if(this.state.checkedBodeguero){
                axios.post('https://proyectopi-server.herokuapp.com/detalle_rol',params)
                .then(res => {})
            }
            else {
                axios.delete('https://proyectopi-server.herokuapp.com/detalle_rol',{data: params})
                .then(res => {})
            }
        }

        if(this.state.isRepartidor ^ this.state.checkedRepartidor){
            const params = {
                "id_usuario": this.state.usuarioSelected,
                "id_rol": 3
            };

            if(this.state.checkedRepartidor){
                axios.post('https://proyectopi-server.herokuapp.com/detalle_rol',params)
                .then(res => {})
            }
            else {
                axios.delete('https://proyectopi-server.herokuapp.com/detalle_rol',{data: params})
                .then(res => {})
            }
        }

        if(this.state.isAdmin ^ this.state.checkedAdmin){
            const params = {
                "id_usuario": this.state.usuarioSelected,
                "id_rol": 6
            };

            if(this.state.checkedAdmin){
                axios.post('https://proyectopi-server.herokuapp.com/detalle_rol',params)
                .then(res => {})
            }
            else {
                axios.delete('https://proyectopi-server.herokuapp.com/detalle_rol',{data: params})
                .then(res => {})
            }
        }

        alert('Roles cambiado exitosamente')
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
                <div class="container">
                    <h2 id="simple-modal-title">Administrar Roles</h2>
                    <br></br>
                    <select
                        class="form-control"
                        value={this.state.usuarioSelected}
                        onChange={e => {
                            this.setState({
                            usuarioSelected: e.target.value,
                            validationError:
                                e.target.value === ""
                                ? "You must select your favourite team"
                                : ""
                            })

                            console.log(e.target.value);
                            this.state.isVendedor = this.state.permisos.filter(permiso => permiso.id_usuario == e.target.value && permiso.id_rol==1).length >0 ? true: false;
                            this.state.checkedVendedor = this.state.isVendedor;

                            this.state.isBogeguero = this.state.permisos.filter(permiso => permiso.id_usuario == e.target.value && permiso.id_rol==2).length >0 ? true: false;
                            this.state.checkedBodeguero = this.state.isBogeguero;

                            this.state.isRepartidor = this.state.permisos.filter(permiso => permiso.id_usuario == e.target.value && permiso.id_rol==3).length >0 ? true: false;
                            this.state.checkedRepartidor = this.state.isRepartidor;

                            this.state.isAdmin = this.state.permisos.filter(permiso => permiso.id_usuario == e.target.value && permiso.id_rol==6).length >0 ? true: false;
                            this.state.checkedAdmin = this.state.isAdmin;

                        }}
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
                    <br></br>
                    <FormControlLabel
                        control={<Checkbox checked={this.state.checkedVendedor} onChange={this.handleChange} name="checkedVendedor" />}
                        label="Vendedor"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={this.state.checkedBodeguero} onChange={this.handleChange} name="checkedBodeguero" />}
                        label="Bodeguero"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={this.state.checkedRepartidor} onChange={this.handleChange} name="checkedRepartidor" />}
                        label="Repartidor"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={this.state.checkedAdmin} onChange={this.handleChange} name="checkedAdmin" />}
                        label="Administrador"
                    />
                    <br></br>
                    <button className="btn btn-primary btn-block" onClick={this.asignar.bind(this)}>Asignar Roles</button>
                </div>
            </Router>
        );
    }
}