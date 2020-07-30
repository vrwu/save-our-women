import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

export default class LoginButton extends Component<{}>{

  render() {
    return (

    <View style={styles.container}>
    <TouchableOpacity>
      <Text style={{paddingLeft:100, paddingBottom:25}}> Forgot password?</Text>
    </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.loginText}> Login </Text>
      </TouchableOpacity>

      <TouchableOpacity style = {{position:'absolute', paddingTop:850}}>
        <Text> Don't have an account?</Text>
        <Text style = {styles.signupText}> Sign Up. </Text>
      </TouchableOpacity>
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    position: 'absolute',
    paddingTop: 550
  },

  loginText: {
    fontSize: 16,
    paddingTop: 15,
    textAlign: 'center',
    color:'#FFFFFF'
  },

  button: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius:25,

  },
  noAcc: {
    position: 'relative',
  },

  signupText: {
    position: 'relative',
    color: '#FFFFFF',
    flex:1,
    paddingLeft: 50
  }

})
