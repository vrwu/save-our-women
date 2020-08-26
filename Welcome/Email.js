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
import api from '../baseURL'

// sample login
const VALID_EMAIL = "sow@save-our-women.com"
const VALID_PASSWORD = "tech-tank"

export default class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
  }

  handleChangeEmail = (textValue) => {
     this.setState({
       email: textValue
     })
   }

   handleChangePass = (textValue) => {
      this.setState({
        pass: textValue
      })
    }

    handleSubmit () {
       let baseURL: string = '/login';
       let payload : object = {
         "email": this.state.email,
         "pass": this.state.pass
       };

       api.post(baseURL, payload)
         .then(function (response) {
           console.log(this.state.email);
           console.log(this.state.pass);
         })
         .catch(function (error) {
           console.log(error);
         });
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
            onChangeText={this.handleChangeEmail}
          />
          <TextInput style={styles.inputBoxTwo}
            value={this.state.password}
            label='enter password'
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry={true}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={this.handleChangePass}

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
