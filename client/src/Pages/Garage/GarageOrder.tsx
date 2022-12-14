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
    name: 'Christoper Luis Alexander',
    location: 'MH Thamrin Jakarta Pusat',
    photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
  },
  {
    id:2,
    name: 'Christoper Luis Alexander',
    location: 'MH Thamrin Jakarta Pusat',
    photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
  },
  {
    id:3,
    name: 'Christoper Luis Alexander',
    location: 'MH Thamrin Jakarta Pusat',
    photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
  },
  {
    id:4,
    name: 'Christoper Luis Alexander',
    location: 'MH Thamrin Jakarta Pusat',
    photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
  },
]
type GarageOrderType = StackNavigationProp<RootStackParamList, 'GarageOrder'>

const Item = ({id, name, location, photoUrl}) => {
  const navigation = useNavigation<GarageOrderType>();
  return(
    <View style={{flexDirection:'row', padding: 15, flex: 4, alignItems:'center'}}>
      <Avatar.Image size={60} source={{uri: photoUrl}}/>
      <View style={{flexDirection: 'column', flex:3, paddingHorizontal:5}}>
        <CustomText title={name} size={17} color="white" style={{textAlign:'left'}}/>
        <CustomText title={location} size={12} color="#85898f" style={{textAlign:'left'}}/>
      </View>
        <CustomButton onPress={() => navigation.navigate('CostList', {id: id})} title={"Periksa"} style={{borderRadius:20}}/>
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
        title = {['Utama','Pesanan','Montir']}
        icon = {['home-circle','car','account-wrench']}
        navigate = {['GarageMain','GarageOrder','MechanicView']}
        size = {3}
        />
    </View>
  )
}
