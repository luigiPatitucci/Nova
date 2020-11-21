import React, {useState} from 'react';
import {  Button, View, Container,  Card, CardItem, Text, Body } from 'native-base';
import {StyleSheet, Image } from "react-native";
import ModalEdit from './ProfileEdit'
import { useSelector } from 'react-redux';
 function Profile(){
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


      const user = useSelector((state) => state.userReducer);
      console.log('SOY EL USUARIO', user)
  

     return (

<Container  style={styles.container}>

         <View style={styles.fondodata}>

<View style={styles.img1}>   
<Image style={styles.img2} source={require('../../assets/logoUser.png')}/>
</View>
</View>
   
<View style={styles.data}>  
<Text style={styles.user}>{user.name}</Text>
          <Card >
            <CardItem header>
                
              <Text>Nombre</Text>
              
            </CardItem>
            <CardItem>
              <Body>
                <Text>
        {user.surname}
                </Text>
              </Body>
            </CardItem>
            <CardItem header>
              <Text>Email</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
           {user.email}
                </Text>
              </Body>
            </CardItem>
            <CardItem header>
              <Text>Cumpleaños</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
       {user.birthday}
                </Text>
              </Body>
            </CardItem>
            <CardItem header>
              <Text>Telefono/celular</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
           {user.phone_number}
                </Text>
              </Body>
            </CardItem>

            <CardItem header>
              <Text>Contraseña</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
            {user.adress}
                </Text>
              </Body>
            </CardItem>
         </Card>

</View> 
      <Button block dark style={styles.button}  onPress={showModal}>
            <Text>Editar Mis Datos</Text>
          </Button>
 
     <ModalEdit

     visible={visible} setVisible={setVisible}
     showModal={showModal} hideModal={hideModal}
     />
     </Container>
    

     )
 }

 const styles = StyleSheet.create({
    container: {

   backgroundColor: '#4A1491',
    },
    fondodata:{
        backgroundColor:'white',

    },
user:{
  color:'white',
textAlign: 'center',
fontSize:25,

},
    img2: {
        top:30,
        borderWidth: 2,
        width: 110,
        height: 110,
        borderRadius: 50,
},
    img1:{
     
      flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    data:{
  
        margin: 5,
        top: 40,
    },
    button:{
        top:40,
        margin: 8,
    }
    

 })
 export default Profile;