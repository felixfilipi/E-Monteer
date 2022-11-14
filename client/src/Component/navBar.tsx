import { Avatar, Drawer } from 'react-native-paper';
import {Text, View, Image, TouchableWithoutFeedback, Alert, TouchableHighlight, TouchableOpacity } from 'react-native';
import React from 'react';
import Style from '../Styles/componentStyle';
import { RootStackParamList } from '../Pages/RootStackParamList';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { setDrawer } from '../../redux/component/drawer';
import { useAppDispatch, useAppSelector } from '../../redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setNavbar } from '../../redux/component/navbar';

type NavigationType = StackNavigationProp<RootStackParamList, 'BottomNav'>

export const BottomNav = () => {

  const dispatch = useAppDispatch();
  const navbarState = useAppSelector(state => state.navbar);

  const navigation = useNavigation<NavigationType>();
  
  let color:string, fontColor: string,
  title:string[], icon:string[], navigate:any[], 
  Content:any[] = [];
  
  title = ['Utama','Cari','Riwayat','Telusuri'];
  icon = ['home-circle','map-search-outline','history','book'];
  navigate = ['Home','Find','History','Find'];

  const navbarPressed = (i : number) => {
    navigation.navigate(navigate[i], {prevPage : false});
    dispatch(setNavbar(i));
  }
   
  for(let i=0; i<=title.length - 1; i++){

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
          <Icon name={icon[i]} size={25} color={fontColor}/>
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

type EditType = StackNavigationProp<RootStackParamList, 'Edit'>

const DrawerComponent = () => {
  
  const drawerState = useAppSelector(state => state.drawer)
  const dispatch = useAppDispatch();

  const [drawerActive, setDrawerActive] = React.useState<string>();
  const navigation = useNavigation<EditType>();

  React.useEffect(() => {
    if(drawerState == true && drawerActive == 'edit'){
      navigation.navigate('Edit');
      dispatch(setDrawer(false));
    }else if(drawerState == true && drawerActive == 'out'){
      Alert.alert("Keluar", "Apakah anda yakin ingin keluar?", 
        [{text : "Batal", style: "cancel"}, {text: "Ya"}])
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
    </>
  )
}

export const TopBar = () => {

  const drawerState = useAppSelector(state => state.drawer)
  const dispatch = useAppDispatch();

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
        source={require('../../assets/images/newUser.png')}/>
      </TouchableWithoutFeedback>
      </View>
    </View>
    <View style={{marginBottom:82}}/>
      {drawerState == true ? <DrawerComponent/> : null }
    </>
  )
}
