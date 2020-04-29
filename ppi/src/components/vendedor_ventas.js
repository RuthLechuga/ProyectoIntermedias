import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

export default class Vendedor_ventas extends Component {
    constructor(props){
        super(props);
        let t={
            columnas:[
                { id: 'id_producto', label: 'ID' },
                { id: 'nombre', label: 'Producto' },
                { id: 'cantidad', label: 'Cant.' },
                { id: 'precio', label: 'Precio c/u', align: 'right',format: (value) => value.toFixed(2), },
                { id: 'total', label: 'TOTAL', align: 'right',format: (value) => value.toFixed(2) }
            ],
            rows:[
                this.createData({id_producto:1,     cantidad:4,     nombre:"mango con pepita",  precio:10.00}),
                this.createData({id_producto:3,     cantidad:5,     nombre:"aguas",             precio:5.00}),
                this.createData({id_producto:5,     cantidad:2,     nombre:"cocos",             precio:3.50}),
                this.createData({id_producto:7,     cantidad:6,     nombre:"helado",            precio:12.00}),
                this.createData({id_producto:53,    cantidad:3,     nombre:"refresco",          precio:5.00}),
                this.createData({id_producto:2345,  cantidad:4,     nombre:"globos",            precio:25.00}),
                //this.createData({id_producto:7627,  cantidad:11,    nombre:"tacos",             precio:15.00}),
                //this.createData({id_producto:72,    cantidad:15,    nombre:"enchiladas",        precio:20.00}),
                //this.createData({id_producto:4,     cantidad:16,    nombre:"vino",              precio:70.00}),
                //this.createData({id_producto:2643,  cantidad:26,    nombre:"pase entrada",      precio:400.00}),
                //this.createData({id_producto:246,   cantidad:2,     nombre:"mayordomo",         precio:200.00}),
                //this.createData({id_producto:24645, cantidad:1,     nombre:"3 dias hotel",      precio:1.00})
            ],
            page:0,
            rowsPerPage:10,
            envio:false,
            subtotal:0.0,
            descuento:0,
            selected:[]
        }
        let sub=0;
        for(let item of t.rows)
            sub+=item.total
        const subtotal=sub.toFixed(2)
        t.subtotal=subtotal;
        this.state=t;
    }
    createData(producto){
        const id_producto=producto.id_producto;
        const nombre=producto.nombre;
        const cantidad=producto.cantidad;
        const precio=producto.precio;
        const total=cantidad*producto.precio;
        
        return({id_producto, nombre, cantidad, precio, total})
    }
    setPage=(event, newPage)=>{
        const page= newPage;
        this.setState({page});
    }
    setRowsPerPage=(event)=>{
        const rowsPerPage= +event.target.value;
        const page= 0;
        this.setState({page,rowsPerPage});
    }
    setDomicilio=(event)=>{
        this.setState({
            envio:event.target.checked
        });
        console.log(this.state)
    }
    getEnvio(){
        const res=this.state.envio?this.state.subtotal*0.1:0
        return "Q "+parseFloat(res).toFixed(2)
    }
    getTotal(){
        let res=0;
        if(this.state.envio)
            res=this.state.subtotal*1.1
        else
            res=this.state.subtotal
        return "Q "+parseFloat(res-this.state.descuento).toFixed(2)
    }
    submit=()=>{
        console.log("Se ha realizado la venta exitosamente de Q "+this.getTotal())
    }
    onDelete(event,row){
        const selected=this.state.rows.indexOf(row)
        let rows= [];
        for(let item of this.state.rows.slice(0, selected))
            rows.push(item)
        for(let item of this.state.rows.slice(selected + 1))
            rows.push(item)
        let sub=0;
        for(let item of rows)
            sub+=item.total
        const subtotal=sub.toFixed(2)
        //console.log(selected)
        //console.log(rows)
        this.setState({rows,subtotal})
    }
    onDiscount=(event)=>{
        let text=event.target.value
        if(text.charAt(text.length-1)=="%"){//es porcentaje
            let numero=text.substring(0,text.length-1)
            if(!isNaN(numero)){
                numero=(+numero)/100
                console.log(numero)
                
                this.setState({descuento:numero*this.state.subtotal})
            }
            else{
                console.log("NO ES PORCENTAJE")
            }
        }
        else{//es numero
            if(!isNaN(text)){
                text=+text
                console.log(text)
                this.setState({descuento:text})
            }
            else{
                console.log("NO ES numero")
            }
        }

    }
    render() {
        const styles={
            head: {
                backgroundColor: "navy",
                color: "white",
            },
            back:{
                float:"right"
            },
            paper:{
                width:"50%",
                paddingLeft:"5px",
                paddingRight:"5px"
            },
            container:{
                maxHeight:500
            },
            row:{
                height:33
            },
            totales:{
                textAlign:"right",
                backgroundColor:"navajowhite"
            },
            submit:{
                margin:"auto", 
                width:"80%", 
                marginTop:"100px", 
                marginBottom:"50px"
            }
        }
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Button size="large" title="Home" onClick={()=>{
                            this.props.history.push("/vendedor_home")
                        }}>Grupo 8</Button>
                        <IconButton aria-label="delete" style={styles.back} onClick={()=>{
                            this.props.history.push("/vendedor_home")
                        }}>
                            <ArrowBackIcon fontSize="large" />
                        </IconButton>
                    </div>
                </nav>
                <br/>
                <br/>
                <br/>
                <h1>Sistema para ventas</h1>
                <div style={{display:"flex"}}>
                    <Paper style={styles.paper} elevation={3}>
                        <h1>Factura</h1>
                        <TableContainer style={styles.container}>
                            <Table stickyHeader aria-label="sticky table" size={'small'}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={styles.head}>
                                        </TableCell>
                                        {this.state.columnas.map((column) => (
                                            <TableCell style={styles.head} key={column.id} align={column.align} >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row)=>{
                                        return(
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id_producto} style={styles.row}>
                                                {this.state.columnas.map((column)=>{
                                                    const value =row[column.id];
                                                    return(
                                                        <TableCell key={column.id} align={column.align} >
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell>
                                                    <IconButton aria-label="delete" onClick={(event)=>this.onDelete(event,row)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10,20,30]}
                            component="div"
                            count={this.state.rows.length}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.page}
                            onChangePage={this.setPage}
                            onChangeRowsPerPage={this.setRowsPerPage}
                        />
                        <br/>
                        <div style={{width:"90%", margin:"auto"}}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    Servicio A Domicilio
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper>Sub Total:</Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper style={styles.totales}>{"Q "+this.state.subtotal}</Paper>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper>Descuento:</Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField style={styles.totales} defaultValue="0.00" size="small" inputProps={{style: { textAlign: "right" }}} onChange={this.onDiscount}/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Switch checked={this.state.envio} onChange={this.setDomicilio} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper>Domicilio:</Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper style={styles.totales}>{this.getEnvio()}</Paper>
                                </Grid>
                            </Grid>
                            
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper>Total:</Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper style={styles.totales}>{this.getTotal()}</Paper>
                                </Grid>
                            </Grid>
                            <br/>
                        </div>
                    </Paper>
                    <p>holaaaaa</p>
                </div>
                <Button variant="contained" color="primary" style={styles.submit} onClick={this.submit}>Realizar venta</Button>
            </Router>
        )
    }
}
