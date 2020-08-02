import React from 'react';
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {home} from '../Welcome/home'

const Tab = createBottomTabNavigator();

export default function homeScreen({navigation}) {
  return(
    <Tab.Navigator
    >
      <Tab.Screen
        name = "home"
        component = {home}
        options={{tabBarLabel:'Home'}}
      />
      <Tab.Screen
        name = "SOS"
        component = {home}
        options = {{tabBarLabel:'SOS'}}
      />
      <Tab.Screen
        name = "profile"
        component = {home}
        options = {{tabBarLabel:'Profile'}}
      />
    </Tab.Navigator>
  );
}
