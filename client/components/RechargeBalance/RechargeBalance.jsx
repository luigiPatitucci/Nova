import React from 'react';
import { View, Text } from 'react-native';
import { Button, Container } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import {recharge} from '../../redux/actions/transactions.js';
import {refresh} from '../../redux/actions/userActions.js';


const RechargeBalance = ({navigation}) => {

    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleSubmit = async () =>  {
        let obj={id:user.idAccount}
        await dispatch(recharge(obj))
        await  dispatch(refresh(user.id))
   
    }

    return(
        <Container>
            <View>
                <Text>{user.code}</Text>
            </View>
            <View>
                <Text>Suerte encontrando a alguien que te abone el codigo</Text>
            </View>
            <Button onPress={()=>handleSubmit()}>
                <Text>Confirmar Recarga</Text>
            </Button>
            <Button>
                <Text>Volver al inicio</Text>
            </Button>
        </Container>
    );
};

export default RechargeBalance;