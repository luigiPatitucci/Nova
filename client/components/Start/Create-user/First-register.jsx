import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Form, Item, Input, Label, Text, Button, Picker } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

const CreateUser = ({navigation}) => {
  
    const [data, setData] = useState({
        userName: '',
        email: ''
    });

    return (
        <Container style={styles.container}>
            <ScrollView>
                <Form>
                   
                    <Item floatingLabel>
                        <Label>Nombre de Usuario *</Label>
                        <Input onChangeText={userName => setData({ ...data, userName })}></Input>
                    </Item>

                    <Item floatingLabel>
                        <Label>Email *</Label>
                        <Input onChangeText={email => setData({ ...data, email })}></Input>
                    </Item>
                </Form>
                <Button
                    block
                    dark
                    style={styles.button}
                    onPress={() => navigation.navigate('Verificacion')}
                >
                    <Text>Enviar</Text>
                </Button>
            </ScrollView>
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