import { View, KeyboardAvoidingView, Alert,
  Text, ScrollView, TouchableOpacity, Dimensions, Image, Button, Pressable, SafeAreaView, FlatList} from "react-native";
import call from 'react-native-phone-call';
import React from 'react';
import { Searchbar, Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/Entypo';
import MapView, { Marker } from 'react-native-maps';
import { Rating } from 'react-native-ratings';
import Style from "../../Styles/garageHomeStyle";
import { TopBar, BottomGarageNav } from '../../Component/navBar';
import { MultipleButton } from '../../Component/CustomButton';
import { RootStackParamList } from '../RootStackParamList';
import { setNavbar } from "../../../redux/component/navbar";
import { useAppDispatch, useAppSelector } from '../../../redux';
import { setOrderFail } from "../../../redux/component/order";
import { setSearch } from "../../../redux/component/search";
import * as Location from 'expo-location';
import { CustomText } from "../../Component/CustomText";
import { setLatitude } from "../../../redux/component/latitude";
import { setLongitude } from "../../../redux/component/longitude";

type GarageHomeType = StackNavigationProp<RootStackParamList, 'GarageHome'>

const ORDER = [
  {
    id:1,
    title: 'Pesanan A',
    mechanicPhoto: "../../../assets/images/blogo.png",
    statusOrder: true,
  },
  {
    id:2,
    title: 'Pesanan B',
    mechanicPhoto: "../../../assets/images/blogo.png",
    statusOrder: true,
  }
]

const Item = ({orderid, ordertitle, mechanicPhoto, statusOrder}) => {
  const navigation = useNavigation<GarageHomeType>();

  if(statusOrder == true)
  {
    return(
      <View style={Style.flatListStyle}>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1, justifyContent:'center'}}>
            <View style={Style.handleContainer}>
              <Image source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.jixXH_Els1MXBRmKFdMQPAHaHa%26pid%3DApi&f=1&ipt=f6226b19fdf84268925ffde0669899308c1e64ed116e980234d3ee7858d409c6&ipo=images'}} style={Style.statusImage} />
            </View>
            </View>
            <View style={{flex:5, paddingHorizontal:10}}>
              <Text style={Style.titleStyle}>{ordertitle}</Text>
            </View>
            <View style={{ flex:3, justifyContent:'center', alignContent:'center' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CheckOrder', {id: orderid})}
              style={Style.roundButton1}>
              <Text>Periksa</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
  else
  {
    <View style={Style.flatListStyle}>
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1, justifyContent:'center'}}>
        <View style={{flex:5, paddingHorizontal:10}}>
              <Text style={Style.titleStyle}>Tidak</Text>
            </View>
        </View>
      </View>
      
    </View>
  }
}

export default function GarageHome(){

  const dispatch = useAppDispatch();
  const navigation = useNavigation<GarageHomeType>();

  const [garageStatus, setGarageStatus] = React.useState<string>('BUKA');
  const [statusIcon, setStatusIcon] = React.useState<string>('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png');
  
  const renderItem = ({ item }) => {
    return(
      <Item 
        ordertitle={item.title} 
        mechanicPhoto={item.mechanicPhoto}
        statusOrder={item.statusOrder}
        orderid={item.id}
        />
    )
  };

  const changeStatus = (garageStatus) => {
    if(garageStatus == 'BUKA')
    {
      setGarageStatus('TUTUP');
      setStatusIcon('http://www.newdesignfile.com/postpic/2015/12/red-cross-icon_96454.png');
    }
    else
    {
      setGarageStatus('BUKA');
      setStatusIcon('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png')
    }
  }

  return(
    <View style={{flex:1}}>
      <TopBar/>
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }}>
          <Text
          style={Style.textLabel}>Status Bengkel Anda</Text>
          <View style={{alignItems:'center'}}>
            <Image 
            source={{uri: statusIcon}} style={Style.statusImage}/>
            <Pressable onPress={() => changeStatus(garageStatus)}>
              <Text style={Style.myButton}>{garageStatus}</Text>
            </Pressable>
            <Text
            style={{fontSize:14, color: 'white'}}>Tekan tombol untuk mengubah status Anda {'\n'}</Text>
          </View>
          <Text
          style={Style.textLabel}>Pesanan Saat ini</Text>
          <View style={Style.contentContainer}>
            <SafeAreaView style={Style.currentOrderList}>
              <FlatList
                data={ORDER}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                nestedScrollEnabled
                ItemSeparatorComponent={() => (<View style={{backgroundColor: '#C5C2C0', height:1}}/>)}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
              />
            </SafeAreaView>
          </View>
        </View>
          
      </ScrollView>
      <BottomGarageNav />
    </View>
  )
};

