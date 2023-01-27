import { Image, View, TextInput, Button, KeyboardAvoidingView, 
  ToastAndroid, Platform, Alert, Text, ScrollView, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Style from "../Styles/AuthStyle"
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParamList"
import { useComponentDidMount } from '../Component/customHooks';
import { useAppDispatch, useAppSelector } from '../../redux';
import { setCustLocation } from "../../redux/component/custLocation";
import { setUserAuth } from "../../redux/component/userAuth";
import { ImportantText } from "../Component/CustomText";
import { Location as LocationModal } from '../Component/Location'; 
import * as Location from 'expo-location';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AccessPhoto } from "../Component/AccessPhoto";
import { setActiveStatus } from "../../redux/component/activeStatus";

type RegisterType = StackNavigationProp<RootStackParamList, 'Register'>
type LoginType = StackNavigationProp<RootStackParamList, 'Login'>
type RegisterTypeOwner = StackNavigationProp<RootStackParamList, 'RegisterOwner'>
type RegisterGarageType = StackNavigationProp<RootStackParamList, 'RegisterGarage'>

export function Register(){

  const navigation = useNavigation<RegisterType>();
  const dispatch = useAppDispatch();

  let placeholder_list:string[], icon_list:string[], 
  autocomplete_list:any[], inputType:any[], maxLength:number[],
  Content:any[] = [], fields:any[];
  
  placeholder_list = ['Masukkan Nama Anda Disini','Masukkan Email Anda Disini',
    'Masukkan Nomor Telepon Anda Disini', 'Masukkan Alamat Anda Disini', 
    'Masukkan Password Anda Disini', 'Masukkan Password Anda Kembali']
  icon_list = ['user','mail','phone','location', 'key', 'shield']
  autocomplete_list = ['name','email','tel','postal-address', 
    'password', 'password-new']
  inputType = ['default', 'default', 'phone-pad', 'default', 'default', 'default']
  maxLength = [30, 40, 13, 100, 20, 20]

  const [SName, setName] = React.useState<string>('');
  const [SEmail, setEmail] = React.useState<string>('');
  const [SPhone, setPhone] = React.useState<string>('');
  const [SAddress, setAddress] = React.useState<string>('');
  const [SPassword, setPassword] = React.useState<string>('');
  const [SPasswordValid, setPasswordValid] = React.useState<string>('');
  const [SButton, setButton] = React.useState<boolean>(false);
  
  const isComponentMounted = useComponentDidMount();
  
  React.useEffect(() => {
    if(isComponentMounted){
      setButton(SName !== '' && SEmail !== '' && SPhone !== '' && SAddress !== '' && SPassword !== '' && SPasswordValid !== '')
    }
  },[SName, SEmail, SPhone, SAddress, SPassword, SPasswordValid])

  fields = [setName, setEmail, setPhone, setAddress, 
    setPassword, setPasswordValid]

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
    }else{
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

  const prevState = useAppSelector(state => state.userAuth);
  const save_customer_data = (name : string, email : string, phone : string, address : string, password : string, role : string) => {
    dispatch(setUserAuth([...prevState,
      {
        name:name, 
        email:email,
        phone:phone,
        address:address,
        password:password,
        role:role,
        photoIDCard: null,
        photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg'
      }
    ]))
  }

  const checkInput = () => {
    if(SPassword?.length! < 8){
      Platform.OS === 'android' ? ToastAndroid.show('Password Need at Least 8 Characters!!', ToastAndroid.SHORT) : Alert.alert("Panjang Password Minimal 8 Karakter!!")
    }else if(SButton == true && SPassword == SPasswordValid){
      save_customer_data(SName, SEmail, SPhone, SAddress, SPassword, 'Customer');
      navigation.navigate('CustomerMain');
    }else if(SButton == true && SPassword != SPasswordValid){
      Platform.OS === 'android' ? ToastAndroid.show('Password Tidak Cocok!!', ToastAndroid.SHORT) : Alert.alert("Password Tidak Cocok!!")
    }else{
      Platform.OS === 'android' ? ToastAndroid.show('Tolong Isi Semua Data Yang Dibutuhkan!!', ToastAndroid.SHORT) : Alert.alert("Tolong Isi Semua Data Yang Dibutuhkan!!")
    }
  };

  return(
      <ScrollView>
        <View style={{ alignItems: 'center'}}>
          <KeyboardAvoidingView>
              <Image 
                  source={require("../../assets/images/blogo.png")}
                  style={Style.logo}/>
              <View style={Style.flexVertical}>
                  {Content}
              </View>
              <View
                  style={Style.button}>
                  <Button 
                      title="Daftar Sekarang"
                      color="#b99504"
                      onPress={() => checkInput()}/>
              </View>
              <Text style={Style.signText}> Sudah Punya Akun?? 
                <Text 
                    style={{color:"#b99504"}}
                    onPress={()=>(navigation.navigate('Login'))}> Login </Text>
              </Text>
              <Text style={[Style.signText, {marginTop:8}]}> Ingin Mendaftarkan Bengkel Anda?? 
                <Text 
                    style={{color:"#b99504"}}
                    onPress={()=>(navigation.navigate('RegisterOwner'))}> Gabung </Text>
              </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
};

// REGISTER GARAGE AND OWNER 

export function RegisterOwner(){

  const navigation = useNavigation<RegisterTypeOwner>();
  const dispatch = useAppDispatch();

  let placeholder_list:string[], icon_list:string[], 
  autocomplete_list:any[], inputType:any[], maxLength:number[],
  Content:any[] = [], fields:any[];
  
  placeholder_list = ['Masukkan Nama Anda Disini','Masukkan Email Anda Disini',
    'Masukkan Nomor Telepon Anda Disini', 'Masukkan Alamat Anda Disini', 
    'Masukkan Password Anda Disini', 'Masukkan Password Anda Kembali']
  icon_list = ['user','mail','phone','location', 'key', 'shield']
  autocomplete_list = ['name','email','tel','postal-address', 'password', 'password-new']
  inputType = ['default', 'default', 'phone-pad', 'default', 'default', 'default']
  maxLength = [30, 40, 13, 100, 20, 20]

  const [SName, setName] = React.useState<string>('');
  const [SEmail, setEmail] = React.useState<string>('');
  const [SPhone, setPhone] = React.useState<string>('');
  const [SAddress, setAddress] = React.useState<string>('');
  const [SPassword, setPassword] = React.useState<string>('');
  const [SPasswordValid, setPasswordValid] = React.useState<string>('');
  const [SButton, setButton] = React.useState<boolean>(false);
  const [SIDCardImage, setIDCardImage] = React.useState<string>();
  const [ImageUpload, setImageUpload] = React.useState<boolean>(false);
  const [SModal, setModal] = React.useState<boolean>(false);

  const isComponentMounted = useComponentDidMount();
  
  React.useEffect(() => {
    if(isComponentMounted){
      setButton(SName !== '' && SEmail !== '' && SPhone !== '' && SAddress !== '' && SPassword !== '' && SPasswordValid !== '')
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

  const prevState = useAppSelector(state => state.userAuth);
  const save_owner_data = (name : string, email : string, phone : string, address : string, password : string, idCard: string, role : string) => {
    dispatch(setUserAuth([...prevState,
      {
        name:name, 
        email:email,
        password:password,
        address:address,
        photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
        idCard: idCard,
        phone:phone,
        role:role,
      }
    ]))
  }

  const checkInput = () => {
    if(SPassword?.length! < 8){
      Platform.OS === 'android' ? ToastAndroid.show('Password Need at Least 8 Characters!!', ToastAndroid.SHORT) : Alert.alert("Kata Sandi Minimal 8 Karakter!!")
    }else if(SButton == true && SPassword == SPasswordValid && ImageUpload == true){
      save_owner_data(SName, SEmail, SPhone, SAddress, SPassword, SIDCardImage, 'Owner')
      navigation.navigate('RegisterGarage');
    }else if(SButton == true && SPassword != SPasswordValid){
      Platform.OS === 'android' ? ToastAndroid.show('Kata Sandi Tidak Cocok!!', ToastAndroid.SHORT) : Alert.alert("Password did Not Match!!")
    }else if(ImageUpload == false){
      Platform.OS === 'android' ? ToastAndroid.show('Foto KTP Belum Terisi!!', ToastAndroid.SHORT) : Alert.alert("Please Upload Your ID Card!!")
    }else{
      Platform.OS === 'android' ? ToastAndroid.show('Please Fill All Required Field!!', ToastAndroid.SHORT) : Alert.alert("Tolong Isi Semua Data Yang Diperlukan!!")
    }
  };

  return(
      <ScrollView>
        <View style={{ alignItems: 'center'}}>
          <KeyboardAvoidingView>
              <Image 
                  source={require("../../assets/images/blogo.png")}
                  style={[Style.logo, {marginBottom: -20}]}/>
              <View style={[Style.flexVertical, {marginTop:0}]}>
                  {Content}
              </View>
              <AccessPhoto
                photoState={SIDCardImage}
                setPhotoState={setIDCardImage}
                setImageUploaded={setImageUpload}
                visibleModal={SModal}
                setVisibleModal={setModal}
                title="Masukkan Foto KTP Anda"
              />
              <View
                  style={Style.button}>
                  <Button 
                      title="Selanjutnya"
                      color="#b99504"
                      onPress={() => checkInput()}/>
              </View>
              <Text style={Style.signText}> Sudah Punya Akun?? 
                <Text 
                    style={{color:"#b99504"}}
                    onPress={()=>(navigation.navigate('Login'))}> Login </Text>
              </Text>
              <Text style={[Style.signText, {marginBottom: 10, marginTop:6}]}> Lanjut Daftar Sebagai Customer??
                <Text 
                    style={{color:"#b99504"}}
                    onPress={()=>(navigation.navigate('Register'))}> Disini </Text>
              </Text>
        </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
};

export function RegisterMechanic(props : any){

  const navigation = useNavigation<RegisterTypeOwner>();
  const dispatch = useAppDispatch();

  let placeholder_list:string[], icon_list:string[], 
  autocomplete_list:any[], inputType:any[], maxLength:number[],
  Content:any[] = [], fields:any[];
  
  placeholder_list = ['Masukkan Nama Anda Disini','Masukkan Email Anda Disini',
    'Masukkan Nomor Telepon Anda Disini', 'Masukkan Alamat Anda Disini', 
    'Masukkan Password Anda Disini', 'Masukkan Password Anda Kembali']
  icon_list = ['user','mail','phone','location', 'key', 'shield']
  autocomplete_list = ['name','email','tel','postal-address', 'password', 'password-new']
  inputType = ['default', 'default', 'phone-pad', 'default', 'default', 'default']
  maxLength = [30, 40, 13, 100, 20, 20]

  const [SName, setName] = React.useState<string>('');
  const [SEmail, setEmail] = React.useState<string>('');
  const [SPhone, setPhone] = React.useState<string>('');
  const [SAddress, setAddress] = React.useState<string>('');
  const [SPassword, setPassword] = React.useState<string>('');
  const [SPasswordValid, setPasswordValid] = React.useState<string>('');
  const [SButton, setButton] = React.useState<boolean>(false);
  const [SIDCardImage, setIDCardImage] = React.useState<string>();
  const [ImageUpload, setImageUpload] = React.useState<boolean>(false);
  const [SModal, setModal] = React.useState<boolean>(false);

  const isComponentMounted = useComponentDidMount();
  
  React.useEffect(() => {
    if(isComponentMounted){
      setButton(SName !== '' && SEmail !== '' && SPhone !== '' && SAddress !== '' && SPassword !== '' && SPasswordValid !== '')
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

  const prevState = useAppSelector(state => state.userAuth);
  const save_mechanic_data = (name : string, email : string, phone : string, address : string, 
    password : string, idCard: string, role : string) => {
    dispatch(setUserAuth([...prevState,
      {
        id: prevState[prevState.length - 1].id + 1,
        garageId: props.garageId,
        name:name, 
        email:email,
        password:password,
        address:address,
        idCard: idCard,
        phone:phone,
        photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
        role:role,
      }
    ]))
  }

  const checkInput = () => {
    if(SPassword?.length! < 8){
      Platform.OS === 'android' ? ToastAndroid.show("Kata Sandi Minimal 8 Karakter!!", ToastAndroid.SHORT) : Alert.alert("Kata Sandi Minimal 8 Karakter!!")
    }else if(SButton == true && SPassword == SPasswordValid && ImageUpload == true){
      save_mechanic_data(SName, SEmail, SPhone, SAddress, SPassword, SIDCardImage, 'Mechanic')
      navigation.navigate('GarageEmployee');
    }else if(SButton == true && SPassword != SPasswordValid){
      Platform.OS === 'android' ? ToastAndroid.show('Kata Sandi Tidak Cocok!!', ToastAndroid.SHORT) : Alert.alert('Kata Sandi Tidak Cocok!!')
    }else if(ImageUpload == false){
      Platform.OS === 'android' ? ToastAndroid.show('Foto KTP Belum Terisi!!', ToastAndroid.SHORT) : Alert.alert('Foto KTP Belum Terisi!!')
    }else{
      Platform.OS === 'android' ? ToastAndroid.show('Please Fill All Required Field!!', ToastAndroid.SHORT) : Alert.alert("Tolong Isi Semua Data Yang Diperlukan!!")
    }
  };

  return(
      <ScrollView>
        <View style={{ alignItems: 'center'}}>
          <KeyboardAvoidingView>
              <Image 
                  source={require("../../assets/images/blogo.png")}
                  style={[Style.logo, {marginTop:-20, marginBottom: -20}]}/>
              <View style={[Style.flexVertical, {marginTop:0}]}>
                  {Content}
              </View>
              <AccessPhoto
                photoState={SIDCardImage}
                setPhotoState={setIDCardImage}
                setImageUploaded={setImageUpload}
                visibleModal={SModal}
                setVisibleModal={setModal}
                title="Masukkan Foto KTP Anda"
              />
              <View
                  style={[Style.button, {marginBottom:25}]}>
                  <Button 
                      title="Daftar"
                      color="#b99504"
                      onPress={() => checkInput()}/>
              </View>
        </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
};

export function RegisterGarage(){

  const navigation = useNavigation<RegisterGarageType>();

  let placeholder_list:string[], icon_list:string[], 
  autocomplete_list:any[], inputType:any[], maxLength:number[],
  Content:any[] = [], fields:any[];
  
  placeholder_list = ['Masukkan Nama Bengkel Anda', 'Masukkan Website Jika Ada', 'Masukkan Lokasi Bengkel Anda', 
    'Pilih Jenis Bengkel Anda']
  icon_list = ['garage', 'globe','location', 
    'car', 'clock', 'calendar']
  autocomplete_list = ['off', 'off','postal-address',
    'off','off','off','off']
  inputType = ['default', 'url', 'default',
    'default']
  maxLength = [30, 100, 100, 100, 20, 10, 10, 20]

  const [SGarName, setGarName] = React.useState<string>('');
  const [SGarLoc, setGarLoc] = React.useState<string>('');
  const [SGarType, setGarType] = React.useState<string>('Mobil dan Motor');
  const [SOpenHour, setOpenHour] = React.useState<string>('');
  const [Swebsite, setWebsite] = React.useState<string>('');
  const [SOpenDay, setOpenDay] = React.useState<string>('');
  const [SButton, setButton] = React.useState<boolean>(false);
  const [SGarageImage, setGarageImage] = React.useState<string>();
  const [ImageUpload, setImageUpload] = React.useState<boolean>(false);
  const [opentext, setOpenText] = React.useState<string>('Open Hour');
  const [closetext, setCloseText] = React.useState<string>('Close Hour');
  const [isOpenDatePickerVisible, setOpenDatePickerVisibility] = React.useState(false);
  const [isCloseDatePickerVisible, setCloseDatePickerVisibility] = React.useState(false);
  const [SModal, setModal] = React.useState<boolean>(false);
  const [selectedStartDay, setSelectedStartDay] = React.useState<string>("Senin");
  const [selectedEndDay, setSelectedEndDay] = React.useState<string>("Senin");
  const [retry, setRetry] = React.useState<boolean>(false);
  const [locationModal, setLocationModal] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  React.useEffect(() =>{
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        ToastAndroid.show('Permission to access location was denied', ToastAndroid.SHORT);
        return;
      }
      do{
        setTimeout(() => setRetry(true), 3000);
        const location = await Location.getCurrentPositionAsync({});
        if(location != undefined){
          dispatch(setCustLocation({latitude: location['coords']['latitude'], longitude: location['coords']['longitude']}));
        }else{
          setRetry(true);
        }
      }while(retry == true);
 
    })();
  },[]);

  function addZero(i : any) {
    if (i < 10) {i = "0" + i}
    return i;
  }

  const isComponentMounted = useComponentDidMount();

  const handleOpenConfirm = (opendate : Date) => {
    const currentDate = opendate;

    let tempDate = new Date(currentDate);
    let ftime = addZero(tempDate.getHours()) + ':' + addZero(tempDate.getMinutes());
    setOpenText(ftime);
    setOpenDatePickerVisibility(false);
  };

  const handleCloseConfirm = (closedate : Date) => {
    const currentDate = closedate;

    let tempDate = new Date(currentDate);
    let ftime = addZero(tempDate.getHours()) + ':' + addZero(tempDate.getMinutes());
    setCloseText(ftime);
    setCloseDatePickerVisibility(false);
  };

  React.useEffect(() => {
    if(isComponentMounted){
      setButton(SGarName !== '' 
      && SGarLoc !== ''  && SGarType !== ''  && opentext !== 'Open Hour'
      && closetext !== 'Close Hour')
    }
  },[SGarName, SGarLoc,  SGarType, closetext, opentext])

  fields = [setGarName, setWebsite, setGarLoc, 
    setGarType, setOpenHour, setOpenDay]

  for(let i = 0; i <= icon_list.length - 1; i++){
    if(icon_list[i] == 'garage' || icon_list[i] == 'wrench'){
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
    }else if(icon_list[i] === 'car'){
      Content.push(
        <View style={Style.flexHorizontal} key={"View" + i}>
          <MIcon 
            name={icon_list[i]} 
            size={30} 
            style={Style.icon}
            color="#fff"
            key={"Icon" + i}/>
          <View style={[Style.pickerLayout, {flex:4, marginLeft:-8}]}>
            <Picker
              style={Style.pickerFont}
              selectedValue={SGarType}
              mode={"dialog"}
              onValueChange={(itemValue) => setGarType(itemValue)}
            >
            <Picker.Item label="Mobil dan Motor" value="car-motor"/>
            <Picker.Item label="Mobil" value="car"/>
            <Picker.Item label="Motor" value="motor"/>
            </Picker>
          </View>
        </View>
      )
    }else if(icon_list[i] === 'location'){
      Content.push(
        <View style={Style.flexHorizontal} key={"View" + i}>
          <Icon 
            name={icon_list[i]} 
            size={30} 
            style={Style.icon}
            color="#fff"
            key={"Icon" + i}/>
          <TouchableWithoutFeedback 
            onPress={() => setLocationModal(true)}>
            <View style={{flex:4, marginLeft:-8}}>
              <TextInput 
                autoComplete={autocomplete_list[i]}
                editable={false}
                maxLength={maxLength[i]}
                placeholder={placeholder_list[i]}
                placeholderTextColor="#fff"
                value={SGarLoc}
                style={[Style.textInp, {flex:0}]}
                key={"Input" + i}/>
            </View>
          </TouchableWithoutFeedback>
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
          <View style={{flex:4, flexDirection:'row', marginLeft:-8}}>
            <TouchableOpacity style={{flex:1}} onPress={() => setOpenDatePickerVisibility(true)}>
              <View pointerEvents="none">
                <TextInput 
                editable={false}
                value={opentext}
                placeholder={opentext}
                placeholderTextColor="#fff"
                style={[Style.textInp, {marginRight:5}]}
                key={"Input" + i}/>
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isOpenDatePickerVisible}
              mode="time"
              onConfirm={handleOpenConfirm}
              onCancel={() => setOpenDatePickerVisibility(false)}
            />
            <TouchableOpacity onPress={() => setCloseDatePickerVisibility(true)} style={{flex:1}}>
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
              onCancel={() => setCloseDatePickerVisibility(false)}
            />
          </View>
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
            <View style={[Style.pickerLayout, {marginLeft:-3, marginRight:5}]}>
              <Picker
                style={Style.pickerFont}
                selectedValue={selectedStartDay}
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
            </View>
            
            <View style={[Style.pickerLayout]}>
              <Picker
                selectedValue={selectedEndDay}
                style={Style.pickerFont}
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

  const prevState = useAppSelector(state => state.garageData);
  const save_garage_data = (name : string, address : string, photoUrl : string, openHour : string, openDay : string, 
    site: string, location : {latitude: number, longitude: number}, speciality: string) => {
    dispatch(setUserAuth([...prevState,
      {
        id: prevState[prevState.length - 1].id + 1,
        name:name, 
        address:address,
        photoUrl: photoUrl,
        openHour:openHour,
        openDay:openDay,
        site:site,
        latitude: location.latitude,
        longitude: location.longitude,
        speciality: speciality,
        rating: 0,
        total_rating: 0,
      }
    ]))
  };

  const split_location = () => {
    const raw_loc = SGarLoc.split('(');
    const address = raw_loc[0].substring(0, raw_loc[0].length - 1);
    const geo = raw_loc[1].substring(1, raw_loc[1].length - 2);
    const split_geo = geo.split(',')
    const geolocation = {latitude: Number(split_geo[0]), 
      longitude: Number(split_geo[1].substring(1, split_geo[1].length))}
    return {address, geolocation};
  };

  const checkInput = () => {
    if(SButton == true && ImageUpload == true){
      
      if(selectedStartDay == selectedEndDay){
        setOpenDay('Setiap Hari');
      }else{
        setOpenDay(selectedStartDay + '-' + selectedEndDay);
      }

      if(opentext !== 'Open Hour' && closetext !== 'Close Hour'){
        if(opentext == closetext){
          setOpenHour('24 Jam');
        }else{
          setOpenHour(opentext + '-' + closetext)
        }
      }

      const location = split_location();
      
      save_garage_data(SGarName, location.address, SGarageImage, SOpenHour, SOpenDay, Swebsite, location.geolocation, SGarType);
      
      navigation.navigate('GarageMain');
    
    }else if(ImageUpload == false){
      Platform.OS === 'android' ? ToastAndroid.show('Tolong Masukkan Foto Bengkel Anda!!', ToastAndroid.SHORT) : Alert.alert("Please Upload Your ID Card!!")
    }else{
      Platform.OS === 'android' ? ToastAndroid.show('Please Fill All Required Field!!', ToastAndroid.SHORT) : Alert.alert("Please Fill All Required Field!!")
    }
  };

  return(
      <ScrollView>
        <View style={{ alignItems: 'center'}}>
          <KeyboardAvoidingView>
            <LocationModal 
              visibleModal={locationModal} 
              setVisibleModal={setLocationModal}
              setOutputState={setGarLoc}
            />
              <Image 
                  source={require("../../assets/images/blogo.png")}
                  style={[Style.logo]}/>
              <View style={Style.flexVertical}>
                  {Content}
              </View>
              <View style={{ paddingHorizontal:35, backgroundColor:"#434647", marginTop: 30, paddingBottom: 10, flex:1}}>
                <AccessPhoto
                  photoState={SGarageImage}
                  setPhotoState={setGarageImage}
                  setImageUploaded={setImageUpload}
                  visibleModal={SModal}
                  setVisibleModal={setModal}
                  title="Masukkan Foto Bengkel Anda"
                />
              </View>
              <View
                  style={Style.button}>
                  <Button 
                      title="Daftar Sekarang"
                      color="#b99504"
                      onPress={() => checkInput()}/>
              </View>
              <Text style={Style.signText}> Sudah Punya Akun?? 
                <Text 
                    style={{color:"#b99504"}}
                    onPress={()=>(navigation.navigate('Login'))}> Login </Text>
              </Text>
              <Text style={[Style.signText, {marginBottom: 60, marginTop:6}]}> Lanjut Daftar Sebagai Customer??
                <Text 
                    style={{color:"#b99504"}}
                    onPress={()=>(navigation.navigate('Register'))}> Disini </Text>
              </Text>
        </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
};

export function Login(){

  const navigation = useNavigation<LoginType>();
  const [SEmail, setEmail] = React.useState<string>('');
  const [SPassword, setPassword] = React.useState<string>('');
  const [SButton, setButton] = React.useState<boolean>(false);
  const [SDisplay, setDisplay] = React.useState<boolean>(false);
  
  const EXISTING_USER = useAppSelector(state => state.userAuth);
  const isComponentMounted = useComponentDidMount(); 
  const dispatch = useAppDispatch();
  
  React.useEffect(() => {
    if(isComponentMounted){
      setButton(SEmail !== '' && SPassword !== '')
    }
  },[SEmail, SPassword])

  const checkInput = () => {
    if(SButton == true){
      const isExist = EXISTING_USER.find((val) => val.email === SEmail && val.password === SPassword);
      if(isExist){
        if(isExist.role === 'Customer'){
          dispatch(setActiveStatus({role:'Customer', id:isExist.id}));
          navigation.navigate('CustomerMain');
        }else if(isExist.role === 'Mechanic'){
          dispatch(setActiveStatus({role:'Mechanic', id:isExist.id}));
          navigation.navigate('MechanicMain');
        }else if(isExist.role === 'Garage'){
          dispatch(setActiveStatus({role:'Garage', id:isExist.id}));
          navigation.navigate('GarageMain');
        }
      }else{
        setDisplay(true);
        setEmail('');
        setPassword('');
      }
    }else{
      Platform.OS === 'android' ? ToastAndroid.show('Please Fill All Required Field!!', ToastAndroid.SHORT) : Alert.alert("Please Fill All Required Field!!")
    }      
  };

  return(
    <ScrollView>
      <View style={{ alignItems: 'center' }}>
        <KeyboardAvoidingView>
            <Image 
                source={require("../../assets/images/mehanic.png")}
                style={[Style.logoVector, {marginBottom: -80}]}/>
            <Image 
                source={require("../../assets/images/blogo.png")}
                style={[Style.logo, {marginBottom: -70}]}/>
            <View style={Style.flexVertical}>
                <View style={Style.flexHorizontal}>
                    <Icon 
                        name={"mail"} 
                        size={40} 
                        style={Style.icon}
                        color="#fff"/>
                    <TextInput 
                        autoComplete={"email"}
                        maxLength={40}
                        value={SEmail}
                        autoCapitalize={'none'}
                        placeholder={"Masukkan Email Anda Disini"}
                        placeholderTextColor="#fff"
                        onChangeText={(value) => setEmail(value)}
                        style={Style.textInp}
                        key={"InputEmail"}/>
                    </View>
                
                <View style={Style.flexHorizontal}>
                    <Icon 
                        name={"shield"} 
                        size={30} 
                        style={Style.icon}
                        color="#fff"/>
                    <TextInput 
                        autoComplete={"password"}
                        maxLength={20}
                        value={SPassword}
                        placeholder={"Masukkan Password Anda Disini"}
                        placeholderTextColor="#fff"
                        onChangeText={(value) => setPassword(value)}
                        autoCapitalize={"none"}
                        secureTextEntry={true}
                        style={Style.textInp}
                        key={"inputPassword"}/>
                    </View>
            </View>
            <View
                style={Style.button}>
                {SDisplay === true ? 
                  <ImportantText 
                    title="Email atau Password tidak dapat ditemukan"/>
                  :
                <View style={{display:'none'}}>
                  <ImportantText title="Email atau Password tidak dapat ditemukan"/>
                </View>
                }
                <Button 
                    title="Login"
                    color="#b99504"
                    onPress={() => checkInput()}/>
            </View>
            <Text style={Style.signText}> Belum Punya Akun? 
              <Text 
                  style={{color:"#b99504"}}
                  onPress={()=>(navigation.navigate('Register'))}> Daftar </Text>
            </Text>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
    );
};
