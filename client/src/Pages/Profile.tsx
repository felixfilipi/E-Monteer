import { View, TextInput, Button, KeyboardAvoidingView, 
  ToastAndroid, Platform, Alert, Text, ScrollView} from "react-native"
import { Avatar } from 'react-native-paper';
import Icon from "react-native-vector-icons/Entypo";
import Style from "../Styles/profileStyle"
import React from "react";
import { useComponentDidMount } from '../Component/customHooks';

export function EditProfile(){

  let placeholder_list:string[], icon_list:string[], 
  autocomplete_list:any[], inputType:any[], maxLength:number[],
  Content:any[] = [], fields:any[], title: string[];
  
  placeholder_list = ['Input your Name here','Input your Email here',
    'Input your Phone number here', 'Input your Address here']
  icon_list = ['user','mail','phone','location']
  autocomplete_list = ['name','email','tel','postal-address']
  inputType = ['default', 'default', 'phone-pad', 'default']
  maxLength = [30,40,13,100]
  title = ['Name', 'Email', 'Phone','Address']

  const [SName, setName] = React.useState<string>();
  const [SEmail, setEmail] = React.useState<string>();
  const [SPhone, setPhone] = React.useState<number>(0);
  const [SAddress, setAddress] = React.useState<string>();
  const [SPassword, setPassword] = React.useState<string>();
  const [SPasswordValid, setPasswordValid] = React.useState<string>();
  const [SButton, setButton] = React.useState<boolean>(false);

  const isComponentMounted = useComponentDidMount();
  
  React.useEffect(() => {
    if(isComponentMounted){
      setButton(SName !== '' && SEmail !== '' && SPhone !== 0 && SAddress !== '' && SPassword !== '' && SPasswordValid !== '')
    }
  },[SName, SEmail, SPhone, SAddress, SPassword, SPasswordValid])

  fields = [setName, setEmail, setPhone, setAddress]

  for(let i = 0; i <= icon_list.length - 1; i++){
    Content.push(
      <>
      <View style={Style.flexHorizontal} key={"View" + i}>
        <Icon 
          name={icon_list[i]} 
          size={30} 
          style={Style.icon}
          color="#fff"
          key={"Icon" + i+7}/>
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
          key={"Input" + i+7}/>
      </>
    )
  };

  const checkInput = () => {
    if(SPassword?.length! < 8){
      Platform.OS === 'android' ? ToastAndroid.show('Password Need at Least 8 Characters!!', ToastAndroid.SHORT) : Alert.alert("Password Need at Least 8 Characters!!")
    }else if(SButton == true && SPassword == SPasswordValid){
      Platform.OS === 'android' ? ToastAndroid.show('Profile Updated Successfully!!', ToastAndroid.SHORT) : Alert.alert("Profile Updated Successfully!!")
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
                  <View style={Style.flexHorizontal}>
                      <Icon 
                          name={"key"} 
                          size={30} 
                          style={Style.icon}
                          color="#fff"/>
                      <Text style={Style.title}> Password </Text>
                  </View>

                      <TextInput 
                          autoComplete={"password"}
                          maxLength={20}
                          autoCapitalize={'none'}
                          placeholder={"Input your Password here"}
                          placeholderTextColor="#fff"
                          secureTextEntry={true}
                          onChangeText={(value) => setPassword(value)}
                          style={Style.textInp}
                          key={"Input4"}/>
                  
                  <View style={Style.flexHorizontal}>
                      <Icon 
                          name={"shield"} 
                          size={30} 
                          style={Style.icon}
                          color="#fff"/>
                      <Text style={Style.title}> Confirm Password </Text>
                  </View>
                      <TextInput 
                          autoComplete={"password-new"}
                          maxLength={50}
                          placeholder={"Input your password again"}
                          placeholderTextColor="#fff"
                          onChangeText={(value) => setPasswordValid(value)}
                          autoCapitalize={"none"}
                          secureTextEntry={true}
                          style={Style.textInp}
                          key={"input5"}/>
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
