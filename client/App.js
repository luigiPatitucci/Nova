import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogIn from './componentes/LogIn.js'
export default function App() {
  return (
    <View style={styles.container}>
     <LogIn />
      <Text>Henry Bank</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDD201',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
