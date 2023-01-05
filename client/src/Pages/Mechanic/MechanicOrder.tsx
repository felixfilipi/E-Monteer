import call from 'react-native-phone-call';
import * as Location from 'expo-location';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import MapView, { Marker } from 'react-native-maps';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../RootStackParamList';
import { CustomText } from "../../Component/CustomText";
import { View, Alert,
  TouchableOpacity, Dimensions} from "react-native";
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { useNavigation } from "@react-navigation/native";
import { setLatitude } from "../../../redux/component/latitude";
import { setLongitude } from "../../../redux/component/longitude";
import Style from "../../Styles/MechanicStyle/MechanicOrder";
import { CustomButton } from '../../Component/CustomButton';

type MechanicOrderType = StackNavigationProp<RootStackParamList, 'MechanicOrder'>

const DATA = [
  {
    id:1,
    MechanicName: 'Christoper Luis Alexander',
    Garage: 'Bengkel Cepi Jaya',
    photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
    latitude: -6.17524,
    longitude: 106.82715,
    CustomerPhone: '087892314322',
  },
]

const args = {
  number: DATA[0].CustomerPhone,
  prompt: false,
  skipCanOpen: true
}

export default function MechanicOrder(){

  const latitude = useAppSelector(state => state.latitude);
  const longitude = useAppSelector(state => state.longitude);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MechanicOrderType>();
  const [retry, setRetry] = React.useState<boolean>(false);
 
  React.useEffect(() =>{
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        Alert.alert('Permission to access location was denied');
        return;
      }
      do{
        const location = await Location.getCurrentPositionAsync({});
        if(location != undefined){
          dispatch(setLatitude(location['coords']['latitude']));
          dispatch(setLongitude(location['coords']['longitude']));
          if(!latitude && !longitude){
            setTimeout(() => {setRetry(true)}, 1000);
          }else{
            setRetry(false);
          }
        }
      }while(retry == true)
 
    })();
  },[]);

  let _map: any;

  const fitCamera = () => {
    _map.fitToCoordinates([{latitude: latitude, longitude: longitude},{latitude:DATA[0].latitude, longitude:DATA[0].longitude}], {edgePadding: {top:50, right:50, left:50, bottom:50}, animated: true})
  }

    if(latitude && longitude){
    return(
      <View style={{flex:5}}>
        <View style={{flex:2}}>
          <MapView
            initialRegion={{
            latitude:  (latitude + DATA[0].latitude) / 2,
            longitude: (longitude + DATA[0].longitude) / 2, 
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            }}
            ref={(ref) => _map = ref}
            onMapReady={fitCamera}
            style={[Style.MapView, {width:Dimensions.get('window').width}]}
          >
            <Marker
             coordinate={{ latitude: latitude, longitude: longitude }}
             title={'Lokasi Anda'}
            >
              <View style={Style.AvatarMarker}>
                <Avatar.Image 
                  size={30} 
                  source={{uri: DATA[0].photoUrl}}/>
              </View>
            </Marker>
            <Marker
             coordinate={{ latitude: DATA[0].latitude, longitude: DATA[0].longitude }}
             title={'Lokasi Kejadian'} 
            >
            <Icon name={'location-pin'} size={50} color={'#ff522b'}/>
            </Marker>
          </MapView>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {navigation.navigate('MechanicMain')}}
            style={[Style.FloatingButton, {bottom: 25}]}>
            <View style={Style.FloatingButtonLayout}>
              <Icon name="chevron-left" size={30} color="rgba(58, 68, 71, 1)"/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {fitCamera()}}
            style={[Style.FloatingButton, {bottom: 75}]}>
            <View style={Style.FloatingButtonLayout}>
              <Icon name="hair-cross" size={30} color="rgba(58, 68, 71, 1)"/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={Style.commandContainer}>
          <View style={Style.contactContainer}>
            <Avatar.Image size={60} source={{uri: DATA[0].photoUrl}}/>
            <View style={Style.contactLayout}>
              <CustomText title={DATA[0].MechanicName} size={17} color="black" style={Style.contactText}/>
              <CustomText title={DATA[0].Garage} size={12} color="#85898f" style={[Style.contactText]}/>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => call(args).catch(console.error)}>
              <Icon name='phone' size={25} color="#fefefe" style={Style.contactIcon}/>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => {navigation.navigate('Chat')}}>
              <Icon name='chat' size={25} color="#fefefe" style={[Style.contactIcon, {marginLeft:5}]}/>
            </TouchableOpacity>
          </View>

          <View style={Style.commandLayout}>
            <View style={Style.commandVerticalLayout}>
              <CustomButton 
                title="Buat Estimasi Pembayaran" 
                style={Style.estimateButton}
                textStyle={Style.estimateButtonText}
                onPress={()=>{navigation.navigate('CostList')}}/>
              <View style={{flexDirection:'column', flex:1}}>
                <CustomButton 
                  title="Panggil Derek"
                  style={{borderRadius:30}}
                  textStyle={{fontWeight:'700'}}/>
                <CustomButton 
                  title="Batalkan Pesanan"
                  style={{borderRadius:30, backgroundColor:'#b41d12'}}
                  textStyle={{fontWeight:'700'}}/>
              </View>
            </View>
          </View>
        </View>
      </View>
      );
    }else{
    return(
      <View style={Style.loading}>
        <CustomText 
          title="Sedang Memuat"
          color={'white'}
          style={{fontSize:20}}/>
        <ActivityIndicator animating={true} color={'#b99504'} size={30}/>
      </View>
    )
  }
};

