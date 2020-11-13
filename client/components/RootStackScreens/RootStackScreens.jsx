import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from './StartScreen/StartScreen.jsx'
import Login from './Login/Login.jsx'
import CreateUser from '.././Start/Create-user/Create-user.jsx';
import FirstRegister from '.././Start/Create-user/First-register';
import Validation from '.././Start/Create-user/ValidationToken';


const RootStack = createStackNavigator();

const RootStackScreens = ({ navigation }) => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen name='Inicio' component={StartScreen} />
            <RootStack.Screen name='Ingresar' component={Login} />
            <RootStack.Screen name='Registrarse' component ={FirstRegister}/>
            <RootStack.Screen name='Verificacion' component={Validation} /> 
            <RootStack.Screen name='Crear Usuario' component={CreateUser} />   
        </RootStack.Navigator>
    );
};

export default RootStackScreens;
