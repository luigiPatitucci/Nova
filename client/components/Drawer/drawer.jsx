import React from 'react';
import { createDrawerNavigator, CardStyleInterpolators } from '@react-navigation/drawer';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import PrincipalScreen from '../PrincipalScreen/principal_screen.jsx';
import s from './style.js';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';

import Transacciones from '../Transacciones/Transacciones.jsx'
import DetalleTransaccion from '../Transacciones/DetalleTransaccion.jsx'
import Estadisticas from '../Estadisticas/Estadisticas.jsx'

const Drawer = createDrawerNavigator();

const OptionDrawer = (props) => {
    return (
        <TouchableOpacity onPress={props.navigation}>
            <View style={s.menuContainer}>
                <Icon size={20} name={props.iconName}></Icon>
                <Text style={s.tituloTxt}>{props.optionName}</Text>
            </View>
        </TouchableOpacity>
    );
};

const MenuDrawer = (props) => {

    const user = useSelector((state) => state.userReducer);
    console.log('SOY EL USUARIO', user)

    return (
        <View style={s.container}>
            <View style={s.bgContainer}>
                <TouchableOpacity >
                    <View style={s.userContainer}>
                        <Image source={require('../../assets/logoUser.png')}
                            style={s.userImagen}
                        />
                    </View>
                    <View>
                        <Text style={s.userTitulo}>{user.name}</Text>
                        <Text style={s.userSubTitulo}>{user.email}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <OptionDrawer iconName='home' optionName='Inicio' navigation={() => props.navigation.navigate('Inicio')}/>
            <OptionDrawer iconName='hand-holding-usd' optionName='Transacciones' navigation={() => props.navigation.navigate('Transacciones')}/>
            <OptionDrawer iconName='store-alt' optionName='Mis productos'/>
            <OptionDrawer iconName='user-alt' optionName='Mis datos'/>
        </View>
    );
};

const MyDrawer = () => {

    const options = {
        headerStyle: {
            backgroundColor: '#4A1491',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 0,
            elevation: 0
        },
        /* gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, */
        headerTintColor: 'white' 
    }

    return (
        <Drawer.Navigator  screenOptions={options} drawerContent={(props) => <MenuDrawer {...props} />}>
            <Drawer.Screen name="Inicio" component={PrincipalScreen} />
            <Drawer.Screen name="Transacciones" component={Transacciones} />
            <Drawer.Screen name="Estadisticas" component={Estadisticas} />
            <Drawer.Screen name="DetalleTransaccion" component={DetalleTransaccion} />
        </Drawer.Navigator>
    );
};

export default MyDrawer;