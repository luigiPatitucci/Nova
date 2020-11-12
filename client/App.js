import * as Font from 'expo-font';
import React from 'react';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyDrawer from './components/Drawer/drawer.jsx';
import FirstStart from './components/Start/first_start/first_start.jsx'
import Login from './components/Start/login/login.jsx'
import PrincipalScreen from './components/PrincipalScreen/principal_screen.jsx'

const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      < NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={ FirstStart } />
          <Stack.Screen name="Ingresar" component={ Login } />
          <Stack.Screen name="Home" component={ PrincipalScreen }/>
        </Stack.Navigator>
      </NavigationContainer >
    );
  }
}


export default App;
