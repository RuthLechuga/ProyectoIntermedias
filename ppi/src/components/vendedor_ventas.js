import React, { Component } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
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
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';

import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDF } from './PDF'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

export default class Vendedor_ventas extends Component {
    usuario;
    constructor(props){
        super(props);
        this.usuario=JSON.parse(localStorage.getItem('usuario'))
        let t={
            columnas:[
                { id: 'id_producto', label: 'ID' },
                { id: 'nombre', label: 'Producto' },
                { id: 'cantidad', label: 'Cant.' },
                { id: 'precio', label: 'Precio c/u', align: 'right',format: (value) => value.toFixed(2), },
                { id: 'total', label: 'TOTAL', align: 'right',format: (value) => value.toFixed(2) }
            ],
            rows:[],
            page:0,
            rowsPerPage:10,
            envio:false,
            subtotal:0.0,
            descuento:0,
            selected:[],
            /* ****************************** PARTE DE CATALOGO DE VENTAS ****************************** */
            columnas2:[
                { id: 'id_producto', label: 'ID' },
                { id: 'nombre', label: 'Producto' },
                { id: 'descripcion', label: 'Descripcion' },
                { id: 'precio', label: 'Precio c/u', align: 'right',format: (value) => value.toFixed(2), }
            ],
            rows2:[],
            page2:0,
            rowsPerPage2:10,
            open:false,
            producto:{},
            /* ******************************  PARTE DE VENTA AL CLIENTE ****************************** */
            clientes:[],
            cliente:0,
            cl:{},
            abrir:false,
        }
        
        this.state=t;
        
    }
    componentDidMount () {
        axios.get('https://proyectopi-server.herokuapp.com/producto').then(res=>{
            this.setState({rows2:res.data})
        })
        axios.get('https://proyectopi-server.herokuapp.com/cliente').then(res=>{
            this.setState({clientes:res.data})
        })
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
    setPage2=(event, newPage)=>{
        const page2= newPage;
        this.setState({page2});
    }
    setRowsPerPage=(event)=>{
        const rowsPerPage= +event.target.value;
        const page= 0;
        this.setState({page,rowsPerPage});
    }
    setRowsPerPage2=(event)=>{
        const rowsPerPage2= +event.target.value;
        const page2= 0;
        this.setState({page2,rowsPerPage2});
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
        if(text.charAt(text.length-1)==="%"){//es porcentaje
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
    onCerrar=(value)=>{
        this.setState({open:false})
        if(value!==0){
            const producto={
                id_producto:this.state.producto.id_producto,
                nombre:this.state.producto.nombre,
                cantidad:value,
                precio:this.state.producto.precio
            }
            console.log(JSON.stringify(producto))
            let rows=this.state.rows;
            rows.push(this.createData(producto))
            let sub=0;
            for(let item of rows)
                sub+=item.total
            const subtotal=sub.toFixed(2)
            this.setState({rows,subtotal})
        }
        
        
    }
    onAdd=(prod)=>{
        this.setState({open:true,producto:prod})
    }
    onCliente=(event)=>{
        const data=this.state.clientes
        for(let i of data)
            if(i.id_cliente===event.target.value){
                this.setState({cl:i})
            }
        this.setState({cliente:event.target.value})
    }
    submit=()=>{
        //console.log("Se ha realizado la venta exitosamente de Q "+this.getTotal())
        this.setState({abrir:!this.state.abrir})


        let venta={
            fecha_facturacion:this.getToday(),
            fecha_entrega:this.state.envio?this.getNextWeek():null,
            id_cliente:this.state.cl.id_cliente,
            id_usuario:this.usuario.id_usuario
        }
        let v=0;
        
        axios.post('https://proyectopi-server.herokuapp.com/venta',venta).then(res=>{
            //console.log(res)
            v=res.data.insertId;
            
            console.log(v)
        }).then(()=>{
            let detalle_venta={id_venta:v}
            for(let i of this.state.rows){
                
                detalle_venta.id_producto=i.id_producto;
                detalle_venta.cantidad=parseInt(i.cantidad);
                detalle_venta.precio_venta=i.precio;
                console.log(detalle_venta)
                if(this.state.rows[0]==i)
                    axios.post('https://proyectopi-server.herokuapp.com/detalle_venta',detalle_venta).then((res)=>{
                        console.log(res)
                    })
                
            }
        })
        
        
    }
    getToday(){
        let newDate = new Date("2020-03-30") //AAAA-MM-DD
        let date = newDate.getUTCDate();
        let month = newDate.getUTCMonth() + 1;
        let year = newDate.getUTCFullYear();
        return `${year}-${month<10?`0${month}`:`${month}`}-${date}`
    }
    getNextWeek(){
        let dia=new Date()
        let newDate = new Date(dia.getTime() + 7 * 24 * 60 * 60 * 1000)
        let date = newDate.getUTCDate();
        let month = newDate.getUTCMonth() + 1;
        let year = newDate.getUTCFullYear();
        return `${year}-${month<10?`0${month}`:`${month}`}-${date}`
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
                width:"49%",
                float: "left",
                paddingLeft:"5px",
                paddingRight:"5px", 
                margin: "auto",
                marginTop:"0"
            },
            paper2:{
                width:"49%",
                float:"right",
                paddingLeft:"5px",
                paddingRight:"5px",
                marginTop:"0"
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
            },
            datos:{
                margin:"auto",
                width: "50%"
            },
            clientes:{
                width:"50%"
            }
        }
        const isPDF=this.state.abrir;
        let crear;
        if(isPDF){
            let pdf=new PDF(this.state.rows,this.state.subtotal,this.state.descuento,this.state.envio,this.state.cl,this.usuario)
            crear=<PDFDownloadLink document={pdf.getPDF()} fileName={"factura.pdf"} >Link para descarga</PDFDownloadLink>
        }
        else
            crear=<p></p>
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
                                        {this.state.columnas.map((column) => (
                                            <TableCell style={styles.head} key={column.id} align={column.align} >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                        <TableCell style={styles.head}>
                                        </TableCell>
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
                    <Paper style={styles.paper2} elevation={3}>
                    <h1>Catalogo</h1>
                        <TableContainer style={styles.container}>
                            <Table stickyHeader aria-label="sticky table" size={'small'}>
                                <TableHead>
                                    <TableRow>
                                        {this.state.columnas2.map((column) => (
                                            <TableCell style={styles.head} key={column.id} align={column.align} >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                        <TableCell style={styles.head}>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.rows2.slice(this.state.page2 * this.state.rowsPerPage2, this.state.page2 * this.state.rowsPerPage2 + this.state.rowsPerPage2).map((row)=>{
                                        return(
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id_producto} style={styles.row}>
                                                {this.state.columnas2.map((column)=>{
                                                    const value =row[column.id];
                                                    return(
                                                        <TableCell key={column.id} align={column.align} >
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell>
                                                    <IconButton aria-label="delete" onClick={()=>this.onAdd(row)}>
                                                        <AddIcon fontSize="small" />
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
                            count={this.state.rows2.length}
                            rowsPerPage={this.state.rowsPerPage2}
                            page={this.state.page2}
                            onChangePage={this.setPage2}
                            onChangeRowsPerPage={this.setRowsPerPage2}
                        />
                    </Paper>
                    <SimpleDialog open={this.state.open} onClose={this.onCerrar}/>
                </div>
                <br/>
                <br/>
                <br/>
                <Divider />
                <Paper style={styles.datos} elevation={7}>
                    <FormControl style={{width:"80%", margin:"auto", marginTop:40}}>
                        <InputLabel>Cliente</InputLabel>
                        <Select style={styles.clientes} value={this.state.cliente} onChange={this.onCliente} >
                            {this.state.clientes.map((cliente)=>(
                                <MenuItem value={cliente.id_cliente} key={cliente.id_cliente}>{cliente.id_cliente+" - "+cliente.nombre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Paper>
                <Button variant="contained" color="primary" style={styles.submit} onClick={this.submit}>Realizar venta</Button>
                {crear}
                
            </Router>
        )
    }
    
}
function SimpleDialog(props){
    const { onClose, open } = props;
    let valor=1;
    const onCerrar=()=>{
        onClose(valor)
    }
    const handleClose=()=>{
        onClose(0)
    }
    const onCambio=(event)=>{
        valor=event.target.value;
        console.log(valor)
    }
    const styles={
        num:{
            width:"90%",
            margin: "auto",
            marginBottom:"40px"
        },
        diagolo:{
            width:"35%"
        }
    }
    return(
        <Dialog onClose={handleClose} open={open} style={styles.dialogo}>
            <DialogTitle id="simple-dialog-title">Elija una cantidad</DialogTitle>
            <TextField type="number" id="standard-basic" label="Cantidad" style={styles.num} inputProps={{min:"1"}} defaultValue={1} onChange={onCambio}/>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={onCerrar} color="primary" autoFocus>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
