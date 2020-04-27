import React, { Component } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import cl from '../images/clientes.jpg';
import vn from '../images/ventas.png';
import gr from '../images/graficas.jpg';

export default class Vendedor_home extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }
    render() {
        return (
            <Router>
                <br/>
                <br/>
                <br/>
                <br/>
                <Carta_Clientes/>
                <br/>
                <Carta_Ventas/>
                <br/>
                <Carta_Reportes/>
            </Router>
        );
    }
}
/*--------------------------------------------------------- cosas propias ---------------------------------------------------------*/

function Carta_Clientes() {
    const styles={
        carta:{
            maxWidth: "80%",
            margin: "auto"
        },
        media:{
            height: 140
        }
    }
    
    const clientes=()=>{
        console.log("presionado")
    }
    return (
        <Card style={styles.carta}>
          <CardActionArea onClick={clientes}>
            <CardMedia
              component="img"
              style={styles.media}
              alt="CRUD de Clientes"
              title="CRUD de Clientes"
              image={require("../images/clientes.jpg")}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Clientes
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Aquí puedes agregar, editar y eliminar clientes
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    );
}
function Carta_Ventas(){
    const styles={
        carta:{
            maxWidth: "80%",
            margin: "auto"
        },
        media:{
            height: 140,
        }
    }
    
    const clientes=()=>{
        console.log("presionado")
    }
    return (
        <Card style={styles.carta}>
          <CardActionArea onClick={clientes}>
            <CardMedia
              component="img"
              style={styles.media}
              alt="Área de Ventas"
              title="Área de Ventas"
              image={require("../images/ventas.png")}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Ventas
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Aquí puedes realizar ventas
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    );
}
function Carta_Reportes(){
    const styles={
        carta:{
            maxWidth: "80%",
            margin: "auto"
        },
        media:{
            height: 140,
            //backgroundImage: `url(${gr})`
        }
    }
    
    const clientes=()=>{
        console.log("presionado")
    }
    return (
        <Card style={styles.carta}>
          <CardActionArea onClick={clientes}>
            <CardMedia
              component="img"
              style={styles.media}
              alt="Visualización de Reportes"
              title="Visualización de Reportes"
              image={require("../images/graficas.jpg")}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Reportes de Ventas
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Aquí puedes observar los reportes de las ventas realizadas
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    );
}