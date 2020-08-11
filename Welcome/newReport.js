import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackActions } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView,
  Keyboard, Alert, TextInput, Image
} from 'react-native';

import homeScreen from '../Welcome/homescreen'
import {newsfeed} from '../Welcome/newsfeed'

export function newReport({navigation}) {
  return(
    <View style = {styles.background}>

      <Text style = {styles.mainText}>
        Make a Report
      </Text>

      <Text style = {styles.smallText}>
        Publish an online report about a potential threat or incident. Provide
        a description of the perpetuator or upload an image or video of the
        incident.
        If an emergency situation has occurred, contact authorities immediately
        for medical help.
      </Text>
      <View style = {styles.container}>

        <Text style = {styles.secondHeader}>
          Incident Report
        </Text>
        <TextInput style = {styles.infoBox}
          placeholder="   Subject"
        >
        </TextInput>
        <TextInput style = {styles.moreInfo}
          placeholder="   Description"
        >
        </TextInput>

        <TouchableOpacity style = {styles.submitButton}>
          <Text style = {styles.buttonText}> Submit
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style = {styles.backButton}
        onPress={
          () => navigation.dispatch(StackActions.pop(1))}
      >
        <Text style = {styles.backArrow}>
          ←
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor:'rgba(158, 101, 144, 1)',
    flex:1
  },

  backButton: {
    bottom: 625,
    left: 25
  },

  backArrow: {
    fontSize: 25,
    color: 'rgba(0, 0, 0, 0.3)',
    position: 'relative'
  },

  mainText: {
    fontSize: 30,
    fontWeight: "bold",
    color: 'white',
    top: 80,
    alignSelf:'center',
    position: 'absolute'
  },

  smallText: {
    fontSize: 15,
    top: 150,
    position: 'absolute',
    alignSelf: 'center',
    color:'rgba(255, 255, 255, 0.7)',
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent:'center'

  },

  container: {
    backgroundColor: 'white',
    width: 378,
    height: 700,
    alignSelf:'center',
    top:300,
    borderRadius: 25
  },

  secondHeader: {
    color:'rgba(158, 101, 144, 1)',
    fontSize: 25,
    fontWeight: "bold",
    left: 25,
    top: 10,
  },

  infoBox: {
    backgroundColor: 'rgba(158, 101, 144, 0.2)',
    height: 50,
    width: 275,
    alignSelf: 'center',
    marginVertical: 25,
    borderRadius: 25
  },

  moreInfo: {
    backgroundColor:'rgba(158, 101, 144, 0.2)',
    height: 50,
    width: 275,
    alignSelf:'center',
    borderRadius: 25
  },

  submitButton: {
    backgroundColor: 'rgba(158, 101, 144, 0.7)',
    height: 50,
    width: 275,
    alignSelf: 'center',
    marginVertical: 25,
    borderRadius: 25
  },

  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 15
  }
})
