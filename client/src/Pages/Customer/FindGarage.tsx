import { View, Text, FlatList, SafeAreaView, TouchableHighlight} from "react-native";
import React from 'react';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../../Styles/CustomerStyle/FindGarage";
import { RootStackParamList } from '../RootStackParamList';
import { BottomNav } from '../../Component/navBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MultipleButton } from '../../Component/CustomButton';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { setSearch } from "../../../redux/component/search";
import { CustomText } from "../../Component/CustomText";

type FindGarageType = StackNavigationProp<RootStackParamList, 'FindGarage'>

const DATA = [
  {
    id:1,
    title: 'Bengkel cepi jaya',
    location: 'jalan mh thamrin 1, jakarta pusat.',
    distance: '2.5',
    rating: 5,
    handleType: 'both'
  },
  {
    id:2,
    title: 'Bengkel bos jaya',
    location: 'bangalore, singapore.',
    distance: '7',
    rating: 1.5,
    handleType: 'motorcycle',
  },
  {
    id:3,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    distance: '0.1',
    rating: 4,
    handleType: 'car'
  },
  {
    id:4,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    distance: '0.1',
    rating: 3,
    handleType: 'motorcycle'
  },
  {
    id:5,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    distance: '0.1',
    rating: 2,
    handleType: 'car'
  },
  {
    id:6,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    distance: '0.1',
    rating: 3,
    handleType: 'both'
  },
  {
    id:7,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    distance: '0.1',
    rating: 3.3,
    handleType: 'both'
  }

];

let CAR_DATA = [], MOTOR_DATA = [];
for(let i = 0; i <= DATA.length; i++){
  if(DATA[i]?.handleType == 'car' || DATA[i]?.handleType == 'both'){
    CAR_DATA.push(DATA[i]);
  };

  if(DATA[i]?.handleType == 'motorcycle' || DATA[i]?.handleType == 'both'){
    MOTOR_DATA.push(DATA[i]);
  };
};


const Item = ({ id, title, location, distance, rating, handleType }) => {

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
            {handleType == 'motorcycle' ? <Icon name={'motorcycle'} size={25} color='#b99504'/> : null}
            {handleType == 'car' ? <Icon name={'car'} size={25} color='#b99504'/> : null}
            {handleType == 'both' ? <>
              <Icon name={'motorcycle'} size={25} color='#b99504'/>
              <Icon name={'car'} size={25} color='#b99504'/>
            </> : null}
          </View>
        </View>
        <View style={{flex:5, paddingHorizontal:10}}>
          <Text style={Style.titleStyle}>{title}</Text>
          <Text style={Style.descriptionStyle}>{location}</Text>
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

  const renderItem = ({ item }) => {
    return(
      <Item 
        title={item.title} 
        location={item.location} 
        distance={item.distance}
        rating={item.rating}
        handleType={item.handleType}
        id={item.id}
        />
    )
  };
 
  const vehicleType = useAppSelector(state => state.vehicle);
  const searchState = useAppSelector(state => state.search);
  const dispatch = useAppDispatch();
  
  const [destQuery, setDestQuery] = React.useState<string>(searchState);
  
  const onChangeDest = (query : string) => setDestQuery(query);
  
  React.useEffect(() => {
    dispatch(setSearch(''))
  }, []);

  return(
  <View style={{flex:1, paddingHorizontal: 5}}>
    <CustomText title="Cari Bengkel" style={Style.titleText}/> 
    <View style={{alignItems:'center'}}>
      <View style={[Style.searchLayout, {marginTop:10}]}>
        <View style={Style.searchSection}>
          <Searchbar
            placeholder="Cari Bengkel Disini"
            onChangeText={onChangeDest}
            style={Style.topSearch}
            value={destQuery}/>
        </View>
      </View>
    </View>
    
    <MultipleButton 
      size={3} 
      title={['Semua','Mobil', 'Motor']}
      direction='row'
      keyValue={'find'}
      changeValue={['both','car','motorcycle']}
      iconName={['list','car','motorcycle']}
      style={{marginTop:12}}/>

    <View style={Style.contentContainer}>
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
