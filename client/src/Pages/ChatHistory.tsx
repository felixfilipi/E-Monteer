import { View, Text,FlatList, SafeAreaView, TouchableHighlight } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../Styles/ChatHistoryStyle";
import { RootStackParamList } from './RootStackParamList';
import { BottomNav, TopBar } from '../Component/navBar';
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
    photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.gl9N7dsF-16SBTLHN42wpAHaHa%26pid%3DApi&f=1&ipt=8839750ff4c67befd5b773a23a4dd94159a56609f6d859b417e05a700aa8c960&ipo=images'
  },
  {
    id:2,
    name: 'Andi',
    message: 'Terima Kasih',
    date: '29/12/2022',
    hour: '16.46',
    photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.zrVZ2bFu2ii1pP1b6N-qWQHaFp%26pid%3DApi&f=1&ipt=f01209aaf6c51d9e3e652c5af0dfa50d313f21f4002f90b4b1247e64254c4333&ipo=images'
  },
  {
    id:3,
    name: 'Tedjo',
    message: 'Maafkan saya bos.',
    date: '21/01/2022',
    hour: '11.02',
    photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.yIc1gnpA3V5qS239s4QDAQHaH8%26pid%3DApi&f=1&ipt=03c430f69c132a085d6abe7ac06af11d06e76adfe80236ff08beb80a828818e8&ipo=images'
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
    <TopBar photoUrl='https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg'/>
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
      navigate = {['CustomerMain','FindGarage','History','ChatHistory']}
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
    <TopBar photoUrl='https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg'/>
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
      navigate = {['MechanicMain','HistoryMechanic','ChatHistoryMechanic']}
      size = {3}
      />
  </View>
  )
};
