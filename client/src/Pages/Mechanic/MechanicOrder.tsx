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
import { setMechLocation } from '../../../redux/component/mechLocation';
import haversineDistance from 'haversine-distance';
import { setChatTarget } from '../../../redux/component/chatTarget';
import { setTransaction } from '../../../redux/component/transaction';
import { setChatRoom } from '../../../redux/component/chatRoom';
import { setOrderCreated } from '../../../redux/component/orderCreated';

type MechanicOrderType = StackNavigationProp<RootStackParamList, 'MechanicOrder'>

const Item = ({ id, description, quantity, price, onSubmit, 
  editItemModal, setEditItemModal, itemDescription, setItemDescription,
  itemQuantity, setItemQuantity, itemPrice, setItemPrice, setItemId, 
  costList, setCostList}) => {
  
  const onEdit = () => {
    setItemDescription(description);
    setItemQuantity(quantity);
    setItemPrice(price);
    setEditItemModal(true);
    setItemId(id);
  }

  const onDelete = () => {
    console.log(id);
    setCostList(costList.filter((item) => {return item.id !== id}));
  }

  return(
    <View style={{flexDirection:'row', flex:1, paddingVertical:15, paddingLeft:15, alignItems:'center'}}>
      <CustomText title={description} size={15} color='#919b9f' style={{flex:4, marginBottom:0, marginLeft:0, textAlign:'left'}}/>
        <View style={{flex:2, flexDirection:'row'}}>
          <CustomText title={'Rp. ' + price} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
          <CustomText title={' x '} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
          <CustomText title={'('+ quantity + ')'} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
        </View>
      <CustomText title={'Rp. ' + price * quantity} size={15} color='#919b9f' style={{flex:4, marginLeft:0, marginBottom:0, textAlign:'right'}}/>
      <Icon name="edit" size={20} color='#919b9f' onPress={onEdit} style={{flex:1, marginLeft:8}}/>
      <Icon name="trash" size={20} color='#919b9f' onPress={onDelete} style={{flex:1}}/>
      <EditOrder 
        descTitle="Ganti Detail Perbaikan"
        submitTitle="Ganti Data"
        visibleModal={editItemModal}
        setVisibleModal={setEditItemModal}
        fixDescription={itemDescription}
        setFixDescription={setItemDescription}
        fixNumber={itemQuantity}
        setFixNumber={setItemQuantity}
        fixPrice={itemPrice}
        setFixPrice={setItemPrice}
        onSubmit={onSubmit}
        />
    </View>
  )
}

export default function MechanicOrder(props: any){

  const curr_transaction_id = props.route.params.id;
  const all_user = useAppSelector(state => state.userAuth);
  const transaction = useAppSelector(state => state.transaction);
  const all_costList = useAppSelector(state => state.costListApp);

  const curr_transaction = transaction.find((item) => item.id == curr_transaction_id);
  const curr_customer = all_user.find((item) => item.id == curr_transaction.cust_id);
  const curr_mechanic = all_user.find((item) => item.id == curr_transaction.mechanicId);
  
  const mechLocation = useAppSelector(state => state.mechLocation);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<MechanicOrderType>();

  let distance = Math.round(haversineDistance({latitude: curr_transaction.pickup_latitude, longitude:curr_transaction.pickup_longitude}, mechLocation) / 1000 * 100) / 100;
  const [Sdistance, setDistance] = React.useState<number>(distance);
  
  const new_costList : any[] = [];
    new_costList.push(
      {
        id: 1,
        description: 'Perjalanan',
        price: 8000,
        quantity: Sdistance,
      }
  )

  const [retry, setRetry] = React.useState<boolean>(false);
  const [estConfirmModal, setEstConfirmModal] = React.useState<boolean>(false);
  const [estimationModal, setEstimationModal] = React.useState<boolean>(false);
  const [cancelModal, setCancelModal] = React.useState<boolean>(false);
  const [addEstModal, setAddEstModal] = React.useState<boolean>(false);
  const [fixDescription, setFixDescription] = React.useState<string>();
  const [fixNumber, setFixNumber] = React.useState<number>(0);
  const [fixPrice, setFixPrice] = React.useState<string>('');
  const [costList, setCostList] = React.useState<any[]>(new_costList);
  const [serviceCost, setServiceCost] = React.useState<number>(curr_transaction.service_cost);
  const [towingModal, setTowingModal] = React.useState<boolean>(false);
  const [buttonTitle, setButtonTitle] = React.useState<string>('Buat Estimasi Pembayaran');
  const [doneModal, setDoneModal] = React.useState<boolean>(false);
  const [maxId, setMaxId] = React.useState<number>(1);
  
  const [editItemModal, setEditItemModal] = React.useState<boolean>(false);
  const [itemDescription, setItemDescription] = React.useState<string>();
  const [itemQuantity, setItemQuantity] = React.useState<number>();
  const [itemPrice, setItemPrice] = React.useState<number>();
  const [itemId, setItemId] = React.useState<number>();
  
  const costListConfirm = useAppSelector(state => state.acceptCostList);
  const towingConfirm = useAppSelector(state => state.towConfirm);
  const chatHistory = useAppSelector(state => state.chatRoom);

  React.useEffect(() => {
    if(costListConfirm.acceptCostList == true){
      setButtonTitle('Selesaikan Pesanan');
    };
  }, [buttonTitle])

  const args = {
    number: curr_customer.phone,
    prompt: false,
    skipCanOpen: true
  }

  const changeData = () => {
    
    const new_costList = costList.map((item : any) => {return {...item}});
    for(let i = 0; i <= new_costList.length - 1; i++){
      if(new_costList[i].id === itemId){
        new_costList[i].description = itemDescription;
        new_costList[i].quantity = itemQuantity;
        new_costList[i].price = itemPrice;
      }
    }

    setCostList(new_costList);
    setEditItemModal(false);
    ToastAndroid.show('Item berhasil diganti', ToastAndroid.LONG)
  }

  const renderItem = ({ item }) => {
    return(
      <Item
        id = {item.id}
        description = {item.description}
        quantity = {item.quantity}
        price = {item.price}
        editItemModal = {editItemModal}
        setEditItemModal = {setEditItemModal}
        itemDescription = {itemDescription}
        setItemDescription = {setItemDescription}
        itemQuantity = {itemQuantity}
        setItemQuantity = {setItemQuantity}
        itemPrice = {itemPrice}
        setItemPrice = {setItemPrice}
        setItemId = {setItemId}
        costList={costList}
        setCostList={setCostList}
        onSubmit={changeData}
        />
    )
  }

  const addOrder = () => {
    setCostList( prevCostList => [ ...prevCostList,{
      id: maxId + 1,
      description:fixDescription,
      quantity: fixNumber,
      price: Number(fixPrice),
    }]);
    setMaxId(maxId + 1);
    setFixDescription('');
    setFixPrice('');
    setFixNumber(0);
    setAddEstModal(false);
    ToastAndroid.show('List Perbaikan Berhasil Ditambahkan', ToastAndroid.SHORT)
  }

  const confirmOrder = () => {
    const description = [], quantity = [], price = [];
    for(let i = 0 ; i <= costList.length - 1; i++){
      description.push(costList[i].description);
      quantity.push(costList[i].quantity);
      price.push(costList[i].price);
    }
    dispatch(setCostListApp([
      {
        id: all_costList[0].id + 1,
        description: description,
        price: price,
        quantity: quantity,
      }, ...all_costList ]))
    const new_transaction = transaction.map((item) => {return {...item}})
    for(let j = 0; j <= new_transaction.length - 1; j++){
      if(new_transaction[j].id === curr_transaction.id){
        new_transaction[j].fixId = all_costList[0].id + 1;
      }
    }
    dispatch(setTransaction(new_transaction));
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

  const onTow = () => {
    if(towingConfirm.receiveConfirm == true){
      call(args).catch(console.error)
    }else{
      setTowingModal(true)
    }
  }

  const doneOrder = () => {
    const new_transaction = transaction.map((item : any) => {return {...item}})
    for(let i = 0 ; i<= new_transaction.length - 1; i++){
      if(new_transaction[i].trans_end_dt == null){
        new_transaction[i].trans_end_dt = new Date().toLocaleDateString() + ', ' +  new Date().toLocaleTimeString();
      }
    }
    dispatch(setOrderCreated(false));
    dispatch(setTransaction(new_transaction));
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
    let service_cost : number = 0;
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
    _map.fitToCoordinates([mechLocation,{latitude:curr_transaction.pickup_latitude, longitude:curr_transaction.pickup_longitude}], {edgePadding: {top:50, right:50, left:50, bottom:50}, animated: true})
  }

  const onAddOrder = () => {
    setEstimationModal(false);
    setAddEstModal(true);
  }

  const FailWait = () =>{
    setTimeout(() => setRetry(true), 3000);
    return null;
  }

  const onChat = () => {
    if(chatHistory[0].roomTopic != curr_transaction.roomTopic){
      dispatch(setChatRoom([
      {
        roomTopic: chatHistory[0].roomTopic + 1,
        cust_id: curr_transaction.cust_id,
        mech_id: curr_transaction.mechanicId,
        lastMessage: '',
        last_date_time: new Date().toLocaleDateString() + ', ' +  new Date().toLocaleTimeString(),
        signal_customer: 0,
      }, ...chatHistory
      ]))
    }
    dispatch(setChatTarget({roomTopic: curr_transaction.roomTopic, targetId: curr_transaction.cust_id})); 
    navigation.navigate('Chat')
  }

    if(mechLocation.latitude && mechLocation.longitude){
    return(
      <View style={{flex:5}}>
        <View style={{flex:2}}>
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
             coordinate={mechLocation}
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
            <Avatar.Image size={60} source={{uri: curr_customer.photoUrl}}/>
            <View style={Style.contactLayout}>
              <CustomText title={curr_customer.name} size={17} color="black" style={Style.contactText}/>
              <CustomText title={curr_transaction.pickup_address} size={12} color="#85898f" style={[Style.contactText]}/>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => call(args).catch(console.error)}>
              <Icon name='phone' size={25} color="#fefefe" style={Style.contactIcon}/>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={onChat}>
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
                  onPress={onTow}/>
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
                        onPress={onAddOrder}
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
        <FailWait/>
        <CustomText 
          title="Sedang Memuat"
          color={'white'}
          style={{fontSize:20}}/>
        <ActivityIndicator animating={true} color={'#b99504'} size={30}/>
      </View>
    )
  }
};

