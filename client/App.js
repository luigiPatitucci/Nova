import * as Font from 'expo-font';
import React, { useEffect, useMemo, useState } from 'react';
import MyDrawer from './components/Drawer/drawer.jsx';
import RootStackScreens from './components/RootStackScreens/RootStackScreens.jsx'
import Loader from './components/Loader/Loader.jsx';
import { Provider } from "react-redux";
import { View, Text } from 'react-native'
import store from './redux/store/store.js';
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import Touch from './components/TouchId/TouchIdAuth.js'

const App = () => {

  const [ready, setReady] = useState(false);

  useEffect(() => {
    native_base();
    setTimeout(() => {
      setReady(true);
    }, 1000);
  });


  const app = !ready ?
    (
      <Loader/>
    )
    :
    (
      <Provider store={store}>
        < NavigationContainer>
          <RootStackScreens />
          <Touch />
          {/* <MyDrawer/> */}
        </NavigationContainer >
      </Provider>
    );
  return app;
};

async function native_base() {
  await Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    ...Ionicons.font,
  });
};


export default App;

