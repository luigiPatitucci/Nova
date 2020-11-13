import * as Font from 'expo-font';
import React, { useEffect, useMemo, useState } from 'react';
import MyDrawer from './components/Drawer/drawer.jsx';
import RootStackScreens from './components/RootStackScreens/RootStackScreens.jsx'
import { Provider } from "react-redux";
import store from './redux/store/store.js';

import { NavigationContainer } from '@react-navigation/native';

const App = () => {
console.log(store)
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

