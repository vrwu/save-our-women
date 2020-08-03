import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Console
} from 'react-native';

// sample login
const VALID_EMAIL = "sow@save-our-women.com"
const VALID_PASSWORD = "tech-tank"

export default class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    const {navigation} = this.props;
    return(
        <View style = {styles.container}>
          <TextInput style={styles.inputBox}
            value = {this.state.email}
            autoCapitalize='none'
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            autoCorrect={false}
            keyboardType='email-address'
            label='enter email'
            onChangeText={text => this.setState({email:text}, () => {
              console.log(this.state.email, 'email change')})}
          />
          <TextInput style={styles.inputBoxTwo}
            value={this.state.password}
            label='enter password'
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry={true}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText=
              {text => this.setState({password:text},
                () => {console.log(this.state.password)})}
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
    alignItems: 'center',
    paddingBottom:170

  },

  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 10,
    top:100,
  },

  inputBoxTwo: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#FFFFFF',
    top: 100
  },

  login: {
    flex: 1,
    justifyContent:'center',
  }
}
)
