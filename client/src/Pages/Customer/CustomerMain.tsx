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
  Text, ScrollView, TouchableOpacity, Dimensions} from "react-native";
import { setNavbar } from "../../../redux/component/navbar";
import { useAppDispatch, useAppSelector } from '../../../redux';
import { setOrderFail } from "../../../redux/component/orderFail";
import { setOrderType } from "../../../redux/component/orderType";
import { setSearch } from "../../../redux/component/search";
import { useNavigation } from "@react-navigation/native";
import { setLatitude } from "../../../redux/component/latitude";
import { setLongitude } from "../../../redux/component/longitude";
import { setOrderCreated } from "../../../redux/component/orderCreated";
import { setOrderTimer } from "../../../redux/component/orderTimer";

type HomeType = StackNavigationProp<RootStackParamList, 'CustomerMain'>

const GARAGE = [
  {
    id:1,
    title: 'Bengkel Cepi Jaya',
    mechanicName:'Cepi',
    location: 'Jalan MH Thamrin 1, Jakarta Pusat.',
    date: '01/01/2001',
    phone: '087892314322',
    rating: 0,
  },
  {
    id:2,
    title: 'Bengkel bos jaya',
    mechanicName:'Master',
    location: 'bangalore, singapore.',
    date: '01/01/2001',
    phone: '0878123123123',
    rating: 1,
  },
  {
    id:3,
    title: 'Bengkel kuli jaya',
    mechanicName:'Slave',
    location: 'kebon kacang, jakarta pusat.',
    date: '01/01/2001',
    phone: '0878932131232',
    rating: 5,
  },
]

export default function CustomerMain(){

  const orderFailState = useAppSelector(state => state.orderFail);
  const orderCreatedState = useAppSelector(state => state.orderCreated);
  const searchState = useAppSelector(state => state.search);
  const latitude = useAppSelector(state => state.latitude);
  const longitude = useAppSelector(state => state.longitude);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeType>();
  
  const [ratingList, setRatingList] = React.useState<number[]>([GARAGE[0].rating, GARAGE[1].rating, GARAGE[2].rating]);

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

      let tryAgain : boolean = false;
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        Alert.alert('Permission to access location was denied');
        return;
      }

      do{
        const waiting = (ms : number) => new Promise(resolve => setTimeout(resolve, ms));
        const location = await Location.getCurrentPositionAsync({});
        await waiting(1500);
        if(location != undefined){
          dispatch(setLatitude(location['coords']['latitude']));
          dispatch(setLongitude(location['coords']['longitude']));
          tryAgain = false;
        }else{
          tryAgain = true;
        };
      }while(tryAgain);
 
    })();
  },[]);

  let _map: any;
  const fitCamera = () => {
    _map.fitToCoordinates([{latitude: latitude, longitude: longitude}], {edgePadding: {top:50, right:50, left:50, bottom:50}, animated: true}) }

  const submitSearch = (query: string) => {
    dispatch(setSearch(query));
    navigation.navigate('FindGarage', {prevScreen:true});
    dispatch(setNavbar(1));
  }

  let Cards :any[] = [];
  for(let i = 0; i<=2 ; i++){
    
    let args = {
      number: GARAGE[i].phone,
      prompt: false,
      skipCanOpen: true
    }

    let stateList = [...ratingList];

    Cards.push(
      <Card style={Style.cardStyle} key={"Card" + i}>
        <Card.Content>
          <Title style={{marginLeft: -5}}> {GARAGE[i].title} </Title>
          <Paragraph>{GARAGE[i].location}</Paragraph>
          <View style={{flexDirection:'row', marginTop:10}}>
            <Icon 
              name={"stopwatch"} 
              size={18} 
              color="#8d909a"
              />
            <Text style={Style.dateLabel}>{GARAGE[i].date}</Text>
          </View>
          <View style={Style.cardAction}>
            <Rating
              type='custom'
              startingValue={GARAGE[i]?.rating}
              ratingBackgroundColor="#B1B5C1"
              imageSize={30}
              tintColor='#fffde6'
              readonly={ratingList[i] == 0 ? false : true}
              onFinishRating={(rating : number) => {
                stateList[i] = rating;
                setRatingList(stateList)}
            }
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
    const timerRef = React.useRef(time);

    React.useEffect(() => {
      const timerId = setInterval(() => {
        timerRef.current -= 1;
        if(timerRef.current < 0){
          clearInterval(timerId);
          dispatch(setOrderFail(true));
          dispatch(setOrderCreated(false));
          dispatch(setOrderTimer(120));
        }else{
          dispatch(setOrderTimer(timerRef.current));
        }
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    }, []);

    const cancelOrder = () => {
      dispatch(setOrderFail(true));
      dispatch(setOrderCreated(false));
    };
    
    return(
      <View style={Style.waitingContainer}>
        <View style={Style.waitingTextLayout}>
          <CustomText title="Menunggu Konfirmasi Bengkel Terdekat" size={15} color="black" style={{textAlign:'left'}}/>
          <CustomText title={"Mohon Tunggu Sebentar (" + time + "s)"} size={10} color="black" style={{textAlign:'left'}}/>
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
  }

  if(latitude && longitude){
    return(
    <View style={{flex:1}}>
      <TopBar photoUrl='https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg'/>
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
                  setRedux={setOrderType}
                  iconName={['map-marker','heart','clock-o']}/>
            </View>
            <View style={{justifyContent:'center'}}>
              <MapView
                initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
                }}
                ref={(ref) => _map = ref}
                style={{width:Dimensions.get('window').width, 
                    height:300, 
                    justifyContent:'center'}}
              >
                <Marker
                  coordinate={{ latitude: latitude, longitude: longitude }}
                  title={'Lokasi Anda'}
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
                  onPress={() => navigation.navigate('History')}>Pesanan Terakhir</Text>
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
        <CustomText 
          title="Sedang memuat" 
          color={'white'}
          style={{fontSize:20}}/>
        <ActivityIndicator animating={true} color={'#b99504'} size={30}/>
      </View>
    )
  }
};

