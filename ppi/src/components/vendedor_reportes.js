import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import axios from 'axios';

export default class Vendedor_reportes extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const style={
            back:{
                float:"right"
            },
            slider:{
                width: 300,
                margin:"auto"
            }
        }
        const marksG=[{value:0,label:"Barras"},{value:1,label:"Lineas"},{value:2,label:"Dona"}]
        //const [grafica, setValue] = React.useState(0);
        //const graph =(event,newValue)=>{
        //    setValue(newValue);
        //}

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
                <h1>Reportes de Ventas</h1>
                <div style={style.slider}>
                    <Typography id="discrete-slider-custom" gutterBottom>
                        Tipo de gráfica
                    </Typography>
                    <Slider
                        track={false}
                        defaultValue={0}
                        aria-labelledby="track-false-slider"
                        step={1}
                        marks={marksG}
                        min={0}
                        max={2}
                    />
                </div>
                <div style={style.slider}>
                    <Typography id="discrete-slider-custom" gutterBottom>
                        Tipo de gráfica
                    </Typography>
                    <Slider
                        //onChange={graph}
                        track={false}
                        defaultValue={0}
                        aria-labelledby="track-false-slider"
                        step={1}
                        marks={marksG}
                        min={0}
                        max={2}
                    />
                </div>
            </Router>
        )
    }
}