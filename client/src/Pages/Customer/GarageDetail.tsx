import { View, Image, ScrollView} from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../../Styles/CustomerStyle/GarageDetail";
import { RootStackParamList } from '../RootStackParamList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AbsoluteButton} from '../../Component/CustomButton';
import { CustomText } from "../../Component/CustomText";
import { Rating } from "react-native-ratings";

type GarageDetailType = StackNavigationProp<RootStackParamList, 'GarageDetail'>

const DATA = [
  {
    id:1,
    title: 'Bengkel HAN Paint & Body Repair',
    location: 'Jalan Simpang Borobudur II/30 Malang',
    rating: 4.6,
    handleType: 'Mobil',
    openHour: '08.00 - 16.00',
    openDay: 'Senin - Sabtu',
    website: '-',
    phone: '03414345708',
    image: 'https://fastly.4sqi.net/img/general/600x600/kqcisOYA0E_RxnDI_vbPRBl0mpHPrm4GzSS8duldpWU.jpg',
  },
  {
    id:2,
    title: 'Bengkel Borobudur',
    location: 'Jalan Sudimoro 10a Malang',
    rating: 4.5,
    openHour: '08.00 - 16.00',
    openDay: 'Senin - Sabtu',
    handleType: 'Mobil',
    website: '-',
    phone: '085106468000',
    image: 'https://i0.wp.com/caritempat.online/wp-content/uploads/2020/08/bengkel-borobudur.jpg?resize=904%2C550'
  },
  {
    id:3,
    title: 'Bengkel Mobil "ipunk motor"',
    location: 'Jalan Blimbing Indah Tengah VIII C3/6 Malang',
    rating: 5,
    openHour: '08.00 - 17.00',
    openDay: 'Senin - Sabtu',
    handleType: 'Mobil',
    website: '-',
    phone: '085336361030',
    image: 'https://images.autofun.co.id/file1/7d6197ada81840279d68af0785d4f591_678x380.jpg',
  },
  {
    id:4,
    title: 'Karunia Nyata Motor',
    location: 'Jalan Borobudur Ruko A. Yani 17/B4-5 Malang',
    rating: 4.5,
    openHour: '07.30 - 17.00',
    openDay: 'Senin - Minggu',
    handleType: 'Motor',
    website: 'https://karunianyatamotor.business.site/?utm_source=gmb&utm_medium=referral',
    phone: '0341418959',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/1c/e7/61/fb/b4-5-blimbing-malang.jpg',
  },
  {
    id:5,
    title: 'Bengkel Panggilan Motor 24 Jam',
    location: 'Jalan Raya Cemorokandang 26 Malang',
    rating: 4.4,
    openHour: '00.00 - 00.00',
    openDay: 'Senin - Minggu',
    handleType: 'Motor',
    website: '-',
    phone: '081249557746',
    image: 'https://images.autofun.co.id/file1/a8b369e5cb5045ae9b1a9e3a75949490_678x380.jpg',
  },
  {
    id:6,
    title: 'Bengkel Suhat Motor',
    location: 'Jalan Soekarno Hatta 11 Malang',
    rating: 4.6,
    openHour: '08.00 - 17.00',
    openDay: 'Senin - Sabtu',
    handleType: 'Motor',
    website: 'https://bengkel-suhat-motor.business.site/',
    phone: '082213438110',
    image: 'https://lh3.googleusercontent.com/p/AF1QipNexNjPPd2lL1BPS7cHW__uBz1vmDBaZX-xsH8C=w1080-h608-p-k-no-v0',
  },
  {
    id:7,
    title: 'Bengkel Otomotif "Mobil & Sepeda Motor"',
    location: 'Jalan KH. Malik Malang',
    rating: 5.0,
    openHour: '08.00 - 19.00',
    openDay: 'Senin - Minggu',
    handleType: 'Mobil-Motor',
    website: '-',
    phone: '0341716440',
    image: 'https://lh3.googleusercontent.com/proxy/d2WkPd-J9TOQ5vfgxe7MmElXs6cNhdKfgkZeU6WbT7Gd3f4rEYvRAhh-YJ2tcIHfBUVFyAyE3paL79LXpCmUdeB2CtNGf3_3nQ0b3DjhI02OTqggLEolRgkn0EXcmf4dWEQTbigfkjP_siJ7pBo7P82eA-sqfaLzUhjQFw=s1360-w1360-h1020',
  }

];


export default function GarageDetail(props){

  const navigation = useNavigation<GarageDetailType>();
  const DataID : number = props.route.params.id;

  let icon_list : string[] = [], desc_list : any[] = [], Content : any[] = []; 
  icon_list = ['map-marker','clock-o','globe', 'phone', 'calendar', 'wrench']
  desc_list = [DATA[DataID - 1].location, DATA[DataID - 1].openHour, 
    DATA[DataID - 1].website, DATA[DataID - 1].phone, DATA[DataID - 1].openDay, 
    DATA[DataID - 1].handleType]
  
  for(let i = 0; i <= icon_list.length;i++){
    Content.push(
      <View style={Style.descriptionLayout} key={"Garage" + i}>
        <View style={{flex:1, alignItems:'center'}}>
          <Icon 
            name={icon_list[i]} 
            size={30}
            color="#b99504"
            style={{flex:1}}
            />
        </View>
        <View style={{flex:7}}>
        <CustomText
          selectable={true}
          title={desc_list[i]}
          style={Style.descriptionStyle}/> 
        </View>
      </View>
    )
  }
  return(
  <View style={{flex:1, paddingHorizontal: 5}}>
    <ScrollView>
      <Image 
        source={{uri: DATA[DataID - 1]?.image}} 
        style={{height:200, left:0, right:0}}
        resizeMode="cover"/>
      
      <View style={Style.descriptionContainer}>
        <CustomText title={DATA[DataID - 1]?.title} style={Style.titleText}/> 
        <Rating
          type='custom'
          startingValue={DATA[DataID - 1].rating}
          ratingBackgroundColor="#B1B5C1"
          imageSize={30}
          tintColor='white'
          readonly={true} 
          />
        <View style={{marginTop:20}}>
          {Content}
        </View>
      </View>
    </ScrollView>
    <AbsoluteButton 
      title={'Panggil Bengkel'}
      style={{marginHorizontal:15}}
      onPress={() => navigation.navigate('OrderGarage', {id:DATA[DataID - 1].id, 
        handleType:DATA[DataID - 1].handleType})}/>
  </View>
  )
};
