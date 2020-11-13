import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Form, Item, Input, Label, Text, Button } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../redux/actions/userActions.js'
import axios from 'axios';

const Login = () => {

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        email: '',
        username: ''
    });

    const handleSubmit = () => {
        console.log(input)
        /* dispatch(createUser(input)) */
        axios.post("http://192.168.1.12:3000/user/", input)
        .then(resp=>{
            console.log('SOY LA RESPUESTA', resp.data)
            /* dispatch({
                type:ADD_USER,
                user:resp.data
            }) */
        })
        .catch(err=>{
            console.log('Soy el error', err)
        })
        
    };

    const recoverPassword = () => {
        console.log('recover');
        //Recuperar contraseña del email//
    }
 
    return (
        <Container style={styles.container}>
            <Form>
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input onChangeText={email => setInput({ ...input, email })} />
                </Item>
                <Item floatingLabel last>
                    <Label>Contraseña</Label>
                    <Input onChangeText={username => setInput({ ...input, username })} />
                </Item>
            </Form>
            <Button 
                block
                dark
                style={styles.button}
                onPress={() => handleSubmit()}
            >
                <Text>Ingresar</Text>
            </Button>
            <Button 
                transparent
                style={styles.button}
                onPress={() => recoverPassword()}
            >
              <Text>¿Olvidaste tu contraseña?</Text>
            </Button>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 360,
        height: 512,
        backgroundColor: 'yellow'
    },
    button: {
        width: 350,
        alignSelf: 'center',
        marginTop: 15,
        justifyContent: 'center'
    }
});

export default Login;