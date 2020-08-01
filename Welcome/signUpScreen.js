import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,
  KeyboardAvoidingView
 } from 'react-native';

export function signUpScreen({navigation}){
  return (
    <KeyboardAvoidingView style = {styles.keyboard}
    behavior ='padding'>
      <View style = {styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Sign Up</Text>
        <TextInput style={styles.email}
          autoCapitalize='none'
          placeholder="Email"
          placeholderTextColor="#FFFFFF"
          enablesReturnKeyAutomatically={true}
          autoCorrect={false}
          keyboardType='email-address'
        />
        <TextInput style={styles.phoneNumber}
          placeholder="Phone Number"
          placeholderTextColor="#FFFFFF"
          enablesReturnKeyAutomatically={true}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <TextInput style={styles.password}
          placeholder="Password"
          placeholderTextColor="#FFFFFF"
          secureTextEntry={true}
          enablesReturnKeyAutomatically={true}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.SignUpText}> Sign Up </Text>
          //navigate to home
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9e6590',
    paddingBottom:170
  },


  title: {
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: 100,
    color:'#FFFFFF',
    fontSize: 30,
    position: 'relative',

  },

  email: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',

    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    paddingLeft: 30,
  //  marginVertical: 50,
    justifyContent:'center',
    alignSelf:'center'
    //top: 100
  },

  phoneNumber: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#9e6590',
    paddingLeft: 30,
    justifyContent:'center',
    alignSelf:'center',
    marginVertical: 10,

  },

  password: {
    width: 300,
    height: 50,
    paddingLeft: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#9e6590',
    justifyContent:'center',
    alignSelf:'center',
    marginVertical: 1

  },

  SignUpText: {
      position: 'relative',
      color: '#FFFFFF',
      flex:1,
      top: 10,
      fontSize: 20,
      textAlign:'center'
    },




  button: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius:25,
    marginVertical:75,
    top: 0,
    alignSelf:'center'
  },

  keyboard: {
    flex: 1,
    justifyContent: 'center'
  }
});
