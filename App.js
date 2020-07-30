import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Email from './Welcome/Email';
import Logo from './Welcome/Logo';
import {forgotPassScreen} from './Welcome/forgotPassScreen';

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
        <TouchableOpacity style = {styles.noAcc}>
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
    paddingTop: 300
  },

  forgotPass: {
    color:'#FFFFFF',
    position: 'relative',
    top:0,
    left:100,
    bottom:190
  },

  noAcc: {
    position: 'relative',
    top:200
  },

  signupText: {
    position: 'relative',
    color: '#FFFFFF',
    flex:1,
    paddingLeft: 50,
  }
});
