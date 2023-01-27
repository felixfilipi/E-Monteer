import call from 'react-native-phone-call';
import * as Location from 'expo-location';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import MapView, { Marker } from 'react-native-maps';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../RootStackParamList';
import { CustomText } from "../../Component/CustomText";
import { View, TouchableOpacity, Dimensions,  Modal, 
  TouchableWithoutFeedback, FlatList,  ToastAndroid} from "react-native";
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { useNavigation } from "@react-navigation/native";
import Style from "../../Styles/MechanicStyle/MechanicOrder";
import { CustomButton } from '../../Component/CustomButton';
import { setCostListApp } from '../../../redux/component/costListApp';
import { setServiceCostApp } from '../../../redux/component/serviceCostApp';
import { setEstimationConfirmation } from '../../../redux/component/estimationConfirmation';
import { Confirmation } from '../../Component/Confirmation';
import { setCancelOrder } from '../../../redux/component/cancelOrder';
import { EditOrder } from '../../Component/EditOrder';
import { CallTowing } from '../../Component/CallTowing';
import { setDoneOrder } from '../../../redux/component/doneOrder';
import { setMechLocation } from '../../../redux/component/mechLocation';

type MechanicOrderType = StackNavigationProp<RootStackParamList, 'MechanicOrder'>

const DATA = [
  {
    id:1,
    MechanicName: 'Alexander Wijaya',
    Garage: 'Karunia Nyata Motor',
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
    <View style={{flexDirection:'row', flex:1, paddingVertical:15, paddingLeft:15, alignItems:'center'}}>
      <CustomText title={description} size={15} color='#919b9f' style={{flex:4, marginBottom:0, marginLeft:0, textAlign:'left'}}/>
        <View style={{flex:2, flexDirection:'row'}}>
          <CustomText title={'Rp. ' + price} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
          <CustomText title={' x '} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
          <CustomText title={'('+ quantity + ')'} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
        </View>
      <CustomText title={'Rp. ' + price * quantity} size={15} color='#919b9f' style={{flex:4, marginLeft:0, marginBottom:0, textAlign:'right'}}/>
      <Icon name="edit" size={20} color='#919b9f' style={{flex:1, marginLeft:8}}/>
      <Icon name="trash" size={20} color='#919b9f' style={{flex:1}}/>
    </View>
  )
}

export default function MechanicOrder(){

  let distance : number = 5.9;
  let service_cost : number = 0;
  let CostList : any = [
    {
      description:'Perjalanan',
      quantity:distance,
      price: 2000,
    },
  ];

  const mechLocation = useAppSelector(state => state.mechLocation);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MechanicOrderType>();
  const [retry, setRetry] = React.useState<boolean>(false);
  const [estConfirmModal, setEstConfirmModal] = React.useState<boolean>(false);
  const [estimationModal, setEstimationModal] = React.useState<boolean>(false);
  const [cancelModal, setCancelModal] = React.useState<boolean>(false);
  const [addEstModal, setAddEstModal] = React.useState<boolean>(false);
  const [fixDescription, setFixDescription] = React.useState<string>();
  const [fixNumber, setFixNumber] = React.useState<number>(0);
  const [fixPrice, setFixPrice] = React.useState<string>('');
  const [costList, setCostList] = React.useState<any[]>(CostList);
  const [serviceCost, setServiceCost] = React.useState<number>(service_cost);
  const [componentMount, setComponentMount] = React.useState<boolean>(false);
  const [towingModal, setTowingModal] = React.useState<boolean>(false);
  const [buttonTitle, setButtonTitle] = React.useState<string>('Buat Estimasi Pembayaran');
  const [doneModal, setDoneModal] = React.useState<boolean>(false);

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
    ToastAndroid.show('List Perbaikan Berhasil Ditambahkan', ToastAndroid.SHORT)
  }

  const confirmOrder = () => {
    dispatch(setCostListApp(costList))
    dispatch(setServiceCostApp(serviceCost))
    dispatch(setEstimationConfirmation(true))
    setEstConfirmModal(false);
    setEstimationModal(false);
    setButtonTitle('Selesaikan Pesanan');
    ToastAndroid.show('Konfirmasi Estimasi Perbaikan Telah Dikirimkan', ToastAndroid.LONG);
  }

  const cancelOrder = () => {
    dispatch(setCancelOrder(true));
    navigation.navigate('MechanicMain');
    ToastAndroid.show('Anda Telah Membatalkan Pesanan', ToastAndroid.LONG);
  }

  const doneOrder = () => {
    dispatch(setDoneOrder(true));
    navigation.navigate('MechanicMain');
    ToastAndroid.show('Anda Telah Menyelesaikan Pesanan', ToastAndroid.LONG);
  }

  const estimate_or_complete = () => {
    if(buttonTitle === 'Selesaikan Pesanan'){
      setDoneModal(true);
    }else{
      setEstimationModal(true)
    }
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
          dispatch(setMechLocation({latitude: location['coords']['latitude'], longitude: location['coords']['longitude']}));
        }else{
          setRetry(true);
        }
      }while(retry == true);
 
    })();
  },[]);

  let _map: any;

  const fitCamera = () => {
    _map.fitToCoordinates([mechLocation,{latitude:DATA[0].latitude, longitude:DATA[0].longitude}], {edgePadding: {top:50, right:50, left:50, bottom:50}, animated: true})
  }

    if(mechLocation.latitude && mechLocation.longitude){
    return(
      <View style={{flex:5}}>
        <View style={{flex:2}}>
          <MapView
            initialRegion={{
            latitude:  (mechLocation.latitude + DATA[0].latitude) / 2,
            longitude: (mechLocation.longitude + DATA[0].longitude) / 2, 
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            }}
            ref={(ref) => _map = ref}
            onMapReady={fitCamera}
            style={[Style.mapView, {width:Dimensions.get('window').width}]}
          >
            <Marker
              draggable
             coordinate={mechLocation}
             title={'Lokasi Anda'}
            >
              <View style={Style.avatarMarker}>
                <Avatar.Image 
                  size={30} 
                  source={{uri: DATA[0].photoUrl}}/>
              </View>
            </Marker>
            <Marker
              draggable
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
                title={buttonTitle} 
                style={Style.estimateButton}
                textStyle={Style.estimateButtonText}
                onPress={estimate_or_complete}/>
              <View style={{flexDirection:'column', flex:1}}>
                <CustomButton 
                  title="Panggil Derek"
                  style={{borderRadius:30}}
                  textStyle={{fontWeight:'700'}}
                  onPress={() => setTowingModal(true)}/>
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
          visibleModal={doneModal} 
          setVisibleModal={setDoneModal} 
          title= "Apakah Anda Ingin Menyelesaikan Pesanan?"
          onTrue={doneOrder}
          />
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
        <EditOrder 
          descTitle="Tambah Estimasi Perbaikan"
          submitTitle="Tambah Data"
          visibleModal={addEstModal}
          setVisibleModal={setAddEstModal}
          fixDescription={fixDescription}
          setFixDescription={setFixDescription}
          fixPrice={fixPrice}
          setFixPrice={setFixPrice}
          fixNumber={fixNumber}
          setFixNumber={setFixNumber}
          onSubmit={addOrder}
          onCloseState={setComponentMount}
        />
      <CallTowing
        visibleModal={towingModal}
        setVisibleModal={setTowingModal}
        descTitle="Panggil Jasa Derek"
        submitTitle="Panggil Derek"
      />
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

