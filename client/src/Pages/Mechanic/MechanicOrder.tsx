import call from 'react-native-phone-call';
import * as Location from 'expo-location';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import MapView, { Marker } from 'react-native-maps';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../RootStackParamList';
import { CustomText } from "../../Component/CustomText";
import { View, TouchableOpacity, Dimensions, TextInput, Modal, 
  TouchableWithoutFeedback, FlatList, KeyboardAvoidingView, ToastAndroid} from "react-native";
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { useNavigation } from "@react-navigation/native";
import { setLatitude } from "../../../redux/component/latitude";
import { setLongitude } from "../../../redux/component/longitude";
import Style from "../../Styles/MechanicStyle/MechanicOrder";
import { CustomButton } from '../../Component/CustomButton';
import NumericInput from 'react-native-numeric-input';
import { setCostListApp } from '../../../redux/component/costListApp';
import { setServiceCostApp } from '../../../redux/component/serviceCostApp';
import { setEstimationConfirmation } from '../../../redux/component/estimationConfirmation';
import { Confirmation } from '../../Component/Confirmation';
import { setCancelOrder } from '../../../redux/component/cancelOrder';

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

  let distance : number = 2.4;
  let service_cost : number = 0;
  let CostList : any = [
    {
      description:'Perjalanan',
      quantity:distance,
      price: 2000,
    },
  ];

  const latitude = useAppSelector(state => state.latitude);
  const longitude = useAppSelector(state => state.longitude);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MechanicOrderType>();
  const [retry, setRetry] = React.useState<boolean>(false);
  const [estConfirmModal, setEstConfirmModal] = React.useState<boolean>(false);
  const [estimationModal, setEstimationModal] = React.useState<boolean>(false);
  const [cancelModal, setCancelModal] = React.useState<boolean>(false);
  const [addEstModal, setAddEstModal] = React.useState<boolean>(false);
  const [fixDescription, setFixDescription] = React.useState<string>();
  const [fixNumber, setFixNumber] = React.useState<number>(0);
  const [fixPrice, setFixPrice] = React.useState<string>();
  const [flexState, setFlexState] = React.useState<number>(5);
  const [costList, setCostList] = React.useState<any[]>(CostList);
  const [serviceCost, setServiceCost] = React.useState<number>(service_cost);

  const renderItem = ({ item }) => {
    return(
      <Item
        description = {item.description}
        quantity = {item.quantity}
        price = {item.price}/>
    )
  }


  const addOrder = () => {
    setCostList( prevCostList => [...prevCostList, {
      description:fixDescription,
      quantity: fixNumber,
      price: Number(fixPrice),
    }]);
    setFixDescription('');
    setFixPrice('');
    setFixNumber(0);
    setAddEstModal(false);
    setFlexState(5);
    ToastAndroid.show('List Perbaikan Berhasil Ditambahkan', ToastAndroid.SHORT)
  }

  const confirmOrder = () => {
    dispatch(setCostListApp(costList))
    dispatch(setServiceCostApp(serviceCost))
    dispatch(setEstimationConfirmation(true))
    setEstConfirmModal(false);
    setEstimationModal(false);
    ToastAndroid.show('Konfirmasi Estimasi Perbaikan Telah Dikirimkan', ToastAndroid.LONG);
  }

  const cancelOrder = () => {
    dispatch(setCancelOrder(true));
    navigation.navigate('MechanicMain');
    ToastAndroid.show('Anda Telah Membatalkan Pesanan', ToastAndroid.LONG);
  }

  React.useEffect(() => {
    for(let i = 0; i <= costList.length - 1; i++){
      service_cost += costList[i].quantity * costList[i].price;
    };
    setServiceCost(service_cost);
  }, [costList])
  
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

        <Confirmation 
          visibleModal={cancelModal} 
          setVisibleModal={setCancelModal} 
          title= "Apakah Anda Ingin Membatalkan Pesanan?"
          onTrue={cancelOrder}
          />
        <Confirmation 
          visibleModal={estConfirmModal} 
          setVisibleModal={setEstConfirmModal}
          title= "Apakah List Estimasi Biaya Sudah Benar?"
          onTrue={confirmOrder}
          />

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
                    data={costList}
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
                      title={'Rp. ' + serviceCost}
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
                        textStyle={Style.modalButtonText}
                        onPress={() => {setEstimationModal(false), setAddEstModal(true)}}
                      />
                      <CustomButton 
                        title="Konfirmasi Pesanan" 
                        style={{flex:1, backgroundColor:'#59a540'}} 
                        textStyle={Style.modalButtonText}
                        onPress={() => setEstConfirmModal(true)}
                      />
                    </View>
                  </View>
                </View>
              </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={addEstModal}
          onRequestClose={() => setAddEstModal(!addEstModal)}>
          <KeyboardAvoidingView style={Style.modalMaskLayout}>
            <TouchableWithoutFeedback onPress={() => {setAddEstModal(false), setFlexState(5)}}>
              <View style={[Style.modalMask, {flex:flexState}]}/>
            </TouchableWithoutFeedback>
              <View style={[Style.modalLayout]}>
                <TouchableOpacity onPress={() => {setAddEstModal(false), setFlexState(5)}}>
                  <View style={Style.modalClose}>
                    <Icon name='cross' size={30} color='#9ca8ac'/>
                  </View>
                </TouchableOpacity>
                <CustomText 
                  title="Tambah Estimasi Perbaikan" 
                  color="black" 
                  size={20}
                  style={Style.modalTitle}/>
                <View style={[Style.modalListLayout]}>
                  <View style={{flex:1, padding:15}}>
                    <View style={{flex:3}}>
                      <View style={{flex:1}}>
                        <CustomText title="Deskripsi Perbaikan:" size={12} color="black" style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
                        <TextInput 
                          onFocus={() => setFlexState(2)}
                          onEndEditing={() => setFlexState(5)}
                          onChangeText={setFixDescription} 
                          value={fixDescription}
                          style={{borderBottomWidth:0.3, padding:5, marginRight:15, fontSize:15}}
                          />
                      </View>
                      <View style={{flexDirection:'row', flex:1, padding:5}}>
                        <View style={{flex:1}}>
                          <CustomText title="Biaya Perbaikan (per unit)" size={12} color="black" style={{textAlign:'left', marginBottom:0, marginLeft:0}}/>
                          <TextInput
                            onFocus={() => setFlexState(2)}
                            onEndEditing={() => setFlexState(5)}
                            onChangeText={setFixPrice} 
                            value={fixPrice}
                            style={{borderBottomWidth:0.3, padding:5, fontSize:15, marginRight:15}}
                            keyboardType='numeric'
                          />
                        </View>
                        <View style={{flex:1, alignItems:'center'}}>
                          <CustomText title="Total Perbaikan" size={12} color="black" style={{marginLeft:0}}/>
                          <NumericInput 
                            onChange={(value) => setFixNumber(value)}
                            value={fixNumber}
                            iconSize={10}
                            totalWidth={100}
                            totalHeight={30}
                          />
                        </View>
                      </View>
                    </View>
                    <CustomButton 
                      title="Tambah Pesanan" 
                      style={{flex:1}} 
                      textStyle={Style.modalButtonText}
                      onPress={addOrder}/>
                  </View>
                </View>
              </View>
          </KeyboardAvoidingView>
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

