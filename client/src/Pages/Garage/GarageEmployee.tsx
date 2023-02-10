import { TopBar, BottomNav } from '../../Component/navBar';
import { CustomText } from '../../Component/CustomText';
import Icon from "react-native-vector-icons/AntDesign";
import { View, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { CustomButton } from '../../Component/CustomButton';
import { useAppSelector } from '../../../redux';

type GarageEmployeeType = StackNavigationProp<RootStackParamList, 'GarageEmployee'>
let DATA : any[] = [];

const Item = ({id, name, phone, photoUrl}) => {
  const navigation = useNavigation<GarageEmployeeType>();
  return(
    <View style={{flexDirection:'row', padding: 15, flex: 4, alignItems:'center'}}>
      <Avatar.Image size={60} source={{uri: photoUrl}}/>
      <View style={{flexDirection: 'column', flex:3, paddingHorizontal:5}}>
        <CustomText title={name} size={17} color="white" style={{textAlign:'left'}}/>
        <CustomText title={phone} size={12} color="#85898f" style={{textAlign:'left'}}/>
      </View>
        <CustomButton onPress={() => navigation.navigate('EditProfile', {id: id})} title={"Update"} style={{borderRadius:20}}/>
    </View>
  )
}

export default function GarageEmployee(){

  const navigation = useNavigation<GarageEmployeeType>();
  const renderItem = ({ item }) => {
    return(
      <Item
        id = {item.id}
        name = {item.name} 
        phone = {item.phone}
        photoUrl = {item.photoUrl}
        />
    );
  };

  const all_user = useAppSelector(state => state.userAuth);
  const activeUser = useAppSelector(state => state.activeStatus);
  const curr_owner = all_user.find((item : any) => {return item.id == activeUser.id});
  
  const DATA = all_user.filter((item) => {return item.role == 'Mechanic' && item.garageId == curr_owner.garageId});
  
  return(
    <View style={{flex:1}}>
      <TopBar id={activeUser.id} photoUrl={curr_owner.photoUrl}/>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('RegisterMechanic', {garageId: activeUser.id})}>
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
