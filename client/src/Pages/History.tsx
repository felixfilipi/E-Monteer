import { View, Text,FlatList, SafeAreaView, TouchableHighlight } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../Styles/historyStyle";
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
    title: 'Bengkel cepi jaya',
    location: 'jalan mh thamrin 1, jakarta pusat.',
    handleType: 'car',
    date: '01/01/2001'
  },
  {
    id:2,
    title: 'Bengkel bos jaya',
    location: 'bangalore, singapore.',
    handleType: 'motorcycle',
    date: '01/01/2001'
  },
  {
    id:3,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    handleType: 'car',
    date: '01/01/2001'
  },
  {
    id:4,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    handleType: 'motorcycle',
    date: '01/01/2001'
  },
  {
    id:5,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    handleType: 'car',
    date: '01/01/2001'
  },
  {
    id:6,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    handleType: 'motorcycle',
    date: '01/01/2001'
  },
  {
    id:7,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    handleType: 'car',
    date: '01/01/2001'
  }

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
    <BottomNav/>
  </View>
  )
};
