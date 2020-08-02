import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export function EmergencySOS ({navigation}){
  return (

    <View style = {styles.container}>
      <StatusBar style="auto" />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.SOS}> SOS </Text>
          //contact emergency
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
    marginVertical: 100,
    color:'#FFFFFF',
    fontSize: 100,
    position: 'relative',

  },

  button: {
    width: 500,
    height: 50,
    backgroundColor: '#9e6590',
    borderRadius:25,
    marginVertical:75,
    alignSelf:'center'
  },


});
