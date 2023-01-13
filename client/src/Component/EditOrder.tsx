import React from "react";
import { Modal, KeyboardAvoidingView, TouchableWithoutFeedback, 
  TouchableOpacity, TextInput,  View } from "react-native";
import NumericInput from 'react-native-numeric-input';
import Style from "../Styles/ComponentStyle/EditOrder";
import { CustomButton } from "./CustomButton";
import { CustomText } from "./CustomText";
import Icon from "react-native-vector-icons/Entypo";


/* Props List:
*   visibleModal = state modal to describe visibility of the modal
*   setVisibleModal = give the set of the state to config the visibility 
*   onSubmit = what to do after submit?
*   submitTitle = what text to show in submit button
*   descTitle = what title to show in the description
*   fixDescription = state for the description
*   setFixDescription = set state for the description
*   fixNumber = state for the number
*   setFixNumber = set state for the number
*   fixPrice = state for the price
*   setFixPrice = set state for the price
*/

export function EditOrder(props : any) {
  
  const [flexState, setFlexState] = React.useState<number>(5);

  const onClose = () =>{
    props.onCloseState(false);
  }

  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visibleModal}
      onRequestClose={() => props.setVisibleModal(!props.visibleModal)}>
      <KeyboardAvoidingView style={Style.modalMaskLayout}>
        <TouchableWithoutFeedback onPress={() => {props.setVisibleModal(false), setFlexState(5), onClose()}}>
          <View style={[Style.modalMask, {flex:flexState}]}/>
        </TouchableWithoutFeedback>
          <View style={[Style.modalLayout, {flex:5}]}>
            <TouchableOpacity onPress={() => {props.setVisibleModal(false), setFlexState(5), onClose()}}>
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
                  <View style={{flex:1}}>
                    <CustomText title="Deskripsi Perbaikan:" size={12} color="black" style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
                    <TextInput 
                      onFocus={() => setFlexState(2)}
                      onEndEditing={() => setFlexState(5)}
                      onChangeText={props.setFixDescription} 
                      value={props.fixDescription}
                      style={{borderBottomWidth:0.3, padding:5, marginRight:15, fontSize:15}}
                      />
                  </View>
                  <View style={{flexDirection:'row', flex:1, padding:5}}>
                    <View style={{flex:1}}>
                      <CustomText title="Biaya Perbaikan (per unit)" size={12} color="black" style={{textAlign:'left', marginBottom:0, marginLeft:0}}/>
                      <TextInput
                        onFocus={() => setFlexState(2)}
                        onEndEditing={() => setFlexState(5)}
                        onChangeText={props.setFixPrice} 
                        value={String(props.fixPrice)}
                        style={{borderBottomWidth:0.3, padding:5, fontSize:15, marginRight:15}}
                        keyboardType='numeric'
                      />
                    </View>
                    <View style={{flex:1, alignItems:'center'}}>
                      <CustomText title="Total Perbaikan" size={12} color="black" style={{marginLeft:0}}/>
                      <NumericInput 
                        onChange={(value) => props.setFixNumber(value)}
                        value={props.fixNumber}
                        iconSize={10}
                        totalWidth={100}
                        totalHeight={30}
                      />
                    </View>
                  </View>
                </View>
                <CustomButton 
                  title={props.submitTitle} 
                  style={{flex:1}} 
                  textStyle={Style.modalButtonText}
                  onPress={props.onSubmit}/>
              </View>
            </View>
          </View>
      </KeyboardAvoidingView>
    </Modal>
  )
} 
