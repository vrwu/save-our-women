import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import api from '../baseURL';
import GetLocation from 'react-native-get-location';

export function EmergencySOS ({navigation}){
  const [latitude, setLat] = useState("");
  const [longitude, setLng] = useState("");

  function _requestLocation(){


    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 150000,
    })
        .then(location => {
            setLat(location.latitude)
            setLng(location.longitude)
            console.log(location.latitude)
            console.log(location.longitude)
        })
        .catch(ex => {
            const { code, message } = ex;
            console.warn(code, message);
            if (code === 'CANCELLED') {
                Alert.alert('Location cancelled by user or by another request');
            }
            if (code === 'UNAVAILABLE') {
                Alert.alert('Location service is disabled or unavailable');
            }
            if (code === 'TIMEOUT') {
                Alert.alert('Location request timed out');
            }
            if (code === 'UNAUTHORIZED') {
                Alert.alert('Authorization denied');
            }
            setLat(null)
            setLng(null)
        });
        handleSubmit()
  }

  function handleSubmit () {
     let baseURL: string = '/signup';
     let payload : object = {
       "name": name,
       "email": email,
       "num": num,
       "pass": pass
     };

     api.post(baseURL, payload)
       .then(function (response) {
         console.log(name);
         console.log(email);
         console.log(num);
         console.log(pass);


       })
       .catch(function (error) {
         console.log(error);
       });
   }

  return (

    <View style = {styles.container}>
      <StatusBar style="auto" />
      <Text
        style={styles.details}>
        Press this button to send a SOS
        {'\n'}
        message to your emergency contacts,
        {'\n'}
        including your current location
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.SOS}>SOS</Text>
        </TouchableOpacity>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom:170
  },


  SOS: {
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: 118,
    justifyContent: 'center',
    color:'#FFFFFF',
    fontSize: 100,
    position: 'relative',

  },


  button: {
    width: 350,
    height: 350,
    backgroundColor: '#9e6590',
    borderRadius:50,
    marginVertical:150,
    alignSelf:'center',
  },


    details: {
      textAlign: 'center',
      justifyContent: 'center',
      color: 'black',
      fontSize: 20,
      alignSelf:'center',
      top: 600

    },

});
