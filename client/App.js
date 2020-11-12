import * as Font from 'expo-font';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstStart from './components/Start/first_start/first_start.jsx';
import Login from './components/Start/login/login.jsx';
import Estadisticas from './components/Estadisticas/Estadisticas.jsx';
import Transacciones from './components/Transacciones/Transacciones.jsx';
const Stack = createStackNavigator();

const App = () => {

  useEffect(() => {
    (async () => await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    }))();
     }, [])

  return (
 
    <NavigationContainer styles={styles.container}>
      <Container>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={ FirstStart } />
          <Stack.Screen name="Ingresar" component={ Login } />
          <Stack.Screen name="Client" component={Transacciones} />
        </Stack.Navigator>
      </Container>
    </NavigationContainer >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",

  },
});

export default App;
