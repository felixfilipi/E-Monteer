import React from "react";
import { Modal, KeyboardAvoidingView, TouchableWithoutFeedback, 
  TouchableOpacity, View } from "react-native";
import Style from "../Styles/ComponentStyle/EditOrder";
import { CustomButton } from "./CustomButton";
import { CustomText } from "./CustomText";
import Icon from "react-native-vector-icons/Entypo";
import call from 'react-native-phone-call';


/* Props List:
*   visibleModal = state modal to describe visibility of the modal
*   setVisibleModal = give the set of the state to config the visibility 
*   onSubmit = what to do after submit?
*   submitTitle = what text to show in submit button
*   descTitle = what title to show in the description
*/

const DATA = [
  {
    id:1,
    name: 'Derek Bang Faizal',
    address: 'Jalan Ikan Paus 15a, Malang',
    phone: '087892314322',
    distance:5,
    cost_per_km: 20000
  },
  {
    id:2,
    name: 'Derek Bang Imam',
    address: 'Jalan Ikan Paus 15a, Malang',
    phone: '087892314322',
    distance:2,
    cost_per_km: 20000
  },
  {
    id:3,
    name: 'Derek Bang Toper',
    address: 'Jalan Ikan Paus 15a, Malang',
    phone: '087892314322',
    distance:15,
    cost_per_km: 20000
  },
]
export function CallTowing(props : any) {
  let nearest : number = 1;
  for(let i = 0; i <= DATA.length - 1; i++){
    if(DATA[i].distance < DATA[nearest].distance){
      nearest = i;
    }
  }
  
  const args = {
    number: DATA[nearest].phone,
    prompt: false,
    skipCanOpen: true
  }
  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visibleModal}
      onRequestClose={() => props.setVisibleModal(!props.visibleModal)}>
      <KeyboardAvoidingView style={Style.modalMaskLayout}>
        <TouchableWithoutFeedback onPress={() => {props.setVisibleModal(false)}}>
          <View style={[Style.modalMask]}/>
        </TouchableWithoutFeedback>
          <View style={[Style.modalLayout, {flex:1}]}>
            <TouchableOpacity onPress={() => {props.setVisibleModal(false)}}>
              <View style={Style.modalClose}>
                <Icon name='cross' size={30} color='#9ca8ac'/>
              </View>
            </TouchableOpacity>
            <CustomText 
              title={props.descTitle} 
              color="black" 
              size={20}
              style={Style.modalTitle}/>
            <View style={[Style.modalListLayout]}>
              <View style={{flex:1, padding:15}}>
                <View style={{flex:3}}>
                  <View style={{flex:1, flexDirection:'row'}}>
                    <CustomText title="Jasa Derek: " size={12} color="black" style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
                    <CustomText title={DATA[nearest].name} size={12} color="black" style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
                  </View>
                  <View style={{flex:1, flexDirection:'row'}}>
                    <CustomText title="Alamat Derek: " size={12} color="black" style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
                    <CustomText title={DATA[nearest].address} size={12} color="black" style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
                  </View>
                  <View style={{flex:1, flexDirection:'row'}}>
                    <CustomText title="Nomor Telepon Derek: " size={12} color="black" style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
                    <CustomText title={DATA[nearest].phone} size={12} color="black" style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
                  </View>
                  <View style={{flex:1, flexDirection:'row'}}>
                    <CustomText title="Biaya Derek Per Kilo: " size={12} color="black" style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
                    <CustomText title={DATA[nearest].cost_per_km} size={12} color="black" style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
                  </View>
                </View>
                <CustomButton 
                  title={props.submitTitle} 
                  style={{flex:1}} 
                  textStyle={Style.modalButtonText}
                  onPress={() => call(args).catch(console.error)}/>
              </View>
            </View>
          </View>
      </KeyboardAvoidingView>
    </Modal>
  )
} 
