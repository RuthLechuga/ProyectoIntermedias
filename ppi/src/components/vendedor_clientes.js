import React, { Component } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import MaterialTable from 'material-table';
import axios from 'axios';

import { forwardRef } from 'react';

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
export default class Vendedor_clientes extends Component {
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
    
    constructor(props){
        super(props);
        this.state = {
            columns: [
                { title: 'ID', field: 'id_cliente',editable:'never' },
                { title: 'Nombre', field: 'nombre' },
                { title: 'NIT', field: 'nit' },
                { title: 'DPI', field: 'dpi' },
                { title: 'Direccion', field: 'direccion' },
                { title: 'Sede', field: 'id_sede' }
            ],
            data:[]
        }
    }
    componentDidMount() {
        axios.get("https://proyectopi-server.herokuapp.com/cliente").then(res => {
            const data = res.data;
            this.setState({data});
        });
    }
    
    render() {
        const style={
            back:{
                float:"right"
            },
            table:{
                width:"90%",
                margin:"auto"
            }
        }
        
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Button size="large" title="Home" onClick={()=>{
                            this.props.history.push("/vendedor_home")
                        }}>Grupo 8</Button>
                        <IconButton aria-label="delete" style={style.back} onClick={()=>{
                            this.props.history.push("/vendedor_home")
                        }}>
                            <ArrowBackIcon fontSize="large" />
                        </IconButton>
                    </div>
                </nav>
                <br/>
                <br/>
                <br/>
                <h1>CRUD clientes</h1>
                <MaterialTable
                    icons={this.tableIcons}
                    title="Clientes existentes"
                    columns={this.state.columns}
                    data={this.state.data}
                    style={style.table}
                    editable={{
                        onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                axios.post("https://proyectopi-server.herokuapp.com/cliente",newData).then(res=>{
                                    console.log(res.data.insertId)
                                    newData.id_cliente=res.data.insertId;
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data.push(newData);
                                        return { ...prevState, data };
                                    });
                                })
                            }, 1000);
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    const cambiar=newData
                                    cambiar.id_cliente=oldData.id_cliente
                                    axios.put("https://proyectopi-server.herokuapp.com/cliente",cambiar).then(res=>{
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
                                resolve();
                                const quitar={data:{"id_cliente": oldData.id_cliente}}
                                axios.delete("https://proyectopi-server.herokuapp.com/cliente",quitar).then(res=>{
                                    console.log(quitar)
                                    console.log(res.data)
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
            </Router>
        );
    }
}
/*--------------------------------------------------------- cosas propias ---------------------------------------------------------*/
