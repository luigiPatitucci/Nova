import React, { useEffect } from 'react';
import { Image, View, Text } from 'react-native';
import { Button, Container, Tab, Tabs, TabHeading } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from '../../redux/actions/userActions';
import { getTransactions } from '../../redux/actions/transactions';

import s from './style.js';

import TransactionItem from '../TransactionItem/TransactionItem';

const PrincipalScreen = ({ navigation }) => {
    const user = useSelector((state) => state.userReducer);
    const transactionHistory = useSelector((state) => state.transactions.transactionHistory);
    const dispatch = useDispatch();

    const getResources = async () => {
        await dispatch(refresh(user.id));
        await dispatch(getTransactions(user.id));
    };

    useEffect( () => {
        getResources();
    }, [])

    return (
        <Container style={s.container}>
            <View style={{backgroundColor: '#242835', width: '90%', borderRadius: 10, alignSelf: 'center', marginTop: '5%', paddingTop: '5%', marginBottom: '3%'}}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style={{fontSize: 25, fontFamily: 'RedHatText_Regular', color: 'grey'}}>UDS  </Text>
                    <Text style={{fontSize: 25, fontFamily: 'RedHatText_Regular', color: '#4b81e7'}}>  ARS</Text>
                </View>
                <Text style={{color: 'white', fontSize: 20, alignSelf: 'center', fontFamily: 'RedHatText_Regular'}}>Balance total de la cuenta</Text>
                <Text style={{fontSize: 47, color: 'white', textAlign: 'center', fontFamily: 'RedHatText_Regular', marginBottom: '3%'}}>{user.balanceArs} ARS</Text>
            </View>
            {
                transactionHistory.map((transaction, i) => (
                    
                    <TransactionItem 
                        name={transaction.name}
                        amount={transaction.amount}
                        date={transaction.createdAt}
                        type={transaction.transactionType}
                        key={i}
                    />
                ))
            }
        </Container>

    );
};


export default PrincipalScreen;