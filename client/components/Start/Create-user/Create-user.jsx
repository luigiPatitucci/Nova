import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Container, Form, Item, Input, Label, Text, Button, Picker } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

const CreateUser = ({navigation}) => {

    const [data, setData] = useState({
        tipoDoc: '',
        nroDNI: '',
        nombre: '',
        apellido: '',
        fechaNac: '',
        cel: ''
    });

    const handleSiguiente = () => {
        console.log(data)
        for (const prop in data) {
            if (data[prop] === '') {
                return;
            }
        }
            navigation.navigate('DirectionRegister', data)
    }

    return (
        <Container style={styles.container}>
            <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : null}
            style={styles.keyboard}
            >
                <View style={styles.inner}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView>
                            <Form>
                                <Label style={styles.titulos}>Datos Personales</Label>
                                <Item >
                                <Label>Tipo de documento: *</Label>
                                <Picker style={{color: 'white'}} onValueChange={tipoDoc => setData({...data, tipoDoc})} selectedValue={data.tipoDoc}
                                    >
                                        <Picker.Item label= 'Selecciona el tipo de documento' value= ''/>
                                        <Picker.Item label='DNI' value= "DNI"/>
                                        <Picker.Item label='Pasaporte' value= "Pasaporte"/>
                                    </Picker>
                                </Item>
                                <Item floatingLabel>
                                    <Label>Nro de DNI: *</Label>
                                    <Input style={{color: 'white'}} onChangeText={nroDNI => setData({ ...data, nroDNI })} type="number"></Input>
                                </Item>
                                <Item floatingLabel>
                                    <Label>Nombre: *</Label>
                                    <Input style={{color: 'white'}} onChangeText={nombre => setData({ ...data, nombre })}></Input>
                                </Item>
                                <Item floatingLabel>
                                    <Label>Apellido: *</Label>
                                    <Input style={{color: 'white'}} onChangeText={apellido => setData({ ...data, apellido }) }></Input>
                                </Item>
                                <Item floatingLabel>
                                    <Label>Fecha de nacimiento: *</Label>
                                    <Input style={{color: 'white'}} onChangeText={fechaNac => setData({ ...data, fechaNac })} type="date"></Input>
                                </Item>
                                <Item floatingLabel>
                                    <Label>Telefono celular: *</Label>
                                    <Input style={{color: 'white'}} onChangeText={cel => setData({ ...data, cel })}  type="number"></Input>
                                </Item>
                            </Form>
                            <Button
                                block
                                dark
                                style={styles.button}
                                onPress={() =>  handleSiguiente()}
                            >
                                <Text>Siguiente</Text>
                            </Button>
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ flex : 1 }} />
            </KeyboardAvoidingView>
        </Container>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#171717',
        flex: 1
    },
    keyboard: {
        flex: 1
    },
    inner: {
        justifyContent: "flex-end"
    },
    button: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 50,
        justifyContent: 'center',
        backgroundColor: '#4A1491',
        borderRadius: 10,
    },
    titulos: {
        marginTop: 50,
        alignSelf: 'center',
        fontWeight: "bold"
    }
});


export default CreateUser;