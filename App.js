import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView,
  Keyboard, Alert
 } from 'react-native';

import Email from './Welcome/Email';
import Logo from './Welcome/Logo';
import {forgotPassScreen} from './Welcome/forgotPassScreen'
import {signUpScreen} from './Welcome/signUpScreen';

const VALID_EMAIL = "sow@save-our-women.com"
const VALID_PASSWORD = "tech-tank"

const Stack = createStackNavigator();

function WelcomeScreen({navigation}) {
  function handleLogin() {

    if (Email.state != null) {
      navigation.navigate('forgot password');
    }
  }
  return (
    <KeyboardAvoidingView style = {styles.login}>
      <View style={styles.container}>
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
            onPress = {() => {handleLogin(); Keyboard.dismiss()}}
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
          name="sign up"
          component={signUpScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
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
