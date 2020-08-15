import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { StyleSheet, Text, View, TouchableOpacity, Image, Component}
 from 'react-native';


export default class profile extends React.Component{
  state = {
    image: null,
  };

  componentDidMount() {
    this.getPermissionAsync();
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
      });
      console.log(result);
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

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
          Random Name
        </Text>

        <Text style = {styles.phoneText}>
          Phone Number:
        </Text>

        <Text style = {styles.emailText}>
          Email Address:
        </Text>


<<<<<<< HEAD
        <TouchableOpacity
          style = {styles.viewContactsButton}
          onPress={() => navigation.navigate('contacts')}
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
      </View>
    )
  }
=======
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
    </View>
  )
>>>>>>> 0ee9bf4172a15b36d525628a426c4d34b0e2a15a
}
  const styles = StyleSheet.create({
    container: {

      alignSelf:'center',
      backgroundColor:'rgba(158, 101, 144, 1)',
      height: 400,
      width:420,

    },

    //*name variable generated from database*
    nameVar: {
      fontSize: 25,
      marginLeft: 50,
      position: 'absolute',
      color: 'white',
      fontWeight: 'bold',
      top: 355
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
      top: 200,
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
      top: 210,
      //marginBottom: 10,
      //later on figure out how to position button from the bottom so that
      //it's not pushed down by the contacts shown from backend
      alignSelf:'center'
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
