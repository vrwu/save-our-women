import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView,
  Keyboard, Alert, TextInput, Component
 } from 'react-native';

import homeScreen from './Welcome/homescreen'
import Email from './Welcome/Email';
import Logo from './Welcome/Logo';
import {forgotPassScreen} from './Welcome/forgotPassScreen'
import {signUpScreen} from './Welcome/signUpScreen';
import {EmergencySOS} from './Welcome/EmergencySOS';
import {Contacts} from './Welcome/Contacts';
import {profile} from './Welcome/profile';
import newsfeed from './Welcome/newsfeed';
import newReport from './Welcome/newReport';


const VALID_EMAIL = "sow@save-our-women.com"
const VALID_PASSWORD = "tech-tank"

const Stack = createStackNavigator();

function WelcomeScreen({navigation}) {
  function handleLogin() {
    if (Email.email == null) {
      navigation.navigate('home')
    }
  }
  return (
    <KeyboardAvoidingView style = {styles.login}>
      <View style={styles.containerOne}>
        <StatusBar style="auto" />
        <Logo/>
        <Text style={styles.SOWText}>save our women</Text>
        <Email/>
        <View>
          <TouchableOpacity
            onPress={() =>navigation.navigate('forgot password')}
          >
            <Text
              style={styles.forgotPass}>
                  Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}
            onPress = {() => { handleLogin()}}
          >
            <Text style={styles.loginText}>
            Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style = {styles.noAcc}
            onPress={() => navigation.navigate('sign up')}
          >
            <Text> Don't have an account?</Text>
            <Text style = {styles.signupText}> Sign Up. </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="welcome"
        screenOptions={{
          headerShown:false
        }}
      >
        <Stack.Screen
          name="welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="forgot password"
          component={forgotPassScreen}
        />
        <Stack.Screen
          name = "home"
          component = {homeScreen}
        />
        <Stack.Screen
          name="sign up"
          component={signUpScreen}
        />
        <Stack.Screen
          name="contacts"
          component={Contacts}
        />
        <Stack.Screen
          name="profile page"
          component={profile}
        />
        <Stack.Screen
          name="newsfeed"
          component={newsfeed}
        />
        <Stack.Screen
          name="new report"
          component={newReport}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    position: 'relative',
    alignItems: 'center',
    paddingBottom:170

  },


  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 10,
    top:100,
  },

  inputBoxTwo: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#FFFFFF',
    top: 100
  },

  login: {
    flex: 1,
    justifyContent:'center',
  },

  containerOne: {
    flex: 1,
    backgroundColor: '#9e6590',
    alignItems: 'center',
    paddingBottom:100
  },

  SOWText: {
    alignItems: 'center',
    color:'#FFFFFF',
    fontSize: 30,
    position: 'absolute',
    paddingTop: 275
  },

  forgotPass: {
    color:'#FFFFFF',
    position: 'absolute',
    left:175,
    top: -5

  },

  noAcc: {
    position: 'relative',
    top:125,
    left: 75,
  },

  signupText: {
    position: 'relative',
    color: '#FFFFFF',
    flex:1,
    paddingLeft: 50,
    top: 0
  },

  button: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius:25,
    marginVertical:25,
    top: 0
  },

  loginText: {
    fontSize: 16,
    paddingTop: 15,
    textAlign: 'center',
    color:'#FFFFFF'
  },

  login: {
    flex: 1,
    justifyContent:'center',
  }
});
