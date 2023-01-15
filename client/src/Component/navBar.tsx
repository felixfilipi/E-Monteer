import { Avatar, Drawer } from 'react-native-paper';
import {Text, View, Image, TouchableWithoutFeedback, Alert, TouchableHighlight, TouchableOpacity } from 'react-native';
import React from 'react';
import Style from '../Styles/ComponentStyle';
import { RootStackParamList } from '../Pages/RootStackParamList';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { setDrawer } from '../../redux/component/drawer';
import { useAppDispatch, useAppSelector } from '../../redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setNavbar } from '../../redux/component/navbar';
import { CustomText } from './CustomText';
import { Confirmation } from './Confirmation';

type NavigationType = StackNavigationProp<RootStackParamList, 'BottomNav'>

export const BottomNav = (props : any) => {

  const dispatch = useAppDispatch();
  const navbarState = useAppSelector(state => state.navbar);

  const navigation = useNavigation<NavigationType>();
  
  let color:string, fontColor: string, Content:any[] = [], title:string[] = props.title;
  
  const navbarPressed = (i : number) => {
    navigation.navigate(props.navigate[i], {prevPage : false});
    dispatch(setNavbar(i));
  }
   
  for(let i=0; i<= props.size - 1; i++){

    if(i == navbarState){
      color = '#cca405';
      fontColor = 'white';
    }else{
      color = '#b99504';
      fontColor = '#675302';
    };

    Content.push(
      <TouchableHighlight key={i}
        underlayColor={'#cca405'}
        style={[Style.bottomNavBtn, {backgroundColor: color}]}
        onPress={() => navbarPressed(i)}>
        <>
          <Icon name={props.icon[i]} size={25} color={fontColor}/>
          <Text style={[Style.bottomNavText,{color: fontColor}]}>{title[i]}</Text>
        </>
      </TouchableHighlight>
    )
  }

  return(
    <View style={Style.bottomNavLayout}>
      <View style={{flexDirection:'row'}}>
        {Content}
      </View>
    </View>
  )
}

type EditProfileType = StackNavigationProp<RootStackParamList, 'EditProfile'>

const DrawerComponent = (props: any) => {
  
  const drawerState = useAppSelector(state => state.drawer)
  const dispatch = useAppDispatch();

  const [drawerActive, setDrawerActive] = React.useState<string>();
  const navigation = useNavigation<EditProfileType>();


  React.useEffect(() => {
    if(drawerState == true && drawerActive == 'edit'){
      navigation.navigate('EditProfile');
      dispatch(setDrawer(false));
    }else if(drawerState == true && drawerActive == 'out'){
      props.setActiveModal(true);
      dispatch(setDrawer(false));
    }
  },[drawerActive])
  
  return(
    <>
      <Drawer.Section style={Style.drawerContainer}>
      <Drawer.Item
        label="Ganti Profil"
        active={drawerActive === 'edit'}
        onPress={() => setDrawerActive('edit')}
      />
      <Drawer.Item
        label="Keluar"
        active={drawerActive === 'out'}
        onPress={() => setDrawerActive('out')}
      />
    </Drawer.Section>
    <View 
      onStartShouldSetResponder={() => true}
      onResponderGrant={() => {dispatch(setDrawer(false))}}
      style={Style.drawerMask}/>
    </>
  )
}

export const TopBar = (props : any) => {

  const drawerState = useAppSelector(state => state.drawer)
  const dispatch = useAppDispatch();
  const [logoutModal, setLogoutModal] = React.useState<boolean>(false);

  const navigation = useNavigation<EditProfileType>();
  const logout = () => {
    setLogoutModal(false);
    navigation.navigate('Login');
  }
  return(
    <>
    <View style={Style.topBar}>
      <View style={Style.topItem}>
      <Image 
            source={require("../../assets/images/blogo.png")}
            style={Style.logo}/>
      </View>
      <View style={Style.topItem}>
      <TouchableWithoutFeedback onPress={() => drawerState == false ? dispatch(setDrawer(true)) : dispatch(setDrawer(false))}>
      <Avatar.Image 
        size={60}
        style={Style.avatar}
        source={{uri: props.photoUrl}}/>
      </TouchableWithoutFeedback>
      </View>
    </View>
      <View style={{marginBottom:82}}/>
        {drawerState == true ? <DrawerComponent setActiveModal={setLogoutModal}/> : null }
    <Confirmation
      visibleModal = {logoutModal}
      setVisibleModal = {setLogoutModal}
      title="Apakah Anda Yakin Ingin Keluar?"
      onTrue={logout}
      />
    </>
  )
}

export const ChatBar = (props : any) => {
  return(
    <>
    <View style={Style.topBar}>
      <View style={Style.chatBarLayout}>
        <View style={{flex:3, flexDirection:'row'}}>
          <TouchableWithoutFeedback>
            <View style={Style.backBtn}>
              <Icon 
                size={30}
                name={'arrow-left'}
                color={'white'}
                style={Style.avatar}/>
            </View>
          </TouchableWithoutFeedback>
          
          <TouchableWithoutFeedback>
            <Avatar.Image 
              size={45}
              style={{marginVertical:10}}
              source={{uri: props.photoUrl}}/>
          </TouchableWithoutFeedback>
          <CustomText title={props.title} color={"white"} size={20}
              style={{textAlignVertical:'center', marginVertical:10, marginLeft:15}}/>
        </View>
      </View>
      <View style={{flex:1, flexDirection:'row'}}>
        <TouchableWithoutFeedback>
          <View style={Style.backBtn}>
            <Icon 
              size={30}
              name={'phone'}
              color={'white'}
              style={Style.avatar}/>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
      <View style={{marginBottom:82}}/>
    </>
  )
}

