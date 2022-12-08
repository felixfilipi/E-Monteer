import { Button, View, Text,FlatList, SafeAreaView, TouchableHighlight, Alert} from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../Styles/chatHistoryStyle";
import { RootStackParamList } from './RootStackParamList';
import { BottomNav } from '../Component/navBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomText } from "../Component/CustomText";
import { useAppSelector } from "../../redux";
import { Avatar } from "react-native-paper";

type HistoryDetailType = StackNavigationProp<RootStackParamList, 'HistoryDetail'>

const DATA = [
  {
    id:1,
    name: 'Cepi',
    message: 'Oke Siap bos.',
    date: '02/03/2022',
    hour: '12.30',
    photo: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145545-DGl3LVvFlnHi.png'
  },
  {
    id:2,
    name: 'Bos',
    message: 'Kerjakan yang benar ya!',
    date: '02/05/2022',
    hour: '16.46',
    photo: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx141391-rEJ1hm9i2PFa.jpg'
  },
  {
    id:3,
    name: 'Kuli',
    message: 'Maafkan saya bos.',
    date: '21/01/2022',
    hour: '11.02',
    photo: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx130592-LAUlhx15mxQu.jpg'
  },
  {
    id:1,
    name: 'Cepi',
    message: 'Oke Siap bos.',
    date: '02/03/2022',
    hour: '12.30',
    photo: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145545-DGl3LVvFlnHi.png'
  },
  {
    id:1,
    name: 'Cepi',
    message: 'Oke Siap bos.',
    date: '02/03/2022',
    hour: '12.30',
    photo: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145545-DGl3LVvFlnHi.png'
  },
  {
    id:1,
    name: 'Cepi',
    message: 'Oke Siap bos.',
    date: '02/03/2022',
    hour: '12.30',
    photo: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145545-DGl3LVvFlnHi.png'
  },
  {
    id:1,
    name: 'Cepi',
    message: 'Oke Siap bos.',
    date: '02/03/2022',
    hour: '12.30',
    photo: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145545-DGl3LVvFlnHi.png'
  }

];

const Item = ({ name, message, date, hour, photo, id }) => {

  const navigation = useNavigation<HistoryDetailType>();
  return(
    <TouchableHighlight 
      underlayColor='white' 
      onPress={() => navigation.navigate('Chat',{phone:id})}
      style={{borderRadius:10}}
    >
    <View style={Style.FlatListStyle}>
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

  const vehicleType = useAppSelector(state => state.vehicle);
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
    <CustomText title="Chat Kamu" style={Style.titleText}/>    
    <View style={{flex:1, marginBottom:65, marginTop:5}}>
    <SafeAreaView style={Style.ListContainer}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        nestedScrollEnabled
        ItemSeparatorComponent={() => (<View style={{backgroundColor: '#C5C2C0', height:1}}/>)}
        />
    </SafeAreaView>
    </View>
    <BottomNav/>
  </View>
  )
};
