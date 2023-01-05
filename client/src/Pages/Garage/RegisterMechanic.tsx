import { Image, View, TextInput, Button, KeyboardAvoidingView, 
  ToastAndroid, Platform, Alert, Text, ScrollView, Linking, TouchableWithoutFeedback, TouchableOpacity, Dimensions} from "react-native"
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Entypo";
import Style from "../../Styles/AuthStyle"
import React, { useState }  from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParamList"
import { useComponentDidMount } from '../../Component/customHooks';
import * as ImagePicker from "expo-image-picker";
import { Avatar, Divider } from "react-native-paper";

type RegisterTypeMechanic = StackNavigationProp<RootStackParamList, 'RegisterMechanic'>

export function RegisterMechanic(){

  const navigation = useNavigation<RegisterTypeMechanic>();

  let placeholder_list:string[], icon_list:string[], 
  autocomplete_list:any[], inputType:any[], maxLength:number[],
  Content:any[] = [], fields:any[];
  
  placeholder_list = ['Input Your Mechanic Name Here','Input Your Mechanic Email Here',
    'Input Your Mechanic Phone Number Here', 'Input Your Mechanic Address Here',
    'Input Your Mechanic Password Here', 'Input Your Mechanic Password Again']
  icon_list = ['user','mail','phone','location', 'key', 'shield']
  autocomplete_list = ['name','email','tel','postal-address', 'password', 'password-new']
  inputType = ['default', 'default', 'phone-pad', 'default', 'default', 'default']
  maxLength = [30, 40, 13, 100, 20, 20]

  const [SName, setName] = React.useState<string>('');
  const [SEmail, setEmail] = React.useState<string>('');
  const [SPhone, setPhone] = React.useState<number>(0);
  const [SAddress, setAddress] = React.useState<string>('');
  const [SPassword, setPassword] = React.useState<string>('');
  const [SPasswordValid, setPasswordValid] = React.useState<string>('');
  const [SButton, setButton] = React.useState<boolean>(false);
  const [SMechanicPhoto, setMechanicPhoto] = React.useState<string>('https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Add-1-512.png');
  const [SIDCardImage, setIDCardImage] = React.useState<string>('https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Add-1-512.png');
  const [MechanicPhotoUpload, setMechanicPhotoUpload] = React.useState<boolean>(false);
  const [IDCardUpload, setIDCardUpload] = React.useState<boolean>(false);
  const [SModal, setModal] = React.useState<boolean>(false);

  const isComponentMounted = useComponentDidMount();
  
  const pickIDCardImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if(!result.canceled){
      setIDCardImage(result.assets[0].uri);
      setIDCardUpload(true);
      setModal(false);
    }
  };

  const takeIDCardImage = async ()  => {

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if(!result.canceled){
      setIDCardImage(result.assets[0].uri);
      setIDCardUpload(true);
      setModal(false);
    };
  };

  const pickMechanicPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if(!result.canceled){
      setMechanicPhoto(result.assets[0].uri);
      setMechanicPhotoUpload(true);
      setModal(false);
    }
  };

  const takeMechanicPhoto = async ()  => {

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if(!result.canceled){
      setMechanicPhoto(result.assets[0].uri);
      setMechanicPhotoUpload(true);
      setModal(false);
    };
  };
  
  React.useEffect(() => {
    if(isComponentMounted){
      setButton(SName !== '' && SEmail !== '' && SPhone !== 0 && SAddress !== '' && SPassword !== '' && SPasswordValid !== '')
    }
  },[SName, SEmail, SPhone, SAddress, SPassword, SPasswordValid])

  fields = [setName, setEmail, setPhone, setAddress, setPassword, setPasswordValid]

  for(let i = 0; i <= icon_list.length - 1; i++){
    if(icon_list[i] == 'key' || icon_list[i] == 'shield'){
      Content.push(
        <View style={Style.flexHorizontal} key={"View" + i}>
          <Icon 
            name={icon_list[i]} 
            size={30} 
            style={Style.icon}
            color="#fff"
            key={"Icon" + i}/>
          <TextInput 
            autoComplete={autocomplete_list[i]}
            maxLength={maxLength[i]}
            placeholder={placeholder_list[i]}
            placeholderTextColor="#fff"
            autoCapitalize='none'
            secureTextEntry={true}
            keyboardType={inputType[i]}
            onChangeText={(value) => fields[i](value)}
            style={Style.textInp}
            key={"Input" + i}/>
          </View>
      )
    }
    else{
      Content.push(
        <View style={Style.flexHorizontal} key={"View" + i}>
          <Icon 
            name={icon_list[i]} 
            size={30} 
            style={Style.icon}
            color="#fff"
            key={"Icon" + i}/>
          <TextInput 
            autoComplete={autocomplete_list[i]}
            maxLength={maxLength[i]}
            placeholder={placeholder_list[i]}
            placeholderTextColor="#fff"
            keyboardType={inputType[i]}
            onChangeText={(value) => fields[i](value)}
            style={Style.textInp}
            key={"Input" + i}/>
          </View>
      )
    }
  };

  const checkInput = () => {
    if(SPassword?.length! < 8){
      Platform.OS === 'android' ? ToastAndroid.show('Password Need at Least 8 Characters!!', ToastAndroid.SHORT) : Alert.alert("Password Need at Least 8 Characters!!")
    }else if(SButton == true && SPassword == SPasswordValid && IDCardUpload == true && MechanicPhotoUpload == true){
      navigation.navigate('MechanicView');
    }else if(SButton == true && SPassword != SPasswordValid){
      Platform.OS === 'android' ? ToastAndroid.show('Password Did Not Match!!', ToastAndroid.SHORT) : Alert.alert("Password did Not Match!!")
    }else if(IDCardUpload == false){
      Platform.OS === 'android' ? ToastAndroid.show('Please Upload Your ID Card!!', ToastAndroid.SHORT) : Alert.alert("Please Upload Your ID Card!!")
    }else{
      Platform.OS === 'android' ? ToastAndroid.show('Please Fill All Required Field!!', ToastAndroid.SHORT) : Alert.alert("Please Fill All Required Field!!")
    }
  };

  return(
      <ScrollView>
        <View style={{ alignItems: 'center'}}>
          <KeyboardAvoidingView>
              <Image 
                  source={require("../../../assets/images/blogo.png")}
                  style={Style.logo}/>
              <View style={Style.flexVertical}>
                  {Content}
              </View>
              <View style={{ paddingHorizontal:35, backgroundColor:"#434647", marginTop: 30, paddingBottom: 10}}>
                <View style={Style.avatarStyle}>
                  <Avatar.Image 
                    size={100}
                    style={Style.avatarStyle}
                    source={{uri: SIDCardImage}}/>
                  <Text 
                    style={Style.photoLabel} 
                    onPress={() => setModal(true)}
                  >Upload ID Card</Text>
                </View>
                <View>
                  <Modal 
                    isVisible={SModal}
                    onBackdropPress={() => setModal(false)}
                    style={{justifyContent:'flex-end', margin:0}}>
                    <View style={Style.modalStyle}>
                      <TouchableWithoutFeedback onPress={takeIDCardImage}>
                        <View style={Style.modalTextLayout}>
                          <Icon name="camera" size={20} color={'#828483'}/>
                          <Text 
                            style={Style.modalText}>Ambil Foto</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <Divider/>
                      <TouchableWithoutFeedback onPress={pickIDCardImage}>
                        <View style={Style.modalTextLayout}>
                          <Icon name="folder-images" size={20} color={'#828483'}/>
                          <Text 
                            style={Style.modalText}>Cari Dari Galeri</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </Modal>
                </View>
              </View>
              <View style={{ paddingHorizontal:35, backgroundColor:"#434647", marginTop: 30, paddingBottom: 10}}>
                <View style={Style.avatarStyle}>
                  <Avatar.Image 
                    size={100}
                    style={Style.avatarStyle}
                    source={{uri: SIDCardImage}}/>
                  <Text 
                    style={Style.photoLabel} 
                    onPress={() => setModal(true)}
                  >Upload ID Card</Text>
                </View>
                <View>
                  <Modal 
                    isVisible={SModal}
                    onBackdropPress={() => setModal(false)}
                    style={{justifyContent:'flex-end', margin:0}}>
                    <View style={Style.modalStyle}>
                      <TouchableWithoutFeedback onPress={takeMechanicPhoto}>
                        <View style={Style.modalTextLayout}>
                          <Icon name="camera" size={20} color={'#828483'}/>
                          <Text 
                            style={Style.modalText}>Ambil Foto</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <Divider/>
                      <TouchableWithoutFeedback onPress={pickMechanicPhoto}>
                        <View style={Style.modalTextLayout}>
                          <Icon name="folder-images" size={20} color={'#828483'}/>
                          <Text 
                            style={Style.modalText}>Cari Dari Galeri</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </Modal>
                </View>
              </View>
              <View
                  style={Style.button}>
                  <Button 
                      title="Next"
                      color="#b99504"
                      onPress={() => checkInput()}/>
              </View>
        </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
};
