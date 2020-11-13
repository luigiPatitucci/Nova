import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import PrincipalScreen from '../PrincipalScreen/principal_screen.jsx';
import s from './style.js';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();

const OptionDrawer = (props) => {
    return (
        <TouchableOpacity onPress={props.navigation}>
            <View style={s.menuContainer}>
                <Icon size={18} name={props.iconName}></Icon>
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
            <OptionDrawer iconName='home' optionName='Home' navigation={() => props.navigation.navigate('Home')}/>
            <OptionDrawer iconName='hand-holding-usd' optionName='Transacciones' />
            <OptionDrawer iconName='store-alt' optionName='Mis productos' />
            <OptionDrawer iconName='user-alt' optionName='Mis datos' />
        </View>
    );
};

const MyDrawer = () => {

    return (
        <Drawer.Navigator drawerContent={(props) => <MenuDrawer {...props} />}>
            <Drawer.Screen name="Home" component={PrincipalScreen} />
        </Drawer.Navigator>
    );
};

export default MyDrawer;