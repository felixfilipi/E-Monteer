import { View, KeyboardAvoidingView,
  Text, ScrollView, TouchableOpacity} from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from "../Styles/waitingStyle";
import { RootStackParamList } from './RootStackParamList';
import { SliderBox } from 'react-native-image-slider-box';

type OrderType = StackNavigationProp<RootStackParamList, 'Order'>

export default function Waiting(){

  const navigation = useNavigation<OrderType>();
  
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [vehicle, setVechicle] = React.useState<string>('');
  const [carColor, setCarColor] = React.useState<string>('#b1b5c1');
  const [motorColor, setMotorColor] = React.useState<string>('#b1b5c1');

  return(
  <View style={{flex:1, paddingHorizontal: 5}}>
    <ScrollView contentContainerStyle={{flexGrow:1}}>
      <View style={{ alignItems: 'center'}}>
        <KeyboardAvoidingView>
          <View style={Style.searchSection}>
          </View>

          <View style={{flex:4}}>
            <Image 
                style={{width:350, height:250}}
                source={require("../../assets/images/relaxMechanic.png")}/>
            <Text style={Style.descText}>Pilih Jenis Kendaraan Anda</Text>
              <View style={Style.vehicle}>
                <TouchableOpacity style={[Style.vehicleBtn, {backgroundColor: carColor}]}
                  onPress={()=>setVechicle('mobil')} activeOpacity={0.7}>
                  <Icon name="car" size={125} color='black'/>
                  <Text style={Style.ButtonText}> Mobil </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Style.vehicleBtn, {backgroundColor: motorColor}]} activeOpacity={0.7}
                  onPress={()=>setVechicle('motor')}>
                  <Icon name="motorcycle" size={125} color='black'/>
                  <Text style={Style.ButtonText}> Motor </Text>
                </TouchableOpacity>
              </View>
          </View>

          <View style={Style.orderSection}>
              <View style={{flexDirection:'row', marginLeft:10}}>
                <Icon name="warning" size={20} color='#c70003'/>
                <Text style={Style.importantText}> Pastikan Lokasi Dan Kendaraan Anda Tepat!! </Text>
              </View>
              <TouchableOpacity style={Style.orderBtn} activeOpacity={0.7}
                onPress={() => validateOrder()}>
                <Text style={Style.orderText}>Pesan Sekarang</Text>
              </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  )
};
