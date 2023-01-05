import call from 'react-native-phone-call';
import * as Location from 'expo-location';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import MapView, { Marker } from 'react-native-maps';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../RootStackParamList';
import { CustomText } from "../../Component/CustomText";
import { View, Alert,
  TouchableOpacity, Dimensions, Modal, ScrollView, TouchableWithoutFeedback, FlatList} from "react-native";
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

const Item = ({description, quantity, price}) => {
  return(
    <View style={{flexDirection:'row', flex:5, padding:15, alignItems:'center'}}>
      <CustomText title={description} size={15} color='#919b9f' style={{flex:2, marginBottom:0, marginLeft:0, textAlign:'left'}}/>
        <View style={{flex:1, flexDirection:'row'}}>
          <CustomText title={'Rp. ' + price} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
          <CustomText title={' x '} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
          <CustomText title={'('+ quantity + ')'} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
        </View>
      <CustomText title={'Rp. ' + price * quantity} size={15} color='#919b9f' style={{flex:2, marginLeft:0, marginBottom:0, textAlign:'right'}}/>
    </View>
  )
}

export default function MechanicOrder(){

  const latitude = useAppSelector(state => state.latitude);
  const longitude = useAppSelector(state => state.longitude);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MechanicOrderType>();
  const [retry, setRetry] = React.useState<boolean>(false);
  const [estimationModal, setEstimationModal] = React.useState<boolean>(false);
  const [cancelModal, setCancelModal] = React.useState<boolean>(false);

  const renderItem = ({ item }) => {
    return(
      <Item
        description = {item.description}
        quantity = {item.quantity}
        price = {item.price}/>
    )
  }

  let distance : number = 2.4;
  let service_cost : number = 0;
  let CostList : any = [
    {
      description:'Bensin', 
      quantity:5, 
      price:10000
    },
    {
      description:'Bensin', 
      quantity:5, 
      price:10000
    },
    {
      description:'Bensin', 
      quantity:5, 
      price:10000
    },
    {
      description:'Bensin', 
      quantity:5, 
      price:10000
    },
    {
      description:'Bensin', 
      quantity:5, 
      price:10000
    },
    {
      description:'Bensin', 
      quantity:5, 
      price:10000
    },
    {
      description:'Bensin', 
      quantity:5, 
      price:10000
    },
    {
      description:'Perjalanan',
      quantity:distance,
      price: 2000,
    }
  ];

  for(let i = 0; i <= CostList.length - 1; i++){
    service_cost += CostList[i].quantity * CostList[i].price;
  };
  
  React.useEffect(() =>{
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        Alert.alert('Permission to access location was denied');
        return;
      }
      do{
        setTimeout(() => setRetry(true), 3000);
        const location = await Location.getCurrentPositionAsync({});
        if(location != undefined){
          dispatch(setLatitude(location['coords']['latitude']));
          dispatch(setLongitude(location['coords']['longitude']));
        }else{
          setRetry(true);
        }
      }while(retry == true);
 
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
            style={[Style.mapView, {width:Dimensions.get('window').width}]}
          >
            <Marker
             coordinate={{ latitude: latitude, longitude: longitude }}
             title={'Lokasi Anda'}
            >
              <View style={Style.avatarMarker}>
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
                onPress={()=>{setEstimationModal(true)}}/>
              <View style={{flexDirection:'column', flex:1}}>
                <CustomButton 
                  title="Panggil Derek"
                  style={{borderRadius:30}}
                  textStyle={{fontWeight:'700'}}/>
                <CustomButton 
                  title="Batalkan Pesanan"
                  style={{borderRadius:30, backgroundColor:'#b41d12'}}
                  textStyle={{fontWeight:'700'}}
                  onPress={() => setCancelModal(true)}/>
              </View>
            </View>
          </View>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={cancelModal}
          onRequestClose={() => setCancelModal(!cancelModal)}>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <View style={{backgroundColor:'#fefefe', padding:20, borderRadius:20, zIndex:1}}>
              <CustomText title="Apakah anda ingin membatalkan pesanan?" size={20}/>
              <View style={{marginTop:20, flexDirection:'row', justifyContent:'space-evenly'}}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setCancelModal(false)}>
                  <View>
                    <View style={{padding:15, borderRadius:50, backgroundColor:'#b99504'}}>
                      <Icon name="cross" size={25} color="#fefefe"/>
                    </View>
                    <CustomText title="Tidak" size={15} color="black" style={{marginVertical:5, marginLeft:0}}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7}> 
                  <View>
                    <View style={{padding:15, borderRadius:50, backgroundColor:'#3676a2'}}>
                      <Icon name="check" size={25} color="#fefefe"/>
                    </View>
                    <CustomText title="Ya" size={15} color="black" style={{marginVertical:5, marginLeft:0}}/>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableWithoutFeedback onPress={() => setCancelModal(false)}>
              <View style={{position:'absolute', top:0, bottom:0, left:0, right:0, backgroundColor:'rgba(71, 76, 78, 0.8)'}}/>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={estimationModal}
          onRequestClose={() => setEstimationModal(!estimationModal)}>
          <View style={Style.modalMaskLayout}>
            <TouchableWithoutFeedback onPress={() => setEstimationModal(false)}>
              <View style={Style.modalMask}/>
            </TouchableWithoutFeedback>
              <View style={Style.modalLayout}>
                <TouchableOpacity onPress={() => setEstimationModal(false)}>
                  <View style={Style.modalClose}>
                    <Icon name='cross' size={30} color='#9ca8ac'/>
                  </View>
                </TouchableOpacity>
                <CustomText 
                  title="Estimasi Biaya" 
                  color="black" 
                  size={20}
                  style={Style.modalTitle}/>
                <View style={Style.modalListLayout}>
                  <FlatList
                    data={CostList}
                    renderItem={renderItem}
                    nestedScrollEnabled/>
                </View>
                <View style={Style.modalMetaContainer}>
                  <View style={Style.modalTotalLayout}>
                    <CustomText
                      title="Estimasi Total Biaya"
                      color="black"
                      size={15}
                      style={{flex:1, textAlign:'left'}}
                      />
                    <CustomText
                      title={'Rp. ' + service_cost}
                      color="black"
                      size={15}
                      style={{flex:1, textAlign:'right'}}
                      />
                  </View>
                  <View style={{flex:2}}>
                    <View style={Style.modalButtonLayout}>
                      <CustomButton 
                        title="Tambah Pesanan" 
                        style={{flex:1}} 
                        textStyle={Style.modalButtonText}/>
                      <CustomButton 
                        title="Konfirmasi Pesanan" 
                        style={{flex:1, backgroundColor:'#59a540'}} 
                        textStyle={Style.modalButtonText}/>
                    </View>
                  </View>
                </View>
              </View>
          </View>
        </Modal>
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

