import { View, Image, ScrollView} from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Style from "../../Styles/CustomerStyle/GarageDetail";
import { RootStackParamList } from '../RootStackParamList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AbsoluteButton} from '../../Component/CustomButton';
import { CustomText } from "../../Component/CustomText";
import { Rating } from "react-native-ratings";
import { useAppSelector } from "../../../redux";

type GarageDetailType = StackNavigationProp<RootStackParamList, 'GarageDetail'>

export default function GarageDetail(props : any){

  const navigation = useNavigation<GarageDetailType>();
  const DataID : number = props.route.params.id;

  let icon_list : string[] = [], desc_list : any[] = [], Content : any[] = []; 
  
  const GarageData = useAppSelector(state => state.garageData);
  const raw_OwnerData = useAppSelector(state => state.userAuth);
  const OwnerData = raw_OwnerData.find((item) => {return item.garageId == DataID && item.role == 'Owner'});

  icon_list = ['map-marker','clock-o','calendar','globe', 'phone', 'wrench']
  desc_list = [GarageData[DataID - 1].address, GarageData[DataID - 1].openHour, 
    GarageData[DataID - 1].openDay, GarageData[DataID - 1].site, OwnerData.phone, 
    GarageData[DataID - 1].speciality]
  
  for(let i = 0; i <= icon_list.length;i++){
    Content.push(
      <View style={Style.descriptionLayout} key={"Garage" + i}>
        <View style={{flex:1, alignItems:'center'}}>
          <Icon 
            name={icon_list[i]} 
            size={30}
            color="#b99504"
            style={{flex:1}}
            />
        </View>
        <View style={{flex:7}}>
        <CustomText
          selectable={true}
          title={desc_list[i]}
          style={Style.descriptionStyle}/> 
        </View>
      </View>
    )
  }
  return(
  <View style={{flex:1, paddingHorizontal: 5}}>
    <ScrollView>
      <Image 
        source={{uri: GarageData[DataID - 1]?.photoUrl}} 
        style={{height:200, left:0, right:0}}
        resizeMode="cover"/>
      
      <View style={Style.descriptionContainer}>
        <CustomText title={GarageData[DataID - 1]?.name} style={Style.titleText}/> 
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <Rating
            type='custom'
            startingValue={GarageData[DataID - 1].rating}
            ratingBackgroundColor="#B1B5C1"
            imageSize={30}
            tintColor='white'
            readonly={true} 
          />
          <CustomText title={'( ' + GarageData[DataID - 1].total_rating + ' )'} size={15} color="#94a0b3" style={{marginBottom:0, marginTop: 5}}/>
        </View>
        <View style={{marginTop:20, marginBottom:-40}}>
          {Content}
        </View>
      </View>
    </ScrollView>
    <AbsoluteButton 
      title={'Panggil Bengkel'}
      style={{marginHorizontal:15}}
      onPress={() => navigation.navigate('OrderGarage', {id:GarageData[DataID - 1].id, 
        handleType:GarageData[DataID - 1].speciality})}/>
  </View>
  )
};
