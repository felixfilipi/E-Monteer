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
import { setCustMechanic } from '../../../redux/component/custMechanic';

type MechanicMainType = StackNavigationProp<RootStackParamList, 'MechanicMain'>

const Item = ({name, location, photoUrl}) => {
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
          onPress={() => navigation.navigate('MechanicOrder')}/>
    </View>
  )
}

export default function MechanicMain(){
  
  const [available, setAvailable] = React.useState<boolean>(false);
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
    const RAW_DATA = useAppSelector(state => state.custMechanic);
    RAW_DATA[0].trans_end_dt = Date()
    dispatch(setCustMechanic(RAW_DATA));
  }
  
  //if(doneStatus){
  //  const RAW_DATA = useAppSelector(state => state.custMechanic);
  //  RAW_DATA[0].trans_end_dt = Date()
  //  dispatch(setCustMechanic(RAW_DATA));
  //}

  const RAW_DATA = useAppSelector(state => state.custMechanic); 
  const DATA = RAW_DATA.filter((val) => val.trans_end_dt === null)

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
      <TopBar photoUrl='https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg'/>
        <View style={Style.cardHeader}>
          <CustomText title="Status Anda" color="white" size={20}
            style={{textAlign:'left'}}/>
        </View>
      <View style={Style.cardDetail}>
        <TouchableHighlight onPress={() => {(setAvailable(!available))}}>
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
