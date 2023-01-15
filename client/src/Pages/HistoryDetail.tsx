import React from 'react';
import Style from "../Styles/HistoryDetailStyle";
import Icon from 'react-native-vector-icons/FontAwesome';
import call from 'react-native-phone-call';
import { View, ScrollView} from "react-native";
import { Avatar } from 'react-native-paper'; 
import { AbsoluteButton } from '../Component/CustomButton';
import { CustomText } from "../Component/CustomText";
import { Rating } from "react-native-ratings";

const GARAGE = [
  {
    id:1,
    title: 'Bengkel Borobudur',
    mechanicName:'Andi Wijaya',
    cust_location: 'Jalan Raya Singosari 16a, Malang',
    location: 'Jalan Simpang Borobudur II/30, Malang',
    handleType: 'motorcycle',
    date: '29/12/2022',
    phone: '087892314322',
    image: 'https://media.istockphoto.com/id/1255422375/id/foto/teknisi-mobil-pengecekan-otomotif-di-garasi.jpg?s=612x612&w=0&k=20&c=zvRIhHtt98k25vLNi4jzp-R5J1WTQOZPFJXg28hKfOo=',
    detailRepair: 'Perjalanan, Ganti Oli, Isi Bensin',
    repairTotal: '4.4, 1, 5',
    price: '5000, 90000, 13000',
    totalPaid: 200000,
    rating: 4,
  },
  {
    id:2,
    title: 'Bengkel Borobudur',
    mechanicName:'Andi',
    cust_location: 'Jalan Raya Singosari 16a, Malang',
    location: 'Jalan Sudimoro 10a Malang',
    handleType: 'motorcycle',
    date: '29/12/2022',
    phone: '0878123123123',
    image: 'https://carro.id/blog/wp-content/uploads/2020/12/Foto-3-Bosch-Module.png',
    detailRepair: 'Perjalanan, Ganti Oli, Isi Bensin',
    repairTotal: '2.4, 1, 5',
    price: '5000, 20000, 10000',
    totalPaid: 100000,
    rating: 1,
  },
  {
    id:3,
    title: 'Bengkel Otomotif "Mobil & Sepeda Motor"',
    mechanicName:'Tedjo',
    cust_location: 'Jalan Raya Singosari 16a, Malang',
    location: 'Jalan KH. Malik Malang',
    handleType: 'car',
    date: '21/12/2022',
    phone: '0878932131232',
    image: 'https://lh3.googleusercontent.com/proxy/d2WkPd-J9TOQ5vfgxe7MmElXs6cNhdKfgkZeU6WbT7Gd3f4rEYvRAhh-YJ2tcIHfBUVFyAyE3paL79LXpCmUdeB2CtNGf3_3nQ0b3DjhI02OTqggLEolRgkn0EXcmf4dWEQTbigfkjP_siJ7pBo7P82eA-sqfaLzUhjQFw=s1360-w1360-h1020',
    detailRepair: 'Perjalanan, Ganti Oli, Isi Bensin',
    repairTotal: '2.4, 1, 5',
    price: '5000, 20000, 10000',
    totalPaid: 100000,
    rating: 5,
  },
];

const USER = [
  {
    id:1,
    title: 'Karunia Nyata Motor',
    custName: 'Alexander Wijaya',
    cust_location: 'Plaza Araya, jl blimbing indah megah no 2, malang',
    location: 'Jalan Borobudur Ruko A. Yani 17/B4-5 Malang',
    image: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
    handleType: 'motorcycle',
    date: '15/01/2023',
    phone: '087892314322',
    detailRepair: 'Perjalanan, Ganti Oli, Isi Bensin',
    repairTotal: '5.9, 2',
    price: '2000, 12000',
    totalPaid: 100000,
    rating: 5,
  },
  {
    id:2,
    title: 'Bengkel Borobudur',
    custName:'Andi',
    cust_location: 'Jalan Raya Singosari 16a, Malang',
    location: 'Jalan Sudimoro 10a Malang',
    handleType: 'motorcycle',
    date: '29/12/2022',
    phone: '0878123123123',
    image: 'https://carro.id/blog/wp-content/uploads/2020/12/Foto-3-Bosch-Module.png',
    detailRepair: 'Perjalanan, Ganti Oli, Isi Bensin',
    repairTotal: '2.4, 1, 5',
    price: '5000, 20000, 10000',
    totalPaid: 100000,
    rating: 1,
  },
  {
    id:3,
    title: 'Bengkel Otomotif "Mobil & Sepeda Motor"',
    custName:'Tedjo',
    cust_location: 'Jalan Raya Singosari 16a, Malang',
    location: 'Jalan KH. Malik Malang',
    handleType: 'car',
    date: '21/12/2022',
    phone: '0878932131232',
    image: 'https://lh3.googleusercontent.com/proxy/d2WkPd-J9TOQ5vfgxe7MmElXs6cNhdKfgkZeU6WbT7Gd3f4rEYvRAhh-YJ2tcIHfBUVFyAyE3paL79LXpCmUdeB2CtNGf3_3nQ0b3DjhI02OTqggLEolRgkn0EXcmf4dWEQTbigfkjP_siJ7pBo7P82eA-sqfaLzUhjQFw=s1360-w1360-h1020',
    detailRepair: 'Perjalanan, Ganti Oli, Isi Bensin',
    repairTotal: '2.4, 1, 5',
    price: '5000, 20000, 10000',
    totalPaid: 100000,
    rating: 5,
  },
];

export function HistoryDetail(props : any){

  const DataID : number = props.route.params.id;
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

  let Content: any[] = [], repairList: string[], 
  repairPrice: string[], repairTotal: string[],
  Payment: any[] = [], PaymentDesc: string[], 
  PaymentPrice: string[], totalCost:number = 0, changeMoney: number;
  
  repairList = GARAGE[DataID - 1].detailRepair.split(',');
  repairTotal = GARAGE[DataID - 1].repairTotal.split(',');
  repairPrice = GARAGE[DataID - 1].price.split(',');
  for(let i = 0; i <= repairList.length - 1; i++){
    totalCost += Number(repairPrice[i]) * Number(repairTotal[i])
  };
  changeMoney = GARAGE[DataID - 1].totalPaid - totalCost;
  PaymentDesc = ['Biaya Total', 'Total Bayar', 'Kembalian']
  PaymentPrice = [ 
    String(totalCost),
    String(GARAGE[DataID - 1].totalPaid), 
    String(changeMoney)
  ]
  
  for(let i = 0; i <= repairTotal.length - 1;i++){
    Content.push(
      <View style={Style.descriptionLayout} key={"HistoryDetail" + i}>
        <View style={{flex:4}}>
        <CustomText
          selectable={true}
          title={repairList[i]}
          style={Style.descriptionStyle}/> 
        </View>
        <View style={{flex:5}}>
          <View style={{flexDirection:'row', justifyContent:'center'}}>
            <CustomText
              selectable={true}
              title={repairTotal[i]}
              style={[Style.descriptionStyle, {flex:1, fontSize:12, color:'#a5b3c8'}]}/> 
            <CustomText
              selectable={true}
              title={'x'}
              style={[Style.descriptionStyle, {flex:1, fontSize:12, color:'#a5b3c8'}]}/> 
            <CustomText
              selectable={true}
              title={'Rp. ' + repairPrice[i]}
              style={[Style.descriptionStyle, {flex:3, fontSize:12, color:'#a5b3c8'}]}/> 
          </View>
        </View>
        <View style={{flex:3, alignItems:'flex-end',paddingHorizontal:10}}>
          <CustomText
            title={'Rp. ' + (Number(repairTotal[i]) * Number(repairPrice[i]))} 
            style={[Style.descriptionStyle, {fontSize:12}]}
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
                  title={GARAGE[DataID - 1].cust_location}
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


export function HistoryDetailMechanic(props : any){

  const DataID : number = props.route.params.id;
  const [rating, setRating] = React.useState<number>(USER[props.route.params.id - 1].rating);
  const [rateState, setRateState] = React.useState<boolean>(USER[props.route.params.id - 1].rating != 0 ? true : false);

  const args = {
    number: USER[DataID - 1].phone,
    prompt: false,
    skipCanOpen: true
  }

  const processRate = (rating : number) => {
    if(rateState == false){
      setRating(rating);     
      setRateState(true);
    };
  };

  let Content: any[] = [], repairList: string[], 
  repairPrice: string[], repairTotal: string[],
  Payment: any[] = [], PaymentDesc: string[], 
  PaymentPrice: string[], totalCost:number = 0, changeMoney: number;
  
  repairList = USER[DataID - 1].detailRepair.split(',');
  repairTotal = USER[DataID - 1].repairTotal.split(',');
  repairPrice = USER[DataID - 1].price.split(',');
  for(let i = 0; i <= repairList.length - 2; i++){
    totalCost += Number(repairPrice[i]) * Number(repairTotal[i])
  };
  changeMoney = USER[DataID - 1].totalPaid - totalCost;
  PaymentDesc = ['Biaya Total', 'Total Bayar', 'Kembalian']
  PaymentPrice = [ 
    String(totalCost),
    String(USER[DataID - 1].totalPaid), 
    String(changeMoney)
  ]
  
  for(let i = 0; i <= repairTotal.length - 1;i++){
    Content.push(
      <View style={Style.descriptionLayout} key={"HistoryDetail" + i}>
        <View style={{flex:4}}>
        <CustomText
          selectable={true}
          title={repairList[i]}
          style={Style.descriptionStyle}/> 
        </View>
        <View style={{flex:5}}>
          <View style={{flexDirection:'row', justifyContent:'center'}}>
            <CustomText
              selectable={true}
              title={repairTotal[i]}
              style={[Style.descriptionStyle, {flex:1, fontSize:12, color:'#a5b3c8'}]}/> 
            <CustomText
              selectable={true}
              title={'x'}
              style={[Style.descriptionStyle, {flex:1, fontSize:12, color:'#a5b3c8'}]}/> 
            <CustomText
              selectable={true}
              title={'Rp. ' + repairPrice[i]}
              style={[Style.descriptionStyle, {flex:3, fontSize:12, color:'#a5b3c8'}]}/> 
          </View>
        </View>
        <View style={{flex:3, alignItems:'flex-end',paddingHorizontal:10}}>
          <CustomText
            title={'Rp. ' + (Number(repairTotal[i]) * Number(repairPrice[i]))} 
            style={[Style.descriptionStyle, {fontSize:12}]}
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
    <View style={{flex:1, paddingHorizontal: 5, marginBottom:30}}>  
      <View style={Style.descriptionContainer}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          overScrollMode="never">
          <CustomText 
            title={'Rating yang diberikan oleh pelanggan'} 
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
                source={{uri:USER[DataID - 1].image}}
                />
            </View>
            <View style={{flexDirection:'column', flex:4}}>
              <CustomText 
                title={USER[DataID - 1].custName}
                style={{textAlign:'left', fontWeight:'700'}}/>
              <CustomText 
                title={USER[DataID - 1].phone}
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
                  title={USER[DataID - 1].location}
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
                  title={USER[DataID - 1].cust_location}
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
  </View>
  )
};
