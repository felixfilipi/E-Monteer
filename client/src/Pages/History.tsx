import { View, Text,FlatList, SafeAreaView, TouchableHighlight } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../Styles/HistoryStyle";
import { RootStackParamList } from './RootStackParamList';
import { TopBar, BottomNav } from '../Component/navBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MultipleButton } from '../Component/CustomButton';
import { CustomText } from "../Component/CustomText";
import { Avatar } from 'react-native-paper';
import { CustomButton } from '../Component/CustomButton';
import { useAppSelector } from "../../redux";
import _ from 'lodash';

type HistoryType = StackNavigationProp<RootStackParamList, 'History'>
type HistoryMechanicType = StackNavigationProp<RootStackParamList, 'HistoryMechanic'>
type HistoryGarageType = StackNavigationProp<RootStackParamList, 'HistoryGarage'>

const Item = ({ title, location, handleType, date, id }) => {

  const navigation = useNavigation<HistoryType>();
  return(
    <TouchableHighlight 
      underlayColor='white' 
      onPress={() => navigation.navigate('HistoryDetail',{id:id})}     
    >
    <View style={Style.flatListStyle}>
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1, justifyContent:'center'}}>
          <View style={Style.handleContainer}>
            {handleType == 'Motor' ? <Icon name={'motorcycle'} size={25} color='#b99504'/> : null}
            {handleType == 'Mobil' ? <Icon name={'car'} size={25} color='#b99504'/> : null}
          </View>
        </View>
        <View style={{flex:5, paddingHorizontal:10}}>
          <Text style={Style.titleStyle}>{title}</Text>
          <Text style={Style.descriptionStyle}>{location}</Text>
          <Text style={Style.descriptionStyle}>{date}</Text>
        </View>
      </View>
    </View>
    </TouchableHighlight>
    );
};

const ItemMechanic = ({id, name, location, photoUrl}) => {
  const navigation = useNavigation<HistoryMechanicType>();
  return(
    <View style={{flexDirection:'row', padding: 15, flex: 4, alignItems:'center'}}>
      <Avatar.Image size={60} source={{uri: photoUrl}}/>
      <View style={{flexDirection: 'column', flex:3, paddingHorizontal:5}}>
        <CustomText title={name} size={17} color="white" style={{textAlign:'left'}}/>
        <CustomText title={location} size={12} color="#85898f" style={{textAlign:'left'}}/>
      </View>
        <CustomButton onPress={() => navigation.navigate('HistoryDetailMechanic',{id:id})} title={"Periksa"} style={{borderRadius:20}}/>
    </View>
  )
}

const ItemGarage = ({id, name, location, photoUrl}) => {
  const navigation = useNavigation<HistoryGarageType>();
  return(
    <View style={{flexDirection:'row', padding: 15, flex: 4, alignItems:'center'}}>
      <Avatar.Image size={60} source={{uri: photoUrl}}/>
      <View style={{flexDirection: 'column', flex:3, paddingHorizontal:5}}>
        <CustomText title={name} size={17} color="white" style={{textAlign:'left'}}/>
        <CustomText title={location} size={12} color="#85898f" style={{textAlign:'left'}}/>
      </View>
        <CustomButton onPress={() => navigation.navigate('GarageTransaction',{id:id})} title={"Periksa"} style={{borderRadius:20}}/>
    </View>
  )
}

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

export function History(){

  const [activeButton, setActiveButton] = React.useState<number>(0);
  const activeUser = useAppSelector(state => state.activeStatus);
  const raw_history = useAppSelector(state => state.transaction);
  const CustomerHistory = raw_history.filter((item) => item.trans_end_dt != null && item.cust_id == activeUser.id)
  
  const raw_GarageData = useAppSelector(state => state.garageData);
  const raw_user = useAppSelector(state => state.userAuth);
  const customerData = raw_user.find((item) => {return item.id === activeUser.id});
  
  var joinResult = joinTables(raw_GarageData, CustomerHistory, 'id', 'garageId');
  
  const renderItem = ({ item }) => {
    return(
      <Item 
        title={item.name} 
        location={item.pickup_address} 
        handleType={item.handle_type}
        date={item.trans_end_dt}
        id={item.id}
        />
    )
  };
 
  let CAR_DATA = [], MOTOR_DATA = [];
  for(let i = 0; i <= joinResult.length - 1; i++){
    if(joinResult[i].handle_type == 'Mobil'){
      CAR_DATA.push(joinResult[i]);
    }else if(joinResult[i].handle_type == 'Motor'){
      MOTOR_DATA.push(joinResult[i]);
    };
  };
  
  return(
  <View style={{flex:1, paddingHorizontal: 5}}>
    <TopBar photoUrl={customerData.photoUrl}/>
    <CustomText title="Riwayat Anda" style={Style.titleText}/>    
    <MultipleButton 
      size={3} 
      title={['Semua','Mobil', 'Motor']}
      direction='row'
      keyValue={'find'}
      setActiveButton={setActiveButton}
      changeValue={['both','car','motorcycle']}
      iconName={['list','car','motorcycle']}
      style={{marginTop:12}}/>
    
    <View style={{flex:1, marginBottom:65, marginTop:5}}>
    <SafeAreaView style={[Style.listContainer, {borderTopEndRadius:15, borderTopStartRadius:15, marginTop:20}]}>
      <FlatList
        data={activeButton == 0 ? joinResult : (activeButton == 1 ? CAR_DATA : MOTOR_DATA)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        nestedScrollEnabled
        ItemSeparatorComponent={() => (<View style={{backgroundColor: '#C5C2C0', height:1}}/>)}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
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

export function HistoryMechanic(){
  
  const renderItem = ({ item }) => {
    return(
      <ItemMechanic 
        id = {item.id}
        name = {item.name} 
        location = {item.pickup_address}
        photoUrl = {item.photoUrl}
        />
    );
  };

  const activeUser = useAppSelector(state => state.activeStatus);
  const raw_MechanicHistory = useAppSelector(state => state.transaction);
  const MechanicHistory = raw_MechanicHistory.filter((item) => item.trans_end_dt != null && item.mechanicId == activeUser.id)

  const raw_user = useAppSelector(state => state.userAuth);
  const mechanicData = raw_user.find((item) => {return item.id === activeUser.id});
  
  var joinResult = joinTables(raw_user, MechanicHistory, 'id', 'cust_id');

  return(
    <View style={{flex:1}}>
      <TopBar photoUrl={mechanicData.photoUrl}/>
      <View style={{marginTop:15, marginHorizontal:15 , borderRadius:10, backgroundColor: '#3a4447'}}>
        <View style={{backgroundColor:'#2e3638', paddingTop: 25, borderTopStartRadius:10, borderTopEndRadius:10}}>
          <CustomText title="Riwayat Pesanan" color="white" size={20}
            style={{textAlign:'left'}}/>
        </View>
      </View>
      <View style= {[Style.listContainer, {backgroundColor: '#3a4447', maxHeight:580}]}>
      <FlatList
        data={joinResult}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        nestedScrollEnabled
        ItemSeparatorComponent={() => (<View style={{backgroundColor: '#C5C2C0', height:1}}/>)}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        />
    </View>
    <BottomNav 
        title = {['Utama','Pesanan','Chat']}
        icon = {['home-circle','history','chat']}
        navigate = {['MechanicMain','HistoryMechanic','ChatHistoryMechanic']}
        size = {3}
      />
  </View>
  )
};

export function HistoryGarage(){

  
  const renderItem = ({ item }) => {
    return(
      <ItemGarage 
        id = {item.id}
        name = {item.name} 
        location = {item.pickup_address}
        photoUrl = {item.photoUrl}
        />
    );
  };

  const activeUser = useAppSelector(state => state.activeStatus);
  const raw_GarageHistory = useAppSelector(state => state.transaction);
  const GarageHistory = raw_GarageHistory.filter((item) => item.trans_end_dt != null && item.garageId == activeUser.id)

  const raw_user = useAppSelector(state => state.userAuth);
  const owner_Data = raw_user.find((item) => {return item.id === activeUser.id});
  
  var joinResult = joinTables(raw_user, GarageHistory, 'id', 'cust_id');

  return(
    <View style={{flex:1}}>
      <TopBar photoUrl={owner_Data.photoUrl}/>
      <View style={{marginTop:15, marginHorizontal:15 , borderRadius:10, backgroundColor: '#3a4447'}}>
        <View style={{backgroundColor:'#2e3638', paddingTop: 25, borderTopStartRadius:10, borderTopEndRadius:10}}>
          <CustomText title="Riwayat Pesanan" color="white" size={20}
            style={{textAlign:'left'}}/>
        </View>
      </View>
      <View style= {[Style.listContainer, {backgroundColor: '#3a4447'}]}>
        <FlatList
          data={joinResult}
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
