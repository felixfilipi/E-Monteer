import { View, KeyboardAvoidingView,
  Text, ScrollView, TouchableOpacity} from "react-native";
import React from 'react';
import { Searchbar, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/Entypo';
import { Rating } from 'react-native-ratings';
import Style from "../Styles/homeStyle";
import {TopBar, BottomNav} from '../Component/navBar'
import { RootStackParamList } from './RootStackParamList';

type HomeType = StackNavigationProp<RootStackParamList, 'Home'>

export default function Home(){

  const navigation = useNavigation<HomeType>();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [rating, setRating] = React.useState<number>(0);
  const [rateState, setRateState] = React.useState<boolean>(false);

  const onChangeSearch = (query : string) => setSearchQuery(query);

  React.useEffect(()=>{
    if(rating !== 0){
      setRateState(true);
    }
  },[rating])

  return(
  <View style={{flex:1}}>
    <TopBar/>
    <ScrollView contentContainerStyle={{flexGrow:1}}>
      <View style={{ alignItems: 'center', flex:1 }}>
        <KeyboardAvoidingView>
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
            <Text style={Style.historyLabel}>History</Text>
              <Card style={Style.CardStyle}>
                <Card.Content>
                  <Title style={{marginLeft: -5}}> Bengkel Cepi Jaya </Title>
                  <Paragraph>Jalan MH Thamrin 1, Jakarta Pusat</Paragraph>
                  <View style={{flexDirection:'row', marginTop:10}}>
                    <Icon 
                      name={"stopwatch"} 
                      size={18} 
                      color="#8d909a"
                      />
                    <Text style={Style.dateLabel}>05/11/2022 20:20</Text>
                  </View>
                </Card.Content>
                <Card.Actions>
                  <Rating
                    type='custom'
                    startingValue={0}
                    ratingBackgroundColor="#B1B5C1"
                    imageSize={30}
                    tintColor='#fffde6'
                    readonly={rateState}
                    onFinishRating={(rating : number) => {setRating(rating)}}
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
      </ScrollView>
      <BottomNav/>
    </View>
  )
};

