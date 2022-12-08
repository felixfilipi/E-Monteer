import React from 'react';
import Style from "../Styles/historyDetailStyle";
import Icon from 'react-native-vector-icons/FontAwesome';
import call from 'react-native-phone-call';
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView} from "react-native";
import { Avatar } from 'react-native-paper'; 
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from './RootStackParamList';
import { AbsoluteButton } from '../Component/CustomButton';
import { CustomText } from "../Component/CustomText";
import { Rating } from "react-native-ratings";

type FindType = StackNavigationProp<RootStackParamList, 'Garage'>

const GARAGE = [
  {
    id:1,
    title: 'Bengkel Cepi Jaya',
    mechanicName:'Cepi',
    location: 'Jalan MH Thamrin 1, Jakarta Pusat.',
    handleType: 'car',
    date: '01/01/2001',
    phone: '087892314322',
    image: 'https://carro.id/blog/wp-content/uploads/2020/12/Foto-3-Bosch-Module.png',
    detailPembayaran: {
      'Ganti Ban Mobil' : 20000, 
      'Ganti Oli' : 10000,
      'Ganti SparePart' : 100000,
      'deliveryPrice': 10000,
    },
    totalPaid: 450000,
    rating: 0,
  },
  {
    id:2,
    title: 'Bengkel bos jaya',
    mechanicName:'Master',
    location: 'bangalore, singapore.',
    handleType: 'motorcycle',
    date: '01/01/2001',
    phone: '0878123123123',
    image: 'https://assets.kompasiana.com/items/album/2020/09/12/motor2-5f5c4f64d541df5c327a59d2.jpg?t=o&v=770',
    detailRepair: 'Ganti Knalpot Mobil, Ganti Oli',
    repairTotal: '1,1',
    price: 80000,
    totalPrice: 96000,
    deliveryPrice: 16000,
    totalPaid: 100000,
    changeMoney: 4000,
    rating: 1,
  },
  {
    id:3,
    title: 'Bengkel kuli jaya',
    mechanicName:'Slave',
    location: 'kebon kacang, jakarta pusat.',
    handleType: 'car',
    date: '01/01/2001',
    phone: '0878932131232',
    image: 'https://imgx.gridoto.com/crop/0x0:0x0/700x465/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/gridoto/2017/10/13/2370856391.jpg',
    detailRepair: 'Ganti Ban Mobil',
    repairTotal: '1',
    price: 320000,
    totalPrice: 330000,
    deliveryPrice: 10000,
    totalPaid: 330000,
    changeMoney: 0,
    rating: 5,
  },
  {
    id:4,
    title: 'Bengkel kuli jaya',
    mechanicName:'Master',
    location: 'kebon kacang, jakarta pusat.',
    handleType: 'motorcycle',
    date: '01/01/2001',
    phone: '087892314322',
    image: 'https://www.asuransiastra.com/wp-content/uploads/2022/06/Pilih-Bengkel-Motor-Resmi-atau-Non-Resmi-Ini-Perbedaannya.jpg',
    detailRepair: 'Ganti Ban Mobil,Ganti Oli,Ganti SparePart',
    repairTotal: '4,1,2',
    price: 320000,
    totalPrice: 330000,
    deliveryPrice: 10000,
    totalPaid: 330000,
    changeMoney: 0,
    rating: 0,
  },
  {
    id:5,
    title: 'Bengkel kuli jaya',
    mechanicName:'Master',
    location: 'kebon kacang, jakarta pusat.',
    handleType: 'car',
    date: '01/01/2001',
    phone: '087892314322',
    image: 'https://imgx.gridoto.com/crop/0x0:0x0/700x465/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/gridoto/2017/10/13/2370856391.jpg',
    detailRepair: 'Ganti Ban Mobil, Ganti Oli, Ganti SparePart',
    repairTotal: '4,1,2',
    price: 320000,
    totalPrice: 330000,
    deliveryPrice: 10000,
    totalPaid: 330000,
    changeMoney: 0,
    rating: 0,
  },
  {
    id:6,
    title: 'Bengkel kuli jaya',
    mechanicName:'Master',
    location: 'kebon kacang, jakarta pusat.',
    handleType: 'motorcycle',
    date: '01/01/2001',
    phone: '087892314322',
    image: 'https://imgx.gridoto.com/crop/0x0:0x0/700x465/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/gridoto/2017/10/13/2370856391.jpg',
    detailRepair: 'Ganti Ban Mobil, Ganti Oli, Ganti SparePart',
    repairTotal: '4,1,2',
    price: 320000,
    totalPrice: 330000,
    deliveryPrice: 10000,
    totalPaid: 330000,
    changeMoney: 0,
    rating: 0,
  },
  {
    id:7,
    title: 'Bengkel kuli jaya',
    mechanicName:'Master',
    location: 'kebon kacang, jakarta pusat.',
    handleType: 'car',
    date: '01/01/2001',
    phone: '087892314322',
    image: 'https://imgx.gridoto.com/crop/0x0:0x0/700x465/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/gridoto/2017/10/13/2370856391.jpg',
    detailRepair: 'Ganti Ban Mobil, Ganti Oli, Ganti SparePart',
    repairTotal: '4,1,2',
    price: '320000',
    totalPrice: 330000,
    deliveryPrice: 10000,
    totalPaid: 330000,
    changeMoney: 0,
    rating: 0,
  }
];

export default function HistoryDetail(props){

  const navigation = useNavigation<FindType>();
  const [DataID, setDataID] = React.useState<number>(props.route.params.id);
  const [rating, setRating] = React.useState<number>(GARAGE[props.route.params.id - 1].rating);
  const [rateState, setRateState] = React.useState<boolean>(GARAGE[props.route.params.id - 1].rating != 0 ? true : false);

  const args = {
    number: GARAGE[DataID - 1].phone,
    prompt: false,
    skipCanOpen: true
  }

  const processRate = (rating : number) => {
    if(rateState == false){
      setRating(rating);     
      setRateState(true);
    };
  };

  let Content: any[] = [], repairList: string[], repairTotal: string[],
  Payment: any[] = [], PaymentDesc: string[], PaymentPrice: string[];
  
  repairList = GARAGE[DataID - 1].detailRepair.split(',');
  repairTotal = GARAGE[DataID - 1].repairTotal.split(',');
  PaymentDesc = ['Harga', 'Biaya Perjalanan', 'Total Harga', 'Total Bayar', 'Kembalian']
  PaymentPrice = [ 
    String(GARAGE[DataID - 1].price), 
    String(GARAGE[DataID - 1].deliveryPrice),
    String(GARAGE[DataID - 1].totalPrice), 
    String(GARAGE[DataID - 1].totalPaid),
    String(GARAGE[DataID - 1].changeMoney)
  ]
  
  for(let i = 0; i <= repairTotal.length;i++){
    Content.push(
      <View style={Style.descriptionLayout} key={"HistoryDetail" + i}>
        <View style={{flex:7}}>
        <CustomText
          selectable={true}
          title={repairList[i]}
          style={Style.descriptionStyle}/> 
        </View>
        <View style={{flex:1, alignItems:'flex-end',paddingHorizontal:10}}>
          <CustomText
            title={repairTotal[i]} 
            style={Style.descriptionStyle}
            />
        </View>
      </View>
    )
  }

  for(let i = 0; i <= PaymentDesc.length;i++){
    Payment.push(
      <View style={Style.descriptionLayout} key={"Payment" + i}>
        <View style={{flex:7}}>
        <CustomText
          selectable={true}
          title={PaymentDesc[i]}
          style={Style.descriptionStyle}/> 
        </View>
        <View style={{flex:2, alignItems:'flex-end',paddingHorizontal:10}}>
          <CustomText
            title={PaymentPrice[i]} 
            style={Style.descriptionStyle}
            />
        </View>
      </View>
    )
  }

  return(
  <View style={{flex:1}}>
    <View style={{flex:1, paddingHorizontal: 5, marginBottom:70}}>  
      <View style={Style.descriptionContainer}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          overScrollMode="never">
          <CustomText 
            title={'Beri Rating untuk Bengkel ini?'} 
            style={Style.titleText}
            size={20}/> 
          <Rating
            type='custom'
            startingValue={rating}
            ratingBackgroundColor="#B1B5C1"
            imageSize={30}
            tintColor='white'
            onFinishRating={(rating : number) => processRate(rating)}
            readonly={rateState} 
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
          
          <View style={[Style.pickupContainer, {paddingBottom:-20}]}>
            <CustomText 
              title="Detail Perbaikan" 
              color="#c5c2c0"
              style={{textAlign:'left', fontWeight:'600'}}/>
              
              { Content }
          
            </View>
        
          <View style={[Style.pickupContainer, {paddingBottom:-20}]}>
            <CustomText 
              title="Detail Pembayaran" 
              color="#c5c2c0"
              style={{textAlign:'left', fontWeight:'600'}}/>
              
              { Payment }
          
            </View>

        </ScrollView>
      </View>
    </View>
    <AbsoluteButton 
      title={'Hubungi Bengkel'}
      style={{marginHorizontal:15}}
      onPress={()=>call(args).catch(console.error)}/>
  </View>
  )
};
