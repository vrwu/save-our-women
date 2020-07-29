import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Login from './Welcome/Login';
import SignUp from './Welcome/SignUp';
import Logo from './Welcome/Logo';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color:'#FFFFFF', fontSize: 50}}>Save Our Women</Text>
      <StatusBar style="auto" />
      <Logo/>
      <Login/>
      <SignUp/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9e6590',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
