import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';

export default class LoginButton extends Component<{}>{

  render() {
    return (

    <View style={styles.container}>

    <TouchableOpacity>
      <Text style={styles.forgotPass}>
                  Forgot password?</Text>
    </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.loginText}> Login </Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.noAcc}>
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
    position: 'relative',
  },

  loginText: {
    fontSize: 16,
    paddingTop: 15,
    textAlign: 'center',
    color:'#FFFFFF'
  },

  forgotPass: {
    color:'#FFFFFF',
    paddingBottom:25,
    paddingTop:30,
    paddingLeft: 150
  },

  button: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius:25,

  },
  noAcc: {
    position: 'relative',
    paddingTop: 150
  },

  signupText: {
    position: 'relative',
    color: '#FFFFFF',
    flex:1,
    paddingLeft: 50
  }

})
