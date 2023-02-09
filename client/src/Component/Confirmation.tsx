import { FlatList, View, Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
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

export const Confirmation = (props: any) => {
  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visibleModal}
      onRequestClose={() => props.setVisibleModal(!props.visibleModal)}>
      <View style={[Styles.modalLayout, {zIndex:props.zIndex}]}>
        <View style={Styles.modalMaskExcept}>
          <CustomText title={props.title} size={20}/>
          <View style={Styles.modalButtonLayout}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => props.setVisibleModal(false)}>
              <View>
                <View style={Styles.modalButton}>
                  <Icon name="cross" size={25} color="#fefefe"/>
                </View>
                <CustomText title="Tidak" size={15} color="black" style={{marginVertical:5, marginLeft:0}}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={props.onTrue}> 
              <View>
                <View style={[Styles.modalButton, {backgroundColor:'#3676a2'}]}>
                  <Icon name="check" size={25} color="#fefefe"/>
                </View>
                <CustomText title="Ya" size={15} color="black" style={{marginVertical:5, marginLeft:0}}/>
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


const Item = ({ description, quantity, price }) => {
  
  return(
    <View style={{flexDirection:'row', flex:1, paddingVertical:15, alignItems:'center'}}>
      <CustomText title={description} size={15} color='#919b9f' style={{flex:4, marginBottom:0, marginLeft:0, textAlign:'left'}}/>
        <View style={{flex:2, flexDirection:'row'}}>
          <CustomText title={'Rp. ' + price} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
          <CustomText title={' x '} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
          <CustomText title={'('+ quantity + ')'} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
        </View>
      <CustomText title={'Rp. ' + price * quantity} size={15} color='#919b9f' style={{flex:4, marginLeft:0, marginBottom:0, textAlign:'right'}}/>
    </View>
  )
}

export const CostListConfirmation = (props: any) => {

  const renderItem = ({ item }) => {
    return(
      <Item
        description = {item.description}
        quantity = {item.quantity}
        price = {item.price}
        />
    )
  }
  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visibleModal}
      onRequestClose={() => props.setVisibleModal(!props.visibleModal)}>
      <View style={[Styles.modalLayout, {zIndex:props.zIndex}]}>
        <View style={[Styles.modalMaskExcept, {maxHeight:700, marginHorizontal:20}]}>
          <CustomText title={props.title} size={20}/>
          <View style={{borderWidth:0.3, borderRadius:20, paddingHorizontal:15, marginTop:20, maxHeight:400}}>
          <FlatList
            data={props.costList}
            renderItem={renderItem}
            nestedScrollEnabled/>
          </View>
          <View style={Styles.modalButtonLayout}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => props.setVisibleModal(false)}>
              <View>
                <View style={Styles.modalButton}>
                  <Icon name="cross" size={25} color="#fefefe"/>
                </View>
                <CustomText title="Tidak" size={15} color="black" style={{marginVertical:5, marginLeft:0}}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={props.onTrue}> 
              <View>
                <View style={[Styles.modalButton, {backgroundColor:'#3676a2'}]}>
                  <Icon name="check" size={25} color="#fefefe"/>
                </View>
                <CustomText title="Ya" size={15} color="black" style={{marginVertical:5, marginLeft:0}}/>
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
