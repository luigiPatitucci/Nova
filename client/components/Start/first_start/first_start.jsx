import React from 'react';
import { StyleSheet, Image} from 'react-native';
import { Button, Text, View, Container } from 'native-base';


const FirstStart = ({navigation}) => {
    return (
        <Container style={styles.default}>
        <View style={styles.container}>
            {/* <Image source={require('../Uploads/')}/> */}
            <Button 
                block 
                dark 
                style={styles.button}
                onPress={() => navigation.navigate('Ingresar')}
                >
                <Text>Ingresar</Text>
            </Button>
            <Button 
             block
             dark 
             style={styles.button}
             onPress={() => navigation.navigate('Registrarse')}
            >
                <Text>Registrarme</Text>
            </Button>
        </View>
    </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: 360,
        height: 512,
        alignSelf: 'center'
    },
    button: {
        margin: 10,
    },
    icon: {
        fontSize: 100,
        textAlign: 'center',

    },
    default: {
        backgroundColor: 'yellow'
    }

});

export default FirstStart;