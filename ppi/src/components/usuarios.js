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
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

export default class Usuarios extends Component {

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
                { title: 'ID', field: 'id_usuario' },
                { title: 'DPI', field: 'dpi' },
                { title: 'NOMBRE', field: 'nombre'},
                { title: 'FECHA NACIMIENTO', field:'fecha_nacimiento'},
                { title: 'CORREO', field:'correo'},
                { title: 'PASSWORD', field:'password'}
            ],
            date: new Date('2014-08-18T21:11:54'),
            data: [],
            dpi: '',
            nombre: '',
            fecha_nacimiento: '',
            correo: '',
            password: ''
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    componentDidMount() {
        axios.get('https://proyectopi-server.herokuapp.com/usuario')
        .then(res => {
            const data = res.data;
            this.setState({data});
        });
    }

    handleDateChange = (date) => {
        this.setState({date});
    };

    crear(event){
        const params = {
            dpi: this.state.dpi,
            nombre: this.state.nombre,
            fecha_nacimiento: this.state.date,
            correo: this.state.correo,
            password: this.state.password
        }

        axios.post('https://proyectopi-server.herokuapp.com/usuario',params)
        .then(res => {
            alert('Usuario creado exitosamente');
        });

        console.log(params)
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
                    <h1 id='title'>Usuarios</h1>
                    <MaterialTable
                        icons={this.tableIcons}
                        title="Usuarios existentes"
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
                                const data_eliminar = { "id_usuario": oldData.id_usuario }
                                resolve();

                                axios.delete("https://proyectopi-server.herokuapp.com/usuario",{data: data_eliminar}).
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
                    <h2 id="simple-modal-title">Crear Usuario</h2>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">DPI</span>
                        </div>
                        <input name="dpi" type="text" class="form-control" placeholder="DPI" aria-label="DPI" aria-describedby="basic-addon1" onChange={this.myChangeHandler}></input>
                    </div>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Nombre</span>
                        </div>
                        <input name="nombre" type="text" class="form-control" placeholder="nombre" aria-label="nombre" aria-describedby="basic-addon1" onChange={this.myChangeHandler}></input>
                    </div>
                    
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="yyyy/MM/dd"
                                value={this.state.date}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Correo</span>
                        </div>
                        <input name="correo" type="text" class="form-control" placeholder="correo" aria-label="correo" aria-describedby="basic-addon1" onChange={this.myChangeHandler}></input>
                    </div>
                    
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Password</span>
                        </div>
                        <input name="password" type="text" class="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1" onChange={this.myChangeHandler}></input>
                    </div>
                    
                    <br></br><br></br>
                    <Button onClick={this.crear.bind(this)} variant="contained" color="primary">Crear Usuario</Button>
                    <br></br><br></br><br></br>
                </div>
            </Router>
        );
    }
}