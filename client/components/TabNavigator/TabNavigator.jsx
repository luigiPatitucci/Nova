import React from 'react';

import s from './style.js';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity, Image, Text } from 'react-native';

import PrincipalScreen from '../PrincipalScreen/PrincipalScreen';
import Transactions from '../Transactions/Transactions';
import Statistics from '../Statistics/Statistics';
import ContactList from '../Contacts/ContactList';
import Movement from '../Movement/Movement';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const color = 'red'

    return (
        <Tab.Navigator 
        screenOptions={({route}) => ({
            tabBarIcon:({color}) => {
                let iconName;
                if(route.name =='Inicio') {
                    iconName = 'home-variant-outline'
                }
                else if(route.name =='Transacciones') {
                    iconName = 'circle-slice-3'
                }
                else if(route.name =='Estadisticas') {
                    iconName = 'chart-areaspline'
                }
                else if(route.name =='Contactos') {
                    iconName = 'contacts'
                }
                else {
                    iconName = 'swap-horizontal'
                }
                return <Icon name={iconName} size={33} color={color}/>
            }
        })}
        tabBarOptions={{
            activeTintColor: '#4b81e7',
            inactiveTintColor: 'gray',
            showLabel: false,

        }}

        >
            <Tab.Screen name="Inicio" component={PrincipalScreen}/>
            <Tab.Screen name="Transacciones" component={Transactions} />
            <Tab.Screen name="Movimiento" component={Movement} />
            <Tab.Screen name="Estadisticas" component={Statistics} />
            <Tab.Screen name="Contactos" component={ContactList} />
        </Tab.Navigator>
    );
};

export default TabNavigator;