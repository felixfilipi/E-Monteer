import { View, KeyboardAvoidingView, Text,
  ScrollView, TouchableOpacity, FlatList, SafeAreaView, TouchableHighlight, Alert} from "react-native";
import React from 'react';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../Styles/findStyle";
import { RootStackParamList } from './RootStackParamList';
import { BottomNav } from '../Component/navBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MultipleButton } from '../Component/CustomButton';
import { useAppDispatch, useAppSelector } from '../../redux';
import { setSearch } from "../../redux/component/search";
import { useComponentDidMount } from '../Component/customHooks';

type FindType = StackNavigationProp<RootStackParamList, 'Find'>

const DATA = [
  {
    id:1,
    title: 'Bengkel cepi jaya',
    location: 'jalan mh thamrin 1, jakarta pusat.',
    distance: '2.5 km'
  },
  {
    id:2,
    title: 'Bengkel bos jaya',
    location: 'bangalore, singapore.',
    distance: '7 km'
  },
  {
    id:3,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    distance: '0.1 km'
  },
  {
    id:4,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    distance: '0.1 km'
  },
  {
    id:5,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    distance: '0.1 km'
  },
  {
    id:6,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    distance: '0.1 km'
  },
  {
    id:7,
    title: 'Bengkel kuli jaya',
    location: 'kebon kacang, jakarta pusat.',
    distance: '0.1 km'
  }

];

const Item = ({ title, location, distance }) => (
  <TouchableHighlight 
    underlayColor='white' 
    onPress={() => Alert.alert('a')}
    style={{borderRadius:10}}
  >
  <View style={Style.FlatListStyle}>
    <View style={{flexDirection:'row'}}>
      <View style={{flex:4}}>
        <Text style={Style.titleStyle}>{title}</Text>
        <Text style={Style.descriptionStyle}>{location}</Text>
      </View>
      <View style={Style.iconContainer}>
        <Icon name={'map-marker'} size={25} color='#b99504'/>
        <Text style={Style.descriptionStyle}>{distance}</Text>
      </View>
    </View>
  </View>
  </TouchableHighlight>
);

export default function Find(){

  const renderItem = ({ item }) => {
    return(
      <Item 
        title={item.title} 
        location={item.location} 
        distance={item.distance}
        />
    )
  };

  const navigation = useNavigation<FindType>();
  
  const searchState = useAppSelector(state => state.search);
  const dispatch = useAppDispatch();
  
  const [destQuery, setDestQuery] = React.useState<string>(searchState);
  const [posQuery, setPosQuery] = React.useState<string>('');
  
  const onChangeDest = (query : string) => setDestQuery(query);
  const onChangePos = (query : string) => setPosQuery(query);

  const isComponentMounted = useComponentDidMount();
  if(isComponentMounted){
    dispatch(setSearch(''));
  };

  return(
  <View style={{flex:1, paddingHorizontal: 5}}>
    <View style={[Style.searchLayout, {marginTop:20}]}>
      <View style={Style.searchSection}>
        <Searchbar
          placeholder="Cari Bengkel Disini"
          onChangeText={onChangeDest}
          style={Style.topSearch}
          value={destQuery}/>
        <Searchbar
          placeholder="Masukkan Lokasi Anda"
          onChangeText={onChangePos}
          style={Style.bottomSearch}
          value={posQuery}/>
      </View>
    </View>
    
    <MultipleButton 
      size={2} 
      title={['Mobil', 'Motor']}
      direction='row'
      iconName={['car','motorcycle']}
      style={{marginTop:12}}/>

    <View style={{flex:1, marginBottom:65, marginTop:5}}>
    <SafeAreaView style={Style.ListContainer}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        nestedScrollEnabled
        ItemSeparatorComponent={() => (<View style={{backgroundColor: '#C5C2C0', height:1}}/>)}
        />
    </SafeAreaView>
    </View>
    <BottomNav/>
  </View>
  )
};
