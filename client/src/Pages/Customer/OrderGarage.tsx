import { View, Image, 
  Alert, ToastAndroid, Platform, TouchableWithoutFeedback, } from "react-native";
import { Location } from '../../Component/Location';
import React from 'react';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../../Styles/CustomerStyle/OrderGarage";
import { RootStackParamList } from '../RootStackParamList';
import { CustomText, ImportantText } from "../../Component/CustomText";
import { CustomButton, LogoButton } from "../../Component/CustomButton";
import { useAppDispatch, useAppSelector } from "../../../redux";
import { setOrderCreated } from "../../../redux/component/orderCreated";
import { setTransaction } from "../../../redux/component/transaction";

type OrderGarageType = StackNavigationProp<RootStackParamList, 'OrderGarage'>

export default function OrderGarage(props : any){

  const navigation = useNavigation<OrderGarageType>();
  const dispatch = useAppDispatch();

  const activeUser = useAppSelector(state => state.activeStatus);
  const all_user = useAppSelector(state => state.userAuth);
  const curr_user = all_user.find((item) => item.id == activeUser.id);

  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [vehicle, setVechicle] = React.useState<string>('');
  const [vehicleColor, setVehicleColor] = React.useState<string>('#b1b5c1');
  const [carColor, setCarColor] = React.useState<string>('#b1b5c1');
  const [motorColor, setMotorColor] = React.useState<string>('#b1b5c1');
  const [locationModal, setLocationModal] = React.useState<boolean>(false);
  const garageType : string = props.route.params.handleType;

  const transaction = useAppSelector(state => state.transaction);
  
  let Content : any[] = [];

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
      const new_transaction = transaction.map((item : any) => {return {...item}})
      const location = searchQuery.split('|')
      const address = location[0].trim();
      const geolocation = location[1].split(', ');
      const lat = Number(geolocation[0].trim());
      const long = Number(geolocation[1].trim());
      dispatch(setTransaction([
        {
          id:new_transaction[0] + 1,
          cust_id: curr_user.id,
          mechanicId: null,   //update this
          garageId: null,     //update this
          roomTopic: new_transaction[0] + 1,
          towingId: null,
          fixId: null,
          handle_type : vehicle,
          trans_start_dt: new Date().toLocaleString(),
          trans_end_dt: null,
          pickup_latitude: lat,
          pickup_longitude: long,
          pickup_address: address,
          service_cost: null,
          customer_paid: null,
          rating: null,
        }, ...new_transaction]
      ))
      dispatch(setOrderCreated(true));
      navigation.navigate('CustomerMain');
    }
  }

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
      <TouchableWithoutFeedback 
        onPress={() => {setLocationModal(true)}}>
        <View style={{width:'100%'}}>
          <Searchbar
            editable={false}
            placeholder="Lokasi Anda"
            onFocus={() => setLocationModal(true)}
            style={{width: '90%',backgroundColor:'#fff', borderRadius: 30}}
            value={searchQuery}/>
          </View>
      </TouchableWithoutFeedback>
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
    <Location 
      visibleModal={locationModal} 
      setVisibleModal={setLocationModal}
      setOutputState={setSearchQuery}
    />
  </View>
  )
};
