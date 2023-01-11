import { View, Image, Modal, TextInput,
  Alert, ToastAndroid, Platform, TouchableOpacity, TouchableWithoutFeedback, Dimensions} from "react-native";
import React from 'react';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../../Styles/CustomerStyle/OrderGarage";
import { RootStackParamList } from '../RootStackParamList';
import { CustomText, ImportantText } from "../../Component/CustomText";
import { CustomButton, LogoButton } from "../../Component/CustomButton";
import { useAppDispatch, useAppSelector } from "../../../redux";
import { setCustMechanic } from "../../../redux/component/custMechanic";
import { setOrderCreated } from "../../../redux/component/orderCreated";
import Icon from "react-native-vector-icons/Entypo";
import MapView, { Marker } from "react-native-maps";

type OrderGarageType = StackNavigationProp<RootStackParamList, 'OrderGarage'>

export default function OrderGarage(props : any){

  const navigation = useNavigation<OrderGarageType>();
  const dispatch = useAppDispatch();
  
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [vehicle, setVechicle] = React.useState<string>('');
  const [vehicleColor, setVehicleColor] = React.useState<string>('#b1b5c1');
  const [carColor, setCarColor] = React.useState<string>('#b1b5c1');
  const [motorColor, setMotorColor] = React.useState<string>('#b1b5c1');
  const [locationModal, setLocationModal] = React.useState<boolean>(false);
  const [addressLoc, setAddressLoc] = React.useState<string>();
  const garageType : string = props.route.params.handleType;

  let Content : any[] = [];
  const latitude = useAppSelector(state => state.latitude);
  const longitude = useAppSelector(state => state.longitude);

  React.useEffect(()=>{
    if(vehicle == 'Mobil'){
      setCarColor('rgba(177, 181, 193, 0.5)')
      setVehicleColor('rgba(177, 181, 193, 0.5)')
      setMotorColor('#b1b5c1')
    }if(vehicle == 'Motor'){
      setMotorColor('rgba(177, 181, 193, 0.5)')
      setVehicleColor('rgba(177, 181, 193, 0.5)')
      setCarColor('#b1b5c1')
    }
  },[vehicle])
  
  const validateOrder = () => {
    if(vehicle == '' || searchQuery == ''){
      Platform.OS === 'android' ? 
        ToastAndroid.show('Tolong Pilih Jenis Kendaraan dan Pastikan Lokasi Anda Tepat', ToastAndroid.LONG) : Alert.alert('Tolong Pilih Jenis Kendaraan dan Pastikan Lokasi Anda Tepat')
    }else{
      dispatch(setCustMechanic(
        [
          {
            id:1,
            name: 'Christoper Luis Alexander',
            location: 'MH Thamrin Jakarta Pusat',
            photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
            trans_end_dt: null,
          }
        ]
      ))
      dispatch(setOrderCreated(true));
      navigation.navigate('CustomerMain');
    }
  }

  let _map: any;
  const fitCamera = () => {
    _map.fitToCoordinates([{latitude: latitude, longitude: longitude}], {edgePadding: {top:50, right:50, left:50, bottom:50}, animated: true}) }

  if(garageType == 'Mobil' || garageType == 'Motor'){
      Content.push(
        <View style={Style.vehicleStyle}>
          <LogoButton 
            style={{backgroundColor: vehicleColor}} 
            onPress={()=>setVechicle(garageType)} 
            iconName={garageType == 'Mobil' ? 'car' : 'motorcycle'}
            btnTitle={garageType}/>
        </View>
      )
  }else{
      Content.push(
        <View style={Style.vehicleStyle}>
          <LogoButton 
            style={{backgroundColor: carColor}} 
            onPress={()=>setVechicle('Mobil')} 
            iconName='car'
            btnTitle="Mobil"/>
          <LogoButton 
            style={{backgroundColor: motorColor}} 
            onPress={()=>setVechicle('Motor')} 
            iconName='motorcycle'
            btnTitle="Motor"/>
        </View>
      )
  } 

  return(
  <View style={{flex:7,paddingHorizontal: 5}}>
    <View style={{alignItems: 'center', flex:1 }}>
      <View style={Style.searchSection}>
        <Searchbar
          placeholder="Lokasi Anda"
          onFocus={() => setLocationModal(true)}
          style={{width: '90%',backgroundColor:'#fff', borderRadius: 30}}
          value={searchQuery}/>
      </View>
      <View style={{flex:5}}>
        <Image 
            style={{width:350, height:250}}
            source={require("../../../assets/images/relaxMechanic.png")}/>
        <CustomText title='Pilih Jenis Kendaraan Anda' color={'white'} size={20}/>
        {Content}
      </View>
      <View style={Style.orderSection}>
        <ImportantText title="Pastikan Lokasi Dan Kendaraan Anda Tepat!!"/>
        <CustomButton title="Pesan Sekarang" onPress={() => validateOrder()}/>
      </View>
    </View>
    <Modal
      animationType="fade"
      transparent={true}
      visible={locationModal}
      onRequestClose={() => setLocationModal(!locationModal)}
    >
      <View style={Style.modalMaskLayout}>
        <TouchableWithoutFeedback onPress={() => setLocationModal(false)}>
          <View style={Style.modalMask}/>
        </TouchableWithoutFeedback>
          <View style={Style.modalLayout}>
            <TouchableOpacity onPress={() => setLocationModal(false)}>
              <View style={Style.modalClose}>
                <Icon name='cross' size={30} color='#9ca8ac'/>
              </View>
            </TouchableOpacity>
            <CustomText 
              title="Lokasi Anda" 
              color="black" 
              size={20}
              style={Style.modalTitle}/>
            <View style={Style.modalMetaContainer}>
              <View style={Style.modalTotalLayout}>
                <CustomText
                  title="Alamat :"
                  color="black"
                  size={15}
                  style={{flex:1, textAlign:'left'}}
                  />
                <TextInput 
                  onChangeText={setAddressLoc} 
                  value={addressLoc}
                  style={{marginTop:-10, flex:3, borderBottomWidth:0.3,  marginRight:15, fontSize:15}}
                  />
              </View>
              <View>
                <MapView
                  initialRegion={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                  }}
                  ref={(ref) => _map = ref}
                  style={{ 
                      height:160,
                      marginVertical:15,
                      justifyContent:'center'}}
                >
                  <Marker
                    draggable
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title={'Lokasi Anda'}
                  >
                  <Icon name={'location-pin'} size={50} color={'#4eacea'}/>
                  </Marker>
                </MapView>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {fitCamera()}}
                  style={{position:'absolute',left:8, bottom:45}}>
                  <View style={Style.floatingButtonLayout}>
                    <Icon name="hair-cross" size={30} color="rgba(58, 68, 71, 1)"/>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex:1}}>
                <View style={Style.modalButtonLayout}>
                  <CustomButton 
                    title="Pasang Lokasi Ini" 
                    style={{flex:1, backgroundColor:'#59a540'}} 
                    textStyle={Style.modalButtonText}
                  />
                </View>
              </View>
            </View>
          </View>
      </View>
    </Modal>
  </View>
  )
};
