import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from 'native-base';

const StartScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>HB</Text>
            <Button 
                block 
                dark 
                style={styles.button}
                onPress={() => navigation.navigate('Ingresar')}
                >
                <Text>Ingresar</Text>
            </Button>
            <Button block dark style={styles.button}>
                <Text>Registrarme</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: 360,
        height: 512,
        backgroundColor: 'yellow'
    },
    button: {
        margin: 10,
    },
    icon: {
        fontSize: 100,
        textAlign: 'center',

    }
});

export default StartScreen;