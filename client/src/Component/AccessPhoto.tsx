import React from "react";
import { Modal, Text, Image, TouchableWithoutFeedback, View } from "react-native";
import { CustomText } from "./CustomText";
import Style from '../Styles/ComponentStyle/accessPhoto';
import Icon from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";


/* Props List:
*   setPhotoState = set state for the photo link
*   setImageUploaded = state to define image already uploaded
*   visibleModal = state for modal to be visible
*   setVisibleModal = set state for modal to be visible
*/

export function AccessPhoto(props : any) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if(!result.canceled){
      props.setPhotoState(result.assets[0].uri);
      props.setImageUploaded(true);
      props.setVisibleModal(false);
    }
  };

  const takeImage = async ()  => {

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if(!result.canceled){
      props.setPhotoState(result.assets[0].uri);
      props.setImageUploaded(true);
      props.setVisibleModal(false);
    };
  };
  
  const PictureFilled = () => {
    return(
      <TouchableWithoutFeedback onPress={() => props.setVisibleModal(true)}>  
        <View style={Style.idCardContainer}>
          <Image 
            source={{uri: props.photoState}} style={{width:'100%', height:150}}/>
          <CustomText title = "Masukkan foto KTP anda" color = "white" size={15} style={{marginVertical:15}}/>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  
  const PictureNotFilled = () => {
    return(
      <TouchableWithoutFeedback onPress={() => props.setVisibleModal(true)}>  
        <View style={Style.idCardContainer}>
          <Icon name="circle-with-plus" size={50} color="white"/>
          <CustomText title = "Masukkan foto KTP anda" color = "white" size={15} style={{marginVertical:15}}/>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return(
    <View style={{flex:1}}>
      { props.photoState !== undefined ? <PictureFilled/> : <PictureNotFilled/> }
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visibleModal}
        onRequestClose={() => props.setVisibleModal(!props.visibleModal)}>
        <TouchableWithoutFeedback onPress={() => props.setVisibleModal(false)}>
          <View style={Style.modalMask}/>
        </TouchableWithoutFeedback>
        <View style={Style.modalStyle}>
          <TouchableWithoutFeedback onPress={takeImage}>
            <View style={Style.modalTextLayout}>
              <Icon name="camera" size={20} color={'#828483'}/>
              <Text 
                style={Style.modalText}>Ambil Foto</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={pickImage}>
            <View style={Style.modalTextLayout}>
              <Icon name="folder-images" size={20} color={'#828483'}/>
              <Text 
                style={Style.modalText}>Cari Dari Galeri</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  )
} 
