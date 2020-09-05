
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import ImgToBase64 from 'react-native-image-base64';
import { StyleSheet, Text, View, TouchableOpacity, Image, Component}
 from 'react-native';

 import api from '../baseURL.js'

export default class profile extends React.Component{
  state = {
    image: null,
    profile: []
  };

  componentDidMount() {
    this.getPermissionAsync();
    this.getData();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Please turn on camera permissions to upload a photo');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });
      console.log(result);
      if (!result.cancelled) {
        console.log(result.base64)
        this.setState({image: String(result.base64)});
        let apiProfile: string = '/profile';
        let payload : object = {
          "photo": this.state.image
        };
        var pfp = await api.put(apiProfile, payload)
        .then(function(response) {
          console.log(this.state.report);
        })
        .catch( (error) => {
          console.log(error);
        });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  getData = async() => {
    let apiProfile: string = '/profile';
    var info = await api.get(apiProfile);
    this.setState({profile: Object.values(info.data)});
    console.log(this.state.profile)
    if (this.state.profile.length > 4) {
      this.setState({image: Object.values(this.state.profile[3])})
    }
  }

  handleLogOut = async () => {
    const {navigation} = this.props;
    let apiLogOut: string = '/logout';
    var obj = await api.get(apiLogOut)
    .then(function(response) {
      console.log(response)
      navigation.navigate('welcome')
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidUpdate() {
  }

  render() {
    const {navigation} = this.props
    let { image } = this.state;
    return (
      <View>
        <TouchableOpacity
          title="Add Image"
          onPress={this._pickImage}>
          <Image style={styles.container}
            source={require('../src/profileIcon.png')} />
          <Text style = {styles.addPFP}>
            +
          </Text>
        </TouchableOpacity>
          {image && <Image source={{uri: image}}
          style = {styles.pfp} /
          >}

        <Text style = {styles.nameVar}>
          {this.state.profile[1]}
        </Text>

        <Text style = {styles.phoneText}>
          Phone: {this.state.profile[2]}
        </Text>

        <Text style = {styles.emailText}>
          Email: {this.state.profile[0]}
        </Text>

        <TouchableOpacity
          style = {styles.viewContactsButton}
          onPress={() => navigation.navigate('list of contacts')}
        >
          <Text style = {styles.viewContactsText}>
            View Contacts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style = {styles.addContactButton}
          onPress={() => navigation.navigate('contacts')}
        >
          <Text style = {styles.addcontactText}>
            Add Emergency Contacts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.outButton}
          onPress={ () =>  this.handleLogOut()}

        >
          <Text style = {styles.addcontactText}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}
  const styles = StyleSheet.create({
    container: {

      alignSelf:'center',
      backgroundColor:'rgba(158, 101, 144, 1)',
      height: 400,
      width:420,
      borderRadius: 25

    },

    nameVar: {
      fontSize: 25,
      position: 'absolute',
      color: 'white',
      fontWeight: 'bold',
      top: 355,
      alignSelf: 'center'
    },

    phoneText: {
      fontSize: 20,
      marginLeft: 50,
      top: 30,
      color: 'grey',
      fontWeight: 'bold'
    },

    emailText: {
      fontSize: 20,
      marginLeft: 50,
      top: 65,
      color: 'grey',
      fontWeight: 'bold'
    },

    viewContactsText: {
        position: 'relative',
        color: '#FFFFFF',
        flex:1,

        fontSize: 16,
        textAlign:'center',
        top: 13
      },

    viewContactsButton: {
      width: 300,
      height: 50,
      backgroundColor: 'rgba(158, 101, 144, 1)',
      borderRadius:25,
      top: 190,
      //marginBottom: 10,
      //later on figure out how to position button from the bottom so that
      //it's not pushed down by the contacts shown from backend
      alignSelf:'center'
    },

    addcontactText: {
        position: 'relative',
        color: '#FFFFFF',
        flex:1,

        fontSize: 16,
        textAlign:'center',
        top: 13
      },

    addContactButton: {
      width: 300,
      height: 50,
      backgroundColor: 'rgba(158, 101, 144, 1)',
      borderRadius:25,
      top: 190,
      marginVertical: 10,
      //marginBottom: 10,
      //later on figure out how to position button from the bottom so that
      //it's not pushed down by the contacts shown from backend
      alignSelf:'center'
    },

    outButton: {
      width: 300,
      height: 50,
      backgroundColor: 'rgba(158, 101, 144, 1)',
      borderRadius:25,
      top: 190,
      alignSelf: 'center'
    },

    addPFP: {
      color: 'white',
      bottom: 300,
      fontSize: 50,
      position: 'absolute',
      left: 275
    },

    pfp: {
      height: 300,
      width: 300,
      position: 'absolute',
      alignSelf: 'center',
      top: 50,
    }



});
