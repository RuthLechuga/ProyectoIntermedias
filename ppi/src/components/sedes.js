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

export default class Sedes extends Component {

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
                { title: 'ID', field: 'id_sede' },
                { title: 'ALIAS', field: 'alias' },
                { title: 'DIRECCION', field: 'direccion'},
            ],
            data: [],
            municipios: [],
            selectedMunicipio: 0,
            alias: '',
            direccion: '',
            id_usuario: 2
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    componentDidMount() {
        axios.get('https://proyectopi-server.herokuapp.com/sede')
        .then(res => {
            const data = res.data;
            this.setState({data});
        });

        axios.get('https://proyectopi-server.herokuapp.com/municipio')
        .then(res => {
            console.log(res);
            const municipios = res.data;
            this.setState({municipios});
        });

        console.log(this.state.municipios);
    }

    handleChange = (event) => {
        console.log(event.target.value);
    };

    crear(event){
        const params = {
            alias: this.state.alias,
            direccion: this.state.direccion,
            id_usuario: this.state.id_usuario,
            id_municipio: this.state.selectedMunicipio
        }

        console.log(params);

        axios.post('https://proyectopi-server.herokuapp.com/sede',params)
        .then(res => {
            alert('Sede creada exitosamente');
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
                    <h1 id='title'>Sede</h1>
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
                                const data_eliminar = { "id_sede": oldData.id_sede }
                                resolve();

                                axios.delete("https://proyectopi-server.herokuapp.com/sede",{data: data_eliminar}).
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
                    <h2 id="simple-modal-title">Crear Sede</h2>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Alias</span>
                        </div>
                        <input name="alias" type="text" class="form-control" placeholder="Alias" aria-label="alias" aria-describedby="basic-addon1" onChange={this.myChangeHandler}></input>
                    </div>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Direccion</span>
                        </div>
                        <input name="direccion" type="text" class="form-control" placeholder="Direccion" aria-label="direccion" aria-describedby="basic-addon1" onChange={this.myChangeHandler}></input>
                    </div>
                    
                    <select
                        class="form-control form-control-sm"
                        value={this.state.selectedMunicipio}
                        onChange={e =>
                            this.setState({
                            selectedMunicipio: e.target.value,
                            validationError:
                                e.target.value === ""
                                ? "You must select your favourite team"
                                : ""
                            })
                        }
                        >
                        {this.state.municipios.map(municipio => (
                            <option
                            key={municipio.id_municipio}
                            value={municipio.id_municipio}
                            >
                            {municipio.nombre}
                            </option>
                        ))}
                    </select>
                    <br></br><br></br>
                    <Button onClick={this.crear.bind(this)} variant="contained" color="primary">Crear Sede</Button>
                    <br></br><br></br><br></br>
                </div>
            </Router>
        );
    }
}