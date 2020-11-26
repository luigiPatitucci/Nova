import React from 'react';
import { View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const UserProfile = ({ navigation }) => {
  const handleLogOut = async() => {
    await AsyncStorage.clear();
    navigation.navigate('Ingresar');
  }
    return (
        <View>
          <Text>INSERTE UN TEXT USER</Text>  
          <Button style={{width:10}} onPress={() => handleLogOut()} title="Press Me"><Text>Salir</Text></Button>
        </View>
    )
}

export default UserProfile;