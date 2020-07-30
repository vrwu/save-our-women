import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

export default class Email extends Component<{}> {
  render() {
    return(
      <View style = {styles.container}>
        <TextInput style={styles.inputBox}
          autoCapitalize='none'
          placeholder="Email"
          placeholderTextColor="#FFFFFF"
          enablesReturnKeyAutomatically={true}
          autoCorrect={false}
          keyboardType='email-address'
        />
        <TextInput style={styles.inputBoxTwo}
          placeholder="Password"
          placeholderTextColor="#FFFFFF"
          secureTextEntry={true}
          enablesReturnKeyAutomatically={true}
          autoCapitalize='none'
          autoCorrect={false}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    position: 'relative',
    alignItems: 'center'

  },

  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 10
  },

  inputBoxTwo: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#FFFFFF'

    }
}
)
