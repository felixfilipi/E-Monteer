import { Text, View } from 'react-native';
import Style from '../Styles/componentStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

export const CustomText = (props: any) => {
  return(
    <Text selectable={props.selectable}
      style={[Style.descText, 
        {fontSize: props.size},
        {color: props.color},
        props.style]}>{props.title}</Text>
  )
}

export const ImportantText = (props: any) => {
  return(
    <View style={{flexDirection:'row', marginLeft:10}}>
      <Icon name="warning" size={20} color='#c70003'/>
      <Text style={[Style.importantText, props.style]}> {props.title} </Text>
    </View>
  )
}
