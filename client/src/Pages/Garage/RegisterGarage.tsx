import { Image, View, TextInput, Button, KeyboardAvoidingView, 
  ToastAndroid, Platform, Alert, Text, ScrollView, Linking, TouchableWithoutFeedback, TouchableOpacity, Dimensions} from "react-native"
import MapView, {Marker} from "react-native-maps";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/Entypo";
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Style from '../../Styles/AuthStyle';
import React, { useState }  from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParamList"
import { useComponentDidMount } from '../../Component/customHooks';
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Divider } from "react-native-paper";
import * as Location from 'expo-location';
import { useAppDispatch, useAppSelector } from "../../../redux";
import { setLatitude } from "../../../redux/component/latitude";
import { setLongitude } from "../../../redux/component/longitude";

type RegisterGarageType = StackNavigationProp<RootStackParamList, 'RegisterGarage'>

export function RegisterGarage(){

  const navigation = useNavigation<RegisterGarageType>();

  let placeholder_list:string[], icon_list:string[], 
  autocomplete_list:any[], inputType:any[], maxLength:number[],
  Content:any[] = [], fields:any[];
  
  placeholder_list = ['Input Garage Name Here', 'Input Garage Location Here', 'Choose Garage Location',
    'Input Garage Type Here', 'Input Mechanic Total Here',
    'Input Garage Open Hour Here', 'Input Garage Open Day Here']
  icon_list = ['garage', 'location', 'location-pin' ,
    'car', 'wrench', 'clock', 'calendar']
  autocomplete_list = ['off', 'postal-address',
    'off','off','off','off','off']
  inputType = ['default', 'default',
    'default', 'default', 'numeric', 'default']
  maxLength = [30, 100, 100, 20, 10, 10, 20]

  const [SGarName, setGarName] = React.useState<string>('');
  const [SGarLoc, setGarLoc] = React.useState<string>('');
  const [SChooseGar, setChooseGar] = React.useState<string>('Choose Your Location');
  const [SGarType, setGarType] = React.useState<string>('');
  const [SMechTotal, setMechTotal] = React.useState<number>(0);
  const [SOpenHour, setOpenHour] = React.useState<string>('');
  const [SOpenDay, setOpenDay] = React.useState<string>('');
  const [opendate, setOpenDate] = useState(new Date());
  const [closedate, setCloseDate] = useState(new Date());
  const [show, setShow] = React.useState<boolean>(false);
  const [opentext, setOpenText] = React.useState<string>('Open Hour');
  const [closetext, setCloseText] = React.useState<string>('Close Hour');
  const [isOpenDatePickerVisible, setOpenDatePickerVisibility] = useState(false);
  const [isCloseDatePickerVisible, setCloseDatePickerVisibility] = useState(false);
  const [SButton, setButton] = React.useState<boolean>(false);
  const [SGarageImage, setGarageImage] = React.useState<string>('https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Add-1-512.png');
  const [ImageUpload, setImageUpload] = React.useState<boolean>(false);
  const [SModal, setModal] = React.useState<boolean>(false);
  const [selectedStartDay, setSelectedStartDay] = React.useState<string>("Senin");
  const [selectedEndDay, setSelectedEndDay] = React.useState<string>("Senin");
  const [openMap, setOpenMap] = React.useState<boolean>(false);
  const latitude = useAppSelector(state => state.latitude);
  const longitude = useAppSelector(state => state.longitude);
  const dispatch = useAppDispatch();

  React.useEffect(() =>{
    (async () => {

      let tryAgain : boolean = false;
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        Alert.alert('Permission to access location was denied');
        return;
      }

      do{
        const waiting = (ms : number) => new Promise(resolve => setTimeout(resolve, ms));
        const location = await Location.getCurrentPositionAsync({});
        await waiting(1500);
        if(location != undefined){
          dispatch(setLatitude(location['coords']['latitude']));
          dispatch(setLongitude(location['coords']['longitude']));
          tryAgain = false;
        }else{
          tryAgain = true;
        };
      }while(tryAgain);
 
    })();
  },[]);

  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }

  const isComponentMounted = useComponentDidMount();

  const showOpenDatePicker = () => {
    setOpenDatePickerVisibility(true);
  };

  const showCloseDatePicker = () => {
    setCloseDatePickerVisibility(true);
  };

  const hideOpenDatePicker = () => {
    setOpenDatePickerVisibility(false);
  };

  const hideCloseDatePicker = () => {
    setCloseDatePickerVisibility(false);
  };

  const handleOpenConfirm = (opendate) => {
    console.warn("A open date has been picked: ", opendate);
    const currentDate = opendate;
    setShow(Platform.OS === 'ios');
    setOpenDate(currentDate);

    let tempDate = new Date(currentDate);
    let ftime = addZero(tempDate.getHours()) + ':' + addZero(tempDate.getMinutes());
    setOpenText(ftime);
    hideOpenDatePicker();
  };

  const handleCloseConfirm = (closedate) => {
    console.warn("A close date has been picked: ", closedate);
    const currentDate = closedate;
    setShow(Platform.OS === 'ios');
    setCloseDate(currentDate);

    let tempDate = new Date(currentDate);
    let ftime = addZero(tempDate.getHours()) + ':' + addZero(tempDate.getMinutes());
    setCloseText(ftime);
    hideCloseDatePicker();
  };

  const pickGarageImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if(!result.canceled){
      setGarageImage(result.assets[0].uri);
      setImageUpload(true);
      setModal(false);
    }
  };

  const takeGarageImage = async ()  => {

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if(!result.canceled){
      setGarageImage(result.assets[0].uri);
      setImageUpload(true);
      setModal(false);
    };
  };

  const getInitialState = () => {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
 
  React.useEffect(() => {
    if(isComponentMounted){
      setButton(SGarName !== '' 
      && SGarLoc !== '' && SChooseGar !== '' && SGarType !== '' && SMechTotal !== 0 && SOpenHour !== ''
      && SOpenDay !== '')
    }
  },[SGarName, SGarLoc, SChooseGar, SGarType, SMechTotal, 
    SOpenHour, SOpenDay])

  fields = [setGarName, setGarLoc, 
    setChooseGar, setGarType, setMechTotal, setOpenHour, setOpenDay]

  const showMode = (currentMode) => {
    setShow
  }
  for(let i = 0; i <= icon_list.length - 1; i++){
    if(icon_list[i] == 'garage' || icon_list[i] == 'car' || icon_list[i] == 'wrench'){
      MIcon.loadFont();
      Content.push(
        <View style={Style.flexHorizontal} key={"View" + i}>
          <MIcon 
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
    else if(icon_list[i] == 'location-pin'){
      Content.push(
      <View style={Style.flexHorizontal} key={"View" + i}>
        <Icon 
            name={icon_list[i]} 
            size={30} 
            style={Style.icon}
            color="#fff"
            key={"Icon" + i}/>
        <TouchableOpacity onPress={() => setOpenMap(true)}>
            <View pointerEvents="none">
              <TextInput 
              editable={false}
              value={SChooseGar}
              placeholder={SChooseGar}
              placeholderTextColor="#fff"
              style={Style.textInp}
              key={"Input" + i}/>
            </View>
            <View>
              <Modal
              isVisible={openMap}
              onBackdropPress={() => setOpenMap(false)}
              style={{justifyContent:'flex-end', margin:0}}>
              <MapView
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
                }}
                style={{width:Dimensions.get('window').width, 
                    height:300, 
                    justifyContent:'center'}}>
                <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title={'Lokasi Anda'}
                  >
                <Icon name={'location-pin'} size={50} color={'#4eacea'}/>
                </Marker>
              </MapView>
              </Modal>
              
            </View>
          </TouchableOpacity>
      </View>
      )
    }
    else if(icon_list[i] == 'clock'){
      Content.push(
        <View style={Style.flexHorizontal} key={"View" + i}>
          <Icon 
            name={icon_list[i]} 
            size={30} 
            style={Style.icon}
            color="#fff"
            key={"Icon" + i}/>
          <TouchableOpacity onPress={showOpenDatePicker}>
            <View pointerEvents="none">
              <TextInput 
              editable={false}
              value={opentext}
              placeholder={opentext}
              placeholderTextColor="#fff"
              style={Style.textInp}
              key={"Input" + i}/>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isOpenDatePickerVisible}
            mode="time"
            onConfirm={handleOpenConfirm}
            onCancel={hideOpenDatePicker}
          />
          <Text style={{color:"#b99504"}}> </Text>
          <TouchableOpacity onPress={showCloseDatePicker}>
            <View pointerEvents="none">
              <TextInput 
              editable={false}
              value={closetext}
              placeholder={closetext}
              placeholderTextColor="#fff"
              style={Style.textInp}
              key={"Input" + i}/>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isCloseDatePickerVisible}
            mode="time"
            onConfirm={handleCloseConfirm}
            onCancel={hideCloseDatePicker}
          />
          </View>
      )
    }else if(icon_list[i] == 'calendar'){
      Content.push(
        <View style={Style.flexHorizontal} key={"View" + i}>
          <Icon 
            name={icon_list[i]} 
            size={30} 
            style={Style.icon}
            color="#fff"
            key={"Icon" + i}/>
            <Picker
              selectedValue={selectedStartDay}
              style={Style.textInp2}
              mode={"dialog"}
              onValueChange={(itemValue) => setSelectedStartDay(itemValue)}
            >
            <Picker.Item label="Senin" value="Senin"/>
            <Picker.Item label="Selasa" value="Selasa"/>
            <Picker.Item label="Rabu" value="Rabu"/>
            <Picker.Item label="Kamis" value="Kamis"/>
            <Picker.Item label="Jumat" value="Jumat"/>
            <Picker.Item label="Sabtu" value="Sabtu"/>
            <Picker.Item label="Minggu" value="Minggu"/>
            </Picker>
          <Text style={{color:"#b99504"}}> </Text>
          <Picker
              selectedValue={selectedEndDay}
              style={Style.textInp2}
              mode={"dialog"}
              onValueChange={(itemValue) => setSelectedEndDay(itemValue)}
            >
            <Picker.Item label="Senin" value="Senin"/>
            <Picker.Item label="Selasa" value="Selasa"/>
            <Picker.Item label="Rabu" value="Rabu"/>
            <Picker.Item label="Kamis" value="Kamis"/>
            <Picker.Item label="Jumat" value="Jumat"/>
            <Picker.Item label="Sabtu" value="Sabtu"/>
            <Picker.Item label="Minggu" value="Minggu"/>
            </Picker>
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
    if(SButton == true && ImageUpload == true){
      navigation.navigate('GarageMain');
    }else if(ImageUpload == false){
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
                    source={{uri: SGarageImage}}/>
                  <Text 
                    style={Style.photoLabel} 
                    onPress={() => setModal(true)}
                  >Upload Garage Photo</Text>
                </View>
                <View>
                  <Modal 
                    isVisible={SModal}
                    onBackdropPress={() => setModal(false)}
                    style={{justifyContent:'flex-end', margin:0}}>
                    <View style={Style.modalStyle}>
                      <TouchableWithoutFeedback onPress={takeGarageImage}>
                        <View style={Style.modalTextLayout}>
                          <Icon name="camera" size={20} color={'#828483'}/>
                          <Text 
                            style={Style.modalText}>Ambil Foto</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <Divider/>
                      <TouchableWithoutFeedback onPress={pickGarageImage}>
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
                      title="Register Now"
                      color="#b99504"
                      onPress={() => checkInput()}/>
              </View>
              <Text style={Style.signText}> Already Have account?? 
                <Text 
                    style={{color:"#b99504"}}
                    onPress={()=>(navigation.navigate('Login'))}> Sign In </Text>
              </Text>
              <Text style={Style.signText}> Register as Customer?? 
                <Text 
                    style={{color:"#b99504"}}
                    onPress={()=>(navigation.navigate('Register'))}> Click Here </Text>
              </Text>
        </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
};
