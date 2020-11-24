import React, { useState } from 'react';
import { Button, View, Container, Card, CardItem, Text, Body } from 'native-base';
import { Image, TouchableOpacity } from "react-native";
import ModalEdit from './ProfileEdit'
import { useDispatch, useSelector } from 'react-redux';
import s from './styles';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';

import { updateAvatar } from '../../redux/actions/userActions'

function Profile() {
  const imgUser = require('../../assets/logoUser.png')
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


  const user = useSelector((state) => state.userReducer);
  console.log('SOY EL USUARIO', user)

  //CARGAR IMGANE

  const uploadImage = async (base64) => {
    return axios
      .post(
        "https://api.imgur.com/3/image",
        { image: base64, type: "base64" },
        {
          headers: { Authorization: `Client-ID 1966dd2e3c81149`, },
        }
      ).then(resp => {
        console.log("SOY EL LINK", resp.data.data.link)
        let data = {
          avatar: resp.data.data.link
        };
        dispatch(updateAvatar(data, user.id))
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

    <Container style={s.container}>

        <View style={s.imgContainer}>
          <TouchableOpacity onPress={openGallery} style={s.pencilContainer}>
            <Icon name='pencil' size={28} style={s.pencilIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={openGallery} style={s.shareCvuIconContainer}>
            <Icon name='share-variant' size={28} style={s.shareCvuIcon} />
          </TouchableOpacity>

          <Image style={s.avatar} source={user.avatar ? { uri: `${user.avatar}` } : imgUser} />
          <TouchableOpacity onPress={openGallery} style={s.cameraContainer}>
            <Icon name='camera' size={25} style={s.cameraIcon} />
          </TouchableOpacity>

          <Text style={s.nickName}>{user.username}</Text>
        </View>

      <View style={s.infoContainer}>
        <Text style={s.infoCategory}>Nombre y Apellido:</Text>
        <Text style={s.infoUser}>Kevin Vega</Text>
        <Text style={s.infoCategory}>Email:</Text>
        <Text style={s.infoUser}>kevinvega2070@gmail.com</Text>
        <Text style={s.infoCategory}>DNI:</Text>
        <Text style={s.infoUser}>111111111</Text>
        <Text style={s.infoCategory}>Teléfono:</Text>
        <Text style={s.infoUser}>3476 560372</Text>
        <Text style={s.infoCategory}>Dirección:</Text>
        <Text style={s.infoUser}>Narnia 7842</Text>
      </View>

      <ModalEdit
        visible={visible} setVisible={setVisible}
        showModal={showModal} hideModal={hideModal}
      />
    </Container>


  )
}

export default Profile;