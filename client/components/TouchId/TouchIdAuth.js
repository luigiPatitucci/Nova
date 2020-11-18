
import React, { useEffect, useState } from 'react';
import {View, Text, StylesSheet, TouchableHighlight} from 'react-native';
import TouchID from 'react-native-touch-id';

export default function Touch(){
    const [suportted, setSuportted] = useState(null);
    const [nombre, setNombre] = useState('Usuario')
    useEffect(()=>{
        TouchID.isSupported()
        .then(success =>{
            setSuportted(true);
        })
        .catch((error)=>{
            console.log("Error touch: " + error)
            alert("Tu dispositivo no es compatible")
        })
    }, []);
    function handleLogin(){
        const config = {
            title: "Autenticacion Touch ID",
            color: "#FF0000",
            sensorErrorDescription: 'Touch ID invalido'
        };
        TouchID.authenticate("Ingresar a HenryBank", config)
        .then(success =>{
            setNombre("Penelope")
        })
        .catch(error =>{
            console.log('La auntenticacion fallo: '+ error)
        })
    }
    return(
       <View style={styles.container}>
           <TouchableHighlight style={styles.btn} onPress={handleLogin}>
        <Text style={{color: '#FFF', fontWeight:'bold'}}>Ingresar</Text>
           </TouchableHighlight>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>{nombre}</Text>

       </View>
    )
}
const styles = StylesSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    btn:{
        borderRadius: 3,
        marginBottom: 15,
        padding: 15, 
        backgroundColor: '#0391D7'
    }
})