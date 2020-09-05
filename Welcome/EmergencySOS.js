import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import api from '../baseURL';
import * as Location from 'expo-location';


export function EmergencySOS ({navigation}){
  const [latitude, setLat] = useState(null);
  const [longitude, setLng] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({})
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
        setLat(latitude);
        setLng(longitude);
        console.log(latitude);
        console.log(longitude);
      })();
    });

  function handleSubmit () {
     let baseURL: string = '/send_emergency_sos';
     let payload : object = {
       "latitude": latitude,
       "longitude": longitude
     };

     api.post(baseURL, payload)
       .then(function (response) {
         console.log("payload: ");
         console.log(payload);

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSubmit()
          }}
        >
        </TouchableOpacity>
        <Image style={styles.icon}
          source={require('../src/icons/alarmSOS.png')} />
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom:170
  },


  icon: {
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: 250,
    justifyContent: 'center',
    color:'#FFFFFF',
    position: 'absolute',
    height: 300,
    width: 300

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
