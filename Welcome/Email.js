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

import api from '../baseURL.js'

export default class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      passwords: [],
      emailInput: '',
      passInput: '',
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let apiUsers: string = '/login';
    

  }

  render() {
    const {navigation} = this.props;
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
          <TouchableOpacity
            onPress={() =>navigation.navigate('forgot password')}
          >
            <Text
              style={styles.forgotPass}>
                  Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton}
            onPress = {() => navigation.navigate('home')}
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
