import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import axios from 'axios';
import * as V from 'victory';
import { VictoryBar, VictoryLine, VictoryPie,VictoryTheme,VictoryChart,VictoryAxis,VictoryLabel } from 'victory';

export default class Vendedor_reportes extends Component {
    constructor(props){
        super(props);
        this.state={
            allData:[],
            grafica:0,
            date:2,
            data:[]

            
        }
        let date=[
            {fecha:"2019-12-19",total:1},
            {fecha:"2020-01-03",total:3},
            {fecha:"2020-02-05",total:4},
            {fecha:"2020-02-07",total:6},
            {fecha:"2020-03-09",total:2},
            {fecha:"2020-04-19",total:8},
            {fecha:"2020-04-09",total:10}
        ]

        let items=[];
        for(let i of date){
            items.push({x:new Date(i.fecha),y:i.total})
        }
        this.state.allData=items;
        
        this.state.data=this.agrupar(items,2);
    }
    componentDidMount () {
        
        
        
        
        
    }
    agrupar(items,agrupador){
        let datos=[];

        //console.log("antes")
        //console.log(items)
        //console.log(datos)
        for(let i of items){
            for(let j of datos){
                               //separación por año
                if(agrupador==0 && j.x.getYear()==i.x.getYear()){
                    j.y+=i.y;
                    break;
                }            //separación por mes
                else if(agrupador==1 && j.x.getMonth()==i.x.getMonth() && j.x.getYear()==i.x.getYear()){
                    j.y+=i.y;
                    break;
                }                //separación por día
                else if(agrupador==2 && j.x.getDay()==i.x.getDay() && j.x.getMonth()==i.x.getMonth() && j.x.getYear()==i.x.getYear()){
                    j.y+=i.y;
                    break;
                }
                if(datos[datos.length-1]==j){
                    datos.push({x:i.x,y:i.y})
                    break;
                }
            }
            if(datos.length==0)
                datos.push({x:i.x,y:i.y})
        }
        //console.log("despues")
        //console.log(items)
        //console.log(datos)
        return datos;
    }


    render() {
        const style={
            back:{
                float:"right"
            },
            contenedor:{
                display: "flex"
            },
            slider:{
                flex: "20%",
                height:300,
                margin:"auto"
            },
            grafica:{
                flex: "50%",
                height:400
            }
        }
        const marksG=[{value:0,label:"Lineas"},{value:1,label:"Barras"},{value:2,label:"Dona"}]
        const marksT=[{value:0,label:"Año"},{value:1,label:"Mes"},{value:2,label:"Día"}]
        //const [grafica, setValue] = React.useState(0);
        const onGraph =(event,value)=>{
            this.setState({grafica:value})
        }
        const onDate = (event,value)=>{
            this.setState({date:value})
            //console.log(this.state.allData)
            this.setState({data:this.agrupar(this.state.allData,value)})
            //console.log(this.state.allData)
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
                <h1>Reportes de Ventas</h1>
                <div style={style.contenedor}>
                    <div style={style.slider}>
                        <Typography id="discrete-slider-custom" gutterBottom>
                            Tipo de gráfica
                        </Typography>
                        <Slider
                            orientation="vertical"
                            value={this.state.grafica}
                            onChange={onGraph}
                            track={false}
                            step={1}
                            marks={marksG}
                            min={0}
                            max={2}
                        />
                    </div>
                    <div style={style.grafica}>
                        <Graph grafica={this.state.grafica} data={this.state.data} group={this.state.date}/>
                    </div>
                    <div style={style.slider}>
                        <Typography id="discrete-slider-custom" gutterBottom>
                            Tipo de gráfica
                        </Typography>
                        <Slider
                            orientation="vertical"
                            value={this.state.date}
                            onChange={onDate}
                            track={false}
                            step={1}
                            marks={marksT}
                            min={0}
                            max={2}
                        />
                    </div>
                </div>
            </Router>
        )
    }
}

/*

*/
/**
 * 
 * @param {*} props.data es la data que necesitas
 * 
 */
function Graph(props){
    let datos=props.data;
    let grupo=props.group
    let getLabel=(datum)=>{
        return grupo==0?getAnio(datum.datum):grupo==1?getMes(datum.datum):getDia(datum.datum);
    }
    let getAnio=(grup)=>{
        console.log(grup)
        return grup.x.getYear()+1900;
    }
    let getMes=(grup)=>{
        let mm;
        switch(grup.x.getMonth()){
            case 0: mm="Ene"; break;
            case 1: mm="Feb"; break;
            case 2: mm="Mar"; break;
            case 3: mm="Abr"; break;
            case 4: mm="May"; break;
            case 5: mm="Jun"; break;
            case 6: mm="Jul"; break;
            case 7: mm="Ago"; break;
            case 8: mm="Sep"; break;
            case 9: mm="Oct"; break;
            case 10: mm="Nov"; break;
            case 11: mm="Dic"; break;
        }
        return (grup.x.getYear()+1900)+"-"+mm;
    }
    let getDia=(grup)=>{
        let mm;
        switch(grup.x.getMonth()){
            case 0: mm="Ene"; break;
            case 1: mm="Feb"; break;
            case 2: mm="Mar"; break;
            case 3: mm="Abr"; break;
            case 4: mm="May"; break;
            case 5: mm="Jun"; break;
            case 6: mm="Jul"; break;
            case 7: mm="Ago"; break;
            case 8: mm="Sep"; break;
            case 9: mm="Oct"; break;
            case 10: mm="Nov"; break;
            case 11: mm="Dic"; break;
        }
        return (grup.x.getYear()+1900)+"-"+mm+"-"+grup.x.getDay()
    }

    switch(props.grafica){
        case 0:{                                                          //grafica de linea
            const styles={
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
            }
            return(
                <VictoryChart theme={VictoryTheme.material}>
                    <VictoryLine 
                        style={styles}
                        data={datos}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                    
                    />
                </VictoryChart>
            )
        }
        case 1:{                                                        //grafica de barras
            const styles={
                data: { black: "#c43a31",fill: "#c43a31",strokeWidth: 2 },
                parent: { border: "1px solid #ccc"}
            }
            return(
                <VictoryChart theme={VictoryTheme.material}>
                    <VictoryBar
                        style={styles}
                        colorScale="qualitative"
                        data={datos}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                    />
                </VictoryChart>
            )
        }
        case 2:{                                                        //grafica de pie
            return(
                    <VictoryPie  
                        data={datos}
                        colorScale="qualitative"
                        innerRadius={80}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                        labels={getLabel}
                        labelRadius={({ innerRadius }) => innerRadius + 15 }
                        style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
                    />
            )
        }
    }
    
}



//const marksT=[{value:0,label:"Año"},{value:1,label:"Mes"},{value:2,label:"Día"}]