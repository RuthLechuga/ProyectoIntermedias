import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

export class PDF {
    productos=[]; 
    subtotal; 
    descuento; 
    domicilio;
    total;
    cliente;
    vendedor;
    constructor(productos, subtotal, descuento, domicilio,cliente,vendedor){
        this.productos = productos;  
        this.subtotal = subtotal;  
        this.descuento = descuento;  
        this.domicilio = domicilio?subtotal*0.1:0;
        this.total = (domicilio?subtotal*1.1:subtotal)-descuento;
        this.cliente = cliente;
        this.vendedor = vendedor;
    }
    getPDF(){
        const styles = {
            body:{
                paddingTop:50,
                paddingHorizontal:20,
                paddingBottom:50
            },
            header:{
                display:"flex"
            },
            logo:{
                width:150,
                height:100,
                border:1,
                marginBottom:10
            },
            table: { 
                display: "table", 
                width: "auto", 
                borderStyle: "solid", 
                borderWidth: 1, 
                borderRightWidth: 0, 
                borderBottomWidth: 0 
            }, 
            tableRow: { 
                marginLeft: "auto", 
                flexDirection: "row" 
            }, 
            tableCol: { 
                width: "20%", 
                borderStyle: "solid", 
                borderWidth: 1, 
                borderLeftWidth: 0, 
                borderTopWidth: 0 
            }, 
            tableColS: { 
                width: "80%", 
                borderStyle: "solid", 
                borderWidth: 1, 
                borderLeftWidth: 0, 
                borderTopWidth: 0 
            },
            tableColT: { 
                width: "20%", 
                borderStyle: "solid", 
                borderWidth: 1, 
                borderLeftWidth: 0, 
                borderTopWidth: 0 
            },
            tableCell: { 
                margin: "auto", 
                marginTop: 5, 
                fontSize: 10 
            }, 
            tableCellP: { 
                marginLeft: "auto", 
                marginTop: 5, 
                fontSize: 16 
            },
            divider:{
                borderWidth: 1, 
            } 
        }

        let pdf=(
            <Document>
                <Page style={styles.body}>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.header}>
                        <View style={styles.logo}></View>
                            <Text>Logo Empresa</Text>
                        </View>
                        <View style={{width:"70%"}}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={{marginLeft:20}}>Cliente:    </Text>
                                <Text style={{marginLeft: "auto"}}>{this.cliente.nombre}</Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <Text style={{marginLeft:20}}>Vendedor:    </Text>
                                <Text style={{marginLeft: "auto"}}>{this.vendedor.nombre}</Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <Text style={{marginLeft:20}}>Nit.    </Text>
                                <Text style={{marginLeft: "auto"}}>{this.cliente.nit}</Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <Text style={{marginLeft:20}}>Fecha Facturación:    </Text>
                                <Text style={{marginLeft: "auto"}}>{this.getToday()}</Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <Text style={{marginLeft:20}}>Fecha Entrega:    </Text>
                                <Text style={{marginLeft: "auto"}}>{this.domicilio!=0?this.getNextWeek():"-----"}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.table}> 
                        <View style={styles.tableRow}> 
                            <View style={styles.tableCol}> 
                                <Text style={styles.tableCell}>ID de producto</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                                <Text style={styles.tableCell}>Producto</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                                <Text style={styles.tableCell}>Cantidad</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                                <Text style={styles.tableCell}>Precio c/u (Q)</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                                <Text style={styles.tableCell}>Total (Q)</Text> 
                            </View> 
                        </View> 
                        <View style={styles.divider}></View> 
                            {this.productos.map((row)=>{
                                return(
                                    <View style={styles.tableRow}> 
                                        <View style={styles.tableCol}> 
                                            <Text style={styles.tableCell}>{row.id_producto}</Text> 
                                        </View> 
                                        <View style={styles.tableCol}> 
                                            <Text style={styles.tableCell}>{row.nombre}</Text> 
                                        </View> 
                                        <View style={styles.tableCol}> 
                                            <Text style={styles.tableCell}>{row.cantidad}</Text> 
                                        </View> 
                                        <View style={styles.tableCol}> 
                                            <Text style={styles.tableCellP}>Q {row.precio.toFixed(2)}</Text> 
                                        </View> 
                                        <View style={styles.tableCol}> 
                                            <Text style={styles.tableCellP}>Q {row.total.toFixed(2)}</Text> 
                                        </View> 
                                    </View>
                                )
                            })}
                        <View style={styles.divider}></View> 
                        <View style={styles.tableRow}> 
                            <View style={styles.tableColS}> 
                                <Text style={styles.tableCell}>SUBTOTAL</Text> 
                            </View> 
                            <View style={styles.tableColT}> 
                                <Text style={styles.tableCellP}>Q {parseFloat(this.subtotal).toFixed(2)}</Text> 
                            </View> 
                        </View> 
                        <View style={styles.tableRow}> 
                            <View style={styles.tableColS}> 
                                <Text style={styles.tableCell}>DESCUENTO</Text> 
                            </View> 
                            <View style={styles.tableColT}> 
                                <Text style={styles.tableCellP}>Q {parseFloat(this.descuento).toFixed(2)}</Text> 
                            </View> 
                        </View> 
                        <View style={styles.tableRow}> 
                            <View style={styles.tableColS}> 
                                <Text style={styles.tableCell}>DOMICILIO</Text> 
                            </View> 
                            <View style={styles.tableColT}> 
                                <Text style={styles.tableCellP}>Q {parseFloat(this.domicilio).toFixed(2)}</Text> 
                            </View> 
                        </View> 
                        <View style={styles.divider}></View> 
                        <View style={styles.tableRow}> 
                            <View style={styles.tableColS}> 
                                <Text style={styles.tableCell}>TOTAL</Text> 
                            </View> 
                            <View style={styles.tableColT}> 
                                <Text style={styles.tableCellP}>Q {this.total.toFixed(2)}</Text> 
                            </View> 
                        </View> 
                    </View>
                </Page>
            </Document>
        )
        return pdf;
    }
    getToday(){
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${year}-${month<10?`0${month}`:`${month}`}-${date}`
    }
    getNextWeek(){
        let dia=new Date()
        let newDate = new Date(dia.getTime() + 7 * 24 * 60 * 60 * 1000)
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${year}-${month<10?`0${month}`:`${month}`}-${date}`
    }
}