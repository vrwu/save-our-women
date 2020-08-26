
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,
  KeyboardAvoidingView, Component, Alert
 }
from 'react-native';
import api from '../baseURL'

export function forgotPassScreen({navigation}){
  //hooks
  const [email, setEmail] = useState("");

  function handleSubmit () {
     let baseURL: string = '/forgotpass';
     let payload : object = {
       "email": email,
     };

     api.post(baseURL, payload)
       .then(function (response) {
         console.log(email);
       })
       .catch(function (error) {
         console.log(error);
       });
   }

  return (
    <KeyboardAvoidingView style = {styles.keyboard}
    behavior ='padding'>
      <View style = {styles.container}>
        <StatusBar style="auto"/>
        <TouchableOpacity
          style = {styles.backButton}
          onPress={
            () => navigation.dispatch(StackActions.pop(1))}
        >
          <Text style = {styles.backArrow}>
            ←
          </Text>
        </TouchableOpacity>
        <Text style = {styles.mainText}>
          Forgot password?
        </Text>
        <Text style = {styles.moreInfo}>
          Enter an email address and we will send you instructions to reset your
          password.
        </Text>
        <TextInput style = {styles.email}
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize = 'none'
          placeholder = 'Email'
          placeholderTextColor = '#FFFFFF'
          enablesReturnKeyAutomatically={true}
          autoCorrect={false}
          keyboardType='email-address'>
        </TextInput>
        <TouchableOpacity style = {styles.enterButton}
          title = {"Send Email"}
          onPress={() => handleSubmit()}
          onPress={
            () =>  Alert.alert('Email Sent!')}
        >
          <Text style = {styles.buttonText}>
            Send Email
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9e6590'
  },

  backArrow: {
    height: 100,
    width: 100,
    color:'white',
    left: 40,
    top: 80,
    position: 'absolute',
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 30,

  },

  mainText: {
    alignItems:'center',
    textAlign:'center',
    position:'relative',
    fontSize:30,
    top: 275,
    color: 'rgba(255,255,255,0.7)'
  },

  moreInfo: {
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    top: 300,
    paddingLeft: 70,
    paddingRight: 70,
    textAlignVertical:'center',
    color: 'rgba(255, 255, 255, 0.7)'
  },

  email: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#FFFFFF',
    alignItems:'center',
    top: 330,
    justifyContent:'center',
    alignSelf:'center'
  },

  enterButton: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius:25,
    marginVertical:25,
    top: 325,
    alignSelf:'center'
  },

  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    alignSelf: 'center',
    top: 15
  },

  keyboard: {
    flex: 1,
    justifyContent:'center'
  }
});
