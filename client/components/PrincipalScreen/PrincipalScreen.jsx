import React, { useEffect } from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
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

    useEffect(() => {
        getResources();
    }, [])

    return (
        <Container>
            <View style={s.container}>
                <View style={s.fakeTopHeader}>
                    <Text style={s.UDS}>UDS  </Text>
                    <Text style={s.ARS}>  ARS</Text>
                </View>
                <Text style={s.headerTitle}>Balance total de la cuenta</Text>
                <Text style={s.balance}>{user.balanceArs} ARS</Text>
            </View>
            <ScrollView>
                {
                    transactionHistory.map((transaction, i) => (

                        <TransactionItem
                            name={transaction.name}
                            amount={transaction.amount}
                            date={transaction.createdAt}
                            type={transaction.transactionType}
                            referenceCode={transaction.refernece}
                            key={i}
                        />
                    ))
                }
            </ScrollView>
        </Container>

    );
};


export default PrincipalScreen;