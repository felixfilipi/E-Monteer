import Style from "../../Styles/CustomerStyle/CustomerMain";
import call from 'react-native-phone-call';
import * as Location from 'expo-location';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import MapView, { Marker } from 'react-native-maps';
import { Searchbar, Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { Rating } from 'react-native-ratings';
import { TopBar, BottomNav } from '../../Component/navBar';
import { MultipleButton } from '../../Component/CustomButton';
import { RootStackParamList } from '../RootStackParamList';
import { CustomText } from "../../Component/CustomText";
import { View, KeyboardAvoidingView, Alert,
  Text, ScrollView, TouchableOpacity, Dimensions, TouchableWithoutFeedback} from "react-native";
import _ from 'lodash';
import { setNavbar } from "../../../redux/component/navbar";
import { useAppDispatch, useAppSelector } from '../../../redux';
import { setCustLocation } from "../../../redux/component/custLocation";
import { setOrderFail } from "../../../redux/component/orderFail";
import { setOrderType } from "../../../redux/component/orderType";
import { setSearch } from "../../../redux/component/search";
import { useNavigation } from "@react-navigation/native";
import { setOrderCreated } from "../../../redux/component/orderCreated";
import { setOrderTimer } from "../../../redux/component/orderTimer";
import { setTransaction } from "../../../redux/component/transaction";

type HomeType = StackNavigationProp<RootStackParamList, 'CustomerMain'>

function joinTables(left, right, leftKey, rightKey) {

    rightKey = rightKey || leftKey;

    var lookupTable = {};
    var resultTable = [];
    var forEachLeftRecord = function (currentRecord) {
        lookupTable[currentRecord[leftKey]] = currentRecord;
    };

    var forEachRightRecord = function (currentRecord) {
        var joinedRecord = _.clone(lookupTable[currentRecord[rightKey]]); // using lodash clone
        _.extend(joinedRecord, currentRecord); // using lodash extend
        resultTable.push(joinedRecord);
    };

    left.forEach(forEachLeftRecord);
    right.forEach(forEachRightRecord);

    return resultTable;
}

export default function CustomerMain(){

  const [retry, setRetry] = React.useState<boolean>(false);
  const activeUser = useAppSelector(state => state.activeStatus);
  
  const orderFailState = useAppSelector(state => state.orderFail);
  const orderCreatedState = useAppSelector(state => state.orderCreated);
  
  const searchState = useAppSelector(state => state.search);
  const custLocation = useAppSelector(state => state.custLocation);

  const raw_userData = useAppSelector(state => state.transaction);
  const raw_user = useAppSelector(state => state.userAuth);

  const customerData = raw_user.find((item) => item.id == activeUser.id);
 
  const garageData = useAppSelector(state => state.garageData);
  const historyData = raw_userData.filter((item) => {return item.trans_end_dt !== null && item.cust_id == activeUser.id }).slice(0,3);

  var joinResult = joinTables(garageData, historyData,'id', 'garageId');
  
  const statusOrder = useAppSelector(state => state.acceptOrder);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeType>();

  const [activeButton, setActiveButton] = React.useState<number>(100);
  React.useEffect(() => {
    if(activeButton !== 100){
      dispatch(setOrderType(activeButton));
      navigation.navigate('FindGarage', {prevScreen:true});
      dispatch(setNavbar(1));
    }
  },[activeButton])
  
  const onChangeSearch = (query : string) => dispatch(setSearch(query));
  React.useEffect(() => {
    if(orderFailState == true){
      Alert.alert("Bengkel Tidak Melayani", 
        "Maaf Bengkel Tidak Memberi Konfirmasi, Mohon Pesan Kembali",
      );
      dispatch(setOrderFail(false));
    }
  }, [orderFailState])

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
          dispatch(setCustLocation({latitude: location['coords']['latitude'], longitude: location['coords']['longitude']}));
        }else{
          setRetry(true);
        }
      }while(retry == true);
 
    })();
  },[]);

  let _map: any;
  const fitCamera = () => {
    _map.fitToCoordinates([custLocation], {edgePadding: {top:50, right:50, left:50, bottom:50}, animated: true}) }

  const submitSearch = (query: string) => {
    dispatch(setSearch(query));
    navigation.navigate('FindGarage', {prevScreen:true});
    dispatch(setNavbar(1));
  }

  const filter_mechData = raw_user.filter((item) => {return item.role == 'Mechanic'});
  
  let mechanicData : any[] = [];
  for(let i = 0; i <= historyData.length - 1; i++){
    for(let j = 0; j <= filter_mechData.length - 1; j++){
      if(filter_mechData[j].id == historyData[i].mechanicId){
        mechanicData.push(filter_mechData[j]);
      }
    }
  }

  let Cards :any[] = [];

  for(let i = 0; i <= historyData.length - 1 ; i++){

    let args = {
      number: mechanicData[i].phone,
      prompt: false,
      skipCanOpen: true
    };

    var onRating = (rate : number) => {
      const prevData = raw_userData.map((item) => {return {...item}});
      for(let j = 0; j <= prevData.length - 1; j++){
        if(prevData[j].id == historyData[i].id){
          prevData[j].rating = rate;
        }
      }
      dispatch(setTransaction(prevData));
    }

    Cards.push(
      <Card style={[Style.cardStyle, {width:380}]} key={"Card" + i}>
        <Card.Content>
          <Title style={{marginLeft: -5}}> {joinResult[i].name} </Title>
          <Paragraph>{joinResult[i].address}</Paragraph>
          <View style={{flexDirection:'row', marginTop:10}}>
            <Icon 
              name={"stopwatch"} 
              size={18} 
              color="#8d909a"
              />
            <Text style={Style.dateLabel}>{historyData[i].trans_end_dt}</Text>
          </View>
          <View style={Style.cardAction}>
            <Rating
              type='custom'
              startingValue={historyData[i]?.rating}
              readonly={historyData[i].rating == null || undefined ? false : true}
              ratingBackgroundColor="#B1B5C1"
              imageSize={30}
              tintColor='#fffde6' 
              onFinishRating={onRating}
              style={Style.ratingStyle}/>
            <TouchableOpacity 
              onPress={()=>call(args).catch(console.error)}
              style={Style.myButton} 
              activeOpacity={0.7}>
              <Icon 
               name={"phone"} 
               size={20} 
               color="#fff"
               />
              <Text style={Style.buttonText}> Hubungi Bengkel</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    )
  }

  const Waiting = () => {
    const time = useAppSelector(state => state.orderTimer);
    const timerRef = React.useRef(time.time);

    React.useEffect(() => {
      const timerId = setInterval(() => {
        timerRef.current -= 1;
        if(timerRef.current < 0){
          clearInterval(timerId);
          dispatch(setOrderFail(true));
          dispatch(setOrderCreated(false));
          dispatch(setOrderTimer({stop:false, time:120}));
        }else{
          if(time.stop == true){
            clearInterval(timerId)
          }else{
            dispatch(setOrderTimer({stop:false, time:timerRef.current}));
          }
        }
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    }, []);

    const cancelOrder = () => {
      let prevData = raw_userData.map((item) => {return {...item}});
      prevData[0].trans_end_dt = new Date().toLocaleDateString();
      dispatch(setTransaction(prevData));
      dispatch(setOrderFail(true));
      dispatch(setOrderCreated(false));
    };
   
    if(orderCreatedState == true && time.stop == false){
      return(
        <View style={Style.waitingContainer}>
          <View style={Style.waitingTextLayout}>
            <CustomText title="Menunggu Konfirmasi Bengkel Terdekat" size={15} color="black" style={{textAlign:'left'}}/>
            <CustomText title={"Mohon Tunggu Sebentar (" + time.time + "s)"} size={10} color="black" style={{textAlign:'left'}}/>
          </View>
          <TouchableOpacity 
            style={Style.waitingCancelButton} 
            activeOpacity={0.7} 
            onPress={() => cancelOrder()}>
            <View>
              <Icon name="cross" size={30} color="black"/>
            </View>
          </TouchableOpacity>
        </View>
      )
    }else if(orderCreatedState == true && time.stop == true){
      return(
        <TouchableOpacity 
            onPress={() => {
              navigation.navigate('CustomerOrder', {id: statusOrder.id});
            }}
            activeOpacity={0.7}
        >
          <View style={Style.waitingContainer}>
              <View style={Style.waitingTextLayout}>
                <CustomText title="Montir Anda Sedang dalam Perjalanan" size={15} color="black" style={{textAlign:'left'}}/>
                <CustomText title={"Tekan Disini untuk Melihat dimana Montir Anda"} size={10} color="black" style={{textAlign:'left'}}/>
              </View>
              <View style={[Style.waitingCancelButton, {backgroundColor:'#b99504'}]}>
                <Icon name="hour-glass" size={30} color="black"/>
              </View>
          </View>
        </TouchableOpacity>
      )
    }
  }

  const dragableMarker = (e : any) => {
    dispatch(setCustLocation({latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude}));
  }

  const FailWait = () =>{
    setTimeout(() => setRetry(!retry), 3000);
    return null;
  }

  if(custLocation.latitude && custLocation.longitude){
    return(
    <View style={{flex:1}}>
      <TopBar id={activeUser.id} photoUrl={customerData.photoUrl}/>
      <ScrollView contentContainerStyle={{flexGrow:1}}>
      {orderCreatedState === true ? <Waiting/> : null}
        <View style={{ alignItems: 'center', flex:1 }}>
          <KeyboardAvoidingView>
            <View style={Style.searchSection}>
              <Searchbar
                placeholder="Cari Bengkel"
                onChangeText={onChangeSearch}
                style={{backgroundColor:'#fff'}}
                value={searchState}
                onSubmitEditing={() => submitSearch(searchState)}
              />
                <MultipleButton 
                  size={3} 
                  title={['Terdekat', 'Terfavorit','24 Jam']}
                  direction='row'
                  keyValue={'Home'}
                  changeValues={['terdekat','terfavorit','24jam']}
                  setActiveButton = {setActiveButton}
                  iconName={['map-marker','heart','clock-o']}/>
            </View>
            <View style={{justifyContent:'center'}}>
              <MapView
                initialRegion={{
                latitude: custLocation.latitude,
                longitude: custLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
                }}
                ref={(ref) => _map = ref}
                style={{width:Dimensions.get('window').width, 
                    height:300, 
                    justifyContent:'center'}}
              >
                <Marker
                  coordinate={custLocation}
                  title={'Lokasi Anda'}
                  draggable
                  onDragEnd={dragableMarker}
                >
                <Icon name={'location-pin'} size={50} color={'#4eacea'}/>
                </Marker>
              </MapView>
              <TouchableOpacity onPress={() => {navigation.navigate('OrderGarage', {id:null, handleType:null})}} 
                  style={[Style.myButton, {position :'absolute', bottom: 8, right: 8}]} activeOpacity={0.9}>
               <Icon 
                 name={"tools"} 
                 size={20} 
                 color="#fff"
                 />
               <Text style={Style.buttonText}> Cari Terdekat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {fitCamera()}}
                style={{position:'absolute',left:8, bottom:30}}>
                <View style={Style.floatingButtonLayout}>
                  <Icon name="hair-cross" size={30} color="rgba(58, 68, 71, 1)"/>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginBottom:-50}}>
                <Text style={Style.historyLabel} 
                  onPress={() => {navigation.navigate('History'), dispatch(setNavbar(2))}}>Pesanan Terakhir</Text>
                <View style={{marginBottom:30}}>
                <ScrollView horizontal={true}>
                  <View style={{flexDirection:'row'}}>
                  { Cards }
                  </View>
                </ScrollView>
                </View>
            </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
        <BottomNav 
          title = {['Utama','Cari','Riwayat','Chat']}
          icon = {['home-circle','map-search-outline','history','chat']}
          navigate = {['CustomerMain','FindGarage','History','ChatHistory']}
          size = {4}
          />
      </View>
    )
  }else{
    return(
      <View style={Style.loading}>
        <FailWait/>
        <CustomText 
          title="Sedang memuat" 
          color={'white'}
          style={{fontSize:20}}/>
        <ActivityIndicator animating={true} color={'#b99504'} size={30}/>
      </View>
    )
  }
};
