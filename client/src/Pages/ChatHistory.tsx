import { View, Text,FlatList, SafeAreaView, TouchableHighlight } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../Styles/ChatHistoryStyle";
import { RootStackParamList } from './RootStackParamList';
import { BottomNav, TopBar } from '../Component/navBar';
import { CustomText } from "../Component/CustomText";
import { Avatar } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux";
import _ from 'lodash';
import { setChatTarget } from "../../redux/component/chatTarget";

type HistoryDetailType = StackNavigationProp<RootStackParamList, 'HistoryDetail'>

function joinTables(left, right, leftKey, rightKey) {

    rightKey = rightKey || leftKey;

    var lookupTable = {};
    var resultTable = [];
    var forEachLeftRecord = function (currentRecord) {
        lookupTable[currentRecord[leftKey]] = currentRecord;
    };

    var forEachRightRecord = function (currentRecord) {
        var joinedRecord = _.clone(lookupTable[currentRecord[rightKey]]); // using lodash clone
        _.extend(joinedRecord, currentRecord); // using lodash extend
        resultTable.push(joinedRecord);
    };

    left.forEach(forEachLeftRecord);
    right.forEach(forEachRightRecord);

    return resultTable;
}


const Item = ({ name, message, datetime, photo, targetId, roomTopic }) => {

  const navigation = useNavigation<HistoryDetailType>();
  datetime = datetime.replace(' ', '');
  const time = datetime.split(',');

  let show_date : string, size : number;
  if(time[0] == new Date().toLocaleDateString()){
    show_date = time[1].slice(0, time[1].length - 3)
    size = 15;
  }else{
    show_date = time[0];
    size = 12;
  }
  const dispatch = useAppDispatch();

  return(
    <TouchableHighlight 
      underlayColor='white' 
      onPress={() => {navigation.navigate('Chat'), dispatch(setChatTarget({roomTopic, targetId}))}}
      style={{borderRadius:10}}
    >
    <View style={Style.flatListStyle}>
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1, marginRight:5, justifyContent:'center'}}>
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
        <View style={{flex:2, justifyContent:'center'}}>
          <View style={Style.handleContainer}>
            <Text style={{fontSize:size, color:'#97a3b6'}}>{show_date}</Text>
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
        message={item.lastMessage} 
        datetime={item.last_date_time}
        targetId={item.mech_id}
        roomTopic={item.roomTopic}
        photo={item.photoUrl}
        />
    )
  };

  const activeUser = useAppSelector(state => state.activeStatus);
  const all_user = useAppSelector(state => state.userAuth);
  const activeUser_data = all_user.find((item) => item.id === activeUser.id);
  const chatRoom = useAppSelector(state => state.chatRoom);
  const curr_chatRoom = chatRoom.filter((item) => item.cust_id === activeUser.id);

  var joinResult = joinTables(all_user, curr_chatRoom, 'id', 'mech_id');

  console.log(curr_chatRoom)
  return(
  <View style={{flex:1, paddingHorizontal: 5}}>
    <TopBar id={activeUser.id} photoUrl={activeUser_data.photoUrl}/>
    <View style={Style.titleContainer}>
      <CustomText title="Pesan Anda" style={Style.titleText}/>    
    </View>
    <View style={{flex:1, marginBottom:65, marginTop:5}}>
    <SafeAreaView style={Style.listContainer}>
      <FlatList
        data={joinResult}
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
        message={item.lastMessage} 
        datetime={item.last_date_time}
        targetId={item.cust_id}
        roomTopic={item.roomTopic}
        photo={item.photoUrl}
        />
    )
  };
  
  const activeUser = useAppSelector(state => state.activeStatus);
  const all_user = useAppSelector(state => state.userAuth);
  const activeUser_data = all_user.find((item) => item.id === activeUser.id);
  const chatRoom = useAppSelector(state => state.chatRoom);
  const curr_chatRoom = chatRoom.filter((item) => item.mech_id === activeUser.id);

  var joinResult = joinTables(all_user, curr_chatRoom, 'id', 'cust_id');
  
  return(
  <View style={{flex:1, paddingHorizontal: 5}}>
    <TopBar id={activeUser.id} photoUrl={activeUser_data.photoUrl}/>
    <View style={Style.titleContainer}>
      <CustomText title="Pesan Anda" style={Style.titleText}/>    
    </View>
    <View style={{flex:1, marginBottom:65, marginTop:5}}>
    <SafeAreaView style={Style.listContainer}>
      <FlatList
        data={joinResult}
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
