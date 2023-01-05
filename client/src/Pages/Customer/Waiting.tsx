import { View } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../RootStackParamList';
import { AbsoluteButton } from '../../Component/CustomButton';
import { CustomText } from '../../Component/CustomText'
import { ImageSlider } from 'react-native-image-slider-banner';
import { useAppDispatch } from '../../../redux';
import { setOrderFail } from '../../../redux/component/orderFail';

type WaitingType = StackNavigationProp<RootStackParamList, 'Waiting'>

export default function Waiting(){

  const dispatch = useAppDispatch();
  const navigation = useNavigation<WaitingType>();

  const [time, setTime] = React.useState(5);
  const timerRef = React.useRef(time);

  React.useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if(timerRef.current < 0){
        clearInterval(timerId);
        dispatch(setOrderFail(true));
        navigation.navigate('CustomerHome');
      }else{
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return(
  <View style={{flex:1, paddingHorizontal: 5}}>
      <View style={{ alignItems: 'center'}}>
        <View style={{maxHeight: 300, marginVertical: 20}}> 
          <ImageSlider
              data={[
                {img: require('../../../assets/images/waiting1.png')},
                {img: require('../../../assets/images/towing.png')},
                {img: require('../../../assets/images/mehanic.png')},
              ]}
              localImg
              preview={false}
              showIndicator={false}
              timer={20000}
              autoPlay={true}
          />
        </View>
          <CustomText title="Sedang Mencarikan
          Bengkel Terdekat Ke Lokasi Anda. Mohon Tunggu Sebentar"
          style={{paddingHorizontal:10}}
          color={'white'}
          size={20}/>
      </View>
    <AbsoluteButton 
      title={'Batalkan Pesanan ( '+ time + 's )'} 
      color='white' 
      icon='remove'
      style={{borderRadius:20, 
          backgroundColor: '#BE0003', 
          marginHorizontal:10}}
      textStyle={{marginLeft: 8}}
      onPress={() => {navigation.navigate('CustomerHome')}}/>
  </View>
  )
};
