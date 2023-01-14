import React from "react";
import { Modal, KeyboardAvoidingView, TouchableWithoutFeedback, 
  TouchableOpacity, TextInput,  View } from "react-native";
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
*   totalPayment = state for the payment
*   setTotalPayment = set state for the payment
*/

export function AddPayment(props : any) {
  
  const [flexState, setFlexState] = React.useState<number>(5);

  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visibleModal}
      onRequestClose={() => props.setVisibleModal(!props.visibleModal)}>
      <KeyboardAvoidingView style={Style.modalMaskLayout}>
        <TouchableWithoutFeedback onPress={() => {props.setVisibleModal(false), setFlexState(5)}}>
          <View style={[Style.modalMask, {flex:flexState}]}/>
        </TouchableWithoutFeedback>
          <View style={[Style.modalLayout, {flex:5}]}>
            <TouchableOpacity onPress={() => {props.setVisibleModal(false), setFlexState(5)}}>
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
                    <View style={{flexDirection:'row', paddingVertical:15}}>
                      <CustomText title="Total Biaya: " size={12} color="black" style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
                      <CustomText title={'Rp. ' + props.total_cost} size={12} color="black" style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
                    </View>
                    <CustomText title="Jumlah Yang Dibayarkan:" size={12} color="black" style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
                    <TextInput 
                      onFocus={() => setFlexState(2)}
                      onEndEditing={() => setFlexState(5)}
                      onChangeText={props.setTotalPayment} 
                      keyboardType={'numeric'}
                      value={props.totalPayment}
                      style={{borderBottomWidth:0.3, padding:5, marginRight:15, fontSize:15}}
                      />
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
