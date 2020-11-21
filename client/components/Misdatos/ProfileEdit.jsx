import  React , {useState} from 'react';
import { Modal, Portal,  Button, Provider } from 'react-native-paper';
import {  Form, Item, Input, Label, View} from 'native-base';
import { useSelector, useDispatch} from 'react-redux';
import {update, refresh} from './../../redux/actions/userActions'
import {StyleSheet } from "react-native";
function ModalEdit (props) {

 const [edit, setEdit]= useState({username:'', name:'', email:'',birthday:'', phone_number:'', })
const containerStyle = {backgroundColor: 'white', padding: 20};
const dispatch = useDispatch();



async function  Handleup(){

await dispatch(update(edit, user.id))
await dispatch(refresh(user.id))
props.hideModal();
}


  const user = useSelector((state) => state.userReducer);
  console.log('SOY EL USUARIO', user)


  return (
    <Provider>
      <Portal>
        <Modal visible={props.visible}  contentContainerStyle={containerStyle}>
     
          <Form>
         
                    <Item floatingLabel>
                        <Label>Nombre de usuario:</Label>
                        <Input onChangeText={username => setEdit({ ...edit, username })}></Input>
                    </Item>
                    <Item floatingLabel>
                        <Label>Nombre: </Label>
                        <Input onChangeText={name => setEdit({ ...edit, name })}></Input>
                    </Item>
                    <Item floatingLabel>
                        <Label> Email: </Label>
                        <Input onChangeText={email => setEdit({ ...edit, email })}></Input>
                    </Item>
                    <Item floatingLabel>
                        <Label>Cumpleaños:</Label>
                        <Input onChangeText={ birthday => setEdit({ ...edit, birthday })}></Input>
                    </Item>
                    <Item floatingLabel>
                        <Label>Telefono/celular:</Label>
                        <Input onChangeText={phone_number => setEdit({ ...edit, phone_number})}></Input>
                    </Item>
                
                  
                   
                </Form>
                <View style={styles.buttons}>

                <Button onPress={Handleup} style={styles.buttondatos} >Editar Datos</Button>
                <Button onPress={props.hideModal} >Cancelar</Button>
                </View>
       

         
        </Modal>
      </Portal>
   
    </Provider>
  );
};
const styles = StyleSheet.create({
buttons:{
    flexDirection: 'row',
  
},
buttondatos:{
   marginLeft:50,
}


 })

export default ModalEdit;
