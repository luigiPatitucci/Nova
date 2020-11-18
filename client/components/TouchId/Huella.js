import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
export default function Touch(){
    const [suportted, setSuportted] = useState(null);
    const [nombre, setNombre] = useState('Usuario')
    useEffect(()=>{
        LocalAuthentication.supportedAuthenticationTypesAsync()
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
            promptMessage: "Autenticacion Touch ID",
            color: "#FF0000",
            fallbackLabel: 'Touch ID invalido'
        };
        LocalAuthentication.authenticateAsync(config)
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
const styles = StyleSheet.create({
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