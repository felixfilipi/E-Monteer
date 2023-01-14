import {View, Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { CustomText } from './CustomText';
import Styles from '../Styles/ComponentStyle';

/*
*   props:
*   visibleModal      = need state name,
*   setVisibleModal   = need state action,
*   title             = need string for title,
*   onTrue            = specify what to do after true,
*/

export const Done = (props: any) => {
  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visibleModal}
      onRequestClose={() => props.setVisibleModal(!props.visibleModal)}>
      <View style={[Styles.modalLayout, {zIndex:props.zIndex}]}>
        <View style={[Styles.modalMaskExcept, {flexDirection:'row', alignItems:'center', marginHorizontal:25}]}>
          <CustomText title={props.title} size={20} style={{flex:2}}/>
          <View style={[Styles.modalButtonLayout, {flex:1}]}>
            <TouchableOpacity activeOpacity={0.7} onPress={props.onTrue}> 
              <View>
                <View style={[Styles.modalButton, {backgroundColor:'#3676a2'}]}>
                  <Icon name="check" size={25} color="#fefefe"/>
                </View>
                <CustomText title="Ok" size={15} color="black" style={{marginVertical:5, marginLeft:0}}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => props.setVisibleModal(false)}>
          <View style={Styles.modalMask}/>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  )
} 
