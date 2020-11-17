import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Form, Item, Input, Label, Text, Button, Picker } from 'native-base';

const CreateUser = ({navigation}) => {

    const [data, setData] = useState({
        calle: '',
        nro: '',
        localidad: '',
        provincia: ''
    });

    return (
        <Container style={styles.container}>
                    <Label style={styles.titulos}>Residencia</Label>
                    <Form>
                    <Item floatingLabel>
                        <Label>Calle: *</Label>
                        <Input></Input>
                    </Item>
                    <Item floatingLabel>
                        <Label>Nro: *</Label>
                        <Input></Input>
                    </Item>
                    <Item floatingLabel>
                        <Label>Localidad: *</Label>
                        <Input></Input>
                    </Item>
                    <Item floatingLabel>
                        <Label>Provincia: *</Label>
                        <Input></Input>
                    </Item>
                </Form>
                <Button
                    block
                    dark
                    style={styles.button}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text>Registrarme</Text>
                </Button>
        </Container>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow'
    },
    button: {
        marginBottom:100,
        bottom: -50,
        width: 350,
        alignSelf: 'center',
        marginTop: 15,
        justifyContent: 'center'
    },
    titulos: {
        marginTop: 50,
        alignSelf: 'center',
        fontWeight: "bold"
    }
});


export default CreateUser;