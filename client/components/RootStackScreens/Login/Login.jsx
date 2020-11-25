import React, { useState, useEffect } from 'react';
import { Alert, KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native';
import { Container, Form, Item, Input, Label, Text, Button } from 'native-base';
import { Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/userActions.js'
import * as LocalAuthentication from 'expo-local-authentication';
import LottieView from 'lottie-react-native';
import s from './styles.js';
import axios from 'axios';
const API_URL = "192.168.1.12:3000";

const Login = ({ navigation }) => {


    const dispatch = useDispatch();

    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [suportted, setSuportted] = useState(null);
    const [nombre, setNombre] = useState('Usuario');
    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        LocalAuthentication.supportedAuthenticationTypesAsync()
            .then(success => {
                setSuportted(true);
            })
            .catch((error) => {
                console.log("Error touch: " + error)
                alert("Tu dispositivo no es compatible")
            })
    }, []);

    function handleLogin() {
        const config = {
            promptMessage: "Autenticacion Touch ID",
            color: "#FF0000",
            fallbackLabel: 'Touch ID invalido'
        };
        LocalAuthentication.authenticateAsync(config)
            .then(success => {
                setNombre("Penelope")
            })
            .catch(error => {
                console.log('La auntenticacion fallo: ' + error)
            })
    }

    const handleSubmit = async () => {
        await dispatch(login(input));
        await axios.post(`http://${API_URL}/auth/login`, input)
            .then(() => {
                Keyboard.dismiss();
                navigation.navigate('Home');
            })
            .catch(() => {
                return Alert.alert('Por favor, verifique que los datos ingresados son correctos.');
            })
    };

    const recoverPassword = () => {
        console.log(user.id)
        //Recuperar contraseña del email//
    }

    return (
        <Container style={s.container}>
            <KeyboardAvoidingView 
                behavior='position'>
                <View style={s.imageContainer}>
                    <Image source={require('../../../assets/nova.png')} style={s.image} />
                </View>
                <View style={s.optionsContainer}>
                    <Form style={s.form}>
                        <Item floatingLabel>
                            <Label style={s.labelForm}>Email</Label>
                            <Input style={s.inputForm} onChangeText={email => setInput({ ...input, email })} />
                        </Item>
                        <Item floatingLabel>
                            <Label style={s.labelForm}>Contraseña</Label>
                            <Input style={s.inputForm}
                                onChangeText={password => setInput({ ...input, password })}
                                secureTextEntry={true}
                            />
                        </Item>
                    </Form>
                    <Button
                        block
                        dark
                        style={s.button}
                        onPress={() => handleSubmit()}
                    >
                        <Text style={s.textButton}>Ingresar</Text>
                    </Button>
                    <Button
                        style={s.reset}
                        transparent
                        onPress={() => recoverPassword()}
                    >
                        <Text style={s.textReset}>¿Olvidaste tu contraseña?</Text>
                    </Button>

                    <TouchableOpacity style={s.buttonBiometric} onPress={() => handleLogin()}>
                        <LottieView style={s.fingerPrint} source={require('../../../assets/lf30_editor_ftmbz2nl.json')} autoPlay loop />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Container>
    );
};

export default Login;