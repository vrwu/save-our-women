import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView,
  Keyboard, Alert, TextInput, Image
 } from 'react-native';

export function home({navigation}) {
  return (
    <View>
      <View style = {styles.container}>
      </View>

      <Text style = {styles.homeText}>
        Home
      </Text>

      <TouchableOpacity
        style = {styles.sendAlert}
        onPress={() =>navigation.navigate('newsfeed')}
      >
        <Text style = {styles.smallText}>
          Recent Reports
        </Text>
        <Image
            style = {styles.newsImg}
            source={require('../src/icons/news.png')}
         />
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.makeReport}
        onPress={() =>navigation.navigate('new report')}

      >
        <Text style = {styles.smallText}>
          Make Report
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.map}
      >
        <Text style = {styles.mapText}>
          Map
        </Text>
      </TouchableOpacity>
    </View>
  )
}
  const styles = StyleSheet.create({
    container: {
      top: -10,
      alignSelf:'center',
      backgroundColor:'rgba(158, 101, 144, 1)',
      height: 230,
      width:420,
      borderRadius: 50
    },

    homeText: {
      fontSize: 20,
      fontWeight: "bold",
      alignSelf: 'center',
      bottom: 125,
      color: 'white'

    },

    newsImg: {
      height: 100,
      width: 100,
      top: 10,
      left: 40
    },

    sendAlert: {
      width: 180,
      height: 180,
      position:'absolute',
      marginLeft: 20,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      marginVertical: 150,
      borderRadius: 25
    },

    smallText:{
      fontWeight: 'bold',
      color: 'grey',
      textAlign: 'right',
      right: 20,
      fontSize: 18,
      top: 150
    },

    mapText:{
      fontWeight: 'bold',
      color: 'grey',
      textAlign: 'right',
      right: 20,
      fontSize: 18,
      top: 200
    },

    makeReport: {
      width: 180,
      height: 180,
      position:'absolute',
      top: 0,
      left: 230,
      marginLeft:-15,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      marginVertical: 150,
      borderRadius: 25
    },

    map: {
      width: 378,
      height: 450,
      position: 'absolute',
      backgroundColor: 'white',
      marginVertical: 300,
      justifyContent:'center',
      alignSelf:'center',
      borderRadius: 25,
      top: 45
    },
});
