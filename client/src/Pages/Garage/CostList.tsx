import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { RootStackParamList } from "../RootStackParamList";
import Style from "../../Styles/GarageStyle/CostList";
import { CustomButton } from "../../Component/CustomButton";
import { CustomText } from "../../Component/CustomText";

type CostListType = StackNavigationProp<RootStackParamList, 'CostList'>;

const CURRENTORDER = [
    {
        id: '1',
        MechanicPhoto: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.jixXH_Els1MXBRmKFdMQPAHaHa%26pid%3DApi&f=1&ipt=f6226b19fdf84268925ffde0669899308c1e64ed116e980234d3ee7858d409c6&ipo=images',
        MechanicName: 'Montir A',
        CustomerName: 'Cepi',
        CustomerLocation: 'Jalan Sukma 1',
        ServiceName: ['Ganti Ban', 'Ganti Oli'],
        ServiceCost: [50000, 50000]
    }
];

const Item = ({description, quantity, price}) => {
  return(
    <View style={{flexDirection:'row', flex:5, padding:15, alignItems:'center'}}>
      <CustomText title={description} size={15} color='#919b9f' style={{flex:2, marginBottom:0, marginLeft:0, textAlign:'left'}}/>
        <View style={{flex:1, flexDirection:'row'}}>
          <CustomText title={'Rp. ' + price} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
          <CustomText title={' x '} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
          <CustomText title={'('+ quantity + ')'} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
        </View>
      <CustomText title={'Rp. ' + price * quantity} size={15} color='#919b9f' style={{flex:2, marginLeft:0, marginBottom:0, textAlign:'right'}}/>
    </View>
  )
}

export default function CostList(props){

   const OrderID : number = props.route.params.id;
   let costlist = 0, Content:any[] = [];

   const renderItem = ({ item }) => {
    return(
      <Item
        description = {item.description}
        quantity = {item.quantity}
        price = {item.price}/>
    )
  }

  let distance : number = 2.4;
  let service_cost : number = 0;
  let CostList : any = [
    {
      description:'Bensin', 
      quantity:5, 
      price:10000
    },
    {
      description:'Bensin', 
      quantity:5, 
      price:10000
    },
    {
      description:'Bensin', 
      quantity:5, 
      price:10000
    },
    {
      description:'Bensin', 
      quantity:5, 
      price:10000
    },
    {
      description:'Bensin', 
      quantity:5, 
      price:10000
    },
    {
      description:'Bensin', 
      quantity:5, 
      price:10000
    },
    {
      description:'Bensin', 
      quantity:5, 
      price:10000
    },
    {
      description:'Perjalanan',
      quantity:distance,
      price: 2000,
    }
  ];

  for(let i = 0; i <= CostList.length - 1; i++){
    service_cost += CostList[i].quantity * CostList[i].price;
  };

   for(let i=0; i<=CURRENTORDER[OrderID - 1].ServiceName.length-1; i++)
   {
    Content.push(
      <View style={{flexDirection: 'row'}}>
        <Text>{CURRENTORDER[OrderID - 1].ServiceName[i]} {'\t'}</Text>
        <Text>Rp{CURRENTORDER[OrderID - 1].ServiceCost[i]},00</Text>
      </View>
    )
    costlist = costlist + CURRENTORDER[OrderID - 1].ServiceCost[i];
   }

   return(
    <View style={{flex:1, marginTop:20}}>
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }}>
          <View style={{alignItems:'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Image style={Style.iconImage} source={{uri: CURRENTORDER[OrderID - 1].MechanicPhoto}}/>
            <Text style={Style.titleStyle}>{CURRENTORDER[OrderID - 1].MechanicName}</Text>
          </View>
          <View style={Style.contentContainer}>
            <View style={Style.customerDetail}>
              <Text style={Style.detailText}>Nama Customer {'\t'} {CURRENTORDER[OrderID - 1].CustomerName} {'\n'}</Text>
              <Text style={Style.detailText}>Lokasi {CURRENTORDER[OrderID - 1].CustomerLocation}</Text>
            </View>
          </View>
          <Text
          style={Style.textLabel}>Rincian Perbaikan</Text>
          <View style={Style.contentContainer}>
            <View style={Style.costListDetail}>
            {Content}
            <Text style={Style.detailText}>TOTAL BIAYA {'\t'} Rp{costlist},00</Text>
            <CustomButton title="EDIT"></CustomButton>
            <CustomButton title="BUAT BUKTI PEMBAYARAN"></CustomButton>
            </View>
          </View>
        </View>
          
      </ScrollView>
    </View>
   )
}
