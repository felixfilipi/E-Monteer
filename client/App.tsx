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
import EditProfile from './src/Pages/Profile';
import Home from './src/Pages/Home';
import Order from './src/Pages/Order';
import Waiting from './src/Pages/Waiting';
import Find from './src/Pages/Find';
import History from './src/Pages/History';
import Garage from './src/Pages/Garage';
import HistoryDetail from './src/Pages/HistoryDetail';
import {BottomNav} from './src/Component/navBar';

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
                name="Home" component={Home} options={{headerShown: false }}/>
              <Stack.Screen
                name="Edit" component={EditProfile} 
                options={{title:'Ganti Profile', headerTintColor:'white'}}/>
              <Stack.Screen
                name="Order" component={Order} 
                options={{title:'Pesan Mechanic', headerTintColor:'white'}}/>
              <Stack.Screen
                name="Waiting" component={Waiting} 
                options={{headerShown: false}}/>
              <Stack.Screen
                name="Find" component={Find}
                options={{headerShown: false}}/>
              <Stack.Screen
                name="History" component={History}
                options={{headerShown: false}}/>
              <Stack.Screen
                name="Garage" component={Garage}
                options={{title:'Detail Bengkel', headerTintColor:'white'}}/>
              <Stack.Screen
                name="HistoryDetail" component={HistoryDetail}
                options={{title:'Detail Riwayat', headerTintColor:'white'}}/>
              <Stack.Screen
                name="BottomNav" component={BottomNav} 
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
