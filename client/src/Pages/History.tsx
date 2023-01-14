import { View, Text,FlatList, SafeAreaView, TouchableHighlight } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../Styles/HistoryStyle";
import { RootStackParamList } from './RootStackParamList';
import { BottomNav } from '../Component/navBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MultipleButton } from '../Component/CustomButton';
import { CustomText } from "../Component/CustomText";
import { useAppSelector } from "../../redux";

type HistoryDetailType = StackNavigationProp<RootStackParamList, 'HistoryDetail'>

const DATA = [
  {
    id:1,
    title: 'Bengkel HAN Paint & Body Repair',
    location: 'Jalan Simpang Borobudur II/30 Malang',
    handleType: 'car',
    date: '02/01/2023'
  },
  {
    id:2,
    title: 'Bengkel Borobudur',
    location: 'Jalan Sudimoro 10a Malang',
    handleType: 'motorcycle',
    date: '29/12/2022'
  },
  {
    id:3,
    title: 'Bengkel Otomotif "Mobil & Sepeda Motor"',
    location: 'Jalan KH. Malik Malang',
    handleType: 'car',
    date: '21/12/2022'
  },
];


const Item = ({ title, location, handleType, date, id }) => {

  const navigation = useNavigation<HistoryDetailType>();
  return(
    <TouchableHighlight 
      underlayColor='white' 
      onPress={() => navigation.navigate('HistoryDetail',{id:id})}
      
    >
    <View style={Style.flatListStyle}>
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1, justifyContent:'center'}}>
          <View style={Style.handleContainer}>
            {handleType == 'motorcycle' ? <Icon name={'motorcycle'} size={25} color='#b99504'/> : null}
            {handleType == 'car' ? <Icon name={'car'} size={25} color='#b99504'/> : null}
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

export default function History(){

  const vehicleType = useAppSelector(state => state.vehicle);
  const renderItem = ({ item }) => {
    return(
      <Item 
        title={item.title} 
        location={item.location} 
        handleType={item.handleType}
        date={item.date}
        id={item.id}
        />
    )
  };
 
  let CAR_DATA = [], MOTOR_DATA = [];
  for(let i = 0; i <= DATA.length; i++){
    if(DATA[i]?.handleType == 'car'){
      CAR_DATA.push(DATA[i]);
    }else if(DATA[i]?.handleType == 'motorcycle'){
      MOTOR_DATA.push(DATA[i]);
    };
  };
  
  return(
  <View style={{flex:1, paddingHorizontal: 5}}>
    <CustomText title="Riwayat Anda" style={Style.titleText}/>    
    <MultipleButton 
      size={3} 
      title={['Semua','Mobil', 'Motor']}
      direction='row'
      keyValue={'find'}
      changeValue={['both','car','motorcycle']}
      iconName={['list','car','motorcycle']}
      style={{marginTop:12}}/>
    
    <View style={{flex:1, marginBottom:65, marginTop:5}}>
    <SafeAreaView style={Style.listContainer}>
      <FlatList
        data={vehicleType == 'both' ? DATA : (vehicleType == 'motorcycle' ? MOTOR_DATA : CAR_DATA)}
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
