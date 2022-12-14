// @ts-nocheck
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './redux';
import { RootStackParamList } from './src/Pages/RootStackParamList';
import { DefaultTheme } from 'react-native-paper';
import { Register, Login} from './src/Pages/Auth';
import { RegisterGarage } from './src/Pages/Garage/RegisterGarage';
import EditProfile from './src/Pages/Profile';
import FindGarage from './src/Pages/Customer/FindGarage';
import History from './src/Pages/History';
import GarageDetail from './src/Pages/Customer/GarageDetail';
import HistoryDetail from './src/Pages/HistoryDetail';
import {BottomNav} from './src/Component/navBar';
import ChatHistory from './src/Pages/ChatHistory';
import Chat from './src/Pages/Chat';
import MechanicView from './src/Pages/Garage/MechanicView';
import { RegisterOwner } from './src/Pages/Auth';
import MechanicEditProfile from './src/Pages/Garage/MechanicEdit';
import {ChatHistoryMechanic} from './src/Pages/ChatHistory';
import MechanicMain from './src/Pages/Mechanic/MechanicMain';
import GarageMain from './src/Pages/Garage/GarageMain';
import CustomerMain from './src/Pages/Customer/CustomerMain';
import OrderGarage from './src/Pages/Customer/OrderGarage';
import MechanicOrder from './src/Pages/Mechanic/MechanicOrder';
import CostList from './src/Pages/Garage/CostList';
import GarageOrder from './src/Pages/Garage/GarageOrder';

const Stack = createStackNavigator<RootStackParamList>();

const CustTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1C2028',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.parentContainer}>
        <StatusBar style="light" />
          <NavigationContainer theme={CustTheme}>
            <Stack.Navigator>
              <Stack.Screen
                name="Register" component={Register} options={{ headerShown: false }}/>
              <Stack.Screen
                name="Login" component={Login} options={{ headerShown: false }}/>
              <Stack.Screen
                name="CustomerMain" component={CustomerMain} options={{headerShown: false }}/>
              <Stack.Screen
                name="EditProfile" component={EditProfile} 
                options={{title:'Ganti Profile', headerTintColor:'white'}}/>
              <Stack.Screen
                name="OrderGarage" component={OrderGarage} 
                options={{title:'Pesan Mechanic', headerTintColor:'white'}}/>
              <Stack.Screen
                name="FindGarage" component={FindGarage}
                options={{headerShown: false}}/>
              <Stack.Screen
                name="History" component={History}
                options={{headerShown: false}}/>
              <Stack.Screen
                name="GarageDetail" component={GarageDetail}
                options={{title:'Detail Bengkel', headerTintColor:'white'}}/>
              <Stack.Screen
                name="HistoryDetail" component={HistoryDetail}
                options={{title:'Detail Riwayat', headerTintColor:'white'}}/>
              <Stack.Screen
                name="BottomNav" component={BottomNav} 
                options={{headerShown: false}}/>
              <Stack.Screen
                name="Chat" component={Chat}
                options={{headerShown: false}}/>
              <Stack.Screen
                name="ChatHistory" component={ChatHistory}
                options={{headerShown: false}}/>
              <Stack.Screen
                name='RegisterGarage' component={RegisterGarage}
                options={{headerShown: false}}/>
              <Stack.Screen
                name="MechanicMain" component={MechanicMain}
                options={{headerShown: false}}/>
              <Stack.Screen
                name="ChatHistoryMechanic" component={ChatHistoryMechanic}
                options={{headerShown:false}}/>
              <Stack.Screen
                name='MechanicOrder' component={MechanicOrder}
                options={{headerShown: false}}/>
              <Stack.Screen
                name='GarageMain' component={GarageMain}
                options={{headerShown: false}}/>
              <Stack.Screen
                name='RegisterOwner' component={RegisterOwner}
                options={{headerShown: false}}/>
              <Stack.Screen
                name="CostList" component={CostList}
                options={{headerShown: false}}/>
              <Stack.Screen
                name='MechanicView' component={MechanicView}
                options={{headerShown: false}}/>
              <Stack.Screen
                name='MechanicEdit' component={MechanicEditProfile}
                options={{headerShown: false}}/>
              <Stack.Screen
                name='GarageOrder' component={GarageOrder}
                options={{headerShown: false}}/>
            </Stack.Navigator>
          </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
    
  parentContainer: {
    flex: 1,
    backgroundColor: '#1C2028',
    paddingTop: Platform.OS === 'android' ? 28 : 0
  },
});
