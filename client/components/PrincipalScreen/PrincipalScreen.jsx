import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from '../../redux/actions/userActions';
import { getTransactions } from '../../redux/actions/transactions';
import DateTimePicker from '@react-native-community/datetimepicker';
import s from './style.js';
import TransactionItem from '../TransactionItem/TransactionItem';
import { useState } from 'react';

const PrincipalScreen = ({ navigation }) => {
    const user = useSelector((state) => state.userReducer);
    const transactionHistory = useSelector((state) => state.transactions.transactionHistory);
    const dispatch = useDispatch();
    const options = { day: 'numeric', month: 'long', year: 'numeric'};

    const [initialDate, setInitialDate] = useState(new Date());
    const [limitDate, setLimitDate] = useState(new Date());
    const [showInitial, setShowInitial] = useState(false);
    const [showLimit, setShowLimit] = useState(false);

    const getResources = async () => {
        await dispatch(refresh(user.id));
        await dispatch(getTransactions(user.id));
    };

    const onChangeOne = (event, selectedDate) => {
        let currentDate = selectedDate.toLocaleDateString('en-GB') || initialDate.toLocaleDateString('en-GB');
        setShowInitial(Platform.OS === 'ios');
        setInitialDate(currentDate);
    };

    const onChangeTwo = (event, selectedDate) => {
        let currentDate = selectedDate.toLocaleDateString('en-GB') || limitDate.toLocaleDateString('en-GB');
        setShowLimit(Platform.OS === 'ios');
        setLimitDate(currentDate);
    };

    const showModeOne = () => {
        setShowInitial(true);
    };

    const showModeTwo = () => {
        setShowLimit(true);
    };

    useEffect(() => {
        getResources();
    }, []);

    return (
        <Container>
            <View style={s.container}>
                <View style={s.fakeTopHeader}>
                    <Text style={s.UDS}>UDS  </Text>
                    <Text style={s.ARS}>  ARS</Text>
                </View>
                <Text style={s.headerTitle}>Balance total de la cuenta</Text>
                <Text style={s.balance}>{user.balanceArs.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ARS</Text>
            </View>

            <View style={s.dateContainer}>
                <TouchableOpacity  style={s.optionDate} onPress={() => showModeOne()}>
                    {
                        typeof initialDate !== "object" ?
                        <Text style={s.textDate}>{initialDate}</Text>
                        :
                        <Text style={s.textDate}>Fecha inicial</Text>

                    }
                </TouchableOpacity>
                <TouchableOpacity style={s.optionDate} onPress={() => showModeTwo()}>
                    {
                        typeof limitDate !== "object" ?
                        <Text style={s.textDate}>{limitDate}</Text>
                        :
                        <Text style={s.textDate}>Fecha Límite</Text>

                    }
                </TouchableOpacity>
            </View>

            {/* INITIAL DATE */}
            <View>
                {
                    showInitial && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={initialDate}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={onChangeOne}
                        />
                    )
                }
            </View>
            {/* LIMIT DATE */}
            <View>
                {
                    showLimit && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={limitDate}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={onChangeTwo}
                        />
                    )
                }
            </View>

            <ScrollView>
                {
                    transactionHistory.map((transaction, i) => (

                        <TransactionItem
                            name={transaction.name}
                            amount={transaction.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
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