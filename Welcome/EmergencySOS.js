import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export function EmergencySOS ({navigation}){
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
