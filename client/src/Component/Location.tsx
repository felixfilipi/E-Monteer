import {View, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { CustomText, ImportantText } from './CustomText';
import Style from '../Styles/ComponentStyle';
import MapView, { Marker } from 'react-native-maps';
import { CustomButton } from './CustomButton';
import { useAppDispatch, useAppSelector } from '../../redux';
import { setLatitude } from '../../redux/component/latitude';
import { setLongitude } from '../../redux/component/longitude';

/*
*   props:
*   visibleModal      = need state name,
*   setVisibleModal   = need state action,
*   setOutputModal    = return the output to state,
*   title             = need string for title,
*   onTrue            = specify what to do after true,
*/

export const Location = (props: any) => {
  const [addressLoc, setAddressLoc] = React.useState<string>();
  
  const dispatch = useAppDispatch();
  const latitude = useAppSelector(state => state.latitude);
  const longitude = useAppSelector(state => state.longitude);
  
  const dragableMarker = (e : any) => {
    dispatch(setLatitude(e.nativeEvent.coordinate.latitude));
    dispatch(setLongitude(e.nativeEvent.coordinate.longitude));
  }

  const setNewLocation = () => {
    props.setOutputState(`${addressLoc} ( ${latitude}, ${longitude} )`);
    props.visibleModal(false);
  }

  let _map: any;
  const fitCamera = () => {
    _map.fitToCoordinates([{latitude: latitude, longitude: longitude}], {edgePadding: {top:50, right:50, left:50, bottom:50}, animated: true}) }
  
  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visibleModal}
      onRequestClose={() => props.setVisibleModal(!props.visibleModal)}
    >
      <View style={Style.modalMaskLayoutLocation}>
        <TouchableWithoutFeedback onPress={() => props.setVisibleModal(false)}>
          <View style={Style.modalMask}/>
        </TouchableWithoutFeedback>
          <View style={Style.modalLayout}>
            <TouchableOpacity onPress={() => props.setVisibleModal(false)}>
              <View style={Style.modalCloseLocation}>
                <Icon name='cross' size={30} color='#9ca8ac'/>
              </View>
            </TouchableOpacity>
            <CustomText 
              title="Lokasi Anda" 
              color="black" 
              size={20}
              style={Style.modalTitleLocation}/>
            <View style={Style.modalMetaContainerLocation}>
              <View style={Style.modalTotalLayoutLocation}>
                <CustomText
                  title="Alamat :"
                  color="black"
                  size={15}
                  style={{flex:1, textAlign:'left'}}
                  />
                <TextInput 
                  onChangeText={setAddressLoc} 
                  value={addressLoc}
                  style={{marginTop:-10, flex:3, borderBottomWidth:0.3,  marginRight:15, fontSize:15}}
                  />
              </View>
              <View>
                <MapView
                  initialRegion={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                  }}
                  ref={(ref) => _map = ref}
                  style={{ 
                      height:160,
                      marginVertical:15,
                      justifyContent:'center'}}>
                  <Marker
                    draggable
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title={'Lokasi Anda'}
                    onDragEnd={(e) => dragableMarker(e)}
                  >
                  <Icon name={'location-pin'} size={50} color={'#4eacea'}/>
                  </Marker>
                </MapView>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {fitCamera()}}
                  style={{position:'absolute',left:8, bottom:45}}>
                  <View style={Style.floatingButtonLayout}>
                    <Icon name="hair-cross" size={30} color="rgba(58, 68, 71, 1)"/>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex:1}}>
                <ImportantText title="Tahan Marker Untuk Memindahkan Lokasi Anda"/>
                <View style={Style.modalButtonLayout}>
                  <CustomButton 
                    title="Pasang Lokasi Ini" 
                    style={{flex:1, backgroundColor:'#59a540'}} 
                    textStyle={Style.modalButtonTextLocation}
                    onPress={() => setNewLocation()}
                  />
                </View>
              </View>
            </View>
          </View>
      </View>
    </Modal>
  )
}
