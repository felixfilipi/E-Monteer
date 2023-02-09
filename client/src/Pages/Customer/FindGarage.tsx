import { View, Text, FlatList, SafeAreaView, TouchableHighlight} from "react-native";
import React, { useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../../Styles/CustomerStyle/FindGarage";
import { RootStackParamList } from '../RootStackParamList';
import { BottomNav, TopBar } from '../../Component/navBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MultipleButton } from '../../Component/CustomButton';
import { useAppSelector } from '../../../redux';
import { CustomText } from "../../Component/CustomText";
import haversineDistance from "haversine-distance";

type FindGarageType = StackNavigationProp<RootStackParamList, 'FindGarage'>

const Item = ({ id, name, address, distance, rating, speciality }) => {

  const navigation = useNavigation<FindGarageType>();
  return(
    <TouchableHighlight 
      underlayColor='white' 
      onPress={() => navigation.navigate('GarageDetail', {id: id})}
    >
    <View style={Style.flatListStyle}>
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1, justifyContent:'center'}}>
          <View style={Style.handleContainer}>
            {speciality == 'Motor' ? <Icon name={'motorcycle'} size={25} color='#b99504'/> : null}
            {speciality == 'Mobil' ? <Icon name={'car'} size={25} color='#b99504'/> : null}
            {speciality == 'Mobil-Motor' ? 
            <>
              <Icon name={'motorcycle'} size={25} color='#b99504'/>
              <Icon name={'car'} size={25} color='#b99504'/>
            </> : null}
          </View>
        </View>
        <View style={{flex:5, paddingHorizontal:10}}>
          <Text style={Style.titleStyle}>{name}</Text>
          <Text style={Style.descriptionStyle}>{address}</Text>
        </View>
        <View style={{ flex:3, justifyContent:'center', alignContent:'center' }}>
          <View style={{flexDirection: 'row'}}>
            <View style={Style.iconContainer}>  
              <Icon name={'map-marker'} size={25} color='#b99504'/>
              <Text style={Style.iconText}>{distance} Km</Text>
            </View>
            <View style={Style.iconContainer}>
              <Icon name={'star'} size={25} color='#b99504'/>
              <Text style={Style.iconText}>{rating}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
    </TouchableHighlight>
  )
};

export default function Find(){

  const custLocation = useAppSelector(state => state.custLocation);
  
  const renderItem = ({ item }) => {
  const distance = Math.round(haversineDistance({latitude: item.latitude, longitude:item.longitude}, custLocation) / 1000 * 100) / 100;
    return(
      <Item 
        name={item.name} 
        address={item.address} 
        distance={distance}
        rating={item.rating}
        speciality={item.speciality}
        id={item.id}
        />
    )
  };

  const searchState = useAppSelector(state => state.search);
  const filterType = useAppSelector(state => state.orderType);
  
  const Data = useAppSelector(state => state.garageData);
  const raw_user = useAppSelector(state => state.userAuth);
  const activeUser = useAppSelector(state => state.activeStatus);
  const customerData = raw_user.find((item) => item.id == activeUser.id);

  const [currButton, setCurrButton] = React.useState<number>();
  const [GarageData, setGarageData] = React.useState<any[]>(Data); 
  const [destQuery, setDestQuery] = React.useState<string>(searchState); 

  let filteredData : any[] = GarageData;

  const searchData = (searchText : string) => {
    setDestQuery(searchText);
    filteredData = Data.slice().filter((item) => {return item.name.toUpperCase().includes(destQuery.toUpperCase())})
    setGarageData(filteredData)
  }

  React.useEffect(() => {
    setDestQuery('');
  },[currButton])

  if(filterType == 0){
    let distanceArr : any[] = [];
    for(let i = 0; i <= Data.length - 1; i++){
      let distance = Math.round(haversineDistance({latitude: Data[i].latitude, longitude:Data[i].longitude}, custLocation) / 1000 * 100) / 100;
      distanceArr.push({id: Data[i].id, distance: distance});
    }
    distanceArr.sort((a, b) => {return a.distance - b.distance});
    const keyArr = distanceArr.map((item) => {return item.id});
    filteredData = Data.slice().sort((a, b) => {return keyArr.indexOf(a.id) - keyArr.indexOf(b.id)});
  }else if(filterType == 1){
    filteredData = Data.slice().sort((a, b) => b.rating - a.rating);
  }else if(filterType == 2){
    filteredData = Data.slice().filter((item) => item.openHour == '24 Jam');
  }

  React.useEffect(() => {
    setGarageData(filteredData);
  },[])

  let CAR_DATA = [], MOTOR_DATA = [];
  for(let i = 0; i <= Data.length - 1; i++){
    if(Data[i]?.speciality == 'Mobil' || Data[i]?.speciality == 'Mobil-Motor'){
      CAR_DATA.push(Data[i]);
    };
  
    if(Data[i]?.speciality == 'Motor' || Data[i]?.speciality == 'Mobil-Motor'){
      MOTOR_DATA.push(Data[i]);
    };
  };

  React.useEffect(() => {
    if(currButton == 0){
      setGarageData(Data);
    }else if(currButton == 1){
      setGarageData(CAR_DATA);
    }else if(currButton == 2){
      setGarageData(MOTOR_DATA);
    }
  }, [currButton])

  return(
  <View style={{flex:1, paddingHorizontal: 5}}>
    <TopBar id={activeUser.id} photoUrl={customerData.photoUrl}/>
    <CustomText title="Cari Bengkel" style={Style.titleText}/> 
    <View style={{alignItems:'center'}}>
      <View style={[Style.searchLayout, {marginTop:10}]}>
        <View style={Style.searchSection}>
          <Searchbar
            placeholder="Cari Bengkel Disini"
            onChangeText={searchData}
            style={Style.topSearch}
            clearIcon={(props) => (
              <Icon name="close" size={20} onPress={() => {setDestQuery(''), setGarageData(Data)}} {...props}/>
            )}
            value={destQuery}/>
        </View>
      </View>
    </View>
    
    <MultipleButton 
      size={3} 
      title={['Semua','Mobil', 'Motor']}
      direction='row'
      setActiveButton={setCurrButton}
      changeValue={['both','car','motorcycle']}
      iconName={['list','car','motorcycle']}
      style={{marginTop:12}}/>

    <View style={Style.contentContainer}>
      <SafeAreaView style={Style.listContainer}>
        <FlatList
          data={GarageData}
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
      navigate = {['CustomerMain','FindGarage','History','ChatHistory']}
      size = {4}
      />
  </View>
  )
};
