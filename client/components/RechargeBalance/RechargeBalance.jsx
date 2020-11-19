import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Container } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { recharge } from '../../redux/actions/transactions.js';
import { refresh } from '../../redux/actions/userActions.js';
import s from './styles.js';


const RechargeBalance = ({ navigation }) => {

    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        let obj = { id: user.idAccount }
        await dispatch(recharge(obj))
        await dispatch(refresh(user.id))

    }

    return (
        <Container style={s.container}>
            <View style={s.infoContainer}>
                <View style={s.infoBox}>
                    <Text style={s.info}>Usa este codigo siempre que quieras ingresar dinero a tu cuenta.</Text>
                </View>
                <View style={s.userCodeBox}>
                    <Text style={s.userCode}>{user.code}</Text>
                </View>
                <View style={s.infoBox}>
                    <Text style={s.info}>Mostrale este codigo al cajero en Rapipago o en PagoFacil.</Text>
                </View>
                <Button style={s.button}onPress={() => handleSubmit()}>
                    <Text style={s.buttonText}>Confirmar Recarga</Text>
                </Button>
                <Button style={s.button} onPress={() => navigation.navigate('Home')}> 
                    <Text style={s.buttonText}>Volver al inicio</Text>
                </Button>
            </View>
        </Container>
    );
};

export default RechargeBalance;