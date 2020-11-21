import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import s from './style.js';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity, Image, Text } from 'react-native';

import PrincipalScreen from '../PrincipalScreen/PrincipalScreen';
import Transactions from '../Transactions/Transactions';
import Statistics from '../Statistics/Statistics';
import ContactList from '../Contacts/ContactList';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Inicio" component={PrincipalScreen} />
            <Tab.Screen name="Transacciones" component={Transactions} />
            <Tab.Screen name="Estadisticas" component={Statistics} />
            <Tab.Screen name="Contactos" component={ContactList} />
        </Tab.Navigator>
    );
};

export default TabNavigator;