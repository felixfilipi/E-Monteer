import { BottomNavigation, Avatar, Drawer } from 'react-native-paper';
import {Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import Style from '../Styles/componentStyle';
import { RootStackParamList } from '../Pages/RootStackParamList';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { setDrawer } from '../../redux/component/drawer';
import { useAppDispatch, useAppSelector } from '../../redux';

const HomeRoute = () => <Text>Home</Text>
const SearchRoute = () => <Text>Search</Text>
const HistoryRoute = () => <Text>History</Text>
const ExploreRoute = () => <Text>Explore</Text>

export const BottomNav = () => {
    const [index, setIndex] = React.useState<number>(0);
    const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home-circle' },
    { key: 'search', title: 'Search', icon: 'map-search-outline' },
    { key: 'history', title: 'History', icon: 'history' },
    { key: 'explore', title: 'Explore', icon: 'book' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    search: SearchRoute,
    history: HistoryRoute,
    explore: ExploreRoute,
  });

  return(
        <BottomNavigation
        labeled={true}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: '#b99504' }}
        activeColor='#fff'
        style={{position: 'absolute', bottom:0, left:0, right:0}}
        shifting={false}
      />
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
    }
  },[drawerActive])
  
  return(
    <>
      <Drawer.Section style={Style.drawerContainer}>
      <Drawer.Item
        label="Edit Profile"
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
