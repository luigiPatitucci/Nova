import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Form, Item, Input, Label, Text, Button, Picker } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { useFormik } from "formik";

const CreateUser = ({navigation}) => {
    const {values, setFieldValue} = useFormik({
        initialValues: {
            tipoDoc:""
        },
        onSubmit: values => {
            
        },
    })
    const [data, setData] = useState({
        tipoDoc: '',
        nroDNI: '',
        nombre: '',
        apellido: '',
        fechaNac: '',
        cel: '',
        fijo: ''
    });

    return (
        <Container style={styles.container}>
            <ScrollView>
                <Form>
                    <Label style={styles.titulos}>Datos Personales</Label>
                    <Item >
                    <Label>Tipo de documento: *</Label>
                    <Picker onValueChange={value => setFieldValue('tipoDoc', value)} selectedValue={values.tipoDoc}
                        >
                            <Picker.Item label= 'Selecciona el tipo de documento' value= ''/>
                            <Picker.Item label='DNI' value= "DNI"/>
                            <Picker.Item label='Pasaporte' value= "Pasaporte"/>
                        </Picker>
                    </Item>
                    <Item floatingLabel>
                        <Label>Nro de DNI: *</Label>
                        <Input onChangeText={nroDNI => setData({ ...data, nroDNI })}></Input>
                    </Item>
                    <Item floatingLabel>
                        <Label>Nombre: *</Label>
                        <Input onChangeText={nombre => setData({ ...data, nombre })}></Input>
                    </Item>
                    <Item floatingLabel>
                        <Label>Apellido: *</Label>
                        <Input onChangeText={apellido => setData({ ...data, apellido })}></Input>
                    </Item>
                    <Item floatingLabel>
                        <Label>Fecha de nacimiento: *</Label>
                        <Input onChangeText={fechaNac => setData({ ...data, fechaNac })}></Input>
                    </Item>
                    <Item floatingLabel>
                        <Label>Telefono celular: *</Label>
                        <Input onChangeText={cel => setData({ ...data, cel })}></Input>
                    </Item>
                    <Item floatingLabel>
                        <Label>Telefono fijo:</Label>
                        <Input onChangeText={fijo => setData({ ...data, fijo })}></Input>
                    </Item>
                </Form>
                <Button
                    block
                    dark
                    style={styles.button}
                    onPress={() => navigation.navigate('DirectionRegister')}
                >
                    <Text>Siguiente</Text>
                </Button>
            </ScrollView>
        </Container>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow'
    },
    button: {
        marginBottom:100,
        bottom: -50,
        width: 350,
        alignSelf: 'center',
        marginTop: 15,
        justifyContent: 'center'
    },
    titulos: {
        marginTop: 50,
        alignSelf: 'center',
        fontWeight: "bold"
    }
});


export default CreateUser;