import { TopBar, BottomNav } from '../../Component/navBar';
import { CustomText } from '../../Component/CustomText';
import Icon from "react-native-vector-icons/AntDesign";
import { View, TouchableHighlight, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { CustomButton } from '../../Component/CustomButton';
import Style from '../../Styles/MechanicStyle/MechanicMain';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { setAcceptOrder } from '../../../redux/component/acceptOrder';
import { setCancelOrder } from '../../../redux/component/cancelOrder';
import { setTransaction } from '../../../redux/component/transaction';
import _ from 'lodash';
import { setUserAuth } from '../../../redux/component/userAuth';
import { setOrderTimer } from '../../../redux/component/orderTimer';

type MechanicMainType = StackNavigationProp<RootStackParamList, 'MechanicMain'>

const Item = ({id, name, location, photoUrl}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MechanicMainType>();
  
  const onCheck = () => {
    navigation.navigate('MechanicOrder', {id: id});
    dispatch(setAcceptOrder({acceptOrder:true, id:id})); 
    dispatch(setCancelOrder(false));
    dispatch(setOrderTimer({stop:true, time: 120}))
  }

  return(
    <View style={Style.listContainer}>
      <Avatar.Image size={60} source={{uri: photoUrl}}/>
      <View style={Style.listLayout}>
        <CustomText title={name} size={17} color="white" style={{textAlign:'left'}}/>
        <CustomText title={location} size={12} color="#85898f" style={{textAlign:'left'}}/>
      </View>
        <CustomButton title={"Periksa"} 
          style={{borderRadius:20}} 
          onPress={onCheck}/>
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

export default function MechanicMain(){

  const activeUser = useAppSelector(state => state.activeStatus);
  const all_user = useAppSelector(state => state.userAuth);
  const curr_mech = all_user.find((item) => item.id == activeUser.id);
  let title : string, color: string, icon: string;
  const dispatch = useAppDispatch();
  
  if(curr_mech.isAvailable === true){
    title = "Tersedia";
    color = "#78de56";
    icon = "checkcircle";
  }else{
    title = "Tidak Tersedia";
    color = "#FF522B";
    icon = "closecircle";
  }

  const cancelStatus = useAppSelector(state => state.cancelOrder);
  
  if(cancelStatus){
    const transaction = useAppSelector(state => state.transaction);
    const new_transaction = transaction.map((item : any) => {return {...item}})
    for(let i = 0 ; i<= new_transaction.length - 1; i++){
      if(new_transaction[i].trans_end_dt == null){
        new_transaction[i].trans_end_dt = new Date().toLocaleString();
      }
    }
    dispatch(setTransaction(new_transaction));
  }
  
  const transaction = useAppSelector(state => state.transaction); 
  let curr_transaction = transaction.filter((item) => item.trans_end_dt === null)
  
  var joinResult = joinTables(all_user, curr_transaction, 'id', 'cust_id');
  
  const renderItem = ({ item }) => {
  
    return(
      <Item 
        id = {item.id}
        name = {item.name} 
        location = {item.pickup_address}
        photoUrl = {item.photoUrl}
        />
    );
  };

  const mechAvail = () => {
    const new_all_user = all_user.map((item : any) => {return {...item}})
    for(let i = 0 ; i <= new_all_user.length - 1; i++){
      if(new_all_user[i].id == activeUser.id){
        new_all_user[i].isAvailable = !new_all_user[i].isAvailable;
      }
    }
    dispatch(setUserAuth(new_all_user));
  }

  return(
    <View style={{flex:1}}>
      <TopBar id={activeUser.id} photoUrl={curr_mech.photoUrl}/>
        <View style={Style.cardHeader}>
          <CustomText title="Status Anda" color="white" size={20}
            style={{textAlign:'left'}}/>
        </View>
      <View style={Style.cardDetail}>
        <TouchableHighlight onPress={mechAvail}>
          <View style={{marginVertical:20}}>
            <Icon 
              name={icon} 
              size={50} 
              color={color}
              style={Style.iconStyle}
            />
            <CustomText title={title} color={color} size={20}/>
            <CustomText 
              title="Tekan Tombol ini untuk Mengubah Status Anda"
              color="white" size={15}/>
          </View>
        </TouchableHighlight>
      </View>
        <View style={Style.cardHeader}>
          <CustomText title="Pesanan Masuk" color="white" size={20}
            style={{textAlign:'left'}}/>
        </View>
      <View style={Style.cardDetail}>
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
        navigate = {['Home','HistoryMechanic','ChatHistoryMechanic']}
        size = {3}
        />
    </View>
  )
}
