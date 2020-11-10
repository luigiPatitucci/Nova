import React, { Component } from 'react';
import { TextInput, Text, View, Button } from 'react-native';

const LogIn = () => {
  const [value, onChangeText] = React.useState('Useless Placeholder');

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 90 }}>HB</Text>
      <Text style={{ textAlign: 'center' }}>Usuario</Text>
      <TextInput
        style={{
          height: 30,
          width: 200,
          borderColor: '#841584',
          borderWidth: 3,
          borderBottomLeftRadius: 0,
          borderRadius: 8
        }} />
      <Text style={{ textAlign: 'center' }}>Contraseña</Text>
      <TextInput style={{
        height: 30,
        width: 200,
        marginBottom: 10,
        borderColor: '#841584',
        borderWidth: 3,
        borderBottomLeftRadius: 0,
        borderRadius: 8
      }} />
      <Button
        title="Iniciar"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>

  );
}

export default LogIn;