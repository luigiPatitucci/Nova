import React, { useState } from 'react';
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import { Form, Item, Input, Label, View } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { update, refresh } from '../../redux/actions/userActions'
import { StyleSheet } from "react-native";

const ModalEdit = ({ showModal, visible }) => {

  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [updateInfo, setUpdateInfo] = useState({
    username: user.username,
    email: user.email,
    phone_number: user.phone_number,
    adress: user.adress,
  });

  async function Handleup() {
    await dispatch(update(updateInfo, user.id))
    await dispatch(refresh(user.id))
    showModal();
  };

  return (

    <Modal visible={visible}>
      <View style={{backgroundColor: 'white'}}>
        <Form>
          <Item floatingLabel>
            <Label>Nombre de usuario:</Label>
            <Input value={updateInfo.username} onChangeText={username => setUpdateInfo({ ...updateInfo, username })}></Input>
          </Item>
          <Item floatingLabel>
            <Label>Email: </Label>
            <Input value={updateInfo.email} onChangeText={email => setUpdateInfo({ ...updateInfo, email })}></Input>
          </Item>
          <Item floatingLabel>
            <Label>Teléfono:</Label>
            <Input value={updateInfo.phone_number} onChangeText={phone_number => setUpdateInfo({ ...updateInfo, phone_number })}></Input>
          </Item>
          <Item floatingLabel>
            <Label>Dirección:</Label>
            <Input value={updateInfo.adress} onChangeText={adress => setUpdateInfo({ ...updateInfo, adress })}></Input>
          </Item>
        </Form>
        <View style={styles.buttons}>
          <Button onPress={() => Handleup()} style={styles.buttondatos} >Editar Datos</Button>
          <Button onPress={() => showModal()} >Cancelar</Button>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',

  },
  buttondatos: {
    marginLeft: 50,
  }


})

export default ModalEdit;
