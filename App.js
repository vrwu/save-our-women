import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Email from './Welcome/Email';
import Logo from './Welcome/Logo';
import {forgotPassScreen} from './Welcome/forgotPassScreen';
import {signUpScreen} from './Welcome/signUpScreen';


const Stack = createStackNavigator();

function WelcomeScreen({navigation}) {
  return (
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

        <TouchableOpacity style={styles.button}>
          <Text style={styles.loginText}> Login </Text>
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
    bottom:-10,

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
  },

  button: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius:25,
    marginVertical:25
  },

  loginText: {
    fontSize: 16,
    paddingTop: 15,
    textAlign: 'center',
    color:'#FFFFFF'
  },
});
