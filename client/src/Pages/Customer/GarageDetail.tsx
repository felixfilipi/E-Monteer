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
    title: 'Bengkel Cepi Jaya',
    location: 'Jalan MH Thamrin 1, Jakarta Pusat.',
    rating: 5,
    handleType: 'Mobil-Motor',
    openHour: '08.00 AM - 17.00 PM',
    openDay: 'Senin - Minggu',
    website: 'www.cepi.com',
    phone: '087892314322',
    image: 'https://imgx.gridoto.com/crop/0x0:0x0/700x500/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/2020/12/19/3411804514.png',
  },
  {
    id:2,
    title: 'Bengkel bos jaya',
    location: 'bangalore, singapore.',
    rating: 1.5,
    openHour: '08.30 AM - 17.20 PM',
    openDay: 'Senin - Jumat',
    handleType: 'Motor',
    date: '01/01/2001',
    website: 'www.bos.com',
    phone: '0878123123123',
    image: 'https://assets.kompasiana.com/items/album/2020/09/12/motor2-5f5c4f64d541df5c327a59d2.jpg?t=o&v=770'
  },
  {
    id:3,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    rating: 4,
    openHour: '07.00 AM - 17.50 PM',
    openDay: 'Rabu - Minggu',
    handleType: 'Mobil',
    date: '01/01/2001',
    website: 'www.kuli.com',
    phone: '0878932131232',
    image: 'https://imgx.gridoto.com/crop/0x0:0x0/700x465/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/gridoto/2017/10/13/2370856391.jpg',
  },
  {
    id:4,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    rating: 3,
    openHour: '06.00 AM - 17.00 PM',
    openDay: 'Senin - Minggu',
    handleType: 'motorcycle',
    date: '01/01/2001',
    website: 'www.cepi.com',
    phone: '087892314322',
    image: 'https://www.asuransiastra.com/wp-content/uploads/2022/06/Pilih-Bengkel-Motor-Resmi-atau-Non-Resmi-Ini-Perbedaannya.jpg',
  },
  {
    id:5,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    rating: 2,
    openHour: '08.00 AM - 17.00 PM',
    openDay: 'Senin - Minggu',
    handleType: 'car',
    date: '01/01/2001',
    website: 'www.cepi.com',
    phone: '087892314322',
    image: 'https://imgx.gridoto.com/crop/0x0:0x0/700x465/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/gridoto/2017/10/13/2370856391.jpg',
  },
  {
    id:6,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    rating: 3,
    openHour: '08.00 AM - 17.00 PM',
    openDay: 'Senin - Minggu',
    handleType: 'motorcycle',
    date: '01/01/2001',
    website: 'www.cepi.com',
    phone: '087892314322',
    image: 'https://imgx.gridoto.com/crop/0x0:0x0/700x465/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/gridoto/2017/10/13/2370856391.jpg',
  },
  {
    id:7,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    rating: 3.3,
    openHour: '08.00 AM - 17.00 PM',
    openDay: 'Senin - Minggu',
    handleType: 'Mobil',
    date: '01/01/2001',
    website: 'www.cepi.com',
    phone: '087892314322',
    image: 'https://imgx.gridoto.com/crop/0x0:0x0/700x465/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/gridoto/2017/10/13/2370856391.jpg',
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
