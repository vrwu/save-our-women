import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StackActions } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView,
  Keyboard, Alert, TextInput, Image, ScrollView
 } from 'react-native';

 export function newsfeed({navigation}) {
   return(
     <ScrollView>
      <View style = {styles.header}>
        <Text style = {styles.mainText}>
          Newsfeed
        </Text>
        <TextInput
          style = {styles.searchBox}
          placeholder = "Search"
          placeholderTextColor = "#FFFFFF"
        >
        </TextInput>
        <TouchableOpacity
          onPress={
            () => navigation.dispatch(StackActions.pop(1))}
        >
          <Text style = {styles.backArrow}>
            ←
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>navigation.navigate('new report')}
        >
          <Text style = {styles.addReport}>
            +
          </Text>
        </TouchableOpacity>
      </View>

        <TouchableOpacity style = {styles.newsContainer}>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.newsContainer}>
          <View style = {styles.addPhoto}>
            <Text style = {{alignSelf:'center', top: 200}}>
              No Photo
            </Text>
          </View>
          <View style = {styles.addText}>
            <Text style = {styles.descriptionBox}>
            August 1, 2020
            </Text>
            <Text>
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.newsContainer}>
        <View style = {styles.addPhoto}>
          <Text style = {{alignSelf:'center', top: 200}}>
            No Photo
          </Text>
        </View>
        <View style = {styles.addText}>
          <Text style = {styles.descriptionBox}>
          August 1, 2020
          </Text>
          <Text>
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven
          </Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.newsContainer}>
        <View style = {styles.addPhoto}>
          <Text style = {{alignSelf:'center', top: 200}}>
            No Photo
          </Text>
        </View>
        <View style = {styles.addText}>
          <Text style = {styles.descriptionBox}>
          August 1, 2020
          </Text>
          <Text>
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven
          </Text>
        </View>
        </TouchableOpacity>
     </ScrollView>

   )
 }

const styles = StyleSheet.create({
  mainText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign:'center',
    top: 50,
    color: 'white'
  },

  header: {
    backgroundColor:'rgba(158, 101, 144, 1)',
    height: 150,
    width: 378,
    borderRadius: 25,
    alignSelf: 'center',
    top: 50
  },

  backArrow: {
    fontSize: 25,
    color: 'rgba(0, 0, 0, 0.3)',
    alignSelf:'flex-start',
    marginLeft:15,
    bottom: 3,
    position: 'absolute'
  },

  addReport: {
    fontSize: 30,
    color: 'rgba(0, 0, 0, 0.3)',
    alignSelf:'flex-end',
    marginRight: 15,
    bottom: 40
  },

  searchBox: {
    width: 300,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#FFFFFF',
    top: 80,
    alignSelf: 'center'
  },

  newsContainer: {
    height: 250,
    width: 378,
    alignSelf: 'center',
    backgroundColor:'white',
    borderRadius: 25,
    marginVertical: 10,
    top: 60
  },

  addPhoto: {
    height: 200,
    width: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    top:25,
    left: 25
  },

  addText: {
    height: 200,
    width: 180,
    alignSelf:'center',
    bottom: 175,
    left: 85
  },

  descriptionBox: {
  }
})
