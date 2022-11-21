import { View, KeyboardAvoidingView, Alert,
  Image, Text, ScrollView, TouchableOpacity, Dimensions} from "react-native";
import call from 'react-native-phone-call';
import React from 'react';
import { Searchbar, Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/Entypo';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import { Rating } from 'react-native-ratings';
import Style from "../Styles/homeStyle";
import { TopBar, BottomNav } from '../Component/navBar';
import { MultipleButton } from '../Component/CustomButton';
import { RootStackParamList } from './RootStackParamList';
import { setNavbar } from "../../redux/component/navbar";
import { useAppDispatch, useAppSelector } from '../../redux';
import { setOrderFail } from "../../redux/component/order";
import { setSearch } from "../../redux/component/search";
import * as Location from 'expo-location';
import { CustomText } from "../Component/CustomText";

type HomeType = StackNavigationProp<RootStackParamList, 'Home'>

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

export default function Home(){

  const orderFailState = useAppSelector(state => state.orderFail);
  const searchState = useAppSelector(state => state.search);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeType>();
  
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [,updateState] = React.useState<number>();
  const forceUpdate = React.useCallback(() => updateState(0),[]);

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
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  },[]);

  let latitude: number = 0, longitude: number = 0;
  if(location){
    latitude = location['coords']['latitude'];
    longitude = location['coords']['longitude'];
  };

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

    Cards.push(
      <Card style={Style.CardStyle} key={"Card" + i}>
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
          <View style={Style.CardAction}>
            <Rating
              type='custom'
              startingValue={GARAGE[i]?.rating}
              ratingBackgroundColor="#B1B5C1"
              imageSize={30}
              tintColor='#fffde6'
              readonly={GARAGE[i]?.rating == 0 ? false : true}
              onFinishRating={(rating : number) => GARAGE[i]!.rating = rating}
              style={Style.ratingStyle}/>
            <TouchableOpacity 
              onPress={()=>call(args).catch(console.error)}
              style={Style.MyButton} 
              activeOpacity={0.7}>
              <Icon 
               name={"phone"} 
               size={20} 
               color="#fff"
               />
              <Text style={Style.ButtonText}> Hubungi Bengkel</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    )
  }

  if(latitude != 0 && longitude != 0){
    return(
    <View style={{flex:1}}>
      <TopBar/>
      <ScrollView contentContainerStyle={{flexGrow:1}}>
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
                style={{width:Dimensions.get('window').width, 
                    height:300, 
                    justifyContent:'center'}}
              >
                <Marker
                  coordinate={{ latitude: latitude, longitude: longitude }}
                  title={'Lokasi Anda'}
                >
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey={null}
                />
                <Icon name={'location-pin'} size={50} color={'#4eacea'}/>
                </Marker>
              </MapView>
              <TouchableOpacity onPress={() => {navigation.navigate('Order')}} 
                  style={[Style.MyButton, {position :'absolute', bottom: 8, right: 8}]} activeOpacity={0.7}>
               <Icon 
                 name={"tools"} 
                 size={20} 
                 color="#fff"
                 />
               <Text style={Style.ButtonText}> Cari Terdekat</Text>
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
        <BottomNav/>
      </View>
    )
  }else{
    setTimeout(()=>{forceUpdate},5000)
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#242A2F'}}>
        <CustomText 
          title="Sedang memuat" 
          color={'white'}
          style={{fontSize:20}}/>
        <ActivityIndicator animating={true} color={'#b99504'} size={30}/>
      </View>
    )
  }
};

