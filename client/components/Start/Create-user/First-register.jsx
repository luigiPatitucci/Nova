import React, { useState } from 'react';
import axios from 'axios'
import { StyleSheet } from 'react-native';
import { Container, Form, Item, Input, Label, Text, Button, Picker } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../redux/actions/userActions.js'


const CreateUser = ({navigation}) => {

    const dispatch = useDispatch();
  
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const createUser =  () => {
        return axios.post("http://192.168.0.9:3000/user/", data)
        .then(resp=>{
            console.log('SOY LA RESPUESTA', resp.data)
        })
        .then(() => navigation.navigate('Verificacion'))
        .catch(err=>{
            console.log('Soy el error', err)
        })
    };

    const handleSubmit = () => {
        createUser();
    };

    return (
        <Container style={styles.container}>
            <ScrollView>
                <Form>
                   
                    <Item floatingLabel >
                        <Label>Nombre de Usuario *</Label>
                        <Input style={{color: 'white'}} onChangeText={username => setData({ ...data, username })}></Input>
                    </Item>

                    <Item floatingLabel>
                        <Label>Email *</Label>
                        <Input style={{color: 'white'}}  onChangeText={email => setData({ ...data, email })}></Input>
                    </Item>

                    <Item floatingLabel>
                        <Label>Contraseña *</Label>
                        <Input style={{color: 'white'}}  secureTextEntry={true} onChangeText={password => setData({ ...data, password })}></Input>
                    </Item>
                </Form>
                <Button
                    block
                    dark
                    style={styles.button}
                    onPress={() => handleSubmit()}
                >
                    <Text>Siguiente</Text>
                </Button>
            </ScrollView>
        </Container>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#171717',
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