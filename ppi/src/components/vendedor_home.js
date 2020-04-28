import React, { Component } from "react";
import { BrowserRouter as Router,Switch, Route, Link,useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';

export default class Vendedor_home extends Component {
    constructor(props){
        super(props);
        //console.log(props);
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
                        <IconButton aria-label="delete" style={style.back} >
                            <ExitToAppIcon fontSize="large" />
                        </IconButton>
                    </div>
                </nav>
                <br/>
                <br/>
                <br/>
                <Carta_Clientes p={this.props}/>
                <br/>
                <Carta_Ventas/>
                <br/>
                <Carta_Reportes/>
                <br/>
            </Router>
        );
    }
}
/*--------------------------------------------------------- cosas propias ---------------------------------------------------------*/

function Carta_Clientes(props) {
    props=props.p
    console.log(props);
    const styles={
        carta:{
            maxWidth: "80%",
            margin: "auto"
        },
        media:{
            height: 140
        }
    }
    
    return (
        <Card style={styles.carta}>
          <CardActionArea onClick={()=>{
              props.history.push("/vendedor_home/clientes")
          }}>
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
    
    const redirect=()=>{
        console.log("presionado")
    }
    return (
        <Card style={styles.carta}>
          <CardActionArea onClick={redirect}>
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
    
    const redirect=()=>{
        console.log("presionado")
    }
    return (
        <Card style={styles.carta}>
          <CardActionArea onClick={redirect}>
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