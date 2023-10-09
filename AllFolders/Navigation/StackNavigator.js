import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../Screens/LoginScreen'
import RegisterScreen from '../Screens/RegisterScreen'
import HomeScreen from '../Screens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ProductInfoScreen from '../Screens/ProductInfoScreen'
import AddAddressScrenn from '../Screens/AddAddressScrenn'
import AddingNewAddressScreen from '../Screens/AddingNewAddressScreen'
import CartScreen from '../Screens/CartScreen'
import MenuScreen from '../Screens/MenuScreen'
import ProfileScreen from '../Screens/ProfileScreen'
import ProceedingScreen from '../Screens/ProceedingScreen'
import OrderScreen from '../Screens/OrderScreen'


const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()
function BottomtabsFun() {
  return(
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          // tabBarLableStyle: {color: '#008E97'},
          headerShown: false,
          tabBarIcon: ({focused}) => 
            focused ? 
            (<MaterialCommunityIcons name="home-outline" size={24} color="#008E97" />) : 
              (<MaterialCommunityIcons name="home-outline" size={24} color="black" />)
        }}
      />
      <BottomTabs.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          // tabBarLableStyle: {color: '#008E97'},
          tabBarIcon: ({focused}) => 
            focused ? 
            (<Ionicons name="person-outline" size={24} color="#008E97"/>) : 
              (<Ionicons name="person-outline" size={24} color="black" />)
        }}
      />
      <BottomTabs.Screen
        name='Cart'
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          // tabBarLableStyle: {color: '#008E97'},
          headerShown: false,
          tabBarIcon: ({focused}) => 
            focused ? 
            (<Ionicons name="cart-outline" size={24} color="#008E97" />) : 
              (<Ionicons name="cart-outline" size={24} color="black" />)
        }}
      />
      <BottomTabs.Screen
        name='Menu'
        component={MenuScreen}
        options={{
          tabBarLabel: 'Menu',
          // tabBarLableStyle: {color: '#008E97'},
          headerShown: false,
          tabBarIcon: ({focused}) => 
            focused ? 
            (<Ionicons name="menu-outline" size={24} color="#008E97" />) : 
              (<Ionicons name="menu-outline" size={24} color="black" />)
        }}
      />
    </BottomTabs.Navigator>
  )
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Signup' component={RegisterScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Main' component={BottomtabsFun} options={{headerShown: false}}/>
            <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Info' component={ProductInfoScreen} options={{headerShown: false}}/>
            <Stack.Screen name='AddAddress' component={AddAddressScrenn} options={{headerShown: false}}/>
            <Stack.Screen name='NewAddress' component={AddingNewAddressScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Proceed' component={ProceedingScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Order' component={OrderScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator