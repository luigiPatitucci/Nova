import React, {useState} from 'react';
import {  Button, View, Container,  Card, CardItem, Text, Body } from 'native-base';
import {StyleSheet, Image,TouchableOpacity } from "react-native";
import ModalEdit from './ProfileEdit'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';

import {updateAvatar} from '../../redux/actions/userActions'

 function Profile(){
    const imgUser = require('../../assets/logoUser.png')
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch()

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


      const user = useSelector((state) => state.userReducer);
      console.log('SOY EL USUARIO', user)

      //CARGAR IMGANE
 
   const uploadImage = async (base64)=>{
    return axios
      .post(
        "https://api.imgur.com/3/image",
        { image: base64, type: "base64" },
        {
          headers: {Authorization: `Client-ID 1966dd2e3c81149`,},
        }
      ).then( resp=>{
        console.log("SOY EL LINK",resp.data.data.link)
        let data = {
          avatar:resp.data.data.link
        } ;
         dispatch(updateAvatar(data,user.id))
      })
   }

      const openGallery = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (resultPermission) {
            let imageSelected = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
              base64: true,
            });
            if (imageSelected.cancelled === false) {
        
                //console.log(JSON.stringify(resolve))
                uploadImage(imageSelected.base64)
              }
              
            }
          }
     return (

<Container  style={styles.container}>

  <View style={styles.fondodata}>
    <View style={styles.img1}>   
      <Image style={styles.img2} source={user.avatar?{uri:`${user.avatar}`}:imgUser}/>
    </View>
        <TouchableOpacity onPress={openGallery}>
            <Text>Select an Image</Text>
        </TouchableOpacity>      
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
                  {user.username}
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

      <Button block dark style={styles.button}  onPress={showModal}>
            <Text>Editar Mis Datos</Text>
        </Button>
</View> 
 
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