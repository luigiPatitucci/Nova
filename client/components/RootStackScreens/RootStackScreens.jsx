import React from 'react';

import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';

import StartScreen from './StartScreen/StartScreen.jsx'
import Login from './Login/Login.jsx'
import CreateUser from '.././Start/Create-user/Create-user.jsx';
import FirstRegister from '.././Start/Create-user/First-register';
import Validation from '.././Start/Create-user/ValidationToken';
import MyDrawer from '../Drawer/drawer.jsx'
import { Easing } from 'react-native';


const RootStack = createStackNavigator();

const RootStackScreens = ({ navigation }) => {

    const options = {
        headerStyle: {
            backgroundColor: '#171717',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 0,
            elevation: 0
        },
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTintColor: 'white' 
    }

    return (
        <RootStack.Navigator screenOptions={options} headerMode='float'>
            <RootStack.Screen name='Inicio' component={StartScreen} options={{headerShown: false}}/>
            <RootStack.Screen name='Ingresar' component={Login} />
            <RootStack.Screen name='Registrarse' component ={FirstRegister}/>
            <RootStack.Screen name='Verificacion' component={Validation} /> 
            <RootStack.Screen name='Crear Usuario' component={CreateUser} />
            <RootStack.Screen name='Home' component={MyDrawer} options={{headerShown: false}}/>   
        </RootStack.Navigator>
    );
};

export default RootStackScreens;
