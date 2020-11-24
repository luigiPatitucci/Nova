import React, { useState } from 'react';
import { View, Container, Text } from 'native-base';
import { Image, TouchableOpacity } from "react-native";
import ProfileEdit from './ProfileEdit';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';

import { updateAvatar } from '../../redux/actions/userActions'

function Profile() {
  const imgUser = require('../../assets/logoUser.png');
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(!visible);

  const user = useSelector((state) => state.userReducer);

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
        <TouchableOpacity onPress={() => showModal()} style={s.pencilContainer}>
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
        <Text style={s.infoUser}>{user.name}</Text>
        <Text style={s.infoCategory}>Email:</Text>
        <Text style={s.infoUser}>{user.email}</Text>
        <Text style={s.infoCategory}>DNI:</Text>
        <Text style={s.infoUser}>{user.identityNumber}</Text>
        <Text style={s.infoCategory}>Teléfono:</Text>
        <Text style={s.infoUser}>{user.phone_number}</Text>
        <Text style={s.infoCategory}>Dirección:</Text>
        <Text style={s.infoUser}>{user.adress}</Text>
      </View>

      <Modal
        isVisible={visible}
        animationIn='zoomIn'
        animationInTiming={800}
        animationOut='fadeOut'
        animationOutTiming={800}
        onBackdropPress={() => showModal()}
        style={{height: 2000}}
        deviceHeight={520}
      >
        <ProfileEdit 
          showModal={showModal}
        />
      </Modal>
    </Container>


  )
}

export default Profile;