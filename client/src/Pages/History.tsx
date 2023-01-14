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
import { useAppSelector } from "../../redux";
import { Avatar } from 'react-native-paper';
import { CustomButton } from '../Component/CustomButton';

type HistoryType = StackNavigationProp<RootStackParamList, 'History'>
type HistoryMechanicType = StackNavigationProp<RootStackParamList, 'HistoryMechanic'>
type HistoryGarageType = StackNavigationProp<RootStackParamList, 'HistoryGarage'>

const DATA = [
  {
    id:1,
    title: 'Bengkel HAN Paint & Body Repair',
    location: 'Jalan Simpang Borobudur II/30 Malang',
    handleType: 'car',
    date: '02/01/2023',
    photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.gl9N7dsF-16SBTLHN42wpAHaHa%26pid%3DApi&f=1&ipt=8839750ff4c67befd5b773a23a4dd94159a56609f6d859b417e05a700aa8c960&ipo=images'
  },
  {
    id:2,
    title: 'Bengkel Borobudur',
    location: 'Jalan Sudimoro 10a Malang',
    handleType: 'motorcycle',
    date: '29/12/2022',
    photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.gl9N7dsF-16SBTLHN42wpAHaHa%26pid%3DApi&f=1&ipt=8839750ff4c67befd5b773a23a4dd94159a56609f6d859b417e05a700aa8c960&ipo=images'
  },
  {
    id:3,
    title: 'Bengkel Otomotif "Mobil & Sepeda Motor"',
    location: 'Jalan KH. Malik Malang',
    handleType: 'car',
    date: '21/12/2022',
    photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.gl9N7dsF-16SBTLHN42wpAHaHa%26pid%3DApi&f=1&ipt=8839750ff4c67befd5b773a23a4dd94159a56609f6d859b417e05a700aa8c960&ipo=images'
  },
];

const DATA2 = [
  {
    id:1,
    name: 'Cepi',
    location: 'Jalan Simpang Borobudur II/30 Malang',
    photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
    handleType: 'car',
    date: '02/01/2023'
  },
  {
    id:2,
    name: 'cepi2',
    location: 'Jalan Sudimoro 10a Malang',
    photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
    handleType: 'motorcycle',
    date: '29/12/2022'
  },
  {
    id:3,
    name: 'cepi3',
    location: 'Jalan KH. Malik Malang',
    photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
    handleType: 'car',
    date: '21/12/2022'
  },
];

const DATA3 = [
  {
    id:1,
    name: 'Christoper Luis Alexander',
    location: 'MH Thamrin Jakarta Pusat',
    photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
  },
  {
    id:2,
    name: 'Christoper Luis Alexander',
    location: 'MH Thamrin Jakarta Pusat',
    photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
  },
  {
    id:3,
    name: 'Christoper Luis Alexander',
    location: 'MH Thamrin Jakarta Pusat',
    photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
  },
  {
    id:4,
    name: 'Christoper Luis Alexander',
    location: 'MH Thamrin Jakarta Pusat',
    photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
  },
]
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

const ItemMechanic = ({id, name, location, photoUrl}) => {
  const navigation = useNavigation<HistoryGarageType>();
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

export function History(){

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
    <TopBar photoUrl='https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg'/>
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
    <SafeAreaView style={[Style.listContainer, {borderTopEndRadius:15, borderTopStartRadius:15, marginTop:20}]}>
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


export function HistoryMechanic(){

  const renderItem = ({ item }) => {
    return(
      <ItemMechanic 
        id = {item.id}
        name = {item.name} 
        location = {item.location}
        photoUrl = {item.photoUrl}
        />
    );
  };
 
  return(
    <View style={{flex:1}}>
      <TopBar photoUrl='https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg'/>
      <View style={{marginTop:15, marginHorizontal:15 , borderRadius:10, backgroundColor: '#3a4447'}}>
        <View style={{backgroundColor:'#2e3638', paddingTop: 25, borderTopStartRadius:10, borderTopEndRadius:10}}>
          <CustomText title="Riwayat Pesanan" color="white" size={20}
            style={{textAlign:'left'}}/>
        </View>
      </View>
      <View style= {[Style.listContainer, {backgroundColor: '#3a4447', maxHeight:580}]}>
      <FlatList
        data={DATA2}
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
        location = {item.location}
        photoUrl = {item.photoUrl}
        />
    );
  };

  return(
    <View style={{flex:1}}>
      <TopBar photoUrl='https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg'/>
      <View style={{marginTop:15, marginHorizontal:15 , borderRadius:10, backgroundColor: '#3a4447'}}>
        <View style={{backgroundColor:'#2e3638', paddingTop: 25, borderTopStartRadius:10, borderTopEndRadius:10}}>
          <CustomText title="Riwayat Pesanan" color="white" size={20}
            style={{textAlign:'left'}}/>
        </View>
      </View>
      <View style= {[Style.listContainer, {backgroundColor: '#3a4447'}]}>
        <FlatList
          data={DATA3}
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
