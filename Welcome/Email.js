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
          placeholder="Email"
          placeholderTextColor="#FFFFFF"
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },

  inputBox: {
    width: 350,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#FFFFFF'
  }
}
)
