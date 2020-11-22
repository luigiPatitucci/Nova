import React, { useEffect } from 'react';
import { Image, View, Text } from 'react-native';
import { Button, Container, Tab, Tabs, TabHeading } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from '../../redux/actions/userActions';

import s from './style.js';

import TransactionItem from '../TransactionItem/TransactionItem';

const PrincipalScreen = ({ navigation }) => {
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("USER ID !!", user.id)
        dispatch(refresh(user.id))
    }, [])

    const transactions = [
        {
            type: 'recharge',
            amount: 5000,
            date: '22/01/2020',
            name: 'Pago Facil'
        },
        {
            type: 'send',
            amount: 3000,
            date: '12/01/2020',
            name: 'Mac Giver'
        },
        {
            type: 'recharge',
            amount: 2000,
            date: '02/01/2020',
            name: 'Rapipago'
        },
        {
            type: 'transfer',
            amount: 2000,
            date: '21/08/2019',
            name: 'Big Boss'
        },

    ]
    return (
        <Container style={s.container}>
            <View style={{backgroundColor: '#242835', width: '90%', borderRadius: 10, alignSelf: 'center', marginTop: '10%', paddingTop: '8%', marginBottom: '3%'}}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style={{fontSize: 25, fontFamily: 'RedHatText_Regular', color: 'grey'}}>UDS  </Text>
                    <Text style={{fontSize: 25, fontFamily: 'RedHatText_Regular', color: '#4b81e7'}}>  ARS</Text>
                </View>
                <Text style={{color: 'white', fontSize: 20, alignSelf: 'center', fontFamily: 'RedHatText_Regular'}}>Balance total de la cuenta</Text>
                <Text style={{fontSize: 47, color: 'white', textAlign: 'center', fontFamily: 'RedHatText_Regular', marginBottom: '3%'}}>50.000 ARS</Text>
            </View>
            {
                transactions.map((transaction, i) => (
                    
                    <TransactionItem 
                        name={transaction.name}
                        amount={transaction.amount}
                        date={transaction.date}
                        type={transaction.type}
                        key={i}
                    />
                ))
            }
        </Container>

    );
};


export default PrincipalScreen;