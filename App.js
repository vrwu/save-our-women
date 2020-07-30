import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Email from './Welcome/Email';
import Logo from './Welcome/Logo';
import HSButtons from './Welcome/HSButtons';

const Stack = createStackNavigator();

function WelcomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Logo/>
      <Text style={styles.SOWText}>save our women</Text>
      <Email/>
      <HSButtons/>
    </View>
  );
}

function forgotPassScreen({navigation}){
  return (
    <View>
      <StatusBar style="auto"/>
      <Logo/>
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
          name="home"
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
    paddingTop: 260
  },
});
