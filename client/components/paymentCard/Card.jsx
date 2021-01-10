import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-input-credit-card";
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ...']);
// UIManager.setLayoutAnimationEnabledExperimental(true);

function Card() {
 const _onFocus = field => console.log('focusing', field)

  const _onChange = formData => console.log(JSON.stringify(formData, null , ' '))
  return (
    <View  style={styles.container}>
      <View>
      <CreditCardInput
/*        cardImageFront={require("../../assets/nova.png")}
       cardImageBack={require("../../../assets/nova.png")} */
          autoFocus
          requireName={true}
          requireCVC={true}
          requirePostalCode={true}
          validColor="black"
          invalidColor="red"
          placeholderColor="darkgray"
          labelStyle={{color: 'black', fontSize: 12}}
          inputStyle={{color: 'black', fontSize: 16}}
          onFocus={_onFocus}
          onChange={_onChange}
        />
        <Text>hola de lkdmfkmllnklnlnlelfkrf</Text>
      </View>
      <Text>hola de lkdmfkmllnklnlnlelfkrf</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 5,
      backgroundColor: 'white',
    },
  });
export default Card;
