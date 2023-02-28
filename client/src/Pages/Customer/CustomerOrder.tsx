import call from 'react-native-phone-call';
import * as Location from 'expo-location';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import MapView, { Marker } from 'react-native-maps';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../RootStackParamList';
import { CustomText } from "../../Component/CustomText";
import { View, TouchableOpacity, Dimensions, ToastAndroid} from "react-native";
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { useNavigation } from "@react-navigation/native";
import Style from "../../Styles/MechanicStyle/MechanicOrder";
import { CustomButton } from '../../Component/CustomButton';
import { Confirmation, CostListConfirmation } from '../../Component/Confirmation';
import { setMechLocation } from '../../../redux/component/mechLocation';
import { setChatTarget } from '../../../redux/component/chatTarget';
import { setTowConfirm } from '../../../redux/component/towConfirm';
import { setAcceptCostList } from '../../../redux/component/acceptCostList';

type MechanicOrderType = StackNavigationProp<RootStackParamList, 'MechanicOrder'>

export default function CustomerOrder(props: any){

  const curr_transaction_id = props.route.params.id;
  const all_user = useAppSelector(state => state.userAuth);
  const transaction = useAppSelector(state => state.transaction);
  const garage = useAppSelector(state => state.garageData);
  const costList = useAppSelector(state => state.costListApp);

  const curr_transaction = transaction.find((item) => item.id == curr_transaction_id);
  const curr_mechanic = all_user.find((item) => item.id == curr_transaction.mechanicId);
  const curr_garage = garage.find((item) => item.id == curr_transaction.garageId);
  const curr_costList = costList.find((item) => item.id == curr_transaction.fixId)

  const costEstimationStatus = useAppSelector(state => state.acceptCostList);
  const mechLocation = useAppSelector(state => state.mechLocation);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MechanicOrderType>();

  const towStatus = useAppSelector(state => state.towConfirm);

  const [retry, setRetry] = React.useState<boolean>(false);
  const [cancelModal, setCancelModal] = React.useState<boolean>(false);
  const [towingModal, setTowingModal] = React.useState<boolean>(towStatus.sendConfirm);
  const [costListModal, setCostListModal] = React.useState<boolean>((curr_costList != null && costEstimationStatus.acceptCostList == null) ? true : false);
  
  const args = {
    number: curr_mechanic.phone,
    prompt: false,
    skipCanOpen: true
  }

  const towConfirmed = () => {
    dispatch(setTowConfirm({sendConfirm: false, receiveConfirm:true}))
    ToastAndroid.show("Derek akan segera dipanggil oleh montir", ToastAndroid.LONG);
    setTowingModal(false);
  }

  const onCostListConfirmed = () =>{
    dispatch(setAcceptCostList({acceptCostList:true, id:curr_transaction.id}))
    ToastAndroid.show("Anda Telah Menyetujui Estimasi Biaya", ToastAndroid.LONG)
    setCostListModal(false);
  }

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
          dispatch(setMechLocation({latitude: location['coords']['latitude'], longitude: location['coords']['longitude']}));
        }else{
          setRetry(true);
        }
      }while(retry == true);
 
    })();
  },[]);

  let _map: any;

  const fitCamera = () => {
    _map.fitToCoordinates([mechLocation,{latitude:curr_transaction.pickup_latitude, longitude:curr_transaction.pickup_longitude}], {edgePadding: {top:50, right:50, left:50, bottom:50}, animated: true})
  }

  const show_costList = [];
  for(let i = 0; i <= curr_costList.description.length - 1; i++){
    show_costList.push(
      {
        id: i+1,
        description: curr_costList.description[i],
        price: curr_costList.price[i],
        quantity: curr_costList.quantity[i],
      }
    )

  }

    if(mechLocation.latitude && mechLocation.longitude){
    return(
      <View style={{flex:1}}>
        <View style={{flex:3}}>
          <MapView
            initialRegion={{
            latitude:  (mechLocation.latitude + curr_transaction.pickup_latitude) / 2,
            longitude: (mechLocation.longitude + curr_transaction.pickup_longitude) / 2, 
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            }}
            ref={(ref) => _map = ref}
            onMapReady={fitCamera}
            style={[Style.mapView, {width:Dimensions.get('window').width}]}
          >
            <Marker
              draggable
             coordinate={{latitude: mechLocation.latitude, longitude: mechLocation.longitude}}
             title={'Lokasi Anda'}
            >
              <View style={Style.avatarMarker}>
                <Avatar.Image 
                  size={30} 
                  source={{uri: curr_mechanic.photoUrl}}/>
              </View>
            </Marker>
            <Marker
              draggable
             coordinate={{ latitude: curr_transaction.pickup_latitude, longitude: curr_transaction.pickup_longitude }}
             title={'Lokasi Kejadian'} 
            >
            <Icon name={'location-pin'} size={50} color={'#ff522b'}/>
            </Marker>
          </MapView>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {navigation.navigate('CustomerMain')}}
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
            <Avatar.Image size={60} source={{uri: curr_mechanic.photoUrl}}/>
            <View style={Style.contactLayout}>
              <CustomText title={curr_mechanic.name} size={17} color="black" style={Style.contactText}/>
              <CustomText title={curr_garage.name} size={12} color="#85898f" style={[Style.contactText]}/>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => call(args).catch(console.error)}>
              <Icon name='phone' size={25} color="#fefefe" style={Style.contactIcon}/>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={() => {
                dispatch(setChatTarget({roomTopic: curr_transaction.roomTopic, targetId: curr_transaction.mechanicId})), 
                navigation.navigate('Chat')}}>
              <Icon name='chat' size={25} color="#fefefe" style={[Style.contactIcon, {marginLeft:5}]}/>
            </TouchableOpacity>
          </View>

          <View style={Style.commandLayout}>
            <CustomButton 
              title="Batalkan Pesanan"
              style={{borderRadius:30, backgroundColor:'#b41d12'}}
              textStyle={{fontWeight:'700'}}
              onPress={() => setCancelModal(true)}/>
          </View>
        </View>

        <Confirmation 
          visibleModal={towingModal} 
          setVisibleModal={setTowingModal} 
          title= "Mechanic anda ingin memanggil derek, apakah anda setuju?"
          onTrue={towConfirmed}
          />
        <Confirmation 
          visibleModal={cancelModal} 
          setVisibleModal={setCancelModal} 
          title= "Apakah Anda Ingin Membatalkan Pesanan?"
          onTrue={null}
          />
        <CostListConfirmation 
          costList={show_costList}
          visibleModal={costListModal} 
          setVisibleModal={setCostListModal} 
          title= "Berikut adalah estimasi perbaikan dan biaya dari montir, apakah anda setuju?"
          onTrue={onCostListConfirmed}/>
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
