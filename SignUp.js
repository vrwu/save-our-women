import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

export default class SignUp extends Component<{}> {
  render() {
    return(
      <View style = {borderStyle.container}>
        <Text style = {signUpStyle.container}> Sign Up </Text>
      </View>
    )
  }
}

// style for signing up
const signUpStyle = StyleSheet.create({
  container : {
    paddingTop: 6, // moves text downwards
    color: '#9e6590',
    flex: 1,
    width: 200,
    height: 100,
    paddingLeft: 65 // centers
  }

})

// style for boarder
const borderStyle = StyleSheet.create({
  container : {
    marginTop:30,
    width: 200,
    height: 30,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderRadius: 150/ 2, // rounded edges
  }
})
