import React from 'react';
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {home} from '../Welcome/home'
import {EmergencySOS} from '../Welcome/EmergencySOS'
import {profile} from '../Welcome/profile'
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import HomeIcon from '@material-ui/icons/Home';

const Tab = createBottomTabNavigator();

export default function homeScreen({navigation}) {
  return(
    <Tab.Navigator
    >
      <Tab.Screen
        name = "home"
        component = {home}
        options={{
          tabBarLabel:'Home',
//          tabBarIcon: ({ color }) => (
  //          <Icon name="home" size={30} color={color} />
    //      ),
        }}
      />
      <Tab.Screen
        name = "SOS"
        component = {EmergencySOS}
        options = {{tabBarLabel:'SOS'}}
      />
      <Tab.Screen
        name = "profile"
        component = {profile}
        options = {{tabBarLabel:'Profile'}}
      />
    </Tab.Navigator>
  );
}
