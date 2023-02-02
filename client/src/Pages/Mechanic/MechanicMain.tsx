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
import { setMechAvailability } from '../../../redux/component/mechAvailability';
import { setAcceptOrder } from '../../../redux/component/acceptOrder';
import { setCancelOrder } from '../../../redux/component/cancelOrder';
import { setTransaction } from '../../../redux/component/transaction';

type MechanicMainType = StackNavigationProp<RootStackParamList, 'MechanicMain'>

const Item = ({name, location, photoUrl}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MechanicMainType>();
  return(
    <View style={Style.listContainer}>
      <Avatar.Image size={60} source={{uri: photoUrl}}/>
      <View style={Style.listLayout}>
        <CustomText title={name} size={17} color="white" style={{textAlign:'left'}}/>
        <CustomText title={location} size={12} color="#85898f" style={{textAlign:'left'}}/>
      </View>
        <CustomButton title={"Periksa"} 
          style={{borderRadius:20}} 
          onPress={() => {navigation.navigate('MechanicOrder'), dispatch(setAcceptOrder(true)), dispatch(setCancelOrder(false))}}/>
    </View>
  )
}

export default function MechanicMain(){

  const activeUser = useAppSelector(state => state.activeStatus);
  const raw_mechData = useAppSelector(state => state.userAuth);
  const curr_mech = raw_mechData.find((item) => item.id == activeUser.id);
  const available = useAppSelector(state => state.mechAvailability);
  let title : string, color: string, icon: string;
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

  const cancelStatus = useAppSelector(state => state.cancelOrder);
  const doneStatus = useAppSelector(state => state.doneOrder);
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
  
  if(doneStatus){
    const transaction = useAppSelector(state => state.transaction);
    const new_transaction = transaction.map((item : any) => {return {...item}})
    for(let i = 0 ; i<= new_transaction.length - 1; i++){
      if(new_transaction[i].trans_end_dt == null){
        new_transaction[i].trans_end_dt = new Date().toLocaleString();
      }
    }
    dispatch(setTransaction(new_transaction));
  }

  const RAW_DATA = useAppSelector(state => state.transaction); 

  let DATA : any[];
  DATA = RAW_DATA.filter((val) => val.trans_end_dt === null)
  
  if(available == false){
    DATA = null;
  }

  const renderItem = ({ item }) => {
    return(
      <Item 
        name = {item.name} 
        location = {item.location}
        photoUrl = {item.photoUrl}
        />
    );
  };

  return(
    <View style={{flex:1}}>
      <TopBar photoUrl={curr_mech.photoUrl}/>
        <View style={Style.cardHeader}>
          <CustomText title="Status Anda" color="white" size={20}
            style={{textAlign:'left'}}/>
        </View>
      <View style={Style.cardDetail}>
        <TouchableHighlight onPress={() => {(dispatch(setMechAvailability(!available)))}}>
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
        title = {['Utama','Pesanan','Chat']}
        icon = {['home-circle','history','chat']}
        navigate = {['Home','HistoryMechanic','ChatHistoryMechanic']}
        size = {3}
        />
    </View>
  )
}
