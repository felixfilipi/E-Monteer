import { TopBar, BottomNav } from '../../Component/navBar';
import { CustomText } from '../../Component/CustomText';
import Icon from "react-native-vector-icons/AntDesign";
import { View, ScrollView, TouchableHighlight, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { CustomButton } from '../../Component/CustomButton';

const DATA = [
  {
    id:1,
    name: 'Hendra',
    location: 'Jalan Soekarno Hatta',
    photoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.gl9N7dsF-16SBTLHN42wpAHaHa%26pid%3DApi&f=1&ipt=8839750ff4c67befd5b773a23a4dd94159a56609f6d859b417e05a700aa8c960&ipo=images',
  },
  {
    id:2,
    name: 'Budi',
    location: 'Jalan Simpang Borobudur',
    photoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.zrVZ2bFu2ii1pP1b6N-qWQHaFp%26pid%3DApi&f=1&ipt=f01209aaf6c51d9e3e652c5af0dfa50d313f21f4002f90b4b1247e64254c4333&ipo=images',
  },
]
type GarageHistoryType = StackNavigationProp<RootStackParamList, 'GarageHistory'>

const Item = ({id, name, location, photoUrl}) => {
  const navigation = useNavigation<GarageHistoryType>();
  return(
    <View style={{flexDirection:'row', padding: 15, flex: 4, alignItems:'center'}}>
      <Avatar.Image size={60} source={{uri: photoUrl}}/>
      <View style={{flexDirection: 'column', flex:3, paddingHorizontal:5}}>
        <CustomText title={name} size={17} color="white" style={{textAlign:'left'}}/>
        <CustomText title={location} size={12} color="#85898f" style={{textAlign:'left'}}/>
      </View>
        <CustomButton onPress={() => navigation.navigate('GarageTransaction', {id: id})} title={"Periksa"} style={{borderRadius:20}}/>
    </View>
  )
}

export default function GarageOrder(){

  const renderItem = ({ item }) => {
    return(
      <Item 
        id = {item.id}
        name = {item.name} 
        location = {item.location}
        photoUrl = {item.photoUrl}
        />
    );
  };

  return(
    <View style={{flex:1}}>
      <TopBar photoUrl='https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg'/>
      <View style={{marginTop:15, marginHorizontal:15 , borderRadius:10, backgroundColor: '#3a4447'}}>
        <View style={{backgroundColor:'#2e3638', paddingTop: 25, borderTopStartRadius:10, borderTopEndRadius:10}}>
          <CustomText title="Riwayat Pesanan" color="white" size={20}
            style={{textAlign:'left'}}/>
        </View>
      </View>
      <View style={{flex:1, marginBottom:70 , marginHorizontal:15, borderBottomEndRadius:10, borderBottomStartRadius:10, backgroundColor: '#3a4447'}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          nestedScrollEnabled
          ItemSeparatorComponent={() => (<View style={{backgroundColor: '#C5C2C0', height:1}}/>)}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          />
      </View>
      <BottomNav 
        title = {['Utama','Pesanan','Mechanic']}
        icon = {['home-circle','car','account-wrench']}
        navigate = {['GarageMain','GarageOrder','GarageEmployee']}
        size = {3}
        />
    </View>
  )
}
