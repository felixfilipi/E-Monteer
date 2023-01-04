import Style from "../Styles/homeStyle";
import call from 'react-native-phone-call';
import * as Location from 'expo-location';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import MapView, { Marker } from 'react-native-maps';
import { Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { Rating } from 'react-native-ratings';
import { TopBar } from '../Component/navBar';
import { RootStackParamList } from './RootStackParamList';
import { CustomText } from "../Component/CustomText";
import { View, KeyboardAvoidingView, Alert,
  Text, ScrollView, TouchableOpacity, Dimensions} from "react-native";
import { setNavbar } from "../../redux/component/navbar";
import { useAppDispatch, useAppSelector } from '../../redux';
import { setOrderFail } from "../../redux/component/orderFail";
import { setSearch } from "../../redux/component/search";
import { useNavigation } from "@react-navigation/native";
import { setLatitude } from "../../redux/component/latitude";
import { setLongitude } from "../../redux/component/longitude";

type OrderMainType = StackNavigationProp<RootStackParamList, 'OrderMain'>

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

export default function OrderMain(){

  const orderFailState = useAppSelector(state => state.orderFail);
  const searchState = useAppSelector(state => state.search);
  const latitude = useAppSelector(state => state.latitude);
  const longitude = useAppSelector(state => state.longitude);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<OrderMainType>();
  
  const [ratingList, setRatingList] = React.useState<number[]>([GARAGE[0].rating, GARAGE[1].rating, GARAGE[2].rating]);

  const onChangeSearch = (query : string) => dispatch(setSearch(query));
  React.useEffect(() => {
    if(orderFailState == true){
      Alert.alert("Bengkel Tidak Ditemukan", 
        "Maaf Tidak Ada Bengkel Yang Tersedia di Daerah Sekitar Kamu",
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

  const submitSearch = (query: string) => {
    dispatch(setSearch(query));
    navigation.navigate('Find', {prevScreen:true});
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

    return(
    <View style={{flex:1}}>
      <MapView
        initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        }}
        style={{width:Dimensions.get('window').width, 
            height:Dimensions.get('window').height, 
            justifyContent:'center'}}
      >
      <TouchableOpacity style={{position:'absolute', top:0}}>
        <View style={{backgroundColor:'#3a4447', borderRadius:30, padding:5, width:40}}>
          <Icon name="chevron-left" size={30} color="black"/>
        </View>
      </TouchableOpacity>
        <Marker
         coordinate={{ latitude: latitude, longitude: longitude }}
         title={'Lokasi Anda'}
        >
        <Icon name={'location-pin'} size={50} color={'#4eacea'}/>
        </Marker>
      </MapView>
    </View>
    )
};

