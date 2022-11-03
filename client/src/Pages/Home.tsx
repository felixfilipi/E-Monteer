import { Image, View, KeyboardAvoidingView,
  Text, ScrollView, TouchableOpacity} from "react-native";
import React from 'react';
import { Avatar, Searchbar, Card, Title, Paragraph, BottomNavigation } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/Entypo';
import { Rating } from 'react-native-ratings';
import { useComponentDidMount } from '../Component/customHooks'
import Style from "../Styles/homeStyle";
import { RootStackParamList } from './RootStackParamList';

type HomeType = StackNavigationProp<RootStackParamList, 'Home'>

const HomeRoute = () => <Text>Home</Text>
const SearchRoute = () => <Text>Search</Text>
const HistoryRoute = () => <Text>History</Text>
const ExploreRoute = () => <Text>Explore</Text>

export default function Home(){

  const navigation = useNavigation<HomeType>();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [rating, setRating] = React.useState<number>();
  const [rateState, setRateState] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home-circle' },
    { key: 'search', title: 'Search', icon: 'map-search-outline' },
    { key: 'history', title: 'History', icon: 'history' },
    { key: 'explore', title: 'Explore', icon: 'book' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    search: SearchRoute,
    history: HistoryRoute,
    explore: ExploreRoute,
  });

  const onChangeSearch = query => setSearchQuery(query);
  const isComponentMount : boolean = useComponentDidMount();

  React.useEffect(()=>{
    if(isComponentMount){
      setRateState(true);
    }
  },[rating])

  return(
    <ScrollView contentContainerStyle={{flexGrow:1}}>
      <View style={{ alignItems: 'center', flex:1 }}>
        <KeyboardAvoidingView>
          <View style={Style.topBar}>
            <View style={Style.topItem}>
            <Image 
                  source={require("../../assets/images/blogo.png")}
                  style={Style.logo}/>
            </View>
            <View style={Style.topItem}>
            <Avatar.Image 
              size={60}
              style={Style.avatar}
              source={require('../../assets/images/newUser.png')}/>
            </View>
          </View>

          <View style={Style.searchSection}>
            <Searchbar
              placeholder="Cari Bengkel"
              onChangeText={onChangeSearch}
              style={{backgroundColor:'#fff'}}
              value={searchQuery}/>
              <View style={{justifyContent:'center', flexDirection: 'row'}}>
                <TouchableOpacity style={Style.MyButton} activeOpacity={0.7}>
                  <Icon 
                    name={"location-pin"} 
                    size={20} 
                    color="#fff"
                    />
                  <Text style={Style.ButtonText}>Terdekat</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Style.MyButton} activeOpacity={0.7}>
                  <Icon 
                    name={"heart"} 
                    size={20} 
                    color="#fff"
                    />
                  <Text style={Style.ButtonText}>Terfavorit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Style.MyButton} activeOpacity={0.7}>
                  <Icon 
                    name={"hour-glass"} 
                    size={20} 
                    color="#fff"
                    />
                  <Text style={Style.ButtonText}>24 Jam</Text>
                </TouchableOpacity>
              </View>
          </View>
          
          <View style={{backgroundColor:'white', height:300, width: 390, justifyContent:'center'}}>
            <Text style={{textAlign:'center'}}> Map </Text>
            <TouchableOpacity style={[Style.MyButton, {position :'absolute', bottom: 8, right: 8}]} activeOpacity={0.7}>
             <Icon 
               name={"tools"} 
               size={20} 
               color="#fff"
               />
             <Text style={Style.ButtonText}> Cari Terdekat</Text>
            </TouchableOpacity>
          </View>

            <View>
              <Card style={Style.CardStyle}>
                <Card.Content>
                  <Title> Bengkel Cepi Jaya </Title>
                  <Paragraph>Jalan MH Thamrin 1, Jakarta Pusat</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Rating
                    type='custom'
                    startingValue={0}
                    ratingBackgroundColor="#B1B5C1"
                    imageSize={30}
                    tintColor='#fffde6'
                    readonly={rateState}
                    onFinishRating={(rating) => {setRating(rating)}}
                    style={Style.ratingStyle}/>
                  <TouchableOpacity style={Style.MyButton} activeOpacity={0.7}>
                    <Icon 
                     name={"phone"} 
                     size={20} 
                     color="#fff"
                     />
                    <Text style={Style.ButtonText}> Hubungi Bengkel</Text>
                  </TouchableOpacity>
                </Card.Actions>
              </Card>
            </View>
        </KeyboardAvoidingView>
      </View>

      <BottomNavigation
        labeled={true}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: '#b99504' }}
        activeColor='#fff'
        style={{position: 'absolute', bottom:0, left:0, right:0}}
        shifting={false}
      />
    </ScrollView>
  )
};

