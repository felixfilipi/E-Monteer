import { View, Text,FlatList, SafeAreaView, TouchableHighlight } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../Styles/ChatHistoryStyle";
import { RootStackParamList } from './RootStackParamList';
import { BottomNav } from '../Component/navBar';
import { CustomText, ImportantText } from "../Component/CustomText";
import { Avatar } from "react-native-paper";

type HistoryDetailType = StackNavigationProp<RootStackParamList, 'HistoryDetail'>

const DATA = [
  {
    id:1,
    name: 'Rico',
    message: 'Baik',
    date: '02/01/2023',
    hour: '12.30',
    photo: 'https://media.istockphoto.com/id/1255420917/id/foto/teknisi-mobil-pengecekan-otomotif-di-garasi.jpg?s=612x612&w=0&k=20&c=MMwKFYfoyo2fm6hkqaRZz10VuQV8VAIGMiqn12zvYdE='
  },
  {
    id:2,
    name: 'Andi',
    message: 'Terima Kasih',
    date: '29/12/2022',
    hour: '16.46',
    photo: 'https://media.istockphoto.com/id/1255422375/id/foto/teknisi-mobil-pengecekan-otomotif-di-garasi.jpg?s=612x612&w=0&k=20&c=zvRIhHtt98k25vLNi4jzp-R5J1WTQOZPFJXg28hKfOo='
  },
  {
    id:3,
    name: 'Tedjo',
    message: 'Saya segera ke sana',
    date: '21/01/2022',
    hour: '11.02',
    photo: 'https://media.istockphoto.com/id/1255433065/id/foto/mekanik-mobil-bekerja-di-garasi-layanan-perbaikan.jpg?s=612x612&w=0&k=20&c=TE4eD2zPxLSWhWtTiMGbFqn7aDOdq5bkaxwmj9y3yws='
  },

];

const Item = ({ name, message, date, hour, photo, id }) => {

  const navigation = useNavigation<HistoryDetailType>();
  return(
    <TouchableHighlight 
      underlayColor='white' 
      onPress={() => navigation.navigate('Chat',{phone:id})}
      style={{borderRadius:10}}
    >
    <View style={Style.flatListStyle}>
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1, justifyContent:'center'}}>
          <View style={Style.handleContainer}>
            <Avatar.Image
              size={50}
              source={{uri:photo}}/>
          </View>
        </View>
        <View style={{flex:5, paddingHorizontal:10}}>
          <Text style={Style.titleStyle}>{name}</Text>
          <Text style={Style.descriptionStyle}>{message}</Text>
        </View>
        <View style={{flex:1, justifyContent:'center'}}>
          <View style={Style.handleContainer}>
            <Text>{hour}</Text>
          </View>
        </View>
      </View>
    </View>
    </TouchableHighlight>
    );
};

export default function ChatHistory(){

  const renderItem = ({ item }) => {
    return(
      <Item 
        name={item.name} 
        message={item.message} 
        date={item.date}
        hour={item.hour}
        id={item.id}
        photo={item.photo}
        />
    )
  };
  
  return(
  <View style={{flex:1, paddingHorizontal: 5}}>
    <View style={Style.titleContainer}>
      <CustomText title="Pesan Anda" style={Style.titleText}/>    
      <ImportantText title="Pesan yang tidak aktif dalam 1 Minggu kedepan akan otomatis terhapus"/>
    </View>
    <View style={{flex:1, marginBottom:65, marginTop:5}}>
    <SafeAreaView style={Style.listContainer}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        nestedScrollEnabled
        ItemSeparatorComponent={() => (<View style={{backgroundColor: '#C5C2C0', height:1}}/>)}
        />
    </SafeAreaView>
    </View>
    <BottomNav 
      title = {['Utama','Cari','Riwayat','Chat']}
      icon = {['home-circle','map-search-outline','history','chat']}
      navigate = {['CustomerMain','FindGarage','OrderHistory','ChatHistory']}
      size = {4}
      />
  </View>
  )
};

export function ChatHistoryMechanic(){

  const renderItem = ({ item }) => {
    return(
      <Item 
        name={item.name} 
        message={item.message} 
        date={item.date}
        hour={item.hour}
        id={item.id}
        photo={item.photo}
        />
    )
  };
  
  return(
  <View style={{flex:1, paddingHorizontal: 5}}>
    <View style={Style.titleContainer}>
      <CustomText title="Pesan Anda" style={Style.titleText}/>    
      <ImportantText title="Pesan yang tidak aktif dalam 1 Minggu kedepan akan otomatis terhapus"/>
    </View>
    <View style={{flex:1, marginBottom:65, marginTop:5}}>
    <SafeAreaView style={Style.listContainer}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        nestedScrollEnabled
        ItemSeparatorComponent={() => (<View style={{backgroundColor: '#C5C2C0', height:1}}/>)}
        />
    </SafeAreaView>
    </View>
    <BottomNav 
      title = {['Utama','Riwayat','Chat']}
      icon = {['home-circle','history','chat']}
      navigate = {['MechanicMain','OrderHistory','ChatHistory']}
      size = {3}
      />
  </View>
  )
};
