import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Console,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';

import api from '../baseURL'

export default class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
  }

  handleChangeEmail = (textValue) => {
   this.setState({
     email: textValue
   })
   console.log(this.state.email)

  }

  handleChangePass = (textValue) => {
    this.setState({
      pass: textValue
    })
  }

  handleSubmit() {
    const {navi} = this.props;
    let apiUsers: string = '/login';
    let payload : object = {
      "email": this.state.email,
      "pass": this.state.pass
    };
    api.post(apiUsers, payload)
      .then(function(response){
        console.log(response)
        navi.navigate('home')
      })
      .catch((error) => {
        console.log(error)
      });
  }

  componentDidUpdate() {
    if (this.state.email  == null) {
      console.log('fail')
    }
    else {
      console.log("success")
    }
  }

  render() {
    const {navigation} = this.props
    return(
      <View style = {styles.bg}>
        <Image style={styles.logo}
          source={require('../src/sow.png')} />
        <Text style = {styles.SOWText}> save our women
        </Text>
          <TextInput style={styles.emailBox}
            value = {this.state.email}
            autoCapitalize='none'
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            autoCorrect={false}
            keyboardType='email-address'
            label='enter email'
            onChangeText={(text) => this.handleChangeEmail(text)}
          />
          <TextInput style={styles.inputBoxTwo}
            value={this.state.password}
            label='enter password'
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry={true}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(text) => this.handleChangePass(text)}

          />
          <TouchableOpacity
            onPress={() =>navigation.navigate('forgot password')}
          >
            <Text
              style={styles.forgotPass}>
                  Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton}
            onPress = {() => this.handleSubmit()}
          >
            <Text style={styles.loginText}>
            Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style = {styles.noAcc}
            onPress={() => navigation.navigate('sign up')}
          >
            <Text> Don't have an account?</Text>
            <Text style = {styles.signupText}> Sign Up. </Text>
          </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({

  bg: {
    backgroundColor:'#9e6590',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  emailBox: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 10,
    alignSelf: 'center',
    top: 350
  },

  inputBoxTwo: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#FFFFFF',
    top: 350,
    alignSelf: 'center'
  },

  SOWText: {
    alignItems: 'center',
    color:'#FFFFFF',
    fontSize: 30,
    alignSelf: 'center',
    top: 300
  },

  forgotPass: {
    color:'#FFFFFF',
    position: 'absolute',
    left:215,
    top: 360
  },

  noAcc: {
    position: 'relative',
    top: 500,
    alignSelf: 'center'
  },

  signupText: {
    position: 'relative',
    color: '#FFFFFF',
    flex:1,
    paddingLeft: 50,
    top: 0
  },

  loginButton: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius:25,
    marginVertical:25,
    top: 370,
    alignSelf: 'center'
  },

  loginText: {
    fontSize: 16,
    paddingTop: 15,
    textAlign: 'center',
    color:'#FFFFFF'
  },

  logo: {
    width: 200,
    height: 200,
    position: 'absolute',
    alignSelf: 'center',
    top: 150
  }

}
)
