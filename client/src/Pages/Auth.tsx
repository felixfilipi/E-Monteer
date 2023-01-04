import { Image, View, TextInput, Button, KeyboardAvoidingView, 
  ToastAndroid, Platform, Alert, Text, ScrollView} from "react-native"
import Icon from "react-native-vector-icons/Entypo";
import Style from "../Styles/authStyle"
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParamList"
import { useComponentDidMount } from '../Component/customHooks';
import { useAppDispatch, useAppSelector } from '../../redux';
import { setRole } from "../../redux/component/role";

type RegisterType = StackNavigationProp<RootStackParamList, 'Register'>
type LoginType = StackNavigationProp<RootStackParamList, 'Login'>

export function Register(){

  const dispatch = useAppDispatch();
  const navigation = useNavigation<RegisterType>();
  dispatch(setRole('Mechanic'));

  let placeholder_list:string[], icon_list:string[], 
  autocomplete_list:any[], inputType:any[], maxLength:number[],
  Content:any[] = [], fields:any[];
  
  placeholder_list = ['Input Your Name Here','Input Your Email Here',
    'Input Your Phone Number Here', 'Input Your Address Here', 
    'Input Your Password Here', 'Input Your Password Again']
  icon_list = ['user','mail','phone','location', 'key', 'shield']
  autocomplete_list = ['name','email','tel','postal-address', 
    'password', 'password-new']
  inputType = ['default', 'default', 'phone-pad', 'default', 'default', 'default']
  maxLength = [30, 40, 13, 100, 20, 20]

  const [SName, setName] = React.useState<string>('');
  const [SEmail, setEmail] = React.useState<string>('');
  const [SPhone, setPhone] = React.useState<number>(0);
  const [SAddress, setAddress] = React.useState<string>('');
  const [SPassword, setPassword] = React.useState<string>('');
  const [SPasswordValid, setPasswordValid] = React.useState<string>('');
  const [SButton, setButton] = React.useState<boolean>(false);
  
  const role = useAppSelector(state => state.role);
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
        <View style={Style.flexHorizontal} key={"View" + i}>
          <Icon 
            name={icon_list[i]} 
            size={30} 
            style={Style.icon}
            color="#fff"
            key={"Icon" + i}/>
          <TextInput 
            autoComplete={autocomplete_list[i]}
            maxLength={maxLength[i]}
            placeholder={placeholder_list[i]}
            placeholderTextColor="#fff"
            autoCapitalize='none'
            secureTextEntry={true}
            keyboardType={inputType[i]}
            onChangeText={(value) => fields[i](value)}
            style={Style.textInp}
            key={"Input" + i}/>
          </View>
      )
    }else{
      Content.push(
        <View style={Style.flexHorizontal} key={"View" + i}>
          <Icon 
            name={icon_list[i]} 
            size={30} 
            style={Style.icon}
            color="#fff"
            key={"Icon" + i}/>
          <TextInput 
            autoComplete={autocomplete_list[i]}
            maxLength={maxLength[i]}
            placeholder={placeholder_list[i]}
            placeholderTextColor="#fff"
            keyboardType={inputType[i]}
            onChangeText={(value) => fields[i](value)}
            style={Style.textInp}
            key={"Input" + i}/>
          </View>
      )
    }
  };

  const checkInput = () => {
    if(SPassword?.length! < 8){
      Platform.OS === 'android' ? ToastAndroid.show('Password Need at Least 8 Characters!!', ToastAndroid.SHORT) : Alert.alert("Password Need at Least 8 Characters!!")
    }else if(SButton == true && SPassword == SPasswordValid){
      if(role === 'Customer'){
        navigation.navigate('Home');
      }else if(role === 'Mechanic'){
        navigation.navigate('MechanicMain');
      }else if(role === 'Owner'){
        navigation.navigate('MechanicMain');
      }
    }else if(SButton == true && SPassword != SPasswordValid){
      Platform.OS === 'android' ? ToastAndroid.show('Password Did Not Match!!', ToastAndroid.SHORT) : Alert.alert("Password did Not Match!!")
    }else{
      Platform.OS === 'android' ? ToastAndroid.show('Please Fill All Required Field!!', ToastAndroid.SHORT) : Alert.alert("Please Fill All Required Field!!")
    }
  };

  return(
      <ScrollView>
        <View style={{ alignItems: 'center'}}>
          <KeyboardAvoidingView>
              <Image 
                  source={require("../../assets/images/blogo.png")}
                  style={Style.logo}/>
              <View style={Style.flexVertical}>
                  {Content}
              </View>
              <View
                  style={Style.button}>
                  <Button 
                      title="Register Now"
                      color="#b99504"
                      onPress={() => checkInput()}/>
              </View>
              <Text style={Style.signText}> Already Have Account?? 
                <Text 
                    style={{color:"#b99504"}}
                    onPress={()=>(navigation.navigate('Login'))}> Sign In </Text>
              </Text>
              <Text style={[Style.signText, {marginTop:8}]}> Want to Register Your Garage?? 
                <Text 
                    style={{color:"#b99504"}}
                    onPress={()=>(navigation.navigate('RegisterGarage'))}> Join </Text>
              </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
};

export function Login(){

  const navigation = useNavigation<LoginType>();
  const [SEmail, setEmail] = React.useState<string>('');
  const [SPassword, setPassword] = React.useState<string>('');
  const [SButton, setButton] = React.useState<boolean>(false);

  const isComponentMounted = useComponentDidMount();
  
  React.useEffect(() => {
    if(isComponentMounted){
      setButton(SEmail !== '' && SPassword !== '')
    }
  },[SEmail, SPassword])

  const checkInput = () => {
    if(SButton == true){
        navigation.navigate('MechanicMain');
    }else{
        Platform.OS === 'android' ? ToastAndroid.show('Please Fill All Required Field!!', ToastAndroid.SHORT) : Alert.alert("Please Fill All Required Field!!")
    }      
  };

  return(
    <ScrollView>
      <View style={{ alignItems: 'center' }}>
        <KeyboardAvoidingView>
            <Image 
                source={require("../../assets/images/mehanic.png")}
                style={[Style.logoVector, {marginBottom: -80}]}/>
            <Image 
                source={require("../../assets/images/blogo.png")}
                style={[Style.logo, {marginBottom: -70}]}/>
            <View style={Style.flexVertical}>
                <View style={Style.flexHorizontal}>
                    <Icon 
                        name={"mail"} 
                        size={40} 
                        style={Style.icon}
                        color="#fff"/>
                    <TextInput 
                        autoComplete={"email"}
                        maxLength={40}
                        autoCapitalize={'none'}
                        placeholder={"Input your Email here"}
                        placeholderTextColor="#fff"
                        onChangeText={(value) => setEmail(value)}
                        style={Style.textInp}
                        key={"InputEmail"}/>
                    </View>
                
                <View style={Style.flexHorizontal}>
                    <Icon 
                        name={"shield"} 
                        size={30} 
                        style={Style.icon}
                        color="#fff"/>
                    <TextInput 
                        autoComplete={"password"}
                        maxLength={20}
                        placeholder={"Input your password again"}
                        placeholderTextColor="#fff"
                        onChangeText={(value) => setPassword(value)}
                        autoCapitalize={"none"}
                        secureTextEntry={true}
                        style={Style.textInp}
                        key={"inputPassword"}/>
                    </View>
            </View>
            <View
                style={Style.button}>
                <Button 
                    title="Login"
                    color="#b99504"
                    onPress={() => checkInput()}/>
            </View>
            <Text style={Style.signText}> Don't have an account yet? 
              <Text 
                  style={{color:"#b99504"}}
                  onPress={()=>(navigation.navigate('Register'))}> Sign Up </Text>
            </Text>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
    );
};
