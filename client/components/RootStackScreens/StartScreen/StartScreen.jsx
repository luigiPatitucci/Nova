import React from 'react';
import { Image } from 'react-native';
import { Button, Text, View, Container } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import s from './styles.js'


const StartScreen = ({ navigation }) => {
    return (
        <Container style={s.contianer}>
            <View style={s.imageContainer}>
                <Image source={require('../../../assets/nova.png')} style={s.image} />
            </View>
            <View style={s.containerOptions}>
                <Button
                    block
                    dark
                    style={s.button}
                    onPress={() => navigation.navigate('Ingresar')}
                >
                    <Icon size={35} name='login' style={s.icon}/>
                    <Text style={s.textButton}>Ingresar</Text>
                </Button>
                <Button
                    block
                    dark
                    style={s.button}
                    onPress={() => navigation.navigate('Registrarse')}
                >
                    <Icon size={35} name='account-check' style={s.icon}/>
                    <Text style={s.textButton}>Registrarme</Text>
                </Button>
            </View>
        </Container>
    );
};

export default StartScreen;