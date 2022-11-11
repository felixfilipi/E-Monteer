import { BottomNavigation, Avatar, Drawer } from 'react-native-paper';
import {Text, View, Image, TouchableWithoutFeedback, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import Style from '../Styles/componentStyle';
import { RootStackParamList } from '../Pages/RootStackParamList';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { setDrawer } from '../../redux/component/drawer';
import { useAppDispatch, useAppSelector } from '../../redux';


export const bottomBar = () => {
    const [index, setIndex] = React.useState<number>(0);

  return(
    <View style={{ backgroundColor: '#b99504' }}>
      <TouchableOpacity style={{position: 'absolute', bottom:0, left:0, right:0}}>
        <Text> Cok </Text>
      </TouchableOpacity>
    </View>
  )
}

