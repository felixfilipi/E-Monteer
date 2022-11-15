import { View, TextInput, Button, KeyboardAvoidingView, 
  ToastAndroid, Platform, Alert, Text, 
  ScrollView, LogBox} from "react-native"
import { Avatar } from 'react-native-paper';
import Icon from "react-native-vector-icons/Entypo";
import Style from "../Styles/profileStyle"
import React from "react";
import { useComponentDidMount } from '../Component/customHooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParamList";

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

type EditType = StackNavigationProp<RootStackParamList, 'Edit'>

export default function EditProfile(){

  const navigation = useNavigation<EditType>();

  let placeholder_list:string[], icon_list:string[], 
  autocomplete_list:any[], inputType:any[], maxLength:number[],
  Content:any[] = [], fields:any[], title: string[], key: string[];
  
  placeholder_list = ['Input Your Name Here','Input Your Email Here',
    'Input Your Phone Number Here', 'Input Your Address Here', 
    'Input Your Password Here', 'Input Your Password Again']
  icon_list = ['user','mail','phone','location', 'key', 'shield']
  autocomplete_list = ['name','email','tel','postal-address', 
    'password', 'password-new']
  inputType = ['default', 'default', 'phone-pad', 'default', 'default', 'default']
  maxLength = [30, 40, 13, 100, 20, 20]
  title = ['Name', 'Email', 'Phone', 'Address', 'Password', 'Confirm Password']

  const [SName, setName] = React.useState<string>('');
  const [SEmail, setEmail] = React.useState<string>('');
  const [SPhone, setPhone] = React.useState<number>(0);
  const [SAddress, setAddress] = React.useState<string>('');
  const [SPassword, setPassword] = React.useState<string>('');
  const [SPasswordValid, setPasswordValid] = React.useState<string>('');
  const [SButton, setButton] = React.useState<boolean>(false);

  const isComponentMounted = useComponentDidMount();
  
  React.useEffect(() => {
    if(isComponentMounted){
      setButton(SName !== '' && SEmail !== '' && SPhone !== 0 && SAddress !== '' && SPassword !== '' && SPasswordValid !== '')
    }
  },[SName, SEmail, SPhone, SAddress, SPassword, SPasswordValid])

  fields = [setName, setEmail, setPhone, setAddress, 
    setPassword, setPasswordValid]

  for(let i = 0; i <= icon_list.length - 1; i++){
    if(icon_list[i] == 'key' || icon_list[i] == 'shield'){
      Content.push(
        <>
          <View style={Style.flexHorizontal} key={"View" + i}>
            <Icon 
              name={icon_list[i]} 
              size={30} 
              style={Style.icon}
              color="#fff"
              key={"icon" + i}
              />
            <Text style={Style.title}>{title[i]}</Text>
          </View>
            <TextInput 
              autoComplete={autocomplete_list[i]}
              maxLength={maxLength[i]}
              placeholder={placeholder_list[i]}
              placeholderTextColor="#fff"
              autoCapitalize='none'
              secureTextEntry={true}
              keyboardType={inputType[i]}
              onChangeText={(value) => fields[i](value)}
              key={"input" + i}
              style={Style.textInp}
              />
          </>
      )
    }else{
      Content.push(
        <>
          <View style={Style.flexHorizontal} key={"View" + i}>
            <Icon 
              name={icon_list[i]} 
              size={30} 
              style={Style.icon}
              color="#fff"
              key={"Icon" + i}/>
            <Text style={Style.title}>{title[i]}</Text>
          </View>
            <TextInput 
              autoComplete={autocomplete_list[i]}
              maxLength={maxLength[i]}
              placeholder={placeholder_list[i]}
              placeholderTextColor="#fff"
              keyboardType={inputType[i]}
              onChangeText={(value) => fields[i](value)}
              style={Style.textInp}
              key={"Input" + i}/>
        </>
      )
    }
  };

  const checkInput = () => {
    if(SPassword?.length! < 8){
      Platform.OS === 'android' ? ToastAndroid.show('Password Need at Least 8 Characters!!', ToastAndroid.SHORT) : Alert.alert("Password Need at Least 8 Characters!!")
    }else if(SButton == true && SPassword == SPasswordValid){
      Platform.OS === 'android' ? ToastAndroid.show('Profile Updated Successfully!!', ToastAndroid.SHORT) : Alert.alert("Profile Updated Successfully!!")
      navigation.navigate('Home');
    }else if(SButton == true && SPassword != SPasswordValid){
      Platform.OS === 'android' ? ToastAndroid.show('Password Did Not Match!!', ToastAndroid.SHORT) : Alert.alert("Password did Not Match!!")
    }else{
      Platform.OS === 'android' ? ToastAndroid.show('Please Fill All Required Field!!', ToastAndroid.SHORT) : Alert.alert("Please Fill All Required Field!!")
    }
  };

  return(
      <ScrollView>
        <View style={{ paddingHorizontal:35}}>
          <KeyboardAvoidingView>
          <View style={Style.avatar}>
            <Avatar.Image 
              size={100}
              style={Style.avatar}
              source={require('../../assets/images/newUser.png')}/>
            <Text style={Style.photoLabel}>Change Photo</Text>
          </View>
              <View style={Style.flexVertical}>
                {Content}
              </View>
              
                <View
                  style={Style.button}>
                  <Button 
                      title="Submit"
                      color="#b99504"
                      onPress={() => checkInput()}/>
                </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
};
