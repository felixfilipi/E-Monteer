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
    name: 'Rico Purwanto',
    location: 'Jalan Simpang Borobudur II/30 Malang',
    photoUrl: 'https://media.istockphoto.com/id/1255420917/id/foto/teknisi-mobil-pengecekan-otomotif-di-garasi.jpg?s=612x612&w=0&k=20&c=MMwKFYfoyo2fm6hkqaRZz10VuQV8VAIGMiqn12zvYdE='
,
  },
  {
    id:2,
    name: 'Hasan Kusnadi',
    location: 'Jalan Candi Penataran 20, Malang',
    photoUrl: 'https://cdn.pixabay.com/photo/2016/12/13/17/48/master-1904748__480.jpg',
  },
  {
    id:3,
    name: 'Budi Kosasih',
    location: 'Jalan Simpang Borobudur 18, Malang',
    photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXDah1BTilOy4DOplE2ICBKv11tanHZXN3g&usqp=CAU',
  },
]
type GarageEmployeeType = StackNavigationProp<RootStackParamList, 'GarageEmployee'>

const Item = ({id, name, location, photoUrl}) => {
  const navigation = useNavigation<GarageEmployeeType>();
  return(
    <View style={{flexDirection:'row', padding: 15, flex: 4, alignItems:'center'}}>
      <Avatar.Image size={60} source={{uri: photoUrl}}/>
      <View style={{flexDirection: 'column', flex:3, paddingHorizontal:5}}>
        <CustomText title={name} size={17} color="white" style={{textAlign:'left'}}/>
        <CustomText title={location} size={12} color="#85898f" style={{textAlign:'left'}}/>
      </View>
        <CustomButton onPress={() => navigation.navigate('RegisterMechanic')} title={"Update"} style={{borderRadius:20}}/>
    </View>
  )
}

export default function GarageEmployee(){

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

  const navigation = useNavigation<GarageEmployeeType>();
  return(
    <View style={{flex:1}}>
      <TopBar photoUrl='https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg'/>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('RegisterMechanic')}>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}/>
            <View style={{backgroundColor:'#b99504',flexDirection:'row', justifyContent:'center', alignContent:'center', padding:15, flex:2, borderRadius:20, marginTop:15}}>
              <Icon name="adduser" color="white" size={25}/>
              <CustomText title="Tambah Mechanic" color="white" size={17} style={{marginBottom:0}}/>
            </View>
            <View style={{flex:1}}/>
          </View>
        </TouchableOpacity>
      <View style={{marginTop:15, marginHorizontal:15 , borderRadius:10, backgroundColor: '#3a4447'}}>
        <View style={{backgroundColor:'#2e3638', paddingTop: 25, borderTopStartRadius:10, borderTopEndRadius:10}}>
          <CustomText title="List Mechanic" color="white" size={20}
            style={{textAlign:'left'}}/>
        </View>
      </View>
      <View style={{maxHeight:500 ,marginHorizontal:15, borderBottomEndRadius:10, borderBottomStartRadius:10, backgroundColor: '#3a4447'}}>
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
        navigate = {['GarageMain','HistoryGarage','MechanicView']}
        size = {3}
        />
    </View>
  )
}
