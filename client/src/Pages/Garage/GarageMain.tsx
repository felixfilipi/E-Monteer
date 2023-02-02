import { TopBar, BottomNav } from '../../Component/navBar';
import { CustomText } from '../../Component/CustomText';
import Icon from "react-native-vector-icons/AntDesign";
import { View, TouchableHighlight, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { CustomButton } from '../../Component/CustomButton';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { setGarageAvailability } from '../../../redux/component/garageAvailability';

//const DATA = [
//  {
//    id:1,
//    name: 'Alexander Wijaya',
//    location: 'Plaza Araya, jl blimbing indah megah no 2, malang',
//    photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
//  },
//]
type GarageMainType = StackNavigationProp<RootStackParamList, 'GarageMain'>

const Item = ({id, name, location, photoUrl}) => {
  const navigation = useNavigation<GarageMainType>();
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

export default function GarageMain(){
  
  let title : string, color: string, icon: string;
  const activeUser = useAppSelector(state => state.activeStatus);
  const available = useAppSelector(state => state.garageAvailability);
  const all_user = useAppSelector(state => state.userAuth);
  const curr_owner = all_user.find((item) => item.id == activeUser.id);
  const transaction = useAppSelector(state => state.transaction);
  const curr_transaction = transaction.filter((item) => {item.trans_end_dt === null && item.garageId === activeUser.id})
  const dispatch = useAppDispatch();
  
  if(available === true){
    title = "Tersedia";
    color = "#78de56";
    icon = "checkcircle";
  }else{
    title = "Tidak Tersedia";
    color = "#FF522B";
    icon = "closecircle";
  }

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
      <TopBar photoUrl={curr_owner.photoUrl}/>
      <View style={{margin:15, borderRadius:10, backgroundColor: '#3a4447'}}>
        <View style={{backgroundColor:'#2e3638', paddingTop: 25, borderTopStartRadius:10, borderTopEndRadius:10}}>
          <CustomText title="Status Bengkel Anda" color="white" size={20}
            style={{textAlign:'left'}}/>
        </View>
          <TouchableHighlight onPress={() => {(dispatch(setGarageAvailability(!available)))}}>
            <View style={{marginVertical:20}}>
              <Icon 
                name={icon} 
                size={50} 
                color={color}
                style={{alignSelf:'center', marginVertical:10}}
              />
              <CustomText title={title} color={color} size={20}/>
              <CustomText 
                title="Tekan Tombol ini untuk Mengubah Status Anda"
                color="white" size={15}/>
            </View>
          </TouchableHighlight>
      </View>
      <View style={{marginTop:15, marginHorizontal:15 , borderRadius:10, backgroundColor: '#3a4447'}}>
        <View style={{backgroundColor:'#2e3638', paddingTop: 25, borderTopStartRadius:10, borderTopEndRadius:10}}>
          <CustomText title="Pesanan Saat Ini" color="white" size={20}
            style={{textAlign:'left'}}/>
        </View>
      </View>
      <View style={{ maxHeight:300 , marginHorizontal:15, borderBottomEndRadius:10, borderBottomStartRadius:10, backgroundColor: '#3a4447'}}>
        <FlatList
          data={curr_transaction}
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
        navigate = {['GarageMain','HistoryGarage','GarageEmployee']}
        size = {3}
        />
    </View>
  )
}
