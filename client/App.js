import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import StartScreen from './components/RootStackScreens/StartScreen/StartScreen'
import Login from './components/RootStackScreens/Login/Login'
import PrincipalScreen from './components/PrincipalScreen/principal_screen'
import FirstRegister from './components/Start/Create-user/First-register'
import ValidatorToken from './components/Start/Create-user/ValidationToken'
import RegisterUser from './components/Start/Create-user/Create-user'

const RootStack = createStackNavigator();

const App = () => {
    return (
      < NavigationContainer>
        <RootStack.Navigator>
            <RootStack.Screen name='Inicio' component={StartScreen}/>
            <RootStack.Screen name='Ingresar' component={Login}/>
            <RootStack.Screen name='Registrarse' component={FirstRegister}/>
            <RootStack.Screen name='Validacion Token' component={ValidatorToken}/>
            <RootStack.Screen name='Crear Usuario' component={RegisterUser}/>
            <RootStack.Screen name='Home' component={PrincipalScreen}/>
        </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default App;






// import * as Font from 'expo-font';
// import React, { useEffect, useMemo, useState } from 'react';
// import { AppLoading } from 'expo';
// import { Ionicons } from '@expo/vector-icons';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import FirstStart from './components/Start/first_start/first_start.jsx';
// import Login from './components/Start/login/login.jsx';
// import CreateUser from './components/Start/Create-user/Create-user'
// import FirstRegister from './components/Start/Create-user/First-register'
// import ValidateToken from './components/Start/Create-user/ValidationToken'
// import MyDrawer from './components/Drawer/Drawer.jsx';
// import RootStackScreens from './components/RootStackScreens/RootStackScreens.jsx'
// import { ActivityIndicator, View } from 'react-native';
// import { AuthContext } from './components/Context';


// const App = () => {

//   const [isLoading, setIsLoading] = useState (true);
//   const [userToken, setUserToken ] = useState(null);

//   /* if(isLoading){
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <ActivityIndicator size='large'/>
//       </View>
//     );
//   };

//   const authContext = useMemo(() => ({
//     register: () =>{
//       setUserToken('algo');
//       setIsLoading(false);
//     },
//     login: () => {
//       setUserToken('algo');
//       setIsLoading(false);
//     },
//     logout: () => {
//       setUserToken(null);
//       setIsLoading(false);
//     }
//   }));

//   useEffect(() => {
//     setTimeout(() =>{
//       setIsLoading(false);
//     }, 1000)
//   }, [])
//  */
//   return (

//     < NavigationContainer styles={styles.container}>
//       <Container>
//         <Stack.Navigator>
//           <Stack.Screen name="Inicio" component={ FirstStart } />
//           <Stack.Screen name="Validacion Token" component={ ValidateToken } />
//           <Stack.Screen name="Registrarse" component={ FirstRegister } />
//           <Stack.Screen name="Crear Usuario" component={ CreateUser } />
//           <Stack.Screen name="Ingresar" component={ Login } />
//         </Stack.Navigator>
     
//       </Container>

//     {/* < NavigationContainer>
//       {/* <RootStackScreens /> */}
//       <MyDrawer/> 

//     </NavigationContainer >
//   );
// };

// export default App;
