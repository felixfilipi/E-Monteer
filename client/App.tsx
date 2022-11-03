// @ts-nocheck
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Platform } from 'react-native';
import { Register, Login} from './src/Pages/Auth';
import { RootStackParamList } from './src/Pages/RootStackParamList';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Pages/Home'
import { DefaultTheme } from 'react-native-paper';

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
              </Stack.Navigator>
            </NavigationContainer>
    </View>
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
