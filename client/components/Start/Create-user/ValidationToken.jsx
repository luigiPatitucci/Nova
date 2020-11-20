import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Form, Item, Input, Label, Text, Button, Picker } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../redux/actions/userActions.js'

const CreateUser = ({navigation}) => {

    const dispatch = useDispatch();

    const [data, setData] = useState({
        pin: '',
    });

    const handleSubmit = () => {
        dispatch(createUser(data));
        navigation.navigate('Crear Usuario')
    };

    return (
        <Container style={styles.container}>
            <ScrollView>
                <Form>
                    <Item floatingLabel>
                        <Label>Validacion de Usuario</Label>
                        <Input style={{color: 'white'}} onChangeText={pin => setData({ ...data, pin })}></Input>
                    </Item>
                </Form>
                <Button
                    block
                    dark
                    style={styles.button}
                    onPress={() => handleSubmit()}
                >
                    <Text>Enviar</Text>
                </Button>
            </ScrollView>
        </Container>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#171717',
    },
    button: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 50,
        justifyContent: 'center',
        backgroundColor: '#4A1491',
        borderRadius: 10,
    },
    titulos: {
        marginTop: 50,
        alignSelf: 'center',
        fontWeight: "bold"
    }
});


export default CreateUser;