import { View, KeyboardAvoidingView, Image,
  Alert, Text, ScrollView, TouchableOpacity, ToastAndroid, Platform} from "react-native";
import React from 'react';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from "../Styles/orderStyle";
import { RootStackParamList } from './RootStackParamList';

type OrderType = StackNavigationProp<RootStackParamList, 'Order'>

export default function Order(){

  const navigation = useNavigation<OrderType>();
  
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [vehicle, setVechicle] = React.useState<string>('');
  const [carColor, setCarColor] = React.useState<string>('#b1b5c1');
  const [motorColor, setMotorColor] = React.useState<string>('#b1b5c1');

  React.useEffect(()=>{
    if(vehicle == 'mobil'){
      setCarColor('rgba(177, 181, 193, 0.5)')
      setMotorColor('#b1b5c1')
    }if(vehicle == 'motor'){
      setMotorColor('rgba(177, 181, 193, 0.5)')
      setCarColor('#b1b5c1')
    }
  },[vehicle])
  
  const onChangeSearch = (query : string) => setSearchQuery(query);
  const validateOrder = () => {
    if(vehicle == '' || searchQuery == ''){
      Platform.OS === 'android' ? 
        ToastAndroid.show('Tolong Pilih Jenis Kendaraan dan Pastikan Lokasi Anda Tepat', ToastAndroid.LONG) : Alert.alert('Tolong Pilih Jenis Kendaraan dan Pastikan Lokasi Anda Tepat')
    }
  }

  return(
  <View style={{flex:1, paddingHorizontal: 5}}>
    <ScrollView contentContainerStyle={{flexGrow:1}}>
      <View style={{ alignItems: 'center'}}>
        <KeyboardAvoidingView>
          <View style={Style.searchSection}>
            <Searchbar
              placeholder="Lokasi Anda"
              onChangeText={onChangeSearch}
              style={{backgroundColor:'#fff', borderRadius: 30}}
              value={searchQuery}/>
          </View>

          <View style={{flex:4}}>
            <Image 
                style={{width:350, height:250}}
                source={require("../../assets/images/relaxMechanic.png")}/>
            <Text style={Style.descText}>Pilih Jenis Kendaraan Anda</Text>
              <View style={Style.vehicle}>
                <TouchableOpacity style={[Style.vehicleBtn, {backgroundColor: carColor}]}
                  onPress={()=>setVechicle('mobil')} activeOpacity={0.7}>
                  <Icon name="car" size={125} color='black'/>
                  <Text style={Style.ButtonText}> Mobil </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Style.vehicleBtn, {backgroundColor: motorColor}]} activeOpacity={0.7}
                  onPress={()=>setVechicle('motor')}>
                  <Icon name="motorcycle" size={125} color='black'/>
                  <Text style={Style.ButtonText}> Motor </Text>
                </TouchableOpacity>
              </View>
          </View>

          <View style={Style.orderSection}>
              <View style={{flexDirection:'row', marginLeft:10}}>
                <Icon name="warning" size={20} color='#c70003'/>
                <Text style={Style.importantText}> Pastikan Lokasi Dan Kendaraan Anda Tepat!! </Text>
              </View>
              <TouchableOpacity style={Style.orderBtn} activeOpacity={0.7}
                onPress={() => validateOrder()}>
                <Text style={Style.orderText}>Pesan Sekarang</Text>
              </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  )
};
