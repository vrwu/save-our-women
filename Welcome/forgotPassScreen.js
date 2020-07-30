import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function forgotPassScreen({navigation}){
  return (
    <View>
      <StatusBar style="auto"/>
      <Logo/>
      </View>
    );
}
