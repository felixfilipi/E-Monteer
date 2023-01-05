import {View, Text, TouchableOpacity} from 'react-native';
import Style from '../Styles/ComponentStyle'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppDispatch } from '../../redux';

export const CustomButton = (props : any) => {
  return(
        <TouchableOpacity 
          style={[Style.orderBtn, props.style]} 
          activeOpacity={0.7}
          onPress={props.onPress}>
            {props.icon != undefined ? <Icon name={props.icon} size={30} color={'white'}/> : null}
            <Text 
              style={[Style.orderText, props.textStyle]}>{props.title}</Text>
        </TouchableOpacity>
  )
}

export const AbsoluteButton = (props : any) => {
  return(
      <View style={Style.orderSection}>
        <TouchableOpacity 
          style={[Style.orderBtn, props.style]} 
          activeOpacity={0.7}
          onPress={props.onPress}>
            {props.icon != undefined ? <Icon name={props.icon} size={30} color={'white'}/> : null}
            <Text 
              style={[Style.orderText, props.textStyle]}>{props.title}</Text>
        </TouchableOpacity>
      </View>
  )
}

export const LogoButton = (props : any) => {
  return(
    <TouchableOpacity style={[Style.vehicleBtn, props.style]}
      onPress={props.onPress} activeOpacity={0.7}>
      <Icon name={props.iconName} size={125} color= {props.iconColor == undefined ? 'black' : props.iconColor}/>
      <Text style={[Style.ButtonText, props.textStyle]}> {props.btnTitle} </Text>
    </TouchableOpacity>
  )
}

export const MultipleButton = (props : any) => {
  
  const dispatch = useAppDispatch();

  let Content : any[] = []

  for(let i=0; i<=props.size - 1; i++){
    Content.push(
      <TouchableOpacity style={[Style.MyButton,props.style]} 
        activeOpacity={0.8} 
        key={props.keyValue + i}
        onPress={() => {dispatch(props.setRedux(props.changeValues[i]))}}>
        <Icon 
          name={props.iconName[i]} 
          size={20} 
          color="#fff"
          />
        <Text style={[Style.MultipleButtonText, props.textStyle]}>{props.title[i]}</Text>
      </TouchableOpacity>
    )
  }

  return(
    <View style={{justifyContent:'center', flexDirection: props.direction || 'row'}}>
      {Content}
    </View>
  )
}
