import { View, KeyboardAvoidingView, Image,
  Alert, ScrollView, ToastAndroid, Platform} from "react-native";
import React from 'react';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../Styles/orderStyle";
import { RootStackParamList } from './RootStackParamList';
import { CustomText, ImportantText } from "../Component/CustomText";
import { CustomButton, LogoButton } from "../Component/CustomButton";

type OrderType = StackNavigationProp<RootStackParamList, 'Order'>

export default function Order(props : any){

  const navigation = useNavigation<OrderType>();
  
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [vehicle, setVechicle] = React.useState<string>('');
  const [vehicleColor, setVehicleColor] = React.useState<string>('#b1b5c1');
  const [carColor, setCarColor] = React.useState<string>('#b1b5c1');
  const [motorColor, setMotorColor] = React.useState<string>('#b1b5c1');
  const [garageType, setGarageType] = React.useState<string>(props.route.params.handleType);

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
  
  const onChangeSearch = (query : string) => setSearchQuery(query);
  const validateOrder = () => {
    if(vehicle == '' || searchQuery == ''){
      Platform.OS === 'android' ? 
        ToastAndroid.show('Tolong Pilih Jenis Kendaraan dan Pastikan Lokasi Anda Tepat', ToastAndroid.LONG) : Alert.alert('Tolong Pilih Jenis Kendaraan dan Pastikan Lokasi Anda Tepat')
    }else{
      navigation.navigate('Waiting');
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
        <Searchbar
          placeholder="Lokasi Anda"
          onChangeText={onChangeSearch}
          style={{width: '90%',backgroundColor:'#fff', borderRadius: 30}}
          value={searchQuery}/>
      </View>

      <View style={{flex:5}}>
        <Image 
            style={{width:350, height:250}}
            source={require("../../assets/images/relaxMechanic.png")}/>
        <CustomText title='Pilih Jenis Kendaraan Anda' color={'white'} size={20}/>
        {Content}
      </View>
      <View style={Style.orderSection}>
        <ImportantText title="Pastikan Lokasi Dan Kendaraan Anda Tepat!!"/>
        <CustomButton title="Pesan Sekarang" onPress={() => validateOrder()}/>
      </View>
    </View>
  </View>
  )
};
