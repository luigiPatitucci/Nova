import * as Font from 'expo-font';
import React, { useEffect, useMemo, useState } from 'react';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './components/Drawer/drawer.jsx';
import RootStackScreens from './components/RootStackScreens/RootStackScreens.jsx'
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from './components/Context';
import { Provider } from "react-redux";
import store from './redux/store/store.js';


const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  /* if(isLoading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large'/>
      </View>
    );
  };

  const authContext = useMemo(() => ({
    register: () =>{
      setUserToken('algo');
      setIsLoading(false);
    },
    login: () => {
      setUserToken('algo');
      setIsLoading(false);
    },
    logout: () => {
      setUserToken(null);
      setIsLoading(false);
    }
  }));

  useEffect(() => {
    setTimeout(() =>{
      setIsLoading(false);
    }, 1000)
  }, [])
 */
  return (
    <Provider store={ store }>
      < NavigationContainer>
        <RootStackScreens />
        {/* <MyDrawer/> */}
      </NavigationContainer >
    </Provider>
  );
};

export default App;
