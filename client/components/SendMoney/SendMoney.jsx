import React, { useState, useEffect } from "react";
import {allContacts , deleteContact,addContact} from '../../redux/actions/contacts'
import {tranfer} from '../../redux/actions/transactions'
import { refresh } from '../../redux/actions/userActions.js';
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Text,
  Item,
  Button,
  Body,
  Picker,
  Icon,
  Header,
  Title,
  Label,
  ListItem,
  Content,
  Card
} from "native-base";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./SendMoneyStyle";
import { Alert, View, CheckBox } from "react-native";

export default SendMoney = ({ navigation }) => {
  const dispatch = useDispatch()
  const contactos = useSelector((state) => state.contactos);
  const user = useSelector((state) => state.userReducer);

  useEffect( () => {
    dispatch(allContacts(user.id))
  },[])

  const [selectContact, setSelectContact] = useState("");
  const [inputMoney, setInputMoney] = useState("");
  const [error, setError] = useState(false);
  const [fromContacts, setFromContacts] = useState(false);
  const [message, setMessage] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  // const [data, setData] = useState({
  //   selectContact: '',
  //   money: '',
  //   error: false,
  //   fromContacts: false,
  //   message: '',
  //   checkBox: false,
  // })

  const handleSubmit = async () => {
   await dispatch(tranfer({
      id:user.id,
      toEmail:selectContact.email,
      amount:parseInt(inputMoney),
      description:message
    }))
   await dispatch(refresh(user.id))
    alert("Se han transferido $" + inputMoney + " a " + selectContact.nickname)
  }

console.log(selectContact)

  return (
    <KeyboardAwareScrollView style={{ height: '100%', flex: 1, backgroundColor: '#4A1491' }}>

<View style={styles.infoContainer}>
        <View style={styles.main1}>

          <Header style={styles.header}>
            <Body
              style={{ flex: 1, flexDirection: "row", alignSelf: "flex-start" }}>
              <Button transparent onPress={() => {
                setError(false);
                setInputMoney("");
                setSelectContact("");
                setPassCode("");
                setFromContacts(false);
                setCheckBox(false);
                navigation.navigate("Inicio");
              }}>
                <Icon style={{ color: "white" }} />
              </Button>
            </Body>

            <View style={styles.picker}>
              <Picker
                mode="dropdown"
                enabled={!fromContacts}
                selectedValue={selectContact}
                onValueChange={setSelectContact}
                itemStyle={styles.pickerItem}>

                  {contactos.listaContactos.map((item, index) => {
                return (< Picker.Item label={item.nickname} value={item} key={index} />)})} 
              </Picker>
            </View>
            <Label style={{ textAlign: "center", paddingVertical: 5 }}>
              <Text style={{ color: '#FDD201' }}>Selecciona un contacto</Text>
            </Label>
          </Header>
        </View>
              
        <View style={styles.main2}>
          {error && (
            <Text style={styles.error}>
              Por favor selecciona un contacto e ingrese cantidad
            </Text>
          )}
          <Item style={{ width: "100%" }}>
            <Input
              placeholder="Ingrese un monto (Mínimo $10)"
              keyboardType="numeric"
              name="money"
              value={inputMoney}
              onChangeText={(value) => setInputMoney(value)}
              style={styles.input}
            />
          </Item>
          <Item style={{ height: 150 }}>
            <Input
              placeholder="Mensaje"
              multiline={true}
              style={{ height: 150, color: '#171717' }}
              value={message}
              onChangeText={(value) => setMessage(value)}
            />
          </Item>

          <ListItem>
          <CheckBox
            color={'#EFEFEF'}
            value={checkBox}
            onValueChange={setCheckBox}

          />
          <Body>
            <Text style={{ color: '#4A1491' }}> Acepto usar la seleccion amigo solo con fines personales, no comerciales</Text>
          </Body>
          </ListItem>

          <Button style={styles.buttom} dark block onPress={handleSubmit}>
            <Text style={{ color: '#EFEFEF' }}>Enviar</Text>
          </Button>

        </View>
      
      </View>

    </KeyboardAwareScrollView>
  );
};