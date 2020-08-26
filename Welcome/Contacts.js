import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,
  KeyboardAvoidingView
 } from 'react-native';
import api from '../baseURL'

export function Contacts({navigation}){

  //hooks
  const [name, setName] = useState("");
  const [num, setNum] = useState("");



  function handleSubmit () {
     let baseURL: string = '/add_emergency_contact';
     let payload : object = {
       "name": name,
       "num": num
     };

     api.post(baseURL, payload)
       .then(function (response) {
         console.log(name);
         console.log(num);
       })
       .catch(function (error) {
         console.log(error);
       });
   }

  return (
    <KeyboardAvoidingView style = {styles.keyboard}
    behavior ='padding'>
      <View style = {styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Add Emergency Contacts</Text>
        <TextInput style={styles.name}

          clearButtonMode="always"
          autoCapitalize='none'
          placeholder="Name"
          placeholderTextColor="#FFFFFF"
          enablesReturnKeyAutomatically={true}
          autoCorrect={false}
          onChangeText={(text) => {
            setName(text)
            console.log(name)}}
          value={name}
        />
        <TextInput style={styles.phoneNumber}
          clearButtonMode="always"
          placeholder="Phone Number"
          placeholderTextColor="#FFFFFF"
          enablesReturnKeyAutomatically={true}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(text) => {
            setNum(text)
            console.log(num)}}
          value={num}
        />

        <TouchableOpacity
          style = {styles.SubmitButton}
          onPress={(event) =>handleSubmit()}
        >
          <Text style={styles.SubmitText}> Submit </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style = {styles.AddButton}
          onPress={() => navigation.navigate('contacts')}
        >
          <Text style={styles.AddText}> Add Another Contact </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style = {styles.HomeButton}
          onPress={() => navigation.navigate('home')}
        >
          <Text style={styles.AddText}> Go to Home </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9e6590',

  },


  title: {
    alignSelf: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    color:'#FFFFFF',
    fontSize: 30,
    position: 'relative',
    top:250

  },

  name: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    paddingLeft: 30,
    justifyContent:'center',
    alignSelf:'center',
    top: 300


  },

  phoneNumber: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    paddingLeft: 30,
    justifyContent:'center',
    alignSelf:'center',
    top: 310

  },


  SubmitText: {
      position: 'relative',
      color: '#FFFFFF',
      flex:1,
      top: 10,
      fontSize: 16,
      textAlign:'center',
      top: 13
    },


  SubmitButton: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius:25,
    marginVertical:75,
    top: 315,
    alignSelf:'center'
  },

  AddText: {
      position: 'relative',
      color: '#FFFFFF',
      flex:1,
      top: 10,
      fontSize: 16,
      textAlign:'center',
      top: 13
    },

  AddButton: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius:25,
    marginVertical:75,
    top: 175,
    alignSelf:'center'
  },

  HomeText: {
      position: 'relative',
      color: '#FFFFFF',
      flex:1,
      top: 10,
      fontSize: 16,
      textAlign:'center',
      top: 13
    },

  HomeButton: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius:25,
    marginVertical:75,
    top: 35,
    alignSelf:'center'
  },

  keyboard: {
    flex: 1,
    justifyContent: 'center'
  }
});
