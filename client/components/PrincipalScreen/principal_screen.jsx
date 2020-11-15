import React from 'react';
import { Image, View, Text, ImageBackground } from 'react-native';
import { Button, Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import s from './style.js';


const PrincipalScreen = ({navigation}) => {
    return (

        <Container style={s.container}>
            <ImageBackground source={require('./purpura.jpg')}
                style={{ width: '100%', height: '100%' }}
            >
                <View style={s.headerAmount}>
                    <Image source={ require('../../assets/logoUser.png')}
                        style={s.userImage}
                    />
                    <View style={s.balanceContainer}>
                        <Text style={s.amount}>5000 ARS</Text>
                        <Text style={s.amountDescription}>Balance total de la cuenta</Text>
                    </View>
                </View>
                <View style={s.generalContainer}>
                    <Text style={s.titleGeneral}>Resumen Mensual</Text>
                    <View style={s.amountsContainer}>
                        <View style={s.columnAmount}>
                            <Icon size={49} name='hand-holding-usd'/>
                            <Text>Ingresos</Text>
                            <Text style={s.amountGeneral}>3000 ARS</Text>
                        </View>
                        <View style={s.columnAmount}>
                            <Icon size={49} name='file-invoice-dollar'/>
                            <Text>Gastos</Text>
                            <Text style={s.amountGeneral}>2000 ARS</Text>
                        </View>
                    </View>
                </View>
                <View style={s.buttonsContainer}>
                    <Button style={s.secondaryButton}>
                        <Icon size={30} name='vote-yea' />
                        <Text style={s.textOption}>Recargar dinero</Text>
                    </Button>
                    <Button style={s.secondaryButton}>
                        <Icon size={30} name='paper-plane' />
                        <Text style={s.textOption}>Enviar dinero</Text>
                    </Button>
                </View>
                <View style={s.buttonsContainer}>
                    <Button style={s.button} onPress={() => navigation.navigate('Transacciones')}>
                        <Icon size={30} name='history' />
                        <Text style={s.textOption}>Transacciones</Text>
                    </Button>
                    <Button style={s.button} onPress={() => navigation.navigate('Estadisticas')}>
                        <Icon size={30} name='chart-bar' />
                        <Text style={s.textOption}>Estadisticas</Text>
                    </Button>
                    <Button style={s.button} >
                        <Icon size={30} name='user-circle' />
                        <Text style={s.textOption}>Mis datos</Text>
                    </Button>
                    <Button style={s.button}>
                        <Icon size={30} name='tags' />
                        <Text style={s.textOption}>Mis productos</Text>
                    </Button>
                </View>
            </ImageBackground>
        </Container>

    );
};

export default PrincipalScreen;