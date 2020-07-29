import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

export default class Login extends Component<{}> {
  render() {
    return(
      <View style = {borderStyle.container}>
        <Text style = {style.container}>Login</Text>
      </View>
    )
  }
}

// style for text
const style = StyleSheet.create({
  container : {
    paddingTop: 6, // shifts text downwards
    color: '#9e6590',
    flex: 1,
    width: 200,
    height: 100,
    paddingLeft: 75
    }

})

const borderStyle = StyleSheet.create({
  container : {
    marginTop: 25,
    width: 200,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 150 / 2 // rounded corners
  }
})
