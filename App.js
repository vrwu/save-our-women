import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Login from './Welcome/Login';
import SignUp from './Welcome/SignUp';
import Logo from './Welcome/Logo';
import Password from './Welcome/Password';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Logo/>
      <Text style={styles.SOWLogo}>save our women</Text>
      <Password/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9e6590',
    alignItems: 'center',
    //paddingTop:100,
    paddingBottom:100
  },

  SOWLogo: {
    alignItems: 'center',
    color:'#FFFFFF',
    fontSize: 30,
    position: 'absolute',
    paddingTop: 260
  },
});
