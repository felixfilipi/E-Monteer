import { Button, View, Text, FlatList, Image, SafeAreaView, TouchableHighlight, Alert, ScrollView} from "react-native";
import { Avatar } from 'react-native-paper'; 
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../Styles/historyDetailStyle";
import { RootStackParamList } from './RootStackParamList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AbsoluteButton, MultipleButton } from '../Component/CustomButton';
import { CustomText } from "../Component/CustomText";
import { Rating } from "react-native-ratings";

type FindType = StackNavigationProp<RootStackParamList, 'Garage'>

const GARAGE = [
  {
    id:1,
    title: 'Bengkel Cepi Jaya',
    mechanicName:'Jamaludin',
    location: 'Jalan MH Thamrin 1, Jakarta Pusat.',
    handleType: 'car',
    date: '01/01/2001',
    phone: '087892314322',
    image: 'https://carro.id/blog/wp-content/uploads/2020/12/Foto-3-Bosch-Module.png'
  },
  {
    id:2,
    title: 'Bengkel bos jaya',
    location: 'bangalore, singapore.',
    handleType: 'motorcycle',
    date: '01/01/2001',
    phone: '0878123123123',
    image: 'https://assets.kompasiana.com/items/album/2020/09/12/motor2-5f5c4f64d541df5c327a59d2.jpg?t=o&v=770'
  },
  {
    id:3,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    handleType: 'car',
    date: '01/01/2001',
    phone: '0878932131232',
    image: 'https://imgx.gridoto.com/crop/0x0:0x0/700x465/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/gridoto/2017/10/13/2370856391.jpg',
  },
  {
    id:4,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    handleType: 'motorcycle',
    date: '01/01/2001',
    phone: '087892314322',
    image: 'https://www.asuransiastra.com/wp-content/uploads/2022/06/Pilih-Bengkel-Motor-Resmi-atau-Non-Resmi-Ini-Perbedaannya.jpg',
  },
  {
    id:5,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    handleType: 'car',
    date: '01/01/2001',
    phone: '087892314322',
    image: 'https://imgx.gridoto.com/crop/0x0:0x0/700x465/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/gridoto/2017/10/13/2370856391.jpg',
  },
  {
    id:6,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    handleType: 'motorcycle',
    date: '01/01/2001',
    phone: '087892314322',
    image: 'https://imgx.gridoto.com/crop/0x0:0x0/700x465/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/gridoto/2017/10/13/2370856391.jpg',
  },
  {
    id:7,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    handleType: 'car',
    date: '01/01/2001',
    phone: '087892314322',
    image: 'https://imgx.gridoto.com/crop/0x0:0x0/700x465/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/gridoto/2017/10/13/2370856391.jpg',
  }
];

export default function HistoryDetail(props){

  const navigation = useNavigation<FindType>();
  const [DataID, setDataID] = React.useState<number>(props.route.params.id);

  return(
  <View style={{flex:1, paddingHorizontal: 5}}>
    <ScrollView>
      <View style={Style.descriptionContainer}>
        <CustomText 
          title={'Beri Rating untuk Bengkel ini?'} 
          style={Style.titleText}
          size={20}/> 
        <Rating
          type='custom'
          startingValue={0}
          ratingBackgroundColor="#B1B5C1"
          imageSize={30}
          tintColor='white'
          readonly={true} 
          />
        <View style={Style.avatarContainer}>
          <View style={{flex:1}}>
            <Avatar.Image 
              size={60}
              source={{uri:GARAGE[DataID - 1].image}}
              />
          </View>
          <View style={{flexDirection:'column', flex:4}}>
            <CustomText 
              title={GARAGE[DataID - 1].mechanicName}
              style={{textAlign:'left', fontWeight:'700'}}/>
            <CustomText 
              title={GARAGE[DataID - 1].phone}
              style={{textAlign:'left'}}/>
          </View>
        </View>
        <View style={Style.pickupContainer}>
          <CustomText 
            title="Detail Penjemputan" 
            color="#c5c2c0"
            style={{textAlign:'left', fontWeight:'600'}}/>
          
          <View style={Style.horizontalContainer}>
            <View style={Style.iconContainer}>
              <Icon name="wrench" size={30} color={'#b99504'}/>
            </View>
            <View style={{flex:5}}>
              <CustomText 
                title="Alamat Bengkel"
                color="#c5c2c0"
                style={{textAlign:'left', fontWeight:'700'}}/>
              <CustomText 
                title={GARAGE[DataID - 1].location}
                color="black"
                size={15}
                style={{textAlign:'left', fontWeight:'600'}}/>
            </View>
          </View>
          
          <View style={Style.horizontalContainer}>
            <View style={Style.iconContainer}>
              <Icon name="map-pin" size={30} color={'#b99504'}/>
            </View>
            <View style={{flex:5}}>
              <CustomText 
                title="Lokasi Penjemputan"
                color="#c5c2c0"
                style={{textAlign:'left', fontWeight:'700'}}/>
              <CustomText 
                title={GARAGE[DataID - 1].location}
                color="black"
                size={15}
                style={{textAlign:'left', fontWeight:'600'}}/>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
    <AbsoluteButton 
      title={'Panggil Bengkel'}
      style={{marginHorizontal:15}}/>
  </View>
  )
};
