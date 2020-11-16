import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Form, Item, Input, Label, Text, Button } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/userActions.js'

const Login = ({navigation}) => {

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = () => {
        console.log(input)
        /* dispatch(login(input)); */
        navigation.navigate('Home')
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
                    <Input onChangeText={password => setInput({ ...input, password })} />
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