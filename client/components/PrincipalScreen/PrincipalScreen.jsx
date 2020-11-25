import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Container, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from '../../redux/actions/userActions';
import { getTransactions } from '../../redux/actions/transactions';

import s from './style.js';
import DatePicker from 'react-native-date-ranges';
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

    const customButton = (onConfirm) => (
        <Button
            onPress={onConfirm}
            style={{ container: { width: '80%', marginHorizontal: '3%' }, text: { fontSize: 20 } }}
            primary
            text={'送出'}
        />
    )

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

            <DatePicker
                style={{
                    width: '90%',
                    height: '8%',
                    backgroundColor: '#242835',
                    alignSelf: 'center',
                    borderRadius: 10
                }}
                customStyles={{
                    placeholderText: {  fontSize: 20,
                                        fontFamily: 'RedHatText_Regular',
                                        color: 'white',
                                        borderWidth: 0,
                                        borderColor: "red",
                                        backgroundColor: 'blue'
                                    
                                    },
                    headerStyle: {
                        backgroundColor: '#4b81e7'
                    },
                    headerMarkTitle: {
                        color: 'white',
                        fontFamily: 'RedHatText_Regular',
                        fontSize: 18,
                        fontWeight: 'normal',
                        textAlign: 'center'
                    },
                    headerDateTitle: {
                        fontFamily: 'RedHatText_Regular',
                        fontWeight: 'normal',
                    },
                    contentInput: {
                        fontFamily: 'RedHatText_Regular',
                        fontWeight: 'normal',
                        fontSize: 1,
                        color: 'red'
                    },
                    contentText: {
                        backgroundColor: 'transparent',
                        color: 'white',
                        borderRadius: 10,
                        fontFamily: 'RedHatText_Regular',
                        fontSize: 17,
                        /* height: '100%',
                        width: '100%', */
                        alignSelf: 'center'
                    },
                }}
                onConfirm={hola => console.log(hola)}
                centerAlign // optional text will align center or not
                allowFontScaling={false} // optional
                placeholder={'Filtrar por fecha'}
                mode={'range'}
                markText={'Seleccione el intervalo que desea filtrar'}
                buttonText={"JAJAJAJ"}
                selectedBgColor={'#4b81e7'}
                dateSplitter={'||'}
                ButtonStyle={{
                    backgroundColor: '#4b81e7',
                    alignSelf: 'center',
                    borderRadius: 10,
                    height: '120%',
                    width: '90%'

                }}
                ButtonTextStyle={{
                    textAlign: 'center',
                    color: 'white',
                    fontFamily: 'RedHatText_Regular',
                    fontSize: 20
                }}
            />
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