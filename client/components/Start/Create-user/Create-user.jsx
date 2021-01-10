
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Form, Item, Input, Label, Text, Button, Picker } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { useFormik } from "formik";
import axios from 'react-native-axios'
import s from './Styles.js';

const CreateUser = ({navigation}) => {

    const [data, setData] = useState({
        tipoDoc: '',
        nroDNI: '',
        nombre: '',
        apellido: '',
        fechaNac: '',
        cel: '',
        fijo: '',
        calle: '',
        nro: '',
        localidad: '',
        departamento: '',
        provincia: ''

    });
    const [pickerProvincias, setPickerProvincias] = useState([]);
    const [pickerDepartamentos, setPickerDepartamentos] = useState([]);
    const [pickerLocalidades, setPickerLocalidades] = useState([]);

    const cargarProvincias = () => {
        axios.get(`https://apis.datos.gob.ar/georef/api/provincias?orden=nombre&aplanar=true&campos=basico&max=5000&exacto=true&formato=json`)
        .then( response => {
                setPickerProvincias(response.data.provincias);
            }
        ).catch( err => console.log(err))
    }

    const cargarDepartamentos = (provincia) => {
        axios.get(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${provincia}&orden=nombre&aplanar=true&campos=basico&max=5000&exacto=true&formato=json`)
        .then( response => {
                setPickerDepartamentos(response.data.departamentos);
            }
        ).catch( err => console.log(err))
    }

    const cargarLocalidades = (provincia, departamento) => {
        axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&departamento=${departamento}&aplanar=true&campos=basico&max=5000&exacto=true&formato=json
        `)
        .then( response => {
                setPickerLocalidades(response.data.localidades);
            }
        ).catch( err => console.log(err))
    }
    
    const handleProvincias = (provincia) => {
        setData({ ...data, provincia });
        cargarDepartamentos(provincia);
    }

    const handleDepartamentos = (departamento) => {
        setData({ ...data, departamento });
        cargarLocalidades(data.provincia, departamento);
    }

    useEffect(() => {
        cargarProvincias();
    },[])

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

            <ScrollView>
                <Form>
                    <Label style={styles.titulos}>Datos Personales</Label>
                    <Item >
                    <Label>Tipo de documento: *</Label>
                    <Picker onValueChange={value => setFieldValue('tipoDoc', value)} selectedValue={values.tipoDoc}
                        // onValueChange={(value) => {
                        //     if (value !== 0) setFieldValue('tipoDoc', value);
                        // }}
                        //  selectedValue={values.tipoDoc}
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
                    <Label style={styles.titulos}>Residencia</Label>
                    <Item>
                        <Label>Provincia: *</Label>
                        <Picker onValueChange={value => handleProvincias(value)} selectedValue={data.provincia}> 
                            {
                                pickerProvincias.map( provincia => (
                                    <Picker.Item label={provincia.nombre} value={provincia.nombre}/>
                                ))
                            }
                        </Picker>
                    </Item>
                    <Item>
                        <Label>Partido/Departamento: *</Label>
                        <Picker onValueChange={value => handleDepartamentos(value)} selectedValue={data.departamento}>
                            {
                                pickerDepartamentos.map( departamento => (
                                    <Picker.Item label={departamento.nombre} value={departamento.nombre}/>
                                ))
                            }
                        </Picker>
                    </Item>
                    <Item>
                        <Label>Localidad: *</Label>
                        <Picker onValueChange={localidad => setData({ ...data, localidad })} selectedValue={data.localidad}>
                            {
                                pickerLocalidades.map( localidad => (
                                    <Picker.Item label={localidad.nombre} value={localidad.nombre}/>
                                ))
                            }
                        </Picker>
                    </Item>
                    <Item floatingLabel>
                        <Label>Calle: *</Label>
                        <Input></Input>
                    </Item>
                    <Item floatingLabel>
                        <Label>Nro: *</Label>
                        <Input></Input>
                    </Item>
                </Form>
                <Button
                    block
                    dark
                    style={styles.button}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text>Registrarme</Text>
                </Button>
            </ScrollView>

            <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : null}
            style={styles.keyboard}
            >
                  <View style={s.imageContainerCU}>
                    <Image source={require('../../../assets/nova.png')} style={s.image} />
                </View>
                <View style={styles.inner}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView>
                            <Form>
                                <Label style={styles.titulos}>Datos Personales</Label>
                                <Item >
                                <Label style={s.labelForm}>Tipo de documento: *</Label>
                                <Picker style={s.inputForm} onValueChange={tipoDoc => setData({...data, tipoDoc})} selectedValue={data.tipoDoc}
                                    >
                                        <Picker.Item style={s.labelForm} label= 'Selecciona el tipo de documento' value= ''/>
                                        <Picker.Item style={s.labelForm} label='DNI' value= "DNI"/>
                                        <Picker.Item style={s.labelForm} label='Pasaporte' value= "Pasaporte"/>
                                    </Picker>
                                </Item>
                                <Item floatingLabel>
                                    <Label style={s.labelForm}>Nro de DNI: *</Label>
                                    <Input style={s.inputForm} onChangeText={nroDNI => setData({ ...data, nroDNI })} type="number"></Input>
                                </Item>
                                <Item floatingLabel>
                                    <Label style={s.labelForm}>Nombre: *</Label>
                                    <Input style={s.inputForm} onChangeText={nombre => setData({ ...data, nombre })}></Input>
                                </Item>
                                <Item floatingLabel>
                                    <Label style={s.labelForm}>Apellido: *</Label>
                                    <Input style={s.inputForm} onChangeText={apellido => setData({ ...data, apellido }) }></Input>
                                </Item>
                                <Item floatingLabel>
                                    <Label style={s.labelForm}>Fecha de nacimiento: *</Label>
                                    <Input style={s.inputForm} onChangeText={fechaNac => setData({ ...data, fechaNac })} type="date"></Input>
                                </Item>
                                <Item floatingLabel>
                                    <Label style={s.labelForm}>Telefono celular: *</Label>
                                    <Input style={s.inputForm} onChangeText={cel => setData({ ...data, cel })}  type="number"></Input>
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
        backgroundColor: '#242835',
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
        marginTop: 35,
        justifyContent: 'center',
        backgroundColor: '#4b81e7',
        borderRadius: 10,
    },
    titulos: {
        alignSelf: 'center',
        fontWeight: "bold",
        color: 'white',
        fontFamily: 'RedHatText_Regular',
    }
});


export default CreateUser;