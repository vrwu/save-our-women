import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,
  KeyboardAvoidingView
 } from 'react-native';
import api from '../baseURL'

export function signUpScreen({navigation}){
  //hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [num, setNum] = useState("");
  const [pass, setPass] = useState("");


  function handleSubmit () {
     let baseURL: string = '/signup';
     let payload : object = {
       "name": name,
       "email": email,
       "pass": pass,
       "num": num
     };

     api.post(baseURL, payload)
       .then(function (response) {
         console.log(name);
         console.log(email);
         console.log(pass);
         console.log(num);


       })
       .catch(function (error) {
         console.log(error);
       });
       navigation.navigate('contacts')
   }
  return (
    <View style = {styles.keyboard}
    behavior ='padding'>
      <View style = {styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Create an Account</Text>
        <TextInput style={styles.name}
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
        <TextInput style={styles.email}
          autoCapitalize='none'
          placeholder="Email"
          placeholderTextColor="#FFFFFF"
          enablesReturnKeyAutomatically={true}
          autoCorrect={false}
          keyboardType='email-address'
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput style={styles.phoneNumber}
          placeholder="Phone Number"
          placeholderTextColor="#FFFFFF"
          enablesReturnKeyAutomatically={true}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(text) => setNum(text)}
          value={num}
        />
        <TextInput style={styles.password}
          placeholder="Password"
          placeholderTextColor="#FFFFFF"
          secureTextEntry={true}
          enablesReturnKeyAutomatically={true}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(text) => setPass(text)}
          value={pass}
        />
        <TouchableOpacity
          style = {styles.button}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.SignUpText}> Sign Up </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9e6590',
    //paddingBottom:170
  },


  title: {
    alignSelf: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    color:'#FFFFFF',
    fontSize: 30,
    position: 'relative',
    top:210

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
    top: 290

  },

  email: {
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
    //color: '#9e6590',
    paddingLeft: 30,
    justifyContent:'center',
    alignSelf:'center',
    top: 310

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
    //justifyContent:'center',
    alignSelf:'center',
    top: 320

  },

  SignUpText: {
      position: 'relative',
      color: '#FFFFFF',
      flex:1,
      top: 10,
      fontSize: 16,
      textAlign:'center',
      top: 13
    },




  button: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius:25,
    marginVertical:75,
    top: 325,
    alignSelf:'center'
  },

  keyboard: {
    flex: 1,
    justifyContent: 'center'
  }
});
